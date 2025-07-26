"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Add your authentication logic here
      // For now, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard or previous page
      router.push("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: resolvedTheme === 'dark' 
          ? 'linear-gradient(to bottom, #000000 0%, oklch(0.48 0.11 305) 100%)'
          : 'linear-gradient(to bottom, #ffffff 0%, oklch(0.39 0.09 305) 100%)'
      }}
    >
      <div className="w-full max-w-md">
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className={`inline-flex items-center gap-2 mb-6 transition-colors ${
            resolvedTheme === 'dark' 
              ? 'text-white/80 hover:text-white' 
              : 'text-black/80 hover:text-black'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className={`backdrop-blur-lg ${
          resolvedTheme === 'dark' 
            ? 'bg-white/10 border-white/20' 
            : 'bg-black/10 border-black/20'
        }`}>
          <CardHeader className="text-center">
            <CardTitle className={`text-2xl font-bold mb-2 ${
              resolvedTheme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Authorized Sign In
            </CardTitle>
            <p className={resolvedTheme === 'dark' ? 'text-white/80' : 'text-black/80'}>
              Access your Indians Abroad account
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className={`text-sm font-medium ${
                    resolvedTheme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    resolvedTheme === 'dark' ? 'text-white/60' : 'text-black/60'
                  }`} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${
                      resolvedTheme === 'dark' 
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40'
                        : 'bg-black/10 border-black/20 text-black placeholder:text-black/60 focus:border-black/40'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className={`text-sm font-medium ${
                    resolvedTheme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    resolvedTheme === 'dark' ? 'text-white/60' : 'text-black/60'
                  }`} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${
                      resolvedTheme === 'dark' 
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40'
                        : 'bg-black/10 border-black/20 text-black placeholder:text-black/60 focus:border-black/40'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      resolvedTheme === 'dark' 
                        ? 'text-white/60 hover:text-white/80'
                        : 'text-black/60 hover:text-black/80'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className={`w-full border-t ${
                  resolvedTheme === 'dark' ? 'border-white/20' : 'border-black/20'
                }`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 bg-transparent ${
                  resolvedTheme === 'dark' ? 'text-white/60' : 'text-black/60'
                }`}>Or</span>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <div className="text-center">
                <Link 
                  href="/forgot-password" 
                  className={`text-sm transition-colors ${
                    resolvedTheme === 'dark' 
                      ? 'text-white/80 hover:text-white' 
                      : 'text-black/80 hover:text-black'
                  }`}
                >
                  Forgot your password?
                </Link>
              </div>
              
              <div className={`text-center text-sm ${
                resolvedTheme === 'dark' ? 'text-white/80' : 'text-black/80'
              }`}>
                Don't have an account?{" "}
                <Link 
                  href="/signup" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </div>
            </div>

            {/* Contact Support */}
            <div className={`pt-4 border-t ${
              resolvedTheme === 'dark' ? 'border-white/20' : 'border-black/20'
            }`}>
              <div className="text-center">
                <p className={`text-sm mb-2 ${
                  resolvedTheme === 'dark' ? 'text-white/60' : 'text-black/60'
                }`}>
                  Need help signing in?
                </p>
                <Link 
                  href="/contact" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${
            resolvedTheme === 'dark' ? 'text-white/60' : 'text-black/60'
          }`}>
            By signing in, you agree to our{" "}
            <Link 
              href="/terms" 
              className={`transition-colors ${
                resolvedTheme === 'dark' 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-black/80 hover:text-black'
              }`}
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link 
              href="/privacy" 
              className={`transition-colors ${
                resolvedTheme === 'dark' 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-black/80 hover:text-black'
              }`}
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}