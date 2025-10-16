import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { CheckCircle2, XCircle, Trophy, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Quiz = () => {
  const { lessonId } = useParams();
  const { user, updateUserProgress } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showKnowledge, setShowKnowledge] = useState(true);

  // Quiz questions for each lesson
  const quizData: Record<string, QuizQuestion[]> = {
    'money-basics-1': [
      {
        question: 'What is the primary purpose of money?',
        options: [
          'To store value and exchange goods',
          'Only for decoration',
          'To make paper',
          'Only for lending',
        ],
        correct: 0,
        explanation: 'Money serves as a medium of exchange, a store of value, and a unit of account.',
      },
      {
        question: 'Which of these is NOT a form of money?',
        options: [
          'Coins',
          'Bank notes',
          'Digital payments',
          'Personal promises',
        ],
        correct: 3,
        explanation: 'Personal promises are not considered money. Money must be widely accepted as a medium of exchange.',
      },
      {
        question: 'Why is saving money in a safe place important?',
        options: [
          'It helps protect and preserve its value',
          'Money grows automatically without effort',
          'Money never loses value',
          'Banks give it back doubled',
        ],
        correct: 0,
        explanation: 'Saving money in safe places like banks protects it from loss or theft and may earn interest.',
      },
    ],
    'money-basics-2': [
      {
        question: 'What is income?',
        options: [
          'Money you spend on things',
          'Money you earn or receive',
          'Money you lend to others',
          'Money you find',
        ],
        correct: 1,
        explanation: 'Income is the money you earn from work, business, or other sources.',
      },
      {
        question: 'What are expenses?',
        options: [
          'Money you earn',
          'Money you save',
          'Money you spend on goods and services',
          'Money you invest',
        ],
        correct: 2,
        explanation: 'Expenses are the costs of goods and services you buy or pay for.',
      },
      {
        question: 'What happens when expenses are greater than income?',
        options: [
          'You save money',
          'You go into debt',
          'You become rich',
          'Nothing happens',
        ],
        correct: 1,
        explanation: 'When you spend more than you earn, you may need to borrow money, leading to debt.',
      },
    ],
    'savings-1': [
      {
        question: 'Why is it important to save money regularly?',
        options: [
          'To prepare for future needs and emergencies',
          'Money saved disappears',
          'There is no benefit',
          'Only rich people should save',
        ],
        correct: 0,
        explanation: 'Regular saving helps you prepare for unexpected expenses and achieve future goals.',
      },
      {
        question: 'What is a good habit for building savings?',
        options: [
          'Spend first, save if anything is left',
          'Save a fixed amount before spending',
          'Only save when you have extra money',
          'Never save, always spend',
        ],
        correct: 1,
        explanation: 'Saving first (paying yourself first) ensures you build savings consistently.',
      },
      {
        question: 'How much should you try to save from your income?',
        options: [
          'Nothing',
          'Everything',
          'At least 10-20% regularly',
          'Only once a year',
        ],
        correct: 2,
        explanation: 'Financial experts recommend saving at least 10-20% of your income regularly.',
      },
    ],
    'savings-2': [
      {
        question: 'What is an emergency fund?',
        options: [
          'Money for shopping',
          'Money saved for unexpected expenses',
          'Money for vacations',
          'Money to lend to friends',
        ],
        correct: 1,
        explanation: 'An emergency fund is money set aside specifically for unexpected expenses like medical bills or job loss.',
      },
      {
        question: 'How many months of expenses should an emergency fund cover?',
        options: [
          'One week',
          '3-6 months',
          '10 years',
          'No specific amount',
        ],
        correct: 1,
        explanation: 'Financial experts recommend having 3-6 months of living expenses in an emergency fund.',
      },
      {
        question: 'When should you use your emergency fund?',
        options: [
          'For a new phone',
          'For a vacation',
          'For medical emergencies or job loss',
          'For shopping sales',
        ],
        correct: 2,
        explanation: 'Emergency funds should only be used for true emergencies like medical expenses or sudden job loss.',
      },
    ],
    'budgeting-1': [
      {
        question: 'What is the 50-30-20 budgeting rule?',
        options: [
          '50% needs, 30% wants, 20% savings',
          '50% savings, 30% needs, 20% wants',
          '50% wants, 30% savings, 20% needs',
          '50% investments, 30% needs, 20% wants',
        ],
        correct: 0,
        explanation: 'The 50-30-20 rule suggests allocating 50% for needs, 30% for wants, and 20% for savings.',
      },
      {
        question: 'Which of these is a "need" in budgeting?',
        options: [
          'Movie tickets',
          'Rent and food',
          'Designer clothes',
          'Gaming subscriptions',
        ],
        correct: 1,
        explanation: 'Needs are essential expenses like housing, food, utilities, and basic transportation.',
      },
      {
        question: 'Why is tracking your spending important?',
        options: [
          'It helps you know where your money goes',
          'It makes money grow',
          'It is not important',
          'Only banks need to track',
        ],
        correct: 0,
        explanation: 'Tracking spending helps you identify where your money goes and make better financial decisions.',
      },
    ],
    'investing-1': [
      {
        question: 'What does ROI stand for?',
        options: [
          'Return of Investment',
          'Rate of Interest',
          'Return on Investment',
          'Risk on Investment',
        ],
        correct: 2,
        explanation: 'ROI stands for Return on Investment, measuring the profitability of an investment.',
      },
      {
        question: 'Why do people invest money?',
        options: [
          'To lose it',
          'To make their money grow over time',
          'Because they have too much',
          'Only for fun',
        ],
        correct: 1,
        explanation: 'People invest to grow their wealth over time through returns like interest, dividends, or appreciation.',
      },
      {
        question: 'What is a key rule of investing?',
        options: [
          'Invest all your money in one place',
          'Only invest what you can afford to lose',
          'Borrow money to invest',
          'Always invest based on tips',
        ],
        correct: 1,
        explanation: 'You should only invest money you can afford to lose and diversify your investments to reduce risk.',
      },
    ],
  };

  const quizQuestions: QuizQuestion[] = quizData[lessonId || 'money-basics-1'] || quizData['money-basics-1'];

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(optionIndex);
    const isCorrect = optionIndex === quizQuestions[currentQuestion].correct;
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setShowResult(true);
    
    const passed = score >= quizQuestions.length * 0.6;
    const earnedXP = passed ? 100 : 50;
    
    if (user && lessonId && !user.completedQuizzes.includes(lessonId)) {
      updateUserProgress({
        completedQuizzes: [...user.completedQuizzes, lessonId],
        xp: user.xp + earnedXP,
        level: Math.floor((user.xp + earnedXP) / 100) + 1,
        streak: user.streak + (passed ? 1 : 0),
      });

      toast({
        title: passed ? 'Quiz Passed! 🎉' : 'Keep Learning!',
        description: `You earned ${earnedXP} XP!`,
      });
    }
  };

  const retryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setShowKnowledge(true);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Knowledge screen before quiz
  if (showKnowledge) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              {t('knowledge.title', language)}
            </CardTitle>
            <CardDescription>{t('knowledge.tips', language)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  {t('quiz.tip1', language)}
                </p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  {t('quiz.tip2', language)}
                </p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  {t('quiz.tip3', language)}
                </p>
              </div>
            </div>
            <Button onClick={() => setShowKnowledge(false)} className="w-full" size="lg">
              {t('knowledge.ready', language)}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const passed = score >= quizQuestions.length * 0.6;
    const percentage = (score / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-hover animate-bounce-in">
          <CardHeader className="text-center">
            <div className={`mx-auto w-20 h-20 rounded-full ${
              passed ? 'bg-success/10' : 'bg-secondary/10'
            } flex items-center justify-center mb-4`}>
              {passed ? (
                <Trophy className="h-10 w-10 text-success" />
              ) : (
                <Star className="h-10 w-10 text-secondary" />
              )}
            </div>
            <CardTitle className="text-3xl">
              {passed ? 'Congratulations! 🎉' : 'Good Effort! 💪'}
            </CardTitle>
            <CardDescription className="text-lg">
              {t('quiz.score', language)}: {score} / {quizQuestions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{percentage.toFixed(0)}%</div>
              <p className="text-muted-foreground">
                {passed ? 'You passed the quiz!' : 'Score 60% or higher to pass'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={retryQuiz} variant="outline" className="flex-1">
                {t('quiz.retry', language)}
              </Button>
              <Button onClick={() => navigate('/lessons')} variant="default" className="flex-1">
                {t('quiz.continue', language)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {t('quiz.question', language)} {currentQuestion + 1} / {quizQuestions.length}
            </span>
            <Badge variant="secondary">
              <Star className="h-3 w-3 mr-1" />
              {score} {t('quiz.correct', language)}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-hover animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correct;
              const showCorrect = selectedAnswer !== null && isCorrect;
              const showWrong = selectedAnswer === idx && !isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    showCorrect
                      ? 'border-success bg-success/10 text-success'
                      : showWrong
                      ? 'border-destructive bg-destructive/10 text-destructive'
                      : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-muted'
                  } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showCorrect && <CheckCircle2 className="h-5 w-5" />}
                    {showWrong && <XCircle className="h-5 w-5" />}
                  </div>
                </button>
              );
            })}

            {selectedAnswer !== null && (
              <div className="mt-4 p-4 rounded-lg bg-muted animate-slide-up">
                <p className="text-sm font-medium mb-1">Explanation:</p>
                <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
              </div>
            )}

            {selectedAnswer !== null && (
              <Button onClick={nextQuestion} className="w-full" variant="default">
                {currentQuestion < quizQuestions.length - 1
                  ? t('quiz.next', language)
                  : t('quiz.submit', language)}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
