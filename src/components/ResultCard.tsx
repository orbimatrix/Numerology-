import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as Logic from '../numerologyLogic';
import { getMeaning } from '../meanings';

interface ResultCardProps {
    title: string;
    result: Logic.NumerologyResult;
    category?: string;
    description?: string;
}

const ResultCard = ({ title, result, category, description }: ResultCardProps) => {
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
                <div className="text-xs font-mono text-white/50 bg-black/30 p-2 rounded border border-zinc-800/50 mb-3 overflow-x-auto whitespace-nowrap">
                    <span className="text-amber-500/70 mr-2 uppercase tracking-tighter">Calculation:</span> {result.math}
                </div>
                <div className="text-base text-white/90 leading-relaxed italic border-l-2 border-amber-500/20 pl-4 py-1 whitespace-pre-wrap">
                    {meaning}
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
