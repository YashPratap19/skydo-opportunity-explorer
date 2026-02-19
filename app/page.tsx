"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { SelectionPanel } from "@/components/dashboard/SelectionPanel";
import { InsightsCard } from "@/components/dashboard/InsightsCard";
import { ProductShowcase } from "@/components/dashboard/ProductShowcase";
import { OpportunityRow } from "@/lib/types";
import { generateInsights } from "@/lib/utils/random-insights";
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
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setDataError(false);
        const response = await fetch(`/data/${selectedCountry}.csv`);
        if (!response.ok) throw new Error("Failed to load country data");

        const csvText = await response.text();
        const { data: parsedData } = Papa.parse<OpportunityRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        });

        const validData = parsedData.filter((row: OpportunityRow) => row.Category && row.Product);
        setData(validData);
        const uniqueCategories = Array.from(new Set(validData.map((row: OpportunityRow) => row.Category))).filter(Boolean) as string[];
        setCategories(uniqueCategories);
      } catch {
        setDataError(true);
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
    setIsLocked(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const productData = data.find(p => p.Product === selectedProduct);
    if (productData) {
      const insights = generateInsights(selectedCategory, selectedProduct);
      setCurrentOpportunity(insights);
    }

    setLoadingInsights(false);

    // Scroll to the lead capture form slightly after loading finishes
    setTimeout(() => {
      scrollTo("lead-form");
    }, 100);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      <InteractiveBackground />

      {/* Header */}
      <header className="relative z-10 w-full border-b border-indigo-100/50 bg-white/50 backdrop-blur-md sticky top-0" role="banner">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group cursor-pointer" aria-label="Indian Global Sellers - Home">
            <div className="relative w-48 h-12 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Indian Global Sellers"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            <span className="flex items-center gap-2 text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></span>
              LIVE DATA
            </span>
            <button onClick={() => scrollTo('methodology')} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Methodology</button>
            <button onClick={() => scrollTo('about')} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">About</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 md:pt-12" aria-label="Hero">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" aria-hidden="true"></span>
              Market Intelligence v2.0
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[--color-brand-primary] mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Find your next winning <span className="block animate-text-shine pb-2">Amazon export product</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
              Product-level insights on demand, competition, unit economics, and risk — built for Indian sellers scaling globally.
            </p>
            <button
              onClick={() => scrollTo('selection-panel')}
              className="mt-6 inline-flex items-center gap-3 bg-slate-900 border border-slate-700/50 text-white font-bold text-base px-8 py-4 rounded-full shadow-[0_0_40px_-10px_rgba(15,23,42,0.4)] hover:shadow-[0_0_60px_-15px_rgba(15,23,42,0.6)] hover:-translate-y-1 hover:bg-slate-800 active:translate-y-0 active:scale-[0.98] transition-all duration-300 group"
            >
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-cyan-200 transition-colors">Explore Products</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </div>

          <div className="h-[300px] w-full relative">
            <ProductShowcase />
          </div>
        </div>

        {/* Selection + Insights */}
        <div id="selection-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24">
          <div className="lg:col-span-4 relative z-20 sticky top-28">
            {dataError ? (
              <div className="glass-panel rounded-3xl p-6 md:p-8 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Unable to load data</h3>
                <p className="text-slate-500 text-sm mb-4">There was a problem loading product data. Please try again.</p>
                <button onClick={() => window.location.reload()} className="text-blue-600 font-medium text-sm hover:underline">Refresh page</button>
              </div>
            ) : (
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
            )}
          </div>

          <div className="lg:col-span-8 w-full relative z-10">
            <div className="transition-all duration-500">
              <InsightsCard
                data={showInsights ? currentOpportunity : null}
                loading={loadingInsights}
                isLocked={isLocked}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="relative z-10 scroll-mt-24 mt-24" aria-label="Methodology">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="glass-panel rounded-3xl p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" aria-hidden="true"></span>
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-8 font-[family-name:var(--font-heading)]">
              Our Scoring Methodology
            </h2>
            <p className="text-slate-500 text-lg max-w-3xl mb-10 leading-relaxed">
              Each product is evaluated across six dimensions using a composite scoring model. Scores range from 0 to 100, where higher is better (except Compliance Risk, where lower is safer).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Consumer Demand", desc: "Measures search volume, purchase frequency, and buyer intent signals across the target marketplace.", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
                { title: "Growth Potential", desc: "Evaluates year-over-year category growth, seasonal trends, and emerging market signals.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
                { title: "Competition Level", desc: "Analyzes seller density, review concentration, brand dominance, and new entrant success rate.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                { title: "Unit Economics", desc: "Calculates estimated margins after manufacturing, shipping, FBA fees, PPC costs, and returns.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                { title: "Differentiation", desc: "Assesses opportunity for product improvements, private labeling, bundling, and unique value propositions.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
                { title: "Compliance Risk", desc: "Flags regulatory, certification, and import restriction risks. Lower scores indicate fewer compliance hurdles.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              ].map((metric) => (
                <div key={metric.title} className="p-6 rounded-2xl bg-white/50 border border-slate-100/50 hover:bg-white/80 hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={metric.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{metric.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{metric.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 scroll-mt-24 mt-16" aria-label="About">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="glass-panel-dark rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" aria-hidden="true"></span>
                  About Us
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6 font-[family-name:var(--font-heading)]">
                  Built for Indian Sellers, by Indian Global Sellers
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  We help Indian exporters identify high-potential Amazon product opportunities across global marketplaces. Our intelligence platform combines marketplace data, category analysis, and competitive insights to give you an edge.
                </p>
                <div className="space-y-4">
                  {[
                    "10,000+ product niches analyzed across US marketplace",
                    "Six-dimensional scoring for comprehensive evaluation",
                    "Built specifically for Indian exporter requirements",
                    "Curated reports delivered by expert researchers",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-slate-300 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "10K+", label: "Products Tracked" },
                    { value: "25+", label: "Categories" },
                    { value: "6", label: "Scoring Dimensions" },
                    { value: "24hr", label: "Report Delivery" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                      <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-slate-200/50 bg-white/30 backdrop-blur-sm" role="contentinfo">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="relative w-40 h-10 mb-4">
                <Image src="/logo.png" alt="Indian Global Sellers" fill className="object-contain object-left" />
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                Helping Indian exporters discover high-potential Amazon product opportunities with data-driven market intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollTo('selection-panel')} className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Explore Products</button></li>
                <li><button onClick={() => scrollTo('methodology')} className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Methodology</button></li>
                <li><button onClick={() => scrollTo('about')} className="text-slate-500 hover:text-slate-900 text-sm transition-colors">About Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><span className="text-slate-400 text-sm">Privacy Policy</span></li>
                <li><span className="text-slate-400 text-sm">Terms of Service</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Indian Global Sellers. All rights reserved.</p>
            <p className="text-slate-400 text-xs">Data is indicative and for research purposes only. Not financial advice.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
