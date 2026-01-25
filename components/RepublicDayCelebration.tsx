"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Confetti } from "./Confetti";

interface RepublicDayCelebrationProps {
  forceShow?: boolean; // For testing - bypass date check
}

const STORAGE_KEY = "republic-day-banner-dismissed-2026";

export function RepublicDayCelebration({ forceShow = false }: RepublicDayCelebrationProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if it's Republic Day (January 26)
    const today = new Date();
    const isRepublicDay = today.getMonth() === 0 && today.getDate() === 26;

    if (forceShow || isRepublicDay) {
      // Check if banner was dismissed
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setShowBanner(true);
        setShowConfetti(true);
      }
    }
  }, [forceShow]);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  // Don't render anything on server or if not Republic Day
  if (!isClient || (!showBanner && !showConfetti)) {
    return null;
  }

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && <Confetti duration={10000} particleCount={200} />}

      {/* Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative z-[100] overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #FF9933 0%, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%, #138808 100%)",
            }}
          >
            <div className="relative py-3 px-4 flex items-center justify-center">
              {/* Ashoka Chakra */}
              <div className="hidden sm:flex items-center mr-3">
                <svg
                  viewBox="0 0 100 100"
                  className="w-8 h-8"
                  style={{ color: "#000080" }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle cx="50" cy="50" r="8" fill="currentColor" />
                  {/* 24 spokes */}
                  {[...Array(24)].map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2="50"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      transform={`rotate(${i * 15} 50 50)`}
                    />
                  ))}
                </svg>
              </div>

              {/* Message */}
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-bold text-[#000080] tracking-wide">
                  Happy 76th Republic Day!
                </h2>
                <p className="text-sm text-[#000080]/80 font-medium hidden sm:block">
                  Jai Hind! Celebrating the spirit of our Constitution
                </p>
              </div>

              {/* Ashoka Chakra (right side) */}
              <div className="hidden sm:flex items-center ml-3">
                <svg
                  viewBox="0 0 100 100"
                  className="w-8 h-8"
                  style={{ color: "#000080" }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle cx="50" cy="50" r="8" fill="currentColor" />
                  {[...Array(24)].map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2="50"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      transform={`rotate(${i * 15} 50 50)`}
                    />
                  ))}
                </svg>
              </div>

              {/* Dismiss button */}
              <button
                onClick={handleDismiss}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-5 h-5 text-[#000080]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
