import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { 
  Trophy, 
  Star, 
  Award, 
  Crown, 
  Shield, 
  Heart, 
  CheckCircle2, 
  BookOpen, 
  Target,
  FileText,
  Calendar,
  TrendingDown,
  TrendingUp,
  Bell,
  Palette,
  Globe,
  CreditCard,
  Check,
  Sparkles
} from "lucide-react";

// Achievements Tab Content
export const AchievementsTabContent = () => {
  const achievementCategories = [
    {
      title: "Обучение",
      color: "blue",
      achievements: [
        { icon: BookOpen, name: "Первый урок", description: "Завершите первый урок", unlocked: true, progress: 100 },
        { icon: Target, name: "Ударник учебы", description: "Завершите 10 уроков", unlocked: true, progress: 100 },
        { icon: Trophy, name: "Знаток ПДД", description: "Завершите все разделы", unlocked: false, progress: 60 }
      ]
    },
    {
      title: "Тесты",
      color: "green",
      achievements: [
        { icon: CheckCircle2, name: "Первый тест", description: "Сдайте первый тест", unlocked: true, progress: 100 },
        { icon: Star, name: "Отличник", description: "Сдайте 5 тестов на 90%+", unlocked: true, progress: 100 },
        { icon: Award, name: "Перфекционист", description: "Сдайте тест на 100%", unlocked: false, progress: 80 }
      ]
    },
    {
      title: "Активность",
      color: "purple",
      achievements: [
        { icon: Calendar, name: "Постоянство", description: "7 дней подряд", unlocked: true, progress: 100 },
        { icon: Sparkles, name: "Марафонец", description: "30 дней подряд", unlocked: false, progress: 47 },
        { icon: Crown, name: "Чемпион", description: "365 дней подряд", unlocked: false, progress: 4 }
      ]
    },
    {
      title: "Особые", 
      color: "amber",
      achievements: [
        { icon: Shield, name: "Защитник дорог", description: "Помогите 10 ученикам", unlocked: false, progress: 20 },
        { icon: Heart, name: "Любимец сообщества", description: "Получите 100 лайков", unlocked: false, progress: 35 },
        { icon: Trophy, name: "Топ-10", description: "Войдите в топ-10 рейтинга", unlocked: false, progress: 0 }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievementCategories.map((category, catIndex) => (
        <Card key={catIndex} className="rounded-2xl border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full bg-${category.color}-500`} />
              {category.title}
            </CardTitle>
            <CardDescription>Ваш прогресс в категории</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className={`p-4 rounded-xl border ${achievement.unlocked ? 'bg-slate-50' : 'bg-white'} hover:shadow-md transition-all`}>
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                      achievement.unlocked 
                        ? `bg-${category.color}-100 text-${category.color}-600` 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{achievement.name}</h4>
                        {achievement.unlocked && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      {!achievement.unlocked && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Прогресс</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-${category.color}-500 transition-all`}
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// History Tab Content
export const HistoryTabContent = () => {
  const testHistory = [
    { title: "Билет №15", date: "28 дек, 14:30", score: 95, questions: "19/20", status: "passed" },
    { title: "Билет №12", date: "27 дек, 19:15", score: 88, questions: "17/20", status: "passed" },
    { title: "Билет №8", date: "26 дек, 16:45", score: 70, questions: "14/20", status: "failed" },
    { title: "Билет №5", date: "25 дек, 11:20", score: 92, questions: "18/20", status: "passed" },
    { title: "Билет №3", date: "24 дек, 21:00", score: 85, questions: "17/20", status: "passed" }
  ];

  const lessonHistory = [
    { title: "Дорожные знаки: Предупреждающие", date: "28 дек", duration: "25 мин", completed: true },
    { title: "Проезд перекрестков", date: "27 дек", duration: "32 мин", completed: true },
    { title: "Дорожная разметка", date: "26 дек", duration: "18 мин", completed: true },
    { title: "Медицинская помощь", date: "25 дек", duration: "40 мин", completed: false }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Test History */}
      <Card className="rounded-2xl border-slate-200">
        <CardHeader>
          <CardTitle>История тестов</CardTitle>
          <CardDescription>Ваши последние попытки</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testHistory.map((test, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-xl border hover:bg-slate-50 transition-colors">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                  test.status === 'passed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{test.title}</p>
                  <p className="text-xs text-muted-foreground">{test.date}</p>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${test.status === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
                    {test.score}%
                  </div>
                  <div className="text-xs text-muted-foreground">{test.questions}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lesson History */}
      <Card className="rounded-2xl border-slate-200">
        <CardHeader>
          <CardTitle>История уроков</CardTitle>
          <CardDescription>Пройденные материалы</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lessonHistory.map((lesson, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-xl border hover:bg-slate-50 transition-colors">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                  lesson.completed ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson.date} • {lesson.duration}</p>
                </div>
                {lesson.completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics Chart */}
      <Card className="rounded-2xl border-slate-200 lg:col-span-2">
        <CardHeader>
          <CardTitle>Статистика прогресса</CardTitle>
          <CardDescription>Ваши результаты за последние 30 дней</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="text-green-600 mb-1">Пройдено</div>
                <div className="text-2xl">24</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-blue-600 mb-1">В процессе</div>
                <div className="text-2xl">8</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-600 mb-1">Осталось</div>
                <div className="text-2xl">8</div>
              </div>
            </div>
            
            {/* Simple progress visualization */}
            <div className="flex items-end justify-between h-32 gap-2">
              {[65, 70, 68, 75, 80, 85, 88, 90, 92, 95, 92, 90, 92, 88].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <div 
                    className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>2 нед назад</span>
              <span>1 нед назад</span>
              <span>Сегодня</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Settings Tab Content
export const SettingsTabContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Notifications Settings */}
      <Card className="rounded-2xl border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Уведомления
          </CardTitle>
          <CardDescription>Управляйте настройками уведомлений</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
            <div className="space-y-0.5">
              <Label htmlFor="push-notif">Push-уведомления</Label>
              <p className="text-xs text-muted-foreground">Получать уведомления в браузере</p>
            </div>
            <Switch id="push-notif" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
            <div className="space-y-0.5">
              <Label htmlFor="email-notif">Email уведомления</Label>
              <p className="text-xs text-muted-foreground">Получать письма на почту</p>
            </div>
            <Switch id="email-notif" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
            <div className="space-y-0.5">
              <Label htmlFor="daily-remind">Ежедневные напоминания</Label>
              <p className="text-xs text-muted-foreground">Напоминания о занятиях</p>
            </div>
            <Switch id="daily-remind" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
            <div className="space-y-0.5">
              <Label htmlFor="achievements">Достижения</Label>
              <p className="text-xs text-muted-foreground">Уведомления о новых достижениях</p>
            </div>
            <Switch id="achievements" defaultChecked />
          </div>
        </CardContent>
      </Card>



      {/* Interface Settings */}
      <Card className="rounded-2xl border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Интерфейс
          </CardTitle>
          <CardDescription>Настройки отображения</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Темная тема</Label>
              <p className="text-xs text-muted-foreground">Переключить на темный режим</p>
            </div>
            <Switch id="dark-mode" />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
            <div className="space-y-0.5">
              <Label htmlFor="animations">Анимации</Label>
              <p className="text-xs text-muted-foreground">Включить плавные переходы</p>
            </div>
            <Switch id="animations" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
            <div className="space-y-0.5">
              <Label htmlFor="sounds">Звуковые эффекты</Label>
              <p className="text-xs text-muted-foreground">Звуки при действиях</p>
            </div>
            <Switch id="sounds" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
            <div className="space-y-0.5">
              <Label htmlFor="compact">Компактный режим</Label>
              <p className="text-xs text-muted-foreground">Уменьшить отступы</p>
            </div>
            <Switch id="compact" />
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card className="rounded-2xl border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Язык и регион
          </CardTitle>
          <CardDescription>Региональные настройки</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Язык интерфейса</Label>
            <select className="w-full p-2 rounded-xl border border-slate-200 bg-white">
              <option>Русский</option>
              <option>English</option>
              <option>Қазақша</option>
            </select>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

// Subscription Tab Content
export const SubscriptionTabContent = () => {
  const plans = [
    {
      name: "Бесплатный",
      price: "0 ₽",
      period: "/месяц",
      features: [
        "Доступ к основным урокам",
        "5 тестов в день",
        "Базовая статистика",
        "Реклама в приложении"
      ],
      current: false,
      popular: false
    },
    {
      name: "Pro",
      price: "499 ₽",
      period: "/месяц",
      features: [
        "Все функции Бесплатного",
        "Безлимитные тесты",
        "AI-помощник",
        "Детальная аналитика",
        "Без рекламы",
        "Приоритетная поддержка"
      ],
      current: true,
      popular: true
    },

  ];

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card className="rounded-2xl border-slate-200 bg-gradient-to-br from-amber-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-amber-600" />
                <h3 className="font-medium">Активная подписка</h3>
              </div>
              <p className="text-2xl mb-1">Pro Plan</p>
              <p className="text-sm text-muted-foreground">Действует до 28 января 2025</p>
            </div>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-full">
              Активна
            </Badge>
          </div>
          <Separator className="my-4" />
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl flex-1">
              Изменить план
            </Button>
            <Button variant="outline" className="rounded-xl flex-1 text-red-600 border-red-200 hover:bg-red-50">
              Отменить подписку
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`rounded-2xl relative overflow-hidden ${
              plan.popular 
                ? 'border-2 border-amber-500 shadow-lg' 
                : 'border-slate-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                Популярный
              </div>
            )}
            <CardHeader className="text-center pb-4">
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full rounded-xl" 
                variant={plan.current ? "outline" : "default"}
                disabled={plan.current}
              >
                {plan.current ? 'Текущий план' : 'Выбрать план'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment History */}
      <Card className="rounded-2xl border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            История платежей
          </CardTitle>
          <CardDescription>Ваши последние транзакции</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "28 дек 2024", amount: "499 ₽", plan: "Pro Plan", status: "success" },
              { date: "28 ноя 2024", amount: "499 ₽", plan: "Pro Plan", status: "success" },
              { date: "28 окт 2024", amount: "499 ₽", plan: "Pro Plan", status: "success" }
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl border hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-medium">{payment.plan}</p>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{payment.amount}</p>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 rounded-full text-xs">
                    Оплачено
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
