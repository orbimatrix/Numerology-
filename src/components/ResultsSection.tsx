import { motion } from 'motion/react';
import { Sparkles, Info, Calculator, TrendingUp, ShieldCheck, Grid3X3 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import ResultCard from './ResultCard';
import { generateSummary } from '../meanings';

interface ResultsSectionProps {
    results: any;
}

const ResultsSection = ({ results }: ResultsSectionProps) => {
    if (!results) return null;

    return (
        <motion.div
            id="results-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16 pb-24"
        >
            {/* Overall Summary */}
            <section className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-24 h-24 text-amber-500" />
                </div>
                <h2 className="text-3xl font-serif italic text-amber-100 mb-6 flex items-center gap-3">
                    <Info className="w-6 h-6 text-amber-400" />
                    Overall Profile Summary
                </h2>
                <div className="text-lg text-zinc-300 leading-relaxed font-light whitespace-pre-wrap max-w-2xl">
                    {generateSummary(results)}
                </div>
            </section>

            {/* The Big Five */}
            <section>
                <SectionHeader icon={Calculator} title="The Core Numbers" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ResultCard title="Life Path Number" result={results.lifePath} category="lifePath" />
                    <ResultCard title="Destiny / Expression" result={results.destiny} category="destiny" />
                    <ResultCard title="Soul Urge" result={results.soulUrge} category="soulUrge" />
                    <ResultCard title="Personality" result={results.personality} category="personality" />
                    <ResultCard title="Birthday Number" result={results.birthday} category="birthday" />
                </div>
            </section>

            {/* Predictive Cycles */}
            <section>
                <SectionHeader icon={TrendingUp} title="Predictive Cycles" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ResultCard title="Personal Year Cycle" result={results.personalYear} category="personalYear" />
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard title="Personal Month" result={results.personalMonth} category="personalMonth" />
                        <ResultCard title="Personal Day" result={results.personalDay} category="personalDay" />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl text-center">
                            <span className="block text-[10px] text-zinc-500 uppercase mb-1">1st Pinnacle</span>
                            <span className="text-3xl font-serif text-amber-400">{results.pinnacles.p1.value}</span>
                        </div>
                        <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl text-center">
                            <span className="block text-[10px] text-zinc-500 uppercase mb-1">2nd Pinnacle</span>
                            <span className="text-3xl font-serif text-amber-400">{results.pinnacles.p2.value}</span>
                        </div>
                        <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl text-center">
                            <span className="block text-[10px] text-zinc-500 uppercase mb-1">3rd Pinnacle</span>
                            <span className="text-3xl font-serif text-amber-400">{results.pinnacles.p3.value}</span>
                        </div>
                        <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl text-center">
                            <span className="block text-[10px] text-zinc-500 uppercase mb-1">4th Pinnacle</span>
                            <span className="text-3xl font-serif text-amber-400">{results.pinnacles.p4.value}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strengths & Weaknesses */}
            <section>
                <SectionHeader icon={ShieldCheck} title="Strengths & Challenges" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Challenges */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-mono text-zinc-500 uppercase mb-4">Challenge Numbers</h3>
                        {Object.entries(results.challenges).map(([key, c]: [string, any]) => (
                            <div key={key} className="flex items-center justify-between bg-zinc-900/30 p-3 rounded-lg border border-zinc-800">
                                <span className="text-xs text-zinc-400 uppercase">{key.replace('c', 'Challenge ')}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-zinc-600">{c.math}</span>
                                    <span className="text-xl font-serif text-amber-400">{c.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Planes of Expression */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-mono text-zinc-500 uppercase mb-4">Planes of Expression</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(results.planes).map(([plane, count]) => (
                                <div key={plane} className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800 text-center">
                                    <span className="block text-[10px] text-zinc-500 uppercase mb-1">{plane}</span>
                                    <span className="text-2xl font-serif text-amber-400">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Inclusion Grid */}
                <div className="mt-12">
                    <h3 className="text-sm font-mono text-zinc-500 uppercase mb-6 text-center">Inclusion Grid (Frequency)</h3>
                    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <div
                                key={num}
                                className={`aspect-square flex flex-col items-center justify-center rounded-xl border transition-all ${results.inclusion[num] > 0
                                        ? 'bg-amber-500/10 border-amber-500/40'
                                        : 'bg-zinc-900/20 border-zinc-800 opacity-40'
                                    }`}
                            >
                                <span className="text-xs text-zinc-500 mb-1">{num}</span>
                                <span className="text-xl font-serif text-amber-400">{results.inclusion[num]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Applied Numerology */}
            <section>
                <SectionHeader icon={Grid3X3} title="Applied Numerology" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.addressNum && <ResultCard title="House / Address Number" result={results.addressNum} category="address" />}
                    {results.businessNum && <ResultCard title="Phone / Business Number" result={results.businessNum} category="business" />}
                    {results.compatibility && <ResultCard title="Compatibility Number" result={results.compatibility} category="compatibility" />}
                </div>
            </section>
        </motion.div>
    );
};

export default ResultsSection;
