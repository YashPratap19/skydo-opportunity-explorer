import { cn } from "@/lib/utils";

interface InsightMetricProps {
    label: string;
    score: number;
    maxScore?: number;
}

export function InsightMetric({ label, score, maxScore = 10 }: InsightMetricProps) {
    // Determine color and label based on score
    // Determine color and label based on score
    let textClass = "text-slate-900";
    let statusLabel = "Low";

    if (score >= 8) {
        textClass = "text-emerald-500";
        statusLabel = "Excellent";
    } else if (score >= 6) {
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
        <div className="p-4 rounded-2xl bg-white/50 border border-slate-100/50 hover:bg-white/80 hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-center justify-between gap-4 backdrop-blur-sm">
            <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</span>
                <span className={cn("text-sm font-bold px-2 py-0.5 rounded-full w-fit bg-opacity-10", textClass.replace("text-", "bg-"), textClass)}>
                    {statusLabel}
                </span>
            </div>

            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                {/* Background Ring */}
                <svg className="w-full h-full transform -rotate-90">
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
