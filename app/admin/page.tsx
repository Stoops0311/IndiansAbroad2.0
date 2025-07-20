"use client";

import { useState, useEffect } from "react";
import AdminAuth from "@/components/AdminAuth";
import TestimonialManagement from "@/components/TestimonialManagement";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      <TestimonialManagement onLogout={handleLogout} />
    </div>
  );
}