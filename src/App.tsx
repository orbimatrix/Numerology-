import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calendar,
  User,
  Home,
  Phone,
  ChevronDown,
  ChevronUp,
  Info,
  Calculator,
  Grid3X3,
  TrendingUp,
  ShieldCheck,
  FileText
} from 'lucide-react';
import * as Logic from './numerologyLogic';
import { getMeaning, generateSummary } from './meanings';
import PrivacyPage from './PrivacyPage';
import TermsPage from './TermsPage';

// --- Components ---

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-3 mb-6 border-b border-amber-500/20 pb-2">
    <Icon className="w-6 h-6 text-amber-400" />
    <h2 className="text-2xl font-serif italic text-amber-100 uppercase tracking-widest">{title}</h2>
  </div>
);

const ResultCard = ({ title, result, category, description }: { title: string, result: Logic.NumerologyResult, category?: string, description?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const meaning = useMemo(() => {
    if (description) return description;
    if (category) return getMeaning(category, result);
    return `[Insert your ${title} ${result.value} meaning here]`;
  }, [description, category, result]);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 mb-4 hover:border-amber-500/30 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-zinc-400 text-xs font-mono uppercase tracking-tighter mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-serif text-amber-400">{result.value}</span>
            {result.isMaster && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30 uppercase font-bold">Master</span>}
            {result.isKarmic && <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/30 uppercase font-bold">Karmic Debt</span>}
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500"
        >
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      <div className="mt-4">
        <div className="text-xs font-mono text-zinc-500 bg-black/30 p-2 rounded border border-zinc-800/50 mb-3 overflow-x-auto whitespace-nowrap">
          <span className="text-amber-500/70 mr-2">Math:</span> {result.math}
        </div>
        <div className="text-sm text-zinc-300 leading-relaxed italic border-l-2 border-amber-500/20 pl-4 py-1 whitespace-pre-wrap">
          {meaning}
        </div>
      </div>
    </div>
  );
};

// PrivacyModal removed — now using separate pages

// --- Main App ---

type Page = 'home' | 'privacy' | 'terms';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [formData, setFormData] = useState({
    birthName: '',
    currentName: '',
    dob: '',
    partnerName: '',
    partnerDob: '',
    address: '',
    business: ''
  });

  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (!formData.birthName || !formData.dob) return null;

    const lifePath = Logic.calculateLifePath(formData.dob);
    const destiny = Logic.calculateDestiny(formData.birthName);
    const soulUrge = Logic.calculateSoulUrge(formData.birthName);
    const personality = Logic.calculatePersonality(formData.birthName);
    const birthday = Logic.calculateBirthdayNumber(formData.dob);

    const personalYear = Logic.calculatePersonalYear(formData.dob);
    const personalMonth = Logic.calculatePersonalMonth(personalYear.value);
    const personalDay = Logic.calculatePersonalDay(personalMonth.value);
    const pinnacles = Logic.calculatePinnacles(formData.dob);
    const challenges = Logic.calculateChallenges(formData.dob);
    const planes = Logic.calculatePlanes(formData.birthName);
    const inclusion = Logic.calculateInclusionGrid(formData.birthName);

    const addressNum = formData.address ? Logic.calculateApplied(formData.address) : null;
    const businessNum = formData.business ? Logic.calculateApplied(formData.business) : null;

    let compatibility = null;
    if (formData.partnerDob) {
      const partnerLifePath = Logic.calculateLifePath(formData.partnerDob);
      compatibility = {
        value: Logic.reduceNumber(lifePath.value + partnerLifePath.value).value,
        math: `Your LP(${lifePath.value}) + Partner LP(${partnerLifePath.value}) = ${lifePath.value + partnerLifePath.value} → ${Logic.reduceNumber(lifePath.value + partnerLifePath.value).value}`,
        isMaster: false,
        isKarmic: false
      };
    }

    return {
      lifePath, destiny, soulUrge, personality, birthday,
      personalYear, personalMonth, personalDay, pinnacles, challenges, planes, inclusion,
      addressNum, businessNum, compatibility
    };
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Render separate pages - MUST be after all hooks
  if (page === 'privacy') return <PrivacyPage onBack={() => setPage('home')} />;
  if (page === 'terms') return <TermsPage onBack={() => setPage('home')} />;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans selection:bg-amber-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Pythagorean System
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-500/50 mb-4">
            Celestial Numerology
          </h1>
          <p className="text-zinc-500 max-w-lg mx-auto font-light leading-relaxed">
            Unlock the hidden vibrations of your name and birth date. Discover your divine blueprint through the ancient science of numbers.
          </p>
        </header>

        {/* Input Dashboard */}
        <section className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl mb-12">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 ml-1">Full Birth Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    required
                    type="text"
                    name="birthName"
                    value={formData.birthName}
                    onChange={handleInputChange}
                    placeholder="As on birth certificate"
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 ml-1">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    required
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-amber-500/50 transition-colors text-zinc-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 ml-1">Current Name (Optional)</label>
                <input
                  type="text"
                  name="currentName"
                  value={formData.currentName}
                  onChange={handleInputChange}
                  placeholder="If different from birth name"
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-700"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 ml-1">Partner Name</label>
                  <input
                    type="text"
                    name="partnerName"
                    value={formData.partnerName}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 ml-1">Partner DOB</label>
                  <input
                    type="date"
                    name="partnerDob"
                    value={formData.partnerDob}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-500/50 transition-colors text-zinc-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 ml-1">Home Address</label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address for house number"
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 ml-1">Phone / Business</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    placeholder="Phone number or business name"
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-700"
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

        {/* Results Section */}
        <AnimatePresence>
          {showResults && results && (
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
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-zinc-800 text-center text-zinc-600 text-xs font-light space-y-2">
        <p>&copy; {new Date().getFullYear()} Celestial Numerology. All calculations based on the Pythagorean system.</p>
        <p>For entertainment purposes only. The numbers guide, but you decide.</p>
        <div className="mt-4 pt-4 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setPage('privacy')}
            className="text-zinc-500 hover:text-amber-400 transition-colors underline underline-offset-4 decoration-zinc-800 hover:decoration-amber-500/50 inline-flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3 h-3" />
            Privacy Policy
          </button>
          <span className="text-zinc-700">·</span>
          <button
            type="button"
            onClick={() => setPage('terms')}
            className="text-zinc-500 hover:text-amber-400 transition-colors underline underline-offset-4 decoration-zinc-800 hover:decoration-amber-500/50 inline-flex items-center gap-1.5"
          >
            <FileText className="w-3 h-3" />
            Terms of Condition
          </button>
        </div>
      </footer>
    </div>
  );
}
