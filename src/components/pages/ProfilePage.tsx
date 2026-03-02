import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { AchievementsTabContent, HistoryTabContent, SettingsTabContent, SubscriptionTabContent } from "./ProfileTabs";
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Trophy, 
  Target, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar as CalendarIcon,
  Settings,
  CreditCard,
  Crown,
  Star,
  Award,
  CheckCircle2,
  Edit2,
  Camera,
  FileText,
  Zap,
  Shield,
  Heart
} from "lucide-react";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export const ProfilePage = ({ onNavigate }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      
      {/* Header Profile Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-gradient-to-r from-slate-50 to-white p-6 rounded-2xl border">
         <div className="relative group">
           <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src="https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2ODMzOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080" />
              <AvatarFallback>АИ</AvatarFallback>
           </Avatar>
           <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-3 w-3" />
           </button>
         </div>
         <div className="space-y-1 flex-1">
            <h1>Алексей Иванов</h1>
            <p className="text-muted-foreground">Ученик • Стаж обучения: 2 недели</p>
            <div className="flex gap-2 mt-2">
               <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full">
                 <Trophy className="h-3 w-3 mr-1" />
                 Уровень 5
               </Badge>
               <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 rounded-full">
                 <Crown className="h-3 w-3 mr-1" />
                 Pro Аккаунт
               </Badge>
            </div>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </Button>
            <Button className="rounded-xl" onClick={() => onNavigate('learn')}>
              Продолжить обучение
            </Button>
         </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full justify-start bg-slate-50 p-1 rounded-xl overflow-x-auto flex-nowrap">
          <TabsTrigger value="overview" className="rounded-lg">
            <Target className="h-4 w-4 mr-2" />
            Обзор
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-lg">
            <User className="h-4 w-4 mr-2" />
            Профиль
          </TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-lg">
            <Trophy className="h-4 w-4 mr-2" />
            Достижения
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg">
            <FileText className="h-4 w-4 mr-2" />
            История
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg">
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </TabsTrigger>
          <TabsTrigger value="subscription" className="rounded-lg">
            <CreditCard className="h-4 w-4 mr-2" />
            Подписка
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Stats (Left 2/3) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Prediction Widget */}
              <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-none shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-slate-400 mb-1">Вероятность сдачи экзамена</div>
                      <div className="flex items-end gap-3">
                        <span className="text-5xl">85%</span>
                        <div className="flex items-center gap-1 mb-2 px-2 py-1 bg-green-500/20 rounded-lg">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-green-400">+12%</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-3">
                        Вы готовы к экзамену! Еще немного практики по "Медицине".
                      </p>
                    </div>
                    
                    {/* Simple Chart Placeholder */}
                    <div className="hidden sm:flex items-end gap-1.5 h-24">
                      {[40, 55, 45, 60, 75, 80, 85].map((h, i) => (
                          <div key={i} style={{ height: `${h}%` }} className="w-5 bg-slate-700/50 rounded-t hover:bg-green-500 transition-all cursor-pointer" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="rounded-2xl border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-slate-900 mb-1">12ч 30м</div>
                    <div className="text-xs text-muted-foreground">Время обучения</div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-slate-900 mb-1">24/40</div>
                    <div className="text-xs text-muted-foreground">Темы пройдены</div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center mb-3">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-slate-900 mb-1">92%</div>
                    <div className="text-xs text-muted-foreground">Точность ответов</div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
                      <Zap className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="text-slate-900 mb-1">15</div>
                    <div className="text-xs text-muted-foreground">Дней подряд</div>
                  </CardContent>
                </Card>
              </div>

            </div>

            {/* Sidebar (Right 1/3) */}
            <div className="space-y-6">
              
              {/* Weekly Goals */}
              <Card className="rounded-2xl border-slate-200 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Цели на неделю
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Уроки</span>
                      <span className="text-muted-foreground">5/7</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Тесты</span>
                      <span className="text-muted-foreground">3/5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Время обучения</span>
                      <span className="text-muted-foreground">4ч/10ч</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Knowledge Map and Recent Activity - Full Width Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Knowledge Map */}
            <Card className="rounded-2xl border-slate-200">
              <CardHeader>
                <CardTitle>Карта знаний</CardTitle>
                <CardDescription>Ваш прогресс по разделам ПДД</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {[
                    { name: "Общие положения", val: 100, color: "bg-green-500", tests: "12/12" },
                    { name: "Дорожные знаки", val: 80, color: "bg-green-500", tests: "8/10" },
                    { name: "Дорожная разметка", val: 65, color: "bg-yellow-500", tests: "6/8" },
                    { name: "Проезд перекрестков", val: 45, color: "bg-orange-500", tests: "4/10" },
                    { name: "Медицина", val: 20, color: "bg-red-500", tests: "1/6" }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium flex items-center gap-2">
                          {item.val === 100 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                          {item.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">{item.tests}</span>
                          <span className="text-muted-foreground">{item.val}%</span>
                        </div>
                      </div>
                      <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${item.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="rounded-2xl border-slate-200">
              <CardHeader>
                <CardTitle>Недавняя активность</CardTitle>
                <CardDescription>Ваши последние достижения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "test", title: "Тест: Дорожные знаки", result: "92%", time: "2 часа назад", icon: CheckCircle2, color: "text-green-500" },
                    { type: "lesson", title: "Урок: Проезд перекрестков", result: "Завершено", time: "5 часов назад", icon: BookOpen, color: "text-blue-500" },
                    { type: "achievement", title: "Достижение: 7 дней подряд", result: "+50 XP", time: "1 день назад", icon: Trophy, color: "text-amber-500" },
                    { type: "practice", title: "Практика: Медицина", result: "70%", time: "2 дня назад", icon: Target, color: "text-purple-500" }
                  ].map((activity, i) => {
                    const Icon = activity.icon;
                    return (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className={`h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center ${activity.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="rounded-full">
                          {activity.result}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-2xl border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Личная информация</CardTitle>
                  <CardDescription>Управляйте данными вашего профиля</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {isEditing ? 'Сохранить' : 'Редактировать'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Полное имя</Label>
                  <Input 
                    id="fullname" 
                    defaultValue="Алексей Иванов" 
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue="alexey.ivanov@example.com" 
                      disabled={!isEditing}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      type="tel" 
                      defaultValue="+7 (999) 123-45-67" 
                      disabled={!isEditing}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Город</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="city" 
                      defaultValue="Москва" 
                      disabled={!isEditing}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Дата рождения</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="birthdate" 
                      type="date" 
                      defaultValue="1995-03-15" 
                      disabled={!isEditing}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200">
              <CardHeader>
                <CardTitle>О себе</CardTitle>
                <CardDescription>Расскажите немного о себе</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Биография</Label>
                  <Textarea 
                    id="bio" 
                    rows={5}
                    placeholder="Расскажите о себе..."
                    defaultValue="Изучаю ПДД для получения водительских прав. Планирую сдать экзамен через месяц."
                    disabled={!isEditing}
                    className="rounded-xl resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Цель обучения</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Получить права', 'Повысить навыки', 'Подготовка к экзамену', 'Общее развитие'].map((goal) => (
                      <Badge key={goal} variant="secondary" className="rounded-full px-3 py-1">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-medium">Статистика профиля</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Дата регистрации</p>
                      <p className="text-sm">14 декабря 2024</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Последний вход</p>
                      <p className="text-sm">Сегодня, 14:30</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Всего баллов</p>
                      <p className="text-sm">1,450 XP</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Уровень</p>
                      <p className="text-sm">5 / 10</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <AchievementsTabContent />
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <HistoryTabContent />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <SettingsTabContent />
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <SubscriptionTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};