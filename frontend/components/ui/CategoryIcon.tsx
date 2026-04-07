import { Dog, Cat, Bird, Fish, Rabbit, Bone, HeartPulse, PawPrint } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  'dog-supplies': Dog, 'dogs': Dog,
  'cat-products': Cat, 'cats': Cat,
  'bird-supplies': Bird, 'birds': Bird,
  'fish-aquatics': Fish, 'fish': Fish,
  'small-pets': Rabbit,
  'pet-accessories': Bone,
  'pet-health': HeartPulse,
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  'dog-supplies': { bg: 'bg-[#D4763C]/10', text: 'text-[#D4763C]' },
  'dogs': { bg: 'bg-[#D4763C]/10', text: 'text-[#D4763C]' },
  'cat-products': { bg: 'bg-[#7C3AED]/10', text: 'text-[#7C3AED]' },
  'cats': { bg: 'bg-[#7C3AED]/10', text: 'text-[#7C3AED]' },
  'bird-supplies': { bg: 'bg-[#0EA5E9]/10', text: 'text-[#0EA5E9]' },
  'birds': { bg: 'bg-[#0EA5E9]/10', text: 'text-[#0EA5E9]' },
  'fish-aquatics': { bg: 'bg-[#0D9488]/10', text: 'text-[#0D9488]' },
  'fish': { bg: 'bg-[#0D9488]/10', text: 'text-[#0D9488]' },
  'small-pets': { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]' },
  'pet-health': { bg: 'bg-[#059669]/10', text: 'text-[#059669]' },
  'pet-accessories': { bg: 'bg-[#6366F1]/10', text: 'text-[#6366F1]' },
};

const defaultColor = { bg: 'bg-amber-500/10', text: 'text-amber-500' };

export default function CategoryIcon({ slug, className = '', size = 'md' }: { slug: string; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const containerSizes = { sm: 'w-10 h-10', md: 'w-12 h-12', lg: 'w-16 h-16' };
  const iconSizes = { sm: 'w-5 h-5', md: 'w-6 h-6', lg: 'w-8 h-8' };
  const IconComponent = icons[slug] || PawPrint;
  const colors = categoryColors[slug] || defaultColor;
  return (
    <div className={`${containerSizes[size]} ${colors.bg} rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-200 ${className}`} aria-hidden="true">
      <IconComponent className={`${iconSizes[size]} ${colors.text}`} strokeWidth={1.5} />
    </div>
  );
}
