import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  FileText,
  ArrowLeft,
  Github
} from 'lucide-react';
import * as Logic from './numerologyLogic';
import PrivacyPage from './PrivacyPage';
import TermsPage from './TermsPage';
import NumerologyForm from './components/NumerologyForm';
import ResultsSection from './components/ResultsSection';
import LandingPage from './components/LandingPage';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

// --- Main App ---

type Page = 'landing' | 'calculator' | 'privacy' | 'terms';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
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
  if (page === 'privacy') return <PrivacyPage onBack={() => setPage('calculator')} />;
  if (page === 'terms') return <TermsPage onBack={() => setPage('calculator')} />;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans selection:bg-amber-500/30">
      {/* Mobile Hamburger Nav – always visible on small screens */}
      <Navbar
        onHomeClick={() => setPage('landing')}
        onPrivacyClick={() => setPage('privacy')}
        onTermsClick={() => setPage('terms')}
      />

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/20 rounded-full blur-[120px]" />
      </div>

      {page === 'landing' ? (
        <LandingPage
          onStart={() => setPage('calculator')}
          onPrivacyClick={() => setPage('privacy')}
          onTermsClick={() => setPage('terms')}
        />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12">
            {/* Header */}
            <header className="relative text-center mb-16">
              <button
                onClick={() => setPage('landing')}
                className="absolute left-0 top-0 hidden md:flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>

              <div className="md:hidden flex justify-start mb-8">
                <button
                  onClick={() => setPage('landing')}
                  className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Sparkles className="w-3 h-3" />
                Pythagorean System
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-500/50 mb-4 break-words leading-tight">
                Celestial Numerology
              </h1>
              <p className="text-white/80 max-w-lg mx-auto font-light leading-relaxed text-base md:text-lg px-2">
                Unlock the hidden vibrations of your name and birth date. Discover your divine blueprint through the ancient science of numbers.
              </p>
            </header>

            {/* Input Dashboard */}
            <NumerologyForm
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />

            {/* Results Section */}
            <AnimatePresence>
              {showResults && results && <ResultsSection results={results} />}
            </AnimatePresence>
          </main>

          {/* Footer */}
          <div className="max-w-4xl mx-auto w-full">
            <Footer
              onPrivacyClick={() => setPage('privacy')}
              onTermsClick={() => setPage('terms')}
            />
          </div>
        </div>
      )}
    </div>
  );
}
