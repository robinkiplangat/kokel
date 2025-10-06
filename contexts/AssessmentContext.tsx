
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AssessmentState, ReflectionResponse } from '@/types/assessment';
import { RiasecCategory, riasecStatements, categoryInfo } from '@/data/riasecData';

interface AssessmentContextType {
  state: AssessmentState;
  reflectionResponses: ReflectionResponse[];
  updateResponse: (statementId: number, rating: number) => void;
  nextStatement: () => void;
  previousStatement: () => void;
  goToStatement: (index: number) => void;
  calculateScores: () => Record<RiasecCategory, number>;
  getTopThreeCategories: () => RiasecCategory[];
  resetAssessment: () => void;
  completeAssessment: () => void;
  updateReflectionResponse: (questionIndex: number, answer: string) => void;
  getProgress: () => number;
}

type AssessmentAction =
  | { type: 'UPDATE_RESPONSE'; statementId: number; rating: number }
  | { type: 'NEXT_STATEMENT' }
  | { type: 'PREVIOUS_STATEMENT' }
  | { type: 'GO_TO_STATEMENT'; index: number }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'RESET_ASSESSMENT' }
  | { type: 'UPDATE_REFLECTION'; questionIndex: number; answer: string };

const initialState: AssessmentState = {
  currentStatementIndex: 0,
  responses: {},
  categoryScores: {},
  isComplete: false,
  startedAt: null,
  completedAt: null,
};

const initialReflectionResponses: ReflectionResponse[] = [];

function assessmentReducer(
  state: AssessmentState,
  action: AssessmentAction
): AssessmentState {
  switch (action.type) {
    case 'UPDATE_RESPONSE':
      const newResponses = {
        ...state.responses,
        [action.statementId]: action.rating,
      };
      
      return {
        ...state,
        responses: newResponses,
        startedAt: state.startedAt || new Date(),
      };

    case 'NEXT_STATEMENT':
      if (state.currentStatementIndex < riasecStatements.length - 1) {
        return {
          ...state,
          currentStatementIndex: state.currentStatementIndex + 1,
        };
      }
      return state;

    case 'PREVIOUS_STATEMENT':
      if (state.currentStatementIndex > 0) {
        return {
          ...state,
          currentStatementIndex: state.currentStatementIndex - 1,
        };
      }
      return state;

    case 'GO_TO_STATEMENT':
      return {
        ...state,
        currentStatementIndex: Math.max(0, Math.min(action.index, riasecStatements.length - 1)),
      };

    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        isComplete: true,
        completedAt: new Date(),
      };

    case 'RESET_ASSESSMENT':
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

function reflectionReducer(
  state: ReflectionResponse[],
  action: AssessmentAction
): ReflectionResponse[] {
  switch (action.type) {
    case 'UPDATE_REFLECTION':
      const existingIndex = state.findIndex(r => r.questionIndex === action.questionIndex);
      if (existingIndex >= 0) {
        const newState = [...state];
        newState[existingIndex] = { questionIndex: action.questionIndex, answer: action.answer };
        return newState;
      } else {
        return [...state, { questionIndex: action.questionIndex, answer: action.answer }];
      }

    case 'RESET_ASSESSMENT':
      return [];

    default:
      return state;
  }
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  const [reflectionResponses, dispatchReflection] = useReducer(reflectionReducer, initialReflectionResponses);

  const updateResponse = (statementId: number, rating: number) => {
    dispatch({ type: 'UPDATE_RESPONSE', statementId, rating });
  };

  const nextStatement = () => {
    dispatch({ type: 'NEXT_STATEMENT' });
  };

  const previousStatement = () => {
    dispatch({ type: 'PREVIOUS_STATEMENT' });
  };

  const goToStatement = (index: number) => {
    dispatch({ type: 'GO_TO_STATEMENT', index });
  };

  const calculateScores = (): Record<RiasecCategory, number> => {
    const scores: Record<RiasecCategory, number> = {
      Realistic: 0,
      Investigative: 0,
      Artistic: 0,
      Social: 0,
      Enterprising: 0,
      Conventional: 0,
    };

    Object.entries(state.responses).forEach(([statementIdStr, rating]) => {
      const statementId = parseInt(statementIdStr);
      const statement = riasecStatements.find(s => s.id === statementId);
      if (statement) {
        scores[statement.category] += rating;
      }
    });

    return scores;
  };

  const getTopThreeCategories = (): RiasecCategory[] => {
    const scores = calculateScores();
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category as RiasecCategory);
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
    dispatchReflection({ type: 'RESET_ASSESSMENT' });
  };

  const completeAssessment = () => {
    dispatch({ type: 'COMPLETE_ASSESSMENT' });
  };

  const updateReflectionResponse = (questionIndex: number, answer: string) => {
    dispatchReflection({ type: 'UPDATE_REFLECTION', questionIndex, answer });
  };

  const getProgress = (): number => {
    const totalStatements = riasecStatements.length;
    const answeredStatements = Object.keys(state.responses).length;
    return (answeredStatements / totalStatements) * 100;
  };

  const value: AssessmentContextType = {
    state,
    reflectionResponses,
    updateResponse,
    nextStatement,
    previousStatement,
    goToStatement,
    calculateScores,
    getTopThreeCategories,
    resetAssessment,
    completeAssessment,
    updateReflectionResponse,
    getProgress,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
