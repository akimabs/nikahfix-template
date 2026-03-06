# NIKAHFIX

**NIKAHFIX** adalah website undangan pernikahan dengan tampilan terinspirasi dari _Netflix_ — visual modern, responsif, dan siap pakai. Dibangun dengan **React + Vite**, dengan **Supabase** untuk fitur ucapan/wish.

## Demo

[nikahfix-template.com](https://akimabs.github.io/nikahfix-template)

---

## Cara Pakai

### 1. Clone & Install

```bash
git clone https://github.com/akimabs/nikahfix-template.git
cd nikahfix-template
npm install
```

### 2. Setup Gambar

Ada dua cara untuk mengatur gambar:

#### ✅ Opsi A: Lokal (Rekomendasi)
1. Taruh semua file gambar kamu di folder `public/images/`.
2. Di `src/data/config.json`, pastikan `"cdn_base_url": "/images"`.
3. Gunakan path relatif di config, contoh: `"logo": "/logo.webp"`.

#### 🚀 Opsi B: CDN
1. Upload gambar ke CDN favoritmu (misal GitHub + jsDelivr).
2. Di `src/data/config.json`, set `"cdn_base_url"` ke URL CDN kamu.

---

### 3. Edit `src/data/config.json`

Ini adalah file utama untuk kustomisasi. Semua teks, gambar, dan link diatur di sini.

```json
{
  "cdn_base_url": "/images",
  "meta": {
    "site_name": "Wedding Invitation",
    "title": "Wedding Invitation - Groom & Bride",
    "description": "Groom & Bride: Before the Big Day",
    "og_image_path": "/sample_cover.png",
    "og_url": "https://yourdomain.com",
    "keywords": "wedding invitation, digital invitation"
  },
  "images": {
    "logo": "/logo.webp",
    "guest_icon": "/guest-icon.webp",
    "cover": "/cover.webp",
    "letter": "/letter.webp",
    "face": "/face.webp",
    "thumbnail": "/thumbnail.webp"
  },
  "pegantin": {
    "pria": {
      "foto": "/groom.webp",
      "panggilan": "Groom",
      "nama": "Full Name Groom",
      "anak_ke": "pertama",
      "bapak": "Father's Name",
      "ibu": "Mother's Name"
    },
    "wanita": {
      "foto": "/bride.webp",
      "panggilan": "Bride",
      "nama": "Full Name Bride",
      "anak_ke": "kedua",
      "bapak": "Father's Name",
      "ibu": "Mother's Name"
    }
  },
  "audio_url": "/sound/backsound.mp3",
  "tanggal_pernikahan": "01 January 2026",
  "intro": "Cerita singkat perjalanan kalian...",
  "location": {
    "map_embed_url": "URL_EMBED_GOOGLE_MAPS",
    "place_name": "Nama Tempat",
    "address": "Alamat Lengkap",
    "google_maps_url": "LINK_GOOGLE_MAPS"
  },
  "bank_accounts": [
    {
      "bank_name": "Bank Name",
      "account_number": "1234567890",
      "account_holder": "Full Name"
    }
  ]
}
```

---

### 4. Setup Supabase (Opsional - Guestbook)

Fitur ucapan tamu akan otomatis menggunakan **localStorage** jika Supabase tidak dikonfigurasi. Untuk mengaktifkan sinkronisasi cloud:

1. Buat project di [Supabase](https://supabase.com).
2. Jalankan SQL di `supabase/setup.sql` pada SQL Editor Supabase.
3. Salin `.env.example` menjadi `.env`.
4. Isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` dari dashboard Supabase (Settings > API).

---

### 5. Deployment (GitHub Pages)

Repo ini sudah siap untuk **GitHub Pages** via GitHub Actions.

1. Push repo ini ke GitHub kamu.
2. Di `vite.config.js`, pastikan `base` sudah sesuai:
   - Jika menggunakan domain `username.github.io/repo-name`, set `base: '/repo-name/'`.
   - Jika menggunakan custom domain (seperti `nikahfix.com`), set `base: '/'`.
3. Buka **Settings > Pages** di GitHub Dashboard.
4. Di bagian **Build and deployment > Source**, pilih **GitHub Actions**.
5. Tunggu proses deployment selesai di tab **Actions**.

---

## Teknologi

- **React + Vite**
- **TailwindCSS**
- **Supabase** (Guestbook)
- **GitHub Actions** (Auto Deploy)

---

## Kontribusi

Feel free to fork and pull request!
