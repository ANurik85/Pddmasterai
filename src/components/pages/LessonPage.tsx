import React, { useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  MessageCircle,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { motion } from "motion/react";

interface LessonPageProps {
  onNavigate: (page: string) => void;
}

export const LessonPage = ({ onNavigate }: LessonPageProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border">
        <Button variant="ghost" onClick={() => onNavigate('learn')} className="gap-2 self-start">
          <ChevronLeft className="h-4 w-4" /> Назад к курсу
        </Button>
        <div className="flex flex-col md:flex-row items-center gap-4 flex-1 max-w-xl mx-auto w-full">
           <span className="text-sm text-muted-foreground whitespace-nowrap font-medium">Урок 4: Знаки приоритета</span>
           <div className="w-full flex items-center gap-3">
             <Progress value={progress} className="h-3 flex-1" />
             <span className="text-sm font-bold min-w-[3ch]">{step}/{totalSteps}</span>
           </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 self-end md:self-auto text-primary border-primary/20 bg-primary/5">
          <MessageCircle className="h-4 w-4" />
          AI Помощник
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lesson Content (Left 2/3) */}
        <motion.div 
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          key={step} // Re-animate on step change
          transition={{ duration: 0.3 }}
        >
          
          <h2 className="text-3xl font-bold tracking-tight">1. Принцип действия знаков</h2>

          {/* Video/Animation Player */}
          <Card className="aspect-video bg-black relative overflow-hidden group rounded-2xl shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center z-10">
               <Button size="icon" className="h-20 w-20 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-all transform hover:scale-110">
                 <Play className="h-10 w-10 ml-1 fill-current" />
               </Button>
            </div>
            {/* Placeholder gradient as video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white z-20">
               <h3 className="font-bold text-lg">Видео: Разбор приоритетов на перекрестке</h3>
               <p className="text-slate-300 text-sm">Длительность: 2:15</p>
            </div>
          </Card>

          {/* Interactive Scheme Placeholder */}
          <Card className="p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50 rounded-2xl min-h-[320px]">
             <div className="p-6 rounded-full bg-white shadow-md text-blue-600">
                <CheckCircle2 className="h-12 w-12" />
             </div>
             <div className="max-w-md space-y-2">
               <h3 className="font-bold text-xl">Интерактивная задача</h3>
               <p className="text-muted-foreground">
                 Нажмите на транспортные средства в том порядке, в котором они должны проехать перекресток.
               </p>
             </div>
             <Button>Запустить симуляцию</Button>
          </Card>

        </motion.div>

        {/* Text & Info (Right 1/3) */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-primary shadow-md">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-2 text-primary font-bold text-lg border-b pb-3">
                <BookOpen className="h-5 w-5" />
                Конспект урока
              </div>
              
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="hover:bg-slate-50 px-2 rounded-lg text-base font-semibold">Главная дорога (2.1)</AccordionTrigger>
                  <AccordionContent className="text-slate-600 px-2 leading-relaxed">
                    Дорога, обозначенная знаками 2.1, 2.3.1-2.3.7 или 5.1. Водитель на главной дороге имеет преимущество.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-none">
                  <AccordionTrigger className="hover:bg-slate-50 px-2 rounded-lg text-base font-semibold">Уступите дорогу (2.4)</AccordionTrigger>
                  <AccordionContent className="text-slate-600 px-2 leading-relaxed">
                    Водитель должен уступить дорогу ТС, движущимся по пересекаемой дороге, а при наличии таб. 8.13 — по главной.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-none">
                  <AccordionTrigger className="hover:bg-slate-50 px-2 rounded-lg text-base font-semibold">STOP (2.5)</AccordionTrigger>
                  <AccordionContent className="text-slate-600 px-2 leading-relaxed">
                    Запрещается движение без остановки перед стоп-линией или краем пересекаемой проезжей части.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* AI Helper Widget */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-sm">
            <CardContent className="p-5 flex flex-col gap-4">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                    <MessageCircle className="h-6 w-6" />
                 </div>
                 <div>
                    <p className="font-bold text-blue-900">Непонятен момент?</p>
                    <p className="text-xs text-blue-700">AI объяснит простыми словами.</p>
                 </div>
               </div>
               <div className="space-y-2">
                 <p className="text-sm text-slate-600 italic bg-white/50 p-3 rounded-lg border border-blue-100/50">
                   "Почему знак STOP восьмиугольный?"
                 </p>
                 <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 shadow-md" onClick={() => onNavigate('ai-explanation')}>
                   Спросить ИИ
                 </Button>
               </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between pt-8 border-t mt-8">
        <Button variant="outline" size="lg" disabled={step === 1} onClick={() => setStep(s => s - 1)} className="w-32">
          <ChevronLeft className="mr-2 h-4 w-4" /> Назад
        </Button>
        <Button size="lg" onClick={() => step < totalSteps ? setStep(s => s + 1) : onNavigate('learn')} className="w-32 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all">
          {step < totalSteps ? 'Далее' : 'Завершить'} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
