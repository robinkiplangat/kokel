
export interface RiasecStatement {
  id: number;
  text: string;
  category: RiasecCategory;
}

export type RiasecCategory = 'Realistic' | 'Investigative' | 'Artistic' | 'Social' | 'Enterprising' | 'Conventional';

export interface CategoryInfo {
  name: RiasecCategory;
  shortName: string;
  description: string;
  traits: string[];
  icon: string;
  color: string;
}

export const categoryInfo: Record<RiasecCategory, CategoryInfo> = {
  Realistic: {
    name: 'Realistic',
    shortName: 'The Do-ers',
    description: 'Works with tools/animals over people. Natural mechanical/practical skills. Understands tangible things. Practical, mechanical mindset.',
    traits: [
      'Works with tools/animals over people',
      'Natural mechanical/practical skills',
      'Understands tangible things',
      'Practical, mechanical mindset'
    ],
    icon: 'wrench.and.screwdriver',
    color: '#E67E22'
  },
  Investigative: {
    name: 'Investigative',
    shortName: 'The Thinkers',
    description: 'Strong in math/science. Prefers ideas over people/things. Uses scientific method. Precise and analytical.',
    traits: [
      'Strong in math/science',
      'Prefers ideas over people/things',
      'Uses scientific method',
      'Precise and analytical'
    ],
    icon: 'microscope',
    color: '#3498DB'
  },
  Artistic: {
    name: 'Artistic',
    shortName: 'The Creators',
    description: 'Excels in creative expression. Strong artistic abilities. Dislikes repetitive tasks. Original and independent.',
    traits: [
      'Excels in creative expression',
      'Strong artistic abilities',
      'Dislikes repetitive tasks',
      'Original and independent'
    ],
    icon: 'paintbrush',
    color: '#9B59B6'
  },
  Social: {
    name: 'Social',
    shortName: 'The Helpers',
    description: 'Thrives helping others. Less interested in technical tasks. Values social problem-solving. Friendly and trustworthy.',
    traits: [
      'Thrives helping others',
      'Less interested in technical tasks',
      'Values social problem-solving',
      'Friendly and trustworthy'
    ],
    icon: 'person.2',
    color: '#E74C3C'
  },
  Enterprising: {
    name: 'Enterprising',
    shortName: 'The Persuaders',
    description: 'Skilled in leadership/persuasion. Less interested in analytical thinking. Understands business/leadership. Energetic and ambitious.',
    traits: [
      'Skilled in leadership/persuasion',
      'Less interested in analytical thinking',
      'Understands business/leadership',
      'Energetic and ambitious'
    ],
    icon: 'chart.line.uptrend.xyaxis',
    color: '#F39C12'
  },
  Conventional: {
    name: 'Conventional',
    shortName: 'The Organizers',
    description: 'Skilled with structured tasks. Challenged by ambiguity. Values business success. Organized and efficient.',
    traits: [
      'Skilled with structured tasks',
      'Challenged by ambiguity',
      'Values business success',
      'Organized and efficient'
    ],
    icon: 'folder',
    color: '#27AE60'
  }
};

export const riasecStatements: RiasecStatement[] = [
  // Realistic (12 statements)
  { id: 1, text: 'Participate in athletic competitions', category: 'Realistic' },
  { id: 2, text: 'Work effectively with hands', category: 'Realistic' },
  { id: 3, text: 'Handle detailed work', category: 'Realistic' },
  { id: 4, text: 'Figure out machines (phones, engines)', category: 'Realistic' },
  { id: 5, text: 'Use tools to fix objects', category: 'Realistic' },
  { id: 6, text: 'Build models from kits', category: 'Realistic' },
  { id: 7, text: 'Work outdoors', category: 'Realistic' },
  { id: 8, text: 'Operate machinery', category: 'Realistic' },
  { id: 9, text: 'Repair broken items', category: 'Realistic' },
  { id: 10, text: 'Work with animals', category: 'Realistic' },
  { id: 11, text: 'Build things with wood or metal', category: 'Realistic' },
  { id: 12, text: 'Drive trucks or heavy equipment', category: 'Realistic' },

  // Investigative (12 statements)
  { id: 13, text: 'Analyze reports and draw conclusions', category: 'Investigative' },
  { id: 14, text: 'Learn new information', category: 'Investigative' },
  { id: 15, text: 'Research topics independently', category: 'Investigative' },
  { id: 16, text: 'Solve complex problems', category: 'Investigative' },
  { id: 17, text: 'Prefer science subjects', category: 'Investigative' },
  { id: 18, text: 'Explore scientific concepts', category: 'Investigative' },
  { id: 19, text: 'Conduct experiments', category: 'Investigative' },
  { id: 20, text: 'Study mathematics', category: 'Investigative' },
  { id: 21, text: 'Read scientific journals', category: 'Investigative' },
  { id: 22, text: 'Work in a laboratory', category: 'Investigative' },
  { id: 23, text: 'Investigate natural phenomena', category: 'Investigative' },
  { id: 24, text: 'Use computers for analysis', category: 'Investigative' },

  // Artistic (12 statements)
  { id: 25, text: 'Create art (paintings, sculptures, songs)', category: 'Artistic' },
  { id: 26, text: 'Use imagination freely', category: 'Artistic' },
  { id: 27, text: 'Play musical instruments', category: 'Artistic' },
  { id: 28, text: 'Write creative stories', category: 'Artistic' },
  { id: 29, text: 'Design visual projects', category: 'Artistic' },
  { id: 30, text: 'Sing (band, chorus, or solo)', category: 'Artistic' },
  { id: 31, text: 'Act in plays or movies', category: 'Artistic' },
  { id: 32, text: 'Dance or choreograph', category: 'Artistic' },
  { id: 33, text: 'Write poetry or novels', category: 'Artistic' },
  { id: 34, text: 'Design websites or graphics', category: 'Artistic' },
  { id: 35, text: 'Take artistic photographs', category: 'Artistic' },
  { id: 36, text: 'Create fashion designs', category: 'Artistic' },

  // Social (12 statements)
  { id: 37, text: 'Work in groups', category: 'Social' },
  { id: 38, text: 'Support friends emotionally', category: 'Social' },
  { id: 39, text: 'Volunteer for community projects', category: 'Social' },
  { id: 40, text: 'Provide advice on problems', category: 'Social' },
  { id: 41, text: 'Teach new skills', category: 'Social' },
  { id: 42, text: 'Plan social activities', category: 'Social' },
  { id: 43, text: 'Help people with disabilities', category: 'Social' },
  { id: 44, text: 'Counsel people with problems', category: 'Social' },
  { id: 45, text: 'Work with children', category: 'Social' },
  { id: 46, text: 'Care for elderly people', category: 'Social' },
  { id: 47, text: 'Mediate conflicts', category: 'Social' },
  { id: 48, text: 'Organize charity events', category: 'Social' },

  // Enterprising (12 statements)
  { id: 49, text: 'Lead group projects', category: 'Enterprising' },
  { id: 50, text: 'Persuade others', category: 'Enterprising' },
  { id: 51, text: 'Approach tasks confidently', category: 'Enterprising' },
  { id: 52, text: 'Sell successfully', category: 'Enterprising' },
  { id: 53, text: 'Serve as club president', category: 'Enterprising' },
  { id: 54, text: 'Organize activities', category: 'Enterprising' },
  { id: 55, text: 'Start your own business', category: 'Enterprising' },
  { id: 56, text: 'Manage a team', category: 'Enterprising' },
  { id: 57, text: 'Give presentations', category: 'Enterprising' },
  { id: 58, text: 'Negotiate deals', category: 'Enterprising' },
  { id: 59, text: 'Campaign for political office', category: 'Enterprising' },
  { id: 60, text: 'Promote products or services', category: 'Enterprising' },

  // Conventional (12 statements)
  { id: 61, text: 'Complete projects in organized manner', category: 'Conventional' },
  { id: 62, text: 'Follow directions thoroughly', category: 'Conventional' },
  { id: 63, text: 'Adhere to rules', category: 'Conventional' },
  { id: 64, text: 'Complete sequential tasks', category: 'Conventional' },
  { id: 65, text: 'Develop organized methods', category: 'Conventional' },
  { id: 66, text: 'Keep belongings organized', category: 'Conventional' },
  { id: 67, text: 'Work with numbers and data', category: 'Conventional' },
  { id: 68, text: 'Maintain detailed records', category: 'Conventional' },
  { id: 69, text: 'Use office equipment', category: 'Conventional' },
  { id: 70, text: 'Follow established procedures', category: 'Conventional' },
  { id: 71, text: 'Prepare financial reports', category: 'Conventional' },
  { id: 72, text: 'Organize files and documents', category: 'Conventional' },
];

export const reflectionQuestions = [
  'Did your strongest category sound like you? In what ways?',
  'Do your skill strengths relate to your identity?',
  'What surprised you about your results?'
];

export interface AssessmentResponse {
  statementId: number;
  rating: number; // 1-4 scale
}

export interface AssessmentResults {
  responses: AssessmentResponse[];
  categoryScores: Record<RiasecCategory, number>;
  topThreeCategories: RiasecCategory[];
  completedAt: Date;
}
