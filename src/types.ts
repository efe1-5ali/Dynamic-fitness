export interface Appointment {
  id: number;
  full_name: string;
  phone: string;
  service: string;
  message?: string | null;
  status: 'yeni' | 'okundu' | 'arandi';
  created_at: string;
}

export interface GymInfo {
  name: string;
  location: string;
  address: string;
  phone: string;
  instagram: string;
  headCoachInstagram: string;
  headCoachFollowers: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  rating: number;
  reviewCount: number;
  allowedServices: string[];
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  specialty: string;
  instagram?: string;
  followers?: string;
  description: string;
  experience: string;
  image?: string;
  sourceRef?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  sourceRef?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  recommendedFor: string;
  highlight?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  duration: string;
  result: string;
  text: string;
  rating: number;
}

export interface AdminSession {
  authenticated: boolean;
  phone_number?: string;
}
