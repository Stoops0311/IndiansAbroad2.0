"use client"

import type * as React from "react"
import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Users, Briefcase, Globe, Trophy, CheckCircle, Phone, Menu, X, MoreHorizontal, ChevronDown, Search, GraduationCap, BookOpen } from "lucide-react"
import Link from "next/link"
import { servicesData, type ServiceData } from "@/lib/services-data"
import ServiceDetailModal from "@/components/ServiceDetailModal"
import StudyAbroadModal from "@/components/StudyAbroadModal"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  iconColor: string
  hasDropdown?: boolean
}

const serviceIconMap = {
  search: Search,
  home: Home,
  globe: Globe,
  briefcase: Briefcase,
  users: Users,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen
};

const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    href: "/",
    gradient: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)",
    iconColor: "text-primary",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "About Us",
    href: "/about",
    gradient: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)",
    iconColor: "text-primary",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    label: "Services",
    href: "/services",
    gradient: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)",
    iconColor: "text-primary",
    hasDropdown: true,
  },
  {
    icon: <Globe className="h-5 w-5" />,
    label: "Work Abroad Destinations",
    href: "/destinations",
    gradient: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)",
    iconColor: "text-primary",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    label: "Success Stories",
    href: "/success-stories",
    gradient: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)",
    iconColor: "text-primary",
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    label: "Free Eligibility Check",
    href: "/eligibility",
    gradient: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)",
    iconColor: "text-primary",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Contact Us",
    href: "/contact",
    gradient: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)",
    iconColor: "text-primary",
  },
]


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showHamburger, setShowHamburger] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isStudyAbroadModalOpen, setIsStudyAbroadModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleServiceClick = (service: ServiceData) => {
    if (service.id === "study-abroad") {
      setIsStudyAbroadModalOpen(true)
    } else {
      setSelectedService(service)
      setIsServiceModalOpen(true)
    }
    setServicesDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  // Set mounted state for SSR safety
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useLayoutEffect(() => {
    const checkNavSpace = () => {
      if (navRef.current) {
        const nav = navRef.current
        const header = nav.closest('header')
        
        if (header) {
          // Get the actual scroll width vs client width to detect overflow
          const isOverflowing = nav.scrollWidth > nav.clientWidth
          
          // Also check if nav is being squeezed by header container
          const headerRect = header.getBoundingClientRect()
          const navRect = nav.getBoundingClientRect()
          
          // If nav right edge is close to or past header right edge, switch to hamburger
          const isNearEdge = navRect.right > headerRect.right - 20
          
          setShowHamburger(isOverflowing || isNearEdge)
        }
      }
    }

    // Use a timeout to ensure layout is complete
    const timeoutId = setTimeout(checkNavSpace, 0)
    
    window.addEventListener('resize', checkNavSpace)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkNavSpace)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <img 
              src="/logo-new.svg" 
              alt="Indians Abroad Logo" 
              className="h-[50px] w-[50px] md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px]"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl lg:text-3xl font-bold text-white leading-tight">INDIANS ABROAD</span>
              <span className="text-xs md:text-sm text-white/70 hidden sm:block">Empowering Dreams Worldwide</span>
            </div>
          </Link>

          {/* Navigation - Show full nav when space available, hamburger when cramped */}
          {!showHamburger ? (
            <nav ref={navRef} className="hidden lg:block p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative max-w-none">
              <ul className="flex items-center gap-3 relative z-10">
                {menuItems.map((item) => (
                  <li key={item.label} className="relative">
                    {item.hasDropdown ? (
                      <div ref={dropdownRef} className="relative z-50">
                        <div className="block rounded-xl overflow-visible group relative">
                          <button
                            onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                            className="flex items-center gap-2 px-2 py-2 relative z-10 bg-transparent text-white hover:text-white/90 hover:bg-primary/10 transition-all rounded-xl text-sm font-medium whitespace-nowrap"
                          >
                            <span className={`transition-colors duration-300 ${item.iconColor}`}>
                              {item.icon}
                            </span>
                            <span className="hidden xl:inline">{item.label}</span>
                            <span className="xl:hidden">{item.label.split(' ')[0]}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>

                        {/* Services Dropdown */}
                        <AnimatePresence>
                          {servicesDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-2 w-80 bg-background/95 backdrop-blur-lg border border-border/40 rounded-xl shadow-xl"
                              style={{ zIndex: 9999 }}
                            >
                              <div className="p-2">
                                <Link
                                  href="/services"
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-white hover:text-white/90 border-b border-border/20 mb-2"
                                  onClick={() => setServicesDropdownOpen(false)}
                                >
                                  <Briefcase className="h-5 w-5 text-primary" />
                                  <span className="font-medium">View All Services</span>
                                </Link>
                                
                                {servicesData.map((service) => {
                                  const IconComponent = serviceIconMap[service.icon as keyof typeof serviceIconMap];
                                  return (
                                    <button
                                      key={service.id}
                                      onClick={() => handleServiceClick(service)}
                                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left"
                                    >
                                      <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-white font-medium text-sm truncate">{service.title}</span>
                                          <span className="text-primary text-xs font-semibold">{service.price}</span>
                                        </div>
                                        <p className="text-white/70 text-xs mt-1 line-clamp-2">{service.summary}</p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="block rounded-xl overflow-visible group relative">
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 px-2 py-2 relative z-10 bg-transparent text-white hover:text-white/90 hover:bg-primary/10 transition-all rounded-xl text-sm font-medium whitespace-nowrap"
                        >
                          <span className={`transition-colors duration-300 ${item.iconColor}`}>
                            {item.icon}
                          </span>
                          <span className="hidden xl:inline">{item.label}</span>
                          <span className="xl:hidden">{item.label.split(' ')[0]}</span>
                        </Link>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            /* Hamburger Menu Button for desktop when cramped */
            <button 
              onClick={toggleMobileMenu}
              className="hidden lg:block p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <nav className="bg-background/90 backdrop-blur-lg border border-border/40 rounded-xl p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      {item.hasDropdown ? (
                        <div>
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-white hover:text-white/90"
                          >
                            <span className={`${item.iconColor}`}>
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </Link>
                          
                          <div className="ml-6 mt-2 space-y-1">
                            {servicesData.map((service) => {
                              const IconComponent = serviceIconMap[service.icon as keyof typeof serviceIconMap];
                              return (
                                <button
                                  key={service.id}
                                  onClick={() => handleServiceClick(service)}
                                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-colors text-left"
                                >
                                  <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-white font-medium text-sm">{service.title}</span>
                                      <span className="text-primary text-xs font-semibold">{service.price}</span>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-white hover:text-white/90"
                        >
                          <span className={`${item.iconColor}`}>
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Service Detail Modal - Rendered as Portal */}
      {isMounted && selectedService && createPortal(
        <ServiceDetailModal
          isOpen={isServiceModalOpen}
          onClose={() => setIsServiceModalOpen(false)}
          service={selectedService}
        />,
        document.body
      )}

      {/* Study Abroad Modal - Rendered as Portal */}
      {isMounted && createPortal(
        <StudyAbroadModal
          isOpen={isStudyAbroadModalOpen}
          onClose={() => setIsStudyAbroadModalOpen(false)}
        />,
        document.body
      )}
    </header>
  )
}