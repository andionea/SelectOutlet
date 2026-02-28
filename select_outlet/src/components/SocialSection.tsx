"use client";
import { Instagram, Facebook } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    ttEmbedByteDance?: {
      prepareEmbeds: () => void;
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: <Facebook size={18} />,
    url: "#",
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Instagram",
    icon: <Instagram size={18} />,
    url: "#",
    color: "bg-orange-50 text-pink-600",
  },
  {
    name: "TikTok",
    icon: <span className="font-bold">TikTok</span>,
    url: "#",
    color: "bg-gray-50 text-black",
  },
];

const FEED_ITEMS = [
  {
    id: 1,
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/DTFBwzkDGLr/embed",
  },
  {
    id: 2,
    type: "tiktok",
    videoId: "7610781748464471318", 
  },
  {
    id: 3,
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/DRSIrmKDLsS/embed",
  },
];

export default function SocialSection() {
  // This ensures TikTok re-renders the embed if the component updates
  useEffect(() => {
    if (window.ttEmbedByteDance) {
      window.ttEmbedByteDance.prepareEmbeds();
    }
  }, []);

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      {/* TikTok SDK Script */}
      <Script src="https://www.tiktok.com/embed.js" strategy="afterInteractive" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-16 shadow-sm text-center">
          <h3 className="text-[#C5A059] font-bold text-lg mb-2">
            Fii prima care vede noutățile Select Outlet
          </h3>
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

        <div className="text-center mb-10">
          <h4 className="flex items-center justify-center gap-2 text-xl font-black uppercase tracking-tighter">
            🎬 Din Social Media-ul nostru
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEED_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-2xl"
            >
              {item.type === "instagram" ? (
                <iframe
                  src={item.embedUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full tiktok-wrapper">
                  <blockquote 
                    className="tiktok-embed" 
                    cite={`https://www.tiktok.com/video/${item.videoId}`} 
                    data-video-id={item.videoId}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <section></section>
                  </blockquote>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Add custom CSS to hide the ugly scrollbars often found in TikTok embeds */}
      <style jsx global>{`
        .tiktok-embed {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          max-width: 100% !important;
          height: 100% !important;
        }
        .tiktok-wrapper iframe {
          height: 100% !important;
          width: 100% !important;
        }
      `}</style>
    </section>
  );
}