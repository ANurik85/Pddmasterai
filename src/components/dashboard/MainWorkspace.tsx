import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { BrainCircuit, ShieldCheck, Smartphone, PlayCircle } from "lucide-react";

export const MainWorkspace = () => {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 relative z-10">
           <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                 <BrainCircuit className="h-4 w-4" />
                 <span>AI-Powered Driving School</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                 Сдай экзамен в ГИБДД <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">с первой попытки</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                 Персональная программа обучения, адаптирующаяся под ваши знания. Интерактивные симуляции, умные карточки и AI-наставник.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg bg-blue-600 hover:bg-blue-700">
                    Начать бесплатно
                 </Button>
                 <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full gap-2">
                    <PlayCircle className="h-5 w-5" /> Демо-урок
                 </Button>
              </div>
           </div>
           
           {/* Hero Visual */}
           <div className="flex-1 relative">
               <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                  {/* Abstract shapes */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full opacity-50 blur-3xl animate-pulse" />
                  
                  {/* Main Card Mockup */}
                  <Card className="absolute inset-4 bg-white/80 backdrop-blur border-slate-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                      <div className="p-6 border-b bg-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-400"/>
                            <div className="h-3 w-3 rounded-full bg-yellow-400"/>
                            <div className="h-3 w-3 rounded-full bg-green-400"/>
                         </div>
                         <span className="text-xs text-muted-foreground font-mono">AI Analysis Mode</span>
                      </div>
                      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                             <BrainCircuit className="h-16 w-16" />
                          </div>
                          <h3 className="text-2xl font-bold">Анализ ситуации...</h3>
                          <p className="text-muted-foreground">
                             "В данной ситуации вы обязаны уступить дорогу трамваю, так как он находится в равных условиях с вами."
                          </p>
                      </div>
                  </Card>
               </div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold mb-4">Почему выбирают нас?</h2>
               <p className="text-muted-foreground max-w-2xl mx-auto">Мы объединили проверенные методики обучения с передовыми технологиями.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Card className="border-none shadow-none bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <CardContent className="p-8 space-y-4 text-center">
                     <div className="h-14 w-14 mx-auto rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                        <BrainCircuit className="h-7 w-7" />
                     </div>
                     <h3 className="text-xl font-bold">AI-Тренер</h3>
                     <p className="text-muted-foreground">
                        Алгоритм анализирует ваши ответы и подстраивает сложность вопросов, фокусируясь на слабых местах.
                     </p>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-none bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <CardContent className="p-8 space-y-4 text-center">
                     <div className="h-14 w-14 mx-auto rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                        <Smartphone className="h-7 w-7" />
                     </div>
                     <h3 className="text-xl font-bold">Мобильность</h3>
                     <p className="text-muted-foreground">
                        Учитесь где угодно. Прогресс синхронизируется между всеми вашими устройствами мгновенно.
                     </p>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-none bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <CardContent className="p-8 space-y-4 text-center">
                     <div className="h-14 w-14 mx-auto rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                        <ShieldCheck className="h-7 w-7" />
                     </div>
                     <h3 className="text-xl font-bold">Гарантия сдачи</h3>
                     <p className="text-muted-foreground">
                        98% наших пользователей сдают теоретический экзамен в ГИБДД с первого раза.
                     </p>
                  </CardContent>
               </Card>
            </div>
         </div>
      </section>
    </div>
  );
};
