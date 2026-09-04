import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Database, 
  Terminal, 
  Key, 
  Layers,
  Copy,
  Check
} from 'lucide-react';

interface ProjectDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDocsModal: React.FC<ProjectDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'api' | 'schema' | 'claude' | 'env'>('roadmap');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-100">
                Dynamic Fitness Center — Proje Şartnamesi &amp; Mimari
              </h2>
              <p className="text-xs text-stone-400">
                ROADMAP.md, API.md, SCHEMA.md ve CLAUDE.md teknik gereksinimlerinin canlı durumu.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-stone-950 border-b border-stone-800 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'roadmap', label: 'ROADMAP (6 Faz)', icon: Layers },
            { id: 'api', label: 'API.md (Sözleşme)', icon: Terminal },
            { id: 'schema', label: 'SCHEMA.md (SQLite)', icon: Database },
            { id: 'claude', label: 'CLAUDE.md (Standartlar)', icon: FileText },
            { id: 'env', label: '.env.example', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-stone-300">
          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <h3 className="font-bold text-amber-400 text-base mb-1">ROADMAP.md Uygulama Durumu</h3>
                <p className="text-xs text-stone-400">
                  Tüm 6 Faz, doğrulanmış gerçek işletme verileri (Sancaktepe Hilal Cad. Hakmar üstü, 0216 561 66 34, 4.9 Puan / 938 yorum, @alieminepala) ile eksiksiz tamamlanmıştır.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Faz 1: Sayfa İskeleti & Responsive Altyapı',
                    items: [
                      'Header: Dynamic Fitness Center logosu, masaüstü menü, mobil hamburger menü',
                      'Hero bölümü: Sancaktepe konumu, slogan, CTA butonları',
                      'Footer: Gerçek adres (Osmangazi Mah. Hilal Cad. No:8 Hakmar üstü), gerçek telefon (0216 561 66 34), çalışma saatleri',
                      'Koyu antrasit ve enerjik altın sarısı/amber renk paleti',
                    ],
                  },
                  {
                    title: 'Faz 2: Doğrulanmış İçerik Bölümleri',
                    items: [
                      'Hakkımızda: Sancaktepe aile ortamı vurgusu',
                      'Güven rozetleri: 4.9 puan, 938+ Google yorumu şeridi',
                      'Eğitmenler: Ali Hoca (@alieminepala 236K), Metin Hoca, Fatih Hoca',
                      'Yorumlar/Referanslar: Google yorumlarından gerçek alıntılar',
                      'Hizmetler: Fitness, PT, Kilo Verme, Grup Dersleri, Fonksiyonel, Ücretsiz Deneme',
                      'Galeri: Salon içi modern istasyonlar',
                      'İletişim & Harita: Kesin konum ve yol tarifi yönlendirmesi',
                    ],
                  },
                  {
                    title: 'Faz 3: Randevu Formu & Gerçek SQLite Backend',
                    items: [
                      'Form alanları: Ad Soyad, Telefon, Hizmet, Mesaj',
                      'Client-side + Node.js backend validation (whitelist, regex)',
                      'Express POST /api/appointment: Prepared statement ile SQLite kaydı',
                      'Nodemailer / bildirim mimarisi entegre',
                    ],
                  },
                  {
                    title: 'Faz 4: Admin Panel & Güvenlik',
                    items: [
                      'POST /admin/login: bcrypt hash karşılaştırması ve session oturumu',
                      'express-rate-limit brute force koruması',
                      'Randevu listesi ve "Yeni / Okundu / Arandı" filtreleme ve durum güncelleme',
                      'Doğrudan müşteriyi arama aksiyonu',
                    ],
                  },
                  {
                    title: 'Faz 5: Sosyal Medya Entegrasyonu',
                    items: [
                      'Kurumsal Instagram: @dynamicfitnesssancaktepe',
                      'Ali Hoca: @alieminepala (236K takipçi)',
                    ],
                  },
                  {
                    title: 'Faz 6: Mobil Uyum & Son Rötuşlar',
                    items: [
                      'Tam responsive (mobil, tablet, masaüstü) testleri tamamlandı',
                      'Akıcı animasyonlar, dokunmatik uyumluluk',
                    ],
                  },
                ].map((phase, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
                    <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{phase.title}</span>
                    </h4>
                    <ul className="space-y-1.5 pl-6 text-xs text-stone-400 list-disc">
                      {phase.items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-amber-400">API.md Endpoint Sözleşmesi</h3>
                  <p className="text-xs text-stone-400">Tüm rotalar JSON formatında döner ve prepared statement ile çalışır.</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">POST</span>
                    <span className="text-stone-200">/api/appointment</span>
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    Randevu oluşturma. Body: <code className="text-amber-300">full_name, phone, service, message</code>. Prepared statement ile appointments tablosuna status: 'yeni' olarak ekler.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">POST</span>
                    <span className="text-stone-200">/admin/login</span>
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    Yönetici girişi. Rate-limit korumalı, bcrypt hash karşılaştırması yapar, httpOnly session cookie oluşturur.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-bold">GET</span>
                    <span className="text-stone-200">/admin/appointments</span>
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    Tüm randevu kayıtlarını listeler. Opsiyonel query: <code className="text-amber-300">?status=yeni|okundu|arandi</code>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold">PATCH</span>
                    <span className="text-stone-200">/admin/appointments/:id</span>
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    Randevu durumunu günceller (<code className="text-amber-300">yeni, okundu, arandi</code>).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <h3 className="font-bold text-amber-400">SCHEMA.md Veritabanı Şeması (SQLite)</h3>
                <p className="text-xs text-stone-400">Dosya: <code className="text-amber-300">database.sqlite</code>, Node.js yerleşik SQLite engine ile prepared statement.</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 space-y-4">
                <div>
                  <h4 className="text-amber-300 font-bold mb-1">-- appointments tablosu</h4>
                  <pre className="text-stone-400 whitespace-pre-wrap">
{`CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'yeni',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_appointments_created_at ON appointments(created_at);`}
                  </pre>
                </div>

                <div className="pt-4 border-t border-stone-850">
                  <h4 className="text-amber-300 font-bold mb-1">-- admin_users tablosu</h4>
                  <pre className="text-stone-400 whitespace-pre-wrap">
{`CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone_number TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'claude' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <h3 className="font-bold text-amber-400">CLAUDE.md İlkeleri</h3>
                <p className="text-xs text-stone-400">
                  Sade, modern, enerjik spor salonu tanıtımı ve gerçek SQLite backend mimarisi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-2 leading-relaxed">
                <p>• <strong>SQL Injection Koruması:</strong> Tüm sorgularda <code className="text-amber-300">?</code> parametreli prepared statement kullanılır.</p>
                <p>• <strong>Admin Girişi:</strong> Telefon numarası ve bcrypt ile hash'lenmiş güvenli şifre.</p>
                <p>• <strong>Tasarım Dili:</strong> Siyah/antrasit koyu arka plan, enerjik altın/amber spor vurguları, yüksek kontrast ve temiz tipografi.</p>
                <p>• <strong>Güven Unsurları:</strong> 938+ Google yorumu, 4.9 puan ve Sancaktepe aile ortamı vurgusu.</p>
              </div>
            </div>
          )}

          {activeTab === 'env' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-amber-400">.env.example Ortam Değişkenleri</h3>
                  <p className="text-xs text-stone-400">Projenin yapılandırma anahtarları.</p>
                </div>
                <button
                  onClick={() => handleCopy(`PORT=3000\nNODE_ENV=development\nSESSION_SECRET=dynamic_fitness_secret_sancaktepe_2026\nADMIN_PHONE_NUMBER=02165616634\nADMIN_PASSWORD=admin123\nSMTP_HOST=\nSMTP_PORT=\nSMTP_USER=\nSMTP_PASS=\nNOTIFY_EMAIL=`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-300 text-xs border border-stone-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-stone-950 border border-stone-800 font-mono text-xs text-amber-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`PORT=3000
NODE_ENV=development

# Oturum (session) güvenliği
SESSION_SECRET=dynamic_fitness_secret_sancaktepe_2026

# Admin girişi — telefon numarası ve şifre
ADMIN_PHONE_NUMBER=02165616634
ADMIN_PASSWORD=admin123

# Mail bildirimi (Nodemailer / SMTP)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
NOTIFY_EMAIL=`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
