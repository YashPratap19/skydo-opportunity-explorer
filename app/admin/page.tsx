"use client";

import { useState, useEffect } from "react";
import { LeadData } from "@/lib/types";
import { Card } from "@/components/ui/Card";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [leads, setLeads] = useState<(LeadData & { timestamp: string })[]>([]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsAuthenticated(true);
            fetchLeads();
        } else {
            alert("Invalid password");
        }
    };

    const fetchLeads = async () => {
        const res = await fetch("/api/leads");
        const data = await res.json();
        if (data.leads) {
            setLeads(data.leads.reverse());
        }
    };

    const downloadCSV = () => {
        const headers = ["Name", "Email", "Phone", "Product", "Category", "Time"];
        const rows = leads.map(l => [
            l.name,
            l.email,
            l.phone,
            l.selectedProduct,
            l.category,
            new Date(l.timestamp).toLocaleString()
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(c => `"${c}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "amazon_export_insights_leads.csv";
        a.click();
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[--color-brand-blue]"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-[--color-brand-dark] text-white py-2 rounded-lg font-medium">
                            Login
                        </button>
                    </form>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Leads Dashboard</h1>
                    <button
                        onClick={downloadCSV}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Download CSV
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-medium text-gray-600">Timestamp</th>
                                <th className="p-4 font-medium text-gray-600">Name</th>
                                <th className="p-4 font-medium text-gray-600">Product</th>
                                <th className="p-4 font-medium text-gray-600">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.map((lead, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="p-4 text-gray-500 text-sm whitespace-nowrap">
                                        {new Date(lead.timestamp).toLocaleDateString()} {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">{lead.name}</td>
                                    <td className="p-4 text-gray-600">
                                        <div className="font-medium text-gray-900">{lead.selectedProduct}</div>
                                        <div className="text-xs text-gray-500">{lead.category}</div>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm">
                                        <div>{lead.email}</div>
                                        <div>{lead.phone}</div>
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">No leads captured yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
