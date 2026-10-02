<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--                     🚀 RANZ ACTIVE — README v4.0.0                 -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00ff88,50:00ccff,100:7b2ff7&height=240&section=header&text=RANZ%20ACTIVE&fontSize=86&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=v4.0.0%20·%20Termux%20Multi-User%20Terminal%20Shell&descAlignY=62&descSize=18" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=22&pause=1000&color=00FF88&center=true&vCenter=true&width=750&lines=Welcome+to+Ranz+Active+v4+%F0%9F%9A%80;Multi-User+Terminal+di+Termux+Android;Login+via+GitHub+%E2%80%A2+Sudo+%E2%86%92+APT+Termux;6+Metode+Fetch+Anti-Gagal+%F0%9F%9B%A1%EF%B8%8F;Zero+Dependencies+%E2%80%A2+Setup+2+Menit" alt="Typing SVG" />

<br/>
<br/>

<p>
  <img src="https://img.shields.io/badge/Node.js-18%2B-3C873A?style=for-the-badge&logo=node.js&logoColor=white&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Platform-Termux-000000?style=for-the-badge&logo=android&logoColor=3DDC84&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/GitHub_API-Synced-7b2ff7?style=for-the-badge&logo=github&logoColor=white&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Version-4.0.0-00ff88?style=for-the-badge&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/License-MIT-00ccff?style=for-the-badge&labelColor=0d1117"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Status-Active-00ff88?style=flat-square&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Build-Passing-00ff88?style=flat-square&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Zero%20Dependencies-✔-00ccff?style=flat-square&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Setup%20Time-≤%202%20min-7b2ff7?style=flat-square&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-ff0055?style=flat-square&labelColor=0d1117"/>
</p>

<br/>

> ### 🎯 &nbsp;**Terminal multi-user bergaya "Ubuntu" yang berjalan di Termux — login terpusat via GitHub, command `sudo` auto-map ke `pkg` (APT Termux), sinkronisasi 6 metode anti-gagal.**

<br/>

---

</div>

## 📑 &nbsp;Daftar Isi

<table>
<tr>
<td valign="top" width="33%">

**🚀 &nbsp;Overview**
- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Preview Tampilan](#-preview-tampilan)
- [Cara Kerja Sistem](#-cara-kerja-sistem)

</td>
<td valign="top" width="33%">

**⚙️ &nbsp;Pemasangan**
- [Struktur File](#-struktur-file)
- [Cara Memasang (Instalasi)](#️-cara-memasang-instalasi)
- [Setup GitHub Token](#-setup-github-token)
- [Cara Run Script](#-cara-run-script)

</td>
<td valign="top" width="33%">

**📚 &nbsp;Penggunaan**
- [Cara Memakai](#-cara-memakai)
- [Menjelaskan Penggunaan](#-menjelaskan-penggunaan)
- [Rincian Fitur](#-rincian-fitur)
- [Tentang Developer](#-tentang-developer)
- [Troubleshooting](#️-troubleshooting)

</td>
</tr>
</table>

---

<div align="center">

## 📖 &nbsp;Tentang Project

</div>

**Ranz Active** adalah aplikasi terminal interaktif berbasis **Node.js** yang berjalan di **Termux (Android)**. Menghadirkan pengalaman seperti masuk ke *server Ubuntu* — lengkap dengan **login multi-user**, **prompt root**, dan **command `sudo`** — padahal semuanya berjalan lokal di HP kamu.

Semua data user (username & password) disimpan terpusat di file `config.js` pada repo **GitHub**. Jadi kamu bisa **login dari mana saja**, **tambah user baru langsung dari terminal**, dan punya **6 lapis fallback** kalau GitHub down.

<table>
<tr>
<td width="25%" align="center">

### 🌐
**Akses dari mana saja**
asal punya token GitHub

</td>
<td width="25%" align="center">

### 👥
**Tambah user langsung**
otomatis commit ke GitHub

</td>
<td width="25%" align="center">

### 📡
**Anti-gagal**
6 metode fallback

</td>
<td width="25%" align="center">

### ⚡
**Zero deps**
tanpa `npm install`

</td>
</tr>
</table>

---

<div align="center">

## ✨ &nbsp;Fitur Utama

</div>

<table>
<tr>
<td width="50%" valign="top">

### 🎨 &nbsp;Tampilan Terminal

- 🟢 Kotak ASCII **"RANZ ACTIVE"** raksasa warna cyan
- 📊 Loading bar animasi **1 → 100%** selama 2 menit
- 🌈 Full ANSI colors (hijau, cyan, magenta, kuning)
- 🖼️ Menu box bergaya dengan border Unicode `╔═╗`
- ✨ Animasi smooth & render tanpa kedip

### 🔐 &nbsp;Autentikasi Multi-User

- 👥 Login terpusat via `config.js` di GitHub
- 🔒 Password di-mask `***` saat diketik
- 🌐 Sinkron real-time dari GitHub tiap login
- 📡 Offline fallback ke cache lokal

</td>
<td width="50%" valign="top">

### 💻 &nbsp;Terminal Shell

- 🐧 Prompt dinamis: `root{user}{online}$` warna hijau
- ⚡ `sudo <cmd>` otomatis di-map ke `pkg` (APT Termux)
- 📂 `cd` **stateful** (tidak reset tiap command)
- 🔧 Semua command bash didukung (`ls`, `cat`, `grep`)
- 🎯 Built-in: `whoami`, `pwd`, `clear`, `exit`

### ☁️ &nbsp;GitHub Sync

- 🔄 **6 metode fetch** dengan auto-fallback pintar
- 📝 Add user → **auto-commit** ke GitHub
- 📈 Fetch tracker dengan statistik & latency
- 🎯 Auto-reorder metode berdasarkan success-rate

</td>
</tr>
</table>

---

<div align="center">

## 🎬 &nbsp;Preview Tampilan

</div>

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
