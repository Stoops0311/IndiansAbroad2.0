"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Newspaper, Briefcase, BookOpen, MessageCircle, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
}

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
    href: "/careers",
    gradient: "from-green-500/20 to-green-600/10",
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    label: "Blog",
    href: "/blog",
    gradient: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: <MessageCircle className="h-8 w-8" />,
    label: "Talk To Counselor",
    href: "/contact",
    gradient: "from-orange-500/20 to-orange-600/10",
  },
]

export default function DesktopSidebar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth
      
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
                  key={item.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  style={{ height: '25%' }}
                >
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
    </>
  )
}