#!/usr/bin/env node
'use strict';

const readline = require('readline');
const { exec } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

/* ============ COLORS ============ */
const C = {
  r: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', magenta: '\x1b[35m', cyan: '\x1b[36m',
  white: '\x1b[37m'
};

/* ============ GITHUB CONFIG ============ */
// ⚠️ GANTI 4 BARIS INI dengan punya kamu
const GITHUB = {
  owner:  'mraiseffendy-rgb',
  repo:   'https://github.com/mraiseffendy-rgb/ddxdc.git',
  branch: 'main',
  path:   'config.js',
  token:  process.env.GITHUB_TOKEN || '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'
};

const LOCAL_CONFIG = path.join(__dirname, 'config.json');

/* ============ STATE ============ */
let config = { users: { 'Ranz': '122' } };   // fallback
let configSHA = null;                        // GitHub blob SHA (buat update)
let onlineCount = 0;

/* ============ UTILS ============ */
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function httpsRequest(method, urlStr, headers, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method,
      headers: Object.assign({ 'User-Agent': 'Ranz-Active' }, headers || {})
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        let parsed = data;
        try { parsed = JSON.parse(data); } catch (e) {}
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(new Error('timeout')); });
    if (body) req.write(body);
    req.end();
  });
}

/* ============ GITHUB API ============ */
function ghHeaders() {
  return {
    'Authorization': 'token ' + GITHUB.token,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };
}

async function githubFetchConfig() {
  const api = `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents/${GITHUB.path}?ref=${GITHUB.branch}`;
  const res = await httpsRequest('GET', api, ghHeaders());
  if (res.status !== 200) {
    throw new Error(`GitHub GET ${res.status}: ${res.body && res.body.message || 'unknown'}`);
  }
  const sha = res.body.sha;
  const content = Buffer.from(res.body.content, 'base64').toString('utf8');

  // parse module.exports
  const m = { exports: {} };
  new Function('module', 'exports', content)(m, m.exports);
  if (!m.exports || typeof m.exports !== 'object' || !m.exports.users) {
    throw new Error('config.js tidak mengandung { users }');
  }
  return { sha, users: m.exports.users, raw: content };
}

async function githubUpdateConfig(users) {
  const content =
    '// config.js — auto-managed by Ranz Active\n' +
    'module.exports = ' + JSON.stringify({ users }, null, 2) + ';\n';

  const api = `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents/${GITHUB.path}`;
  const payload = {
    message: `feat(config): sync users via Ranz Active [${new Date().toISOString()}]`,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: GITHUB.branch
  };
  if (configSHA) payload.sha = configSHA;

  const res = await httpsRequest(
    'PUT', api,
    Object.assign(ghHeaders(), { 'Content-Type': 'application/json' }),
    JSON.stringify(payload)
  );

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`GitHub PUT ${res.status}: ${res.body && res.body.message || 'unknown'}`);
  }
  return res.body;
}

/* ============ LOCAL FALLBACK ============ */
function saveLocal() {
  try {
    fs.writeFileSync(LOCAL_CONFIG, JSON.stringify({ users: config.users }, null, 2));
  } catch (e) {}
}

function loadLocal() {
  try {
    if (fs.existsSync(LOCAL_CONFIG)) {
      const j = JSON.parse(fs.readFileSync(LOCAL_CONFIG, 'utf8'));
      if (j && j.users) config = { users: j.users };
    }
  } catch (e) {}
}

/* ============ INPUT ============ */
function askText(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(prompt, (ans) => { rl.close(); resolve(ans); });
  });
}

function askPassword(prompt) {
  return new Promise((resolve) => {
    const stdin = process.stdin, stdout = process.stdout;
    stdout.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    let pw = '';
    const onData = (ch) => {
      if (ch === '\n' || ch === '\r' || ch === '\u0004') {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener('data', onData);
        stdout.write('\n');
        resolve(pw);
      } else if (ch === '\u0003') {
        stdout.write('\n');
        process.exit(0);
      } else if (ch === '\u007f' || ch === '\b') {
        if (pw.length > 0) { pw = pw.slice(0, -1); stdout.write('\b \b'); }
      } else {
        pw += ch;
        stdout.write('*');
      }
    };
    stdin.on('data', onData);
  });
}

/* ============ BIG BOX: RANZ ACTIVE ============ */
function bigBoxLines() {
  const art = [
    '██████╗  █████╗ ███╗   ██╗███████╗',
    '██╔══██╗██╔══██╗████╗  ██║╚══███╔╝',
    '██████╔╝███████║██╔██╗ ██║  ███╔╝ ',
    '██╔══██╗██╔══██║██║╚██╗██║ ███╔╝  ',
    '██║  ██║██║  ██║██║ ╚████║███████╗',
    '╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝',
    '',
    '   ▄▀█ █▀▀ ▀█▀ █ █ █▀▀',
    '   █▀█ █▄▄  █  █▀▄ ██▄'
  ];
  const maxLen = Math.max(...art.map(l => [...l].length));
  const padded = art.map(l => {
    const len = [...l].length;
    const left = Math.floor((maxLen - len) / 2);
    return ' '.repeat(left) + l + ' '.repeat(maxLen - len - left);
  });
  const pad = 4;
  const innerW = maxLen + pad * 2;
  const top = '╔' + '═'.repeat(innerW) + '╗';
  const bot = '╚' + '═'.repeat(innerW) + '╝';
  const empty = '║' + ' '.repeat(innerW) + '║';
  const out = [top, empty];
  for (const l of padded) out.push('║' + ' '.repeat(pad) + l + ' '.repeat(pad) + '║');
  out.push(empty, bot);
  return out;
}

function printBigBox() {
  console.log('');
  for (const l of bigBoxLines()) console.log(C.cyan + C.bold + l + C.r);
  console.log('');
}

/* ============ LOADING BAR (2 menit) ============ */
async function loadingBar() {
  const total = 100;
  const stepMs = 120000 / total;
  const BAR_W = 30;
  const innerW = BAR_W + 12;
  let rendered = false;

  for (let i = 0; i <= total; i++) {
    const filled = Math.floor((i / total) * BAR_W);
    const bar = '█'.repeat(filled) + '░'.repeat(BAR_W - filled);
    const pct = String(i).padStart(3, ' ') + '%';
    const content = `[${bar}] ${pct}`;
    const padR = Math.max(0, innerW - content.length);
    const l1 = '╭' + '─'.repeat(innerW) + '╮';
    const l2 = '│' + content + ' '.repeat(padR) + '│';
    const l3 = '╰' + '─'.repeat(innerW) + '╯';

    if (rendered) process.stdout.write('\x1b[3A');
    process.stdout.write('\x1b[2K' + C.green + l1 + C.r + '\n');
    process.stdout.write('\x1b[2K' + C.green + l2 + C.r + '\n');
    process.stdout.write('\x1b[2K' + C.green + l3 + C.r + '\n');
    rendered = true;
    await sleep(stepMs);
  }
  console.log('');
}

/* ============ MENU ============ */
function showMenu() {
  const W = 46;
  const pad = (t) => t + ' '.repeat(Math.max(0, W - t.length));
  const center = (t) => {
    const p = Math.floor((W - t.length) / 2);
    return ' '.repeat(Math.max(0, p)) + t + ' '.repeat(Math.max(0, W - t.length - p));
  };
  console.log('');
  console.log(C.yellow + C.bold + '  ╔' + '═'.repeat(W) + '╗' + C.r);
  console.log(C.yellow + C.bold + '  ║' + center('MAIN MENU') + '║' + C.r);
  console.log(C.yellow + C.bold + '  ╠' + '═'.repeat(W) + '╣' + C.r);
  console.log(C.yellow + '  ║' + pad('  [1] Open Ubuntu Terminal') + '║' + C.r);
  console.log(C.yellow + '  ║' + pad('  [2] Add User (sync ke GitHub)') + '║' + C.r);
  console.log(C.yellow + '  ║' + pad('  [3] Exit') + '║' + C.r);
  console.log(C.yellow + C.bold + '  ╚' + '═'.repeat(W) + '╝' + C.r);
  console.log('');
}

/* ============ SUDO → APT (pkg) MAPPER ============ */
/**
 * Di dalam terminal kita, semua command yang diawali "sudo" di-map
 * ke `pkg` (APT-nya Termux).
 *
 *   sudo apt install python    → pkg install python
 *   sudo apt-get install git   → pkg install git
 *   sudo install nano          → pkg install nano
 *   sudo pkg install wget      → pkg install wget
 *   sudo apt update            → pkg update
 *   sudo apt upgrade           → pkg upgrade
 *   sudo apt search X          → pkg search X
 */
function mapSudoCommand(cmd) {
  if (!/^sudo(\s|$)/.test(cmd)) return null;
  let rest = cmd.replace(/^sudo\s*/, '').trim();

  // sudo kosong → print info pkg
  if (!rest) return 'pkg help';

  // apt / apt-get → pkg
  if (/^apt(-get)?\b/.test(rest)) {
    rest = rest.replace(/^apt(-get)?\b/, 'pkg');
    return rest;
  }

  // install X / update / upgrade / search / list-all → pkg X
  if (/^(install|uninstall|update|upgrade|search|list-all|list-installed|show|clean|autoremove)\b/.test(rest)) {
    return 'pkg ' + rest;
  }

  // sudah `pkg ...`
  if (/^pkg\b/.test(rest)) return rest;

  // default: anggap subcommand pkg
  return 'pkg ' + rest;
}

/* ============ RUN SHELL CMD ============ */
function runShell(cmd, cwd) {
  return new Promise((resolve) => {
    exec(cmd, { cwd, shell: '/bin/bash', maxBuffer: 1024 * 1024 * 10 },
      (err, stdout, stderr) => {
        if (stdout) process.stdout.write(stdout);
        if (stderr) process.stderr.write(stderr);
        if (err && !stdout && !stderr) process.stderr.write(err.message + '\n');
        resolve();
      });
  });
}

/* ============ UBUNTU TERMINAL (Node.js shell) ============ */
async function ubuntuTerminal(username) {
  onlineCount++;
  const online = onlineCount;
  let cwd = process.env.HOME || '/';

  console.log('');
  console.log(C.green + C.bold + '  ═══ Ubuntu Terminal Session ═══' + C.r);
  console.log(C.green + `  Logged in as : ${C.bold}${username}${C.r}`);
  console.log(C.green + `  Online user  : ${online}` + C.r);
  console.log(C.dim   + '  Tip: pakai "sudo apt install <pkg>" untuk install (auto ke pkg Termux)' + C.r);
  console.log(C.dim   + '  Ketik "exit"/"logout" untuk keluar' + C.r);
  console.log('');

  while (true) {
    const prompt = C.green + C.bold + `root${username}${online}$ ` + C.r;
    const line = await askText(prompt);
    let cmd = line.trim();

    if (cmd === '') continue;
    if (cmd === 'exit' || cmd === 'logout') break;
    if (cmd === 'clear' || cmd === 'cls') { process.stdout.write('\x1b[2J\x1b[H'); continue; }
    if (cmd === 'whoami') { console.log('root'); continue; }
    if (cmd === 'pwd')    { console.log(cwd); continue; }

    // ===== SUDO → pkg (APT Termux) =====
    if (/^sudo(\s|$)/.test(cmd)) {
      const mapped = mapSudoCommand(cmd);
      console.log(C.magenta + '  [sudo → ' + mapped + ']' + C.r);
      // jalankan di HOME biar akses pkg lancar
      await runShell(mapped, process.env.HOME || cwd);
      continue;
    }

    // ===== cd (stateful) =====
    if (cmd === 'cd' || cmd.startsWith('cd ')) {
      const target = cmd === 'cd' ? (process.env.HOME || '/') : cmd.slice(3).trim();
      const newPath = path.isAbsolute(target)
        ? target
        : path.resolve(cwd, target.replace(/^~/, process.env.HOME || ''));
      try {
        if (fs.statSync(newPath).isDirectory()) cwd = newPath;
        else console.log(`cd: ${target}: Not a directory`);
      } catch (e) {
        console.log(`cd: ${target}: No such file or directory`);
      }
      continue;
    }

    await runShell(cmd, cwd);
  }
  onlineCount--;
}

/* ============ LOGIN ============ */
async function loginFlow() {
  console.log('');
  const username = (await askText(C.cyan + '  Username : ' + C.r)).trim();
  const password = await askPassword(C.cyan + '  Password : ' + C.r);

  // refresh dari GitHub biar selalu up-to-date
  try {
    const remote = await githubFetchConfig();
    config = { users: remote.users };
    configSHA = remote.sha;
  } catch (e) {
    // pakai cache
  }

  if (config.users && config.users[username] && config.users[username] === password) {
    console.log(C.green + `  ✔ Login sukses. Selamat datang, ${username}!` + C.r);
    await ubuntuTerminal(username);
  } else {
    console.log(C.red + '  ✘ Login gagal. Username / password salah.' + C.r);
  }
}

/* ============ ADD USER (sync ke GitHub) ============ */
async function addUserFlow() {
  console.log('');
  const username = (await askText(C.cyan + '  Username baru : ' + C.r)).trim();
  if (!username) { console.log(C.red + '  ✘ Username kosong.' + C.r); return; }

  // fetch fresh dari GitHub dulu
  console.log(C.dim + '  → Mengambil config.js dari GitHub...' + C.r);
  let sha = null, users = null;
  try {
    const remote = await githubFetchConfig();
    sha = remote.sha;
    users = remote.users;
    console.log(C.green + '  ✔ config.js terbaru dimuat dari GitHub.' + C.r);
  } catch (e) {
    console.log(C.yellow + '  ⚠ Gagal ambil dari GitHub: ' + e.message + C.r);
    console.log(C.yellow + '  → Pakai config lokal (tidak akan commit ke GitHub).' + C.r);
    users = Object.assign({}, config.users);
  }

  if (users[username]) { console.log(C.red + '  ✘ User sudah ada.' + C.r); return; }

  const password = await askPassword(C.cyan + '  Password baru : ' + C.r);
  if (!password) { console.log(C.red + '  ✘ Password kosong.' + C.r); return; }

  users[username] = password;

  // update ke GitHub
  if (sha) {
    console.log(C.dim + '  → Commit ke GitHub...' + C.r);
    try {
      configSHA = sha;   // penting: SHA lama dipakai untuk update
      const result = await githubUpdateConfig(users);
      const commit = result && result.commit && result.commit.sha;
      console.log(C.green + C.bold + `  ✔ TERKONFIRMASI → ${username}:${password}` + C.r);
      console.log(C.green + `  ✔ Config.js GitHub ter-update! commit ${commit ? commit.slice(0,7) : ''}` + C.r);
      config = { users };
      saveLocal();
    } catch (e) {
      console.log(C.red + '  ✘ Gagal commit ke GitHub: ' + e.message + C.r);
      console.log(C.yellow + '  → Disimpan lokal saja (config.json).' + C.r);
      config = { users };
      saveLocal();
    }
  } else {
    config = { users };
    saveLocal();
    console.log(C.green + C.bold + `  ✔ TERKONFIRMASI (lokal) → ${username}:${password}` + C.r);
  }
}

/* ============ MAIN ============ */
async function main() {
  process.stdout.write('\x1b[2J\x1b[H');
  printBigBox();

  // token check
  if (!GITHUB.token || GITHUB.token.includes('GANTI')) {
    console.log(C.red + C.bold + '  ⚠ GITHUB_TOKEN belum di-set!' + C.r);
    console.log(C.yellow + '    export GITHUB_TOKEN="ghp_xxx" lalu jalankan ulang.' + C.r);
    console.log('');
  }

  // load config: coba GitHub dulu, fallback lokal
  console.log(C.dim + '  Memuat config.js dari GitHub...' + C.r);
  try {
    const remote = await githubFetchConfig();
    config = { users: remote.users };
    configSHA = remote.sha;
    console.log(C.green + `  ✔ Config GitHub OK (${Object.keys(config.users).length} user)` + C.r);
  } catch (e) {
    console.log(C.yellow + '  ⚠ Gagal dari GitHub: ' + e.message + C.r);
    loadLocal();
    console.log(C.yellow + `  → Pakai lokal (${Object.keys(config.users).length} user)` + C.r);
  }
  console.log('');
  console.log(C.dim + '  Starting services...' + C.r);

  await loadingBar();

  while (true) {
    showMenu();
    const choice = (await askText(C.yellow + '  Pilih [1-3] : ' + C.r)).trim();

    if (choice === '1')      await loginFlow();
    else if (choice === '2') await addUserFlow();
    else if (choice === '3') {
      console.log(C.green + '  Bye! Ranz Active signing off.' + C.r);
      process.exit(0);
    } else {
      console.log(C.red + '  ✘ Pilihan tidak valid.' + C.r);
    }
  }
}

main().catch(err => {
  console.error(C.red + 'Fatal error: ' + err.message + C.r);
  process.exit(1);
});
