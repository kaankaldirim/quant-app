import { GlassCard } from "@/components/ui/GlassCard";
import { ScenarioPlanner } from "@/components/dashboard/ScenarioPlanner";
import { ArrowUpRight, ArrowDownRight, Activity, Globe, MonitorPlay, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 font-sans">
      <header className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-neon-cyan to-neon-blue rounded-full" />
            KAAN KALDIRIM
          </h1>
          <p className="text-sm text-neon-cyan/80 font-mono tracking-widest mt-1 ml-5">INTERNAL MACRO DESK v3.0</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-1.5 rounded-full bg-glass-surface border border-glass-border text-xs font-mono text-neon-green flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            SYSTEM ONLINE
          </div>
          <div className="px-4 py-1.5 rounded-full bg-glass-surface border border-glass-border text-xs font-mono text-text-muted">
            JAN_26_FUTURES
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* LEFT COLUMN: SCENARIO & RISK */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <ScenarioPlanner />

          <GlassCard title="Risk Control (Drawdown Protocol)">
            <div className="p-3 mb-4 rounded bg-neon-red/10 border-l-2 border-neon-red text-xs text-text-muted">
              <strong className="text-neon-red block mb-1">MANDATE CHECK:</strong>
              If CVaR &gt; -12%, required to hedge with VIX Calls (2%).
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm text-text-muted">Monthly VaR (95%)</span>
                <div className="text-sm font-mono text-neon-green">-2.1%</div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm text-text-muted">CVaR (Tail Risk)</span>
                <div className="text-sm font-mono text-neon-orange">-10.4%</div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Sharpe (Roll 3M)</span>
                <div className="text-sm font-mono text-white">2.45</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN: TACTICAL ALPHA DESK */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <GlassCard title="Tactical Alpha Desk (2W)" subtitle="Active Pair Trades & Rotation">
            <div className="p-3 mb-6 rounded bg-neon-purple/10 border-l-2 border-neon-purple text-xs text-text-muted">
              <strong className="text-neon-purple block mb-1">CAPITAL RECYCLING:</strong>
              Taking profits in Momentum (Tech) to fund deep value (Small Caps). Yield Curve steepener active.
            </div>

            <div className="space-y-4">
              {/* TRADES */}
              <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded bg-neon-cyan/20 text-neon-cyan">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">LONG TECH / SHORT ENERGY</h4>
                    <div className="text-xs text-text-muted mt-1 font-mono">XLK vs. XLE</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-neon-green font-mono">+4.2% Open</div>
                  <div className="text-xs text-text-muted">Target: +8%</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded bg-neon-orange/20 text-neon-orange">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">CURVE STEEPENER</h4>
                    <div className="text-xs text-text-muted mt-1 font-mono">SHORT 2Y / LONG 10Y</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-neon-green font-mono">+1.8% Open</div>
                  <div className="text-xs text-text-muted">Adding on dips</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-glass-border flex items-center justify-between opacity-70 group hover:opacity-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded bg-neon-red/20 text-neon-red">
                    <MonitorPlay className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">GAMMA SCALP (VOL)</h4>
                    <div className="text-xs text-text-muted mt-1 font-mono">Long VIX Calls</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="px-2 py-1 rounded bg-white/10 text-xs text-text-muted font-mono border border-white/20">PENDING</div>
                  <div className="text-xs text-text-muted mt-1">Trigger: VIX &gt; 18.5</div>
                </div>
              </div>

            </div>
          </GlassCard>

          {/* LOWER GRID */}
          <div className="grid grid-cols-2 gap-6 h-full">
            <GlassCard className="flex flex-col justify-center items-center text-center p-8">
              <Globe className="w-8 h-8 text-neon-blue mb-4 opacity-50" />
              <div className="text-2xl font-bold text-white font-mono">10x10</div>
              <div className="text-xs text-text-muted uppercase tracking-widest mt-1">Correlation Matrix</div>
              <button className="mt-4 px-4 py-2 rounded bg-neon-blue/20 text-neon-blue text-xs font-bold hover:bg-neon-blue/30 transition-all">
                OPEN VIEW
              </button>
            </GlassCard>
            <GlassCard className="flex flex-col justify-center items-center text-center p-8">
              <Lock className="w-8 h-8 text-neon-cyan mb-4 opacity-50" />
              <div className="text-2xl font-bold text-white font-mono">Black-Litterman</div>
              <div className="text-xs text-text-muted uppercase tracking-widest mt-1">Portfolio Optimizer</div>
              <button className="mt-4 px-4 py-2 rounded bg-neon-cyan/20 text-neon-cyan text-xs font-bold hover:bg-neon-cyan/30 transition-all">
                RE-RUN MODEL
              </button>
            </GlassCard>
          </div>
        </div>

      </main>
    </div>
  );
}
