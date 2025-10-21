import { Stack, useRouter } from 'expo-router';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuizStore } from '@/store/store';
import Svg, { Circle } from 'react-native-svg';
import { quizQuestions } from '@/data/questions';

export default function ScoreScreen() {
  const router = useRouter();

  const { totalTimeTaken, getScore, getCorrectCount, getIncorrectCount, resetQuiz } =
    useQuizStore();

  const score = getScore();
  const correctCount = getCorrectCount();
  const incorrectCount = getIncorrectCount();
  const totalQuestions = quizQuestions.length;

  // Format time
  const minutes = Math.floor(totalTimeTaken / 60);
  const seconds = totalTimeTaken % 60;
  const timeFormatted = `${minutes}:${String(seconds).padStart(2, '0')}`;

  // Calculate circle progress
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const handleReviewAnswers = () => {
    router.push('/(screens)/review' as any);
  };

  const handleRestartQuiz = () => {
    resetQuiz();
    router.replace('/');
  };

  const handleBack = () => {
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-[#101c22] py-12">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pb-2">
        <Pressable onPress={handleBack} className="h-12 w-12 items-center justify-center">
          <Ionicons name="arrow-back-circle" size={32} color="white" />
        </Pressable>

        <Text className="flex-1 text-center text-lg font-bold text-white">Quiz Complete!</Text>

        <View className="w-12 items-end justify-center">
          <Text className="text-base font-bold text-[#92b7c9]">Share</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="items-center justify-center p-4">
          {/* Title */}
          <Text className="pb-3 pt-6 text-center text-[32px] font-bold text-white">Your Score</Text>

          {/* Circular Progress */}
          <View className="relative my-8 h-48 w-48 items-center justify-center">
            <Svg width={192} height={192} style={{ transform: [{ rotate: '-90deg' }] }}>
              {/* Background circle */}
              <Circle
                cx={96}
                cy={96}
                r={radius}
                stroke="#325567"
                strokeWidth={16}
                fill="transparent"
              />
              {/* Progress circle */}
              <Circle
                cx={96}
                cy={96}
                r={radius}
                stroke="#13a4ec"
                strokeWidth={16}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
            <View className="absolute items-center">
              <Text className="text-5xl font-bold text-white">{score}%</Text>
              <Text className="text-lg text-[#92b7c9]">
                {correctCount}/{totalQuestions}
              </Text>
            </View>
          </View>

          {/* Statistics */}
          <View className="w-full max-w-md p-4">
            <View className="flex-row justify-between border-b border-gray-700 py-2">
              <Text className="text-sm text-[#92b7c9]">Correct Answers</Text>
              <Text className="text-right text-sm text-white">{correctCount}</Text>
            </View>

            <View className="flex-row justify-between border-b border-gray-700 py-2">
              <Text className="text-sm text-[#92b7c9]">Incorrect Answers</Text>
              <Text className="text-right text-sm text-white">{incorrectCount}</Text>
            </View>

            <View className="flex-row justify-between py-2">
              <Text className="text-sm text-[#92b7c9]">Time Taken</Text>
              <Text className="text-right text-sm text-white">{timeFormatted}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="pb-8">
        <View className="flex max-w-[480px] flex-col gap-3 px-4 py-3">
          <Pressable
            onPress={handleReviewAnswers}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-[#13a4ec] px-5 active:opacity-90">
            <Text className="text-base font-bold text-white">Review Answers</Text>
          </Pressable>

          <Pressable
            onPress={handleRestartQuiz}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-[#233c48] px-5 active:opacity-80">
            <Text className="text-base font-bold text-white">Restart Quiz</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
