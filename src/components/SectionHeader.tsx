import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
    icon: LucideIcon;
    title: string;
}

const SectionHeader = ({ icon: Icon, title }: SectionHeaderProps) => (
    <div className="flex items-center gap-3 mb-6 border-b border-amber-500/20 pb-2">
        <Icon className="w-6 h-6 text-amber-400" />
        <h2 className="text-2xl font-serif italic text-amber-100 uppercase tracking-widest">{title}</h2>
    </div>
);

export default SectionHeader;
