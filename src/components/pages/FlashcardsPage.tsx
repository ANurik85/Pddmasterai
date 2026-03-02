import React, { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";
import {
  ArrowLeft, Check, RotateCcw, HelpCircle, ChevronDown,
  BrainCircuit, BookOpen, AlertTriangle, Info
} from "lucide-react";

interface FlashcardsPageProps {
  onNavigate: (page: string) => void;
}

type CardStatus = "know" | "hard" | "forgot" | null;

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

  const Info = ({ children }: { children: React.ReactNode }) => (
    <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="76" rx="7" fill="#1565C0" />
      {children}
    </svg>
  );

  switch (type) {
    // ── ЗАПРЕЩАЮЩИЕ ──────────────────────────────────────────────────────────
    case "prohibitory-bar":
      return <Prohibitory>
        <rect x="16" y="42" width="68" height="16" fill="#CC0000" rx="3" />
      </Prohibitory>;

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

    // ── ПРЕДУПРЕЖДАЮЩИЕ ───────────────────────────────────────────────────────
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

    // ── ПРЕДПИСЫВАЮЩИЕ ────────────────────────────────────────────────────────
    case "mandatory-straight":
      return <Mandatory>
        <polygon points="50,18 62,44 56,44 56,72 44,72 44,44 38,44" fill="white" />
      </Mandatory>;

    case "mandatory-right":
      return <Mandatory>
        <polygon points="20,56 50,56 50,70 76,44 50,18 50,32 20,32" fill="white" />
      </Mandatory>;

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

    // ── ИНФОРМАЦИОННО-УКАЗАТЕЛЬНЫЕ ────────────────────────────────────────────
    case "info-highway":
      return <Info>
        <path d="M20 62 L50 28 L80 62" fill="none" stroke="white" strokeWidth="4" strokeLinejoin="round" />
        <line x1="50" y1="28" x2="50" y2="62" stroke="white" strokeWidth="4" />
        <path d="M10 54 L50 18 L90 54" fill="none" stroke="white" strokeWidth="3" opacity="0.5" />
      </Info>;

    case "info-oneway":
      return <Info>
        <polygon points="18,46 60,46 60,30 84,40 60,50 60,34 18,34" fill="white" />
      </Info>;

    case "info-crosswalk":
      return <Info>
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={18 + i * 17} y="22" width="10" height="36" rx="1" fill="white" opacity={i % 2 === 0 ? 1 : 0.5} />
        ))}
        <circle cx="50" cy="67" r="5" fill="white" />
      </Info>;

    case "info-residential":
      return <Info>
        <rect x="28" y="38" width="44" height="28" rx="2" fill="white" />
        <polygon points="50,18 20,38 80,38" fill="white" />
        <rect x="42" y="50" width="16" height="16" rx="1" fill="#1565C0" />
        <circle cx="72" cy="55" r="6" fill="#FFCD00" />
      </Info>;

    case "info-busstop":
      return <Info>
        <text x="50" y="56" textAnchor="middle" fontSize="40" fill="white" fontFamily="Arial" fontWeight="bold">A</text>
      </Info>;

    case "info-schoolzone":
      return <Info>
        <circle cx="50" cy="32" r="8" fill="white" />
        <line x1="50" y1="40" x2="50" y2="58" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <line x1="36" y1="50" x2="64" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="50" y1="58" x2="40" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="50" y1="58" x2="60" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </Info>;

    // ── ПРИОРИТЕТА ────────────────────────────────────────────────────────────
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

    // ── ОСОБЫХ ПРЕДПИСАНИЙ ────────────────────────────────────────────────────
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

    // ── СЕРВИСА ───────────────────────────────────────────────────────────────
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

    // ── ГОРИЗОНТАЛЬНАЯ РАЗМЕТКА ───────────────────────────────────────────────
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

    // ── ВЕРТИКАЛЬНАЯ РАЗМЕТКА ─────────────────────────────────────────────────
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

    // ── СВЕТОФОР ──────────────────────────────────────────────────────────────
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

    // ── РЕГУЛИРОВЩИК ──────────────────────────────────────────────────────────
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
  // === ЗАПРЕЩАЮЩИЕ (8) ===
  { id: 1, category: "Запрещающие", front: { signNumber: "3.1", signType: "prohibitory-bar" }, back: { title: "Въезд запрещён", description: "Въезд всех транспортных средств в данном направлении запрещён. Знак называют «кирпич»." } },
  { id: 2, category: "Запрещающие", front: { signNumber: "3.2", signType: "prohibitory-cross" }, back: { title: "Движение запрещено", description: "Запрещается движение всех транспортных средств." } },
  { id: 3, category: "Запрещающие", front: { signNumber: "3.4", signType: "prohibitory-truck" }, back: { title: "Движение грузовых автомобилей запрещено", description: "Запрещается движение грузовых авто и составов с разрешённой максимальной массой более 3,5 т." } },
  { id: 4, category: "Запрещающие", front: { signNumber: "3.18.1", signType: "prohibitory-turn-right" }, back: { title: "Поворот направо запрещён", description: "Запрещается поворот направо на данном участке дороги." } },
  { id: 5, category: "Запрещающие", front: { signNumber: "3.20", signType: "prohibitory-overtake" }, back: { title: "Обгон запрещён", description: "Запрещается обгон всех ТС, кроме тихоходных, гужевых повозок, велосипедов и мопедов." } },
  { id: 6, category: "Запрещающие", front: { signNumber: "3.24", signType: "prohibitory-speed", extra: { speed: 60 } }, back: { title: "Ограничение максимальной скорости", description: "Запрещается движение со скоростью, превышающей указанную на знаке (60 км/ч)." } },
  { id: 7, category: "Запрещающие", front: { signNumber: "3.27", signType: "prohibitory-no-stop" }, back: { title: "Остановка запрещена", description: "Запрещаются остановка и стоянка транспортных средств." } },
  { id: 8, category: "Запрещающие", front: { signNumber: "3.28", signType: "prohibitory-no-parking" }, back: { title: "Стоянка запрещена", description: "Запрещается стоянка транспортных средств. Остановка допускается." } },

  // === ПРЕДУПРЕЖДАЮЩИЕ (5) ===
  { id: 9, category: "Предупреждающие", front: { signNumber: "1.1", signType: "warning-railway" }, back: { title: "Ж/д переезд со шлагбаумом", description: "Железнодорожный переезд, оборудованный шлагбаумом. Соблюдайте особую осторожность." } },
  { id: 10, category: "Предупреждающие", front: { signNumber: "1.11.1", signType: "warning-curve-right" }, back: { title: "Опасный поворот (правый)", description: "Кривая дорога с правым поворотом малого радиуса или с ограниченной видимостью." } },
  { id: 11, category: "Предупреждающие", front: { signNumber: "1.17", signType: "warning-bump" }, back: { title: "Искусственная неровность", description: "Участок дороги с искусственной неровностью для принудительного снижения скорости (лежачий полицейский)." } },
  { id: 12, category: "Предупреждающие", front: { signNumber: "1.22", signType: "warning-pedestrian" }, back: { title: "Пешеходный переход", description: "Нерегулируемый пешеходный переход. Водитель обязан уступить дорогу пешеходам." } },
  { id: 13, category: "Предупреждающие", front: { signNumber: "1.25", signType: "warning-roadwork" }, back: { title: "Дорожные работы", description: "На данном участке ведутся дорожные работы. Снизьте скорость и соблюдайте осторожность." } },

  // === ПРЕДПИСЫВАЮЩИЕ (5) ===
  { id: 14, category: "Предписывающие", front: { signNumber: "4.1.1", signType: "mandatory-straight" }, back: { title: "Движение прямо", description: "Разрешается движение только в прямом направлении. Действует до ближайшего перекрёстка." } },
  { id: 15, category: "Предписывающие", front: { signNumber: "4.1.2", signType: "mandatory-right" }, back: { title: "Движение направо", description: "Разрешается движение только в направлении вправо. Поворот налево и разворот запрещены." } },
  { id: 16, category: "Предписывающие", front: { signNumber: "4.2.1", signType: "mandatory-bypass-right" }, back: { title: "Объезд препятствия справа", description: "Направление объезда островка безопасности или препятствия — только справа." } },
  { id: 17, category: "Предписывающие", front: { signNumber: "4.3", signType: "mandatory-roundabout" }, back: { title: "Круговое движение", description: "Въезд на перекрёсток с круговым движением. Уступите дорогу ТС, движущимся по кольцу." } },
  { id: 18, category: "Предписывающие", front: { signNumber: "4.7", signType: "mandatory-minspeed", extra: { speed: 40 } }, back: { title: "Ограничение минимальной скорости", description: "Движение со скоростью не менее указанной (40 км/ч). Обязательно соблюдать на автомагистралях." } },

  // === ИНФОРМАЦИОННО-УКАЗАТЕЛЬНЫЕ (6) ===
  { id: 19, category: "Информационные", front: { signNumber: "5.1", signType: "info-highway" }, back: { title: "Автомагистраль", description: "Дорога, на которой запрещено движение тихоходных ТС, действуют особые правила движения." } },
  { id: 20, category: "Информационные", front: { signNumber: "5.5", signType: "info-oneway" }, back: { title: "Дорога с односторонним движением", description: "По дороге движение всех ТС осуществляется только в данном направлении." } },
  { id: 21, category: "Информационные", front: { signNumber: "5.19.1", signType: "info-crosswalk" }, back: { title: "Пешеходный переход", description: "Обозначает место перехода. Водитель обязан уступить дорогу пешеходам и велосипедистам." } },
  { id: 22, category: "Информационные", front: { signNumber: "5.21", signType: "info-residential" }, back: { title: "Жилая зона", description: "Территория, на которой скорость не более 20 км/ч, приоритет у пешеходов, стоянка по правилам зоны." } },
  { id: 23, category: "Информационные", front: { signNumber: "5.16", signType: "info-busstop" }, back: { title: "Место остановки автобуса", description: "Обозначает место остановки маршрутных ТС (автобусов, троллейбусов)." } },
  { id: 24, category: "Информационные", front: { signNumber: "5.33", signType: "info-schoolzone" }, back: { title: "Пешеходная зона", description: "Начало территории, на которой разрешено движение только пешеходов." } },

  // === ПРИОРИТЕТА (4) ===
  { id: 25, category: "Приоритета", front: { signNumber: "2.1", signType: "priority-main" }, back: { title: "Главная дорога", description: "Дорога, на которой предоставлено право преимущественного проезда нерегулируемых перекрёстков." } },
  { id: 26, category: "Приоритета", front: { signNumber: "2.4", signType: "priority-yield" }, back: { title: "Уступите дорогу", description: "Водитель должен уступить дорогу ТС, движущимся по пересекаемой (главной) дороге." } },
  { id: 27, category: "Приоритета", front: { signNumber: "2.5", signType: "priority-stop" }, back: { title: "Движение без остановки запрещено", description: "Запрещается проезд без остановки перед стоп-линией или перед краем пересекаемой дороги." } },
  { id: 28, category: "Приоритета", front: { signNumber: "2.2", signType: "priority-end-main" }, back: { title: "Конец главной дороги", description: "Указывает на конец главной дороги. После знака все дороги становятся равнозначными." } },

  // === ОСОБЫХ ПРЕДПИСАНИЙ (3) ===
  { id: 29, category: "Особых предписаний", front: { signNumber: "5.25", signType: "special-town" }, back: { title: "Начало населённого пункта", description: "Название и начало населённого пункта, в котором действуют требования ПДД для жилых зон." } },
  { id: 30, category: "Особых предписаний", front: { signNumber: "5.33", signType: "special-pedestrian-zone" }, back: { title: "Пешеходная зона", description: "Место начала территории, на которой разрешено движение только пешеходов." } },
  { id: 31, category: "Особых предписаний", front: { signNumber: "5.27", signType: "special-parking-zone" }, back: { title: "Зона с ограниченной стоянкой", description: "Место начала территории, на которой стоянка ограничена по времени или другим условиям." } },

  // === СЕРВИСА (4) ===
  { id: 32, category: "Сервиса", front: { signNumber: "6.1", signType: "service-hospital" }, back: { title: "Больница", description: "Обозначает ближайшее медицинское учреждение — больницу, поликлинику или пункт первой помощи." } },
  { id: 33, category: "Сервиса", front: { signNumber: "6.3.1", signType: "service-gas" }, back: { title: "Автозаправочная станция", description: "АЗС для заправки топливом. Возможно наличие дополнительной таблички с указанием марки топлива." } },
  { id: 34, category: "Сервиса", front: { signNumber: "6.4", signType: "service-parking" }, back: { title: "Место стоянки", description: "Место, предназначенное для стоянки транспортных средств. Может иметь таблички с условиями стоянки." } },
  { id: 35, category: "Сервиса", front: { signNumber: "6.22", signType: "service-emergency-exit" }, back: { title: "Аварийный выход", description: "Обозначает место аварийного выхода из тоннеля или иного закрытого пространства." } },

  // === ГОРИЗОНТАЛЬНАЯ РАЗМЕТКА (4) ===
  { id: 36, category: "Горизонтальная разметка", front: { signNumber: "1.1", signType: "marking-solid" }, back: { title: "Сплошная линия", description: "Разделяет транспортные потоки противоположных направлений. Пересекать запрещено." } },
  { id: 37, category: "Горизонтальная разметка", front: { signNumber: "1.5", signType: "marking-dashed" }, back: { title: "Прерывистая линия", description: "Разделяет транспортные потоки. Разрешается пересекать с любой стороны при безопасности манёвра." } },
  { id: 38, category: "Горизонтальная разметка", front: { signNumber: "1.12", signType: "marking-stopline" }, back: { title: "Стоп-линия", description: "Место остановки при запрещающем сигнале светофора или знаке 2.5. Нельзя её пересекать." } },
  { id: 39, category: "Горизонтальная разметка", front: { signNumber: "1.14.1", signType: "marking-crosswalk" }, back: { title: "Пешеходный переход (зебра)", description: "Обозначает нерегулируемый пешеходный переход. Водитель обязан уступить пешеходу." } },

  // === ВЕРТИКАЛЬНАЯ РАЗМЕТКА (2) ===
  { id: 40, category: "Вертикальная разметка", front: { signNumber: "2.1", signType: "marking-vertical-stripe" }, back: { title: "Вертикальная разметка на столбиках", description: "Чередующиеся чёрные и белые полосы на столбиках и опорах обозначают элементы дороги." } },
  { id: 41, category: "Вертикальная разметка", front: { signNumber: "2.4", signType: "marking-vertical-barrier" }, back: { title: "Разметка на ограждениях", description: "Жёлтые и чёрные чередующиеся полосы наносятся на ограждения на опасных участках дорог." } },

  // === СВЕТОФОР (3) ===
  { id: 42, category: "Светофор", front: { signNumber: "Красный", signType: "light-red" }, back: { title: "Красный сигнал светофора", description: "Запрещает движение. Все водители обязаны остановиться перед стоп-линией или перекрёстком." } },
  { id: 43, category: "Светофор", front: { signNumber: "Жёлтый", signType: "light-yellow" }, back: { title: "Жёлтый сигнал светофора", description: "Запрещает движение. Исключение: если водитель не может безопасно остановиться без экстренного торможения." } },
  { id: 44, category: "Светофор", front: { signNumber: "Зелёный", signType: "light-green" }, back: { title: "Зелёный сигнал светофора", description: "Разрешает движение. Водители из других направлений обязаны уступить дорогу." } },

  // === РЕГУЛИРОВЩИК (3) ===
  { id: 45, category: "Регулировщик", front: { signNumber: "Стоп", signType: "regulator-stop" }, back: { title: "Регулировщик: стоп всем", description: "Руки вытянуты в стороны или опущены — движение запрещено со всех сторон перекрёстка." } },
  { id: 46, category: "Регулировщик", front: { signNumber: "Движение", signType: "regulator-go" }, back: { title: "Регулировщик: движение разрешено", description: "Регулировщик повернулся боком — движение разрешено в направлении его правого бока и позади него." } },
  { id: 47, category: "Регулировщик", front: { signNumber: "Поворот", signType: "regulator-turn" }, back: { title: "Регулировщик: разрешён поворот", description: "Регулировщик жестом разрешает поворот. Необходимо внимательно следить за его сигналами." } },
];

// ─── Category config ─────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "Запрещающие", icon: "🚫", group: "Дорожные знаки" },
  { name: "Предупреждающие", icon: "⚠️", group: "Дорожные знаки" },
  { name: "Предписывающие", icon: "🔵", group: "Дорожные знаки" },
  { name: "Информационные", icon: "ℹ️", group: "Дорожные знаки" },
  { name: "Приоритета", icon: "⭐", group: "Дорожные знаки" },
  { name: "Особых предписаний", icon: "📋", group: "Дорожные знаки" },
  { name: "Сервиса", icon: "🏥", group: "Дорожные знаки" },
  { name: "Горизонтальная разметка", icon: "➖", group: "Дорожная разметка" },
  { name: "Вертикальная разметка", icon: "📏", group: "Дорожная разметка" },
  { name: "Светофор", icon: "🚦", group: "Светофор и регулировщик" },
  { name: "Регулировщик", icon: "👮", group: "Светофор и регулировщик" },
];

const GROUP_COLORS: Record<string, string> = {
  "Дорожные знаки": "bg-blue-50 text-blue-700 border-blue-200",
  "Дорожная разметка": "bg-purple-50 text-purple-700 border-purple-200",
  "Светофор и регулировщик": "bg-green-50 text-green-700 border-green-200",
};

// ─── Individual flip card ─────────────────────────────────────────────────────

const statusCardBorder: Record<string, string> = {
  know: "ring-2 ring-green-400",
  hard: "ring-2 ring-orange-400",
  forgot: "ring-2 ring-red-400",
};

const statusBackBg: Record<string, string> = {
  know: "from-green-600 to-green-800 border-green-400",
  hard: "from-orange-500 to-orange-700 border-orange-400",
  forgot: "from-red-600 to-red-800 border-red-400",
};

interface CardItemProps {
  card: FlashCard;
  isFlipped: boolean;
  status: CardStatus;
  onFlip: () => void;
  onStatus: (s: CardStatus) => void;
}

const CardItem = ({ card, isFlipped, status, onFlip, onStatus }: CardItemProps) => {
  const borderClass = status ? statusCardBorder[status] : "ring-1 ring-slate-200";
  const backBg = status ? statusBackBg[status] : "from-blue-600 to-blue-800 border-blue-400";

  return (
    <div className="flex flex-col gap-2">
      {/* Flip area */}
      <div
        className={`relative h-[280px] cursor-pointer rounded-2xl ${borderClass} shadow-sm hover:shadow-md transition-shadow`}
        style={{ perspective: "1000px" }}
        onClick={onFlip}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.55, type: "spring", stiffness: 260, damping: 22 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl bg-white p-4 flex flex-col"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{card.category}</span>
              {status && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  status === "know" ? "bg-green-100 text-green-700" :
                  status === "hard" ? "bg-orange-100 text-orange-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {status === "know" ? "Знаю" : status === "hard" ? "Сложно" : "Забыл"}
                </span>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center py-2">
              <div className="w-28 h-28">
                <SignSVG type={card.front.signType} extra={card.front.extra} />
              </div>
            </div>

            <div className="text-center">
              <p className="font-bold text-slate-800 text-base">{card.front.signNumber}</p>
              <p className="text-[10px] text-slate-400 mt-1">Нажмите, чтобы проверить себя</p>
            </div>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${backBg} border p-5 flex flex-col items-center justify-center`}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="p-2 bg-white/20 rounded-full mb-3">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-white font-bold text-center text-sm leading-tight mb-3">{card.back.title}</h3>
            <p className="text-white/85 text-xs text-center leading-relaxed">{card.back.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Status buttons */}
      <div className="flex gap-1.5">
        <button
          className={`flex-1 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
            status === "forgot"
              ? "bg-red-500 text-white border-red-500 shadow-sm"
              : "border-red-200 text-red-600 hover:bg-red-50 bg-white"
          }`}
          onClick={(e) => { e.stopPropagation(); onStatus(status === "forgot" ? null : "forgot"); }}
        >
          <span className="flex items-center justify-center gap-1">
            <RotateCcw className="h-3 w-3" /> Забыл
          </span>
        </button>
        <button
          className={`flex-1 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
            status === "hard"
              ? "bg-orange-500 text-white border-orange-500 shadow-sm"
              : "border-orange-200 text-orange-600 hover:bg-orange-50 bg-white"
          }`}
          onClick={(e) => { e.stopPropagation(); onStatus(status === "hard" ? null : "hard"); }}
        >
          <span className="flex items-center justify-center gap-1">
            <HelpCircle className="h-3 w-3" /> Сложно
          </span>
        </button>
        <button
          className={`flex-1 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
            status === "know"
              ? "bg-green-500 text-white border-green-500 shadow-sm"
              : "border-green-200 text-green-600 hover:bg-green-50 bg-white"
          }`}
          onClick={(e) => { e.stopPropagation(); onStatus(status === "know" ? null : "know"); }}
        >
          <span className="flex items-center justify-center gap-1">
            <Check className="h-3 w-3" /> Знаю
          </span>
        </button>
      </div>
    </div>
  );
};

// ─── Main page component ──────────────────────────────────────────────────────

export const FlashcardsPage = ({ onNavigate }: FlashcardsPageProps) => {
  const [activeCategory, setActiveCategory] = useState("Запрещающие");
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [cardStatuses, setCardStatuses] = useState<Record<number, CardStatus>>({});
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groups = ["Дорожные знаки", "Дорожная разметка", "Светофор и регулировщик"];

  const categoriesInGroup = activeGroup
    ? CATEGORIES.filter(c => c.group === activeGroup)
    : CATEGORIES;

  const filteredCards = useMemo(() => {
    return ALL_CARDS.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const visibleCards = filteredCards.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCards.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(10);
  };

  const handleFlip = (id: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleStatus = (id: number, status: CardStatus) => {
    setCardStatuses(prev => ({ ...prev, [id]: status }));
  };

  // Global stats
  const totalStatuses = Object.values(cardStatuses);
  const knowCount = totalStatuses.filter(s => s === "know").length;
  const hardCount = totalStatuses.filter(s => s === "hard").length;
  const forgotCount = totalStatuses.filter(s => s === "forgot").length;

  // Category card count
  const catCount = (name: string) => ALL_CARDS.filter(c => c.category === name).length;
  const catKnow = (name: string) =>
    ALL_CARDS.filter(c => c.category === name && cardStatuses[c.id] === "know").length;

  const currentCategoryInfo = CATEGORIES.find(c => c.name === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => onNavigate("learn")} className="gap-1.5 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="h-4 w-4" /> Назад
              </Button>
              <div className="h-5 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h1 className="font-bold text-slate-800 text-lg hidden sm:block">Умные карточки</h1>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
                  <span className="text-slate-600">{knowCount} знаю</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />
                  <span className="text-slate-600">{hardCount} сложно</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                  <span className="text-slate-600">{forgotCount} забыл</span>
                </span>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 border">
                {ALL_CARDS.length} карточек
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-6">
        {/* Group filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => { setActiveGroup(null); }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeGroup === null
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            Все группы
          </button>
          {groups.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(activeGroup === g ? null : g)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeGroup === g
                  ? "bg-slate-800 text-white border-slate-800"
                  : `${GROUP_COLORS[g]} hover:opacity-80`
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categoriesInGroup.map(cat => {
            const total = catCount(cat.name);
            const know = catKnow(cat.name);
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryChange(cat.name)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-normal ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {know > 0 ? `${know}/` : ""}{total}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active category info */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentCategoryInfo?.icon}</span>
            <div>
              <h2 className="font-bold text-slate-800 text-base">{activeCategory}</h2>
              <p className="text-xs text-slate-500">
                {filteredCards.length} карточек · показано {Math.min(visibleCount, filteredCards.length)}
              </p>
            </div>
          </div>
          {/* Progress bar */}
          {catKnow(activeCategory) > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${(catKnow(activeCategory) / catCount(activeCategory)) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-500">
                {Math.round((catKnow(activeCategory) / catCount(activeCategory)) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {visibleCards.map(card => (
            <CardItem
              key={card.id}
              card={card}
              isFlipped={flippedCards.has(card.id)}
              status={cardStatuses[card.id] ?? null}
              onFlip={() => handleFlip(card.id)}
              onStatus={(s) => handleStatus(card.id, s)}
            />
          ))}
        </div>

        {/* Show more / summary */}
        {hasMore ? (
          <div className="flex flex-col items-center gap-3 py-6">
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
              Показано {Math.min(visibleCount, filteredCards.length)} из {filteredCards.length} карточек
            </p>
          </div>
        ) : filteredCards.length > 0 ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="font-medium text-slate-700 text-sm">Все карточки категории просмотрены</p>
            <p className="text-xs text-slate-400 mt-1">
              Знаю: {catKnow(activeCategory)} / {catCount(activeCategory)}
            </p>
          </div>
        ) : null}

        {/* Legend */}
        <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">Как использовать:</p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px]">↩</div>
              <span>Нажмите на карточку, чтобы перевернуть</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-400" />
              <span>Знаю — карточка выделена зелёным</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-400" />
              <span>Сложно — карточка выделена оранжевым</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-400" />
              <span>Забыл — карточка выделена красным</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
