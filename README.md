# NIKAHFIX

**NIKAHFIX** adalah website undangan pernikahan dengan tampilan terinspirasi dari _Netflix_ — visual modern, responsif, dan siap pakai. Dibangun dengan **React + Vite**, dengan **Supabase** untuk fitur ucapan/wish.

## Demo

[nikahfix-v01.vercel.app](https://nikahfix-v01.vercel.app/) — atau dengan nama tamu: [nikahfix-v01.vercel.app/?kepada=Budi](https://nikahfix-v01.vercel.app/?kepada=Budi)

---

## Cara Pakai

### 1. Clone & Install

```bash
git clone https://github.com/akimabs/nikahfix.git
cd nikahfix
npm install
```

### 2. Setup Gambar — Pilih Salah Satu

#### ✅ Opsi A: Lokal (paling mudah, tidak perlu CDN)

1. Taruh semua file gambar di folder `public/images/`
2. Di `src/data/config.json`, set:
   ```json
   "cdn_base_url": "/images"
   ```

Selesai! Gambar akan diakses dari server yang sama dengan website-nya.

> Lihat `public/images/README.md` untuk daftar lengkap file gambar yang dibutuhkan.

---

#### 🚀 Opsi B: GitHub CDN via jsDelivr (performa lebih baik)

Cocok kalau kamu mau gambar di-cache global dan tidak memberatkan hosting.

1. Buat repository GitHub baru (contoh: `namaakun/cdn-pernikahan`)
2. Upload semua gambar ke folder `img/` di repo tersebut
3. Di `src/data/config.json`, set:
   ```json
   "cdn_base_url": "https://cdn.jsdelivr.net/gh/namaakun/cdn-pernikahan@main/img"
   ```

---

**Daftar file gambar yang dibutuhkan** (nama bebas, sesuaikan dengan `config.json`):

| Key di config | Nama file default | Keterangan |
|---|---|---|
| `images.logo` | `NIKAHFIX.webp` | Logo NIKAHFIX |
| `images.guest_icon` | `guest-icon.webp` | Ikon profil tamu |
| `images.cover` | `compsite-update.webp` | Foto cover hero |
| `images.thumbnail` | `thumbnail.webp` | Foto halaman pembuka |
| `images.letter` | `letter.webp` | Foto surat/breaking news |
| `images.face` | `face.webp` | Avatar di ucapan tamu |
| `images.icon_4k` | `4k-icon.webp` | Badge resolusi |
| `images.icon_hd` | `hd-icon.webp` | Badge resolusi |
| `images.card_backgrounds[]` | `story1-4.webp`, dll | Background kartu bank |
| `pegantin.pria.foto` | `groom.webp` | Foto mempelai pria |
| `pegantin.wanita.foto` | `bride.webp` | Foto mempelai wanita |
| `love_story[].image` | `story1-4.webp` | Foto tiap episode |
| `meta.og_image_path` | `meta.webp` | Gambar pratinjau saat di-share |
| `audio_url` | — | URL langsung ke file MP3 (bisa dari manapun) |



### 3. Edit `src/data/config.json`

Ini adalah **satu-satunya file** yang perlu kamu edit untuk mengkustomisasi konten website.

```json
{
  "cdn_base_url": "https://cdn.jsdelivr.net/gh/namaakun/cdn@main/img",

  "meta": {
    "site_name": "NIKAHFIX",
    "title": "NIKAHFIX - Nama Pria & Nama Wanita",
    "description": "Nama Pria & Nama Wanita — Undangan Pernikahan",
    "og_image_path": "/meta.webp",
    "og_url": "https://domain-kamu.com",
    "keywords": "undangan pernikahan, digital invitation, wedding"
  },

  "pegantin": {
    "pria": {
      "foto": "/groom.webp",
      "panggilan": "Nama Panggilan",
      "nama": "Nama Lengkap Pria",
      "anak_ke": "pertama",
      "bapak": "Bapak ...",
      "ibu": "Ibu ..."
    },
    "wanita": {
      "foto": "/bride.webp",
      "panggilan": "Nama Panggilan",
      "nama": "Nama Lengkap Wanita",
      "anak_ke": "kedua",
      "bapak": "Bapak ...",
      "ibu": "Ibu ..."
    }
  },

  "audio_url": "URL_LANGSUNG_KE_MP3",
  "song_info": { "title": "Judul Lagu", "artist": "Nama Artist" },

  "tanggal_pernikahan": "DD Month YYYY",

  "intro": "Cerita singkat tentang perjalanan kalian...",
  "ayat": "\"Ayat pilihan\" (Sumber)",

  "breaking_news_img": "/letter.webp",
  "breaking_news_content": "<p>Isi surat undangan...</p>",

  "love_story": [
    {
      "image": "/story1.webp",
      "title": "Episode 1: Judul Episode",
      "duration": "26m 10s",
      "description": "Cerita episode 1..."
    }
  ],

  "location": {
    "map_embed_url": "https://www.google.com/maps/embed?...",
    "place_name": "Nama Tempat",
    "address": "Kota, Provinsi",
    "google_maps_url": "https://goo.gl/maps/..."
  },

  "show_menu": {
    "breaking_news": true,
    "bride_and_groom": true,
    "love_story": true,
    "gallery": true,
    "wish": true
  },

  "footer": {
    "message_line1": "Thank you for viewing our invitation!",
    "message_line2": "Can't wait to see u! <3",
    "link_url": ""
  },

  "bank_accounts": [
    {
      "bank_name": "Nama Bank",
      "account_number": "Nomor Rekening",
      "account_holder": "Nama Pemilik Rekening"
    }
  ]
}
```

### 4. Setup Supabase (Opsional — untuk fitur ucapan/guestbook)

> **Tanpa Supabase pun website tetap berjalan.** Ucapan tamu akan tersimpan di browser (localStorage). Aktifkan Supabase hanya kalau mau ucapan tersimpan di server dan bisa dibaca dari device lain.

#### Langkah-langkah:

**4a. Buat akun & project Supabase**
1. Buka [supabase.com](https://supabase.com) → **Start your project** → daftar / login
2. Klik **New project** → isi nama project → tunggu selesai (±1 menit)

**4b. Buat tabel otomatis (copy-paste SQL)**
1. Di dashboard Supabase, klik **SQL Editor** di menu kiri
2. Klik **New query**
3. Copy seluruh isi file [`supabase/setup.sql`](./supabase/setup.sql) yang ada di repo ini
4. Paste ke SQL Editor → klik **Run** (atau tekan `Ctrl+Enter`)

Selesai! Tabel `wishes` akan terbuat otomatis beserta pengaturan keamanannya.

**4c. Salin credentials ke `.env`**
1. Di dashboard Supabase, klik **Project Settings** → **API**
2. Salin dua nilai berikut:

```
Project URL  →  VITE_SUPABASE_URL
anon public  →  VITE_SUPABASE_ANON_KEY
```

3. Jalankan di terminal:
```bash
cp .env.example .env
```

4. Buka file `.env` dan isi nilainya:
```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
VITE_APP_TABLE_NAME=wishes
```



### 5. Jalankan Lokal

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173)

### 6. Kirim Undangan dengan Nama Tamu

Tambahkan query param `?kepada=NamaTamu` di URL:

```
https://domain-kamu.com/?kepada=Budi+dan+Ani
```

Nama tamu akan muncul di halaman dan judul tab otomatis berubah.

---

## Deploy ke GitHub Pages

Repo ini sudah dilengkapi dengan **GitHub Actions** (`.github/workflows/deploy.yml`) untuk deploy otomatis ke GitHub Pages.

### Langkah-langkah:

1. **Push ke GitHub:** Push repository ini ke akun GitHub kamu.
2. **Aktifkan Pages:**
   - Masuk ke repo kamu di GitHub.
   - Pergi ke **Settings** → **Pages**.
   - Di bagian **Build and deployment** → **Source**, pilih **GitHub Actions**.
3. **Selesai:** Setiap kali kamu push ke branch `main`, GitHub akan otomatis build dan deploy website kamu.

---

### Setup Environment Variables (untuk Supabase)

Jika kamu menggunakan Supabase, kamu perlu menambahkan **Secret** di GitHub:

1. Pergi ke **Settings** → **Secrets and variables** → **Actions**.
2. Klik **New repository secret** dan tambahkan:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_TABLE_NAME` (isi dengan `wishes`)

---

## Opsi Deploy Lain (Netlify)

Jika kamu lebih suka Netlify, file `netlify.toml` tetap tersedia. Kamu bisa:
- **Manual:** Hubungkan repo GitHub ke Netlify.
- **Auto-build:** Netlify akan otomatis mendeteksi `npm run build` dan folder `dist`.

---


## Teknologi

- **React + Vite** — framework & bundler
- **TailwindCSS** — styling
- **Supabase** — backend untuk fitur ucapan (opsional)
- **jsDelivr / GitHub CDN** — hosting gambar

---

## Kontribusi

Pull request welcome! Kalau ada fitur yang ingin ditambah atau bug yang ditemukan, silakan buka issue.
