
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { RiasecCategory, categoryInfo } from '@/data/riasecData';

export interface ExportData {
  topThreeCategories: RiasecCategory[];
  scores: Record<RiasecCategory, number>;
  reflectionResponses?: Array<{ questionIndex: number; answer: string }>;
  completedAt: Date;
}

export const generatePDFHTML = (data: ExportData): string => {
  const { topThreeCategories, scores, reflectionResponses, completedAt } = data;
  const maxPossibleScore = 48; // 12 statements × 4 max rating

  const topThreeHTML = topThreeCategories
    .map(
      (category, index) => `
      <div style="margin: 15px 0; padding: 20px; border: 2px solid #39FF14; border-radius: 12px; background: #f8f9fa;">
        <h3 style="color: ${categoryInfo[category].color}; margin: 0 0 10px 0; font-size: 20px;">
          #${index + 1} ${category} - "${categoryInfo[category].shortName}"
        </h3>
        <p style="margin: 8px 0; font-size: 16px; font-weight: bold;">
          Score: ${scores[category]}/${maxPossibleScore} (${Math.round((scores[category] / maxPossibleScore) * 100)}%)
        </p>
        <p style="margin: 8px 0; font-size: 14px; line-height: 1.5;">
          ${categoryInfo[category].description}
        </p>
        <div style="margin-top: 12px;">
          <strong style="font-size: 14px;">Key Traits:</strong>
          <ul style="margin: 8px 0; padding-left: 20px;">
            ${categoryInfo[category].traits.map(trait => `<li style="margin: 4px 0; font-size: 13px;">${trait}</li>`).join('')}
          </ul>
        </div>
      </div>
    `
    )
    .join('');

  const allCategoriesHTML = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(
      ([category, score], index) => `
      <tr style="border-bottom: 1px solid #e9ecef;">
        <td style="padding: 12px; font-weight: ${index < 3 ? 'bold' : 'normal'}; color: ${index < 3 ? categoryInfo[category as RiasecCategory].color : '#34495E'};">
          #${index + 1} ${category}
        </td>
        <td style="padding: 12px; text-align: center; font-weight: ${index < 3 ? 'bold' : 'normal'};">
          ${score}/${maxPossibleScore}
        </td>
        <td style="padding: 12px; text-align: center; font-weight: ${index < 3 ? 'bold' : 'normal'};">
          ${Math.round((score / maxPossibleScore) * 100)}%
        </td>
      </tr>
    `
    )
    .join('');

  const reflectionHTML = reflectionResponses && reflectionResponses.length > 0 
    ? `
      <div style="page-break-before: always; margin-top: 40px;">
        <h2 style="color: #2C3E50; border-bottom: 2px solid #39FF14; padding-bottom: 10px;">Your Reflections</h2>
        ${reflectionResponses.map((response, index) => `
          <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #39FF14;">
            <h4 style="color: #2C3E50; margin: 0 0 10px 0;">Question ${index + 1}</h4>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; font-style: italic;">
              "${response.answer}"
            </p>
          </div>
        `).join('')}
      </div>
    `
    : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>RIASEC Assessment Results</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 30px; 
            color: #34495E; 
            line-height: 1.6;
          }
          .header { 
            text-align: center; 
            margin-bottom: 40px; 
            padding-bottom: 20px;
            border-bottom: 3px solid #39FF14;
          }
          .logo { 
            color: #39FF14; 
            font-size: 32px; 
            font-weight: bold; 
            margin-bottom: 10px;
          }
          .title { 
            color: #2C3E50; 
            font-size: 36px; 
            font-weight: bold; 
            margin: 15px 0; 
          }
          .subtitle {
            color: #7F8C8D;
            font-size: 16px;
            margin: 10px 0;
          }
          .section { 
            margin: 30px 0; 
          }
          .section h2 {
            color: #2C3E50;
            font-size: 24px;
            margin-bottom: 20px;
            border-bottom: 2px solid #39FF14;
            padding-bottom: 8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          th {
            background: #2C3E50;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: bold;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #7F8C8D;
            font-style: italic;
          }
          @media print {
            body { margin: 20px; }
            .section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🔍 ForteFinder</div>
          <h1 class="title">RIASEC Assessment Results</h1>
          <p class="subtitle">Generated on ${completedAt.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
        
        <div class="section">
          <h2>🎯 Your Top 3 Skill Categories</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">
            Based on your responses, these are your strongest skill areas:
          </p>
          ${topThreeHTML}
        </div>
        
        <div class="section">
          <h2>📊 Complete Results</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th style="text-align: center;">Score</th>
                <th style="text-align: center;">Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${allCategoriesHTML}
            </tbody>
          </table>
        </div>
        
        ${reflectionHTML}
        
        <div class="footer">
          <p>Discover your career path with ForteFinder</p>
          <p style="font-size: 12px; margin-top: 10px;">
            This assessment is based on the RIASEC model developed by John Holland
          </p>
        </div>
      </body>
    </html>
  `;
};

export const exportResultsToPDF = async (data: ExportData): Promise<boolean> => {
  try {
    const htmlContent = generatePDFHTML(data);
    
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Your RIASEC Results',
      });
      return true;
    } else {
      console.log('PDF saved to:', uri);
      return true;
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
