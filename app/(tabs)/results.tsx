
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Share,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';
import { categoryInfo, reflectionQuestions } from '@/data/riasecData';
import CategoryCard from '@/components/CategoryCard';
import { exportResultsToPDF } from '@/utils/pdfExport';

export default function ResultsScreen() {
  const {
    calculateScores,
    getTopThreeCategories,
    resetAssessment,
    reflectionResponses,
    updateReflectionResponse,
  } = useAssessment();

  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showReflection, setShowReflection] = useState(false);

  const scores = calculateScores();
  const topThree = getTopThreeCategories();
  const maxPossibleScore = 48; // 12 statements × 4 max rating

  const sortedCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([category, score], index) => ({
      category: categoryInfo[category as keyof typeof categoryInfo],
      score,
      rank: index + 1,
    }));

  const toggleCardExpansion = (categoryName: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCards(newExpanded);
  };

  const handleExportPDF = async () => {
    try {
      const exportData = {
        topThreeCategories: topThree,
        scores,
        reflectionResponses,
        completedAt: new Date(),
      };

      const success = await exportResultsToPDF(exportData);
      
      if (!success) {
        Alert.alert('Error', 'Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  const handleShare = async () => {
    const topThreeText = topThree
      .map((cat, index) => `${index + 1}. ${cat} (${scores[cat]} points)`)
      .join('\n');

    const shareText = `My RIASEC Assessment Results 🎯\n\nTop 3 Skill Categories:\n${topThreeText}\n\nDiscover your strengths with ForteFinder!`;

    try {
      await Share.share({
        message: shareText,
        title: 'My RIASEC Results',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };



  const handleRetakeAssessment = () => {
    Alert.alert(
      'Retake Assessment',
      'Are you sure you want to start over? This will clear all your current responses.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Over',
          style: 'destructive',
          onPress: () => {
            resetAssessment();
            router.push('/(tabs)/assessment');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Your Results',
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontFamily: 'Montserrat_700Bold' },
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
                <IconSymbol name="square.and.arrow.up" size={20} color={colors.accent} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleExportPDF} style={styles.headerButton}>
                <IconSymbol name="doc.text" size={20} color={colors.accent} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Results Header */}
          <View style={styles.resultsHeader}>
            <Text style={commonStyles.title}>🎯 Your Results</Text>
            <Text style={commonStyles.textCenter}>
              Based on your responses, here are your top skill categories
            </Text>
          </View>

          {/* Top 3 Categories */}
          <View style={styles.topThreeContainer}>
            <Text style={commonStyles.subtitle}>Your Top 3 Skills</Text>
            {topThree.map((categoryName, index) => (
              <CategoryCard
                key={categoryName}
                category={categoryInfo[categoryName]}
                score={scores[categoryName]}
                maxScore={maxPossibleScore}
                rank={index + 1}
                expanded={expandedCards.has(categoryName)}
                onPress={() => toggleCardExpansion(categoryName)}
              />
            ))}
          </View>

          {/* All Categories */}
          <View style={styles.allCategoriesContainer}>
            <Text style={commonStyles.subtitle}>All Categories</Text>
            {sortedCategories.map(({ category, score, rank }) => (
              <CategoryCard
                key={category.name}
                category={category}
                score={score}
                maxScore={maxPossibleScore}
                rank={rank}
                expanded={expandedCards.has(category.name)}
                onPress={() => toggleCardExpansion(category.name)}
              />
            ))}
          </View>

          {/* Reflection Section */}
          <View style={styles.reflectionContainer}>
            <TouchableOpacity
              style={styles.reflectionHeader}
              onPress={() => setShowReflection(!showReflection)}
            >
              <Text style={commonStyles.subtitle}>Reflection Questions</Text>
              <IconSymbol
                name={showReflection ? 'chevron.up' : 'chevron.down'}
                size={20}
                color={colors.accent}
              />
            </TouchableOpacity>

            {showReflection && (
              <View style={styles.reflectionContent}>
                {reflectionQuestions.map((question, index) => (
                  <View key={index} style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question}</Text>
                    <Text style={styles.answerPlaceholder}>
                      {reflectionResponses.find(r => r.questionIndex === index)?.answer ||
                        'Tap to add your thoughts...'}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.retakeButton]}
              onPress={handleRetakeAssessment}
            >
              <IconSymbol name="arrow.clockwise" size={20} color={colors.text} />
              <Text style={styles.actionButtonText}>Retake Assessment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.shareButton]}
              onPress={handleShare}
            >
              <IconSymbol name="square.and.arrow.up" size={20} color={colors.primary} />
              <Text style={[styles.actionButtonText, styles.shareButtonText]}>
                Share Results
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  topThreeContainer: {
    marginBottom: 32,
  },
  allCategoriesContainer: {
    marginBottom: 32,
  },
  reflectionContainer: {
    marginBottom: 32,
  },
  reflectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  reflectionContent: {
    marginTop: 16,
  },
  questionContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  answerPlaceholder: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.6,
    fontStyle: 'italic',
    fontFamily: 'Inter_400Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  retakeButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
  },
  shareButton: {
    backgroundColor: colors.accent,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  shareButtonText: {
    color: colors.primary,
  },
});
