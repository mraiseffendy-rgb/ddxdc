📘 README.md — Ranz Active v4.0.0 (LENGKAP & KECE)

Copy seluruh blok di bawah ke README.md di repo GitHub kamu.

---

```markdown
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
- [Cara Memasang (Instalasi)](#-cara-memasang-instalasi)
- [Setup GitHub Token](#-setup-github-token)
- [Cara Run Script](#-cara-run-script)

</td>
<td valign="top" width="33%">

**📚 &nbsp;Penggunaan**
- [Cara Memakai](#-cara-memakai)
- [Menjelaskan Penggunaan](#-menjelaskan-penggunaan)
- [Rincian Fitur](#-rincian-fitur)
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
```

2️⃣ &nbsp;Menu Utama

```txt
  ╔══════════════════════════════════════════════╗
  ║                  MAIN MENU                   ║
  ╠══════════════════════════════════════════════╣
  ║  [1] Open Ubuntu Terminal                    ║
  ║  [2] Add User (sync ke GitHub)               ║
  ║  [3] Lihat Fetch Tracker                     ║
  ║  [4] Exit                                    ║
  ╚══════════════════════════════════════════════╝

  Pilih [1-4] : 
```

3️⃣ &nbsp;Terminal Session

```txt
  ═══ Ubuntu Terminal Session ═══
  Logged in as : Ranz
  Online user  : 1
  Tip: "sudo apt install <pkg>" auto-map ke pkg Termux

rootRanz1$ whoami
root
rootRanz1$ pwd
/data/data/com.termux/files/home
rootRanz1$ sudo apt install python
  [sudo → pkg install python]
Reading package lists... Done
Building dependency tree... Done
rootRanz1$ exit
```

---

<div align="center">

🧠 &nbsp;Cara Kerja Sistem

</div>

```
┌─────────────────────────────────────────────────────────────────┐
│                        RANZ ACTIVE v4                           │
│                    Node.js Runtime (Termux)                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  STARTUP: Fetch config dari GitHub      │
        │  6 metode fallback + tracker            │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │  Big ASCII box + Loading bar 2 menit    │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │              MAIN MENU                  │
        └─────────────────────────────────────────┘
           │               │              │
     ┌─────┘         ┌─────┘        ┌─────┘
     ▼               ▼              ▼
 ┌────────┐    ┌──────────┐   ┌──────────┐
 │ LOGIN  │    │ ADD USER │   │ TRACKER  │
 └────────┘    └──────────┘   └──────────┘
     │
     ▼
 ┌─────────────────────────────────┐
 │   UBUNTU TERMINAL EMULATOR      │
 │                                 │
 │   readline() ──► exec()         │
 │   sudo X     ──► pkg X (map)    │
 │   cd         ──► stateful       │
 │   prompt     ──► root{user}{n}$ │
 └─────────────────────────────────┘
```

---

<div align="center">

📦 &nbsp;Struktur File

</div>

📁 &nbsp;Local (di Termux)

```
~/ranz/
├── 📄 ranz.js                  ← script utama (wajib)
├── 📄 config.js                ← config lokal (auto-generated)
├── 📄 config.json              ← cache lokal (auto-generated)
├── 📄 .ranz_tracker.json       ← statistik fetch (auto-generated)
└── 📄 run.sh                   ← launcher opsional
```

🌐 &nbsp;Remote (di GitHub Repo)

```
your-repo/
├── 📄 config.js                ← user database (di-commit otomatis)
└── 📄 README.md
```

Isi config.js:

```js
// config.js — auto-managed by Ranz Active
module.exports = {
  users: {
    "Ranz": "122",
    "admin": "admin123"
  }
};
```

---

<div align="center">

⚙️ &nbsp;Cara Memasang (Instalasi)

</div>

📱 &nbsp;Langkah 1 — Install Termux & Tools

Download Termux dari F-Droid (jangan Play Store — versinya outdated):
👉 https://f-droid.org/packages/com.termux/

Lalu update & install dependency:

```bash
pkg update && pkg upgrade -y
pkg install nodejs git nano -y
```

Verifikasi:

```bash
node -v       # minimal v18
npm -v
git --version
```

📁 &nbsp;Langkah 2 — Buat Folder Kerja

```bash
mkdir -p ~/ranz && cd ~/ranz
```

📝 &nbsp;Langkah 3 — Buat File ranz.js

```bash
nano ranz.js
```

Paste seluruh script ranz.js → Ctrl+O → Enter → Ctrl+X.

🔧 &nbsp;Langkah 4 — Edit Konfigurasi GitHub

Buka ranz.js, cari blok berikut & isi:

```js
const GITHUB = {
  owner:  'USERNAME_GITHUB_KAMU',   // ← username GitHub
  repo:   'NAMA_REPO_KAMU',         // ← nama repo
  branch: 'main',                   // 'main' atau 'master'
  path:   'config.js',
  token:  process.env.GITHUB_TOKEN || ''
};
```

🌐 &nbsp;Langkah 5 — Siapkan config.js di GitHub

Di repo kamu, buat file config.js:

```js
// config.js — auto-managed by Ranz Active
module.exports = {
  users: {
    "Ranz": "122"
  }
};
```

Commit & push. Ini jadi database user kamu.

---

<div align="center">

🔑 &nbsp;Setup GitHub Token

</div>

Token dipakai untuk membaca & menulis config.js via GitHub API.

📌 &nbsp;Cara Buat Token

<table>
<tr>
<td width="60">

1. Buka 👉 https://github.com/settings/tokens

2. Klik Generate new token → classic

3. Isi form:

· Note: Ranz Active Termux
· Expiration: No expiration (atau bebas)
· Scopes: centang ✅ repo

</td>
<td width="40">

```
┌─────────────────────────┐
│  ✅ repo                │
│  ├─ repo:status         │
│  ├─ repo_deployment     │
│  ├─ public_repo         │
│  └─ repo:invite         │
└─────────────────────────┘
```

</td>
</tr>
</table>

4. Klik Generate token → copy ghp_xxxxxxxxxxxx

🔐 &nbsp;Set Token — 3 Pilihan

<table>
<tr>
<td width="33%" valign="top">

🅰️ One-liner

```bash
export GITHUB_TOKEN="ghp_xxx" && node ranz.js
```

</td>
<td width="33%" valign="top">

🅱️ Permanent ⭐

```bash
echo 'export GITHUB_TOKEN="ghp_xxx"' >> ~/.bashrc
source ~/.bashrc
```

</td>
<td width="33%" valign="top">

🅲 Launcher

```bash
nano ~/ranz/run.sh
chmod +x ~/ranz/run.sh
~/ranz/run.sh
```

</td>
</tr>
</table>

⚠️ Penting: jangan commit token ke GitHub. Simpan hanya di ~/.bashrc atau env variabel.

---

<div align="center">

🚀 &nbsp;Cara Run Script

</div>

▶️ &nbsp;Basic

```bash
cd ~/ranz
node ranz.js
```

🔁 &nbsp;Bikin Alias Biar Gampang

```bash
echo 'alias ranz="cd ~/ranz && node ranz.js"' >> ~/.bashrc
source ~/.bashrc
```

Sekarang cukup ketik:

```bash
ranz
```

⚡ &nbsp;Full One-Liner

```bash
cd ~/ranz && GITHUB_TOKEN="ghp_xxxxxxxxxxxx" node ranz.js
```

🌐 &nbsp;Tanpa Token (mode offline)

```bash
GITHUB_TOKEN="" node ranz.js
```

Tetap jalan — tapi Add User hanya tersimpan lokal.

🎯 &nbsp;Quick Start Copy-Paste

```bash
# 1️⃣  Install dependency (sekali aja)
pkg install nodejs git nano -y

# 2️⃣  Siapkan folder & script
mkdir -p ~/ranz && cd ~/ranz && nano ranz.js

# 3️⃣  Set token & jalankan 🚀
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx" && node ranz.js
```

---

<div align="center">

📘 &nbsp;Cara Memakai

</div>

Setelah node ranz.js dijalankan, kamu akan melewati 4 tahap berikut:

🟢 &nbsp;Tahap 1 — Startup

Script otomatis:

1. Load tracker stats dari .ranz_tracker.json
2. Tampilkan kotak ASCII "RANZ ACTIVE"
3. Fetch config.js dari GitHub (6 metode)
4. Jalankan loading bar 1 → 100% (2 menit)

🟡 &nbsp;Tahap 2 — Menu Utama

Muncul menu:

```
[1] Open Ubuntu Terminal
[2] Add User (sync ke GitHub)
[3] Lihat Fetch Tracker
[4] Exit
```

Ketik angka 1-4 lalu Enter.

🔵 &nbsp;Tahap 3a — Login (pilihan 1)

```
  Username : Ranz
  Password : ***
  ✔ Login sukses. Selamat datang, Ranz!
rootRanz1$ 
```

Setelah login, kamu masuk ke shell dengan prompt root{user}{online}$ — siap menerima command.

🔵 &nbsp;Tahap 3b — Add User (pilihan 2)

```
  Username baru : Budi
  Password baru : ***
  → Fetch config dari GitHub (6 metode)...
  [1/6] coba github-api... ✔ 320ms via GitHub API
  → Commit ke GitHub...
  ✔ TERKONFIRMASI → Budi:12345
  ✔ config.js GitHub ter-update! commit a1b2c3d
```

User baru langsung ditambahkan ke config.js di GitHub.

🔵 &nbsp;Tahap 3c — Lihat Tracker (pilihan 3)

Tampil statistik performa 6 metode fetch dengan success rate & latency.

⚫ &nbsp;Tahap 4 — Exit (pilihan 4)

Keluar dengan pesan Bye! Ranz Active signing off.

---

<div align="center">

📚 &nbsp;Menjelaskan Penggunaan

</div>

🖥️ &nbsp;Sesi Terminal

Setelah login, semua command di bawah ini bisa langsung diketik:

<table>
<tr>
<td valign="top" width="50%">

🐚 Command built-in

Command Fungsi
whoami Tampil root
pwd Direktori saat ini
cd <dir> Pindah direktori
cd Balik ke $HOME
clear Bersihkan layar
exit Keluar shell

</td>
<td valign="top" width="50%">

⚡ Sudo auto-map ke pkg

Kamu ketik Yang jalan
sudo install python pkg install python
sudo apt install git pkg install git
sudo apt update pkg update
sudo apt upgrade pkg upgrade
sudo apt search X pkg search X

</td>
</tr>
</table>

🎯 &nbsp;Contoh Sesi Lengkap

```bash
rootRanz1$ whoami
root

rootRanz1$ pwd
/data/data/com.termux/files/home

rootRanz1$ cd storage/downloads
rootRanz1$ pwd
/storage/emulated/0/Download

rootRanz1$ sudo apt install python
  [sudo → pkg install python]
Reading package lists... Done
Building dependency tree... Done
python is already the newest version.

rootRanz1$ python --version
Python 3.11.4

rootRanz1$ exit
```

💡 &nbsp;Tips Penggunaan

Tips Cara
🚀 Jalankan cepat Bikin alias ranz di .bashrc
🔁 Login berkali-kali Bisa — tiap user dapat nomor online berbeda
👥 Multi-user bersamaan Buka 2 Termux session, login 2 user
📝 Tambah user tanpa GitHub Set GITHUB_TOKEN="" → simpan lokal
🔍 Cek performa fetch Menu [3] — tracker otomatis update

---

<div align="center">

📋 &nbsp;Rincian Fitur

</div>

<details>
<summary><b>🔐 Rincian Autentikasi</b></summary>

Alur login:

```
Input username → Input password → Fetch config.js (6 metode)
    → Verify vs config.users → Sukses / Gagal
```

Penyimpanan:

· Utama: config.js di GitHub (di-commit)
· Fallback: config.json + config.js lokal
· Password plaintext (v4) — enkripsi bcrypt di roadmap v5

</details>

<details>
<summary><b>⚡ Rincian Sudo → APT Mapper</b></summary>

Fungsi mapSudoCommand() mendeteksi pattern:

· sudo apt <x> → pkg <x>
· sudo apt-get <x> → pkg <x>
· sudo <subcommand> → pkg <subcommand>
· sudo install X → pkg install X

Support subcommand: install, uninstall, update, upgrade, search, list-all, list-installed, show, clean, autoremove.

</details>

<details>
<summary><b>🔄 Rincian 6 Metode Fetch</b></summary>

# Nama Endpoint Token SHA?
1 github-api api.github.com/repos/.../contents/ ✔ ✅
2 raw-gh raw.githubusercontent.com/... ✘ ❌
3 jsdelivr cdn.jsdelivr.net/gh/... ✘ ❌
4 statically cdn.statically.io/gh/... ✘ ❌
5 github-api-anon api.github.com (no auth) ✘ ✅
6 local-cache config.json / config.js lokal ✘ ❌

Auto-reorder: metode dengan success-rate tertinggi dicoba duluan. Formula: success / (success + fail).

</details>

<details>
<summary><b>📊 Rincian Fetch Tracker</b></summary>

Data disimpan di .ranz_tracker.json:

```json
{
  "stats": {
    "github-api": {
      "success": 12, "fail": 1, "totalMs": 3840,
      "lastError": null, "lastUsed": "2025-01-15T10:30:00.000Z"
    }
  },
  "history": [ /* 100 percobaan terakhir */ ]
}
```

Disimpan otomatis tiap fetch. Maksimal 100 history. Tidak di-commit ke GitHub.

</details>

<details>
<summary><b>🎨 Rincian Render Terminal</b></summary>

· Loading bar: 100 step × 1.2s = 2 menit
· Update posisi pakai \x1b[3A (cursor naik 3 baris)
· Clear line pakai \x1b[2K
· Password mask pakai stdin.setRawMode(true) + manual asterisk

</details>

<details>
<summary><b>💾 Rincian File Persistence</b></summary>

File Isi Kapan dibuat
config.js lokal Users (mirror GitHub) Setiap saveLocal()
config.json Users (JSON) Setiap saveLocal()
.ranz_tracker.json Stats & history Setiap fetch attempt

</details>

---

<div align="center">

🔧 &nbsp;Command yang Didukung

</div>

🐚 &nbsp;Built-in

Command Fungsi
whoami Tampil root
pwd Direktori saat ini
cd <dir> Pindah direktori
cd Balik ke $HOME
clear / cls Bersihkan layar
exit / logout Keluar shell

⚡ &nbsp;Sudo Auto-Map

Kamu ketik Yang dijalankan
sudo install python pkg install python
sudo apt install git pkg install git
sudo apt-get install nano pkg install nano
sudo apt update pkg update
sudo apt upgrade pkg upgrade
sudo apt search ffmpeg pkg search ffmpeg
sudo uninstall tree pkg uninstall tree
sudo (kosong) pkg help

---

<div align="center">

🛠️ &nbsp;Troubleshooting

</div>

<details>
<summary><b>❌ "Semua 6 metode gagal"</b></summary>

```bash
ping -c 3 github.com
curl https://raw.githubusercontent.com/USER/REPO/main/config.js
echo $GITHUB_TOKEN
```

</details>

<details>
<summary><b>❌ "GitHub PUT 403"</b></summary>

Token kurang scope repo. Buat baru di https://github.com/settings/tokens → centang ✅ repo.

</details>

<details>
<summary><b>❌ "GitHub PUT 409"</b></summary>

SHA konflik — jalankan Add User lagi, script fetch ulang SHA terbaru.

</details>

<details>
<summary><b>❌ Password tidak muncul</b></summary>

Normal — password di-mask ***. Kalau tidak responsif, restart Termux.

</details>

<details>
<summary><b>❌ "Unable to locate package"</b></summary>

```bash
pkg update
```

</details>

<details>
<summary><b>❌ Colors aneh</b></summary>

```bash
export TERM=xterm-256color
echo 'export TERM=xterm-256color' >> ~/.bashrc
```

</details>

---

<div align="center">

🧰 &nbsp;Tech Stack

<br/>

Layer Teknologi
Runtime https://img.shields.io/badge/Node.js-3C873A?style=flat-square&logo=node.js&logoColor=white
Platform https://img.shields.io/badge/Termux-000000?style=flat-square&logo=android&logoColor=3DDC84
Sync https://img.shields.io/badge/GitHub_API-181717?style=flat-square&logo=github&logoColor=white
CDN jsDelivr • Statically • raw.githubusercontent
Zero Deps Hanya built-in readline, https, fs, child_process

<br/>

Tidak butuh npm install! Semua pakai modul bawaan Node.js.

</div>

---

<div align="center">

🗺️ &nbsp;Roadmap

</div>

☑ Big ASCII box + loading bar 2 menit
☑ Multi-user login via GitHub
☑ Add user auto-commit ke GitHub
☑ 6 metode fetch dengan fallback pintar
☑ Fetch tracker statistik
☑ Sudo → pkg auto-map
☐ Enkripsi password (bcrypt)
☐ Auto-update script dari GitHub
☐ Support SSH remote terminal
☐ Web dashboard
☐ Command history & autocomplete

---

<div align="center">

👨‍💻 &nbsp;Tentang Developer

</div>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:7b2ff7,50:00ccff,100:00ff88&height=2" width="70%"/>

</div>

<br/>

Ranz adalah seorang developer muda asal Indonesia yang aktif di dunia otomasi terminal, Android modding, dan pengembangan tools CLI berbasis Node.js. Ia memulai perjalanan coding dari rasa penasaran terhadap kemampuan Termux sebagai environment Linux portabel di Android — lalu berkembang menjadi kecintaan mendalam pada dunia shell scripting, network programming, dan cloud sync automation. Ranz sangat percaya bahwa HP Android pun bisa jadi workstation serius kalau tahu cara memaksimalkannya, dan Ranz Active adalah salah satu bukti nyata dari filosofi tersebut.

Di tengah kesibukannya, Ranz dikenal sebagai pribadi yang suka berbagi — selalu terbuka membagikan source code, menulis dokumentasi rinci, dan menjawab pertanyaan dari komunitas Termux Indonesia maupun global. Baginya, kode terbaik bukan yang paling pintar, tapi yang paling bisa dipakai dan dipahami orang lain. Prinsip inilah yang ia pegang saat merancang Ranz Active: sederhana, ringan, tanpa dependency, tapi tetap bertenaga dengan fitur sync GitHub, fallback 6 lapis, dan sudo-to-APT mapper yang jarang ditemukan di tools sejenis.

Ke depan, Ranz berencana terus mengembangkan Ranz Active dan project-project open source lainnya dengan fokus pada keamanan, portabilitas, dan pengalaman pengguna. Ia berharap project ini bisa menginspirasi developer lain — terutama dari Indonesia — untuk berani berkarya dan berbagi, karena kontribusi kecil sekalipun bisa jadi pintu besar untuk komunitas yang lebih luas. Kalau kamu punya pertanyaan, ide kolaborasi, atau sekadar mau menyapa, jangan ragu buka issue atau discussion di repo ini. 🌟

<br/>

<div align="center">

<a href="https://github.com/USERNAME">
  <img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&labelColor=0d1117"/>
</a>
<a href="https://github.com/USERNAME/REPO/issues">
  <img src="https://img.shields.io/badge/Hubungi-Issue-ff0055?style=for-the-badge&logo=github&labelColor=0d1117"/>
</a>

</div>

---

<div align="center">

📜 &nbsp;Lisensi

```
MIT License — Copyright (c) 2025 Ranz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

</div>

---

<!-- ═══════════════════════════════════════════════════════════════════ -->

<!--                        FOOTER — v4.0.0                             -->

<!-- ═══════════════════════════════════════════════════════════════════ -->

<br/>

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=24&pause=1000&color=00FF88&center=true&vCenter=true&width=650&lines=Terima+kasih+sudah+mampir!+%F0%9F%99%8C;Ranz+Active+v4.0.0;Jangan+lupa+%E2%AD%90+di+GitHub!;Selamat+berkarya+%F0%9F%9A%80" alt="Typing SVG" />

<br/>
<br/>

🌟 &nbsp;Kalau project ini berguna, kasih ⭐ di GitHub! &nbsp;🌟

<br/>

<a href="#-daftar-isi">
  <img src="https://img.shields.io/badge/⬆️%20Kembali%20ke%20Atas-00ff88?style=for-the-badge&labelColor=0d1117"/>
</a>
<a href="https://github.com/USERNAME/REPO/stargazers">
  <img src="https://img.shields.io/github/stars/USERNAME/REPO?style=for-the-badge&color=00ccff&labelColor=0d1117&logo=github"/>
</a>
<a href="https://github.com/USERNAME/REPO/fork">
  <img src="https://img.shields.io/github/forks/USERNAME/REPO?style=for-the-badge&color=7b2ff7&labelColor=0d1117&logo=github"/>
</a>
<a href="https://github.com/USERNAME/REPO/issues">
  <img src="https://img.shields.io/github/issues/USERNAME/REPO?style=for-the-badge&color=ff0055&labelColor=0d1117&logo=github"/>
</a>





<img src="https://capsule-render.vercel.app/api?type=waving&color=0:7b2ff7,50:00ccff,100:00ff88&height=150&section=footer"/>

Made with ❤️ by Ranz

<sub>⚡ Powered by Node.js · Termux · GitHub API · Zero Dependencies</sub>

<br/>

<sub>🏷️ <b>v4.0.0</b> · Last updated: 2025 · <a href="#-daftar-isi">Kembali ke atas ⬆️</a></sub>

</div>
```

---

📝 Yang Perlu Diganti

Cari & replace di file README:

Cari Ganti jadi
USERNAME username GitHub kamu
REPO nama repo kamu
Ranz (author & bio) nama kamu (kalau beda)

---

✅ Konten yang Sudah Ada di v4.0.0

<table>
<tr>
<td valign="top" width="50%">

📚 &nbsp;Konten

· ✅ Cara Memakai — 4 tahap step-by-step
· ✅ Cara Memasang — instalasi 5 langkah
· ✅ Menjelaskan Penggunaan — dengan contoh sesi lengkap
· ✅ Rincian Fitur — 6 collapsible detail
· ✅ Cara Run Script — 5 cara (basic, alias, one-liner, offline, quick start)

</td>
<td valign="top" width="50%">

👨‍💻 &nbsp;Developer

· ✅ 3 paragraf tentang developer:
  1. Latar belakang & filosofi
  2. Sifat & prinsip kerja
  3. Visi ke depan & ajakan kolaborasi
· ✅ Badge sosmed (GitHub Follow & Hubungi)

🎨 &nbsp;Visual

· ✅ Header & footer wave gradient
· ✅ Typing SVG animation (atas & bawah)
· ✅ TOC 3 kolom rapi
· ✅ 8 collapsible <details> troubleshooting
· ✅ Table tech stack dengan badge

</td>
</tr>
</table>

---

🎯 Highlight v4.0.0

Elemen Keunggulan
📘 Struktur jelas Overview → Pemasangan → Penggunaan → Rincian → Developer
🔍 Rincian mendalam Collapsible <details> untuk semua fitur
👨‍💻 Bio developer 3 paragraf naratif yang personal
⚡ 5 cara run Bebas pilih sesuai level pengguna
🌈 Konsisten gradient Hijau → Biru → Ungu dari atas ke bawah
🎬 Preview 3 skenario Startup, menu, session
🧠 Diagram ASCII Arsitektur sistem visual
🌊 Wave footer Penutup dengan ajakan star & share

Setelah push ke GitHub, buka https://github.com/USERNAME/REPO — README v4.0.0 ini bakal jadi wajah project yang profesional, lengkap, dan kece! 🚀
