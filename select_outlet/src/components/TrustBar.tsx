import { Truck, RotateCcw, ShieldCheck, MapPin } from 'lucide-react';

const features = [
  { 
    icon: Truck, 
    title: "Livrare Rapidă", 
    desc: "Național & Local" 
  },
  { 
    icon: RotateCcw, 
    title: "Retur 14 Zile", 
    desc: "Garantat" 
  },
  { 
    icon: ShieldCheck, 
    title: "Calitate Premium", 
    desc: "Produse Verificate" 
  },
  { 
    icon: MapPin, 
    title: "Ridicare Personală", 
    desc: "Direct din Outlet" 
  },
];

/**
 * TrustBar component that displays a grid of trust/feature indicators.
 * 
 * Renders a horizontal bar with icons and text describing key features or trust factors.
 * The layout is responsive: 2 columns on mobile, 4 columns on medium screens and up.
 * 
 * Style breakdown:
 * - `bg-gray-50 border-y border-gray-100`: Light gray background with top/bottom borders
 * - `py-10`: Vertical padding for spacing
 * - `max-w-7xl mx-auto`: Constrains width and centers content
 * - `px-4`: Horizontal padding for responsive margin
 * - `grid grid-cols-2 md:grid-cols-4 gap-8`: Responsive grid layout with spacing between items
 * - `flex flex-col items-center text-center`: Flexbox column layout, centered alignment
 * - `space-y-3/1`: Vertical spacing between child elements
 * - `text-[#C5A059]`: Golden/bronze color for icons
 * - `uppercase tracking-widest/tighter`: All caps text with letter spacing
 * - `font-extrabold`: Bold font weight for titles
 * 
 * @returns {JSX.Element} A trust indicator bar component
 */
export default function TrustBar() {
  return (
    <div className="bg-gray-100 border-y border-gray-100 py-5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-3">
            <f.icon size={28} className="text-[#C5A059]" strokeWidth={1.2} />
            <div className="space-y-1">
              <h3 className="text-[11px] uppercase tracking-widest font-extrabold text-black">
                {f.title}
              </h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}