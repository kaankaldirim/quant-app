"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Activity, Cpu, Zap, Satellite, HeartPulse, ShoppingBag, Coins, Atom } from "lucide-react";
import { useEffect, useState } from "react";

// Company Metadata Map
const COMPANY_INFO: Record<string, string> = {
    // AI
    "NVDA": "AI Çiplerinin Tartışmasız Lideri",
    "AVGO": "Yarı İletken & Yazılım Devi",
    "TSM": "Dünyanın En Büyük Çip Üreticisi",
    "ARM": "Mobil & AI Çip Mimarisi",
    // Energy
    "CEG": "Nükleer Enerji & Temiz Güç",
    "VST": "Bağımsız Enerji Üreticisi",
    "CCJ": "En Büyük Uranyum Sağlayıcısı",
    "XOM": "Global Enerji & Petrol Devi",
    // Space
    "IONQ": "Quantum Bilgisayar Donanımı",
    "RKLB": "Uzay Fırlatma & Uydu Sistemleri",
    "ASTS": "Uzaydan Doğrudan 5G İnternet",
    "RGTI": "Hibrit Quantum İşlemciler",
    // Dividend
    "SCHD": "Yüksek Temettülü ABD Hisseleri",
    "KO": "Global İçecek Markası",
    "JNJ": "Sağlık Ürünleri & İlaç",
    "O": "Aylık Temettü Ödeyen GYO",
    // Health
    "LLY": "Diyabet & Obezite (GLP-1) Lideri",
    "NVO": "Ozempic/Wegovy Üreticisi",
    "ISRG": "Robotik Cerrahi (Da Vinci)",
    "VRTX": "Kistik Fibrozis & Gen Tedavisi",
    // Retail
    "AMZN": "E-Ticaret & Bulut (AWS) Lideri",
    "WMT": "Dünyanın En Büyük Perakendecisi",
    "COST": "Üyelik Bazlı Toptan Market",
    "XRT": "Perakende Sektör Endeksi",
};

export default function SectorsPage() {
    const [prices, setPrices] = useState<Record<string, { price: string, change: string, color: "green" | "red" }>>({});
    const [loading, setLoading] = useState(true);

    const tickers = Object.keys(COMPANY_INFO);

    const fetchPrices = async () => {
        setLoading(true);
        try {
            // Fetch fresh data from backend (IBKR)
            // t parameter prevents caching
            const res = await fetch(`/api/prices?tickers=${tickers.join(",")}&t=${Date.now()}`);
            const data = await res.json();
            setPrices(data);
        } catch (e) {
            console.error("Failed to fetch prices", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial Snapshot
        fetchPrices();
    }, []);

    const getPrice = (ticker: string) => {
        if (prices[ticker] && prices[ticker].price !== "...") {
            return prices[ticker];
        }
        // While loading, return placeholders
        return { price: loading ? "..." : "---", change: loading ? "..." : "---", color: "green" as "green" | "red" };
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-transparent">
            {/* HEADER */}
            <header className="shrink-0 max-w-7xl mx-auto w-full p-6 flex flex-col md:flex-row justify-between items-center z-50 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                        <div className="w-2 h-10 bg-gradient-to-b from-neon-purple to-neon-cyan rounded-full" />
                        SEKTÖREL DERİNLİK
                    </h1>
                    <p className="text-sm text-neon-purple/80 font-mono tracking-widest mt-1 ml-5">HİSSE & TEMA ANALİZİ</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchPrices}
                        className="px-4 py-2 rounded-full bg-glass-surface border border-glass-border text-xs font-mono text-neon-cyan hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                        <div className={`w-1.5 h-1.5 rounded-full bg-neon-cyan ${loading ? 'animate-ping' : ''}`} />
                        {loading ? 'TWS_BAĞLANIYOR...' : 'SNAPSHOT_YENİLE (IBKR)'}
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. YENİ NESİL TEKNOLOJİ (AI & CHIPS) */}
                <GlassCard title="AI & YARI İLETKEN" className="h-full">
                    <div className="flex items-center gap-2 mb-4">
                        <Cpu className="w-5 h-5 text-neon-cyan" />
                        <span className="text-xs font-mono text-neon-cyan tracking-widest">MOMENTUM LİDERLERİ</span>
                    </div>
                    <div className="space-y-3">
                        <StockRow ticker="NVDA" name="Nvidia Corp" desc={COMPANY_INFO["NVDA"]} {...getPrice("NVDA")} />
                        <StockRow ticker="AVGO" name="Broadcom" desc={COMPANY_INFO["AVGO"]} {...getPrice("AVGO")} />
                        <StockRow ticker="TSM" name="TSMC" desc={COMPANY_INFO["TSM"]} {...getPrice("TSM")} />
                        <StockRow ticker="ARM" name="Arm Holdings" desc={COMPANY_INFO["ARM"]} {...getPrice("ARM")} />
                    </div>
                </GlassCard>

                {/* 2. ENERJİ & NÜKLEER */}
                <GlassCard title="ENERJİ & NÜKLEER" className="h-full">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-neon-orange" />
                        <span className="text-xs font-mono text-neon-orange tracking-widest">VERİ MERKEZİ GÜCÜ</span>
                    </div>
                    <div className="space-y-3">
                        <StockRow ticker="CEG" name="Constellation Energy" desc={COMPANY_INFO["CEG"]} {...getPrice("CEG")} />
                        <StockRow ticker="VST" name="Vistra Corp" desc={COMPANY_INFO["VST"]} {...getPrice("VST")} />
                        <StockRow ticker="CCJ" name="Cameco (Uranium)" desc={COMPANY_INFO["CCJ"]} {...getPrice("CCJ")} />
                        <StockRow ticker="XOM" name="Exxon Mobil" desc={COMPANY_INFO["XOM"]} {...getPrice("XOM")} />
                    </div>
                </GlassCard>

                {/* 3. QUANTUM & SPACE */}
                <GlassCard title="UZAY & QUANTUM" className="h-full">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-2">
                            <Satellite className="w-5 h-5 text-neon-purple" />
                            <Atom className="w-5 h-5 text-neon-purple" />
                        </div>
                        <span className="text-xs font-mono text-neon-purple tracking-widest">BÜYÜME (10x)</span>
                    </div>
                    <div className="space-y-3">
                        <StockRow ticker="IONQ" name="IonQ Inc" desc={COMPANY_INFO["IONQ"]} {...getPrice("IONQ")} />
                        <StockRow ticker="RKLB" name="Rocket Lab" desc={COMPANY_INFO["RKLB"]} {...getPrice("RKLB")} />
                        <StockRow ticker="ASTS" name="AST SpaceMobile" desc={COMPANY_INFO["ASTS"]} {...getPrice("ASTS")} />
                        <StockRow ticker="RGTI" name="Rigetti Computing" desc={COMPANY_INFO["RGTI"]} {...getPrice("RGTI")} />
                    </div>
                </GlassCard>

                {/* 4. TEMETTÜ & SAVUNMA */}
                <GlassCard title="TEMETTÜ (DEFANSİF)" className="h-full">
                    <div className="flex items-center gap-2 mb-4">
                        <Coins className="w-5 h-5 text-neon-green" />
                        <span className="text-xs font-mono text-neon-green tracking-widest">NAKİT AKIŞI</span>
                    </div>
                    <div className="space-y-3">
                        <StockRow ticker="SCHD" name="US Dividend ETF" desc={COMPANY_INFO["SCHD"]} {...getPrice("SCHD")} />
                        <StockRow ticker="KO" name="Coca-Cola" desc={COMPANY_INFO["KO"]} {...getPrice("KO")} />
                        <StockRow ticker="JNJ" name="Johnson & Johnson" desc={COMPANY_INFO["JNJ"]} {...getPrice("JNJ")} />
                        <StockRow ticker="O" name="Realty Income" desc={COMPANY_INFO["O"]} {...getPrice("O")} />
                    </div>
                </GlassCard>

                {/* 5. SAĞLIK & BIOTECH */}
                <GlassCard title="SAĞLIK & GLP-1" className="h-full">
                    <div className="flex items-center gap-2 mb-4">
                        <HeartPulse className="w-5 h-5 text-neon-red" />
                        <span className="text-xs font-mono text-neon-red tracking-widest">İLAÇ & TEKNOLOJİ</span>
                    </div>
                    <div className="space-y-3">
                        <StockRow ticker="LLY" name="Eli Lilly" desc={COMPANY_INFO["LLY"]} {...getPrice("LLY")} />
                        <StockRow ticker="NVO" name="Novo Nordisk" desc={COMPANY_INFO["NVO"]} {...getPrice("NVO")} />
                        <StockRow ticker="ISRG" name="Intuitive Surgical" desc={COMPANY_INFO["ISRG"]} {...getPrice("ISRG")} />
                        <StockRow ticker="VRTX" name="Vertex Pharma" desc={COMPANY_INFO["VRTX"]} {...getPrice("VRTX")} />
                    </div>
                </GlassCard>

                {/* 6. PERAKENDE & TÜKETİCİ */}
                <GlassCard title="RETAIL (TÜKETİCİ)" className="h-full">
                    <div className="flex items-center gap-2 mb-4">
                        <ShoppingBag className="w-5 h-5 text-blue-400" />
                        <span className="text-xs font-mono text-blue-400 tracking-widest">HARCAMA GÜCÜ</span>
                    </div>
                    <div className="space-y-3">
                        <StockRow ticker="AMZN" name="Amazon" desc={COMPANY_INFO["AMZN"]} {...getPrice("AMZN")} />
                        <StockRow ticker="WMT" name="Walmart" desc={COMPANY_INFO["WMT"]} {...getPrice("WMT")} />
                        <StockRow ticker="COST" name="Costco" desc={COMPANY_INFO["COST"]} {...getPrice("COST")} />
                        <StockRow ticker="XRT" name="Retail ETF" desc={COMPANY_INFO["XRT"]} {...getPrice("XRT")} />
                    </div>
                </GlassCard>

            </main>
        </div>
    );
}

function StockRow({ ticker, name, desc, price, change, color }: { ticker: string, name: string, desc: string, price: string, change: string, color: "green" | "red" }) {
    return (
        <div className="flex items-center justify-between p-3 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-white font-mono">{ticker}</span>
                    <span className="text-xs text-text-muted hidden md:inline truncate">{name}</span>
                </div>
                <p className="text-[10px] text-white/50 truncate font-mono tracking-wide uppercase">
                    {desc}
                </p>
            </div>
            <div className="text-right shrink-0">
                <div className="text-sm text-white font-mono">${price}</div>
                <div className={`text-xs font-mono ${color === "green" ? "text-neon-green" : "text-neon-red"}`}>
                    {change}
                </div>
            </div>
        </div>
    );
}
