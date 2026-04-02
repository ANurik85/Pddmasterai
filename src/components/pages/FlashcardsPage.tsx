import React, { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";
import {
  ArrowLeft, Check, RotateCcw, HelpCircle, ChevronDown,
  BrainCircuit, BookOpen, Maximize2, X
} from "lucide-react";

interface FlashcardsPageProps {
  onNavigate: (page: string) => void;
}

type CardStatus = "know" | "hard" | "forgot" | null;
type StatusFilter = "all" | "know" | "hard" | "forgot";

interface FlashCard {
  id: number;
  category: string;
  front: { signNumber: string; signType: string; extra?: { speed?: number } };
  back: { title: string; description: string };
}

// ─── SVG sign renderer ──────────────────────────────────────────────────────

const SignSVG = ({ type, extra }: { type: string; extra?: { speed?: number } }) => {
  const speed = extra?.speed;

  const Prohibitory = ({ children }: { children: React.ReactNode }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#CC0000" strokeWidth="9" />
      {children}
    </svg>
  );
  const Warning = ({ children }: { children: React.ReactNode }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,6 95,92 5,92" fill="#FFCD00" stroke="#CC0000" strokeWidth="5" strokeLinejoin="round" />
      {children}
    </svg>
  );
  const Mandatory = ({ children }: { children: React.ReactNode }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#1565C0" />
      {children}
    </svg>
  );
  const InfoSign = ({ children }: { children: React.ReactNode }) => (
    <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="76" rx="7" fill="#1565C0" />
      {children}
    </svg>
  );

  switch (type) {
    case "prohibitory-bar":
      return <Prohibitory><rect x="16" y="42" width="68" height="16" fill="#CC0000" rx="3" /></Prohibitory>;
    case "prohibitory-cross":
      return <Prohibitory>
        <line x1="28" y1="28" x2="72" y2="72" stroke="#CC0000" strokeWidth="10" strokeLinecap="round" />
        <line x1="72" y1="28" x2="28" y2="72" stroke="#CC0000" strokeWidth="10" strokeLinecap="round" />
      </Prohibitory>;
    case "prohibitory-truck":
      return <Prohibitory>
        <rect x="20" y="42" width="38" height="20" rx="2" fill="#444" />
        <rect x="58" y="50" width="20" height="12" rx="2" fill="#444" />
        <circle cx="32" cy="64" r="5" fill="#444" />
        <circle cx="66" cy="64" r="5" fill="#444" />
        <line x1="14" y1="78" x2="86" y2="22" stroke="#CC0000" strokeWidth="6" strokeLinecap="round" />
      </Prohibitory>;
    case "prohibitory-turn-right":
      return <Prohibitory>
        <path d="M38 70 L38 42 Q38 28 52 28 L64 28" fill="none" stroke="#333" strokeWidth="7" strokeLinecap="round" />
        <polygon points="64,18 78,28 64,38" fill="#333" />
        <line x1="14" y1="78" x2="86" y2="22" stroke="#CC0000" strokeWidth="6" strokeLinecap="round" />
      </Prohibitory>;
    case "prohibitory-overtake":
      return <Prohibitory>
        <rect x="22" y="48" width="22" height="14" rx="3" fill="#555" />
        <rect x="52" y="38" width="22" height="14" rx="3" fill="#888" />
        <line x1="14" y1="78" x2="86" y2="22" stroke="#CC0000" strokeWidth="6" strokeLinecap="round" />
      </Prohibitory>;
    case "prohibitory-speed":
      return <Prohibitory>
        <text x="50" y="63" textAnchor="middle" fontSize="34" fill="#CC0000" fontFamily="Arial" fontWeight="bold">{speed}</text>
      </Prohibitory>;
    case "prohibitory-no-stop":
      return <Prohibitory>
        <line x1="28" y1="72" x2="72" y2="28" stroke="#CC0000" strokeWidth="9" strokeLinecap="round" />
        <line x1="16" y1="50" x2="84" y2="50" stroke="#CC0000" strokeWidth="6" strokeLinecap="round" />
      </Prohibitory>;
    case "prohibitory-no-parking":
      return <Prohibitory>
        <text x="50" y="63" textAnchor="middle" fontSize="44" fill="#CC0000" fontFamily="Arial" fontWeight="bold">P</text>
        <line x1="72" y1="28" x2="28" y2="72" stroke="#CC0000" strokeWidth="8" strokeLinecap="round" />
      </Prohibitory>;

    case "warning-railway":
      return <Warning>
        <line x1="50" y1="28" x2="50" y2="75" stroke="#333" strokeWidth="5" strokeLinecap="round" />
        <line x1="32" y1="44" x2="68" y2="44" stroke="#333" strokeWidth="5" strokeLinecap="round" />
        <line x1="32" y1="60" x2="68" y2="60" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      </Warning>;
    case "warning-curve-right":
      return <Warning>
        <path d="M42 76 Q42 52 54 44 Q68 36 66 22" fill="none" stroke="#333" strokeWidth="6" strokeLinecap="round" />
        <polygon points="66,14 75,28 57,28" fill="#333" />
      </Warning>;
    case "warning-bump":
      return <Warning>
        <line x1="22" y1="66" x2="78" y2="66" stroke="#333" strokeWidth="5" strokeLinecap="round" />
        <path d="M30 66 Q50 44 70 66" fill="#333" />
      </Warning>;
    case "warning-pedestrian":
      return <Warning>
        <circle cx="50" cy="28" r="7" fill="#333" />
        <line x1="50" y1="35" x2="50" y2="60" stroke="#333" strokeWidth="6" strokeLinecap="round" />
        <line x1="34" y1="48" x2="66" y2="48" stroke="#333" strokeWidth="5" strokeLinecap="round" />
        <line x1="50" y1="60" x2="38" y2="78" stroke="#333" strokeWidth="5" strokeLinecap="round" />
        <line x1="50" y1="60" x2="62" y2="78" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      </Warning>;
    case "warning-roadwork":
      return <Warning>
        <rect x="40" y="34" width="20" height="32" rx="3" fill="#333" />
        <polygon points="50,24 60,36 40,36" fill="#333" />
        <line x1="34" y1="74" x2="66" y2="74" stroke="#CC0000" strokeWidth="6" strokeLinecap="round" />
      </Warning>;

    case "mandatory-straight":
      return <Mandatory><polygon points="50,18 62,44 56,44 56,72 44,72 44,44 38,44" fill="white" /></Mandatory>;
    case "mandatory-right":
      return <Mandatory><polygon points="20,56 50,56 50,70 76,44 50,18 50,32 20,32" fill="white" /></Mandatory>;
    case "mandatory-bypass-right":
      return <Mandatory>
        <rect x="38" y="22" width="10" height="56" rx="3" fill="white" />
        <polygon points="52,54 74,44 52,34" fill="white" />
      </Mandatory>;
    case "mandatory-roundabout":
      return <Mandatory>
        <path d="M50 24 A26 26 0 1 0 76 50" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" />
        <polygon points="72,36 86,50 72,64" fill="white" />
      </Mandatory>;
    case "mandatory-minspeed":
      return <Mandatory>
        <text x="50" y="64" textAnchor="middle" fontSize="34" fill="white" fontFamily="Arial" fontWeight="bold">{speed}</text>
      </Mandatory>;

    case "info-highway":
      return <InfoSign>
        <path d="M20 62 L50 28 L80 62" fill="none" stroke="white" strokeWidth="4" strokeLinejoin="round" />
        <line x1="50" y1="28" x2="50" y2="62" stroke="white" strokeWidth="4" />
        <path d="M10 54 L50 18 L90 54" fill="none" stroke="white" strokeWidth="3" opacity="0.5" />
      </InfoSign>;
    case "info-oneway":
      return <InfoSign><polygon points="18,46 60,46 60,30 84,40 60,50 60,34 18,34" fill="white" /></InfoSign>;
    case "info-crosswalk":
      return <InfoSign>
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={18 + i * 17} y="22" width="10" height="36" rx="1" fill="white" opacity={i % 2 === 0 ? 1 : 0.5} />
        ))}
        <circle cx="50" cy="67" r="5" fill="white" />
      </InfoSign>;
    case "info-residential":
      return <InfoSign>
        <rect x="28" y="38" width="44" height="28" rx="2" fill="white" />
        <polygon points="50,18 20,38 80,38" fill="white" />
        <rect x="42" y="50" width="16" height="16" rx="1" fill="#1565C0" />
        <circle cx="72" cy="55" r="6" fill="#FFCD00" />
      </InfoSign>;
    case "info-busstop":
      return <InfoSign>
        <text x="50" y="56" textAnchor="middle" fontSize="40" fill="white" fontFamily="Arial" fontWeight="bold">A</text>
      </InfoSign>;
    case "info-schoolzone":
      return <InfoSign>
        <circle cx="50" cy="32" r="8" fill="white" />
        <line x1="50" y1="40" x2="50" y2="58" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <line x1="36" y1="50" x2="64" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="50" y1="58" x2="40" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="50" y1="58" x2="60" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </InfoSign>;

    case "priority-main":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" fill="#FFCD00" />
          <rect x="26" y="26" width="48" height="48" transform="rotate(45 50 50)" fill="white" />
        </svg>
      );
    case "priority-yield":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,92 4,10 96,10" fill="white" stroke="#CC0000" strokeWidth="8" strokeLinejoin="round" />
          <polygon points="50,76 18,18 82,18" fill="#CC0000" />
        </svg>
      );
    case "priority-stop":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <polygon points="68,5 95,32 95,68 68,95 32,95 5,68 5,32 32,5" fill="#CC0000" />
          <text x="50" y="62" textAnchor="middle" fontSize="22" fill="white" fontFamily="Arial" fontWeight="bold">STOP</text>
        </svg>
      );
    case "priority-end-main":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" fill="white" stroke="#888" strokeWidth="6" />
          <line x1="34" y1="34" x2="66" y2="66" stroke="#888" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case "special-town":
      return (
        <svg viewBox="0 0 120 70" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="116" height="66" rx="6" fill="#FFCD00" stroke="black" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fontSize="13" fill="black" fontFamily="Arial">Населённый</text>
          <text x="60" y="52" textAnchor="middle" fontSize="20" fill="black" fontFamily="Arial" fontWeight="bold">пункт</text>
        </svg>
      );
    case "special-pedestrian-zone":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="96" height="96" rx="6" fill="#1565C0" />
          <circle cx="50" cy="26" r="8" fill="white" />
          <line x1="50" y1="34" x2="50" y2="58" stroke="white" strokeWidth="6" strokeLinecap="round" />
          <line x1="34" y1="48" x2="66" y2="48" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <line x1="50" y1="58" x2="38" y2="76" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <line x1="50" y1="58" x2="62" y2="76" stroke="white" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "special-parking-zone":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="96" height="96" rx="6" fill="#1565C0" />
          <text x="50" y="66" textAnchor="middle" fontSize="58" fill="white" fontFamily="Arial" fontWeight="bold">P</text>
          <text x="50" y="86" textAnchor="middle" fontSize="11" fill="white" fontFamily="Arial">ЗОНА</text>
        </svg>
      );

    case "service-hospital":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="96" height="96" rx="6" fill="white" stroke="#1565C0" strokeWidth="4" />
          <rect x="40" y="22" width="20" height="56" rx="3" fill="#CC0000" />
          <rect x="22" y="40" width="56" height="20" rx="3" fill="#CC0000" />
        </svg>
      );
    case "service-gas":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="96" height="96" rx="6" fill="white" stroke="#1565C0" strokeWidth="4" />
          <rect x="22" y="30" width="36" height="46" rx="3" fill="#444" />
          <rect x="22" y="30" width="36" height="22" rx="2" fill="#888" />
          <rect x="58" y="36" width="18" height="30" rx="3" fill="#444" />
          <circle cx="67" cy="68" r="5" fill="#555" />
          <rect x="26" y="36" width="28" height="14" rx="2" fill="#CCC" />
        </svg>
      );
    case "service-parking":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="96" height="96" rx="6" fill="white" stroke="#1565C0" strokeWidth="4" />
          <text x="50" y="70" textAnchor="middle" fontSize="64" fill="#1565C0" fontFamily="Arial" fontWeight="bold">P</text>
        </svg>
      );
    case "service-emergency-exit":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="96" height="96" rx="6" fill="#2E7D32" />
          <rect x="30" y="20" width="40" height="60" rx="3" fill="white" />
          <rect x="56" y="20" width="14" height="60" rx="0" fill="#2E7D32" />
          <polygon points="68,50 80,38 80,62" fill="white" />
          <circle cx="42" cy="50" r="4" fill="#2E7D32" />
        </svg>
      );

    case "marking-solid":
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="116" height="76" rx="8" fill="#555" />
          <line x1="10" y1="40" x2="110" y2="40" stroke="white" strokeWidth="4" />
        </svg>
      );
    case "marking-dashed":
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="116" height="76" rx="8" fill="#555" />
          <line x1="10" y1="40" x2="110" y2="40" stroke="white" strokeWidth="4" strokeDasharray="14 10" />
        </svg>
      );
    case "marking-stopline":
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="116" height="76" rx="8" fill="#555" />
          <line x1="10" y1="40" x2="110" y2="40" stroke="white" strokeWidth="10" />
          <text x="60" y="64" textAnchor="middle" fontSize="10" fill="white" fontFamily="Arial">СТОП</text>
        </svg>
      );
    case "marking-crosswalk":
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="116" height="76" rx="8" fill="#555" />
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={i} x={16 + i * 18} y="18" width="12" height="44" fill="white" />
          ))}
        </svg>
      );

    case "marking-vertical-stripe":
      return (
        <svg viewBox="0 0 50 110" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="4" width="22" height="102" rx="4" fill="white" stroke="#bbb" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <rect key={i} x="14" y={4 + i * 14} width="22" height="8" fill={i % 2 === 0 ? "black" : "white"} />
          ))}
        </svg>
      );
    case "marking-vertical-barrier":
      return (
        <svg viewBox="0 0 120 50" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="12" width="112" height="26" rx="4" fill="white" stroke="#bbb" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <rect key={i} x={4 + i * 16} y="12" width="12" height="26" fill={i % 2 === 0 ? "#FFCD00" : "black"} />
          ))}
        </svg>
      );

    case "light-red":
      return (
        <svg viewBox="0 0 60 110" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="4" width="44" height="102" rx="12" fill="#222" />
          <circle cx="30" cy="26" r="13" fill="#CC0000" />
          <circle cx="30" cy="55" r="13" fill="#333" />
          <circle cx="30" cy="84" r="13" fill="#333" />
        </svg>
      );
    case "light-yellow":
      return (
        <svg viewBox="0 0 60 110" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="4" width="44" height="102" rx="12" fill="#222" />
          <circle cx="30" cy="26" r="13" fill="#333" />
          <circle cx="30" cy="55" r="13" fill="#FFCD00" />
          <circle cx="30" cy="84" r="13" fill="#333" />
        </svg>
      );
    case "light-green":
      return (
        <svg viewBox="0 0 60 110" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="4" width="44" height="102" rx="12" fill="#222" />
          <circle cx="30" cy="26" r="13" fill="#333" />
          <circle cx="30" cy="55" r="13" fill="#333" />
          <circle cx="30" cy="84" r="13" fill="#4CAF50" />
        </svg>
      );

    case "regulator-stop":
      return (
        <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="14" r="11" fill="#FDBCB4" />
          <rect x="34" y="25" width="32" height="36" rx="5" fill="#1565C0" />
          <line x1="6" y1="42" x2="40" y2="42" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
          <line x1="60" y1="42" x2="94" y2="42" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
          <rect x="88" y="34" width="9" height="16" rx="2" fill="#FFCD00" />
          <line x1="40" y1="61" x2="44" y2="88" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
          <line x1="60" y1="61" x2="56" y2="88" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );
    case "regulator-go":
      return (
        <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="14" r="11" fill="#FDBCB4" />
          <rect x="34" y="25" width="32" height="36" rx="5" fill="#1565C0" />
          <line x1="6" y1="42" x2="40" y2="42" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
          <line x1="60" y1="25" x2="60" y2="8" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
          <line x1="40" y1="61" x2="44" y2="88" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
          <line x1="60" y1="61" x2="56" y2="88" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );
    case "regulator-turn":
      return (
        <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="14" r="11" fill="#FDBCB4" />
          <rect x="34" y="25" width="32" height="36" rx="5" fill="#1565C0" />
          <line x1="6" y1="36" x2="40" y2="42" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
          <line x1="60" y1="42" x2="94" y2="36" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
          <line x1="40" y1="61" x2="44" y2="88" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
          <line x1="60" y1="61" x2="56" y2="88" stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#f0f0f0" stroke="#ccc" strokeWidth="4" />
          <text x="50" y="56" textAnchor="middle" fontSize="20" fill="#aaa">?</text>
        </svg>
      );
  }
};

// ─── Card data ──────────────────────────────────────────────────────────────

const ALL_CARDS: FlashCard[] = [
  // ЗАПРЕЩАЮЩИЕ (8)
  { id: 1, category: "Запрещающие", front: { signNumber: "3.1", signType: "prohibitory-bar" }, back: { title: "Въезд запрещён", description: "Въезд всех ТС в данном направлении запрещён. Знак называют «кирпич»." } },
  { id: 2, category: "Запрещающие", front: { signNumber: "3.2", signType: "prohibitory-cross" }, back: { title: "Движение запрещено", description: "Запрещается движение всех транспортных средств." } },
  { id: 3, category: "Запрещающие", front: { signNumber: "3.4", signType: "prohibitory-truck" }, back: { title: "Движение грузовых запрещено", description: "Запрещается движение грузовых авто с разрешённой максимальной массой более 3,5 т." } },
  { id: 4, category: "��апрещающие", front: { signNumber: "3.18.1", signType: "prohibitory-turn-right" }, back: { title: "Поворот направо запрещён", description: "Запрещается поворот направо на данном участке дороги." } },
  { id: 5, category: "Запрещающие", front: { signNumber: "3.20", signType: "prohibitory-overtake" }, back: { title: "Обгон запрещён", description: "Запрещается обгон всех ТС, кроме тихоходных, гужевых повозок, велосипедов и мопедов." } },
  { id: 6, category: "Запрещающие", front: { signNumber: "3.24", signType: "prohibitory-speed", extra: { speed: 60 } }, back: { title: "Ограничение максимальной скорости", description: "Запрещается движение со скоростью, превышающей указанную на знаке (60 км/ч)." } },
  { id: 7, category: "Запрещающие", front: { signNumber: "3.27", signType: "prohibitory-no-stop" }, back: { title: "Остановка запрещена", description: "Запрещаются остановка и стоянка транспортных средств." } },
  { id: 8, category: "Запрещающие", front: { signNumber: "3.28", signType: "prohibitory-no-parking" }, back: { title: "Стоянка запрещена", description: "Запрещается стоянка транспортных средств. Остановка допускается." } },
  // ПРЕДУПРЕЖДАЮЩИЕ (5)
  { id: 9, category: "Предупреждающие", front: { signNumber: "1.1", signType: "warning-railway" }, back: { title: "Ж/д переезд со шлагбаумом", description: "Железнодорожный переезд, оборудованный шлагбаумом. Соблюдайте особую осторожность." } },
  { id: 10, category: "Предупреждающие", front: { signNumber: "1.11.1", signType: "warning-curve-right" }, back: { title: "Опасный поворот (правый)", description: "Кривая дорога с правым поворотом малого радиуса или с ограниченной видимостью." } },
  { id: 11, category: "Предупреждающие", front: { signNumber: "1.17", signType: "warning-bump" }, back: { title: "Искусственная неровность", description: "Участок дороги с искусственной неровностью для принудительного снижения скорости." } },
  { id: 12, category: "Предупреждающие", front: { signNumber: "1.22", signType: "warning-pedestrian" }, back: { title: "Пешеходный переход", description: "Нерегулируемый пешеходный переход. Водитель обязан уступить дорогу пешеходам." } },
  { id: 13, category: "Предупреждающие", front: { signNumber: "1.25", signType: "warning-roadwork" }, back: { title: "Дорожные работы", description: "На данном участке ведутся дорожные работы. Снизьте скорость и соблюдайте осторожность." } },
  // ПРЕДПИСЫВАЮЩИЕ (5)
  { id: 14, category: "Предписывающие", front: { signNumber: "4.1.1", signType: "mandatory-straight" }, back: { title: "Движение прямо", description: "Разрешается движение только прямо. Действует до ближайшего перекрёстка." } },
  { id: 15, category: "Предписывающие", front: { signNumber: "4.1.2", signType: "mandatory-right" }, back: { title: "Движение направо", description: "Разрешается движение только направо. Поворот налево и разворот запрещены." } },
  { id: 16, category: "Предписывающие", front: { signNumber: "4.2.1", signType: "mandatory-bypass-right" }, back: { title: "Объезд препятствия справа", description: "Направление объезда островка безопасности или препятствия — только справа." } },
  { id: 17, category: "Предписывающие", front: { signNumber: "4.3", signType: "mandatory-roundabout" }, back: { title: "Круговое движение", description: "Въезд на перекрёсток с круговым движением. Уступите дорогу ТС, движущимся по кольцу." } },
  { id: 18, category: "Предписывающие", front: { signNumber: "4.7", signType: "mandatory-minspeed", extra: { speed: 40 } }, back: { title: "Ограничение минимальной скорости", description: "Движение со скоростью не менее указанной (40 км/ч). Соблюдать обязательно." } },
  // ИНФОРМАЦИОННЫЕ (6)
  { id: 19, category: "Информационные", front: { signNumber: "5.1", signType: "info-highway" }, back: { title: "Автомагистраль", description: "Дорога, на которой запрещено движение тихоходных ТС. Действуют особые правила." } },
  { id: 20, category: "Информационные", front: { signNumber: "5.5", signType: "info-oneway" }, back: { title: "Одностороннее движение", description: "По дороге движение всех ТС осуществляется только в данном направлении." } },
  { id: 21, category: "Информационные", front: { signNumber: "5.19.1", signType: "info-crosswalk" }, back: { title: "Пешеходный переход", description: "Обозначает место перехода. Водитель обязан уступить дорогу пешеходам и велосипедистам." } },
  { id: 22, category: "Информационные", front: { signNumber: "5.21", signType: "info-residential" }, back: { title: "Жилая зона", description: "Территория, на которой скорость не более 20 км/ч, приоритет у пешеходов." } },
  { id: 23, category: "Информационные", front: { signNumber: "5.16", signType: "info-busstop" }, back: { title: "Место остановки автобуса", description: "Обозначает место остановки маршрутных ТС (автобусов, троллейбусов)." } },
  { id: 24, category: "Информационные", front: { signNumber: "5.33", signType: "info-schoolzone" }, back: { title: "Пеш��ходная зона", description: "Начало территории, на которой разрешено движение только пешеходов." } },
  // ПРИОРИТЕТА (4)
  { id: 25, category: "Приоритета", front: { signNumber: "2.1", signType: "priority-main" }, back: { title: "Главная дорога", description: "Дорога с правом преимущественного проезда нерегулируемых перекрёстков." } },
  { id: 26, category: "Приоритета", front: { signNumber: "2.4", signType: "priority-yield" }, back: { title: "Уступите дорогу", description: "Водитель должен уступить дорогу ТС, движущимся по пересекаемой (главной) дороге." } },
  { id: 27, category: "Приоритета", front: { signNumber: "2.5", signType: "priority-stop" }, back: { title: "Движение без остановки запрещено", description: "Запрещается проезд без остановки перед стоп-линией или краем пересекаемой дороги." } },
  { id: 28, category: "Приоритета", front: { signNumber: "2.2", signType: "priority-end-main" }, back: { title: "Конец главной дороги", description: "Указывает на конец главной дороги. После знака все дороги равнозначны." } },
  // ОСОБЫХ ПРЕДПИСАНИЙ (3)
  { id: 29, category: "Особых предписаний", front: { signNumber: "5.25", signType: "special-town" }, back: { title: "Начало населённого пункта", description: "Название и начало населённого пункта, где действуют требования ПДД для жилых зон." } },
  { id: 30, category: "Особых предписаний", front: { signNumber: "5.33", signType: "special-pedestrian-zone" }, back: { title: "Пешеходная зона", description: "Место начала территории, на которой разрешено движение только пешеходов." } },
  { id: 31, category: "Особых предписаний", front: { signNumber: "5.27", signType: "special-parking-zone" }, back: { title: "Зона с ограниченной стоянкой", description: "Место начала территории, на которой стоянка ограничена по времени или условиям." } },
  // СЕРВИСА (4)
  { id: 32, category: "Сервиса", front: { signNumber: "6.1", signType: "service-hospital" }, back: { title: "Больница", description: "Обозначает ближайшее медицинское учреждение — больницу или пункт первой помощи." } },
  { id: 33, category: "Сервиса", front: { signNumber: "6.3.1", signType: "service-gas" }, back: { title: "Автозаправочная станция", description: "АЗС для заправки топливом. Возможно наличие таблички с маркой топлива." } },
  { id: 34, category: "Сервиса", front: { signNumber: "6.4", signType: "service-parking" }, back: { title: "Место стоянки", description: "Место для стоянки транспортных средств. Может иметь таблички с условиями стоянки." } },
  { id: 35, category: "Сервиса", front: { signNumber: "6.22", signType: "service-emergency-exit" }, back: { title: "Аварийный выход", description: "Обозначает место аварийного выхода из тоннеля или иного закрытого пространства." } },
  // ГОРИЗОНТАЛЬНАЯ РАЗМЕТКА (4)
  { id: 36, category: "Горизонтальная разметка", front: { signNumber: "1.1", signType: "marking-solid" }, back: { title: "Сплошная линия", description: "Разделяет транспортные потоки противоположных направлений. Пересекать запрещено." } },
  { id: 37, category: "Горизонтальная разметка", front: { signNumber: "1.5", signType: "marking-dashed" }, back: { title: "Прерывистая линия", description: "Разделяет транспортные потоки. Разрешается пересекать с любой стороны при безопасности манёвра." } },
  { id: 38, category: "Горизонтальная разметка", front: { signNumber: "1.12", signType: "marking-stopline" }, back: { title: "Стоп-линия", description: "Место остановки при запрещающем сигнале светофора или знаке 2.5. Нельзя пересекать." } },
  { id: 39, category: "Горизонтальная разметка", front: { signNumber: "1.14.1", signType: "marking-crosswalk" }, back: { title: "Пешеходный переход (зебра)", description: "Обозначает нерегулируемый пешеходный переход. Водитель обязан уступить пешеходу." } },
  // ВЕРТИКАЛЬНАЯ РАЗМЕТКА (2)
  { id: 40, category: "Вертикальная разметка", front: { signNumber: "2.1", signType: "marking-vertical-stripe" }, back: { title: "Вертикальная разметка (столбик)", description: "Чередующиеся чёрные и белые полосы на столбиках обозначают элементы дороги." } },
  { id: 41, category: "Вертикальная разметка", front: { signNumber: "2.4", signType: "marking-vertical-barrier" }, back: { title: "Разметка на ограждениях", description: "Жёлтые и чёрные полосы на ограждениях обозначают опасные участки дорог." } },
  // СВЕТОФОР (3)
  { id: 42, category: "Светофор", front: { signNumber: "Красный", signType: "light-red" }, back: { title: "Красный сигнал светофора", description: "Запрещает движение. Все водители обязаны остановиться перед стоп-линией или перекрёстком." } },
  { id: 43, category: "Светофор", front: { signNumber: "Жёлтый", signType: "light-yellow" }, back: { title: "Жёлтый сигнал светофора", description: "Запрещает движение. Исключение: если водитель не может безопасно остановиться без экстренного торможения." } },
  { id: 44, category: "Светофор", front: { signNumber: "Зелёный", signType: "light-green" }, back: { title: "Зелёный сигнал светофора", description: "Разрешает движение. Водители из других направлений обязаны уступить дорогу." } },
  // РЕГУЛИРОВЩИК (3)
  { id: 45, category: "Регулировщик", front: { signNumber: "Стоп", signType: "regulator-stop" }, back: { title: "Регулировщик: стоп всем", description: "Руки вытянуты в стороны или опущены — движение запрещено со всех сторон перекрёстка." } },
  { id: 46, category: "Регулировщик", front: { signNumber: "Движение", signType: "regulator-go" }, back: { title: "Регулировщик: движение разрешено", description: "Регулировщик повернулся боком — движение разрешено в направлении его правого бока." } },
  { id: 47, category: "Регулировщик", front: { signNumber: "Поворот", signType: "regulator-turn" }, back: { title: "Регулировщик: разрешён поворот", description: "Регулировщик жестом разрешает поворот. Внимательно следите за его сигналами." } },
];

// ─── Category & group config ─────────────────────────────────────────────────

const CATEGORIES = [
  { name: "Запрещающие",        icon: "🚫", group: "Дорожные знаки" },
  { name: "Предупреждающие",    icon: "⚠️", group: "Дорожные знаки" },
  { name: "Предписывающие",     icon: "🔵", group: "Дорожные знаки" },
  { name: "Информационные",     icon: "ℹ️", group: "Дорожные знаки" },
  { name: "Приоритета",         icon: "⭐", group: "Дорожные знаки" },
  { name: "Особых предписаний", icon: "📋", group: "Дорожные знаки" },
  { name: "Сервиса",            icon: "🏥", group: "Дорожные знаки" },
  { name: "Горизонтальная разметка", icon: "➖", group: "Дорожная разметка" },
  { name: "Вертикальная разметка",   icon: "📏", group: "Дорожная разметка" },
  { name: "Светофор",    icon: "🚦", group: "Светофор и регулировщик" },
  { name: "Регулировщик", icon: "👮", group: "Светофор и регулировщик" },
];

const GROUPS = ["Дорожные знаки", "Дорожная разметка", "Светофор и регулировщик"];

// ─── Card border styles by status ────────────────────────────────────────────

const statusRing: Record<string, string> = {
  know:   "ring-2 ring-green-400",
  hard:   "ring-2 ring-orange-400",
  forgot: "ring-2 ring-red-400",
};

// ─── Single flip card ─────────────────────────────────────────────────────────

interface CardItemProps {
  card: FlashCard;
  isFlipped: boolean;
  status: CardStatus;
  onFlip: () => void;
  onStatus: (s: CardStatus) => void;
  onExpand: () => void;
}

const CardItem = ({ card, isFlipped, status, onFlip, onStatus, onExpand }: CardItemProps) => {
  const ring = status ? statusRing[status] : "ring-1 ring-slate-200";

  const backGradient =
    status === "know"   ? "from-green-600 to-green-800"   :
    status === "hard"   ? "from-orange-500 to-orange-700" :
    status === "forgot" ? "from-red-600 to-red-800"       :
    "from-blue-600 to-blue-800";

  return (
    <div
      className={`relative h-[320px] cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-shadow ${ring}`}
      style={{ perspective: "1000px" }}
      onClick={onFlip}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.52, type: "spring", stiffness: 260, damping: 22 }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* ── FRONT ─────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-2xl bg-white flex flex-col p-3"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top row */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider leading-none">
              {card.category}
            </span>
            {status && (
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-none ${
                status === "know"   ? "bg-green-100 text-green-700" :
                status === "hard"   ? "bg-orange-100 text-orange-700" :
                "bg-red-100 text-red-700"
              }`}>
                {status === "know" ? "Знаю" : status === "hard" ? "Сложно" : "Забыл"}
              </span>
            )}
          </div>

          {/* Sign image */}
          <div className="flex-1 flex items-center justify-center py-1">
            <div className="w-24 h-24">
              <SignSVG type={card.front.signType} extra={card.front.extra} />
            </div>
          </div>

          {/* Sign number + hint */}
          <div className="text-center mb-2">
            <p className="font-bold text-slate-800">{card.front.signNumber}</p>
            <p className="text-[9px] text-slate-400 mt-0.5">нажмите, чтобы перевернуть</p>
          </div>

          {/* ── Status buttons on FRONT (no bg change on select) ── */}
          <div className="flex gap-1" onClick={e => e.stopPropagation()}>
            <button
              className={`flex-1 py-1.5 rounded-xl border text-[11px] font-medium bg-white transition-all duration-150 flex items-center justify-center gap-0.5 ${
                status === "forgot" ? "border-red-400 text-red-600" : "border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500"
              }`}
              onClick={() => onStatus(status === "forgot" ? null : "forgot")}
            >
              <RotateCcw className="h-3 w-3" /> Забыл
            </button>
            <button
              className={`flex-1 py-1.5 rounded-xl border text-[11px] font-medium bg-white transition-all duration-150 flex items-center justify-center gap-0.5 ${
                status === "hard" ? "border-orange-400 text-orange-600" : "border-slate-200 text-slate-400 hover:border-orange-200 hover:text-orange-500"
              }`}
              onClick={() => onStatus(status === "hard" ? null : "hard")}
            >
              <HelpCircle className="h-3 w-3" /> Сложно
            </button>
            <button
              className={`flex-1 py-1.5 rounded-xl border text-[11px] font-medium bg-white transition-all duration-150 flex items-center justify-center gap-0.5 ${
                status === "know" ? "border-green-400 text-green-600" : "border-slate-200 text-slate-400 hover:border-green-200 hover:text-green-600"
              }`}
              onClick={() => onStatus(status === "know" ? null : "know")}
            >
              <Check className="h-3 w-3" /> Знаю
            </button>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────────────────── */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${backGradient} flex flex-col p-4`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-full">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-white font-bold text-sm leading-tight">{card.back.title}</h3>
            <p className="text-white/80 text-[11px] leading-relaxed">{card.back.description}</p>
          </div>

          {/* Expand icon only — absolute bottom-right */}
          <button
            onClick={e => { e.stopPropagation(); onExpand(); }}
            className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/20 hover:bg-white/35 transition-all text-white"
            title="Увеличить"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Expanded card modal ──────────────────────────────────────────────────────

interface ExpandedCardModalProps {
  card: FlashCard;
  status: CardStatus;
  onClose: () => void;
  onStatus: (s: CardStatus) => void;
}

const ExpandedCardModal = ({ card, status, onClose, onStatus }: ExpandedCardModalProps) => {
  const backGradient =
    status === "know"   ? "from-green-600 to-green-800"   :
    status === "hard"   ? "from-orange-500 to-orange-700" :
    status === "forgot" ? "from-red-600 to-red-800"       :
    "from-blue-600 to-blue-800";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 28 }}
        className="w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Back side only — enlarged */}
        <div className={`bg-gradient-to-br ${backGradient} px-8 pt-8 pb-6 flex flex-col items-center text-center relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/35 transition-colors"
          >
            <X className="h-4 w-4 text-white" />
          </button>
          <p className="text-white/55 text-[10px] uppercase tracking-widest mb-4">
            {card.category} · {card.front.signNumber}
          </p>
          <div className="p-4 bg-white/20 rounded-2xl mb-5">
            <BrainCircuit className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-white font-bold text-2xl leading-tight mb-4">{card.back.title}</h3>
          <p className="text-white/85 text-sm leading-relaxed">{card.back.description}</p>
        </div>

        {/* Status buttons — same no-bg style */}
        <div className="bg-white px-5 py-4 flex gap-2">
          {([
            { key: "forgot" as const, label: "Забыл",  Icon: RotateCcw,  sel: "border-red-400 text-red-600",    def: "border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-500" },
            { key: "hard"   as const, label: "Сложно", Icon: HelpCircle, sel: "border-orange-400 text-orange-600", def: "border-slate-200 text-slate-400 hover:border-orange-300 hover:text-orange-500" },
            { key: "know"   as const, label: "Знаю",   Icon: Check,      sel: "border-green-400 text-green-600",  def: "border-slate-200 text-slate-400 hover:border-green-300 hover:text-green-600" },
          ]).map(({ key, label, Icon, sel, def }) => (
            <button
              key={key}
              onClick={() => onStatus(status === key ? null : key)}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-medium bg-white transition-all flex items-center justify-center gap-1.5 ${status === key ? sel : def}`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

export const FlashcardsPage = ({ onNavigate }: FlashcardsPageProps) => {
  const [activeCategory, setActiveCategory]   = useState<string | null>(null);
  const [activeGroup, setActiveGroup]         = useState<string | null>(null);
  const [statusFilter, setStatusFilter]       = useState<StatusFilter>("all");
  const [flippedCardId, setFlippedCardId]     = useState<number | null>(null);
  const [cardStatuses, setCardStatuses]       = useState<Record<number, CardStatus>>({});
  const [visibleCount, setVisibleCount]       = useState(10);
  const [expandedCard, setExpandedCard]       = useState<FlashCard | null>(null);
  const [viewedCardIds, setViewedCardIds]     = useState<Set<number>>(new Set());
  const [showCategories, setShowCategories]   = useState(true);
  const [showHintsPopup, setShowHintsPopup]   = useState(false);
  const hintsRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-flip back after 30 seconds
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (flippedCardId !== null) {
      timerRef.current = setTimeout(() => setFlippedCardId(null), 30000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [flippedCardId]);

  // When category changes — reset pagination and close open card
  const handleCategoryChange = (cat: string | null) => {
    setActiveCategory(cat);
    setVisibleCount(10);
    setFlippedCardId(null);
  };

  // Group change — reset category to "all"
  const handleGroupChange = (group: string | null) => {
    setActiveGroup(group);
    setActiveCategory(null);
    setVisibleCount(10);
    setFlippedCardId(null);
  };

  // Flip: only one card at a time; clicking flipped card closes it; track viewed
  const handleFlip = (id: number) => {
    setFlippedCardId(prev => {
      if (prev !== id) {
        setViewedCardIds(v => new Set(v).add(id));
      }
      return prev === id ? null : id;
    });
  };

  const handleStatus = (id: number, s: CardStatus) => {
    setCardStatuses(prev => ({ ...prev, [id]: s }));
  };

  // Filtered categories for the selected group
  const categoriesInGroup = activeGroup
    ? CATEGORIES.filter(c => c.group === activeGroup)
    : CATEGORIES;

  // Group-scoped cards (must be before filteredCards)
  const groupScopedCards = useMemo(() =>
    activeGroup
      ? ALL_CARDS.filter(c => CATEGORIES.find(cat => cat.name === c.category)?.group === activeGroup)
      : ALL_CARDS,
    [activeGroup]
  );

  // Filter cards
  const filteredCards = useMemo(() => {
    let cards = activeCategory
      ? ALL_CARDS.filter(c => c.category === activeCategory)
      : groupScopedCards;
    if (statusFilter !== "all") {
      cards = cards.filter(c => cardStatuses[c.id] === statusFilter);
    }
    return cards;
  }, [activeCategory, statusFilter, cardStatuses, groupScopedCards]);

  const visibleCards = filteredCards.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCards.length;

  // Global stats (across ALL cards)
  const allStatuses  = Object.values(cardStatuses);
  const knowCount    = allStatuses.filter(s => s === "know").length;
  const hardCount    = allStatuses.filter(s => s === "hard").length;
  const forgotCount  = allStatuses.filter(s => s === "forgot").length;
  const studiedCount = knowCount + hardCount + forgotCount;

  const catTotal = (name: string) => ALL_CARDS.filter(c => c.category === name).length;
  const catKnow  = (name: string) => ALL_CARDS.filter(c => c.category === name && cardStatuses[c.id] === "know").length;
  const activeCatTotal = activeCategory ? catTotal(activeCategory) : groupScopedCards.length;
  const activeCatKnow  = activeCategory ? catKnow(activeCategory) : groupScopedCards.filter(c => cardStatuses[c.id] === "know").length;

  const groupByStatus = (s: CardStatus) => groupScopedCards.filter(c => cardStatuses[c.id] === s).length;
  const groupTotal = groupScopedCards.length;

  return (
    <div className="min-h-screen bg-slate-50/60">

      {/* ── Sticky header ──────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => onNavigate("learn")} className="gap-1.5 text-slate-600 hover:text-slate-900 px-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Назад</span>
              </Button>
              <div className="h-5 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <h1 className="font-bold text-slate-800 hidden sm:block">Умные карточки</h1>
              </div>
            </div>

            {/* Right side: stats + progress + viewed + ? + badge */}
            <div className="flex items-center gap-2 text-xs">

              {/* Numbers only (point 8) */}
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-1.5">
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />{knowCount}
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-orange-500 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />{hardCount}
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-red-500 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />{forgotCount}
                </span>
              </div>

              {/* Green progress bar — % Знаю (point 6) */}
              <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-1.5">
                <div className="w-14 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((knowCount / ALL_CARDS.length) * 100)}%` }}
                  />
                </div>
                <span className="text-green-600 font-semibold">{Math.round((knowCount / ALL_CARDS.length) * 100)}%</span>
              </div>

              {/* Просмотрено X / 47 (point 9, replaces old badge text) */}
              <div className="hidden sm:flex items-center gap-1 text-slate-500 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-1.5">
                <span>просм.</span>
                <span className="font-semibold text-slate-700">{viewedCardIds.size}<span className="text-slate-400 font-normal">/{ALL_CARDS.length}</span></span>
              </div>

              {/* ? hints icon (point 7) */}
              <div className="relative" ref={hintsRef}>
                <button
                  onClick={() => setShowHintsPopup(v => !v)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center text-slate-500 font-semibold text-xs transition-colors"
                >
                  ?
                </button>
                {showHintsPopup && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-30">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs font-semibold text-slate-700">Подсказки</p>
                      <button onClick={() => setShowHintsPopup(false)}>
                        <X className="h-3.5 w-3.5 text-slate-400" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-2"><span className="text-base">↩</span> Нажмите на карточку — перевернёт</span>
                      <span className="flex items-center gap-2"><span className="text-base">⏱</span> Через 30 сек — вернётся автоматически</span>
                      <span className="flex items-center gap-2"><span className="text-base">🔍</span> Иконка на обороте — увеличить вид</span>
                      <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-green-400 inline-block shrink-0" /> Знаю — зелёная рамка</span>
                      <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-orange-400 inline-block shrink-0" /> Сложно — оранжевая рамка</span>
                      <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-400 inline-block shrink-0" /> Забыл — красная рамка</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-5">

        {/* ── Filter panel ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 mb-4">

          {/* Row 1: Groups + Status in one line (points 2 & 10) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {/* Groups */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">Группа:</span>
              {([null, ...GROUPS] as const).map((g, i) => (
                <button
                  key={i}
                  onClick={() => handleGroupChange(g as string | null)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    activeGroup === g
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {g === null ? "Все" : g === "Дорожные знаки" ? "Знаки" : g === "Дорожная разметка" ? "Разметка" : "Светофор"}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-slate-200 hidden sm:block" />

            {/* Status filter — counts from current group (point 3) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">Статус:</span>
              {([
                { key: "all",    label: "Все",    count: groupTotal,            color: "bg-slate-800 text-white border-slate-800",          inactive: "bg-slate-50 text-slate-600 border-slate-200" },
                { key: "know",   label: "Знаю",   count: groupByStatus("know"),   color: "bg-green-600 text-white border-green-600",   inactive: "bg-green-50 text-green-700 border-green-200" },
                { key: "hard",   label: "Сложно", count: groupByStatus("hard"),   color: "bg-orange-500 text-white border-orange-500", inactive: "bg-orange-50 text-orange-700 border-orange-200" },
                { key: "forgot", label: "Забыл",  count: groupByStatus("forgot"), color: "bg-red-600 text-white border-red-600",        inactive: "bg-red-50 text-red-700 border-red-200" },
              ] as const).map(({ key, label, count, color, inactive }) => (
                <button
                  key={key}
                  onClick={() => { setStatusFilter(key); setVisibleCount(10); setFlippedCardId(null); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                    statusFilter === key ? color : `${inactive} hover:opacity-80`
                  }`}
                >
                  {key === "know"   && <Check className="h-3 w-3" />}
                  {key === "hard"   && <HelpCircle className="h-3 w-3" />}
                  {key === "forgot" && <RotateCcw className="h-3 w-3" />}
                  {label}
                  <span className={`text-[10px] px-1 rounded-full leading-none font-normal ${
                    statusFilter === key ? "bg-white/25" : "opacity-60"
                  }`}>{count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 mt-3 mb-3" />

          {/* Collapsible categories list (points 2 & 7) */}
          <div>
            <button
              onClick={() => setShowCategories(v => !v)}
              className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors w-full"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showCategories ? "rotate-180" : ""}`} />
              <span>Категории</span>
              <span className="text-slate-400 font-normal">· {activeCategory}</span>
              <span className="ml-auto text-[10px] text-slate-400">{showCategories ? "скрыть" : "показать"}</span>
            </button>

            {showCategories && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 mt-2.5">
                {/* "Все" category button */}
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-medium transition-all text-left ${
                    activeCategory === null
                      ? "bg-slate-800 text-white border-slate-800 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm shrink-0">📂</span>
                  <span className="flex-1 leading-tight">Все</span>
                  <span className={`text-[10px] shrink-0 ${activeCategory === null ? "text-white/70" : "text-slate-400"}`}>
                    {groupScopedCards.filter(c => cardStatuses[c.id] === "know").length}/{groupScopedCards.length}
                  </span>
                </button>
                {categoriesInGroup.map(cat => {
                  const total = catTotal(cat.name);
                  const know  = catKnow(cat.name);
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-medium transition-all text-left ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-sm shrink-0">{cat.icon}</span>
                      <span className="flex-1 leading-tight">{cat.name}</span>
                      <span className={`text-[10px] shrink-0 ${isActive ? "text-white/70" : "text-slate-400"}`}>
                        {know}/{total}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Category title bar ────────────────────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{activeCategory ? CATEGORIES.find(c => c.name === activeCategory)?.icon : "📂"}</span>
            <div>
              <h2 className="font-bold text-slate-800 text-sm">{activeCategory ?? "Все карточки"}</h2>
              <p className="text-[11px] text-slate-500">
                {statusFilter !== "all" && (
                  <span className={`mr-1 font-medium ${
                    statusFilter === "know" ? "text-green-600" :
                    statusFilter === "hard" ? "text-orange-600" : "text-red-600"
                  }`}>фильтр ·</span>
                )}
                {filteredCards.length} карточек · показано {Math.min(visibleCount, filteredCards.length)}
              </p>
            </div>
          </div>
          {activeCatKnow > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${Math.round((activeCatKnow / activeCatTotal) * 100)}%` }}
                />
              </div>
              <span className="text-[11px] text-green-600 font-medium">
                {Math.round((activeCatKnow / activeCatTotal) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* ── Card grid ─────────────────────────────────────────── */}
        {filteredCards.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-slate-400" />
            </div>
            <p className="font-medium text-slate-600">Нет карточек с таким статусом</p>
            <p className="text-xs text-slate-400 mt-1">Измените фильтр или изучите карточки этой категории</p>
            <button
              onClick={() => setStatusFilter("all")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Показать все
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-5">
              {visibleCards.map(card => (
                <CardItem
                  key={card.id}
                  card={card}
                  isFlipped={flippedCardId === card.id}
                  status={cardStatuses[card.id] ?? null}
                  onFlip={() => handleFlip(card.id)}
                  onStatus={s => handleStatus(card.id, s)}
                  onExpand={() => { setExpandedCard(card); setFlippedCardId(null); }}
                />
              ))}
            </div>

            {/* Show more */}
            {hasMore ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <button
                  onClick={() => setVisibleCount(v => v + 10)}
                  className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-medium hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all group"
                >
                  <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  Показать ещё
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    +{Math.min(10, filteredCards.length - visibleCount)}
                  </span>
                </button>
                <p className="text-xs text-slate-400">
                  {Math.min(visibleCount, filteredCards.length)} / {filteredCards.length}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-slate-600">Все карточки просмотрены</p>
                <p className="text-xs text-slate-400 mt-0.5">Знаю: {activeCatKnow} / {activeCatTotal}</p>
              </div>
            )}
          </>
        )}


      </div>

      {/* ── Expanded card modal ────────────────────────────────── */}
      {expandedCard && (
        <ExpandedCardModal
          card={expandedCard}
          status={cardStatuses[expandedCard.id] ?? null}
          onClose={() => setExpandedCard(null)}
          onStatus={s => handleStatus(expandedCard.id, s)}
        />
      )}
    </div>
  );
};
