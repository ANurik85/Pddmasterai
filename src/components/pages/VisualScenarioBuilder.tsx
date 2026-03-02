import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import {
  Sparkles,
  Trash2,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  CornerDownLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CanvasObject {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  label: string;
  imageUrl?: string;
  zIndex: number;
}

interface VisualScenarioBuilderProps {
  onAnalyze: (objects: CanvasObject[], query: string) => void;
}

export const VisualScenarioBuilder = ({ onAnalyze }: VisualScenarioBuilderProps) => {
  const [canvasObjects, setCanvasObjects] = useState<CanvasObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [scenarioQuery, setScenarioQuery] = useState("");
  const [backgroundType, setBackgroundType] = useState<string | null>(null);

  // Visual elements with real images
  const roadBackgrounds = [
    {
      id: "intersection",
      label: "Перекресток",
      imageUrl: "https://images.unsplash.com/photo-1565081160092-941833b06abd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwaW50ZXJzZWN0aW9uJTIwdG9wJTIwdmlld3xlbnwxfHx8fDE3Njg1NDY1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "background"
    },
    {
      id: "roundabout",
      label: "Круговое движение",
      imageUrl: "https://images.unsplash.com/photo-1565081160092-941833b06abd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwaW50ZXJzZWN0aW9uJTIwdG9wJTIwdmlld3xlbnwxfHx8fDE3Njg1NDY1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "background"
    }
  ];

  const vehicles = [
    {
      id: "car-red",
      label: "Красная машина",
      imageUrl: "https://images.unsplash.com/photo-1767597186227-44fb070f64de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0b3AlMjB2aWV3JTIwaXNvbGF0ZWR8ZW58MXx8fHwxNzY4NTQ2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "vehicle",
      color: "red"
    },
    {
      id: "car-blue",
      label: "Синяя машина",
      imageUrl: "https://images.unsplash.com/photo-1767597186227-44fb070f64de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0b3AlMjB2aWV3JTIwaXNvbGF0ZWR8ZW58MXx8fHwxNzY4NTQ2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "vehicle",
      color: "blue"
    },
    {
      id: "car-green",
      label: "Зеленая машина",
      imageUrl: "https://images.unsplash.com/photo-1767597186227-44fb070f64de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0b3AlMjB2aWV3JTIwaXNvbGF0ZWR8ZW58MXx8fHwxNzY4NTQ2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "vehicle",
      color: "green"
    },
    {
      id: "truck",
      label: "Грузовик",
      imageUrl: "https://images.unsplash.com/photo-1617139962074-4827ed772aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMHRvcCUyMHZpZXd8ZW58MXx8fHwxNzY4NTQ2NTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "vehicle",
      color: "orange"
    }
  ];

  const signs = [
    {
      id: "stop-sign",
      label: "Знак STOP",
      imageUrl: "https://images.unsplash.com/photo-1620676524523-e79e61856a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwc2lnbiUyMHN0b3B8ZW58MXx8fHwxNzY4NTQ2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "sign"
    },
    {
      id: "yield-sign",
      label: "Знак Уступи дорогу",
      imageUrl: "https://images.unsplash.com/photo-1620676524523-e79e61856a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwc2lnbiUyMHN0b3B8ZW58MXx8fHwxNzY4NTQ2NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "sign"
    },
    {
      id: "traffic-light",
      label: "Светофор",
      imageUrl: "https://images.unsplash.com/photo-1581677641984-cf14ca58c5ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwbGlnaHR8ZW58MXx8fHwxNzY4NDYyOTgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "sign"
    }
  ];

  const handleSetBackground = (bg: typeof roadBackgrounds[0]) => {
    setBackgroundType(bg.id);
  };

  const handleAddObject = (item: any) => {
    const newObject: CanvasObject = {
      id: `obj-${Date.now()}`,
      type: item.id,
      x: 300 + Math.random() * 200,
      y: 200 + Math.random() * 150,
      rotation: 0,
      scale: 1,
      label: item.label,
      imageUrl: item.imageUrl,
      zIndex: canvasObjects.length + 1,
    };
    setCanvasObjects((prev) => [...prev, newObject]);
  };

  const handleDeleteObject = (id: string) => {
    setCanvasObjects((prev) => prev.filter((obj) => obj.id !== id));
    setSelectedObject(null);
  };

  const handleRotateObject = (id: string, direction: "left" | "right") => {
    setCanvasObjects((prev) =>
      prev.map((obj) =>
        obj.id === id
          ? { ...obj, rotation: obj.rotation + (direction === "right" ? 15 : -15) }
          : obj
      )
    );
  };

  const handleScaleObject = (id: string, delta: number) => {
    setCanvasObjects((prev) =>
      prev.map((obj) =>
        obj.id === id
          ? { ...obj, scale: Math.max(0.5, Math.min(2, obj.scale + delta)) }
          : obj
      )
    );
  };

  const handleClearCanvas = () => {
    setCanvasObjects([]);
    setBackgroundType(null);
    setSelectedObject(null);
  };

  const selectedObj = canvasObjects.find((obj) => obj.id === selectedObject);

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden min-h-0">
      {/* Left Sidebar - Library */}
      <Card className="w-full lg:w-80 flex-shrink-0 bg-white shadow-sm border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Библиотека элементов
          </h3>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
          <div className="p-4 space-y-6">
            {/* Road Backgrounds */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                🛣️ Дорожное полотно
              </h4>
              <div className="space-y-2">
                {roadBackgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => handleSetBackground(bg)}
                    className={`w-full p-3 rounded-xl border-2 transition-all ${
                      backgroundType === bg.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200">
                        <img
                          src={bg.imageUrl}
                          alt={bg.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium">{bg.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicles */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                🚗 Транспорт
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => handleAddObject(vehicle)}
                    className="p-3 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-white mb-2">
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.label}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        style={{ filter: `hue-rotate(${vehicle.color === 'blue' ? '200deg' : vehicle.color === 'green' ? '100deg' : '0deg'})` }}
                      />
                    </div>
                    <p className="text-xs font-medium text-center">{vehicle.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Signs */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                🚦 Знаки и светофоры
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {signs.map((sign) => (
                  <button
                    key={sign.id}
                    onClick={() => handleAddObject(sign)}
                    className="p-3 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-white mb-2">
                      <img
                        src={sign.imageUrl}
                        alt={sign.label}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-xs font-medium text-center">{sign.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="pt-4 border-t space-y-2">
              <Button
                variant="outline"
                className="w-full rounded-xl justify-start"
                onClick={handleClearCanvas}
                disabled={canvasObjects.length === 0 && !backgroundType}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Очистить всё
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <Card className="flex-1 relative overflow-hidden shadow-xl rounded-2xl border-2 border-slate-300">
          {/* Background Layer */}
          {backgroundType ? (
            <div className="absolute inset-0">
              <img
                src={roadBackgrounds.find(bg => bg.id === backgroundType)?.imageUrl}
                alt="Road background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
          )}

          {/* Empty State */}
          {canvasObjects.length === 0 && !backgroundType && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 pointer-events-none select-none z-10">
              <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl">
                <CornerDownLeft className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Начните с выбора дорожного полотна</p>
                <p className="text-sm mt-2">Затем добавьте машины и знаки</p>
              </div>
            </div>
          )}

          {/* Canvas Objects */}
          <div className="absolute inset-0">
            <AnimatePresence>
              {canvasObjects.map((obj) => (
                <motion.div
                  key={obj.id}
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: obj.scale + 0.05 }}
                  whileDrag={{ scale: obj.scale + 0.1, zIndex: 100 }}
                  style={{
                    x: obj.x,
                    y: obj.y,
                    rotate: obj.rotation,
                    scale: obj.scale,
                    zIndex: obj.zIndex,
                  }}
                  className={`absolute cursor-move ${
                    selectedObject === obj.id
                      ? "ring-4 ring-yellow-400 ring-offset-2"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedObject(obj.id);
                  }}
                  onDragEnd={(e, info) => {
                    setCanvasObjects(prev =>
                      prev.map(o =>
                        o.id === obj.id
                          ? { ...o, x: obj.x + info.offset.x, y: obj.y + info.offset.y }
                          : o
                      )
                    );
                  }}
                >
                  <div className="relative group">
                    {obj.imageUrl ? (
                      <img
                        src={obj.imageUrl}
                        alt={obj.label}
                        className="w-24 h-24 object-contain drop-shadow-2xl pointer-events-none"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-24 h-24 bg-white rounded-lg shadow-xl flex items-center justify-center">
                        <span className="text-4xl">{obj.label}</span>
                      </div>
                    )}
                    
                    {/* Object label */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {obj.label}
                    </div>

                    {/* Delete button */}
                    {selectedObject === obj.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteObject(obj.id);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Object Count */}
          {(canvasObjects.length > 0 || backgroundType) && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-3 rounded-xl shadow-lg border z-20">
              <p className="text-xs text-muted-foreground">Объектов:</p>
              <p className="text-2xl font-bold">{canvasObjects.length}</p>
            </div>
          )}
        </Card>

        {/* Object Controls */}
        {selectedObj && (
          <Card className="bg-white shadow-lg border rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2">Управление: {selectedObj.label}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => handleRotateObject(selectedObj.id, "left")}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => handleRotateObject(selectedObj.id, "right")}
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => handleScaleObject(selectedObj.id, -0.1)}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => handleScaleObject(selectedObj.id, 0.1)}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-lg ml-auto"
                      onClick={() => handleDeleteObject(selectedObj.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Analysis Panel */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg border-2 border-blue-200 rounded-2xl">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  Анализ ситуации
                </div>
                <div className="flex gap-2 flex-wrap">
                  {canvasObjects.length > 0 ? (
                    canvasObjects.map((obj) => (
                      <Badge
                        key={obj.id}
                        variant="secondary"
                        className="rounded-full bg-white"
                      >
                        {obj.label}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground italic">
                      Добавьте объекты на сцену
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Ваш вопрос: Кто проедет первым? Какие правила применяются?"
                  className="bg-white border-blue-200 rounded-xl flex-1"
                  value={scenarioQuery}
                  onChange={(e) => setScenarioQuery(e.target.value)}
                />
                <Button
                  className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all rounded-xl"
                  onClick={() => onAnalyze(canvasObjects, scenarioQuery)}
                  disabled={canvasObjects.length === 0}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Разобрать
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
