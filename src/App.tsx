import React, { useState } from 'react';
import { GYM_INFO } from './data/gymData';
import { GymHeader } from './components/GymHeader';
import { GymHero } from './components/GymHero';
import { GymAbout } from './components/GymAbout';
import { GymCoaches } from './components/GymCoaches';
import { GymServices } from './components/GymServices';
import { GymTestimonials } from './components/GymTestimonials';
import { GymGallery } from './components/GymGallery';
import { GymAppointmentForm } from './components/GymAppointmentForm';
import { GymContactMap } from './components/GymContactMap';
import { GymFooter } from './components/GymFooter';

export default function App() {
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleSelectService = (serviceName?: string) => {
    setSelectedService(serviceName);
    const elem = document.querySelector('#randevu');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCoach = (coachName: string) => {
    setSelectedService("Personal Training (Birebir Özel Ders) İstiyorum");
    const elem = document.querySelector('#randevu');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sticky Navigation */}
      <GymHeader
        gymInfo={GYM_INFO}
        onSelectServiceForAppointment={handleSelectService}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Faz 1 & 2: Hero Section with Verified Trust Badges & Goal Selectors */}
        <GymHero
          gymInfo={GYM_INFO}
          onCtaClick={() => handleSelectService()}
          onSelectGoal={handleSelectService}
        />

        {/* Faz 2: About & Philosophy (Family gym atmosphere) */}
        <GymAbout gymInfo={GYM_INFO} />

        {/* Faz 2 & 5: Verified Coaches (Ali Hoca 236K, Metin Hoca, Fatih Hoca) */}
        <GymCoaches onSelectCoachAppointment={handleSelectCoach} />

        {/* Faz 2: Services Grid */}
        <GymServices onSelectService={handleSelectService} />

        {/* Faz 2: Real Google Reviews & Testimonials */}
        <GymTestimonials gymInfo={GYM_INFO} />

        {/* Faz 2: Gym Stations Gallery */}
        <GymGallery />

        {/* Faz 3: Real Appointment Form with SQLite Backend */}
        <GymAppointmentForm initialService={selectedService} />

        {/* Faz 1 & 2: Contact & Google Maps */}
        <GymContactMap gymInfo={GYM_INFO} />
      </main>

      {/* Faz 1: Complete Footer with Verified Details */}
      <GymFooter gymInfo={GYM_INFO} />
    </div>
  );
}
