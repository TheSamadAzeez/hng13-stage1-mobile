import { Stack, useRouter } from 'expo-router';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useQuizStore } from '@/store/store';
import { quizQuestions } from '@/data/questions';

export default function QuizScreen() {
  const router = useRouter();

  const {
    currentQuestionIndex,
    timeRemaining,
    timerActive,
    startQuiz,
    setAnswer,
    nextQuestion,
    previousQuestion,
    setTimeRemaining,
    setTimerActive,
    getCurrentQuestion,
    getAnswerForQuestion,
  } = useQuizStore();

  const currentQuestion = getCurrentQuestion();
  const userAnswer = currentQuestion ? getAnswerForQuestion(currentQuestion.id) : undefined;

  useEffect(() => {
    // Start quiz when component mounts
    startQuiz();
  }, [startQuiz]);

  // Timer effect
  useEffect(() => {
    if (!timerActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, timerActive, setTimeRemaining]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex === quizQuestions.length - 1) {
      // Last question - go to score screen
      router.replace('/(screens)/score' as any);
    } else {
      nextQuestion();
      setTimerActive(true);
    }
  }, [currentQuestionIndex, router, nextQuestion, setTimerActive]);

  // Auto-advance when timer runs out
  useEffect(() => {
    if (timeRemaining === 0 && timerActive) {
      setTimerActive(false);
      // Auto-advance after a brief delay
      setTimeout(() => {
        handleNext();
      }, 500);
    }
  }, [timeRemaining, timerActive, handleNext, setTimerActive]);

  const handleOptionSelect = (optionIndex: number) => {
    if (currentQuestion) {
      setAnswer(currentQuestion.id, optionIndex);
    }
  };

  const handlePrevious = () => {
    previousQuestion();
    setTimerActive(true);
  };

  const handleClose = () => {
    router.back();
  };

  if (!currentQuestion) {
    return null;
  }

  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <View className="flex-1 bg-[#101c22] pt-12">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pb-2">
        <Pressable onPress={handleClose} className="h-12 w-12 items-center justify-center">
          <Ionicons name="close" size={24} color="white" />
        </Pressable>

        <Text className="flex-1 text-center text-lg font-bold text-white">
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </Text>

        <View className="w-12 items-end justify-center">
          <Text className="text-base font-bold text-[#13a4ec]">
            {String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:
            {String(timeRemaining % 60).padStart(2, '0')}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="px-4 pb-4 pt-2">
        <View className="h-2.5 w-full rounded-full bg-slate-700">
          <View className="h-2.5 rounded-full bg-[#13a4ec]" style={{ width: `${progress}%` }} />
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Question */}
        <Text className="px-4 pb-3 pt-6 text-[32px] font-bold text-white">
          {currentQuestion.question}
        </Text>

        {/* Options */}
        <View className="mt-4 flex flex-col gap-5 p-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = userAnswer?.selectedOption === index;

            return (
              <Pressable
                key={index}
                onPress={() => handleOptionSelect(index)}
                className={`flex flex-row-reverse items-center gap-4 rounded-lg border p-[15px] ${
                  isSelected ? 'border-[#13a4ec] bg-[#13a4ec]/20' : 'border-slate-700'
                }`}>
                <View
                  className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
                    isSelected ? 'border-[#13a4ec]' : 'border-slate-700'
                  }`}>
                  {isSelected && <View className="h-3 w-3 rounded-full bg-[#13a4ec]" />}
                </View>
                <Text className="flex-1 font-medium text-white">{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="bg-[#101c22] py-4">
        <View className="flex-row justify-between gap-3 px-4">
          <Pressable
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex h-12 min-w-[84px] max-w-[480px] flex-1 items-center justify-center rounded-lg px-5 ${
              currentQuestionIndex === 0 ? 'bg-slate-800/50' : 'bg-slate-800'
            }`}>
            <Text className="text-base font-bold text-white">Previous</Text>
          </Pressable>

          <Pressable
            onPress={handleNext}
            className="flex h-12 min-w-[84px] max-w-[480px] flex-1 items-center justify-center rounded-lg bg-[#13a4ec] px-5 active:opacity-90">
            <Text className="text-base font-bold text-white">
              {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
