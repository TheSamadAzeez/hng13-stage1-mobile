export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What does 'API' stand for?",
    options: [
      'Application Programming Interface',
      'Automated Program Interaction',
      'Advanced Peripheral Integration',
      'Application Process Integration',
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: 'What is the main function of a CPU?',
    options: [
      'Store data long-term',
      'Process instructions',
      'Display graphics',
      'Connect to the internet',
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'Which of the following is a version control system?',
    options: ['Docker', 'Git', 'Kubernetes', 'Jenkins'],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlinks and Text Markup Language',
    ],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: 'What was the first commercially successful video game?',
    options: ['Pong', 'Space Invaders', 'Pac-Man', 'Donkey Kong'],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: "Which programming language is known as the 'language of the web'?",
    options: ['Python', 'Java', 'JavaScript', 'C++'],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: 'What does RAM stand for?',
    options: [
      'Random Access Memory',
      'Read Access Memory',
      'Rapid Application Memory',
      'Runtime Application Module',
    ],
    correctAnswer: 0,
  },
  {
    id: 8,
    question: 'Who is known as the father of modern computing?',
    options: ['Bill Gates', 'Steve Jobs', 'Alan Turing', 'Tim Berners-Lee'],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: 'What is the purpose of a firewall in computer security?',
    options: [
      'Speed up internet connection',
      'Block unauthorized access',
      'Store passwords',
      'Encrypt files',
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: 'Which company developed the React JavaScript library?',
    options: ['Google', 'Microsoft', 'Facebook (Meta)', 'Amazon'],
    correctAnswer: 2,
  },
];
