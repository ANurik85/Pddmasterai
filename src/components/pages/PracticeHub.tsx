import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { BrainCircuit, Clock, Car, AlertTriangle, ChevronRight, Trophy, Zap, BookOpen } from "lucide-react";
import { Badge } from "../ui/badge";

interface PracticeHubProps {
  onNavigate: (page: string) => void;
}

export const PracticeHub = ({ onNavigate }: PracticeHubProps) => {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Практика</h1>
          <p className="text-slate-500 text-lg">Закрепите теорию реальными задачами. Выберите режим тренировки.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-slate-600">
            <Trophy className="h-4 w-4 text-yellow-500" />
            Ваш рейтинг: <span className="text-slate-900 font-bold">Новичок</span>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* AI Test */}
        <Card className="relative overflow-hidden border-2 border-transparent hover:border-blue-500/20 transition-all group shadow-lg bg-gradient-to-b from-white to-blue-50/30">
           <div className="absolute -right-6 -top-6 opacity-[0.03] transform group-hover:scale-110 transition-transform duration-500">
              <BrainCircuit size={200} />
           </div>
           <CardHeader className="pb-4">
             <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BrainCircuit className="h-6 w-6" />
             </div>
             <CardTitle className="text-2xl group-hover:text-blue-700 transition-colors">AI Тест</CardTitle>
             <CardDescription className="text-base">
               Адаптивный алгоритм подберет вопросы под ваш уровень.
             </CardDescription>
           </CardHeader>
           <CardContent>
             <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md h-12 text-base" onClick={() => onNavigate('test')}>
                <Zap className="mr-2 h-4 w-4" /> Начать тест
             </Button>
           </CardContent>
        </Card>

        {/* Exam Mode */}
        <Card className="relative overflow-hidden border-2 border-transparent hover:border-red-500/20 transition-all group shadow-lg bg-gradient-to-b from-white to-red-50/30">
           <div className="absolute -right-6 -top-6 opacity-[0.03] transform group-hover:scale-110 transition-transform duration-500">
              <Clock size={200} />
           </div>
           <CardHeader className="pb-4">
             <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Clock className="h-6 w-6" />
             </div>
             <CardTitle className="text-2xl group-hover:text-red-700 transition-colors">Экзамен</CardTitle>
             <CardDescription className="text-base">
               Имитация реального экзамена в ГИБДД. 20 вопросов, 20 минут.
             </CardDescription>
           </CardHeader>
           <CardContent>
             <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 shadow-md h-12 text-base" onClick={() => onNavigate('test')}>
                Начать экзамен
             </Button>
           </CardContent>
        </Card>

        {/* Simulation */}
        <Card className="relative overflow-hidden border-2 border-transparent hover:border-green-500/20 transition-all group shadow-lg bg-gradient-to-b from-white to-green-50/30">
           <div className="absolute -right-6 -top-6 opacity-[0.03] transform group-hover:scale-110 transition-transform duration-500">
              <Car size={200} />
           </div>
           <CardHeader className="pb-4">
             <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-4 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Car className="h-6 w-6" />
             </div>
             <CardTitle className="text-2xl group-hover:text-green-700 transition-colors">Симулятор</CardTitle>
             <CardDescription className="text-base">
               3D-сцены для отработки сложных маневров и принятия решений.
             </CardDescription>
           </CardHeader>
           <CardContent>
             <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md h-12 text-base" onClick={() => onNavigate('simulation')}>
                Запустить
             </Button>
           </CardContent>
        </Card>
      </div>

      {/* Weak Topics Training */}
      <section>
        <h2 className="text-xl font-bold mb-4 tracking-tight text-slate-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Работа над ошибками
        </h2>
        <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50 hover:bg-orange-50 transition-colors cursor-pointer group" onClick={() => onNavigate('test')}>
           <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-6">
                    <div className="hidden md:flex p-4 rounded-full bg-white shadow-sm text-orange-500 group-hover:scale-110 transition-transform">
                       <AlertTriangle className="h-8 w-8" />
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-slate-900">Проблемная зона: "Обгон и опережение"</h3>
                          <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-100">3 ошибки</Badge>
                       </div>
                       <p className="text-slate-600">
                           AI заметил, что вы часто ошибаетесь в вопросах, связанных с завершением обгона через сплошную.
                       </p>
                    </div>
                 </div>
                 <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 whitespace-nowrap h-12 px-6">
                    Тренировать тему <ChevronRight className="ml-2 h-4 w-4" />
                 </Button>
              </div>
           </CardContent>
        </Card>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-xl font-bold mb-4 tracking-tight text-slate-800 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-500" />
            Тесты по категориям
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {[
               "Общие положения", "Знаки", "Разметка", "Светофоры", 
               "Маневрирование", "Скорость", "Обгон", "Остановка", 
               "Перекрестки", "Пешеходы", "Приоритет", "Автомагистрали"
           ].map((cat, i) => (
              <Button 
                key={i} 
                variant="secondary" 
                className="h-auto py-4 text-sm font-medium justify-start px-4 bg-white hover:bg-slate-50 border shadow-sm hover:shadow hover:border-primary/30 transition-all text-slate-700"
                onClick={() => onNavigate('test')}
              >
                 {cat}
              </Button>
           ))}
        </div>
      </section>
    </div>
  );
};
