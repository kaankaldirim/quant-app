"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, AlertTriangle, ShieldCheck, Zap, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Scenario = "GOLDILOCKS" | "REFLATION";

export function ScenarioPlanner() {
    const [scenario, setScenario] = useState<Scenario>("GOLDILOCKS");

    return (
        <GlassCard title="January Scenario Simulation" subtitle="Interactive Strategy Adjuster" className="h-full">
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setScenario("GOLDILOCKS")}
                    className={cn(
                        "flex-1 p-4 rounded-lg border transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden",
                        scenario === "GOLDILOCKS"
                            ? "bg-neon-green/10 border-neon-green text-neon-green shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                            : "bg-white/5 border-transparent text-text-muted hover:bg-white/10"
                    )}
                >
                    {scenario === "GOLDILOCKS" && <div className="absolute inset-0 bg-neon-green/5 animate-pulse" />}
                    <ShieldCheck className="w-6 h-6 z-10" />
                    <div className="text-left z-10">
                        <div className="font-bold">GOLDILOCKS (Bull)</div>
                        <div className="text-xs opacity-70 font-mono">CPI &lt; 2.5%</div>
                    </div>
                </button>

                <button
                    onClick={() => setScenario("REFLATION")}
                    className={cn(
                        "flex-1 p-4 rounded-lg border transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden",
                        scenario === "REFLATION"
                            ? "bg-neon-red/10 border-neon-red text-neon-red shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                            : "bg-white/5 border-transparent text-text-muted hover:bg-white/10"
                    )}
                >
                    {scenario === "REFLATION" && <div className="absolute inset-0 bg-neon-red/5 animate-pulse" />}
                    <AlertTriangle className="w-6 h-6 z-10" />
                    <div className="text-left z-10">
                        <div className="font-bold">REFLATION (Bear)</div>
                        <div className="text-xs opacity-70 font-mono">CPI &gt; 3.0%</div>
                    </div>
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={scenario}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                >
                    <div className="p-6 rounded-xl bg-black/40 border border-glass-border">
                        <h4 className="text-xs text-text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", scenario === "GOLDILOCKS" ? "bg-neon-green" : "bg-neon-red")} />
                            client_action_protocol.exe
                        </h4>
                        <p className="text-2xl font-mono text-white leading-relaxed">
                            {scenario === "GOLDILOCKS"
                                ? "MAINTAIN OVERWEIGHT TECH. ADD DURATION (TLT). HEDGE NIL."
                                : "EMERGENCY ROTATION: SELL S&P 500. BUY ENERGY (XLE) & TIPS."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-glass-surface border border-glass-border">
                            <h5 className="text-sm text-neon-cyan mb-1 font-bold flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Priority Sector
                            </h5>
                            <div className="text-lg text-white font-mono">
                                {scenario === "GOLDILOCKS" ? "Software (IGV)" : "Oil Svcs (OIH)"}
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-glass-surface border border-glass-border">
                            <h5 className="text-sm text-neon-purple mb-1 font-bold flex items-center gap-2">
                                <Droplets className="w-4 h-4" /> Liquidity
                            </h5>
                            <div className="text-lg text-white font-mono">
                                {scenario === "GOLDILOCKS" ? "Expanding" : "Contracting"}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </GlassCard>
    );
}
