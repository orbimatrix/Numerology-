import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Compass, Star, Moon, Sun, BookOpen, Heart } from 'lucide-react';
import Footer from './Footer';

interface LandingPageProps {
    onStart: () => void;
    onPrivacyClick: () => void;
    onTermsClick: () => void;
}

const features = [
    {
        icon: <Compass className="w-8 h-8 text-amber-500" />,
        title: "Life Path Discovery",
        description: "Unveil your core purpose and the unique journey you are destined to travel in this lifetime."
    },
    {
        icon: <Star className="w-8 h-8 text-amber-500" />,
        title: "Destiny Number",
        description: "Understand the natural talents and abilities encoded within your full birth name."
    },
    {
        icon: <Heart className="w-8 h-8 text-amber-500" />,
        title: "Soul Urge",
        description: "Reveal the hidden motivations and deepest desires that drive your everyday actions."
    },
    {
        icon: <Moon className="w-8 h-8 text-amber-500" />,
        title: "Personality Profile",
        description: "See how the world perceives you and the initial impression you leave on others."
    },
    {
        icon: <Sun className="w-8 h-8 text-amber-500" />,
        title: "Predictive Cycles",
        description: "Navigate the ebb and flow of your life with Personal Year, Month, and Day forecasts."
    },
    {
        icon: <BookOpen className="w-8 h-8 text-amber-500" />,
        title: "Pinnacles & Challenges",
        description: "Prepare for the four major life cycles and the specific lessons you are meant to learn."
    }
];

const LandingPage = ({ onStart, onPrivacyClick, onTermsClick }: LandingPageProps) => {
    return (
        <div className="relative z-10 w-full overflow-hidden flex flex-col min-h-screen">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 text-center relative max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-20"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold uppercase tracking-widest mb-10">
                            <Sparkles className="w-4 h-4" />
                            Pythagorean System
                        </div>

                        <h1 className="text-7xl md:text-9xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-500/50 mb-8 drop-shadow-lg leading-tight">
                            Celestial Numerology
                        </h1>

                        <p className="text-white/80 text-xl md:text-3xl font-light leading-relaxed mb-16 max-w-3xl mx-auto">
                            Unlock the hidden vibrations of your name and birth date. Discover your divine blueprint through the ancient science of numbers.
                        </p>

                        <motion.button
                            onClick={onStart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-bold text-xl md:text-2xl px-12 py-6 rounded-full overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:shadow-[0_0_60px_rgba(245,158,11,0.4)] transition-all"
                        >
                            <span className="relative z-10">Begin Your Journey</span>
                            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 relative z-10 group-hover:translate-x-2 transition-transform" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </motion.button>
                    </motion.div>

                    {/* Decorative background glow behind hero text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
                </section>

                {/* Features Section */}
                <section className="py-24 px-6 max-w-6xl mx-auto relative z-20">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-serif italic text-amber-100 mb-6">What You Will Discover</h2>
                        <div className="w-24 h-1 bg-amber-500/50 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-black/40 backdrop-blur-sm border border-zinc-800 p-10 rounded-[2rem] hover:border-amber-500/30 transition-colors group"
                            >
                                <div className="mb-6 p-4 bg-amber-500/10 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-serif text-white/90 mb-4">{feature.title}</h3>
                                <p className="text-white/60 leading-relaxed text-lg">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-32 px-6 text-center relative z-20 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-b from-zinc-900/80 to-black border border-zinc-800/50 p-16 md:p-24 rounded-[3rem] shadow-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif italic text-amber-100 mb-8">Ready to decode your destiny?</h2>
                        <button
                            onClick={onStart}
                            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-xl uppercase tracking-widest border-b-2 border-amber-500/30 hover:border-amber-400 pb-2 transition-all"
                        >
                            Enter the Calculator <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </section>
            </main>

            <div className="max-w-4xl mx-auto w-full">
                <Footer onPrivacyClick={onPrivacyClick} onTermsClick={onTermsClick} />
            </div>
        </div>
    );
};

export default LandingPage;
