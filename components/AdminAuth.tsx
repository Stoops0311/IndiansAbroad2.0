"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";

interface AdminAuthProps {
  onAuthenticate: () => void;
  isAuthenticated: boolean;
}

export default function AdminAuth({ onAuthenticate, isAuthenticated }: AdminAuthProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple password check
    if (password === "armesh2007") {
      // Store authentication in sessionStorage for this session
      sessionStorage.setItem("admin_authenticated", "true");
      onAuthenticate();
    } else {
      setError("Invalid password");
    }
    
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border-primary/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-white/70">Enter password to access testimonial management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-white/5 border-primary/20 text-white placeholder:text-white/50 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded p-2">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            {isLoading ? "Verifying..." : "Access Admin Dashboard"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-white/50">
            Authorized personnel only
          </p>
        </div>
      </Card>
    </div>
  );
}