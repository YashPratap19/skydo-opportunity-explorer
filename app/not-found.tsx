import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Page Not Found</h1>
            <p className="text-slate-500 text-lg mb-8 max-w-md">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-base px-6 py-3 rounded-2xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-1 active:translate-y-0 transition-all"
            >
                Back to Home
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
        </div>
    );
}
