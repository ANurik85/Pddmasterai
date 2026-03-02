import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Trophy, Play, Star, AlertCircle, CheckCircle, Hand, Timer } from "lucide-react";
import { motion } from "motion/react";

interface MiniGamesPageProps {
  onNavigate: (page: string) => void;
}

export const MiniGamesPage = ({ onNavigate }: MiniGamesPageProps) => {
  const games = [
    {
      id: 1,
      title: "Собери знак",
      description: "Пазл: перетащите части знака на правильные места за минимальное время.",
      icon: CheckCircle,
      color: "text-blue-500",
      bg: "bg-blue-50",
      difficulty: "Легко",
      points: "100 XP",
      tags: ["Внимание", "Знаки"]
    },
    {
      id: 2,
      title: "Найди ошибку",
      description: "Интерактивная панорама. Кликайте на автомобили, нарушающие ПДД.",
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      difficulty: "Средне",
      points: "250 XP",
      tags: ["Анализ", "Разметка"]
    },
    {
      id: 3,
      title: "Регулировщик",
      description: "Симулятор жестов регулировщика. Быстро решайте: ехать или стоять.",
      icon: Hand,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      difficulty: "Сложно",
      points: "500 XP",
      tags: ["Реакция", "Регулировщик"]
    },
    {
      id: 4,
      title: "Скоростной режим",
      description: "Раннер. Управляйте скоростью в зависимости от знаков на дороге.",
      icon: Timer,
      color: "text-purple-500",
      bg: "bg-purple-50",
      difficulty: "Хардкор",
      points: "1000 XP",
      tags: ["Скорость", "Реакция"]
    }
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
         <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">Игровая зона</h1>
            <p className="text-slate-500 text-lg">Обучение не должно быть скучным. Играйте и запоминайте правила.</p>
         </div>
         <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-3 rounded-2xl border border-yellow-100 shadow-sm">
             <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                <Trophy className="h-6 w-6" />
             </div>
             <div>
                 <div className="text-xs text-yellow-700 font-bold uppercase tracking-wider">Ваш счет</div>
                 <span className="font-black text-2xl text-yellow-900">1,250 XP</span>
             </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {games.map((game, i) => (
             <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                 <Card className="h-full flex flex-col hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary/30 group bg-white">
                     <CardHeader>
                         <div className="flex justify-between items-start mb-4">
                             <div className={`p-4 rounded-2xl ${game.bg} ${game.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                 <game.icon className="h-8 w-8" />
                             </div>
                             <Badge variant={game.difficulty === "Легко" ? "secondary" : game.difficulty === "Хардкор" ? "destructive" : "outline"} className="uppercase text-[10px] tracking-wider font-bold">
                                 {game.difficulty}
                             </Badge>
                         </div>
                         <CardTitle className="text-xl group-hover:text-primary transition-colors">{game.title}</CardTitle>
                         <CardDescription className="line-clamp-2 text-sm leading-relaxed mt-2">{game.description}</CardDescription>
                         
                         <div className="flex flex-wrap gap-1 mt-3">
                             {game.tags.map(tag => (
                                 <span key={tag} className="text-[10px] px-2 py-1 bg-slate-100 text-slate-500 rounded-md font-medium">{tag}</span>
                             ))}
                         </div>
                     </CardHeader>
                     <CardContent className="mt-auto pt-0">
                         <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                             <span className="text-sm font-bold text-slate-400 flex items-center gap-1">
                                 <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {game.points}
                             </span>
                             <Button size="sm" className="gap-2 rounded-full px-4 shadow-sm group-hover:shadow-md transition-all bg-slate-900 text-white hover:bg-primary">
                                 <Play className="h-3 w-3 fill-current" /> Играть
                             </Button>
                         </div>
                     </CardContent>
                 </Card>
             </motion.div>
         ))}
      </div>
    </div>
  );
};
