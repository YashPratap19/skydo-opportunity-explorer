import { cn } from "@/lib/utils";

interface InsightMetricProps {
    label: string;
    score: number;
    maxScore?: number;
}

export function InsightMetric({ label, score, maxScore = 100 }: InsightMetricProps) {
    // Determine color and label based on score
    let textClass = "text-slate-900";
    let statusLabel = "Low";

    if (score >= 70) {
        textClass = "text-emerald-500";
        statusLabel = "Excellent";
    } else if (score >= 45) {
        textClass = "text-amber-500";
        statusLabel = "Good";
    } else {
        textClass = "text-rose-500";
        statusLabel = "Average";
    }

    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / maxScore) * circumference;

    return (
        <div className="p-5 rounded-2xl bg-white/60 border border-slate-100/60 hover:bg-white/90 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-between gap-4 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
            <div className="flex flex-col relative z-10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</span>
                <span className={cn("text-sm font-bold px-2 py-0.5 rounded-full w-fit bg-opacity-10", textClass.replace("text-", "bg-"), textClass)}>
                    {statusLabel}
                </span>
            </div>

            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center z-10">
                {/* Background Ring */}
                <svg className="w-full h-full transform -rotate-90 filter drop-shadow-sm">
                    <circle
                        cx="50%" cy="50%" r={radius}
                        stroke="currentColor" strokeWidth="4"
                        fill="transparent"
                        className="text-slate-100"
                    />
                    {/* Progress Ring */}
                    <circle
                        cx="50%" cy="50%" r={radius}
                        stroke="currentColor" strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className={cn("transition-all duration-1000 ease-out", textClass)}
                        style={{ filter: `drop-shadow(0 0 2px currentColor)` }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn("text-lg font-bold", textClass)}>{score}</span>
                </div>
            </div>
        </div>
    );
}
