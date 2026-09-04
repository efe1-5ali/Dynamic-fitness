import React, { useState } from 'react';
import { 
  Dumbbell, 
  Phone, 
  Menu, 
  X, 
  Calendar, 
  Instagram,
  MapPin
} from 'lucide-react';
import { GymInfo } from '../types';

interface GymHeaderProps {
  gymInfo: GymInfo;
  onOpenAdmin?: () => void;
  onOpenDocs?: () => void;
  onSelectServiceForAppointment: (serviceName?: string) => void;
}

export const GymHeader: React.FC<GymHeaderProps> = ({
  gymInfo,
  onSelectServiceForAppointment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Hakkımızda', href: '#hakkimizda' },
    { label: 'Eğitmenler', href: '#egitmenler' },
    { label: 'Hizmetler', href: '#hizmetler' },
    { label: 'Yorumlar', href: '#yorumlar' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'İletişim & Konum', href: '#iletisim' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    onSelectServiceForAppointment();
    const elem = document.querySelector('#randevu');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-all">
      {/* Top micro bar with address and phone */}
      <div className="bg-stone-900/90 border-b border-stone-850 px-4 py-1.5 text-xs text-stone-400 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Sancaktepe, Hilal Cad. No:8 (Hakmar Üst Katı)</span>
            </span>
            <span className="text-stone-600">•</span>
            <a 
              href={`tel:${gymInfo.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-stone-300"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{gymInfo.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/dynamicfitnesssancaktepe"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-stone-400 hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{gymInfo.instagram}</span>
            </a>
            <span className="text-stone-600">•</span>
            <a
              href="https://instagram.com/alieminepala"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-stone-400 hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{gymInfo.headCoachInstagram} (Baş Antrenör)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-stone-100 flex items-center gap-1.5">
              DYNAMIC <span className="text-amber-400 font-medium">FITNESS</span>
            </span>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest block -mt-1 font-semibold">
              SANCAKTEPE • CENTER
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${gymInfo.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 text-xs font-semibold hover:text-amber-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{gymInfo.phone}</span>
          </a>

          <button
            onClick={handleCtaClick}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Randevu &amp; Bilgi Al</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-stone-300 hover:bg-stone-900 hover:text-amber-400 text-sm font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-800/80 flex flex-col gap-2.5">
            <button
              onClick={handleCtaClick}
              className="w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Randevu &amp; Bilgi Al</span>
            </button>

            <a
              href={`tel:${gymInfo.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{gymInfo.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
