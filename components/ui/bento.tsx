"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type * as React from "react";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function BentoCard({ children, className, index = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-card via-background to-primary/5 p-6 md:p-8 transition-all duration-300 hover:border-primary/40",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

interface BentoIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoIcon({ children, className, ...props }: BentoIconProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function BentoTitle({ children, className, ...props }: BentoTitleProps) {
  return (
    <h3
      className={cn(
        "text-xl md:text-2xl font-bold text-white",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

interface BentoDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function BentoDescription({ children, className, ...props }: BentoDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm md:text-base text-white/70",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}