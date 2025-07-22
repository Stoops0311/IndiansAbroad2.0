"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined);

function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }
  return context;
}

export function Dialog({ children, open = false, onOpenChange }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(open);
  
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  }, [onOpenChange]);

  React.useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  return (
    <DialogContext.Provider value={{ open: internalOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function DialogTrigger({ children, asChild, ...props }: DialogTriggerProps) {
  const { onOpenChange } = useDialog();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...props,
      onClick: (e: React.MouseEvent) => {
        (children.props as any).onClick?.(e);
        onOpenChange(true);
      },
    });
  }

  return (
    <button
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        onOpenChange(true);
      }}
    >
      {children}
    </button>
  );
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogContent({ children, className, ...props }: DialogContentProps) {
  const { open, onOpenChange } = useDialog();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Content */}
      <div
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-primary/20 bg-background dark:bg-gradient-to-br dark:from-card dark:via-background dark:to-primary/5 shadow-xl",
          className
        )}
        {...props}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-6 w-6 text-foreground" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogHeader({ children, className, ...props }: DialogHeaderProps) {
  return (
    <div className={cn("p-6 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function DialogTitle({ children, className, ...props }: DialogTitleProps) {
  return (
    <h2
      className={cn(
        "text-2xl md:text-3xl font-bold text-foreground leading-tight",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function DialogDescription({ children, className, ...props }: DialogDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm md:text-base text-muted-foreground mt-2",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}