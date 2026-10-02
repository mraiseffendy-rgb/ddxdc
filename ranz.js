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

/* ============ CONFIG ============ */
// ⚠️ GANTI INI dengan raw URL config.js kamu di GitHub
const GITHUB_CONFIG_URL =
  'https://raw.githubusercontent.com/USERNAME/REPO/main/config.js';

const DEFAULT_CONFIG = {
  users: { 'Ranz': '122' }
};

let config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
let onlineCount = 0;

/* ============ UTILS ============ */
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function fetchConfig() {
  return new Promise((resolve) => {
    const req = https.get(GITHUB_CONFIG_URL, { timeout: 8000 }, (res) => {
      if (res.statusCode !== 200) return resolve(null);
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const m = { exports: {} };
          new Function('module', 'exports', data + '\nreturn module.exports;')(m, m.exports);
          if (m.exports && m.exports.users) resolve(m.exports);
          else resolve(null);
        } catch (e) { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

function saveConfigLocally() {
  try {
    fs.writeFileSync(
      path.join(__dirname, 'config.json'),
      JSON.stringify(config, null, 2)
    );
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
    const right = maxLen - len - left;
    return ' '.repeat(left) + l + ' '.repeat(right);
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
  const stepMs = 120000 / total;   // 2 menit
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
  const W = 44;
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
  console.log(C.yellow + '  ║' + pad('  [2] Add User') + '║' + C.r);
  console.log(C.yellow + '  ║' + pad('  [3] Exit') + '║' + C.r);
  console.log(C.yellow + C.bold + '  ╚' + '═'.repeat(W) + '╝' + C.r);
  console.log('');
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
  console.log(C.green + '  Ketik "exit"/"logout" untuk keluar' + C.r);
  console.log('');

  while (true) {
    const prompt = C.green + C.bold + `root${username}${online}$ ` + C.r;
    const line = await askText(prompt);
    const cmd = line.trim();

    if (cmd === '') continue;
    if (cmd === 'exit' || cmd === 'logout') break;
    if (cmd === 'clear' || cmd === 'cls') { process.stdout.write('\x1b[2J\x1b[H'); continue; }
    if (cmd === 'whoami') { console.log('root'); continue; }
    if (cmd === 'pwd')    { console.log(cwd); continue; }

    // handle cd (perlu state khusus karena exec buat shell baru)
    if (cmd === 'cd' || cmd.startsWith('cd ')) {
      const target = cmd === 'cd' ? (process.env.HOME || '/') : cmd.slice(3).trim();
      const newPath = path.isAbsolute(target)
        ? target
        : path.resolve(cwd, target.replace(/^~/, process.env.HOME || ''));
      try {
        if (fs.statSync(newPath).isDirectory()) {
          cwd = newPath;
        } else {
          console.log(`cd: ${target}: Not a directory`);
        }
      } catch (e) {
        console.log(`cd: ${target}: No such file or directory`);
      }
      continue;
    }

    await new Promise((resolve) => {
      exec(cmd, { cwd, shell: '/bin/bash', maxBuffer: 1024 * 1024 * 10 },
        (err, stdout, stderr) => {
          if (stdout) process.stdout.write(stdout);
          if (stderr) process.stderr.write(stderr);
          if (err && !stdout && !stderr) process.stderr.write(err.message + '\n');
          resolve();
        });
    });
  }
  onlineCount--;
}

/* ============ LOGIN ============ */
async function loginFlow() {
  console.log('');
  const username = (await askText(C.cyan + '  Username : ' + C.r)).trim();
  const password = await askPassword(C.cyan + '  Password : ' + C.r);

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
  if (!username) { console.log(C.red + '  ✘ Username tidak boleh kosong.' + C.r); return; }
  if (config.users[username]) { console.log(C.red + '  ✘ User sudah ada.' + C.r); return; }
  const password = await askPassword(C.cyan + '  Password baru : ' + C.r);
  if (!password) { console.log(C.red + '  ✘ Password tidak boleh kosong.' + C.r); return; }

  config.users[username] = password;
  saveConfigLocally();

  console.log('');
  console.log(C.green + C.bold + `  ✔ TERKONFIRMASI → ${username}:${password}` + C.r);
  console.log(C.dim   + '  (disimpan ke config.json lokal; update GitHub agar permanen)' + C.r);
}

/* ============ MAIN ============ */
async function main() {
  process.stdout.write('\x1b[2J\x1b[H');
  printBigBox();

  console.log(C.dim + '  Memuat konfigurasi dari GitHub...' + C.r);
  const remote = await fetchConfig();
  if (remote) {
    config = remote;
    console.log(C.green + '  ✔ Konfigurasi dimuat dari GitHub.' + C.r);
  } else {
    console.log(C.yellow + '  ⚠ Gagal fetch GitHub, pakai config lokal/default.' + C.r);
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
