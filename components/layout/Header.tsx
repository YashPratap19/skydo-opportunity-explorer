import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Header() {
    return (
        <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-white border-b border-gray-100">
            <div className="flex items-center gap-2">
                {/* Placeholder for Skydo Logo - using text for now if SVG not available, or simple SVG */}
                <div className="font-bold text-2xl text-[--color-skydo-blue] flex items-center gap-1">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 20L20 30L35 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Skydo
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                <Link href="#" className="hover:text-[--color-skydo-blue]">Receive from Client</Link>
                <Link href="#" className="hover:text-[--color-skydo-blue]">Receive from Platforms</Link>
                <Link href="#" className="hover:text-[--color-skydo-blue]">Receive from Amazon</Link>
            </nav>

            <div className="flex items-center gap-4">
                <Link href="#" className="text-sm font-medium text-[--color-skydo-blue] hover:underline hidden sm:block">
                    Login
                </Link>
                <button className="bg-white border border-gray-300 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
}
