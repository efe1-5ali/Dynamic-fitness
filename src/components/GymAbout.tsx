import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Dumbbell, 
  Clock, 
  MapPin, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { GymInfo } from '../types';

interface GymAboutProps {
  gymInfo: GymInfo;
}

export const GymAbout: React.FC<GymAboutProps> = ({ gymInfo }) => {
  const highlights = [
    {
      title: "Gerçek Aile Ortamı",
      desc: "Herkesin birbirine saygı duyduğu, kadın ve erkek üyelerimizin kendilerini tamamen rahat ve güvende hissettiği samimi bir atmosfer.",
      icon: HeartHandshake,
      color: "text-amber-400",
    },
    {
      title: "Maksimum Hijyen ve Düzen",
      desc: "Günün her saati düzenli olarak dezenfekte edilen aletler, temiz havalandırma ve ferah soyunma odaları.",
      icon: Sparkles,
      color: "text-emerald-400",
    },
    {
      title: "Birebir Eğitmen İlgisi",
      desc: "Sadece ilk gün değil, salonda olduğunuz her an doğru form ve motivasyon için yanınızda olan tecrübeli hocalar.",
      icon: Dumbbell,
      color: "text-orange-400",
    },
    {
      title: "Geniş Çalışma Saatleri",
      desc: "Hafta içi 08:30'dan 23:00'e kadar, yoğun iş ve okul temponuza tam uyum sağlayan esnek saatler.",
      icon: Clock,
      color: "text-amber-400",
    },
  ];

  return (
    <section id="hakkimizda" className="py-16 md:py-24 border-b border-stone-800/60 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Biz Kimiz?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-100 tracking-tight leading-tight mb-4">
            Sancaktepe'de Sporu ve Sağlığı Bir Yaşam Tarzına Dönüştürüyoruz
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Dynamic Fitness Center, Sancaktepe Osmangazi Mahallesi'nde kurulduğu günden bu yana 
            üyelerine sadece bir spor salonu değil; saygı, motivasyon ve profesyonelliğin bir arada 
            bulunduğu gerçek bir spor ailesi sunmaktadır.
          </p>
        </div>

        {/* 2-Column Info Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-black text-stone-100 flex items-center gap-2">
                <span className="text-amber-400">900'den Fazla</span> Üyemizin Ortak Tercihi
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Modern makinelerimiz, vücut geliştirme ve kondisyon hedeflerinize uygun geniş ağırlık parkurumuz ve tecrübeli eğitmen kadromuzla Sancaktepe'de fark yaratıyoruz. Amacımız sizi salon kapısından girdiğiniz ilk günden itibaren motive etmek ve hedeflerinize ulaştırmaktır.
              </p>

              <div className="pt-4 border-t border-stone-800/80 space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Kişiye özel başlangıç ve gelişim antrenman programları</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Vücut analizi, yağ-kas ölçümü ve periyodik takip</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Hakmar Market üst katında ferah, aydınlık ve merkezi konum</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center mb-3">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <h4 className="text-base font-bold text-stone-100 mb-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
