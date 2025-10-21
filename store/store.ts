import { create } from 'zustand';
import { quizQuestions } from '../data/questions';

interface UserAnswer {
  questionId: number;
  selectedOption: number | null;
  timeTaken: number; // seconds taken to answer
}

interface QuizState {
  // Quiz state
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  startTime: number | null;
  totalTimeTaken: number; // in seconds
  isQuizCompleted: boolean;

  // Timer state
  timeRemaining: number; // seconds remaining for current question
  timerActive: boolean;

  // Actions
  startQuiz: () => void;
  resetQuiz: () => void;
  setAnswer: (questionId: number, optionIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => void;
  setTimeRemaining: (time: number) => void;
  setTimerActive: (active: boolean) => void;

  // Computed values
  getScore: () => number;
  getCorrectCount: () => number;
  getIncorrectCount: () => number;
  getCurrentQuestion: () => (typeof quizQuestions)[0] | null;
  getAnswerForQuestion: (questionId: number) => UserAnswer | undefined;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  currentQuestionIndex: 0,
  userAnswers: [],
  startTime: null,
  totalTimeTaken: 0,
  isQuizCompleted: false,
  timeRemaining: 10, // 10 seconds per question
  timerActive: false,

  // Actions
  startQuiz: () =>
    set({
      currentQuestionIndex: 0,
      userAnswers: [],
      startTime: Date.now(),
      totalTimeTaken: 0,
      isQuizCompleted: false,
      timeRemaining: 10,
      timerActive: true,
    }),

  resetQuiz: () =>
    set({
      currentQuestionIndex: 0,
      userAnswers: [],
      startTime: null,
      totalTimeTaken: 0,
      isQuizCompleted: false,
      timeRemaining: 10,
      timerActive: false,
    }),

  setAnswer: (questionId: number, optionIndex: number) => {
    const state = get();
    const existingAnswerIndex = state.userAnswers.findIndex((a) => a.questionId === questionId);

    const newAnswer: UserAnswer = {
      questionId,
      selectedOption: optionIndex,
      timeTaken: 10 - state.timeRemaining,
    };

    if (existingAnswerIndex >= 0) {
      // Update existing answer
      const newAnswers = [...state.userAnswers];
      newAnswers[existingAnswerIndex] = newAnswer;
      set({ userAnswers: newAnswers });
    } else {
      // Add new answer
      set({ userAnswers: [...state.userAnswers, newAnswer] });
    }
  },

  nextQuestion: () => {
    const state = get();
    if (state.currentQuestionIndex < quizQuestions.length - 1) {
      set({
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timeRemaining: 10,
      });
    } else {
      // Last question, complete quiz
      state.completeQuiz();
    }
  },

  previousQuestion: () => {
    const state = get();
    if (state.currentQuestionIndex > 0) {
      set({
        currentQuestionIndex: state.currentQuestionIndex - 1,
        timeRemaining: 10,
      });
    }
  },

  completeQuiz: () => {
    const state = get();
    const endTime = Date.now();
    const totalTime = state.startTime ? Math.floor((endTime - state.startTime) / 1000) : 0;

    set({
      isQuizCompleted: true,
      totalTimeTaken: totalTime,
      timerActive: false,
    });
  },

  setTimeRemaining: (time: number) => set({ timeRemaining: time }),

  setTimerActive: (active: boolean) => set({ timerActive: active }),

  // Computed values
  getScore: () => {
    const state = get();
    const correctCount = state.getCorrectCount();
    return Math.round((correctCount / quizQuestions.length) * 100);
  },

  getCorrectCount: () => {
    const state = get();
    let correct = 0;

    state.userAnswers.forEach((answer) => {
      const question = quizQuestions.find((q) => q.id === answer.questionId);
      if (question && answer.selectedOption === question.correctAnswer) {
        correct++;
      }
    });

    return correct;
  },

  getIncorrectCount: () => {
    const state = get();
    return state.userAnswers.length - state.getCorrectCount();
  },

  getCurrentQuestion: () => {
    const state = get();
    return quizQuestions[state.currentQuestionIndex] || null;
  },

  getAnswerForQuestion: (questionId: number) => {
    const state = get();
    return state.userAnswers.find((a) => a.questionId === questionId);
  },
}));
