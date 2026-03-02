import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Car, AlertTriangle, ArrowRight, RotateCcw, CheckCircle2, Info, MousePointer2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SimulationInterfaceProps {
  onNavigate: (page: string) => void;
}

export const SimulationInterface = ({ onNavigate }: SimulationInterfaceProps) => {
  const [phase, setPhase] = useState<'decision' | 'result'>('decision');
  const [choice, setChoice] = useState<string | null>(null);

  const handleChoice = (c: string) => {
      setChoice(c);
      setPhase('result');
  };

  return (
    <div className="container mx-auto p-4 md:p-6 h-[calc(100vh-80px)] flex flex-col max-w-7xl">
        <div className="flex items-center justify-between mb-4 px-2">
            <Button variant="ghost" onClick={() => onNavigate('practice')} className="hover:bg-slate-100">
                <X className="h-5 w-5 mr-2" /> Выйти
            </Button>
            <div className="flex flex-col items-center">
                <div className="text-lg font-bold text-slate-900">Ситуация #42</div>
                <div className="text-xs text-muted-foreground">Нерегулируемый перекресток</div>
            </div>
            <div className="w-24 text-right">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold border border-blue-100">Сложно</span>
            </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
            
            {/* 3D Scene Area */}
            <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden relative flex flex-col shadow-2xl border-4 border-slate-900">
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black relative">
                    {/* Placeholder for 3D Canvas */}
                    <div className="text-center text-slate-500 z-0">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
                            <Car className="h-32 w-32 mx-auto mb-4 opacity-80 relative z-10 text-slate-400" />
                        </div>
                        <p className="text-lg font-medium">Интерактивная 3D Сцена</p>
                        <p className="text-xs opacity-50 mt-2">Drag to rotate view</p>
                    </div>

                    {/* Overlay for Decision Phase */}
                    {phase === 'decision' && (
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 flex flex-col items-center">
                            <h3 className="text-white font-bold text-xl mb-6 drop-shadow-md">Ваше решение?</h3>
                            <div className="flex gap-6 w-full max-w-md">
                                <Button 
                                    size="lg" 
                                    className="flex-1 bg-red-600 hover:bg-red-500 text-white shadow-lg hover:shadow-red-500/20 transition-all h-16 text-lg font-bold rounded-xl border-2 border-red-400/30"
                                    onClick={() => handleChoice('stop')}
                                >
                                    Уступить
                                </Button>
                                 <Button 
                                    size="lg" 
                                    className="flex-1 bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/20 transition-all h-16 text-lg font-bold rounded-xl border-2 border-green-400/30"
                                    onClick={() => handleChoice('go')}
                                >
                                    Проехать
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Control & Feedback Panel */}
            <div className="flex flex-col gap-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <div className="p-4 border-b bg-slate-50/50 flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-500" />
                        <span className="font-bold text-slate-700">Условия задачи</span>
                    </div>
                    <div className="p-6 pt-4">
                         <ul className="space-y-3">
                            <li className="flex gap-3 items-start text-sm text-slate-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                Вы движетесь по второстепенной дороге.
                            </li>
                            <li className="flex gap-3 items-start text-sm text-slate-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                Справа приближается грузовик.
                            </li>
                            <li className="flex gap-3 items-start text-sm text-slate-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                Слева легковой автомобиль включает поворотник.
                            </li>
                        </ul>
                    </div>
                </Card>

                <AnimatePresence mode="wait">
                    {phase === 'result' ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="flex-1 flex flex-col"
                        >
                            <Alert className={`flex-1 border-2 shadow-md flex flex-col ${choice === 'stop' ? "border-green-100 bg-green-50/50" : "border-red-100 bg-red-50/50"}`}>
                                <div className="flex items-center gap-2 mb-4">
                                    {choice === 'stop' ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : <AlertTriangle className="h-6 w-6 text-red-600" />}
                                    <AlertTitle className={`text-xl font-bold ${choice === 'stop' ? "text-green-800" : "text-red-800"}`}>
                                        {choice === 'stop' ? "Правильно!" : "Авария!"}
                                    </AlertTitle>
                                </div>
                                <AlertDescription className="text-slate-700 leading-relaxed text-base flex-1">
                                    {choice === 'stop' 
                                        ? "Вы совершенно правы. Знак 'Уступите дорогу' обязывает вас пропустить транспортные средства, движущиеся по пересекаемой главной дороге."
                                        : "Вы не уступили дорогу грузовику, имеющему преимущество проезда перекрестка. Это привело бы к боковому столкновению."
                                    }
                                </AlertDescription>
                            </Alert>
                            
                            <div className="mt-4 space-y-3">
                                 <Button size="lg" variant="outline" className="w-full bg-white hover:bg-slate-50 text-slate-700 border-slate-300" onClick={() => setPhase('decision')}>
                                    <RotateCcw className="mr-2 h-4 w-4" /> Попробовать снова
                                 </Button>
                                 <Button size="lg" className="w-full shadow-md" onClick={() => onNavigate('practice')}>
                                    Следующая ситуация <ArrowRight className="ml-2 h-4 w-4" />
                                 </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                            <MousePointer2 className="h-12 w-12 mb-4 opacity-50" />
                            <p className="text-sm">Используйте кнопки на экране или клавиатуру для выбора действия</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </div>
  );
};
