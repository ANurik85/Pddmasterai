import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { UploadCloud, Image as ImageIcon, CheckCircle, Loader2, Camera, FileImage, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PhotoAnalysisPageProps {
  onNavigate: (page: string) => void;
}

export const PhotoAnalysisPage = ({ onNavigate }: PhotoAnalysisPageProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = () => {
     setIsAnalyzing(true);
     setTimeout(() => {
         setIsAnalyzing(false);
         setResult(true);
     }, 2500);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl h-[calc(100vh-80px)] flex flex-col justify-center">
       
       <div className="text-center mb-10 space-y-4">
           <h1 className="text-4xl font-bold tracking-tight text-slate-900">AI Анализ ситуации</h1>
           <p className="text-slate-500 text-lg max-w-xl mx-auto">
               Сфотографируйте сложный перекресток или непонятный знак. Наш алгоритм распознает объекты и объяснит правила проезда.
           </p>
       </div>

       <AnimatePresence mode="wait">
           {!result ? (
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-2xl mx-auto"
               >
                   <Card 
                        className={`border-4 border-dashed transition-all cursor-pointer overflow-hidden relative group ${
                            dragActive ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300"
                        }`}
                        onClick={handleUpload}
                        onDragEnter={() => setDragActive(true)}
                        onDragLeave={() => setDragActive(false)}
                   >
                       <CardContent className="flex flex-col items-center justify-center h-96 gap-8 relative z-10">
                           {isAnalyzing ? (
                               <div className="flex flex-col items-center gap-4">
                                   <div className="relative">
                                       <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                                       <Loader2 className="h-20 w-20 text-primary animate-spin relative z-10" />
                                   </div>
                                   <div className="text-center space-y-1">
                                       <p className="text-xl font-bold text-slate-900">Анализирую изображение...</p>
                                       <p className="text-sm text-slate-500">Распознавание знаков и разметки</p>
                                   </div>
                               </div>
                           ) : (
                               <>
                                   <div className="p-8 rounded-full bg-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                       <UploadCloud className="h-16 w-16 text-slate-400 group-hover:text-primary transition-colors" />
                                   </div>
                                   <div className="text-center space-y-3">
                                       <h3 className="text-2xl font-bold text-slate-900">Нажмите для загрузки</h3>
                                       <p className="text-base text-slate-500">или перетащите фото сюда</p>
                                       <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">JPG, PNG, HEIC</p>
                                   </div>
                                   <div className="flex gap-4 mt-4">
                                       <Button variant="outline" className="gap-2 bg-white shadow-sm">
                                           <FileImage className="h-4 w-4" /> Выбрать файл
                                       </Button>
                                       <Button className="gap-2 shadow-md">
                                           <Camera className="h-4 w-4" /> Камера
                                       </Button>
                                   </div>
                               </>
                           )}
                       </CardContent>
                       
                       {/* Decorative background elements */}
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   </Card>
               </motion.div>
           ) : (
               <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
               >
                   <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-900 group">
                       {/* Result Image Placeholder */}
                       <div className="absolute inset-0 flex items-center justify-center text-slate-600 bg-slate-800">
                           <ImageIcon className="h-24 w-24 opacity-20" />
                       </div>
                       
                       {/* Overlay Annotations (Mock) */}
                       <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ delay: 0.5, type: "spring" }}
                          className="absolute top-1/4 left-1/3 border-4 border-yellow-400 rounded-xl p-8 bg-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                       >
                           <div className="absolute -top-3 -right-3 h-6 w-6 bg-yellow-400 rounded-full animate-ping" />
                           <span className="absolute -top-8 left-0 bg-yellow-400 text-black text-sm px-3 py-1 rounded-lg font-bold shadow-sm">Знак 3.20</span>
                       </motion.div>
                       
                       <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded">
                           Confidence: 98%
                       </div>
                   </div>

                   <div className="flex flex-col gap-4">
                       <Card className="flex-1 border-green-100 bg-green-50/30 shadow-sm">
                           <CardContent className="p-6 space-y-6">
                               <div className="flex items-center gap-3 text-green-700 font-bold text-xl pb-4 border-b border-green-100">
                                   <div className="p-1 bg-green-100 rounded-full">
                                      <CheckCircle className="h-6 w-6" />
                                   </div>
                                   Анализ завершен
                               </div>
                               
                               <div className="space-y-4">
                                   <div>
                                       <h4 className="font-bold text-slate-900 mb-2">Обнаружено:</h4>
                                       <div className="flex gap-2">
                                           <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">⛔ Знак 3.20</span>
                                           <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">➖ Сплошная линия 1.1</span>
                                       </div>
                                   </div>

                                   <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                       <h4 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide text-slate-400">Вердикт AI</h4>
                                       <p className="text-slate-800 leading-relaxed text-base">
                                           На данном участке дороги действует знак <b>3.20 "Обгон запрещен"</b>. 
                                           В зоне действия этого знака вам <span className="text-red-600 font-bold">запрещено</span> совершать обгон, даже если разметка прерывистая или отсутствует.
                                       </p>
                                   </div>

                                   <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                                       <span className="font-bold">Исключение:</span> тихоходные ТС, гужевые повозки, велосипеды, мопеды и мотоциклы без коляски.
                                   </div>
                               </div>
                           </CardContent>
                       </Card>
                       <Button variant="outline" size="lg" className="w-full" onClick={() => setResult(false)}>
                           <X className="mr-2 h-4 w-4" /> Загрузить другое фото
                       </Button>
                   </div>
               </motion.div>
           )}
       </AnimatePresence>
    </div>
  );
};
