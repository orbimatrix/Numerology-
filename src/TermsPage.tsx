import { motion } from 'motion/react';
import { FileText, ArrowLeft, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';

interface TermsPageProps {
    onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
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
                        <FileText className="w-3 h-3" />
                        Terms of Condition
                    </div>
                    <h1 className="text-5xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-white/60 font-light leading-relaxed">
                        Please read these terms carefully before using Celestial Numerology.
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
                                <Sparkles className="w-5 h-5 text-amber-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Entertainment Purposes Only</h2>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            Celestial Numerology is designed purely for <strong className="text-amber-400">entertainment and self-reflection</strong>. The celestial numbers guide, but you decide your own destiny. Numerology results should not be used as a substitute for professional advice — medical, legal, financial, or otherwise.
                        </p>
                    </div>

                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-amber-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">No Guarantees</h2>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            The app and its creators make <strong className="text-amber-400">no guarantees</strong> about the accuracy, completeness, or applicability of any numerological calculation or interpretation. Results are generated based on the traditional Pythagorean system and are provided "as is" for your enjoyment.
                        </p>
                    </div>

                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <RefreshCw className="w-5 h-5 text-amber-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Changes to Terms</h2>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                            We reserve the right to update these terms at any time. Continued use of the application after any changes constitutes your acceptance of the new terms. As always, the source code remains <strong className="text-amber-400">open and transparent</strong> for anyone to review.
                        </p>
                    </div>

                    {/* Agreement box */}
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 mt-8">
                        <p className="text-white/70 text-sm leading-relaxed text-center">
                            By using Celestial Numerology, you acknowledge that you have read, understood, and agree to these Terms of Condition and our Privacy Policy. Remember — <span className="text-amber-400 font-medium italic">the stars illuminate the path, but you walk it.</span>
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
