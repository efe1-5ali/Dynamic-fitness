import express from "express";
import path from "path";
import session from "express-session";
import bcrypt from "bcryptjs";
import { DatabaseSync } from "node:sqlite";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    name: "dynamic_fitness_sid",
    secret: process.env.SESSION_SECRET || "dynamic_fitness_secret_sancaktepe_2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // development & iframe context
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "lax",
    },
  })
);

// Declare session types
declare module "express-session" {
  interface SessionData {
    adminUser?: {
      id: number;
      phone_number: string;
    };
  }
}

// ----------------------------------------------------
// DATABASE INITIALIZATION (SQLite with prepared statements)
// ----------------------------------------------------
const dbPath = path.join(process.cwd(), "database.sqlite");
const db = new DatabaseSync(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'yeni',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at);

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_number TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed default admin if not exists
const defaultPhone = process.env.ADMIN_PHONE_NUMBER || "02165616634";
const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";

try {
  const checkAdminStmt = db.prepare("SELECT * FROM admin_users WHERE phone_number = ?");
  const existingAdmin = checkAdminStmt.get(defaultPhone);

  if (!existingAdmin) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(defaultPassword, salt);
    const insertAdminStmt = db.prepare(
      "INSERT INTO admin_users (phone_number, password_hash) VALUES (?, ?)"
    );
    insertAdminStmt.run(defaultPhone, hash);
    console.log(`[DB] Seeded initial admin with phone: ${defaultPhone}`);
  }
} catch (err) {
  console.error("[DB] Error seeding admin user:", err);
}

// Seed sample initial appointment if table empty so demo looks great immediately
try {
  const countRow = db.prepare("SELECT COUNT(*) as count FROM appointments").get() as { count: number };
  if (countRow && countRow.count === 0) {
    const seedAppt = db.prepare(`
      INSERT INTO appointments (full_name, phone, service, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now', '-2 hours'))
    `);
    seedAppt.run(
      "Mert Kaya",
      "0532 555 12 34",
      "Fitness & Vücut Geliştirme",
      "Akşam saatleri için salon üyeliği ve antrenman programı hakkında bilgi almak istiyorum.",
      "yeni"
    );
    const seedAppt2 = db.prepare(`
      INSERT INTO appointments (full_name, phone, service, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now', '-1 days'))
    `);
    seedAppt2.run(
      "Selin Demir",
      "0544 333 44 55",
      "Personal Training (Özel Ders)",
      "Ali Hoca ile birebir antrenman ve beslenme programı için randevu talep ediyorum.",
      "arandi"
    );
  }
} catch (err) {
  console.error("[DB] Error seeding initial appointments:", err);
}

// ----------------------------------------------------
// VALIDATION & WHITELISTS
// ----------------------------------------------------
const ALLOWED_SERVICES = [
  "Kilo Vermek İstiyorum",
  "Kas Yapmak İstiyorum",
  "Personal Training (Birebir Özel Ders) İstiyorum",
  "Sadece Bilgi Almak İstiyorum",
  "Grup Derslerine Katılmak İstiyorum",
  "Fonksiyonel Antrenman Yapmak İstiyorum",
  "Fitness & Vücut Geliştirme",
  "Personal Training (Özel Ders)",
  "Kilo Verme & Sıkılaşma",
  "Grup Dersleri (Pilates/Spinning)",
  "Fonksiyonel Antrenman & Kondisyon",
  "Genel Bilgi & Salon Üyeliği",
];

const ALLOWED_STATUSES = ["yeni", "okundu", "arandi"];

// Rate limiting in-memory for login attempts (15 mins, 5 attempts max)
interface LoginAttempt {
  count: number;
  firstAttempt: number;
}
const loginAttempts = new Map<string, LoginAttempt>();

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Info endpoint for public gym data
app.get("/api/gym-info", (req, res) => {
  res.json({
    success: true,
    data: {
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
      allowedServices: ALLOWED_SERVICES,
    },
  });
});

// POST /api/appointment - Public form endpoint
app.post("/api/appointment", (req, res) => {
  try {
    const { full_name, phone, service, message } = req.body;

    // Validation: full_name
    if (!full_name || typeof full_name !== "string" || full_name.trim().length < 2 || full_name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        error: "Ad Soyad alanı zorunludur (2-100 karakter arası olmalıdır).",
      });
    }

    // Validation: phone
    // Sadece rakam, boşluk, parantez ve + karakterleri; 10-15 karakter
    const phoneClean = (phone || "").toString().trim();
    const phoneRegex = /^[0-9+() \-]{10,20}$/;
    const digitsOnly = phoneClean.replace(/\D/g, "");
    if (!phoneClean || !phoneRegex.test(phoneClean) || digitsOnly.length < 10) {
      return res.status(400).json({
        success: false,
        error: "Telefon numarası geçersiz. Lütfen geçerli bir telefon numarası girin.",
      });
    }

    // Validation: service whitelist
    if (!service || !ALLOWED_SERVICES.includes(service.trim())) {
      return res.status(400).json({
        success: false,
        error: "Lütfen geçerli bir hizmet seçiniz.",
      });
    }

    // Validation: message
    const cleanMessage = message && typeof message === "string" ? message.trim().slice(0, 1000) : null;

    // Prepared statement insertion
    const insertStmt = db.prepare(`
      INSERT INTO appointments (full_name, phone, service, message, status)
      VALUES (?, ?, ?, ?, 'yeni')
    `);

    const result = insertStmt.run(full_name.trim(), phoneClean, service.trim(), cleanMessage);
    const newId = Number(result.lastInsertRowid);

    // Email notification simulation (non-blocking, failure won't affect DB record)
    console.log(`[NOTIFICATION] Yeni randevu alındı: #${newId} - ${full_name} (${phoneClean}) -> ${service}`);

    return res.status(201).json({
      success: true,
      data: {
        id: newId,
        message: "Randevu talebiniz başarıyla alındı! Ekibimiz en kısa sürede sizinle iletişime geçecektir.",
      },
    });
  } catch (err: any) {
    console.error("[API] Error creating appointment:", err);
    return res.status(500).json({
      success: false,
      error: "Sunucu hatası oluştu, lütfen daha sonra tekrar deneyiniz.",
    });
  }
});

// ----------------------------------------------------
// ADMIN ROUTES (Protected)
// ----------------------------------------------------

// POST /admin/login
app.post("/admin/login", (req, res) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    // Check rate limit
    const attempt = loginAttempts.get(ip);
    if (attempt) {
      if (now - attempt.firstAttempt < 15 * 60 * 1000) {
        if (attempt.count >= 5) {
          return res.status(429).json({
            success: false,
            error: "Çok fazla başarısız giriş denemesi. Lütfen 15 dakika sonra tekrar deneyiniz.",
          });
        }
      } else {
        loginAttempts.delete(ip);
      }
    }

    const { phone_number, password } = req.body;
    if (!phone_number || !password) {
      return res.status(400).json({
        success: false,
        error: "Telefon numarası ve şifre gereklidir.",
      });
    }

    // Prepared statement lookup
    const findStmt = db.prepare("SELECT * FROM admin_users WHERE phone_number = ?");
    const user = findStmt.get(phone_number.trim()) as { id: number; phone_number: string; password_hash: string } | undefined;

    if (!user) {
      // Record failed attempt
      const current = loginAttempts.get(ip) || { count: 0, firstAttempt: now };
      loginAttempts.set(ip, { count: current.count + 1, firstAttempt: current.firstAttempt });

      return res.status(401).json({
        success: false,
        error: "Telefon numarası veya şifre hatalı.",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      const current = loginAttempts.get(ip) || { count: 0, firstAttempt: now };
      loginAttempts.set(ip, { count: current.count + 1, firstAttempt: current.firstAttempt });

      return res.status(401).json({
        success: false,
        error: "Telefon numarası veya şifre hatalı.",
      });
    }

    // Reset rate limit on success
    loginAttempts.delete(ip);

    // Save session
    req.session.adminUser = {
      id: user.id,
      phone_number: user.phone_number,
    };

    return res.json({
      success: true,
      data: {
        phone_number: user.phone_number,
      },
    });
  } catch (err: any) {
    console.error("[ADMIN] Login error:", err);
    return res.status(500).json({
      success: false,
      error: "Giriş işlemi sırasında sunucu hatası.",
    });
  }
});

// POST /admin/logout
app.post("/admin/logout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("dynamic_fitness_sid");
    return res.json({ success: true });
  });
});

// GET /admin/me - Check current admin session
app.get("/admin/me", (req, res) => {
  if (req.session && req.session.adminUser) {
    return res.json({
      success: true,
      authenticated: true,
      admin: req.session.adminUser,
      defaultCredentialsHint: {
        phone: defaultPhone,
        password: defaultPassword,
      },
    });
  }
  return res.json({
    success: true,
    authenticated: false,
    defaultCredentialsHint: {
      phone: defaultPhone,
      password: defaultPassword,
    },
  });
});

// Middleware: Require Admin Auth
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.session || !req.session.adminUser) {
    return res.status(401).json({
      success: false,
      error: "Yetkisiz erişim. Lütfen admin girişi yapınız.",
    });
  }
  next();
}

// GET /admin/appointments
app.get("/admin/appointments", requireAdminAuth, (req, res) => {
  try {
    const { status } = req.query;

    let rows;
    if (status && typeof status === "string" && ALLOWED_STATUSES.includes(status)) {
      const stmt = db.prepare("SELECT * FROM appointments WHERE status = ? ORDER BY id DESC");
      rows = stmt.all(status);
    } else {
      const stmt = db.prepare("SELECT * FROM appointments ORDER BY id DESC");
      rows = stmt.all();
    }

    return res.json({
      success: true,
      data: rows,
    });
  } catch (err: any) {
    console.error("[ADMIN] Error fetching appointments:", err);
    return res.status(500).json({
      success: false,
      error: "Kayıtlar listelenirken hata oluştu.",
    });
  }
});

// PATCH /admin/appointments/:id
app.patch("/admin/appointments/:id", requireAdminAuth, (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz ID parametresi.",
      });
    }

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz durum. İzin verilenler: 'yeni', 'okundu', 'arandi'",
      });
    }

    const updateStmt = db.prepare("UPDATE appointments SET status = ? WHERE id = ?");
    const result = updateStmt.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen ID'ye sahip randevu kaydı bulunamadı.",
      });
    }

    return res.json({
      success: true,
      data: { id, status },
    });
  } catch (err: any) {
    console.error("[ADMIN] Error updating appointment:", err);
    return res.status(500).json({
      success: false,
      error: "Güncelleme sırasında hata oluştu.",
    });
  }
});

// DELETE /admin/appointments/:id
app.delete("/admin/appointments/:id", requireAdminAuth, (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz ID parametresi.",
      });
    }

    const deleteStmt = db.prepare("DELETE FROM appointments WHERE id = ?");
    const result = deleteStmt.run(id);

    return res.json({
      success: true,
      changes: result.changes,
    });
  } catch (err: any) {
    console.error("[ADMIN] Delete appointment error:", err);
    return res.status(500).json({
      success: false,
      error: "Silme sırasında hata oluştu.",
    });
  }
});

// ----------------------------------------------------
// VITE INTEGRATION FOR SERVING FRONTEND
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dynamic Fitness Center Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
