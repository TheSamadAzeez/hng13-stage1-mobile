import { Stack, useRouter } from 'expo-router';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuizStore } from '@/store/store';
import { quizQuestions } from '@/data/questions';

export default function ReviewScreen() {
  const router = useRouter();
  const { getAnswerForQuestion, resetQuiz } = useQuizStore();

  const handlePlayAgain = () => {
    resetQuiz();
    router.replace('/');
  };

  const handleBackToHome = () => {
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-[#101c22] py-12">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pb-2">
        <Pressable onPress={handleBackToHome} className="h-12 w-12 items-center justify-center">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <Text className="flex-1 text-center text-lg font-bold text-white">Quiz Review</Text>

        <View className="w-12" />
      </View>

      <ScrollView className="flex-1 px-4 py-3">
        {/* Summary */}
        <View className="mb-6 text-center">
          <Text className="text-center text-base text-[#92b7c9]">
            You scored {useQuizStore.getState().getCorrectCount()} out of {quizQuestions.length}
          </Text>
        </View>

        {/* Questions Review */}
        <View className="gap-4">
          {quizQuestions.map((question, index) => {
            const userAnswer = getAnswerForQuestion(question.id);
            const isCorrect = userAnswer?.selectedOption === question.correctAnswer;

            return (
              <View key={question.id} className="rounded-xl bg-[#1A2A33] p-4">
                {/* Question Header */}
                <View className="mb-3 flex-row items-start justify-between">
                  <Text className="text-sm font-medium text-white">
                    Question {index + 1} of {quizQuestions.length}
                  </Text>
                  <Ionicons
                    name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                    size={24}
                    color={isCorrect ? '#22c55e' : '#ef4444'}
                  />
                </View>

                {/* Question Text */}
                <Text className="mb-4 text-base font-medium text-white">{question.question}</Text>

                {/* Options */}
                <View className="gap-3">
                  {question.options.map((option, optionIndex) => {
                    const isUserAnswer = userAnswer?.selectedOption === optionIndex;
                    const isCorrectAnswer = optionIndex === question.correctAnswer;

                    let borderColor = 'border-transparent';
                    let bgColor = '';
                    let showIcon = false;
                    let iconName: 'checkmark' | 'close' = 'checkmark';
                    let iconColor = '#22c55e';

                    if (isCorrectAnswer) {
                      borderColor = 'border-green-500';
                      bgColor = 'bg-green-500/10';
                      showIcon = true;
                      iconName = 'checkmark';
                      iconColor = '#22c55e';
                    } else if (isUserAnswer && !isCorrect) {
                      borderColor = 'border-red-500';
                      bgColor = 'bg-red-500/10';
                      showIcon = true;
                      iconName = 'close';
                      iconColor = '#ef4444';
                    }

                    return (
                      <View
                        key={optionIndex}
                        className={`flex-row items-center rounded-lg border p-3 ${borderColor} ${bgColor}`}>
                        <Text
                          className={`flex-1 text-sm ${isCorrectAnswer || (isUserAnswer && !isCorrect) ? 'text-white' : 'text-gray-400'}`}>
                          {option}
                        </Text>
                        {showIcon && (
                          <Ionicons
                            name={iconName}
                            size={20}
                            color={iconColor}
                            style={{ marginLeft: 8 }}
                          />
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="border-t border-gray-800 bg-[#101c22] p-4">
        <View className="flex-row justify-between gap-3">
          <Pressable
            onPress={handlePlayAgain}
            className="h-12 min-w-[84px] max-w-[480px] flex-1 items-center justify-center rounded-lg bg-[#13a4ec] px-4 active:opacity-90">
            <Text className="font-bold text-white">Play Again</Text>
          </Pressable>

          <Pressable
            onPress={handleBackToHome}
            className="h-12 min-w-[84px] max-w-[480px] flex-1 items-center justify-center rounded-lg bg-[#233c48] px-4 active:opacity-80">
            <Text className="font-bold text-white">Back to Home</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
