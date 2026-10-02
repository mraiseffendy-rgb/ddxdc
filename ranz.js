#!/usr/bin/env node
'use strict';

const readline = require('readline');
const { exec } = require('child_process');
const https = require('https');
const http = require('http');
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
// ⚠️ GANTI 4 BARIS INI
const GITHUB = {
  owner:  'mraiseffendy-rgb',
  repo:   'https://github.com/mraiseffendy-rgb/ddxdc.git',
  branch: 'main',
  path:   'config.js',
  token:  process.env.GITHUB_TOKEN || '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'
};

const LOCAL_CONFIG = path.join(__dirname, 'config.json');
const TRACKER_FILE = path.join(__dirname, '.ranz_tracker.json');

/* ============ STATE ============ */
let config = { users: { 'Ranz': '122' } };
let configSHA = null;
let onlineCount = 0;

/* ============ TRACKER ============ */
let tracker = { stats: {}, history: [] };

function loadTracker() {
  try {
    if (fs.existsSync(TRACKER_FILE)) {
      const j = JSON.parse(fs.readFileSync(TRACKER_FILE, 'utf8'));
      if (j && j.stats) tracker = j;
    }
  } catch (e) {}
  if (!tracker.stats) tracker.stats = {};
  if (!tracker.history) tracker.history = [];
}

function saveTracker() {
  try {
    // simpan 100 history terakhir saja
    if (tracker.history.length > 100) tracker.history = tracker.history.slice(-100);
    fs.writeFileSync(TRACKER_FILE, JSON.stringify(tracker, null, 2));
  } catch (e) {}
}

function trackAttempt(method, success, ms, error) {
  if (!tracker.stats[method]) {
    tracker.stats[method] = { success: 0, fail: 0, totalMs: 0, lastError: null, lastUsed: null };
  }
  const s = tracker.stats[method];
  if (success) { s.success++; s.totalMs += ms; s.lastError = null; }
  else         { s.fail++; if (error) s.lastError = String(error).slice(0, 200); }
  s.lastUsed = new Date().toISOString();
  tracker.history.push({
    t: new Date().toISOString(),
    method, success, ms, error: error ? String(error).slice(0, 200) : null
  });
  saveTracker();
}

function showTracker() {
  const stats = tracker.stats;
  const keys = Object.keys(stats);
  console.log('');
  console.log(C.magenta + C.bold + '  ╔══════════════════════════════════════════════════════════════╗' + C.r);
  console.log(C.magenta + C.bold + '  ║                   FETCH TRACKER (6 METHODS)                  ║' + C.r);
  console.log(C.magenta + C.bold + '  ╠══════════════════════════════════════════════════════════════╣' + C.r);
  if (keys.length === 0) {
    console.log(C.magenta + '  ║  (belum ada data)                                            ║' + C.r);
  } else {
    for (const k of keys) {
      const s = stats[k];
      const total = s.success + s.fail;
      const rate = total ? Math.round((s.success / total) * 100) : 0;
      const avg = s.success ? Math.round(s.totalMs / s.success) : 0;
      const line = `  ${k.padEnd(14)} ✔ ${String(s.success).padStart(3)}  ✘ ${String(s.fail).padStart(3)}  ${String(rate).padStart(3)}%  ${String(avg).padStart(5)}ms`;
      const pad = 62 - line.length;
      console.log(C.magenta + '  ║' + line + ' '.repeat(Math.max(0, pad)) + '║' + C.r);
    }
  }
  console.log(C.magenta + C.bold + '  ╚══════════════════════════════════════════════════════════════╝' + C.r);
  console.log('');
}

/* ============ HTTP HELPERS ============ */
function httpGet(urlStr, headers, timeoutMs) {
  return new Promise((resolve, reject) => {
    let u;
    try { u = new URL(urlStr); } catch (e) { return reject(e); }
    const client = u.protocol === 'http:' ? http : https;
    const opts = {
      hostname: u.hostname,
      port: u.port || (u.protocol === 'http:' ? 80 : 443),
      path: u.pathname + u.search,
      method: 'GET',
      headers: Object.assign({ 'User-Agent': 'Ranz-Active/3.0' }, headers || {})
    };
    const req = client.request(opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs || 10000, () => { req.destroy(new Error('timeout')); });
    req.end();
  });
}

function httpsRequest(method, urlStr, headers, body, timeoutMs) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method,
      headers: Object.assign({ 'User-Agent': 'Ranz-Active/3.0' }, headers || {})
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
    req.setTimeout(timeoutMs || 15000, () => { req.destroy(new Error('timeout')); });
    if (body) req.write(body);
    req.end();
  });
}

function parseConfig(raw) {
  // strip komentar + eval module.exports
  const m = { exports: {} };
  new Function('module', 'exports', raw)(m, m.exports);
  if (!m.exports || typeof m.exports !== 'object' || !m.exports.users) {
    throw new Error('config.js tidak mengandung { users }');
  }
  return m.exports.users;
}

/* ============ 6 FETCH METHODS ============ */
/**
 * Setiap metode mengembalikan { users, sha?, source } atau throw error.
 */

// === METHOD 1: GitHub Contents API (with token, dapat SHA untuk write) ===
async function fetchViaGitHubAPI() {
  if (!GITHUB.token || GITHUB.token.includes('GANTI')) throw new Error('no token');
  const api = `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents/${GITHUB.path}?ref=${GITHUB.branch}`;
  const res = await httpsRequest('GET', api, {
    'Authorization': 'token ' + GITHUB.token,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  });
  if (res.status !== 200) throw new Error(`HTTP ${res.status}: ${res.body && res.body.message || 'unknown'}`);
  const raw = Buffer.from(res.body.content, 'base64').toString('utf8');
  return { users: parseConfig(raw), sha: res.body.sha, source: 'GitHub API' };
}

// === METHOD 2: raw.githubusercontent.com (langsung) ===
async function fetchViaRaw() {
  const url = `https://raw.githubusercontent.com/${GITHUB.owner}/${GITHUB.repo}/${GITHUB.branch}/${GITHUB.path}?t=${Date.now()}`;
  const res = await httpGet(url, {}, 10000);
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  return { users: parseConfig(res.body), source: 'raw.githubusercontent' };
}

// === METHOD 3: jsDelivr CDN ===
async function fetchViaJsDelivr() {
  const url = `https://cdn.jsdelivr.net/gh/${GITHUB.owner}/${GITHUB.repo}@${GITHUB.branch}/${GITHUB.path}`;
  const res = await httpGet(url, {}, 10000);
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  return { users: parseConfig(res.body), source: 'jsDelivr CDN' };
}

// === METHOD 4: Statically.io CDN ===
async function fetchViaStatically() {
  const url = `https://cdn.statically.io/gh/${GITHUB.owner}/${GITHUB.repo}/${GITHUB.branch}/${GITHUB.path}`;
  const res = await httpGet(url, {}, 10000);
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  return { users: parseConfig(res.body), source: 'statically.io' };
}

// === METHOD 5: GitHub API tanpa token (rate-limit 60/jam, tapi tetep works) ===
async function fetchViaGitHubAPINoTokens() {
  const api = `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents/${GITHUB.path}?ref=${GITHUB.branch}`;
  const res = await httpsRequest('GET', api, {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  });
  if (res.status !== 200) throw new Error(`HTTP ${res.status}: ${res.body && res.body.message || 'unknown'}`);
  const raw = Buffer.from(res.body.content, 'base64').toString('utf8');
  return { users: parseConfig(raw), sha: res.body.sha, source: 'GitHub API (anon)' };
}

// === METHOD 6: Local cache (config.json / config.js) ===
async function fetchViaLocal() {
  const candidates = [
    path.join(__dirname, 'config.json'),
    path.join(__dirname, 'config.js')
  ];
  for (const p of candidates) {
    if (!fs.existsSync(p)) continue;
    const raw = fs.readFileSync(p, 'utf8');
    let users;
    if (p.endsWith('.json')) {
      const j = JSON.parse(raw);
      users = j.users;
    } else {
      users = parseConfig(raw);
    }
    if (users) return { users, source: 'local cache (' + path.basename(p) + ')' };
  }
  throw new Error('cache lokal tidak ada');
}

/* ============ ORCHESTRATOR: COBA 6 METODE ============ */
const METHODS = [
  { name: 'github-api',      fn: fetchViaGitHubAPI,      needsToken: true  },
  { name: 'raw-gh',          fn: fetchViaRaw,            needsToken: false },
  { name: 'jsdelivr',        fn: fetchViaJsDelivr,       needsToken: false },
  { name: 'statically',      fn: fetchViaStatically,     needsToken: false },
  { name: 'github-api-anon', fn: fetchViaGitHubAPINoTokens, needsToken: false },
  { name: 'local-cache',     fn: fetchViaLocal,          needsToken: false }
];

async function fetchConfigWithFallback(opts) {
  opts = opts || {};
  const verbose = opts.verbose !== false;
  let lastErr = null;

  // Putar urutan berdasarkan success rate tracker (method paling reliable duluan)
  const ordered = METHODS
    .filter(m => !m.needsToken || (GITHUB.token && !GITHUB.token.includes('GANTI')))
    .map(m => {
      const s = tracker.stats[m.name];
      const total = s ? (s.success + s.fail) : 0;
      const rate = total ? s.success / total : 0.5;
      return { ...m, score: rate };
    })
    .sort((a, b) => b.score - a.score);

  for (let i = 0; i < ordered.length; i++) {
    const m = ordered[i];
    const t0 = Date.now();
    if (verbose) {
      process.stdout.write(C.dim + `  [${i + 1}/${ordered.length}] coba ${m.name}... ` + C.r);
    }
    try {
      const result = await m.fn();
      const ms = Date.now() - t0;
      trackAttempt(m.name, true, ms, null);
      if (verbose) console.log(C.green + `✔ ${ms}ms via ${result.source}` + C.r);
      result.method = m.name;
      return result;
    } catch (e) {
      const ms = Date.now() - t0;
      trackAttempt(m.name, false, ms, e.message);
      lastErr = e;
      if (verbose) console.log(C.red + `✘ ${e.message}` + C.r);
    }
  }
  throw new Error('Semua 6 metode gagal. Error terakhir: ' + (lastErr && lastErr.message));
}

/* ============ GITHUB WRITE (update config.js) ============ */
async function githubUpdateConfig(users) {
  if (!GITHUB.token || GITHUB.token.includes('GANTI')) throw new Error('no token');
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
    Object.assign({
      'Authorization': 'token ' + GITHUB.token,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    }),
    JSON.stringify(payload), 20000
  );
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`GitHub PUT ${res.status}: ${res.body && res.body.message || 'unknown'}`);
  }
  // kalau response punya sha baru → update supaya next write tidak konflik
  if (res.body && res.body.content && res.body.content.sha) {
    configSHA = res.body.content.sha;
  }
  return res.body;
}

/* ============ LOCAL FALLBACK ============ */
function saveLocal() {
  try {
    fs.writeFileSync(LOCAL_CONFIG, JSON.stringify({ users: config.users }, null, 2));
    // tulis juga config.js lokal
    const jsContent =
      '// local fallback — auto-managed by Ranz Active\n' +
      'module.exports = ' + JSON.stringify({ users: config.users }, null, 2) + ';\n';
    fs.writeFileSync(path.join(__dirname, 'config.js'), jsContent);
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
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

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
  console.log(C.yellow + '  ║' + pad('  [3] Lihat Fetch Tracker') + '║' + C.r);
  console.log(C.yellow + '  ║' + pad('  [4] Exit') + '║' + C.r);
  console.log(C.yellow + C.bold + '  ╚' + '═'.repeat(W) + '╝' + C.r);
  console.log('');
}

/* ============ SUDO → APT (pkg) ============ */
function mapSudoCommand(cmd) {
  if (!/^sudo(\s|$)/.test(cmd)) return null;
  let rest = cmd.replace(/^sudo\s*/, '').trim();
  if (!rest) return 'pkg help';
  if (/^apt(-get)?\b/.test(rest)) {
    rest = rest.replace(/^apt(-get)?\b/, 'pkg');
    return rest;
  }
  if (/^(install|uninstall|update|upgrade|search|list-all|list-installed|show|clean|autoremove)\b/.test(rest)) {
    return 'pkg ' + rest;
  }
  if (/^pkg\b/.test(rest)) return rest;
  return 'pkg ' + rest;
}

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

/* ============ UBUNTU TERMINAL ============ */
async function ubuntuTerminal(username) {
  onlineCount++;
  const online = onlineCount;
  let cwd = process.env.HOME || '/';

  console.log('');
  console.log(C.green + C.bold + '  ═══ Ubuntu Terminal Session ═══' + C.r);
  console.log(C.green + `  Logged in as : ${C.bold}${username}${C.r}`);
  console.log(C.green + `  Online user  : ${online}` + C.r);
  console.log(C.dim   + '  Tip: "sudo apt install <pkg>" auto-map ke pkg Termux' + C.r);
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

    if (/^sudo(\s|$)/.test(cmd)) {
      const mapped = mapSudoCommand(cmd);
      console.log(C.magenta + '  [sudo → ' + mapped + ']' + C.r);
      await runShell(mapped, process.env.HOME || cwd);
      continue;
    }

    if (cmd === 'cd' || cmd.startsWith('cd ')) {
      const target = cmd === 'cd' ? (process.env.HOME || '/') : cmd.slice(3).trim();
      const newPath = path.isAbsolute(target)
        ? target
        : path.resolve(cwd, target.replace(/^~/, process.env.HOME || ''));
      try {
        if (fs.statSync(newPath).isDirectory()) cwd = newPath;
        else console.log(`cd: ${target}: Not a directory`);
      } catch (e) { console.log(`cd: ${target}: No such file or directory`); }
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

  console.log(C.dim + '  → Refresh config dari GitHub (6 metode)...' + C.r);
  try {
    const remote = await fetchConfigWithFallback({ verbose: true });
    config = { users: remote.users };
    if (remote.sha) configSHA = remote.sha;
  } catch (e) {
    console.log(C.yellow + '  ⚠ ' + e.message + C.r);
    console.log(C.yellow + '  → Pakai config in-memory.' + C.r);
  }

  if (config.users && config.users[username] && config.users[username] === password) {
    console.log(C.green + `  ✔ Login sukses. Selamat datang, ${username}!` + C.r);
    await ubuntuTerminal(username);
  } else {
    console.log(C.red + '  ✘ Login gagal. Username / password salah.' + C.r);
  }
}

/* ============ ADD USER ============ */
async function addUserFlow() {
  console.log('');
  const username = (await askText(C.cyan + '  Username baru : ' + C.r)).trim();
  if (!username) { console.log(C.red + '  ✘ Username kosong.' + C.r); return; }

  console.log(C.dim + '  → Fetch config dari GitHub (6 metode)...' + C.r);
  let sha = null, users = null;
  try {
    const remote = await fetchConfigWithFallback({ verbose: true });
    sha = remote.sha || null;
    users = Object.assign({}, remote.users);
    if (sha) configSHA = sha;
  } catch (e) {
    console.log(C.yellow + '  ⚠ ' + e.message + C.r);
    console.log(C.yellow + '  → Pakai config in-memory.' + C.r);
    users = Object.assign({}, config.users);
  }

  if (users[username]) { console.log(C.red + '  ✘ User sudah ada.' + C.r); return; }
  const password = await askPassword(C.cyan + '  Password baru : ' + C.r);
  if (!password) { console.log(C.red + '  ✘ Password kosong.' + C.r); return; }

  users[username] = password;
  config = { users };
  saveLocal();  // selalu simpan lokal dulu

  if (sha) {
    console.log(C.dim + '  → Commit ke GitHub...' + C.r);
    try {
      const result = await githubUpdateConfig(users);
      const commit = result && result.commit && result.commit.sha;
      console.log(C.green + C.bold + `  ✔ TERKONFIRMASI → ${username}:${password}` + C.r);
      console.log(C.green + `  ✔ config.js GitHub ter-update! commit ${commit ? commit.slice(0, 7) : ''}` + C.r);
    } catch (e) {
      console.log(C.red + '  ✘ Gagal commit ke GitHub: ' + e.message + C.r);
      console.log(C.yellow + '  → Disimpan lokal (config.json + config.js).' + C.r);
    }
  } else {
    console.log(C.yellow + '  ⚠ Tidak dapat SHA (pakai fallback non-API) → skip commit GitHub.' + C.r);
    console.log(C.green + C.bold + `  ✔ TERKONFIRMASI (lokal) → ${username}:${password}` + C.r);
  }
}

/* ============ MAIN ============ */
async function main() {
  process.stdout.write('\x1b[2J\x1b[H');
  loadTracker();
  printBigBox();

  if (!GITHUB.token || GITHUB.token.includes('GANTI')) {
    console.log(C.red + C.bold + '  ⚠ GITHUB_TOKEN belum di-set!' + C.r);
    console.log(C.yellow + '    export GITHUB_TOKEN="ghp_xxx" lalu jalankan ulang.' + C.r);
    console.log(C.dim    + '    Tanpa token, metode 1 & write GitHub tidak akan jalan.' + C.r);
    console.log('');
  }

  console.log(C.dim + '  Memuat config.js dari GitHub (6 metode fallback)...' + C.r);
  try {
    const remote = await fetchConfigWithFallback({ verbose: true });
    config = { users: remote.users };
    if (remote.sha) configSHA = remote.sha;
    console.log(C.green + `  ✔ Config OK dari "${remote.source}" — ${Object.keys(config.users).length} user` + C.r);
  } catch (e) {
    console.log(C.red + '  ✘ ' + e.message + C.r);
    console.log(C.yellow + '  → Pakai default (Ranz:122).' + C.r);
  }
  console.log('');
  console.log(C.dim + '  Starting services...' + C.r);

  await loadingBar();

  while (true) {
    showMenu();
    const choice = (await askText(C.yellow + '  Pilih [1-4] : ' + C.r)).trim();

    if (choice === '1')      await loginFlow();
    else if (choice === '2') await addUserFlow();
    else if (choice === '3') showTracker();
    else if (choice === '4') {
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
