"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined);

function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select");
  }
  return context;
}

export function Select({ children, value = "", onValueChange, placeholder = "Select..." }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  
  const handleValueChange = React.useCallback((newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  }, [onValueChange]);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <SelectContext.Provider value={{ 
      value: internalValue, 
      onValueChange: handleValueChange, 
      placeholder,
      open,
      setOpen 
    }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SelectTrigger({ children, className, ...props }: SelectTriggerProps) {
  const { open, setOpen } = useSelect();

  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground hover:bg-muted/50 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
    </button>
  );
}

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

export function SelectValue({ className, placeholder: customPlaceholder, ...props }: SelectValueProps) {
  const { value, placeholder } = useSelect();
  
  return (
    <span className={cn("truncate", className)} {...props}>
      {value || customPlaceholder || placeholder}
    </span>
  );
}

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SelectContent({ children, className, ...props }: SelectContentProps) {
  const { open, setOpen } = useSelect();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-lg border border-primary/20 bg-background/95 backdrop-blur-sm shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function SelectItem({ value, children, className, ...props }: SelectItemProps) {
  const { value: selectedValue, onValueChange } = useSelect();
  const isSelected = selectedValue === value;

  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-foreground transition-colors",
        isSelected && "bg-primary/20 text-primary",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
      {isSelected && (
        <Check className="absolute right-3 h-4 w-4 text-primary" />
      )}
    </div>
  );
}