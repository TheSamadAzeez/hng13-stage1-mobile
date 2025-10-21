# 🧠 Tech Trivia Quiz App

A mobile quiz application built with React Native and Expo that challenges users with technology-related questions from programming and frameworks to tools and tech history.

## 📱 Demo

**Appetize.io Preview Link:** https://appetize.io/app/b_6c5vcpopjeyugoofqvcfys5kxu

## ✨ Features

### Core Features

- **10 Technology Questions**: Curated questions covering programming, hardware, and tech history
- **Single Question Display**: One question per screen for focused attention
- **Navigation Controls**: Previous and Next buttons for easy navigation
- **Final Score Screen**: View your total results at the end of the quiz
- **Review Screen**: Detailed breakdown of correct and incorrect answers with visual indicators

### Bonus Features

- ⏱️ **Timer**: 30-second countdown for each question
- 🚀 **Auto-advance**: Automatically moves to the next question when time runs out
- 💾 **State Management**: Uses Zustand for efficient state management
- 📊 **Progress Tracking**: Visual progress bar showing quiz completion
- 🎨 **Modern UI**: Clean, dark-themed interface with smooth transitions
- ♿ **Responsive Design**: Optimized for various screen sizes

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (v0.81.4)
- **Runtime**: [Expo](https://expo.dev/) (v54.0.0)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (v6.0.10)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (v4.5.1)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Language**: TypeScript
- **Icons**: [@expo/vector-icons](https://icons.expo.fyi/)

## 📁 Project Structure

```
hng13-stage1-mobile/
├── app/                          # Application screens
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Welcome/Home screen
│   ├── quiz.tsx                 # Main quiz screen
│   └── (screens)/               # Nested screens
│       ├── score.tsx            # Final score display
│       └── review.tsx           # Answer review screen
├── components/                   # Reusable components
├── data/
│   └── questions.ts             # Quiz questions data
├── store/
│   └── store.ts                 # Zustand state management
├── assets/                       # Images and static files
├── android/                      # Android native files
└── package.json                 # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TheSamadAzeez/hng13-stage1-mobile.git
   cd hng13-stage1-mobile
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm start
   ```

4. **Run on your device**
   - **Android**: Press `a` in the terminal or run `pnpm android`
   - **iOS**: Press `i` in the terminal or run `pnpm ios`
   - **Web**: Press `w` in the terminal or run `pnpm web`

### Building for Production

#### Android APK

1. **Prebuild native files**

   ```bash
   pnpm prebuild
   ```

2. **Build the APK**

   ```bash
   cd android
   ./gradlew assembleRelease
   ```

   The APK will be available at: `android/app/build/outputs/apk/release/app-release.apk`

#### Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🎮 How to Use

1. **Start Quiz**: Tap "Start Quiz" on the welcome screen
2. **Answer Questions**: Select an option for each question
3. **Navigate**: Use Previous/Next buttons to move between questions
4. **Timer**: Complete each question within 30 seconds
5. **View Score**: See your final score and statistics
6. **Review Answers**: Check which answers were correct or incorrect
7. **Retry**: Start a new quiz from the score or review screen

## 📝 Quiz Question Format

Questions are stored in `data/questions.ts`:

```typescript
{
  id: number;
  question: string;
  options: string[]; // Array of 4 options
  correctAnswer: number; // Index of correct option (0-3)
}
```

## 🎨 Design Features

- **Dark Theme**: Easy on the eyes with a modern dark color scheme (#101c22 background)
- **Brand Color**: Vibrant blue (#13a4ec) for CTAs and accents
- **Visual Feedback**:
  - Selected options highlighted in blue
  - Correct answers shown in green
  - Incorrect answers shown in red
  - Circular progress indicator for score
- **Smooth Animations**: Native animations for screen transitions
- **Accessible**: High contrast ratios and clear visual hierarchy

## 🔧 Configuration Files

- `app.json`: Expo configuration
- `eas.json`: EAS Build configuration
- `tailwind.config.js`: Tailwind CSS customization
- `tsconfig.json`: TypeScript configuration
- `metro.config.js`: Metro bundler configuration

## 📦 Key Dependencies

```json
{
  "expo": "^54.0.0",
  "expo-router": "~6.0.10",
  "react": "19.1.0",
  "react-native": "0.81.4",
  "zustand": "^4.5.1",
  "nativewind": "latest"
}
```

## 🧪 Development Scripts

```bash
# Start Expo development server
pnpm start

# Run on Android
pnpm android

# Run on iOS
pnpm ios

# Run on Web
pnpm web

# Lint code
pnpm lint

# Format code
pnpm format

# Prebuild native projects
pnpm prebuild
```

## 📊 State Management

The app uses Zustand for state management with the following key features:

- Current question tracking
- User answer storage
- Timer management
- Score calculation
- Quiz reset functionality

## 🤝 Contributing

This is a Stage 1 task for HNG Internship 13. The project demonstrates:

- Understanding of app flow and navigation
- State management in React Native
- Screen transitions and routing
- User interaction handling
- Timer implementation

## 📄 License

This project was created as part of the HNG13 Mobile Track Stage 1 Task.

## 👨‍💻 Author

**Samad Azeez**

- GitHub: [@TheSamadAzeez](https://github.com/TheSamadAzeez)

## 🙏 Acknowledgments

- [HNG Internship](https://hng.tech/) for the opportunity
- [Expo](https://expo.dev/) for the amazing development platform
- Design inspiration from Dribbble and Behance

## 📱 Deployment

### Uploading to Appetize.io

1. Build your APK using the instructions above
2. Go to [Appetize.io](https://appetize.io)
3. Click "Upload" and select your APK file
4. Configure device settings (recommend Pixel 7)
5. Generate and copy your public preview link
6. Add the link to this README and your submission

---

**Built with ❤️ for HNG Internship Stage 1**

_The journey to mastery begins with a single line of code 🚀_
