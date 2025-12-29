
"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScenarioPlanner } from "@/components/dashboard/ScenarioPlanner";
import { ArrowUpRight, ArrowDownRight, Activity, Globe, MonitorPlay, Lock, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { CorrelationMatrix } from "@/components/dashboard/CorrelationMatrix";
import { PortfolioOptimizer } from "@/components/dashboard/PortfolioOptimizer";

export default function Home() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
        <div className="h-screen flex flex-col font-sans overflow-hidden bg-bg-deep">

            {/* MODALS */}
            <Modal
                isOpen={activeModal === "CORRELATION"}
                onClose={() => setActiveModal(null)}
                title="10x10 Korelasyon Matrisi (Canlı)"
            >
                <CorrelationMatrix />
            </Modal>

            <Modal
                isOpen={activeModal === "OPTIMIZER"}
                onClose={() => setActiveModal(null)}
                title="Black-Litterman Optimizasyonu"
                className="max-w-5xl"
            >
                <PortfolioOptimizer />
            </Modal>

            <header className="shrink-0 max-w-7xl mx-auto w-full p-6 pb-2 flex justify-between items-center z-50">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-neon-cyan to-neon-blue rounded-full" />
                        KAAN KALDIRIM
                    </h1>
                    <p className="text-sm text-neon-cyan/80 font-mono tracking-widest mt-1 ml-5">MAKRO STRATEJİ MASASI v3.2</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-1.5 rounded-full bg-glass-surface border border-glass-border text-xs font-mono text-neon-green flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                        SİSTEM AKTİF
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-glass-surface border border-glass-border text-xs font-mono text-text-muted">
                        OCAK_26_VADELİ
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full p-6 pt-4 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">

                {/* SOL KOLON: SENARYO & RİSK */}
                <div className="md:col-span-5 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar pb-6">
                    <ScenarioPlanner />

                    <GlassCard title="Risk Kontrol (Drawdown Protokolü)">
                        <div className="p-3 mb-4 rounded bg-neon-red/10 border-l-2 border-neon-red text-xs text-text-muted">
                            <strong className="text-neon-red block mb-1">MANDAT KONTROLÜ:</strong>
                            Eğer CVaR &gt; -12% ise, VIX Call Opsiyonları (%2) ile koruma (hedge) zorunludur.
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-text-muted">Aylık VaR (%95)</span>
                                <div className="text-sm font-mono text-neon-green">-2.1%</div>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-sm text-text-muted">CVaR (Kuyruk Riski)</span>
                                <div className="text-sm font-mono text-neon-orange">-10.4%</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-text-muted">Sharpe Oranı (3A)</span>
                                <div className="text-sm font-mono text-white">2.45</div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* SAĞ KOLON: TAKTİKSEL ALFA MASASI */}
                <div className="md:col-span-7 flex flex-col gap-6 h-full min-h-0 pb-6">
                    <GlassCard title="Taktiksel Alfa Masası (2H)" subtitle="Aktif Pair Trade & Rotasyonlar" className="flex flex-col flex-1 min-h-0 overflow-hidden">
                        <div className="p-3 mb-6 rounded bg-neon-purple/10 border-l-2 border-neon-purple text-xs text-text-muted shrink-0">
                            <strong className="text-neon-purple block mb-1">SERMAYE GERİ DÖNÜŞÜMÜ:</strong>
                            Momentum (Teknoloji) kârları realize edilip Derin Değer (KOBİ) hisselerine aktarılıyor. Verim eğrisi dikleşme stratejisi aktif.
                        </div>

                        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                            {/* İŞLEMLER */}
                            <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded bg-neon-cyan/20 text-neon-cyan">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">UZUN TECH / KISA ENERJİ</h4>
                                        <div className="text-xs text-text-muted mt-1 font-mono">XLK vs. XLE</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-neon-green font-mono">+4.2% Açık</div>
                                    <div className="text-xs text-text-muted">Hedef: +8%</div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded bg-neon-orange/20 text-neon-orange">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">EĞRİ DİKLEŞTİRİCİ</h4>
                                        <div className="text-xs text-text-muted mt-1 font-mono">KISA 2Y / UZUN 10Y</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-neon-green font-mono">+1.8% Açık</div>
                                    <div className="text-xs text-text-muted">Düşüşte ekle</div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between opacity-70 group hover:opacity-100 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded bg-neon-red/20 text-neon-red">
                                        <MonitorPlay className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">GAMA SCALP (VOL)</h4>
                                        <div className="text-xs text-text-muted mt-1 font-mono">Uzun VIX Opsiyonları</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="px-2 py-1 rounded bg-white/10 text-xs text-text-muted font-mono border border-white/20">BEKLEMEDE</div>
                                    <div className="text-xs text-text-muted mt-1">Tetik: VIX &gt; 18.5</div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded bg-neon-orange/20 text-neon-orange">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">BAKIR (COPPER) RALLİSİ</h4>
                                        <div className="text-xs text-text-muted mt-1 font-mono">Uzun HG / Kısa AUD</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-neon-green font-mono">+6.4% Açık</div>
                                    <div className="text-xs text-text-muted">AI/Veri Merkezi Talebi</div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded bg-yellow-500/20 text-yellow-500">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">ALTIN & GÜMÜŞ</h4>
                                        <div className="text-xs text-text-muted mt-1 font-mono">Uzun GC & SI</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-neon-green font-mono">+12.1% Açık</div>
                                    <div className="text-xs text-text-muted">Reel Faiz Hedge'i</div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded bg-blue-500/20 text-blue-500">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">KRİPTO LİKİDİTE</h4>
                                        <div className="text-xs text-text-muted mt-1 font-mono">Uzun BTC / Kısa ETH</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="px-2 py-1 rounded bg-white/10 text-xs text-text-muted font-mono border border-white/20">NÖTR</div>
                                    <div className="text-xs text-text-muted mt-1">Dominans Artışı</div>
                                </div>
                            </div>

                            {/* EXTRA ITEMS TO SHOW SCROLL */}
                            <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between opacity-50 group hover:opacity-100 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded bg-neon-green/20 text-neon-green">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">GELİŞEN PİYASALAR</h4>
                                        <div className="text-xs text-text-muted mt-1 font-mono">Uzun EEM / Kısa SPY</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="px-2 py-1 rounded bg-white/10 text-xs text-text-muted font-mono border border-white/20">İZLEMEDE</div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between opacity-50 group hover:opacity-100 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded bg-neon-blue/20 text-neon-blue">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">DOLAR KISA</h4>
                                        <div className="text-xs text-text-muted mt-1 font-mono">Kısa DXY / Uzun AUD</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="px-2 py-1 rounded bg-white/10 text-xs text-text-muted font-mono border border-white/20">İZLEMEDE</div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* ALT IZGARA - Butonlar Daha Kompakt (h-32) */}
                    <div className="grid grid-cols-2 gap-4 h-32 shrink-0">
                        <GlassCard className="flex flex-col justify-center items-center text-center p-4 hover:bg-white/5 transition-colors cursor-pointer group" >
                            <button onClick={() => setActiveModal("CORRELATION")} className="w-full h-full flex flex-col items-center justify-center">
                                <Globe className="w-6 h-6 text-neon-blue mb-2 group-hover:scale-110 transition-transform duration-300" />
                                <div className="text-lg font-bold text-white font-mono">10x10</div>
                                <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Korelasyon Matrisi</div>
                                <div className="mt-2 px-3 py-1.5 rounded bg-neon-blue/20 text-neon-blue text-[10px] font-bold group-hover:bg-neon-blue/30 transition-all">
                                    GÖRÜNÜMÜ AÇ
                                </div>
                            </button>
                        </GlassCard>
                        <GlassCard className="flex flex-col justify-center items-center text-center p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                            <button onClick={() => setActiveModal("OPTIMIZER")} className="w-full h-full flex flex-col items-center justify-center">
                                <Lock className="w-6 h-6 text-neon-cyan mb-2 group-hover:scale-110 transition-transform duration-300" />
                                <div className="text-lg font-bold text-white font-mono">Black-Litterman</div>
                                <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Portföy Optimize</div>
                                <div className="mt-2 px-3 py-1.5 rounded bg-neon-cyan/20 text-neon-cyan text-[10px] font-bold group-hover:bg-neon-cyan/30 transition-all">
                                    MODELİ ÇALIŞTIR
                                </div>
                            </button>
                        </GlassCard>
                    </div>
                </div>

            </main>
        </div>
    );
}

