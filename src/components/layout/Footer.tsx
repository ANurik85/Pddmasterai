import React from "react";
import { ShieldCheck, Mail, Phone, MapPin, Github, Twitter, Instagram } from "lucide-react";
import { Separator } from "../ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Column 1: Service Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">PDD.Master</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Современный сервис для изучения правил дорожного движения с использованием искусственного интеллекта и интерактивных курсов.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              <Github className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Документация</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Правила сервиса</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Руководство пользователя</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Контакты</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>support@pddmaster.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Москва, ул. Инноваций, д. 1</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2025 PDD.Master. Все права защищены.</p>
          <div className="flex gap-6">
             <a href="#" className="hover:text-primary">Условия использования</a>
             <a href="#" className="hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
