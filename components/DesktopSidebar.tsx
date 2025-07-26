"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Newspaper, Briefcase, BookOpen, MessageCircle, ChevronLeft, X, Send } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href?: string
  gradient: string
  onClick?: () => void
}

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface ChatState {
  step: number
  userName: string
  userDetails: string
  userPhone: string
  userEmail: string
}


export default function DesktopSidebar() {
  const [isVisible, setIsVisible] = useState(false)
  const [cursorProximity, setCursorProximity] = useState(0) // 0-1 based on distance from right edge
  const [hasShownInitialPeek, setHasShownInitialPeek] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [chatState, setChatState] = useState<ChatState>({
    step: 0,
    userName: "",
    userDetails: "",
    userPhone: "",
    userEmail: ""
  })
  const [isTyping, setIsTyping] = useState(false)

  const sidebarItems: SidebarItem[] = [
    {
      icon: <Newspaper className="h-8 w-8" />,
      label: "News",
      href: "/news",
      gradient: "from-blue-500/20 to-blue-600/10",
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      label: "Careers",
      href: "/coming-soon",
      gradient: "from-green-500/20 to-green-600/10",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      label: "Blog",
      href: "/coming-soon",
      gradient: "from-purple-500/20 to-purple-600/10",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      label: "Talk To Counselor",
      gradient: "from-orange-500/20 to-orange-600/10",
      onClick: () => {
        setIsChatOpen(true)
        setIsVisible(false)
        if (chatMessages.length === 0) {
          startChat()
        }
      }
    },
  ]

  const startChat = () => {
    const welcomeMessage: ChatMessage = {
      id: "1",
      text: "Hey what's your name?",
      isBot: true,
      timestamp: new Date()
    }
    setChatMessages([welcomeMessage])
    setChatState({ step: 1, userName: "", userDetails: "", userPhone: "", userEmail: "" })
  }

  const addBotMessage = (text: string) => {
    setIsTyping(true)
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, newMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSendMessage = () => {
    if (!currentInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentInput,
      isBot: false,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])

    switch (chatState.step) {
      case 1:
        setChatState(prev => ({ ...prev, userName: currentInput, step: 2 }))
        addBotMessage(`It's nice to meet you ${currentInput}! Could you provide me some details about what exactly you need and how we can help?`)
        break
      case 2:
        setChatState(prev => ({ ...prev, userDetails: currentInput, step: 3 }))
        addBotMessage("Thanks for the info! Can you provide your phone number and email?")
        break
      case 3:
        setChatState(prev => ({ ...prev, userPhone: currentInput, step: 4 }))
        addBotMessage("Perfect! And your email address?")
        break
      case 4:
        setChatState(prev => ({ ...prev, userEmail: currentInput, step: 5 }))
        addBotMessage("Okay our team will be with you shortly!")
        break
    }

    setCurrentInput("")
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth
      const distanceFromRight = windowWidth - e.clientX
      
      // Calculate cursor proximity (0-1, where 1 is closest to edge)
      const proximityDistance = 200 // pixels from right edge
      const proximity = Math.max(0, Math.min(1, (proximityDistance - distanceFromRight) / proximityDistance))
      setCursorProximity(proximity)
      
      // Show sidebar when mouse is within 50px of right edge
      if (e.clientX >= windowWidth - 50) {
        setIsVisible(true)
      } else if (e.clientX < windowWidth - 320) {
        // Hide sidebar when mouse moves away from sidebar area
        setIsVisible(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setCursorProximity(0)
    }

    // Only add listeners on desktop
    if (window.innerWidth >= 1024) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Initial peek animation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && !hasShownInitialPeek) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setTimeout(() => {
          setIsVisible(false)
          setHasShownInitialPeek(true)
        }, 1000) // Show for 1 second
      }, 2000) // Start after 2 seconds

      return () => clearTimeout(timer)
    }
  }, [hasShownInitialPeek])

  // Don't render on mobile/tablet
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return null
  }

  return (
    <>
      {/* Trigger area - invisible element at right edge */}
      <div 
        className="fixed right-0 top-0 w-[50px] h-full z-40 hidden lg:block"
        onMouseEnter={() => setIsVisible(true)}
      />

      {/* Peek effect - subtle edge always visible */}
      {!isVisible && (
        <div 
          className="fixed right-0 top-4 bottom-4 w-1 z-30 hidden lg:block"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, oklch(0.39 0.09 305) 50%, transparent 100%)',
            opacity: 0.3 + (cursorProximity * 0.4) // Becomes more visible as cursor approaches
          }}
        />
      )}

      {/* Enhanced indicator when sidebar is not visible */}
      {!isVisible && (
        <div 
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block pointer-events-none transition-all duration-300"
          style={{
            opacity: 0.5 + (cursorProximity * 0.5), // More visible as cursor approaches
            transform: `translateY(-50%) translateX(${cursorProximity * -10}px)` // Subtle movement toward cursor
          }}
        >
          <div className="relative">
            {/* Pulsing background */}
            <div className="absolute inset-0 animate-pulse">
              <div 
                className="w-12 h-12 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.39 0.09 305) 0%, oklch(0.48 0.11 305) 100%)',
                  opacity: 0.3 + (cursorProximity * 0.5)
                }}
              />
            </div>
            
            {/* Main circle */}
            <div 
              className="relative w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, oklch(0.39 0.09 305) 0%, oklch(0.48 0.11 305) 100%)',
                opacity: 0.4 + (cursorProximity * 0.6)
              }}
            >
              {/* Arrow pointing left */}
              <svg 
                className="w-5 h-5 text-white transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{
                  opacity: 0.8 + (cursorProximity * 0.2),
                  transform: `translateX(${cursorProximity * -2}px)` // Slight movement
                }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </div>

            {/* Outer glow ring */}
            <div 
              className="absolute inset-0 w-12 h-12 rounded-full animate-ping"
              style={{
                background: 'linear-gradient(135deg, oklch(0.39 0.09 305) 0%, oklch(0.48 0.11 305) 100%)',
                opacity: 0.2 + (cursorProximity * 0.4)
              }}
            />

            {/* Proximity text hint */}
            {cursorProximity > 0.3 && (
              <div 
                className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 whitespace-nowrap text-sm font-medium transition-all duration-300"
                style={{
                  color: 'oklch(0.39 0.09 305)',
                  opacity: Math.min(1, (cursorProximity - 0.3) * 1.4) // Fade in earlier and reach full opacity
                }}
              >
                Quick Menu →
              </div>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.95 }}
            transition={{ 
              type: "spring",
              damping: 30,
              stiffness: 300,
              duration: 0.4
            }}
            className="fixed right-4 top-4 bottom-4 w-[100px] rounded-2xl shadow-2xl z-50 hidden lg:flex flex-col overflow-hidden"
            onMouseLeave={() => setIsVisible(false)}
            style={{
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            {/* Light mode solid background - shows purple */}
            <div className="absolute inset-0 dark:hidden rounded-2xl"
              style={{
                background: 'lab(27.9275% 20.3486 -26.5494)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            />
            
            {/* Dark mode glass background - only visible in dark mode */}
            <div 
              className="absolute inset-0 rounded-2xl hidden dark:block bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(32px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            />
            
            {/* Glass overlay for dark mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl hidden dark:block" />

            {/* Button container - full height */}
            <div className="flex flex-col h-full">
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={`sidebar-${index}-${item.label}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  style={{ height: '25%' }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsVisible(false)}
                      className="group flex flex-col items-center justify-center w-full h-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
                    >
                      {/* Hover background effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      
                      {/* Icon */}
                      <div className="relative z-10 mb-2 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white dark:text-primary group-hover:text-white transition-colors duration-300">
                          {item.icon}
                        </span>
                      </div>
                      
                      {/* Label */}
                      <div className="relative z-10 text-center">
                        <span className="font-bold text-white dark:text-foreground/90 group-hover:text-white transition-colors duration-300 text-sm leading-tight">
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/20 to-transparent blur-sm" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setIsVisible(false)
                        item.onClick?.()
                      }}
                      className="group flex flex-col items-center justify-center w-full h-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
                    >
                      {/* Hover background effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      
                      {/* Icon */}
                      <div className="relative z-10 mb-2 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white dark:text-primary group-hover:text-white transition-colors duration-300">
                          {item.icon}
                        </span>
                      </div>
                      
                      {/* Label */}
                      <div className="relative z-10 text-center">
                        <span className="font-bold text-white dark:text-foreground/90 group-hover:text-white transition-colors duration-300 text-sm leading-tight">
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/20 to-transparent blur-sm" />
                    </button>
                  )}
                  
                  {/* Separator line - show for all except last item */}
                  {index < sidebarItems.length - 1 && (
                    <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent z-20" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Top and bottom subtle glows */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-md h-[600px] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="font-semibold">Counselor Chat</DialogTitle>
                <p className="text-sm text-muted-foreground">Online now</p>
              </div>
            </div>
          </DialogHeader>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-[400px] space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-muted">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full animate-bounce bg-muted-foreground" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce bg-muted-foreground" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce bg-muted-foreground" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          {chatState.step < 5 && (
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentInput.trim() || isTyping}
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}