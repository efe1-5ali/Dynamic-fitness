import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  User, 
  FileText, 
  Clock, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { GYM_INFO, SERVICE_GOAL_MAP } from '../data/gymData';

interface GymAppointmentFormProps {
  initialService?: string;
}

export const GymAppointmentForm: React.FC<GymAppointmentFormProps> = ({ initialService }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(
    (initialService && (SERVICE_GOAL_MAP[initialService] || initialService)) || GYM_INFO.allowedServices[0]
  );
  const [message, setMessage] = useState('');
  const [goalPrefilled, setGoalPrefilled] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ id: number; message: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      const resolved = SERVICE_GOAL_MAP[initialService] || initialService;
      if (GYM_INFO.allowedServices.includes(resolved)) {
        setService(resolved);
        setGoalPrefilled(resolved);
      }
    }
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessData(null);

    // Client-side quick check
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Lütfen adınızı ve soyadınızı eksiksiz giriniz.');
      return;
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMsg('Lütfen geçerli bir telefon numarası giriniz (en az 10 hane).');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone: phone.trim(),
          service: service.trim(),
          message: message.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Randevu gönderilemedi. Lütfen tekrar deneyin.');
      }

      setSuccessData({
        id: data.data.id,
        message: data.data.message || 'Randevu talebiniz başarıyla veritabanımıza kaydedildi!',
      });

      // Clear form
      setFullName('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      console.error('Randevu gönderme hatası:', err);
      setErrorMsg(err.message || 'Sunucuya bağlanırken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="randevu" className="py-16 md:py-24 border-b border-stone-800/60 bg-stone-950 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Context & Assurances */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Hızlı Randevu &amp; Bilgi Hattı</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight leading-tight">
              İlk Adımı Atın, Sizi Dinleyelim
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Formu doldurduğunuzda bilgileriniz anında salon yetkililerimize güvenle iletilir. 
              Baş antrenörümüz Ali Hoca ve eğitmen ekibimiz hedeflerinize uygun üyelik ve antrenman detayları için sizinle en kısa sürede iletişime geçecektir.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-100">Hızlı Geri Dönüş</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Çalışma saatleri içinde ortalama 15 dakika içinde telefonla geri dönüş sağlıyoruz.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-100">Birebir İlgi &amp; Rehberlik</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Hedefinize, fiziksel durumunuza ve seviyenize en uygun antrenman programını eğitmenlerimizle belirleyin.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl relative">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-stone-100">
                  Randevu / Bilgi Talebi Oluştur
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Lütfen aşağıdaki bilgileri doldurun. Ekibimiz sizinle telefon üzerinden irtibat kuracaktır.
                </p>
              </div>

              {/* Success Notification */}
              {successData && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 flex items-start gap-3 animate-in fade-in duration-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold text-emerald-300 mb-1">
                      Kayıt Başarılı! (Randevu No: #{successData.id})
                    </p>
                    <p className="text-emerald-300/80 leading-relaxed">
                      {successData.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 flex items-start gap-3 animate-in fade-in duration-300">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm font-medium">
                    {errorMsg}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Adınız Soyadınız <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
                    <input
                      type="text"
                      required
                      placeholder="Örn. Ahmet Yılmaz"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Telefon Numaranız <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
                    <input
                      type="tel"
                      required
                      placeholder="Örn. 0532 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection Buttons (Top Option Kept, Bottom Select Removed) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-stone-300">
                      İlgilendiğiniz Hedef / Hizmet <span className="text-rose-400">*</span>
                    </label>
                    {goalPrefilled && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                        <Sparkles className="w-3 h-3" />
                        <span>Hedefinize göre seçildi</span>
                      </span>
                    )}
                  </div>

                  {/* Goal Selector Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {GYM_INFO.allowedServices.slice(0, 4).map((item) => {
                      const isSelected = service === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setService(item);
                            setGoalPrefilled(item);
                          }}
                          className={`p-3 rounded-xl text-xs sm:text-[13px] font-semibold text-left transition-all border flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/40 shadow-sm'
                              : 'bg-stone-900/90 border-stone-800 text-stone-300 hover:border-stone-700 hover:text-stone-100 hover:bg-stone-850'
                          }`}
                        >
                          <span className="leading-snug">{item}</span>
                          {isSelected && <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Ek Not veya Hedefiniz (Opsiyonel)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Örn: Akşam saatleri müsaitim, kilo vermek ve kondisyon kazanmak istiyorum."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer mt-2"
                >
                  {loading ? (
                    <span>Kaydediliyor...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Randevu Talebini Gönder</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-stone-500 text-center mt-2">
                  Bilgileriniz üçüncü taraflarla paylaşılmaz. Sadece salon yetkilisi sizinle iletişim kurar.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
