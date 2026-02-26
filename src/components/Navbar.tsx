import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, ShieldCheck, FileText, Github } from 'lucide-react';

interface NavbarProps {
    onHomeClick: () => void;
    onPrivacyClick: () => void;
    onTermsClick: () => void;
}

const Navbar = ({ onHomeClick, onPrivacyClick, onTermsClick }: NavbarProps) => {
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    const navItems = [
        {
            icon: <Home className="w-5 h-5" />,
            label: 'Home',
            onClick: () => { onHomeClick(); close(); }
        },
        {
            icon: <ShieldCheck className="w-5 h-5" />,
            label: 'Privacy Policy',
            onClick: () => { onPrivacyClick(); close(); }
        },
        {
            icon: <FileText className="w-5 h-5" />,
            label: 'Terms of Condition',
            onClick: () => { onTermsClick(); close(); }
        },
        {
            icon: <Github className="w-5 h-5" />,
            label: 'GitHub',
            onClick: () => { window.open('https://github.com/orbimatrix/Numerology-', '_blank'); close(); }
        }
    ];

    return (
        <>
            {/* Hamburger button — visible only on mobile */}
            <button
                className="fixed top-4 right-4 z-50 md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-md text-white/80 hover:text-amber-400 hover:border-amber-500/40 transition-all shadow-lg"
                onClick={() => setOpen(prev => !prev)}
                aria-label="Toggle menu"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-5 h-5" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="w-5 h-5" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        onClick={close}
                    />
                )}
            </AnimatePresence>

            {/* Slide-in Drawer */}
            <AnimatePresence>
                {open && (
                    <motion.nav
                        key="drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-72 z-50 bg-zinc-950/95 border-l border-zinc-800 backdrop-blur-xl flex flex-col md:hidden shadow-2xl"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-6 py-6 border-b border-zinc-800">
                            <div className="flex items-center gap-2 text-amber-400">
                                <span className="font-serif italic text-xl">Celestial Numerology</span>
                            </div>
                            <button onClick={close} className="text-white/50 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex flex-col gap-1 px-4 py-6 flex-grow">
                            {navItems.map((item, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.3 }}
                                    onClick={item.onClick}
                                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-white/70 hover:text-amber-400 hover:bg-amber-500/5 transition-all text-left font-medium text-base group"
                                >
                                    <span className="text-amber-500/70 group-hover:text-amber-400 transition-colors">{item.icon}</span>
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>

                        {/* Drawer Footer */}
                        <div className="px-6 py-6 border-t border-zinc-800 text-center text-white/30 text-xs">
                            &copy; {new Date().getFullYear()} Celestial Numerology
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
