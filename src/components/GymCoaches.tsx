import React from 'react';
import { 
  Award, 
  Instagram, 
  ExternalLink, 
  Dumbbell, 
  Calendar,
  CheckCircle,
  UserCheck
} from 'lucide-react';
import { COACHES } from '../data/gymData';

interface GymCoachesProps {
  onSelectCoachAppointment: (coachName: string) => void;
}

export const GymCoaches: React.FC<GymCoachesProps> = ({ onSelectCoachAppointment }) => {
  return (
    <section id="egitmenler" className="py-16 md:py-24 border-b border-stone-800/60 bg-stone-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Uzman Kadro</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-100 tracking-tight leading-tight mb-4">
            Hedeflerinize Rehberlik Eden Profesyonel Eğitmenlerimiz
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Dynamic Fitness Center'da her adımınız bilinçli, güvenli ve amaca yönelik. 
            Yılların deneyimine sahip hocalarımızla tanışın.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COACHES.map((coach) => (
            <div
              key={coach.id}
              className="rounded-3xl bg-stone-900 border border-stone-800/80 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all group shadow-lg"
            >
              {/* Header Visual Box with Coach Photo */}
              <div className="relative h-64 sm:h-72 overflow-hidden border-b border-stone-800">
                {coach.image ? (
                  <img
                    src={coach.image}
                    alt={coach.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-stone-850 to-stone-900 flex items-center justify-center">
                    <Dumbbell className="w-12 h-12 text-amber-400" />
                  </div>
                )}

                {/* Dark Gradient Overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-950/90 backdrop-blur-md text-amber-400 border border-stone-800 text-[11px] font-bold shadow-md">
                    {coach.experience}
                  </span>

                  {coach.instagram && (
                    <a
                      href={`https://instagram.com/${coach.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-stone-200 hover:text-pink-400 transition-colors bg-stone-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-800 shadow-md"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      <span>{coach.instagram}</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-60" />
                    </a>
                  )}
                </div>

                {/* Bottom Overlay Info inside Image Banner */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  {coach.sourceRef && (
                    <span className="inline-block mb-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-semibold text-stone-300">
                      {coach.sourceRef}
                    </span>
                  )}
                  <h3 className="text-xl font-black text-white drop-shadow-sm">{coach.name}</h3>
                  <p className="text-xs font-semibold text-amber-400 mt-0.5">{coach.role}</p>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-stone-400 mb-2">
                    <span className="font-semibold text-stone-300">Uzmanlık:</span> {coach.specialty}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {coach.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80">
                  <button
                    onClick={() => onSelectCoachAppointment(coach.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-950 hover:bg-amber-500 hover:text-stone-950 text-stone-200 text-xs font-bold border border-stone-800 hover:border-amber-500 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{coach.name} ile Seans Planla</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
