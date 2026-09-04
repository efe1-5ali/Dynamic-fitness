import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Navigation, 
  ExternalLink,
  Building,
  CheckCircle
} from 'lucide-react';
import { GymInfo } from '../types';

interface GymContactMapProps {
  gymInfo: GymInfo;
}

export const GymContactMap: React.FC<GymContactMapProps> = ({ gymInfo }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Dynamic Fitness Center Osmangazi Mah Hilal Cad No 8 Sancaktepe Istanbul')}`;

  return (
    <section id="iletisim" className="py-16 md:py-24 border-b border-stone-800/60 bg-stone-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Ulaşım &amp; İletişim</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-100 tracking-tight leading-tight mb-4">
            Bizi Kolayca Bulun, Ziyaret Edin
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Sancaktepe Osmangazi Mahallesi Hilal Caddesi üzerinde, Hakmar Market'in hemen üst katındayız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Contact Cards */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            {/* Address Box */}
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3 text-amber-400">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-100">Salon Adresi</h3>
                  <span className="text-[11px] text-stone-400">Merkezi ve kolay ulaşılabilir konum</span>
                </div>
              </div>

              <p className="text-sm text-stone-200 leading-relaxed font-medium pl-1">
                {gymInfo.address}
              </p>

              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-400 text-xs font-bold border border-stone-800 hover:border-amber-500 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Haritalar'da Yol Tarifi Al</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>

            {/* Phone & Direct Call */}
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-amber-400">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-100">Sabit Telefon</h3>
                  <span className="text-[11px] text-stone-400">Doğrudan salon yetkilisine bağlanın</span>
                </div>
              </div>

              <a
                href={`tel:${gymInfo.phone.replace(/\s+/g, '')}`}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition-colors flex items-center justify-center gap-2 self-start sm:self-auto shadow-md shadow-amber-500/15"
              >
                <Phone className="w-4 h-4" />
                <span>{gymInfo.phone}</span>
              </a>
            </div>

            {/* Working Hours */}
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-100">Çalışma Saatleri</h3>
                  <span className="text-[11px] text-stone-400">Haftanın 7 günü hizmetinizdeyiz</span>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <span className="text-stone-300 font-medium">Pazartesi – Cuma</span>
                  <span className="font-mono text-amber-300 font-bold">{gymInfo.hours.weekdays}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <span className="text-stone-300 font-medium">Cumartesi</span>
                  <span className="font-mono text-amber-300 font-bold">{gymInfo.hours.saturday}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <span className="text-stone-300 font-medium">Pazar</span>
                  <span className="font-mono text-amber-300 font-bold">{gymInfo.hours.sunday}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Map Visual & Interactive Embed */}
          <div className="lg:col-span-6 rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="p-6 border-b border-stone-800 bg-stone-950/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-100 block">Konum Görünümü</span>
                <span className="text-[11px] text-stone-400">Sancaktepe / Osmangazi</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                Şimdi Açık
              </span>
            </div>

            {/* Map Preview Frame */}
            <div className="relative flex-1 min-h-[340px] bg-stone-950 flex items-center justify-center p-6 text-center">
              <div className="max-w-md space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto animate-bounce">
                  <MapPin className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-stone-100">Dynamic Fitness Center</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Osmangazi Mah. Hilal Cad. No:8, Hakmar Market üst katı, Sancaktepe / İstanbul
                </p>
                <div className="pt-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:scale-102 transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Haritada Aç ve Navigasyon Başlat</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Accounts Footer Strip */}
            <div className="p-4 bg-stone-950/90 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-400 font-medium">Bizi Takip Edin:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/dynamicfitnesssancaktepe"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-stone-300 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>@dynamicfitnesssancaktepe</span>
                </a>
                <span className="text-stone-700">•</span>
                <a
                  href="https://instagram.com/alieminepala"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-stone-300 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Ali Hoca (@alieminepala)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
