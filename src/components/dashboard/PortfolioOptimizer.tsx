"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from "recharts";
import { RefreshCcw, Sliders } from "lucide-react";

// Mock Data Generation for Efficient Frontier
const generateFrontier = () => {
    const points = [];
    for (let i = 0; i < 50; i++) {
        const risk = 2 + (i * 0.2) + (Math.random() * 0.5);
        const returnVal = 4 + (Math.log(i + 1) * 2) - (Math.random() * 1);
        points.push({ x: risk, y: returnVal, type: "market" });
    }
    return points;
};

const INITIAL_DATA = generateFrontier();

export function PortfolioOptimizer() {
    const [riskTolerance, setRiskTolerance] = useState(50);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);

    // Dynamic point calculation based on spinner/sliders
    const currentPortfolio = useMemo(() => {
        // A simulated "optimal" point that moves with risk tolerance
        const risk = 4 + (riskTolerance / 10);
        const ret = 6 + (Math.log(riskTolerance) * 1.5);
        return { x: risk, y: ret, type: "portfolio" };
    }, [riskTolerance]);

    const handleOptimize = () => {
        setIsOptimizing(true);
        // Simulate calculation delay
        setTimeout(() => setIsOptimizing(false), 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">

                {/* CHART SECTION */}
                <div className="flex-1 h-[300px] bg-white/5 rounded-xl border border-glass-border p-4 relative">
                    <h4 className="absolute top-4 left-4 text-xs font-bold text-neon-cyan z-10">VERİMLİ SINIR (Efficient Frontier)</h4>

                    {isOptimizing && (
                        <div className="absolute inset-0 z-20 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
                            <div className="flex flex-col items-center text-neon-cyan animate-pulse">
                                <RefreshCcw className="w-8 h-8 animate-spin mb-2" />
                                <span className="text-xs font-mono">KUADRATİK PROGRAM ÇÖZÜLÜYOR...</span>
                            </div>
                        </div>
                    )}

                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <XAxis type="number" dataKey="x" name="Risk (Vol)" unit="%" stroke="#FFFFFF40" tick={{ fontSize: 10 }} />
                            <YAxis type="number" dataKey="y" name="Getiri" unit="%" stroke="#FFFFFF40" tick={{ fontSize: 10 }} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                            <Scatter name="Piyasa Portföyleri" data={data} fill="#8884d8">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill="rgba(255, 255, 255, 0.1)" />
                                ))}
                            </Scatter>
                            {/* Active Portfolio Point */}
                            <Scatter name="Model Portföy" data={[currentPortfolio]} fill="#00FF9C" shape="star" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                {/* CONTROLS SECTION */}
                <div className="w-full md:w-64 space-y-6">
                    <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20">
                        <div className="flex items-center gap-2 mb-4 text-neon-cyan">
                            <Sliders className="w-4 h-4" />
                            <span className="text-sm font-bold">Kısıtlamalar</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs text-text-muted mb-1">
                                    <span>Risk İştahı (Lambda)</span>
                                    <span className="font-mono text-white">{riskTolerance / 10}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={riskTolerance}
                                    onChange={(e) => setRiskTolerance(Number(e.target.value))}
                                    className="w-full accent-neon-cyan h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs text-text-muted mb-1">
                                    <span>Max Drawdown Limiti</span>
                                    <span className="font-mono text-white">-15%</span>
                                </div>
                                <input
                                    type="range"
                                    disabled
                                    value="30"
                                    className="w-full accent-neon-cyan h-1 bg-white/10 rounded-lg appearance-none cursor-not-allowed opacity-50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                            <span className="text-text-muted">Beklenen Getiri</span>
                            <span className="font-mono text-neon-green">+{currentPortfolio.y.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                            <span className="text-text-muted">Volatilite (Risk)</span>
                            <span className="font-mono text-neon-orange">{currentPortfolio.x.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                            <span className="text-text-muted">Sharpe Oranı</span>
                            <span className="font-mono text-white">{(currentPortfolio.y / currentPortfolio.x).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleOptimize}
                        className="w-full py-3 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan font-bold text-sm hover:bg-neon-cyan/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        ÇÖZÜCÜYÜ ÇALIŞTIR
                    </button>
                </div>
            </div>
        </div>
    );
}
