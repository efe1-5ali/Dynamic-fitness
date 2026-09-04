import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  PhoneCall, 
  Users, 
  Flame,
  Award,
  Dumbbell,
  HelpCircle,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { GymInfo } from '../types';
import { HERO_SHOWCASE } from '../data/gymData';

interface GymHeroProps {
  gymInfo: GymInfo;
  onCtaClick: () => void;
  onSelectGoal: (serviceName: string) => void;
}

export const GymHero: React.FC<GymHeroProps> = ({ gymInfo, onCtaClick, onSelectGoal }) => {
  const scrollToContact = () => {
    const elem = document.querySelector('#iletisim');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-stone-800/60">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Location & Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-stone-300 text-xs font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Sancaktepe, İstanbul</span>
            <span className="text-stone-600">|</span>
            <span className="text-amber-300">Köklü Aile Spor Merkezi</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-stone-100 leading-[1.08] mb-6">
            POTANSİYELİNİ KEŞFET, <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              FORMUNA DİNAMİZM KAT
            </span>
          </h1>

          {/* Slogan & Description */}
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed mb-8">
            Dynamic Fitness Center ile Sancaktepe'de samimi bir aile ortamında, 
            uzman eğitmenlerimiz ve zengin makine parkurumuz eşliğinde hedeflerinize 
            en doğru adımlarla ulaşın.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-6">
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Calendar className="w-5 h-5 text-stone-950" />
              <span>Randevu &amp; Bilgi Al</span>
            </button>

            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 text-stone-200 font-bold text-base flex items-center justify-center gap-2.5 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Bize Ulaşın &amp; Konum</span>
            </button>
          </div>

          {/* Seçenek C: Hedef Bazlı Hızlı Yönlendirme Butonları */}
          <div className="w-full max-w-4xl mb-12 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>veya hedefinizi seçin, formu sizin için dolduralım:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full">
              {/* Hedef 1: Kilo Vermek */}
              <button
                type="button"
                onClick={() => onSelectGoal("Kilo Vermek İstiyorum")}
                className="group flex items-center justify-between sm:justify-center gap-2 px-3.5 py-3 rounded-2xl bg-stone-900/90 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 text-xs sm:text-[13px] font-semibold transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span>Kilo Vermek İstiyorum</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all sm:hidden" />
              </button>

              {/* Hedef 2: Kas Yapmak */}
              <button
                type="button"
                onClick={() => onSelectGoal("Kas Yapmak İstiyorum")}
                className="group flex items-center justify-between sm:justify-center gap-2 px-3.5 py-3 rounded-2xl bg-stone-900/90 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 text-xs sm:text-[13px] font-semibold transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Kas Yapmak İstiyorum</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all sm:hidden" />
              </button>

              {/* Hedef 3: Personal Training */}
              <button
                type="button"
                onClick={() => onSelectGoal("Personal Training (Birebir Özel Ders) İstiyorum")}
                className="group flex items-center justify-between sm:justify-center gap-2 px-3.5 py-3 rounded-2xl bg-stone-900/90 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 text-xs sm:text-[13px] font-semibold transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>Personal Training İstiyorum</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all sm:hidden" />
              </button>

              {/* Hedef 4: Sadece Bilgi Almak */}
              <button
                type="button"
                onClick={() => onSelectGoal("Sadece Bilgi Almak İstiyorum")}
                className="group flex items-center justify-between sm:justify-center gap-2 px-3.5 py-3 rounded-2xl bg-stone-900/90 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 text-xs sm:text-[13px] font-semibold transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>Sadece Bilgi Almak İstiyorum</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all sm:hidden" />
              </button>
            </div>
          </div>

          {/* Hero Showcase Photo Card (Ref #H1) */}
          <div className="w-full max-w-4xl mb-8 rounded-3xl overflow-hidden border border-stone-800 relative group shadow-2xl">
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
              <img
                src={HERO_SHOWCASE.imageUrl}
                alt={HERO_SHOWCASE.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 text-[11px] font-bold text-amber-400 flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sancaktepe Osmangazi Mah.</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 text-[10px] font-semibold text-stone-300">
                  {HERO_SHOWCASE.sourceBadge}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                    {HERO_SHOWCASE.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 drop-shadow">
                    {HERO_SHOWCASE.subtitle}
                  </p>
                </div>

                <a
                  href="#galeri"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-stone-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-800 shrink-0 w-fit"
                >
                  <span>Tüm Alanları İncele</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Trust Banner / Social Proof Strip (Roadmap Faz 2 Kesin Veri) */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-stone-900/80 border border-stone-800/90 shadow-2xl backdrop-blur-sm">
            {/* Google Rating */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-950/60 border border-stone-800/50">
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-black text-xl text-stone-100">{gymInfo.rating}</span>
                <span className="text-xs text-stone-400">/5.0</span>
              </div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                Google Puanı
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">En yüksek memnuniyet</span>
            </div>

            {/* Review Count */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-950/60 border border-stone-800/50">
              <div className="flex items-center gap-1.5 text-stone-100 mb-1">
                <Users className="w-4 h-4 text-amber-400" />
                <span className="font-black text-xl text-stone-100">{gymInfo.reviewCount}+</span>
              </div>
              <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">
                Gerçek Yorum
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">Sancaktepe'de rekor geri bildirim</span>
            </div>

            {/* Instagram Head Coach Follower */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-950/60 border border-stone-800/50">
              <div className="flex items-center gap-1.5 text-stone-100 mb-1">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="font-black text-xl text-stone-100">{gymInfo.headCoachFollowers}</span>
              </div>
              <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">
                Sosyal Topluluk
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">Ali Hoca liderliğinde</span>
            </div>

            {/* Atmosphere */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-950/60 border border-stone-800/50">
              <div className="flex items-center gap-1.5 text-stone-100 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-black text-lg text-stone-100">%100</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Aile Ortamı
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">Temiz, saygılı ve samimi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
