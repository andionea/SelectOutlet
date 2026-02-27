import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    // Am folosit border-t-2 pentru o delimitare mai clară între secțiuni
    <footer className="bg-white border-t-2 border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Coloana Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-select-outlet-1200x350px.png"
                alt="Select Outlet"
                width={180}
                height={50}
                className="w-auto h-10"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Destinația ta premium pentru fashion tip outlet. Oferim o selecție curată de branduri internaționale la prețuri imbatabile pentru întreaga familie.
            </p>
          </div>

          {/* Coloana Shop */}
          <div>
            <h4 className="text-black font-black uppercase tracking-widest text-xs mb-6">Categorii</h4>
            <ul className="space-y-4">
              {[
                { name: 'Bărbați', slug: 'men' },
                { name: 'Femei', slug: 'women' },
                { name: 'Copii', slug: 'kids' },
                { name: 'Accesorii', slug: 'accesorii' },
                { name: 'Oferte', slug: 'outlet' }
              ].map((item) => (
                <li key={item.slug}>
                  <Link href={`/category/${item.slug}`} className="text-gray-500 hover:text-[#C5A059] text-sm transition-colors font-medium uppercase tracking-tighter">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coloana Informații Informative */}
          <div>
            <h4 className="text-black font-black uppercase tracking-widest text-xs mb-6">Informații Client</h4>
            <ul className="space-y-4">
              <li><Link href="/politica-retur" className="text-gray-500 hover:text-[#C5A059] text-sm transition-colors font-medium uppercase tracking-tighter">Politica de Retur</Link></li>
              <li><Link href="/livrare" className="text-gray-500 hover:text-[#C5A059] text-sm transition-colors font-medium uppercase tracking-tighter">Livrare și Plată</Link></li>
              <li><Link href="/termeni-conditii" className="text-gray-500 hover:text-[#C5A059] text-sm transition-colors font-medium uppercase tracking-tighter">Termeni și Condiții</Link></li>
              <li><Link href="/gdpr" className="text-gray-500 hover:text-[#C5A059] text-sm transition-colors font-medium uppercase tracking-tighter">Confidențialitate Date</Link></li>
            </ul>
          </div>

          {/* Coloana Contact */}
          <div>
            <h4 className="text-black font-black uppercase tracking-widest text-xs mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 text-sm font-medium">
                <MapPin size={18} className="text-[#C5A059] shrink-0" />
                <span>Vizitează-ne în magazinul fizic</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                <Phone size={18} className="text-[#C5A059] shrink-0" />
                <span>+40 7xx xxx xxx</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                <Mail size={18} className="text-[#C5A059] shrink-0" />
                <span>contact@selectoutlet.ro</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bara de Jos (Copyright și Plăți) */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
            © 2026 Select Outlet. O alegere inspirată pentru întreaga familie.
          </p>
          <div className="flex items-center gap-6 opacity-40 grayscale contrast-125">
            {/* Poți adăuga iconițe de plată (Visa, Mastercard etc.) aici */}
            <span className="text-[10px] font-bold uppercase tracking-widest">Plată Securizată</span>
          </div>
        </div>
      </div>
    </footer>
  );
}