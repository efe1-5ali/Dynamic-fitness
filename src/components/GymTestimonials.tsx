import React from 'react';
import { 
  Star, 
  MessageSquareQuote, 
  CheckCircle2, 
  ThumbsUp, 
  ExternalLink 
} from 'lucide-react';
import { TESTIMONIALS } from '../data/gymData';
import { GymInfo } from '../types';

interface GymTestimonialsProps {
  gymInfo: GymInfo;
}

export const GymTestimonials: React.FC<GymTestimonialsProps> = ({ gymInfo }) => {
  return (
    <section id="yorumlar" className="py-16 md:py-24 border-b border-stone-800/60 bg-stone-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Google Değerlendirmeleri</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-100 tracking-tight leading-tight">
              Üyelerimizin Gözünden Dynamic Fitness Center
            </h2>
          </div>

          {/* Rating Summary Card */}
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center gap-4 self-start md:self-auto shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl text-stone-100">{gymInfo.rating}</span>
                <span className="text-xs text-stone-400 font-medium">/ 5.0</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Google Haritalar'da <strong className="text-amber-400">{gymInfo.reviewCount}+ doğrulanmış yorum</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-3xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-md"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    {t.result}
                  </span>
                </div>

                {/* Text */}
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-100">{t.name}</h4>
                  <span className="text-[11px] text-stone-400">{t.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-stone-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Google Doğrulamalı</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
