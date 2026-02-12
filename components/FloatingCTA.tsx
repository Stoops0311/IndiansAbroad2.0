"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

const WHATSAPP_NUMBER = "918454073913";

const quickActions = [
  { label: "Talk to Experts", message: "Hi! I'd like to talk to an immigration expert about working abroad." },
  { label: "Check Eligibility", message: "Hi! I want to check my eligibility for working/settling abroad." },
  { label: "Free Consultation", message: "Hi! I'd like to book a free consultation session." },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message.trim())}`;
    window.open(url, "_blank");
  };

  const handleQuickAction = (presetMessage: string) => {
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(presetMessage)}`;
    window.open(url, "_blank");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-4 md:bottom-24 md:right-8 z-50 w-[calc(100%-2rem)] md:w-[380px] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src="/Logo.png"
                  alt="Indians Abroad"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm">Indians Abroad</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span className="text-white/80 text-xs">Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="bg-[#ECE5DD] dark:bg-[#0B141A] px-4 py-5 min-h-[120px]">
              {/* Welcome Message Bubble */}
              <div className="relative max-w-[85%]">
                <div className="bg-white dark:bg-[#1F2C34] rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    Hi 👋 Looking to work or settle abroad? We can help you get started!
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1 block text-right">
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="bg-[#ECE5DD] dark:bg-[#0B141A] px-4 pb-3 flex gap-2 flex-wrap">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.message)}
                  className="px-3 py-1.5 bg-white dark:bg-[#1F2C34] border border-[#25D366] rounded-full text-xs text-[#075E54] dark:text-[#25D366] hover:bg-[#25D366]/10 transition-colors whitespace-nowrap"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="bg-[#F0F0F0] dark:bg-[#1A2028] px-3 py-2.5 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-white dark:bg-[#2A3942] rounded-full px-4 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 outline-none border-none"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#1DA851] disabled:opacity-40 disabled:hover:bg-[#25D366] flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1DA851] shadow-lg hover:shadow-xl flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close chat" : "Open WhatsApp chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <WhatsAppIcon className="h-7 w-7 text-white" />
        )}
      </motion.button>
    </>
  );
}
