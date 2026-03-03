import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Clock, AlertTriangle, CheckCircle2, XCircle, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

export const TestInterface = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const questions = [
    {
      id: 1,
      question: "Разрешен ли Вам обгон в данной ситуации?",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/R-3.20.svg/200px-R-3.20.svg.png", // Placeholder
      options: [
        { id: "1", text: "Разрешен" },
        { id: "2", text: "Разрешен, если скорость грузовика менее 30 км/ч" },
        { id: "3", text: "Запрещен" }
      ],
      correct: "3",
      explanation: "Знак 3.20 'Обгон запрещен' запрещает обгон всех транспортных средств. Исключение: тихоходные ТС, гужевые повозки, велосипеды, мопеды и двухколесные мотоциклы без коляски."
    },
    {
      id: 2,
      question: "Кто должен уступить дорогу?",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2.1_Russian_road_sign.svg/200px-2.1_Russian_road_sign.svg.png", // Placeholder
      options: [
          { id: "1", text: "Водитель легкового автомобиля" },
          { id: "2", text: "Водитель грузовика" },
          { id: "3", text: "Оба водителя должны действовать по взаимной договоренности" }
      ],
      correct: "2",
      explanation: "Водитель легкового автомобиля движется по главной дороге (знак 2.1), поэтому имеет преимущество."
    }
  ];

  const handleCheck = () => {
    if (!selectedAnswer) return;
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      navigate('/results');
    }
  };

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl flex flex-col h-[calc(100vh-80px)]">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border">
         <div className="flex items-center gap-6 flex-1">
            <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Экзамен • Билет 5</span>
                <span className="text-lg font-bold text-slate-900">Вопрос {currentQuestion + 1} из {questions.length}</span>
            </div>
            <div className="hidden md:flex flex-1 max-w-xs flex-col justify-center gap-1">
                 <div className="flex justify-between text-xs font-medium text-slate-500">
                     <span>Прогресс</span>
                     <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
                 </div>
                 <Progress value={((currentQuestion) / questions.length) * 100} className="h-2 bg-slate-100" />
            </div>
         </div>
         <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold ${timeLeft < 300 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
            <Clock className="h-5 w-5" />
            <span>{formatTime(timeLeft)}</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-1 min-h-0">
         
         {/* Left: Question & Image (3/5 cols) */}
         <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto">
             <Card className="flex-1 flex flex-col overflow-hidden border shadow-sm">
                 <div className="flex-1 bg-slate-100 flex items-center justify-center relative min-h-[250px] p-8">
                     {/* Placeholder for Question Image */}
                     <img src={question.image} alt="Situation" className="max-h-full max-w-full object-contain shadow-lg rounded-lg" />
                 </div>
                 <CardContent className="p-6 md:p-8 bg-white border-t">
                     <h2 className="text-xl md:text-2xl font-bold leading-tight text-slate-900">{question.question}</h2>
                 </CardContent>
             </Card>
         </div>

         {/* Right: Answers & Feedback (2/5 cols) */}
         <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto">
             <Card className="border shadow-sm">
                 <CardContent className="p-6">
                     <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer} disabled={isAnswered} className="space-y-3">
                        {question.options.map((opt) => (
                            <div key={opt.id} 
                                className={`relative flex items-start space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                isAnswered 
                                    ? opt.id === question.correct 
                                        ? "bg-green-50 border-green-500 shadow-[0_0_0_1px_rgba(34,197,94,1)]" 
                                        : opt.id === selectedAnswer 
                                            ? "bg-red-50 border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]"
                                            : "border-slate-100 opacity-50"
                                    : selectedAnswer === opt.id 
                                        ? "border-blue-600 bg-blue-50 shadow-sm" 
                                        : "border-slate-100 hover:bg-slate-50 hover:border-slate-300"
                            }`}
                                onClick={() => !isAnswered && setSelectedAnswer(opt.id)}
                            >
                                <RadioGroupItem value={opt.id} id={opt.id} className="mt-1" />
                                <Label htmlFor={opt.id} className="flex-1 cursor-pointer text-base font-medium leading-relaxed text-slate-800">{opt.text}</Label>
                                
                                {isAnswered && opt.id === question.correct && (
                                    <div className="absolute right-4 top-4 bg-green-100 text-green-700 rounded-full p-1">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                )}
                                {isAnswered && opt.id === selectedAnswer && opt.id !== question.correct && (
                                    <div className="absolute right-4 top-4 bg-red-100 text-red-700 rounded-full p-1">
                                        <XCircle className="h-4 w-4" />
                                    </div>
                                )}
                            </div>
                        ))}
                     </RadioGroup>
                 </CardContent>
                 <CardFooter className="bg-slate-50 p-6 border-t flex justify-end">
                     {!isAnswered ? (
                         <Button size="lg" onClick={handleCheck} disabled={!selectedAnswer} className="w-full md:w-auto px-8 text-lg shadow-md">
                             Ответить
                         </Button>
                     ) : (
                         <Button size="lg" onClick={handleNext} className="w-full md:w-auto px-8 text-lg shadow-md gap-2 bg-slate-900 hover:bg-slate-800">
                             Далее <ArrowRight className="h-5 w-5" />
                         </Button>
                     )}
                 </CardFooter>
             </Card>

             {/* Explanation Block */}
             <AnimatePresence>
                 {isAnswered && (
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 20 }}
                     >
                         <Alert variant={isCorrect ? "default" : "destructive"} className={`shadow-md ${isCorrect ? "border-green-200 bg-green-50 text-green-900" : "border-red-200 bg-red-50 text-red-900"}`}>
                             <div className="flex items-start gap-3">
                                 {isCorrect ? <CheckCircle2 className="h-6 w-6 mt-0.5 shrink-0 text-green-600" /> : <AlertTriangle className="h-6 w-6 mt-0.5 shrink-0 text-red-600" />}
                                 <div className="space-y-2">
                                     <AlertTitle className="font-bold text-lg">
                                         {isCorrect ? "Верно!" : "Ошибка!"}
                                     </AlertTitle>
                                     <AlertDescription className="text-sm leading-relaxed opacity-90">
                                         {question.explanation}
                                     </AlertDescription>
                                     
                                     {!isCorrect && (
                                         <div className="mt-3 pt-3 border-t border-red-200/50 flex gap-2 items-start">
                                             <HelpCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                             <p className="text-xs font-medium text-slate-700">
                                                 <span className="text-primary font-bold">Подсказка AI:</span> Обратите внимание на знаки приоритета. Они действуют только на нерегулируемых перекрестках.
                                             </p>
                                         </div>
                                     )}
                                 </div>
                             </div>
                         </Alert>
                     </motion.div>
                 )}
             </AnimatePresence>
         </div>
      </div>
    </div>
  );
};
