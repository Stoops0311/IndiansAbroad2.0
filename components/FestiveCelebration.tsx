"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Confetti } from "./Confetti";

type Celebration = {
  id: string;
  eyebrow: string;
  title: string;
  message: string;
  colors: string[];
  accent: string;
};

const INDIA_TIME_ZONE = "Asia/Kolkata";

function ordinal(value: number) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  return `${value}${value % 10 === 1 ? "st" : value % 10 === 2 ? "nd" : value % 10 === 3 ? "rd" : "th"}`;
}

export function getCelebration(date = new Date()): Celebration | null {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: INDIA_TIME_ZONE,
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const number = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  const day = number("day");
  const month = number("month");
  const year = number("year");

  if (month === 1 && day === 1) {
    return {
      id: `new-year-${year}`,
      eyebrow: "A fresh chapter begins",
      title: `Happy New Year ${year}!`,
      message: "Here’s to bold dreams, new journeys and a world of possibilities.",
      colors: ["#f59e0b", "#7c3aed", "#22c55e", "#ffffff"],
      accent: "from-violet-700 via-fuchsia-600 to-amber-500",
    };
  }

  const nationalCelebrations: Record<string, Omit<Celebration, "id" | "title"> & { title: string }> = {
    "1-26": {
      eyebrow: "Celebrating India’s Constitution",
      title: `Happy ${ordinal(year - 1949)} Republic Day!`,
      message: "One nation, countless dreams. Celebrating the spirit that unites us all. Jai Hind!",
      colors: ["#ff9933", "#ffffff", "#138808", "#000080"],
      accent: "from-orange-500 via-white to-green-600",
    },
    "8-15": {
      eyebrow: "Celebrating freedom since 1947",
      title: `Happy ${ordinal(year - 1946)} Independence Day!`,
      message: "From India to every corner of the world, may our tricolour always fly high. Jai Hind!",
      colors: ["#ff9933", "#ffffff", "#138808", "#000080"],
      accent: "from-orange-500 via-white to-green-600",
    },
    "10-2": {
      eyebrow: "Truth • Peace • Non-violence",
      title: "Remembering Mahatma Gandhi",
      message: "Celebrating the courage to create change with compassion. Happy Gandhi Jayanti!",
      colors: ["#ff9933", "#ffffff", "#138808", "#000080"],
      accent: "from-orange-500 via-white to-green-600",
    },
  };
  const celebration = nationalCelebrations[`${month}-${day}`];
  return celebration ? { ...celebration, id: `${month}-${day}-${year}` } : null;
}

export function FestiveCelebration() {
  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setCelebration(getCelebration());
  }, []);

  if (!celebration) return null;

  return (
    <>
      <Confetti duration={9000} particleCount={110} colors={celebration.colors} />
      <AnimatePresence>
        {!dismissed && (
          <motion.aside
            initial={{ y: -24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -18, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="fixed left-3 right-3 top-20 z-[100] mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/50 bg-slate-950/95 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:top-24"
            role="status"
            aria-label={celebration.title}
          >
            <div className={`h-1.5 bg-gradient-to-r ${celebration.accent}`} />
            <div className="relative flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_30%,white_0,transparent_30%),radial-gradient(circle_at_85%_70%,#f59e0b_0,transparent_25%)]" />
              <div className="relative hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 sm:flex">
                <Sparkles className="h-6 w-6 text-amber-300" aria-hidden="true" />
              </div>
              <div className="relative min-w-0 flex-1 text-center sm:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300 sm:text-xs">
                  {celebration.eyebrow}
                </p>
                <h2 className="mt-0.5 text-lg font-bold tracking-tight sm:text-2xl">{celebration.title}</h2>
                <p className="mt-0.5 text-xs text-slate-200 sm:text-sm">{celebration.message}</p>
              </div>
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="relative shrink-0 rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Dismiss celebration"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
