import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
}

export function GlassCard({ children, className, title, subtitle }: GlassCardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-glass-border bg-glass-surface backdrop-blur-md p-6 shadow-2xl relative",
                className
            )}
        >
            {/* Optional: Add a subtle gradient overlay or interaction here */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {(title || subtitle) && (
                <div className="mb-6 relative z-10">
                    {title && (
                        <h3 className="text-lg font-bold text-white tracking-wide uppercase flex items-center gap-2">
                            <div className="h-4 w-1 bg-neon-cyan rounded-full" />
                            {title}
                        </h3>
                    )}
                    {subtitle && <p className="text-sm text-text-muted mt-1 ml-3">{subtitle}</p>}
                </div>
            )}

            <div className="relative z-10 flex-1 flex flex-col min-h-0">{children}</div>
        </div>
    );
}
