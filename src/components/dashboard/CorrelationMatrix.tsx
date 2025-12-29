"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const ASSETS = ["SPX", "NDX", "BTC", "ETH", "US10Y", "DXY", "CL (Petro)", "GC (Altın)", "HG (Bakır)", "SI (Gümüş)"];

// Mock correlation data (1 = perfect correlation, -1 = inverse)
const CORRELATIONS = [
    [1.00, 0.92, 0.78, 0.65, 0.55, -0.32, -0.45, 0.25, 0.15, 0.40],
    [0.92, 1.00, 0.72, 0.60, 0.52, -0.45, -0.50, 0.20, 0.10, 0.55],
    [0.78, 0.72, 1.00, 0.70, 0.60, -0.15, -0.35, 0.45, 0.25, 0.35],
    [0.65, 0.60, 0.70, 1.00, 0.65, -0.20, -0.40, 0.35, 0.20, 0.30],
    [0.55, 0.52, 0.60, 0.65, 1.00, -0.10, -0.25, 0.30, 0.15, 0.25],
    [-0.32, -0.45, -0.15, -0.20, -0.10, 1.00, 0.65, -0.15, -0.25, -0.20],
    [-0.45, -0.50, -0.35, -0.40, -0.25, 0.65, 1.00, -0.35, -0.45, -0.30],
    [0.25, 0.20, 0.45, 0.35, 0.30, -0.15, -0.35, 1.00, 0.45, 0.20],
    [0.15, 0.10, 0.25, 0.20, 0.15, -0.25, -0.45, 0.45, 1.00, 0.35],
    [0.40, 0.55, 0.35, 0.30, 0.25, -0.20, -0.30, 0.20, 0.35, 1.00]
];

function getColor(val: number) {
    if (val === 1) return "bg-white/10 text-white";
    if (val > 0.7) return "bg-neon-green/30 text-neon-green";
    if (val > 0.4) return "bg-neon-green/10 text-neon-green";
    if (val < -0.4) return "bg-neon-red/10 text-neon-red";
    if (val < -0.7) return "bg-neon-red/30 text-neon-red";
    return "bg-white/5 text-text-muted";
}

export function CorrelationMatrix() {
    return (
        <div className="space-y-4">
            <div className="p-4 rounded-lg bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-sm mb-6">
                <strong>PY GÖRÜŞÜ:</strong> NDX ve BTC (0.55) arasındaki yüksek korelasyon risk iştahının genele yayıldığını gösteriyor. Ayrışmaları takip et.
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                    <thead>
                        <tr>
                            <th className="p-2"></th>
                            {ASSETS.map((a) => (
                                <th key={a} className="p-2 text-white/50 border-b border-white/10">{a}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {ASSETS.map((rowAsset, i) => (
                            <tr key={rowAsset}>
                                <th className="p-2 text-white/50 border-r border-white/10 bg-white/5">{rowAsset}</th>
                                {CORRELATIONS[i].map((val, j) => (
                                    <td key={j} className="p-0">
                                        <div className={cn("p-3 w-full h-full flex items-center justify-center font-bold transition-colors hover:bg-white/20", getColor(val))}>
                                            {val.toFixed(2)}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
