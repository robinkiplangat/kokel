
export interface AssessmentState {
  currentStatementIndex: number;
  responses: Record<number, number>;
  categoryScores: Record<string, number>;
  isComplete: boolean;
  startedAt: Date | null;
  completedAt: Date | null;
}

export interface ReflectionResponse {
  questionIndex: number;
  answer: string;
}

export interface AssessmentSession {
  id: string;
  assessmentState: AssessmentState;
  reflectionResponses: ReflectionResponse[];
  createdAt: Date;
  updatedAt: Date;
}
