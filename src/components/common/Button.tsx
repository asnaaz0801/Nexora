import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nexora-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variants = {
    primary: "bg-gradient-to-r from-nexora-500 to-nexora-700 hover:from-nexora-400 hover:to-nexora-600 text-black font-semibold shadow-glow-sm hover:shadow-glow-md",
    glow: "relative bg-gradient-to-r from-nexora-500 via-sky-400 to-blue-600 text-slate-950 font-bold shadow-glow-md hover:shadow-glow-lg border border-cyan-300/30 hover:scale-[1.02]",
    secondary: "bg-surface-elevated hover:bg-slate-800 text-slate-100 border border-slate-700/80 hover:border-slate-600 shadow-sm",
    outline: "bg-transparent text-nexora-400 hover:text-white border border-nexora-500/40 hover:border-nexora-400 hover:bg-nexora-500/10",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60",
    danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-sm hover:shadow-rose-900/30",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span>{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
