import { useState } from 'react';

interface LeadCaptureFormProps {
    product: string;
    country: string;
    onSuccess: () => void;
}

export function LeadCaptureForm({ product, country, onSuccess }: LeadCaptureFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (name.trim().length < 2) {
            setError('Please enter a valid name');
            setLoading(false);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
            setError('Please enter a valid phone number (10 digits minimum)');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: cleanPhone, countryCode, product, country }),
            });

            if (!response.ok) throw new Error('Failed to submit');

            setSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 2000);
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center p-6 animate-fade-in-up" role="status">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-600">Our expert researchers will create your report and share it to your email within 24 hours.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="text-left w-full max-w-sm mx-auto" aria-label="Lead capture form">
            <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">Unlock Full Analysis</h3>
            <p className="text-slate-500 mb-6 text-center text-sm">Get detailed insights for <b>{product}</b> sent to your inbox.</p>

            <div className="space-y-4">
                <div>
                    <label htmlFor="lead-name" className="sr-only">Full Name</label>
                    <input
                        id="lead-name"
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                        required
                        aria-required="true"
                    />
                </div>
                <div>
                    <label htmlFor="lead-email" className="sr-only">Work Email</label>
                    <input
                        id="lead-email"
                        type="email"
                        placeholder="Work Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                        required
                        aria-required="true"
                    />
                </div>
                <fieldset className="flex gap-2">
                    <legend className="sr-only">Phone number with country code</legend>
                    <label htmlFor="lead-country-code" className="sr-only">Country code</label>
                    <select
                        id="lead-country-code"
                        value={countryCode}
                        onChange={e => setCountryCode(e.target.value)}
                        className="w-24 px-2 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                    >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+971">+971</option>
                        <option value="+49">+49</option>
                        <option value="+81">+81</option>
                        <option value="+86">+86</option>
                        <option value="+65">+65</option>
                    </select>
                    <label htmlFor="lead-phone" className="sr-only">Phone number</label>
                    <input
                        id="lead-phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                        required
                        aria-required="true"
                    />
                </fieldset>

                {error && <p className="text-red-500 text-xs text-center font-medium" role="alert">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#EA580C] hover:bg-[#C2410C] disabled:bg-slate-300 text-white font-bold text-lg py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 active:translate-y-0 mt-2"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                            Processing...
                        </span>
                    ) : "Get Free Report"}
                </button>
            </div>
        </form>
    );
}
