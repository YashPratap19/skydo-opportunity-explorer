import { OpportunityRow } from "@/lib/types";
import { InsightMetric } from "./InsightMetric";
import { LeadCaptureForm } from "./LeadCaptureForm";

interface InsightsCardProps {
    data: OpportunityRow | null;
    loading?: boolean;
    isLocked?: boolean;
    onUnlock?: () => void;
}

export function InsightsCard({ data, loading, isLocked = false, onUnlock }: InsightsCardProps) {
    if (loading) {
        return (
            <div className="h-full min-h-[500px] bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-glass p-8 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-transparent animate-pulse"></div>
                <div className="w-16 h-16 border-4 border-blue-100 border-t-[--color-brand-accent] rounded-full animate-spin mb-4 relative z-10"></div>
                <p className="text-[--color-brand-accent] font-medium animate-pulse relative z-10">Running compatibility analysis...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-full min-h-[500px] bg-white/40 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center text-gray-400 animate-fade-in-up">
                <div className="w-20 h-20 bg-gray-50 rounded-full mb-6 flex items-center justify-center shadow-inner">
                    <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-500 mb-2">Ready to explore?</h3>
                <p className="max-w-xs mx-auto">Select a category and product niche from the left panel to unlock premium insights.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            <div className="glass-panel p-8 rounded-3xl animate-fade-in-up relative overflow-hidden min-h-[400px]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4 border-b border-slate-200/50 pb-6 relative z-10">
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category Opportunity Snapshot</div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-heading)]">{data.Product}</h2>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
                            New Entrant Perspective
                        </span>
                    </div>
                </div>

                {/* Metrics Grid with Blur Filter if Locked */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-500 ${isLocked ? 'blur-md opacity-40 select-none' : ''}`}>
                    {/* Key Metrics - Bento Grid */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InsightMetric label="Consumer Demand" score={data.DemandScore} />
                        <InsightMetric label="Growth Potential" score={data.GrowthScore} />
                        <InsightMetric label="Competition Level" score={data.CompetitionScore} />
                        <InsightMetric label="Unit Economics" score={data.UnitEconomicsScore} />
                    </div>

                    {/* Secondary Metrics */}
                    <div className="md:col-span-1 space-y-4">
                        <InsightMetric label="Differentiation" score={data.DifferentiationScore} />
                        <InsightMetric label="Compliance Risk" score={data.ComplianceRiskScore} />
                    </div>
                </div>
            </div>

            {/* Actionable Steps - Also blurred if locked */}
            <div
                className={`bg-slate-900 text-white rounded-3xl p-8 shadow-floating animate-fade-in-up transition-all duration-500 ${isLocked ? 'blur-sm opacity-60 select-none pointer-events-none mt-20' : ''}`}
                style={{ animationDelay: '0.1s' }}
            >
                <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    Recommended Next Steps
                </h3>
                <div className="grid gap-4">
                    {[
                        "Validate search volume + conversion signals",
                        "Benchmark top 20 listings for price & reviews",
                        "Identify 3 differentiation angles for India exporters"
                    ].map((step, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                {i + 1}
                            </div>
                            <span className="text-slate-200 font-medium">{step}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Locked State Overlay - Positioned over both */}
            {isLocked && (
                <div className="absolute top-[160px] left-0 right-0 z-30 flex justify-center px-4">
                    <div className="bg-slate-50 p-8 rounded-3xl shadow-2xl border border-white/50 w-full max-w-lg transform animate-scale-in">
                        <LeadCaptureForm
                            product={data.Product}
                            country="United States"
                            onSuccess={onUnlock || (() => { })}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
