"use client";

import { useState } from "react";
import { LeadData } from "@/lib/types";
import { Card } from "@/components/ui/Card";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [leads, setLeads] = useState<LeadData[]>([]);
    const [authError, setAuthError] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError(false);
        setIsAuthenticated(true);
        fetchLeads(password);
    };

    const fetchLeads = async (token: string) => {
        try {
            const res = await fetch(`/api/leads?token=${encodeURIComponent(token)}`);
            if (res.status === 401) {
                setIsAuthenticated(false);
                setAuthError(true);
                return;
            }
            const data = await res.json();
            if (data.leads) {
                setLeads(data.leads.reverse());
            }
        } catch {
            setIsAuthenticated(false);
            setAuthError(true);
        }
    };

    const downloadCSV = () => {
        const headers = ["Name", "Email", "Phone", "Product", "Market", "Time"];
        const rows = leads.map(l => [
            l.name,
            l.email,
            l.phone,
            l.product,
            l.countryOfInterest,
            new Date(l.submittedAt).toLocaleString()
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(c => `"${c}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "indian_global_sellers_leads.csv";
        a.click();
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <Card className="w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold mb-2 text-center text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500 text-sm text-center mb-6">Enter your admin token to access lead data.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Admin token"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            value={password}
                            onChange={e => { setPassword(e.target.value); setAuthError(false); }}
                            aria-label="Admin token"
                        />
                        {authError && (
                            <p className="text-red-500 text-sm text-center font-medium">Invalid token. Please try again.</p>
                        )}
                        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                            Login
                        </button>
                    </form>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Leads Dashboard</h1>
                        <p className="text-slate-500 text-sm mt-1">{leads.length} total lead{leads.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={downloadCSV}
                            disabled={leads.length === 0}
                            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Download CSV
                        </button>
                        <button
                            onClick={() => { setIsAuthenticated(false); setPassword(""); setLeads([]); }}
                            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-300 transition font-medium text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">Date</th>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">Name</th>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">Product</th>
                                    <th className="p-4 font-semibold text-slate-600 text-sm">Contact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-slate-500 text-sm whitespace-nowrap">
                                            <div>{new Date(lead.submittedAt).toLocaleDateString()}</div>
                                            <div className="text-xs text-slate-400">{new Date(lead.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td className="p-4 font-medium text-slate-900">{lead.name}</td>
                                        <td className="p-4 text-slate-600">
                                            <div className="font-medium text-slate-900">{lead.product}</div>
                                            <div className="text-xs text-slate-500">{lead.countryOfInterest}</div>
                                        </td>
                                        <td className="p-4 text-slate-600 text-sm">
                                            <div>{lead.email}</div>
                                            <div className="text-slate-400">{lead.phone}</div>
                                        </td>
                                    </tr>
                                ))}
                                {leads.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center text-slate-400">No leads captured yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
