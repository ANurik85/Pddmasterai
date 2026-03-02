import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { PlayCircle, Layers, BrainCircuit, Gamepad2, AlertTriangle, Signpost, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface LearningHubProps {
  onNavigate: (page: string) => void;
}

export const LearningHub = ({ onNavigate }: LearningHubProps) => {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-10 max-w-7xl">
      
      {/* 1. Continue Learning Widget */}
      <section>
        <h2 className="text-2xl font-bold mb-6 tracking-tight text-slate-800">Продолжить обучение</h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 p-12 opacity-10 transform rotate-12 translate-x-10 -translate-y-10">
                <Signpost size={240} />
             </div>
            <CardHeader className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">Урок 4: Знаки приоритета</CardTitle>
                  <CardDescription className="text-slate-300 text-base">Раздел: Дорожные знаки</CardDescription>
                </div>
                <div className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20">
                  В процессе
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-300">
                   <span>Прогресс урока</span>
                   <span>60%</span>
                </div>
                <Progress value={60} className="h-3 bg-slate-700/50" indicatorClassName="bg-blue-500" />
              </div>
              <p className="text-slate-300 max-w-lg leading-relaxed">
                Вы остановились на теме "Знаки преимущества встречного движения". Осталось пройти тест и практическое задание.
              </p>
            </CardContent>
            <CardFooter className="relative z-10 pt-2">
              <Button onClick={() => onNavigate('lesson')} size="lg" className="bg-white text-slate-900 hover:bg-blue-50 hover:text-blue-700 transition-colors gap-2 font-semibold shadow-lg">
                <PlayCircle className="h-5 w-5" />
                Продолжить урок
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </section>

      {/* 2. Recommended Topics (Weak spots) */}
      <section>
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold tracking-tight text-slate-800">Рекомендуем повторить</h2>
           <Button variant="link" className="text-primary font-medium">Анализ ошибок <ArrowRight className="ml-1 h-4 w-4" /></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Проезд перекрестков", desc: "Частые ошибки в очередности.", color: "text-orange-500", border: "border-l-orange-500", bg: "bg-orange-50", icon: AlertTriangle, label: "Слабая тема" },
              { title: "Временная разметка", desc: "Приоритет над постоянной.", color: "text-yellow-500", border: "border-l-yellow-500", bg: "bg-yellow-50", icon: AlertTriangle, label: "Нужно закрепить" }
            ].map((item, i) => (
               <Card key={i} className={`border-l-4 ${item.border} hover:shadow-lg transition-all cursor-pointer group bg-white`} onClick={() => onNavigate('lesson')}>
                <CardHeader className="pb-3">
                  <div className={`flex items-center gap-2 ${item.color} mb-2 bg-white w-fit px-2 py-1 rounded-md shadow-sm border`}>
                    <item.icon className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}

             <Card className="hover:shadow-lg transition-all cursor-pointer border-dashed bg-slate-50/50 border-2 flex flex-col items-center justify-center text-center p-6 group">
                 <div className="p-4 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <BrainCircuit className="h-8 w-8 text-slate-400 group-hover:text-primary" />
                 </div>
                 <span className="text-sm font-medium text-muted-foreground">AI анализирует ваши ответы...</span>
            </Card>
        </div>
      </section>

      {/* 3. Course Catalog */}
      <section>
        <h2 className="text-2xl font-bold mb-6 tracking-tight text-slate-800">Каталог курсов</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { title: "Дорожные знаки", count: "12 уроков", icon: Signpost, color: "text-blue-600", bg: "bg-blue-100" },
             { title: "Разметка", count: "5 уроков", icon: Layers, color: "text-indigo-600", bg: "bg-indigo-100" },
             { title: "Перекрестки", count: "8 уроков", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
             { title: "Безопасность", count: "10 уроков", icon: BrainCircuit, color: "text-green-600", bg: "bg-green-100" },
           ].map((course, i) => (
             <Card key={i} className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group bg-white" onClick={() => onNavigate('lesson')}>
                <CardContent className="p-6 flex flex-col gap-4">
                   <div className={`h-14 w-14 rounded-2xl ${course.bg} flex items-center justify-center ${course.color} group-hover:scale-110 transition-transform shadow-sm`}>
                      <course.icon className="h-7 w-7" />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{course.title}</h3>
                     <p className="text-sm text-muted-foreground mt-1">{course.count}</p>
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>
      </section>

      {/* 4. Quick Tools */}
      <section>
        <h2 className="text-xl font-bold mb-4 tracking-tight text-slate-800">Быстрый доступ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {[
             { id: 'cards', title: "Карточки", desc: "Повторение в стиле Anki", icon: Layers },
             { id: 'ai-scenario', title: "AI Симулятор", desc: "Разбор сложных ситуаций", icon: BrainCircuit },
             { id: 'games', title: "Мини-игры", desc: "Обучение в игре", icon: Gamepad2 },
           ].map((tool) => (
             <Button key={tool.id} variant="outline" className="h-auto py-6 px-6 flex items-center justify-start gap-4 hover:bg-primary/5 hover:border-primary/30 border-2 bg-white" onClick={() => onNavigate(tool.id)}>
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <tool.icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-base">{tool.title}</div>
                  <div className="text-xs text-muted-foreground font-normal">{tool.desc}</div>
                </div>
             </Button>
           ))}
        </div>
      </section>

    </div>
  );
};
