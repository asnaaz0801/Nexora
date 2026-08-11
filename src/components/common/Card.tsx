import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glowOnHover = true,
  bordered = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-surface/80 backdrop-blur-xl transition-all duration-300 overflow-hidden",
        bordered && "border border-slate-800/80",
        glowOnHover && "hover:border-nexora-500/40 hover:shadow-glow-card hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Subtle top reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-nexora-500/20 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
