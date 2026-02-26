import React from 'react';
import { User, Calendar, Home, Phone } from 'lucide-react';

interface FormData {
    birthName: string;
    currentName: string;
    dob: string;
    partnerName: string;
    partnerDob: string;
    address: string;
    business: string;
}

interface NumerologyFormProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const NumerologyForm = ({ formData, onChange, onSubmit }: NumerologyFormProps) => {
    return (
        <section className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl mb-12">
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 ml-1 font-medium">Full Birth Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                required
                                type="text"
                                name="birthName"
                                value={formData.birthName}
                                onChange={onChange}
                                placeholder="As on birth certificate"
                                className="w-full bg-black/40 border border-zinc-800 rounded-xl py-4 pl-10 pr-4 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-white/20 text-white text-lg"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 ml-1 font-medium">Date of Birth</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                required
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={onChange}
                                className="w-full bg-black/40 border border-zinc-800 rounded-xl py-4 pl-10 pr-4 focus:outline-none focus:border-amber-500/50 transition-colors text-white text-lg"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 ml-1 font-medium">Current Name (Optional)</label>
                        <input
                            type="text"
                            name="currentName"
                            value={formData.currentName}
                            onChange={onChange}
                            placeholder="If different from birth name"
                            className="w-full bg-black/40 border border-zinc-800 rounded-xl py-4 px-4 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-white/20 text-white text-lg"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 ml-1 font-medium">Partner Name</label>
                            <input
                                type="text"
                                name="partnerName"
                                value={formData.partnerName}
                                onChange={onChange}
                                className="w-full bg-black/40 border border-zinc-800 rounded-xl py-4 px-4 focus:outline-none focus:border-amber-500/50 transition-colors text-white text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 ml-1 font-medium">Partner DOB</label>
                            <input
                                type="date"
                                name="partnerDob"
                                value={formData.partnerDob}
                                onChange={onChange}
                                className="w-full bg-black/40 border border-zinc-800 rounded-xl py-4 px-4 focus:outline-none focus:border-amber-500/50 transition-colors text-white text-lg"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 ml-1 font-medium">Home Address</label>
                        <div className="relative">
                            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={onChange}
                                placeholder="Street address for house number"
                                className="w-full bg-black/40 border border-zinc-800 rounded-xl py-4 pl-10 pr-4 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-white/20 text-white text-lg"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 ml-1 font-medium">Phone / Business</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                type="text"
                                name="business"
                                value={formData.business}
                                onChange={onChange}
                                placeholder="Phone number or business name"
                                className="w-full bg-black/40 border border-zinc-800 rounded-xl py-4 pl-10 pr-4 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-white/20 text-white text-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-400 text-black font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-[0.98]"
                    >
                        Generate Divine Profile
                    </button>
                </div>
            </form>
        </section>
    );
};

export default NumerologyForm;
