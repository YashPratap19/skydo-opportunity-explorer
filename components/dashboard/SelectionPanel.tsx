import { useState, useRef, useEffect } from "react";
import { OpportunityRow } from "@/lib/types";

interface SelectionPanelProps {
    categories: string[];
    products: OpportunityRow[];
    selectedCategory: string;
    selectedProduct: string;
    selectedCountry: string;
    onCategoryChange: (category: string) => void;
    onProductChange: (product: string) => void;
    onCountryChange: (country: string) => void;
    onGetInsights: () => void;
}

export function SelectionPanel({
    categories,
    products,
    selectedCategory,
    selectedProduct,
    selectedCountry,
    onCategoryChange,
    onProductChange,
    onCountryChange,
    onGetInsights
}: SelectionPanelProps) {

    const filteredProducts = products.filter(p => p.Category === selectedCategory);

    // Searchable Dropdown State
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [productSearch, setProductSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Filter niche list based on search
    const displayedProducts = filteredProducts.filter(p =>
        p.Product.toLowerCase().includes(productSearch.toLowerCase())
    );

    // Handle clicking outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsProductOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset search when category changes
    useEffect(() => {
        setProductSearch("");
    }, [selectedCategory]);

    return (
        <div className="glass-panel rounded-3xl p-8 h-full flex flex-col justify-center animate-fade-in-up sticky top-28">
            <div className="space-y-8">
                {/* Country Selection */}
                <div className="group">
                    <label className="block text-xs font-bold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Target Market</label>
                    <div className="relative">
                        <select
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none font-medium text-slate-900 cursor-pointer hover:border-blue-300 shadow-sm backdrop-blur-sm"
                            value={selectedCountry}
                            onChange={(e) => onCountryChange(e.target.value)}
                        >
                            <option value="usa">🇺🇸 United States</option>
                            <option value="uk" disabled>🇬🇧 United Kingdom (Coming Soon)</option>
                            <option value="uae" disabled>🇦🇪 UAE (Coming Soon)</option>
                            <option value="germany" disabled>🇩🇪 Germany (Coming Soon)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs font-bold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Category</label>
                    <div className="relative">
                        <select
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none font-medium text-slate-900 cursor-pointer hover:border-blue-300 shadow-sm backdrop-blur-sm"
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value)}
                        >
                            <option value="" disabled>Choose a category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>

                {/* Custom Searchable Product Dropdown */}
                <div className="group relative" ref={wrapperRef}>
                    <label className="block text-xs font-bold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Product Niche</label>

                    <div
                        className={`w-full px-5 py-4 rounded-2xl border ${!selectedCategory ? 'bg-slate-50 border-slate-200 cursor-not-allowed' : 'bg-white/50 border-slate-200 cursor-text hover:border-blue-300'} focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-sm backdrop-blur-sm flex items-center justify-between`}
                        onClick={() => selectedCategory && setIsProductOpen(!isProductOpen)}
                    >
                        {isProductOpen ? (
                            <input
                                type="text"
                                className="w-full bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-400"
                                placeholder="Search products..."
                                value={productSearch}
                                onChange={(e) => setProductSearch(e.target.value)}
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <span className={`font-medium ${selectedProduct ? 'text-slate-900' : 'text-slate-400'}`}>
                                {selectedProduct || "Select a niche first"}
                            </span>
                        )}
                        <div className="pointer-events-none text-slate-400">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>

                    {/* Dropdown Options */}
                    {isProductOpen && selectedCategory && (
                        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto animate-fade-in-up">
                            {displayedProducts.length > 0 ? (
                                displayedProducts.map((p) => (
                                    <div
                                        key={p.Product}
                                        className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-slate-700 hover:text-blue-700 transition-colors border-b border-slate-50 last:border-0"
                                        onClick={() => {
                                            onProductChange(p.Product);
                                            setProductSearch("");
                                            setIsProductOpen(false);
                                        }}
                                    >
                                        {p.Product}
                                    </div>
                                ))
                            ) : (
                                <div className="px-5 py-4 text-slate-400 text-center text-sm">No products found</div>
                            )}
                        </div>
                    )}
                </div>

                <div className="pt-6">
                    <button
                        onClick={onGetInsights}
                        disabled={!selectedCategory || !selectedProduct}
                        className="w-full bg-slate-900 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Generate Insights
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </span>
                    </button>
                    <div className="mt-4 text-center">
                        <button className="text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors">
                            Product not listed? <span className="underline underline-offset-4 decoration-slate-300 hover:decoration-blue-600">Request Now</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-blue-50/50 border border-blue-100/50 rounded-2xl p-5 text-sm text-slate-600 backdrop-blur-sm">
                <p className="leading-relaxed">
                    <span className="font-bold text-blue-700">What you'll get:</span> comprehensive data on demand, growth trends, competition levels, and unit economics.
                </p>
            </div>
        </div>
    );
}
