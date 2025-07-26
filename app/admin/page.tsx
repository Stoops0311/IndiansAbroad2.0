"use client";

import { useState, useEffect } from "react";
import AdminAuth from "@/components/AdminAuth";
import TestimonialManagement from "@/components/TestimonialManagement";
import NewsManagement from "@/components/NewsManagement";
import ScheduledArticlesManagement from "@/components/ScheduledArticlesManagement";
import { Button } from "@/components/ui/button";
import { MessageSquare, Newspaper } from "lucide-react";

type AdminSection = "testimonials" | "news";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>("testimonials");

  useEffect(() => {
    // Check if user is already authenticated in this session
    const isAuth = sessionStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(isAuth);
  }, []);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminAuth 
        onAuthenticate={handleAuthenticate} 
        isAuthenticated={isAuthenticated} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Header */}
      <div className="bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button
                variant={activeSection === "testimonials" ? "default" : "ghost"}
                onClick={() => setActiveSection("testimonials")}
                className="flex items-center gap-2 text-white"
              >
                <MessageSquare className="w-4 h-4" />
                Testimonials
              </Button>
              <Button
                variant={activeSection === "news" ? "default" : "ghost"}
                onClick={() => setActiveSection("news")}
                className="flex items-center gap-2 text-white"
              >
                <Newspaper className="w-4 h-4" />
                News & Articles
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeSection === "testimonials" && (
        <TestimonialManagement onLogout={handleLogout} />
      )}
      {activeSection === "news" && (
        <NewsManagement onLogout={handleLogout} />
      )}
    </div>
  );
}