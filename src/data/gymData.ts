import { Coach, ServiceItem, Testimonial, GymInfo, GalleryItem } from '../types';

export const GYM_INFO: GymInfo = {
  name: "Dynamic Fitness Center",
  location: "Sancaktepe, İstanbul",
  address: "Osmangazi Mah. Hilal Cad. No:8, Hakmar Market üst katı, Sancaktepe / İstanbul",
  phone: "0216 561 66 34",
  instagram: "@dynamicfitnesssancaktepe",
  headCoachInstagram: "@alieminepala",
  headCoachFollowers: "236K+",
  hours: {
    weekdays: "08:30 - 23:00",
    saturday: "08:30 - 22:00",
    sunday: "11:00 - 16:00",
  },
  rating: 4.9,
  reviewCount: 938,
  allowedServices: [
    "Kilo Vermek İstiyorum",
    "Kas Yapmak İstiyorum",
    "Personal Training (Birebir Özel Ders) İstiyorum",
    "Sadece Bilgi Almak İstiyorum",
    "Grup Derslerine Katılmak İstiyorum",
    "Fonksiyonel Antrenman Yapmak İstiyorum",
  ],
};

export const SERVICE_GOAL_MAP: Record<string, string> = {
  "Fitness & Vücut Geliştirme": "Kas Yapmak İstiyorum",
  "Personal Training (Özel Ders)": "Personal Training (Birebir Özel Ders) İstiyorum",
  "Kilo Verme & Sıkılaşma": "Kilo Vermek İstiyorum",
  "Grup Dersleri (Pilates/Spinning)": "Grup Derslerine Katılmak İstiyorum",
  "Fonksiyonel Antrenman & Kondisyon": "Fonksiyonel Antrenman Yapmak İstiyorum",
  "Genel Bilgi & Salon Üyeliği": "Sadece Bilgi Almak İstiyorum",
};

export const HERO_SHOWCASE = {
  imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
  title: "Dynamic Fitness Center Sancaktepe",
  subtitle: "Geniş Açı Salon ve Ağırlık Parkuru",
  sourceBadge: "Google Maps & Salon İç Mekan Çekimi (Ref #H1)",
};

export const COACHES: Coach[] = [
  {
    id: "ali-hoca",
    name: "Ali Hoca (Ali Pala)",
    role: "Kurucu & Baş Antrenör",
    specialty: "Vücut Geliştirme, Kuvvet & Beslenme Programı",
    instagram: "@alieminepala",
    followers: "236K Takipçi",
    experience: "Kurucu & Baş Antrenör",
    description: "Dynamic Fitness Center kurucusu ve baş antrenörü. Salonda üyelerin gelişimini yakından takip eden, kişiye özel antrenman ve beslenme programlarını bizzat hazırlayan deneyimli spor insanı.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
    sourceRef: "Instagram @alieminepala (Görsel Ref #E1)",
  },
  {
    id: "metin-hoca",
    name: "Metin Hoca",
    role: "Fitness & Kondisyon Eğitmeni",
    specialty: "Kuvvet, Dayanıklılık & Kardiyo Gelişimi",
    experience: "Eğitmen Kadrosu",
    description: "Salonda üyelerin antrenman formunu, hareket biomekaniğini ve doğru teknikleri öğrenmesini sağlayan deneyimli salon antrenörümüz.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    sourceRef: "Dynamic Fitness Eğitmen Kadrosu (Görsel Ref #E3)",
  },
  {
    id: "fatih-hoca",
    name: "Fatih Hoca",
    role: "Personal Trainer & Salon Eğitmeni",
    specialty: "Birebir Özel Ders & Kilo Kontrolü",
    experience: "Eğitmen Kadrosu",
    description: "Kişiye özel antrenman programlaması, kilo verme, kas kütlesi kazanımı ve motivasyon süreçlerinde üyelere rehberlik eden antrenörümüz.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    sourceRef: "Dynamic Fitness PT Seansı (Görsel Ref #E2)",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "fitness",
    title: "Fitness & Vücut Geliştirme",
    category: "Serbest & Makine Antrenmanı",
    description: "Geniş serbest ağırlık istasyonları ve izole kas makineleriyle hedefinize uygun profesyonel çalışma ortamı.",
    features: [
      "Geniş dambıl ve plaka parkuru",
      "Kablo istasyonları ve smith machine",
      "Kişiye özel başlangıç antrenman programı",
      "Düzenli form kontrolü ve eğitmen desteği"
    ],
    recommendedFor: "Kas kazanımı ve genel zindelik isteyenler",
    highlight: true,
  },
  {
    id: "pt",
    title: "Personal Training (Özel Ders)",
    category: "Birebir Eğitmen Eşliğinde",
    description: "Hedeflerinize en kısa ve en güvenli yoldan ulaşmanız için uzman hocalarımızla 1-e-1 özel antrenman seansları.",
    features: [
      "Bireysel postür ve vücut analizi",
      "Haftalık gelişim takibi ve ölçümler",
      "Özel beslenme ve kalori rehberliği",
      "Sakatlık riskini sıfıra indiren hareket teknikleri"
    ],
    recommendedFor: "Hızlı ve disiplinli sonuç arayanlar",
    highlight: true,
  },
  {
    id: "fatloss",
    title: "Kilo Verme & Sıkılaşma",
    category: "Metabolik Yağ Yakımı",
    description: "Yüksek tempolu kardiyo protokolleri ve direnç egzersizleriyle kalori yakımını maksimize eden özel programlar.",
    features: [
      "Kardiyo alanı (Koşu bantları, bisikletler, eliptikler)",
      "Aralıklı antrenman (HIIT) yönlendirmesi",
      "Yağ-kas oranı izleme ve tartı analizleri",
      "Enerji artıran kondisyon rutinleri"
    ],
    recommendedFor: "Kilo vermek ve fit bir görünüme kavuşmak isteyenler",
  },
  {
    id: "group",
    title: "Grup Dersleri & Dinamik Seanslar",
    category: "Motivasyon & Sosyalleşme",
    description: "Müzik ritmi ve grup enerjisiyle hem eğlenip hem yüksek kalori yakabileceğiniz toplu ders saatleri.",
    features: [
      "Yüksek motivasyonlu ekip ortamı",
      "Kardiyo ve esneklik birleşimi",
      "Tüm kondisyon seviyelerine uygun varyasyonlar",
      "Sosyalleşme ve takım ruhu"
    ],
    recommendedFor: "Tek başına çalışmaktan sıkılanlar",
  },
  {
    id: "functional",
    title: "Fonksiyonel Antrenman",
    category: "Çeviklik & Çekirdek Gücü",
    description: "Günlük hayattaki hareket kabiliyetinizi ve omurga stabilitenizi güçlendiren dinamik serbest hareketler.",
    features: [
      "Kettlebell, sağlık topu ve direnç bantları",
      "Denge ve koordinasyon egzersizleri",
      "Core (karın/bel) güçlendirme",
      "Eklemlere dost fonksiyonel hareketler"
    ],
    recommendedFor: "Günlük enerjisini ve omurga sağlığını artırmak isteyenler",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Emre T.",
    duration: "1.5 Yıldır Üye",
    result: "-16 Kg Yağ Kaybı",
    rating: 5,
    text: "Sancaktepe'de spor salonu ararken Google'daki 900+ yorumu görüp gelmiştim. Hakikaten abartı değilmiş. Ali Hoca ve ekibinin ilgisi, makinelerin temizliği ve en önemlisi mahalledeki samimi aile ortamı harika. Asla bırakmayı düşünmüyorum.",
  },
  {
    id: "t2",
    name: "Büşra K.",
    duration: "8 Aydır Üye",
    result: "Sıkılaşma & Sağlıklı Duruş",
    rating: 5,
    text: "Bir kadın olarak spor salonuna giderken en çok dikkat ettiğim şey rahatlık ve saygılı bir ortamdı. Dynamic Fitness bu konuda 10 numara. Hocalar her harekette doğru formu gösteriyor, salon tertemiz ve havalandırması çok iyi.",
  },
  {
    id: "t3",
    name: "Burak V.",
    duration: "2 Yıldır Üye",
    result: "+7 Kg Kas Kazanımı",
    rating: 5,
    text: "Ağırlık alanları gayet yeterli, dambıllar düzenli, makineler bakımlı. Akşam iş çıkışı gittiğimde bile enerjiyi hissediyorsunuz. Fiyat/performans ve hoca kalitesi olarak Sancaktepe'nin en iyisi.",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Serbest Ağırlık & Dambıl İstasyonu",
    subtitle: "Geniş hareket alanı ve tam sıra dambıl serisi",
    category: "Ağırlık Parkuru",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop",
    sourceRef: "Instagram @dynamicfitnesssancaktepe (Ref #G1)",
  },
  {
    id: "g2",
    title: "Profesyonel Kardiyo Parkuru",
    subtitle: "Aydınlık cepheli koşu bantları ve kondisyon bisikletleri",
    category: "Kardiyo & Kondisyon",
    imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop",
    sourceRef: "Google Maps İşletme Galerisi (Ref #G3)",
  },
  {
    id: "g3",
    title: "İzole Güç & Kas Makineleri",
    subtitle: "Çift kuleli cable crossover, lat pull ve leg press istasyonu",
    category: "Makine Parkuru",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    sourceRef: "Dynamic Fitness Makine Parkuru (Ref #G2 / #G4)",
  },
  {
    id: "g4",
    title: "Fonksiyonel Egzersiz & Esneme Alanı",
    subtitle: "Core, karın ve serbest mat çalışmaları için özel zemin",
    category: "Fonksiyonel Alan",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
    sourceRef: "Salon Fonksiyonel İstasyonları (Ref #G6)",
  },
  {
    id: "g5",
    title: "Birebir Personal Training Seansı",
    subtitle: "Ali Hoca ile form düzeltme ve birebir motivasyon seansı",
    category: "Personal Training",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
    sourceRef: "Instagram @alieminepala #alipalateam (Ref #E2)",
  },
  {
    id: "g6",
    title: "Samimi Aile & Sporcu Atmosferi",
    subtitle: "Saygılı, motive edici ve temiz antrenman ortamı",
    category: "Atmosfer & Topluluk",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop",
    sourceRef: "Dynamic Fitness Üye Dayanışması (Ref #A1)",
  },
];
