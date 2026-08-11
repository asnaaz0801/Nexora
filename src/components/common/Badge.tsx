import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'cyan' | 'blue' | 'success' | 'warning' | 'purple' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  className
}) => {
  const variants = {
    primary: "bg-nexora-500/15 text-nexora-300 border-nexora-500/30",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/25",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/25",
    neutral: "bg-slate-800/80 text-slate-300 border-slate-700/60",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide rounded-full border shadow-sm backdrop-blur-md",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
