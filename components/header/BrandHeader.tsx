import Link from "next/link";
import Image from "next/image";

export function BrandHeader() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm" />
            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative w-48 h-12 group-hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/logo.png"
                            alt="Indian Global Sellers"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200/50">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Live Data
                    </div>
                    <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
                        <Link href="#" className="hover:text-[--color-brand-accent] transition-colors">Methodology</Link>
                        <Link href="#" className="hover:text-[--color-brand-accent] transition-colors">About</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
