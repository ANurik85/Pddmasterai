import React, { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { MainWorkspace } from "./components/dashboard/MainWorkspace";

// Pages
import { LearningHub } from "./components/pages/LearningHub";
import { PracticeHub } from "./components/pages/PracticeHub";
import { LessonPage } from "./components/pages/LessonPage";
import { FlashcardsPage } from "./components/pages/FlashcardsPage";
import { AIExplanationPage } from "./components/pages/AIExplanationPage";
import { MiniGamesPage } from "./components/pages/MiniGamesPage";
import { TestInterface } from "./components/pages/TestInterface";
import { SimulationInterface } from "./components/pages/SimulationInterface";
import { ResultsPage } from "./components/pages/ResultsPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { PhotoAnalysisPage } from "./components/pages/PhotoAnalysisPage";
import { Button } from "./components/ui/button";
import { Mic } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isListening, setIsListening] = useState(false);

  const toggleVoiceAssistant = () => {
    setIsListening(!isListening);
    // Mock voice interaction logic would go here
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000); // Auto close after 3s mock
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <MainWorkspace />; // Using existing workspace as Home for now, or could be LearningHub
      case "learn":
        return <LearningHub onNavigate={setCurrentPage} />;
      case "practice":
        return <PracticeHub onNavigate={setCurrentPage} />;
      case "lesson":
        return <LessonPage onNavigate={setCurrentPage} />;
      case "cards":
        return <FlashcardsPage onNavigate={setCurrentPage} />;
      case "ai-explanation":
      case "ai-scenario": // Both map to same page, logic inside page handles tab default if needed (future improvement)
        return (
          <AIExplanationPage onNavigate={setCurrentPage} />
        );
      case "games":
        return <MiniGamesPage onNavigate={setCurrentPage} />;
      case "test":
        return <TestInterface onNavigate={setCurrentPage} />;
      case "simulation":
        return (
          <SimulationInterface onNavigate={setCurrentPage} />
        );
      case "results":
        return <ResultsPage onNavigate={setCurrentPage} />;
      case "profile":
        return <ProfilePage onNavigate={setCurrentPage} />;
      case "analyze-photo":
        return (
          <PhotoAnalysisPage onNavigate={setCurrentPage} />
        );
      default:
        return <MainWorkspace />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased text-slate-900 relative">
      <Header onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col">
        {renderPage()}
      </main>
      <Footer />

      {/* Voice Assistant FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-full right-0 mb-4 p-4 bg-slate-900 text-white rounded-2xl shadow-xl w-64"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">
                  Слушаю...
                </span>
              </div>
              <p className="text-xs text-slate-300">
                "Какой штраф за проезд на красный?"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          size="icon"
          className={`h-14 w-14 rounded-full shadow-2xl transition-all ${isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-primary hover:bg-primary/90"}`}
          onClick={toggleVoiceAssistant}
        >
          <Mic className="h-6 w-6" />
          <span className="sr-only">Голосовой помощник</span>
        </Button>
      </div>
    </div>
  );
}