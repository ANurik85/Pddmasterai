import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Globe,
  User,
  Menu,
  ShieldCheck,
  Search,
  MessageCircle,
  ChevronDown,
  BookOpen,
  FileText,
  Gamepad2,
  Target,
} from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock search results
  const searchResults = [
    { title: "Дорожные знаки", category: "Курсы", icon: BookOpen, page: "lesson" },
    { title: "Билет №15", category: "Тесты", icon: FileText, page: "test" },
    { title: "Проезд перекрестков", category: "Курсы", icon: BookOpen, page: "lesson" },
    { title: "Мини-игры", category: "Тренажеры", icon: Gamepad2, page: "games" },
    { title: "Симуляция вождения", category: "Практика", icon: Target, page: "simulation" },
  ].filter(item =>
    searchQuery.length > 0 &&
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(true);
  };

  const handleSearchResultClick = (page: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/${page}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground hidden md:inline-block">
            PDD.Master
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {/* Learning Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium gap-1">
                Обучение <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onSelect={() => navigate('/learn')}>
                Курсы
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/cards')}>
                Карточки
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/ai-explanation')}>
                AI Симулятор
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Practice Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium gap-1">
                Практика <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
            <DropdownMenuItem onSelect={() => navigate('/practice')}>
                Главная
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/test')}>
                Тесты
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/test')}>
                Экзамен
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/simulation')}>
                Симуляции
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Trainers Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium gap-1">
                Тренажеры <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onSelect={() => navigate('/games')}>
                Мини-игры
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/ai-explanation')}>
                Сборщик сценариев
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/analyze-photo')}>
                Анализ фото
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" className="text-sm font-medium" onClick={() => navigate('/profile')}>
            Мой прогресс
          </Button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">

          {/* AI Assistant Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:text-primary/80 hover:bg-primary/10"
            onClick={() => navigate('/ai-explanation')}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">AI Помощник</span>
          </Button>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block w-48 lg:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Поиск (знаки, билеты)..."
              className="pl-8 h-9 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 0 && setSearchOpen(true)}
            />
          </form>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Сменить язык</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Русский</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Қазақша</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate('/profile')}>Личный кабинет</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/profile')}>Настройки</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Выход</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Поиск</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по сайту..."
                className="pl-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            {searchQuery.length > 0 && (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => {
                    const Icon = result.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSearchResultClick(result.page)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition-colors text-left"
                      >
                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{result.title}</p>
                          <p className="text-xs text-muted-foreground">{result.category}</p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Ничего не найдено</p>
                    <p className="text-sm mt-1">Попробуйте изменить запрос</p>
                  </div>
                )}
              </div>
            )}

            {searchQuery.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Популярные запросы:</p>
                <div className="flex flex-wrap gap-2">
                  {['Дорожные знаки', 'Билеты', 'Штрафы', 'Разметка', 'Перекрестки'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-sm transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};