"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { SelectionPanel } from "@/components/dashboard/SelectionPanel";
import { InsightsCard } from "@/components/dashboard/InsightsCard";
import { ProductShowcase } from "@/components/dashboard/ProductShowcase";
import { OpportunityRow } from "@/lib/types";
import { generateRandomInsights } from "@/lib/utils/random-insights";
import Papa from "papaparse";

export default function Dashboard() {
  const [data, setData] = useState<OpportunityRow[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("usa");
  const [currentOpportunity, setCurrentOpportunity] = useState<OpportunityRow | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    async function loadData() {
      // ...
      try {
        const response = await fetch(`/data/${selectedCountry}.csv`);
        if (!response.ok) throw new Error("Failed to load country data");

        const csvText = await response.text();
        const { data: parsedData } = Papa.parse<OpportunityRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        });

        // Filter out invalid rows to prevent crashes
        const validData = parsedData.filter((row: any) => row.Category && row.Product);

        setData(validData);
        const uniqueCategories = Array.from(new Set(validData.map((row: any) => row.Category))).filter(Boolean) as string[];
        setCategories(uniqueCategories);
      } catch (e) {
        console.error("Error loading data:", e);
      }
    }
    loadData();
  }, [selectedCountry]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedProduct("");
    setShowInsights(false);
  };

  const handleGetInsights = async () => {
    setLoadingInsights(true);
    setShowInsights(true);
    setIsLocked(true); // Default to locked for lead gen

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Find the product in the current data
    const productData = data.find(p => p.Product === selectedProduct);

    if (productData) {
      // If the CSV has real scores, utilize them. If not (like our sample USA CSV), generate them.
      // Our sample CSV only has Category and Product, so we MUST generate random insights.
      // We'll trust the generator for now.
      const insights = generateRandomInsights(selectedCategory, selectedProduct);
      setCurrentOpportunity(insights);
    }

    setLoadingInsights(false);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20 relative overflow-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />

      <div className="relative z-10 w-full mb-1 border-b border-indigo-100/50 bg-white/50 backdrop-blur-md sticky top-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative w-10 h-10 shadow-lg shadow-blue-500/20 rounded-xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="Amazon Export Insights"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-lg leading-tight tracking-tight">Amazon Export Insights</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">By Skydo</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              LIVE DATA
            </a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Methodology</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">About</a>
          </nav>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Market Intelligence v2.0
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[--color-brand-primary] mb-6 leading-[1.1] tracking-tight">
              Find your next winning <span className="block text-gradient">Amazon export product</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
              Product-level insights on demand, competition, unit economics, and risk
            </p>
          </div>

          <div className="h-[400px] w-full relative">
            <ProductShowcase />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Selection Panel */}
          <div className="lg:col-span-4 relative z-20 sticky top-28">
            <SelectionPanel
              categories={categories}
              products={data}
              selectedCategory={selectedCategory}
              selectedProduct={selectedProduct}
              selectedCountry={selectedCountry}
              onCategoryChange={handleCategoryChange}
              onProductChange={setSelectedProduct}
              onCountryChange={setSelectedCountry}
              onGetInsights={handleGetInsights}
            />
          </div>

          {/* Right Column: Insights Card */}
          <div className="lg:col-span-8 w-full relative z-10">
            <div className="transition-all duration-500">
              {showInsights ? (
                <InsightsCard
                  data={currentOpportunity}
                  loading={loadingInsights}
                  isLocked={isLocked}
                />
              ) : (
                <div className="hidden lg:flex flex-col h-[600px] glass-panel rounded-3xl items-center justify-center p-8 text-slate-400 text-center border-dashed border-2 border-slate-200">
                  <div className="w-24 h-24 bg-slate-50 rounded-full mb-6 flex items-center justify-center shadow-inner">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-600 mb-2 font-[family-name:var(--font-heading)]">Ready to explore?</h3>
                  <p className="max-w-xs mx-auto text-slate-500">Select a category and product niche from the left to unlock detailed market intelligence.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section >

    </main>
  );
}
