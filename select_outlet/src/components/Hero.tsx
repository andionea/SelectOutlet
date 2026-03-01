import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

/**
 * Hero section component that displays a promotional banner for the outlet season.
 * 
 * @component
 * @returns {JSX.Element} A full-height hero section with:
 * - A fixed/parallax background image with hover scale-up animation
 * - A dark overlay for improved text contrast
 * - Centered content including:
 *   - Season label ("Sezonul Outlet 2026")
 *   - Large headline with discount percentage highlighted in gold (#C5A059)
 *   - Call-to-action button linking to outlet category with hover color effect
 * - Animated scroll indicator (chevron) visible on medium+ screens with "Scroll" label on hover
 * 
 * @styling
 * - Responsive heights: 70vh on mobile, 85vh on tablet+
 * - Background image: Cloudinary-hosted SVG that stays centered and scales on hover
 * - Text: White with drop shadows for readability over background
 * - Button: White background with gold (#C5A059) hover state
 * - Scroll indicator: Bouncing animation with fade-in text on hover
 * - Responsive typography: Scales from text-4xl (mobile) to text-8xl (desktop)
 */
export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] bg-gray-100 overflow-hidden">
      {/* Background Image - Styled to stay centered on all screens */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dff92deol/image/upload/v1772385331/Design_f%C4%83r%C4%83_titlu_1_jeto80.svg')" }}
      >
        <div className="absolute inset-0 bg-black/10" /> {/* Subtle overlay for text readability */}
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-white mb-4 drop-shadow-md">
          Reduceri pe bune
        </span>
        
        <h1 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8 drop-shadow-xl">
          Up To <span className="text-[#C5A059]">70%</span> Off
        </h1>

        <Link 
          href="/category/outlet"
          className="group relative overflow-hidden bg-white text-black px-8 py-4 md:px-12 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all hover:bg-[#C5A059] hover:text-white"
        >
          <span className="relative z-10">Shop the Sale</span>
        </Link>
      </div>
      
      {/* SĂGEATA ACTUALIZATĂ: Mai vizibilă și animată */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 animate-bounce cursor-pointer group">
        <span className="text-[10px] text-white/80 uppercase font-bold tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <ChevronDown 
          size={48} 
          strokeWidth={3} 
          className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]" 
        />
      </div>
    </section>
  );
}