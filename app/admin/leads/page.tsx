"use client";

import { useState, useEffect } from "react";

interface Lead {
    id: string;
    submittedAt: string;
    name: string;
    email: string;
    phone: string;
    product: string;
    countryOfInterest: string;
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeads() {
            try {
                const res = await fetch('/api/leads');
                const data = await res.json();
                if (data.leads) {
                    // Sort by newest first
                    setLeads(data.leads.reverse());
                }
            } catch (e) {
                console.error("Failed to fetch leads", e);
            } finally {
                setLoading(false);
            }
        }
        fetchLeads();
    }, []);

    return (
        <main className="min-h-screen bg-[#F8FAFC] pb-20 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Lead Submissions</h1>
                        <p className="text-slate-500">View and manage potential clients interested in market reports.</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                        <span className="text-slate-500 text-sm font-medium">Total Leads:</span>
                        <span className="ml-2 text-xl font-bold text-blue-600">{leads.length}</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="glass-panel rounded-3xl overflow-hidden shadow-lg border border-slate-200/60">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200">
                                        <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider">Name</th>
                                        <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider">Contact</th>
                                        <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider">Interest</th>
                                        <th className="p-5 font-bold text-sm text-slate-500 uppercase tracking-wider">Market</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {leads.length > 0 ? (
                                        leads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="p-5 text-sm text-slate-600 whitespace-nowrap">
                                                    {lead.submittedAt ? new Date(lead.submittedAt).toLocaleDateString() : 'N/A'}
                                                    <div className="text-xs text-slate-400">
                                                        {lead.submittedAt ? new Date(lead.submittedAt).toLocaleTimeString() : ''}
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="font-semibold text-slate-900">{lead.name}</div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="text-sm text-slate-700">{lead.email}</div>
                                                    <div className="text-sm text-slate-500">{lead.phone}</div>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {lead.product}
                                                    </span>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                                        {lead.countryOfInterest === 'usa' ? '🇺🇸 United States' : lead.countryOfInterest}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-12 text-center text-slate-400">
                                                No leads found yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
