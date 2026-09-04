import React from 'react';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Dumbbell, 
  Flame, 
  Users, 
  Zap, 
  Heart,
  Gift
} from 'lucide-react';
import { SERVICES } from '../data/gymData';
import { ServiceItem } from '../types';

interface GymServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const GymServices: React.FC<GymServicesProps> = ({ onSelectService }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'fitness':
        return Dumbbell;
      case 'pt':
        return Zap;
      case 'fatloss':
        return Flame;
      case 'group':
        return Users;
      case 'functional':
        return Heart;
      case 'trial':
        return Gift;
      default:
        return Dumbbell;
    }
  };

  return (
    <section id="hizmetler" className="py-16 md:py-24 border-b border-stone-800/60 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Programlar &amp; Olanaklar</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-100 tracking-tight leading-tight">
              Her Seviyeye ve Hedefe Uygun Antrenman Çözümleri
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm max-w-sm">
            İster spora ilk defa başlayın, ister ileri düzey kas ve kuvvet hedefleyin; 
            size en uygun programı birlikte belirleyelim.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = getIcon(service.id);
            return (
              <div
                key={service.id}
                className={`rounded-3xl border transition-all flex flex-col justify-between p-6 sm:p-7 relative ${
                  service.highlight
                    ? 'bg-gradient-to-b from-stone-900 to-stone-925 border-amber-500/50 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : 'bg-stone-900/80 border-stone-800/90 hover:border-stone-700'
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] tracking-wider uppercase shadow-md">
                    En Çok Tercih Edilen
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                        {service.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-stone-100">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800/80">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      service.highlight
                        ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
                        : 'bg-stone-950 hover:bg-stone-850 text-stone-200 border border-stone-800'
                    }`}
                  >
                    <span>Bu Hizmet İçin Randevu Al</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
