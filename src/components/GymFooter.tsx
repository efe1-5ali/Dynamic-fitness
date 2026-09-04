import React from 'react';
import { 
  Dumbbell, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import { GymInfo } from '../types';

interface GymFooterProps {
  gymInfo: GymInfo;
  onOpenAdmin?: () => void;
  onOpenDocs?: () => void;
}

export const GymFooter: React.FC<GymFooterProps> = ({ gymInfo }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-850 pt-16 pb-12 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-850">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-black shadow-md shadow-amber-500/20">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-stone-100 block">
                  DYNAMIC FITNESS CENTER
                </span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
                  SANCAKTEPE • İSTANBUL
                </span>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed text-xs sm:text-sm">
              Sancaktepe'de samimi aile ortamı, hijyenik çalışma alanları, 
              modern ekipmanları ve deneyimli antrenör kadrosuyla 900'den fazla üyesine hizmet veren spor merkezi.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/dynamicfitnesssancaktepe"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-pink-400 border border-stone-800 flex items-center justify-center transition-colors"
                title="Salon Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/alieminepala"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-pink-400 border border-stone-800 flex items-center justify-center transition-colors"
                title="Ali Hoca Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${gymInfo.phone.replace(/\s+/g, '')}`}
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-stone-800 flex items-center justify-center transition-colors"
                title="Doğrudan Ara"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">Sayfa Gezintisi</h4>
            <ul className="space-y-2">
              <li><a href="#hakkimizda" className="hover:text-amber-400 transition-colors">Hakkımızda</a></li>
              <li><a href="#egitmenler" className="hover:text-amber-400 transition-colors">Eğitmen Kadrosu</a></li>
              <li><a href="#hizmetler" className="hover:text-amber-400 transition-colors">Hizmetlerimiz</a></li>
              <li><a href="#yorumlar" className="hover:text-amber-400 transition-colors">Üye Yorumları</a></li>
              <li><a href="#galeri" className="hover:text-amber-400 transition-colors">Salon Galerisi</a></li>
              <li><a href="#randevu" className="hover:text-amber-400 transition-colors">Randevu Talebi</a></li>
              <li><a href="#iletisim" className="hover:text-amber-400 transition-colors">İletişim &amp; Harita</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">İletişim &amp; Adres</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-stone-300">
                  {gymInfo.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${gymInfo.phone.replace(/\s+/g, '')}`} className="text-stone-300 hover:text-amber-400 font-mono font-bold">
                  {gymInfo.phone}
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-stone-400 block font-medium">
                  Merkezi Konum: Hakmar Market üst katı, Samandıra / Sancaktepe
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Operating Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">Çalışma Saatleri</h4>
            <div className="space-y-2 text-stone-300">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-850">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-xs">Hafta İçi</span>
                </div>
                <span className="font-mono text-xs text-amber-300 font-bold">{gymInfo.hours.weekdays}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-850">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-xs">Cumartesi</span>
                </div>
                <span className="font-mono text-xs text-amber-300 font-bold">{gymInfo.hours.saturday}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-850">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-xs">Pazar</span>
                </div>
                <span className="font-mono text-xs text-amber-300 font-bold">{gymInfo.hours.sunday}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Dynamic Fitness Center. Tüm hakları saklıdır. Sancaktepe / İstanbul.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Sancaktepe'nin Güvenilir Spor Merkezi</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
