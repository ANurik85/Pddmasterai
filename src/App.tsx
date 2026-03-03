import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { MainWorkspace } from "./components/dashboard/MainWorkspace";

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
  const [isListening, setIsListening] = useState(false);

  const toggleVoiceAssistant = () => {
    setIsListening(!isListening);
    // Mock voice interaction logic would go here
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000); // Auto close after 3s mock
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased text-slate-900 relative">
      <Header />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<MainWorkspace />} />
          <Route path="/learn" element={<LearningHub />} />
          <Route path="/practice" element={<PracticeHub />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/cards" element={<FlashcardsPage />} />
          <Route path="/ai-explanation" element={<AIExplanationPage />} />
          <Route path="/ai-scenario" element={<AIExplanationPage />} />
          <Route path="/games" element={<MiniGamesPage />} />
          <Route path="/test" element={<TestInterface />} />
          <Route path="/simulation" element={<SimulationInterface />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analyze-photo" element={<PhotoAnalysisPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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