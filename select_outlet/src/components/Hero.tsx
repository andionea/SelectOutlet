import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] bg-gray-100 overflow-hidden">
      {/* Background Image - Styled to stay centered on all screens */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:bg-fixed transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('/hero-image.jpg')" }} // Use your Cloudinary/Local hero path
      >
        <div className="absolute inset-0 bg-black/10" /> {/* Subtle overlay for text readability */}
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-white mb-4 drop-shadow-md">
          Sezonul Outlet 2026
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
      
      {/* Scroll Indicator - Hidden on Mobile for clean look */}
      <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-white/50" />
      </div>
    </section>
  );
}