import { ShieldCheck, FileText, Github } from 'lucide-react';

interface FooterProps {
    onPrivacyClick: () => void;
    onTermsClick: () => void;
}

const Footer = ({ onPrivacyClick, onTermsClick }: FooterProps) => {
    return (
        <footer className="w-full px-6 py-12 border-t border-zinc-800 text-center text-white/50 text-sm font-light space-y-4">
            <p>&copy; {new Date().getFullYear()} Celestial Numerology. All calculations based on the Pythagorean system.</p>
            <p>For entertainment purposes only. The numbers guide, but you decide.</p>
            <div className="mt-4 pt-4 flex flex-wrap items-center justify-center gap-6 md:gap-8">
                <button
                    type="button"
                    onClick={onPrivacyClick}
                    className="text-white/70 hover:text-amber-400 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-amber-500/50 inline-flex items-center gap-2 font-medium"
                >
                    <ShieldCheck className="w-4 h-4" />
                    Privacy Policy
                </button>
                <span className="hidden md:inline text-zinc-800 text-lg">·</span>
                <button
                    type="button"
                    onClick={onTermsClick}
                    className="text-white/70 hover:text-amber-400 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-amber-500/50 inline-flex items-center gap-2 font-medium"
                >
                    <FileText className="w-4 h-4" />
                    Terms of Condition
                </button>
                <span className="hidden md:inline text-zinc-800 text-lg">·</span>
                <a
                    href="https://github.com/orbimatrix/Numerology-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-amber-400 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-amber-500/50 inline-flex items-center gap-2 font-medium"
                >
                    <Github className="w-4 h-4" />
                    GitHub
                </a>
            </div>
        </footer>
    );
};

export default Footer;
