import { Stack, useRouter } from 'expo-router';
import { View, Text, Pressable, Image } from 'react-native';
import { useQuizStore } from '@/store/store';

export default function WelcomeScreen() {
  const router = useRouter();
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const handleStartQuiz = () => {
    resetQuiz();
    router.push('/quiz');
  };

  return (
    <View className="flex-1 bg-[#101c22]">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 items-center justify-center px-4">
        {/* Brain Icon */}
        <View className="mb-6 flex aspect-[3/2] w-full max-w-sm justify-center gap-1 overflow-hidden">
          <View className="mx-auto w-1/2 flex-1  bg-contain bg-center bg-no-repeat">
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD60CGmVntkedn8vCaMOuf6q8I7vuEXJP4AMng5gGBkPffJ2hw3yUx7cwaNVapFSgLg35_s4wy7Zz4rg9GF8rxq95EbDS2p5Tky9qYVwLYrAkftsXFn2pXIBEUp28HJTZBxBQJDUPXibZWGRpGhxKPEv57wStx48KyoLK3AamVGw84KW1Rj_AXD2V9K4a05AuTYobekpljlfrte7qm0_5OlsAouoQRVzHJUNXmtUvf6xpiQFR4EhY2U4bGkuLuYBKElc2XqbIZ0guc',
              }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Title */}
        <Text className="pb-3 pt-6 text-center text-[32px] font-bold text-white">
          Welcome to Tech Trivia!
        </Text>

        {/* Description */}
        <Text className="px-4 pb-3 pt-1 text-center text-xl font-normal text-white">
          Challenge yourself with questions on programming, hardware, and tech history.
        </Text>

        {/* Buttons */}
        <View className="w-full max-w-sm">
          <View className="px-4 py-3">
            <Pressable
              onPress={handleStartQuiz}
              className="flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-[#13a4ec] px-5 active:opacity-90">
              <Text className="truncate text-base font-bold text-white">Start Quiz</Text>
            </Pressable>
          </View>

          {/* <View className="px-4 py-3">
            <Pressable className="flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-[#233c48] px-5 active:opacity-80">
              <Text className="truncate text-base font-bold text-white">Settings</Text>
            </Pressable>
          </View> */}
        </View>
      </View>
    </View>
  );
}
