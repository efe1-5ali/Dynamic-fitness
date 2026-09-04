import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  LogOut, 
  Phone, 
  Calendar, 
  Check, 
  Clock, 
  AlertCircle, 
  Trash2, 
  RefreshCw, 
  ShieldCheck,
  User,
  Filter,
  CheckCircle2,
  PhoneCall,
  Search
} from 'lucide-react';
import { Appointment } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPhone, setAdminPhone] = useState('02165616634');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Check current session on open
  useEffect(() => {
    if (isOpen) {
      checkAuthSession();
    }
  }, [isOpen]);

  const checkAuthSession = async () => {
    try {
      const res = await fetch('/admin/me');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchAppointments();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: adminPhone.trim(),
          password: adminPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Telefon numarası veya şifre hatalı.');
      }

      setIsAuthenticated(true);
      fetchAppointments();
    } catch (err: any) {
      setLoginError(err.message || 'Giriş yapılamadı.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setAppointments([]);
  };

  const fetchAppointments = async (status?: string) => {
    setLoadingData(true);
    try {
      const query = status && status !== 'all' ? `?status=${status}` : '';
      const res = await fetch(`/admin/appointments${query}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setAppointments(data.data);
      }
    } catch (err) {
      console.error('Kayıtları çekerken hata:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: 'yeni' | 'okundu' | 'arandi') => {
    try {
      const res = await fetch(`/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev =>
          prev.map(a => (a.id === id ? { ...a, status: newStatus } : a))
        );
        setActionSuccess(`Randevu #${id} durumu "${newStatus}" olarak güncellendi.`);
        setTimeout(() => setActionSuccess(null), 2500);
      }
    } catch (err) {
      console.error('Güncelleme hatası:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`#${id} numaralı randevuyu silmek istediğinize emin misiniz?`)) return;
    try {
      const res = await fetch(`/admin/appointments/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev => prev.filter(a => a.id !== id));
        setActionSuccess(`Randevu #${id} silindi.`);
        setTimeout(() => setActionSuccess(null), 2500);
      }
    } catch (err) {
      console.error('Silme hatası:', err);
    }
  };

  if (!isOpen) return null;

  const filtered = appointments.filter(a => {
    const matchesFilter = filterStatus === 'all' || a.status === filterStatus;
    const matchesQuery = 
      a.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone.includes(searchQuery) ||
      a.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-100 flex items-center gap-2">
                <span>Dynamic Fitness Yönetim Paneli</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-mono">
                  Gerçek DB
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Gelen üye randevuları, durum güncellemeleri ve SQLite veritabanı yönetimi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
                title="Çıkış Yap"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Çıkış</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action success bar */}
        {actionSuccess && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-6 py-2 text-xs text-emerald-300 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* Login View */
            <div className="max-w-md mx-auto py-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-100">Yetkili Girişi</h3>
                <p className="text-xs text-stone-400 mt-1">
                  API.md kuralları gereği bcrypt ile hash'lenmiş ve rate-limit korumalı oturum.
                </p>
              </div>

              {loginError && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Yönetici Telefon Numarası
                  </label>
                  <input
                    type="text"
                    required
                    value={adminPhone}
                    onChange={(e) => setAdminPhone(e.target.value)}
                    placeholder="02165616634"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Demo varsayılan telefon: <strong className="text-stone-300">02165616634</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Şifre
                  </label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Demo varsayılan şifre: <strong className="text-stone-300">admin123</strong>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {loginLoading ? <span>Doğrulanıyor...</span> : <span>Panele Giriş Yap</span>}
                </button>
              </form>

              <div className="mt-8 p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 text-[11px] text-stone-400 space-y-1">
                <span className="font-semibold text-stone-300 block mb-1">Güvenlik Mimarisi:</span>
                <p>• Tüm sorgular SQLite prepared statement (<code className="text-amber-400">?</code>) ile çalışır.</p>
                <p>• Şifreler düz metin olarak değil, bcrypt hash olarak saklanır.</p>
                <p>• 15 dakikada 5 başarısız deneme sonrası rate limiting uygulanır.</p>
              </div>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-5">
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800">
                {/* Search */}
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    placeholder="Ad, telefon veya hizmet ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto">
                  {[
                    { key: 'all', label: 'Tümü' },
                    { key: 'yeni', label: 'Yeni' },
                    { key: 'okundu', label: 'Okundu' },
                    { key: 'arandi', label: 'Arandı' },
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilterStatus(f.key)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        filterStatus === f.key
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}

                  <button
                    onClick={() => fetchAppointments(filterStatus)}
                    className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 transition-colors ml-1"
                    title="Yenile"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-[11px] text-stone-400 block">Toplam Kayıt</span>
                  <span className="text-xl font-black text-stone-100">{appointments.length}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-[11px] text-amber-400 block">Yeni Bekleyen</span>
                  <span className="text-xl font-black text-amber-300">
                    {appointments.filter(a => a.status === 'yeni').length}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-[11px] text-sky-400 block">Okunanlar</span>
                  <span className="text-xl font-black text-sky-300">
                    {appointments.filter(a => a.status === 'okundu').length}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-[11px] text-emerald-400 block">Arananlar / Tamamlanan</span>
                  <span className="text-xl font-black text-emerald-300">
                    {appointments.filter(a => a.status === 'arandi').length}
                  </span>
                </div>
              </div>

              {/* Appointments List */}
              {loadingData ? (
                <div className="py-12 text-center text-xs text-stone-400">
                  Veritabanından randevular yükleniyor...
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-12 text-center text-xs text-stone-400 bg-stone-950/40 rounded-2xl border border-stone-800/80">
                  Filtreye uygun randevu kaydı bulunamadı.
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-4 sm:p-5 rounded-2xl bg-stone-950/90 border border-stone-800/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-stone-700 transition-colors"
                    >
                      {/* Customer Info */}
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            #{appt.id}
                          </span>
                          <h4 className="text-base font-bold text-stone-100">
                            {appt.full_name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              appt.status === 'yeni'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : appt.status === 'okundu'
                                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}
                          >
                            {appt.status}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            {new Date(appt.created_at).toLocaleString('tr-TR')}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-stone-400 flex-wrap">
                          <span className="text-stone-300 font-medium">Hizmet: {appt.service}</span>
                          <span className="text-stone-600">•</span>
                          <a
                            href={`tel:${appt.phone.replace(/\s+/g, '')}`}
                            className="text-amber-400 hover:underline flex items-center gap-1 font-mono"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>{appt.phone}</span>
                          </a>
                        </div>

                        {appt.message && (
                          <p className="text-xs text-stone-300 bg-stone-900/80 p-2.5 rounded-xl border border-stone-850 mt-2 italic">
                            "{appt.message}"
                          </p>
                        )}
                      </div>

                      {/* Status Action Buttons */}
                      <div className="flex items-center gap-2 self-start lg:self-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-850">
                        <button
                          onClick={() => handleUpdateStatus(appt.id, 'yeni')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            appt.status === 'yeni'
                              ? 'bg-amber-500 text-stone-950 font-bold'
                              : 'bg-stone-900 hover:bg-stone-800 text-stone-400 border border-stone-800'
                          }`}
                        >
                          Yeni
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(appt.id, 'okundu')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            appt.status === 'okundu'
                              ? 'bg-sky-500 text-stone-950 font-bold'
                              : 'bg-stone-900 hover:bg-stone-800 text-stone-400 border border-stone-800'
                          }`}
                        >
                          Okundu
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(appt.id, 'arandi')}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            appt.status === 'arandi'
                              ? 'bg-emerald-500 text-stone-950 font-bold'
                              : 'bg-stone-900 hover:bg-stone-800 text-stone-400 border border-stone-800'
                          }`}
                        >
                          Arandı
                        </button>

                        <a
                          href={`tel:${appt.phone.replace(/\s+/g, '')}`}
                          className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-colors"
                          title="Hemen Ara"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => handleDelete(appt.id)}
                          className="p-2 rounded-lg bg-stone-900 hover:bg-rose-500/20 text-stone-500 hover:text-rose-400 border border-stone-800 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
