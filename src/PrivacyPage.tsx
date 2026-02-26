import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft, Lock, Eye, Code, Info } from 'lucide-react';

interface PrivacyPageProps {
    onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-amber-500/30">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/20 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 max-w-3xl mx-auto px-6 py-12">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors mb-10 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to App
                </motion.button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-3 h-3" />
                        Privacy Policy
                    </div>
                    <h1 className="text-5xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4">
                        Your Privacy Matters
                    </h1>
                    <p className="text-white/60 font-light leading-relaxed">
                        We believe in complete transparency about how your data is handled. Here's everything you need to know.
                    </p>
                </motion.div>

                {/* Content Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-amber-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Zero Data Retention</h2>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            We do <strong className="text-amber-400">not store</strong> your name, birth date, numbers, or any personal information. The data you enter is used exclusively to generate results locally in your browser and is never transmitted to any server or database.
                        </p>
                    </div>

                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <Eye className="w-5 h-5 text-amber-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Privacy Guarantee</h2>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            We deeply respect your privacy and are committed to never misusing your information. You simply enter your data, receive your numerology results, and everything stays <strong className="text-amber-400">completely private</strong>. No cookies tracking personal data, no analytics tied to your identity.
                        </p>
                    </div>

                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <Code className="w-5 h-5 text-amber-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Open Source Transparency</h2>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            This application is <strong className="text-amber-400">fully open source</strong>. If you don't trust our word, you are welcome — and encouraged — to inspect the source code yourself. Every calculation happens client-side, and you can verify that absolutely nothing is stored, sent, or saved anywhere.
                        </p>
                    </div>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-white/40 text-sm mt-12"
                >
                    Last updated: February 2026 — Celestial Numerology
                </motion.p>
            </main>
        </div>
    );
}
