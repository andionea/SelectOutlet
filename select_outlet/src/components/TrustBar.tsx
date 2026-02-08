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

export default function TrustBar() {
  return (
    <div className="bg-gray-50 border-y border-gray-100 py-10">
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