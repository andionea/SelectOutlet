import { Instagram, Facebook, Play } from 'lucide-react';
import Image from 'next/image';

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: <Facebook size={18} />, url: '#', color: 'bg-blue-50 text-blue-600' },
  { name: 'Instagram', icon: <Instagram size={18} />, url: '#', color: 'bg-orange-50 text-pink-600' },
  { name: 'TikTok', icon: <span className="font-bold">TikTok</span>, url: '#', color: 'bg-gray-50 text-black' },
];

const FEED_ITEMS = [
  { id: 1, type: 'video', thumbnail: '/social-1.jpg' },
  { id: 2, type: 'video', thumbnail: '/social-2.jpg' },
  { id: 3, type: 'video', thumbnail: '/social-3.jpg' },
];

export default function SocialSection() {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Partea de butoane "Follow" inspirată de giafashion.ro */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-16 shadow-sm text-center">
          <h3 className="text-[#C5A059] font-bold text-lg mb-2">Fii prima care vede noutățile Select Outlet</h3>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-8">
            Urmărește-ne pe social media pentru lansări și oferte exclusive.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className={`flex items-center justify-center gap-3 px-8 py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105 ${link.color}`}
              >
                {link.icon}
                Urmărește-ne pe {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Feed Vizual (Din TikTok-ul/Instagram-ul nostru) */}
        <div className="text-center mb-10">
          <h4 className="flex items-center justify-center gap-2 text-xl font-black uppercase tracking-tighter">
            🎬 Din Social Media-ul nostru
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEED_ITEMS.map((item) => (
            <div key={item.id} className="group relative aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-2xl">
              {/* Placeholder pentru thumbnail - va folosi imaginile tale reale */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                  <Play fill="white" size={20} />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 z-20 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                View profile
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}