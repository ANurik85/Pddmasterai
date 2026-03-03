import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Plus,
  GripVertical,
  Sparkles,
  CornerDownLeft,
  Trash2,
  RotateCw,
  Save,
  Download,
  Mic,
  Image as ImageIcon,
  Zap,
  CheckCircle2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VisualScenarioBuilder } from "./VisualScenarioBuilder";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface CanvasObject {
  id: string;
  type: string;
  x: number;
  y: number;
  label: string;
  icon: string;
  color: string;
}

export const AIExplanationPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Здравствуйте! Я AI Инструктор, готов помочь вам разобраться в ПДД. 🚗\n\nВы можете:\n• Задать любой вопрос по правилам дорожного движения\n• Разобрать конкретную дорожную ситуацию\n• Попросить объяснить сложные понятия\n\nЧто вас интересует?",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Canvas state
  const [canvasObjects, setCanvasObjects] = useState<
    CanvasObject[]
  >([
    {
      id: "obj-1",
      type: "intersection",
      x: 250,
      y: 150,
      label: "Перекресток",
      icon: "🚦",
      color: "bg-slate-400",
    },
    {
      id: "obj-2",
      type: "car",
      x: 200,
      y: 280,
      label: "Моя машина",
      icon: "🚗",
      color: "bg-blue-600",
    },
    {
      id: "obj-3",
      type: "sign",
      x: 450,
      y: 280,
      label: "STOP",
      icon: "🛑",
      color: "bg-red-500",
    },
  ]);

  const [selectedObject, setSelectedObject] = useState<
    string | null
  >(null);
  const [scenarioQuery, setScenarioQuery] = useState("");

  // Predefined quick questions
  const quickQuestions = [
    "Чем обгон отличается от опережения?",
    "Что означает мигающий зеленый сигнал?",
    "Правила проезда круга",
    "Кто имеет преимущество на перекрестке?",
  ];

  // Library items for drag and drop
  const roadElements = [
    {
      id: "intersection",
      label: "Перекресток",
      icon: "🚦",
      color: "bg-slate-400",
    },
    {
      id: "roundabout",
      label: "Круг",
      icon: "⭕",
      color: "bg-slate-500",
    },
    {
      id: "straight-road",
      label: "Прямая дорога",
      icon: "➡️",
      color: "bg-slate-300",
    },
  ];

  const objects = [
    {
      id: "car",
      label: "Легковая машина",
      icon: "🚗",
      color: "bg-blue-600",
    },
    {
      id: "truck",
      label: "Грузовик",
      icon: "🚚",
      color: "bg-orange-600",
    },
    {
      id: "bus",
      label: "Автобус",
      icon: "🚌",
      color: "bg-green-600",
    },
    {
      id: "pedestrian",
      label: "Пешеход",
      icon: "🚶",
      color: "bg-purple-600",
    },
    {
      id: "traffic-light",
      label: "Светофор",
      icon: "🚥",
      color: "bg-yellow-500",
    },
    {
      id: "stop-sign",
      label: "Знак STOP",
      icon: "🛑",
      color: "bg-red-500",
    },
    {
      id: "yield-sign",
      label: "Знак Уступи",
      icon: "⚠️",
      color: "bg-yellow-600",
    },
    {
      id: "main-road",
      label: "Главная дорога",
      icon: "💎",
      color: "bg-amber-500",
    },
  ];

  // Mock AI responses
  const aiResponses = [
    "Отличный вопрос! Давайте разберем это подробно...",
    "Согласно ПДД РФ, в этой ситуации...",
    "Важно понимать ключевое различие между этими понятиями...",
    "Эта ситуация регламентируется пунктом 13.3 ПДД...",
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI typing
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `${aiResponses[Math.floor(Math.random() * aiResponses.length)]}\n\n${generateMockResponse(inputValue)}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      // Auto scroll to bottom
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }, 1500);
  };

  const generateMockResponse = (question: string) => {
    if (question.toLowerCase().includes("обгон")) {
      return `**Обгон** — это опережение одного или нескольких ТС, связанное с выездом на полосу (сторону проезжей части), предназначенную для встречного движения, и последующим возвращением на ранее занимаемую полосу.\n\n**Опережение** — движение ТС со скоростью, большей скорости попутного ТС.\n\n**Ключевое отличие:** Обгон всегда связан с выездом на встречную полосу, опережение — нет.\n\n💡 **Пример:** На дороге с односторонним движением обгона быть не может, только опережение.`;
    }

    return `Это важный момент в ПДД. Основные правила:\n\n1. Необходимо оценить дорожную обстановку\n2. Убедиться в безопасности маневра\n3. Соблюдать приоритет других участников\n\nРекомендую закрепить эти знания на практике в разделе "Симуляции".`;
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  // Canvas functions
  const handleAddObject = (item: (typeof objects)[0]) => {
    const newObject: CanvasObject = {
      id: `obj-${Date.now()}`,
      type: item.id,
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 200,
      label: item.label,
      icon: item.icon,
      color: item.color,
    };
    setCanvasObjects((prev) => [...prev, newObject]);
  };

  const handleDeleteObject = (id: string) => {
    setCanvasObjects((prev) =>
      prev.filter((obj) => obj.id !== id),
    );
    setSelectedObject(null);
  };

  const handleClearCanvas = () => {
    setCanvasObjects([]);
    setSelectedObject(null);
  };

  const handleAnalyzeScenario = () => {
    if (canvasObjects.length === 0) {
      alert("Добавьте объекты на поле для анализа ситуации");
      return;
    }

    // Create context from canvas objects
    const context = canvasObjects
      .map((obj) => obj.label)
      .join(", ");
    const fullQuery = `${scenarioQuery}\n\nКонтекст ситуации: ${context}`;

    // Switch to chat tab and add the analysis
    const analysisMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content:
        fullQuery || "Проанализируйте эту дорожную ситуацию",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, analysisMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Анализирую вашу дорожную ситуацию с элементами: ${context}.\n\n**Оценка ситуации:**\n\n1. **Приоритет движения:** Необходимо учитывать знаки и разметку\n2. **Безопасность:** Соблюдайте дистанцию и скоростной режим\n3. **Действия водителя:** В данной ситуации рекомендуется...\n\n💡 Хотите разобрать конкретный момент подробнее?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2">
            AI Инструктор
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 rounded-full"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Beta
            </Badge>
          </h1>
          <p className="text-muted-foreground mt-1">
            Персональный помощник для разбора правил и
            моделирования ситуаций.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
          >
            <Save className="h-4 w-4 mr-2" />
            Сохранить сессию
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
          >
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="chat"
        className="flex-1 flex flex-col h-full min-h-0"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger
            value="chat"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Диалог
          </TabsTrigger>
          <TabsTrigger
            value="scenario"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Zap className="h-4 w-4 mr-2" />
            Сборщик ситуаций
          </TabsTrigger>
        </TabsList>

        {/* CHAT MODE */}
        <TabsContent
          value="chat"
          className="flex-1 flex flex-col data-[state=active]:flex overflow-hidden border rounded-2xl bg-white shadow-sm"
        >
          {/* Quick Questions Bar */}
          <div className="p-4 bg-slate-50 border-b">
            <p className="text-xs text-muted-foreground mb-2">
              Быстрые вопросы:
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickQuestions.map((question, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="rounded-full whitespace-nowrap text-xs"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          <ScrollArea className="flex-1 p-6 bg-slate-50/30">
            <div className="space-y-6 max-w-3xl mx-auto pb-4">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className="mt-1 flex-shrink-0">
                      {message.role === "assistant" ? (
                        <Avatar className="h-10 w-10 border-2 border-blue-100 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
                          <AvatarFallback className="bg-transparent">
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="h-10 w-10 border-2 border-slate-200 shadow-sm">
                          <AvatarImage src="https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2ODMzOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080" />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div
                      className={`space-y-1 flex-1 ${message.role === "user" ? "text-right" : ""}`}
                    >
                      <div className="text-xs text-slate-400 font-medium ml-1">
                        {message.role === "assistant"
                          ? "AI Инструктор"
                          : "Вы"}
                      </div>
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed inline-block text-left max-w-[85%] ${
                          message.role === "assistant"
                            ? "bg-white shadow-sm border border-slate-100 text-slate-700 rounded-tl-none"
                            : "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg rounded-tr-none"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">
                          {message.content}
                        </div>

                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Копировать
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 ml-1 mt-1">
                        {message.timestamp.toLocaleTimeString(
                          "ru-RU",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <Avatar className="h-10 w-10 border-2 border-blue-100 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="p-4 bg-white border-t">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl flex-shrink-0"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <div className="relative flex-1">
                  <Input
                    placeholder="Спросите что-нибудь про ПДД..."
                    className="pr-12 py-6 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 rounded-xl"
                    value={inputValue}
                    onChange={(e) =>
                      setInputValue(e.target.value)
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1 bottom-1 h-auto w-10 text-slate-400 hover:text-primary"
                  >
                    <Sparkles className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  className="h-auto px-6 rounded-xl shadow-md bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputValue.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                AI может допускать ошибки. Проверяйте важную
                информацию.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* SCENARIO BUILDER MODE */}
        <TabsContent
          value="scenario"
          className="flex-1 data-[state=active]:flex overflow-hidden min-h-0"
        >
          <VisualScenarioBuilder onAnalyze={(objects, query) => {
            if (objects.length === 0) {
              alert("Добавьте объекты на поле для анализа ситуации");
              return;
            }

            const context = objects.map((obj) => obj.label).join(", ");
            const fullQuery = `${query}\n\nКонтекст ситуации: ${context}`;

            const analysisMessage: Message = {
              id: Date.now().toString(),
              role: "user",
              content: fullQuery || "Проанализируйте эту дорожную ситуацию",
              timestamp: new Date(),
            };

            setMessages((prev) => [...prev, analysisMessage]);
            setIsTyping(true);

            setTimeout(() => {
              const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `Анализирую вашу дорожную ситуацию с элементами: ${context}.\n\n**Оценка ситуации:**\n\n1. **Приоритет движения:** Необходимо учитывать знаки и разметку\n2. **Безопасность:** Соблюдайте дистанцию и скоростной режим\n3. **Действия водителя:** В данной ситуации рекомендуется...\n\n💡 Хотите разобрать конкретный момент подробнее?`,
                timestamp: new Date(),
              };
              setMessages((prev) => [...prev, aiMessage]);
              setIsTyping(false);
            }, 2000);
          }} />
        </TabsContent>
      </Tabs>
    </div>
  );
};