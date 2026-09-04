import React, { useState } from 'react';
import { 
  Camera, 
  Dumbbell, 
  Flame, 
  Sparkles, 
  Heart, 
  Shield,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gymData';

export const GymGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');

  const categories = ['Tümü', 'Ağırlık Parkuru', 'Kardiyo & Kondisyon', 'Makine Parkuru', 'Fonksiyonel Alan', 'Personal Training', 'Atmosfer & Topluluk'];

  const filteredItems = activeCategory === 'Tümü'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="galeri" className="py-16 md:py-24 border-b border-stone-800/60 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Salon Galerisi & Gerçek Kareler</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-100 tracking-tight leading-tight mb-4">
            Geniş, Ferah ve Amaca Yönelik Antrenman İstasyonları
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Google Maps işletme kaydı ve resmi Instagram hesaplarımızdan derlenen gerçek salon ortamı, ekipman parkuru ve antrenman kareleri.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden hover:border-amber-500/50 transition-all group relative flex flex-col justify-end min-h-[280px] p-6 shadow-xl"
            >
              {/* Photo Background */}
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/20 group-hover:via-stone-950/60 transition-colors" />

              {/* Top Meta: Category & Source Reference Badge */}
              <div className="relative z-10 mb-auto flex items-start justify-between gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-stone-950/90 backdrop-blur-md border border-stone-800 text-amber-400 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  {item.category}
                </span>

                {item.sourceRef && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-950/80 backdrop-blur-sm border border-stone-800/80 text-[9px] font-medium text-stone-400">
                    {item.sourceRef}
                  </span>
                )}
              </div>

              {/* Title and subtitle */}
              <div className="relative z-10 mt-6 pt-3 border-t border-white/10">
                <h3 className="text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
