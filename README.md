<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00ff88,50:00ccff,100:7b2ff7&height=200&section=header&text=RANZ%20ACTIVE&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=40&desc=Termux%20Multi-User%20Terminal%20Shell&descAlignY=62&descSize=16" width="100%"/>

### 🚀 Terminal multi-user bergaya "Ubuntu" yang berjalan sepenuhnya di dalam Termux

**Login terpusat via GitHub • Command `sudo` auto-map ke `pkg` (APT Termux) • Sinkronisasi 6 metode anti-gagal**

<br/>

<p>
  <img src="https://img.shields.io/badge/Node.js-18%2B-3C873A?style=for-the-badge&logo=node.js&logoColor=white&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Platform-Termux-000000?style=for-the-badge&logo=android&logoColor=3DDC84&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/GitHub_API-Synced-7b2ff7?style=for-the-badge&logo=github&logoColor=white&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Version-3.0.0-00ff88?style=for-the-badge&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/License-MIT-00ccff?style=for-the-badge&labelColor=0d1117"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Status-Active-00ff88?style=flat-square&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Build-Passing-00ff88?style=flat-square&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Zero%20Dependencies-✔-00ccff?style=flat-square&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Made%20with-❤️%20%26%20☕-ff0055?style=flat-square&labelColor=0d1117"/>
</p>

</div>

---

## 📖 &nbsp;Tentang Project

**Ranz Active** adalah aplikasi terminal interaktif berbasis Node.js yang berjalan di **Termux (Android)**. Aplikasi ini menghadirkan pengalaman seperti masuk ke sebuah *server Ubuntu* — lengkap dengan **login multi-user**, **prompt root**, dan **command `sudo`** — padahal semuanya berjalan secara lokal di HP kamu.

Semua data user (username & password) disimpan terpusat di file `config.js` pada repo **GitHub** kamu. Jadi:

- 🖥️ Bisa login dari mana saja asal punya token GitHub
- 👥 Bisa tambah user baru langsung dari terminal — otomatis ke-commit ke GitHub
- 📡 Kalau GitHub down, ada 5 fallback lain supaya tetap bisa jalan

---

## ✨ &nbsp;Fitur Utama

<table>
<tr>
<td width="50%" valign="top">

### 🎨 &nbsp;Tampilan
- 🟢 Kotak ASCII **"RANZ ACTIVE"** raksasa warna cyan saat startup
- 📊 Loading bar animasi **1 → 100%** selama 2 menit
- 🌈 Full ANSI colors (hijau, cyan, magenta, kuning)
- 🖼️ Menu box bergaya dengan border Unicode (`╔═╗`)

### 🔐 &nbsp;Autentikasi
- 👥 Login multi-user via `config.js` di GitHub
- 🔒 Password di-mask `***` saat diketik
- 🌐 Sinkron real-time dari GitHub saat login
- 📡 Offline fallback ke cache lokal

</td>
<td width="50%" valign="top">

### 💻 &nbsp;Terminal Shell
- 🐧 Prompt dinamis: `root{user}{online}$` — warna hijau
- ⚡ `sudo <cmd>` otomatis di-map ke `pkg` (APT Termux)
- 📂 `cd` stateful (tidak reset tiap command)
- 🔧 Semua command bash didukung (`ls`, `cat`, `grep`, dll)

### ☁️ &nbsp;GitHub Sync
- 🔄 **6 metode fetch** dengan auto-fallback pintar
- 📝 Add user → **auto-commit** ke GitHub
- 📈 Fetch tracker dengan statistik & latency
- 🎯 Auto-reorder metode berdasarkan success-rate

</td>
</tr>
</table>

---

## 🎬 &nbsp;Preview Tampilan

### 1️⃣ &nbsp;Startup Screen

```txt
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║    ██████╗  █████╗ ███╗   ██╗███████╗                          ║
║    ██╔══██╗██╔══██╗████╗  ██║╚══███╔╝                          ║
║    ██████╔╝███████║██╔██╗ ██║  ███╔╝                           ║
║    ██╔══██╗██╔══██║██║╚██╗██║ ███╔╝                            ║
║    ██║  ██║██║  ██║██║ ╚████║███████╗                          ║
║    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝                          ║
║                                                                ║
║       ▄▀█ █▀▀ ▀█▀ █ █ █▀▀                                      ║
║       █▀█ █▄▄  █  █▀▄ ██▄                                      ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

  Memuat config.js dari GitHub (6 metode fallback)...
  [1/6] coba github-api... ✔ 320ms via GitHub API
  ✔ Config OK dari "GitHub API" — 3 user

  Starting services...
╭──────────────────────────────────────────╮
│[██████████████████████████████] 100%     │
╰──────────────────────────────────────────╯
