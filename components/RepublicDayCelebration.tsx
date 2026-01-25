"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Confetti } from "./Confetti";

interface RepublicDayCelebrationProps {
  forceShow?: boolean;
}

const STORAGE_KEY = "republic-day-banner-dismissed-2026";

export function RepublicDayCelebration({ forceShow = false }: RepublicDayCelebrationProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const today = new Date();
    const isRepublicDay = today.getMonth() === 0 && today.getDate() === 26;

    if (forceShow || isRepublicDay) {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setShowBanner(true);
        setShowConfetti(true);

        // Auto-dismiss banner after 4 seconds
        const timer = setTimeout(() => {
          setShowBanner(false);
        }, 4000);

        return () => clearTimeout(timer);
      }
    }
  }, [forceShow]);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!isClient || (!showBanner && !showConfetti)) {
    return null;
  }

  return (
    <>
      {showConfetti && <Confetti duration={6000} particleCount={80} />}

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative z-[100] overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #E8985A 0%, #E8985A 33%, #F5F5F5 33%, #F5F5F5 66%, #5A9E5A 66%, #5A9E5A 100%)",
            }}
          >
            <div className="relative py-2.5 px-4 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 tracking-wide">
                  Happy 77th Republic Day!
                </h2>
                <p className="text-xs text-gray-700 hidden sm:block">
                  Jai Hind!
                </p>
              </div>

              <button
                onClick={handleDismiss}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
