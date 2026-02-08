export default function Hero() {
  return (
    <section className="relative w-full h-[500px] bg-brand-black flex items-center justify-center overflow-hidden">
      {/* Background with slight luxury texture */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="relative z-10 text-center space-y-4 px-4">
        <div className="inline-block border border-brand-gold px-4 py-1 mb-4">
          <span className="text-brand-gold text-[10px] font-bold uppercase tracking-ultra-widest">
            Seasonal Clearout
          </span>
        </div>
        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tighter">
          UP TO <span className="text-brand-gold">70% OFF</span>
        </h1>
        <p className="text-gray-300 text-sm tracking-widest uppercase">
          Designer Labels • Local Outlet • Limited Stock
        </p>
        <div className="pt-6">
          <button className="bg-brand-gold text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-black transition-all duration-300">
            Shop the Sale
          </button>
        </div>
      </div>
    </section>
  );
}