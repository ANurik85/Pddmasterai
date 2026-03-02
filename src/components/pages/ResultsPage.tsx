import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle2, XCircle, RotateCcw, BookOpen, ArrowRight, BarChart3 } from "lucide-react";
import { motion } from "motion/react";

interface ResultsPageProps {
  onNavigate: (page: string) => void;
}

export const ResultsPage = ({ onNavigate }: ResultsPageProps) => {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
       
       <motion.div 
         initial={{ opacity: 0, y: -20 }} 
         animate={{ opacity: 1, y: 0 }} 
         className="text-center mb-10 space-y-2"
       >
           <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Тест завершен!</h1>
           <p className="text-slate-500 text-lg">Вы ответили на 20 вопросов за 12 минут 30 секунд.</p>
       </motion.div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
           {/* Main Score */}
           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
             <Card className="h-full flex flex-col items-center justify-center p-8 border-none bg-gradient-to-b from-green-50 to-white shadow-xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                 <div className="relative h-40 w-40 flex items-center justify-center mb-6">
                     {/* SVG Progress Ring */}
                     <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                         <path className="text-green-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
                         <motion.path 
                            className="text-green-500" 
                            strokeDasharray="90, 100" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                         />
                     </svg>
                     <div className="absolute flex flex-col items-center">
                         <span className="text-4xl font-black text-slate-900">18</span>
                         <span className="text-sm text-slate-500 font-medium uppercase tracking-wide">из 20</span>
                     </div>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <Badge className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 text-base shadow-md">Сдано</Badge>
                    <p className="text-xs text-slate-400 text-center max-w-[150px]">Допускается не более 2 ошибок.</p>
                 </div>
             </Card>
           </motion.div>

           {/* Mistake Map */}
           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="md:col-span-2">
               <Card className="h-full shadow-lg border-slate-200">
                   <CardHeader className="pb-2 border-b bg-slate-50/50">
                       <CardTitle className="text-xl flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-slate-500" />
                          Карта ошибок
                       </CardTitle>
                   </CardHeader>
                   <CardContent className="p-6">
                       <div className="flex flex-wrap gap-2 mb-6">
                           {["Общие положения", "Обязанности", "Дорожные знаки", "Разметка", "Светофоры", "Маневрирование", "Расположение ТС", "Скорость", "Обгон", "Остановка", "Перекрестки"].map((topic, i) => {
                               const isError = i === 8 || i === 10;
                               return (
                                   <Badge 
                                       key={i} 
                                       variant={isError ? "destructive" : "outline"}
                                       className={`text-sm py-1.5 px-3 transition-all ${
                                          !isError 
                                            ? "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200" 
                                            : "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                                        }`}
                                   >
                                       {topic}
                                   </Badge>
                               )
                           })}
                       </div>
                       <div className="p-5 bg-orange-50 rounded-xl border border-orange-100 flex gap-4 items-start">
                           <div className="p-2 bg-white rounded-lg shadow-sm text-orange-500">
                              <BookOpen className="h-6 w-6" />
                           </div>
                           <div className="space-y-2 flex-1">
                               <h4 className="font-bold text-orange-900 text-sm uppercase tracking-wide">Рекомендация AI</h4>
                               <p className="text-sm text-orange-800 leading-relaxed">
                                   Вам стоит повторить тему <b className="text-orange-950">"Проезд перекрестков"</b>. Вы часто ошибаетесь в вопросах приоритета при повороте налево.
                               </p>
                               <Button size="sm" variant="outline" className="bg-white border-orange-200 text-orange-700 hover:bg-orange-100 mt-2" onClick={() => onNavigate('lesson')}>
                                   Перейти к уроку <ArrowRight className="ml-2 h-3 w-3" />
                               </Button>
                           </div>
                       </div>
                   </CardContent>
               </Card>
           </motion.div>
       </div>

       {/* Question Review List */}
       <div className="space-y-4 max-w-4xl mx-auto">
           <h2 className="text-2xl font-bold text-slate-900 mb-6">Разбор ответов</h2>
           {[1, 2, 3].map((q, i) => (
               <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.5 + (i * 0.1) }}
               >
                   <Card className={`border-l-[6px] shadow-sm hover:shadow-md transition-shadow ${i === 1 ? "border-l-red-500 bg-red-50/10" : "border-l-green-500 bg-white"}`}>
                       <CardContent className="p-6 flex flex-col md:flex-row md:items-start gap-4">
                           <div className="mt-1 shrink-0">
                               {i === 1 ? <XCircle className="h-6 w-6 text-red-500" /> : <CheckCircle2 className="h-6 w-6 text-green-500" />}
                           </div>
                           <div className="flex-1 space-y-2">
                               <div className="flex justify-between items-start">
                                   <p className="font-bold text-lg text-slate-800">Вопрос {q}: Разрешен ли разворот на мосту?</p>
                                   <span className="text-xs text-slate-400 font-mono">#3921</span>
                               </div>
                               
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                   <div className={`p-3 rounded-lg border ${i === 1 ? "bg-red-50 border-red-100 text-red-900" : "bg-green-50 border-green-100 text-green-900"}`}>
                                       <span className="font-semibold block mb-1 text-xs opacity-70 uppercase">Ваш ответ</span>
                                       {i === 1 ? "Разрешен при видимости > 100м" : "Запрещен"}
                                   </div>
                                   {i === 1 && (
                                       <div className="p-3 rounded-lg border bg-green-50 border-green-100 text-green-900">
                                           <span className="font-semibold block mb-1 text-xs opacity-70 uppercase">Правильный ответ</span>
                                           Запрещен
                                       </div>
                                   )}
                               </div>
                               
                               {i === 1 && (
                                   <div className="text-sm text-slate-600 mt-2 pl-4 border-l-2 border-slate-200 italic">
                                       Разворот на мостах, путепроводах, эстакадах и под ними запрещен всегда, независимо от видимости.
                                   </div>
                               )}
                           </div>
                           <Button variant="ghost" size="sm" className="shrink-0 self-start md:self-center">Подробнее</Button>
                       </CardContent>
                   </Card>
               </motion.div>
           ))}
       </div>

       <div className="flex justify-center gap-4 mt-12 pb-12">
           <Button size="lg" className="px-8 h-12 text-lg shadow-lg" onClick={() => onNavigate('test')}>
               <RotateCcw className="mr-2 h-5 w-5" /> Пройти еще раз
           </Button>
           <Button size="lg" variant="outline" className="px-8 h-12 text-lg bg-white hover:bg-slate-50 shadow-sm" onClick={() => onNavigate('practice')}>
               <BookOpen className="mr-2 h-5 w-5" /> Вернуться к практике
           </Button>
       </div>
    </div>
  );
};
