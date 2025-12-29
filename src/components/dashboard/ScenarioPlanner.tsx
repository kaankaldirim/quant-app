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
        <GlassCard title="Ocak Senaryo Simülasyonu" subtitle="İnteraktif Strateji Ayarlayıcı" className="h-full">
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
                        <div className="font-bold">GOLDILOCKS (Boğa)</div>
                        <div className="text-xs opacity-70 font-mono">TÜFE &lt; 2.5%</div>
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
                        <div className="font-bold">REFLASYON (Ayı)</div>
                        <div className="text-xs opacity-70 font-mono">TÜFE &gt; 3.0%</div>
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
                    <div className="bg-black/40 border border-white/10 rounded-lg overflow-hidden relative group">
                        {/* Terminal Header */}
                        <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full animate-pulse", scenario === "GOLDILOCKS" ? "bg-neon-green" : "bg-neon-red")} />
                                <span className={cn("text-[10px] font-mono tracking-widest uppercase", scenario === "GOLDILOCKS" ? "text-neon-green" : "text-neon-red")}>
                                    İşlem_Protokolü_v3.1.exe
                                </span>
                            </div>
                            <div className="text-[10px] text-text-muted font-mono">SYSTEM_ACTIVE</div>
                        </div>

                        {/* Content */}
                        <div className="p-5 relative">
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", scenario === "GOLDILOCKS" ? "bg-neon-blue/5" : "bg-neon-red/5")} />

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-1.5 h-1.5 bg-neon-cyan rounded-sm shrink-0" />
                                    <div>
                                        <div className="text-xs text-neon-cyan font-bold tracking-wider mb-0.5">HİSSE SENETLERİ</div>
                                        <div className="text-sm text-white font-medium">
                                            {scenario === "GOLDILOCKS"
                                                ? "Teknoloji (Tech) Ağırlığını Koru & Arttır."
                                                : "ACİL ROTASYON: S&P 500 & Nasdaq Pozisyonlarını Azalt."}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-1.5 h-1.5 bg-neon-purple rounded-sm shrink-0" />
                                    <div>
                                        <div className="text-xs text-neon-purple font-bold tracking-wider mb-0.5">SABİT GETİRİ</div>
                                        <div className="text-sm text-white font-medium">
                                            {scenario === "GOLDILOCKS"
                                                ? "Portföye Durasyon (TLT) Ekle."
                                                : "TIPS (Enflasyon Korumalı) Tahvillere Geç."}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-1.5 h-1.5 bg-neon-red rounded-sm shrink-0" />
                                    <div>
                                        <div className="text-xs text-neon-red font-bold tracking-wider mb-0.5">TÜREV ARAÇLAR</div>
                                        <div className="text-sm text-white font-medium opacity-80">
                                            {scenario === "GOLDILOCKS"
                                                ? "Hedge (Koruma) Devre Dışı / Risk Açık."
                                                : "VIX Call Opsiyonları ile Tam Koruma Başlat."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-glass-surface border border-glass-border">
                            <h5 className="text-sm text-neon-cyan mb-1 font-bold flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Öncelikli Sektör
                            </h5>
                            <div className="text-lg text-white font-mono">
                                {scenario === "GOLDILOCKS" ? "Yazılım (IGV)" : "Petrol Hiz. (OIH)"}
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-glass-surface border border-glass-border">
                            <h5 className="text-sm text-neon-purple mb-1 font-bold flex items-center gap-2">
                                <Droplets className="w-4 h-4" /> Likidite
                            </h5>
                            <div className="text-lg text-white font-mono">
                                {scenario === "GOLDILOCKS" ? "Genişliyor" : "Daralıyor"}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </GlassCard>
    );
}
