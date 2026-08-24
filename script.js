// ─── API Endpoints ──────────────────────────────────────────────────────────
const GAS_BASE = 'https://script.google.com/macros/s/AKfycbwB7-DfJ2N8sdWOiVCkUfELkwREGHfS2NBf0mPJ14IVxCV7tJT_PdLVVhkqv6Iwz729Tw/exec';
const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1dY39PZ4YF_iN3CeueclsUA3uluZW2oolKkPSTp0Bk7c/export?format=csv&gid=1873851496';

// ─── Fallback Word Database (รองรับการอัปเดตและเพิ่มหมวดหมู่อัตโนมัติจากชีต) ────
let cachedVocab = null;
try {
  const stored = localStorage.getItem("hangman_cached_vocab");
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      cachedVocab = parsed.map(item => ({
        ...item,
        unit: String(item.unit || "5").trim().replace(/^(unit\s*)+/i, "") || "5"
      }));
    }
  }
} catch(e) {}

let WORD_DATABASE = cachedVocab || [
  { word: "ADVENTURER", clue: "(n.) นักผจญภัย", category: "Travelers", unit: "5" },
  { word: "BACKPACKER", clue: "(n.) นักท่องเที่ยวที่สะพายเป้เดินทาง", category: "Travelers", unit: "5" },
  { word: "COMMUTER", clue: "(n.) ผู้เดินทางจากบ้านไปทำงานเป็นประจำ", category: "Travelers", unit: "5" },
  { word: "EXPLORER", clue: "(n.) นักสำรวจ", category: "Travelers", unit: "5" },
  { word: "IMMIGRANT", clue: "(n.) ผู้อพยพ", category: "Travelers", unit: "5" },
  { word: "MOTORIST", clue: "(n.) คนขับรถยนต์", category: "Travelers", unit: "5" },
  { word: "NOMAD", clue: "(n.) คนพเนจร", category: "Travelers", unit: "5" },
  { word: "PASSENGER", clue: "(n.) ผู้โดยสาร", category: "Travelers", unit: "5" },
  { word: "REFUGEE", clue: "(n.) ผู้ลี้ภัย", category: "Travelers", unit: "5" },
  { word: "TOURIST", clue: "(n.) นักท่องเที่ยว", category: "Travelers", unit: "5" },
  { word: "AMBULANCE", clue: "(n.) รถพยาบาล", category: "Travel skills", unit: "5" },
  { word: "ARRIVAL", clue: "(n.) มาถึง", category: "Travel skills", unit: "5" },
  { word: "CALCULATE", clue: "(v.) คำนวณ", category: "Travel skills", unit: "5" },
  { word: "COMPASS", clue: "(n.) เข็มทิศ", category: "Travel skills", unit: "5" },
  { word: "CURRENCY", clue: "(n.) สกุลเงิน", category: "Travel skills", unit: "5" },
  { word: "DEPARTURE", clue: "(n.) ออกเดินทาง", category: "Travel skills", unit: "5" },
  { word: "DIRECTIONS", clue: "(n.) ทิศทาง", category: "Travel skills", unit: "5" },
  { word: "EMERGENCY", clue: "(n./adj.) เหตุฉุกเฉิน ภาวะฉุกเฉิน", category: "Travel skills", unit: "5" },
  { word: "EXCHANGERATE", clue: "(Compound Noun) อัตราแลกเปลี่ยน", category: "Travel skills", unit: "5" },
  { word: "LOCATE", clue: "(v.) หาตำแหน่งที่ตั้ง", category: "Travel skills", unit: "5" },
  { word: "SCHEDULE", clue: "(n.) ตารางเวลา", category: "Travel skills", unit: "5" },
  { word: "DRIVEOUT", clue: "(Phrasal Verb) ขับไล่ บีบให้ออกไป", category: "Multi-word verb", unit: "5" },
  { word: "ENDUP", clue: "(Phrasal Verb) ลงเอยด้วย จบลงที่", category: "Multi-word verb", unit: "5" },
  { word: "GIVEAWAY", clue: "(Phrasal Verb) แจกฟรี ยกให้ผู้อื่น", category: "Multi-word verb", unit: "5" },
  { word: "GOAWAY", clue: "(Phrasal Verb) ไปให้พ้น ออกไปข้างนอก หายไป", category: "Multi-word verb", unit: "5" },
  { word: "GROWUP", clue: "(Phrasal Verb) เติบโต โตเป็นผู้ใหญ่", category: "Multi-word verb", unit: "5" },
  { word: "HIDEOUT", clue: "(Phrasal Verb) กบดาน ซ่อนตัว", category: "Multi-word verb", unit: "5" },
  { word: "MOVEAWAY", clue: "(Phrasal Verb) ย้ายที่อยู่อาศัยไปที่อื่น", category: "Multi-word verb", unit: "5" },
  { word: "PACKUP", clue: "(Phrasal Verb) เก็บข้าวของ", category: "Multi-word verb", unit: "5" },
  { word: "STAYAWAY", clue: "(Phrasal Verb) อยู่ให้ห่าง ไม่เข้าใกล้", category: "Multi-word verb", unit: "5" },
  { word: "STAYUP", clue: "(Phrasal Verb) นอนดึก ยังไม่ยอมนอน", category: "Multi-word verb", unit: "5" },
  { word: "STAYOUT", clue: "(Phrasal Verb) อยู่นอกบ้าน", category: "Multi-word verb", unit: "5" }
];

// ─── Game Constants ──────────────────────────────────────────────────────────
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_MISTAKES = 5;
const ROW_LAYOUT = [5, 4, 3];
const TOTAL_KEYS = ROW_LAYOUT.reduce((s, c) => s + c, 0);
const ROW_KEY_CLASSES = ["key-red", "key-blue", "key-yellow"];
const KEY_ROTATIONS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const TILE_COLORS = ["#FFF9C4", "#E1F5FE", "#E8F5E9", "#FFECB3", "#F3E5F5", "#FFEBEE"];
const TILE_ROTATIONS = [0, 0, 0, 0, 0, 0, 0, 0];

// ─── Game State ──────────────────────────────────────────────────────────────
let currentItem = null;
let secretWord = "";
let mistakes = 0;
let activeKeys = [];
let isGameOver = false;
let activeUnit = "ALL";
let activeSection = "ALL";
let sessionWordsPlayed = 0;
let sessionWordsWon = 0;
let soundEnabled = JSON.parse(localStorage.getItem("hangman_sound") !== null ? localStorage.getItem("hangman_sound") : "true");
let playedWordsPerCategory = JSON.parse(localStorage.getItem("hangman_category_progress") || "{}");
let revealedTiles = [];
let currentTileIndex = 1;

// ─── User State ──────────────────────────────────────────────────────────────
let userName = localStorage.getItem("hangman_username") || "ผู้เรียนทั่วไป";
let userEmail = localStorage.getItem("hangman_useremail") || "";
let score = parseInt(localStorage.getItem("hangman_score") || "0", 10);
let streak = parseInt(localStorage.getItem("hangman_streak") || "0", 10);
let maxStreak = parseInt(localStorage.getItem("hangman_max_streak") || "0", 10);
let masteredWords = JSON.parse(localStorage.getItem("hangman_mastered") || "[]");
let wordProgress = JSON.parse(localStorage.getItem("hangman_word_progress") || "{}");

// ─── Utilities ───────────────────────────────────────────────────────────────
async function hashPin(pin) {
  const msgBuffer = new TextEncoder().encode(pin);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function fetchWithTimeout(url, options = {}, ms = 8000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

function todayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ─── Toast ────────────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, type = "info", ms = 3500) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.className = "toast toast-" + type + " show";
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), ms);
}

const SOUND_ON_SVG = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
const SOUND_OFF_SVG = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';

// ─── Sound Toggle ─────────────────────────────────────────────────────────────
function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem("hangman_sound", JSON.stringify(soundEnabled));
  const btn = document.getElementById("sound-toggle-btn");
  if (btn) btn.innerHTML = soundEnabled ? SOUND_ON_SVG : SOUND_OFF_SVG;
  showToast(soundEnabled ? "เปิดเสียงแล้ว" : "ปิดเสียงแล้ว", "info", 1800);
}

// ─── Audio Engine & Auto Unlock ─────────────────────────────────────────────
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Pre-warm AudioContext on first user interaction to eliminate touch audio delay
["pointerdown", "touchstart", "click", "keydown"].forEach(evt => {
  window.addEventListener(evt, () => {
    getAudioContext();
  }, { once: true, passive: true });
});

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === "click" || type === "tap") {
      // Crisp retro punch click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "reveal" || type === "hint") {
      // Dual harmonic chime pop
      [587.33, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);
        gain.gain.setValueAtTime(0.18, now + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.03);
        osc.stop(now + idx * 0.03 + 0.12);
      });
    } else if (type === "wrong") {
      // Elastic rubber-band boing drop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.2);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "stamp") {
      // Deep mechanical rubber stamp thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.09);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === "win") {
      // Uplifting 8-bit victory arpeggio
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.28);
      });
    } else if (type === "lose") {
      // Retro defeat descending chords
      [311.13, 277.18, 246.94, 207.65].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.25);
      });
    }
  } catch (e) {}
}

// ─── TTS ──────────────────────────────────────────────────────────────────────
function speakCurrentWord() { if (secretWord) speakText(secretWord); }
function speakText(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

// ─── Confetti (High-Hz & Frame-rate Independent Physics) ──────────────────────
function triggerConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = [];
  const colors = ["#FF7B7B", "#FFE082", "#89CFF0", "#9CE3B0", "#D8B4E2", "#FF8A80", "#F8BBD0"];
  for (let i = 0; i < 75; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() * 240 - 120),
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -14 - 5,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let lastTime = performance.now();
  let startTime = lastTime;

  function anim(currentTime) {
    const elapsed = currentTime - startTime;
    // Delta normalized to standard 60fps (16.667ms per frame)
    const delta = Math.min(2.5, (currentTime - lastTime) / 16.667);
    lastTime = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.vy += 0.4 * delta; // Gravity
      p.rotation += p.vRot * delta;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (elapsed < 2000) {
      requestAnimationFrame(anim);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(anim);
}

// ─── Hangman SVG removed (ไม่เหมาะกับเด็ก) ──────────────────────────────────
// ใช้หัวใจ หัวใจ ในแถว lives-display แทนการวาดภาพ
function updateHangmanSVG(mistakeCount, isLost) {
  // no-op — SVG ถูกนำออกแล้ว, ชีวิตแสดงด้วยหัวใจใน renderLivesChips()
}

// ─── Leitner Spaced Repetition System (SRS) ───────────────────────────────────
const BOX_INTERVALS = {
  0: 0,   // Box 0: ยังไม่เคยเล่น (ทบทวนทันที)
  1: 1,   // Box 1: ตอบผิด (ทบทวนใน 1 วัน)
  2: 3,   // Box 2: ตอบถูก (ทบทวนใน 3 วัน)
  3: 7,   // Box 3: ตอบถูกซ้ำ (ทบทวนใน 7 วัน)
  4: 14   // Box 4: เชี่ยวชาญสูงสุด (ทบทวนใน 14 วัน)
};

function addDays(dateStr, days) {
  const d = new Date((dateStr || todayString()) + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function getWordSRS(word) {
  if (!wordProgress[word]) {
    return { box: 0, lastReviewed: "", nextReview: todayString(), correct: 0, wrong: 0 };
  }
  return wordProgress[word];
}

function updateWordSRS(word, isCorrect) {
  const today = todayString();
  const current = getWordSRS(word);
  let nextBox;
  
  if (isCorrect) {
    // ถ้าเป็น Box 0 ตอบถูกครั้งแรกจะข้ามไป Box 2 ทันที (ทบทวนใน 3 วัน)
    // ถ้าเคยเล่นแล้ว จะเพิ่มทีละ 1 สูงสุดที่ Box 4
    if (current.box === 0) {
      nextBox = 2;
    } else {
      nextBox = Math.min(4, current.box + 1);
    }
  } else {
    // ไม่ว่าจะอยู่ Box ไหนถ้าตอบผิด จะลดลงมาที่ Box 1 ทันที (ทบทวนใน 1 วัน)
    nextBox = 1;
  }

  const intervalDays = BOX_INTERVALS[nextBox] || 1;
  const nextReviewDate = addDays(today, intervalDays);

  wordProgress[word] = {
    box: nextBox,
    lastReviewed: today,
    nextReview: nextReviewDate,
    correct: (current.correct || 0) + (isCorrect ? 1 : 0),
    wrong: (current.wrong || 0) + (isCorrect ? 0 : 1)
  };

  // Mastered words คือคำที่อยู่ Box 2 ขึ้นไป
  masteredWords = Object.keys(wordProgress).filter(w => wordProgress[w] && wordProgress[w].box >= 2);
  localStorage.setItem("hangman_mastered", JSON.stringify(masteredWords));
  saveWordProgress();
  return wordProgress[word];
}

function saveWordProgress() {
  localStorage.setItem("hangman_word_progress", JSON.stringify(wordProgress));
  if (currentUser) {
    currentUser.playedProgress = wordProgress;
    currentUser.masteredWords = masteredWords;
    localStorage.setItem("hangman_session_user", JSON.stringify(currentUser));
  }
}

function getBoxCounts() {
  const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, dueToday: 0 };
  const today = todayString();
  WORD_DATABASE.forEach(item => {
    const srs = wordProgress[item.word];
    const box = srs ? (srs.box || 0) : 0;
    counts[box] = (counts[box] || 0) + 1;
    if (srs && srs.box > 0 && srs.nextReview <= today) {
      counts.dueToday++;
    }
  });
  return counts;
}

// ─── Daily Streak ─────────────────────────────────────────────────────────────
function checkAndProcessDailyStreak() {
  const today = todayString();
  const last = localStorage.getItem("hangman_last_played") || (currentUser && currentUser.lastPlayed) || "";
  
  if (!last) {
    streak = 1;
    maxStreak = Math.max(maxStreak, 1);
    localStorage.setItem("hangman_last_played", today);
    if (currentUser) currentUser.lastPlayed = today;
  } else if (last === today) {
    if (streak <= 0) streak = 1;
    maxStreak = Math.max(maxStreak, streak);
  } else {
    const todayDate = new Date(today + "T00:00:00");
    const lastDate = new Date(last + "T00:00:00");
    const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak += 1;
      maxStreak = Math.max(maxStreak, streak);
      showToast("ยอดเยี่ยม! เข้าเรียนต่อเนื่องเป็นวันที่ " + streak + " แล้ว", "success", 4000);
    } else if (diffDays > 1) {
      streak = 1;
      showToast("ขาดเรียนเกิน 1 วัน เริ่มนับ Daily Streak ใหม่ (วันที่ 1)", "warning", 4000);
    }
    localStorage.setItem("hangman_last_played", today);
    if (currentUser) currentUser.lastPlayed = today;
  }

  updateScoreBoard();
}

// ─── Category Progress Helper ─────────────────────────────────────────────────
function getPlayedWords(cat) {
  if (!playedWordsPerCategory[cat] || !Array.isArray(playedWordsPerCategory[cat])) {
    playedWordsPerCategory[cat] = [];
  }
  return playedWordsPerCategory[cat];
}

function saveCategoryProgress() {
  localStorage.setItem("hangman_category_progress", JSON.stringify(playedWordsPerCategory));
  if (currentUser) {
    currentUser.categoryProgress = playedWordsPerCategory;
    localStorage.setItem("hangman_session_user", JSON.stringify(currentUser));
  }
}

// ─── Session Progress ─────────────────────────────────────────────────────────
function updateSessionProgress() {
  const el = document.getElementById("session-progress");
  if (!el) return;
  const pool = getFilteredWords();
  const playedList = getPlayedWords(activeSection);
  if (pool.length > 0) {
    el.textContent = "คำที่ " + playedList.length + "/" + pool.length;
  } else {
    el.textContent = sessionWordsPlayed + " คำวันนี้";
  }
}

// ─── Score + Sync ─────────────────────────────────────────────────────────────
function updateScoreBoard() {
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  set("player-name-display", userName);
  set("score-val", score);
  set("streak-val", streak);
  set("mastered-count", masteredWords.length);
  set("home-vault-count", WORD_DATABASE.length);
  set("modal-streak-count", streak);
  set("modal-max-streak-count", maxStreak);
  set("modal-score-count", score);
  set("modal-mastered-count", masteredWords.length);
  set("modal-total-vault-count", WORD_DATABASE.length);

  const boxStats = getBoxCounts();
  set("box1-count", boxStats[1] || 0);
  set("box2-count", boxStats[2] || 0);
  set("box3-count", boxStats[3] || 0);
  set("box4-count", boxStats[4] || 0);
  set("modal-due-count", "ทบทวนวันนี้: " + (boxStats.dueToday || 0) + " คำ");

  const soundBtn = document.getElementById("sound-toggle-btn");
  if (soundBtn) soundBtn.innerHTML = soundEnabled ? SOUND_ON_SVG : SOUND_OFF_SVG;

  // Welcome bar on home screen
  const nameToDisplay = (currentUser && currentUser.name) || userName || "ผู้เรียน";
  set("home-user-name", nameToDisplay);
  set("home-streak-days", streak);
  set("home-mastered-summary", masteredWords.length + "/" + WORD_DATABASE.length);
  set("home-streak-badge", streak);

  localStorage.setItem("hangman_username", userName);
  localStorage.setItem("hangman_useremail", userEmail);
  localStorage.setItem("hangman_score", score);
  localStorage.setItem("hangman_streak", streak);
  localStorage.setItem("hangman_max_streak", maxStreak);
  localStorage.setItem("hangman_mastered", JSON.stringify(masteredWords));
  saveWordProgress();

  if (currentUser) {
    currentUser.name = userName;
    currentUser.email = userEmail;
    currentUser.score = score;
    currentUser.streak = streak;
    currentUser.maxStreak = maxStreak;
    currentUser.masteredWords = masteredWords;
    currentUser.playedProgress = wordProgress;
    localStorage.setItem("hangman_session_user", JSON.stringify(currentUser));
  }
}

async function syncScoreToGAS() {
  if (!userEmail || !navigator.onLine) return;
  try {
    const url = GAS_BASE + "?action=updateScore" +
      "&email=" + encodeURIComponent(userEmail) +
      "&score=" + score +
      "&streak=" + streak +
      "&maxStreak=" + maxStreak +
      "&masteredCount=" + masteredWords.length +
      "&masteredWords=" + encodeURIComponent(JSON.stringify(masteredWords)) +
      "&playedProgress=" + encodeURIComponent(JSON.stringify(wordProgress));
    await fetchWithTimeout(url);
  } catch(e) {}
}

// ─── Section Tabs ─────────────────────────────────────────────────────────────
function renderSectionTabs() {
  const unitPool = activeUnit === "ALL" ? WORD_DATABASE : WORD_DATABASE.filter(i => String(i.unit || "").trim() === String(activeUnit).trim());
  const sections = ["ALL", ...new Set(unitPool.map(i => i.category).filter(Boolean))];
  const container = document.getElementById("section-tabs");
  if (!container) return;
  container.innerHTML = "";
  sections.forEach(sec => {
    const tab = document.createElement("button");
    tab.className = "section-tab" + (sec === activeSection ? " active" : "");
    tab.textContent = sec === "ALL" ? "ทั้งหมด" : sec;
    tab.onclick = () => { activeSection = sec; renderSectionTabs(); initGame(); };
    container.appendChild(tab);
  });
}

function getFilteredWords() {
  let pool = WORD_DATABASE;
  if (activeUnit !== "ALL") {
    pool = pool.filter(i => String(i.unit || "").trim() === String(activeUnit).trim());
  }
  if (activeSection !== "ALL") {
    pool = pool.filter(i => i.category === activeSection);
  }
  return pool;
}

function formatClueHTML(clueString) {
  if (!clueString) return '<span class="text-sm font-bold text-gray-500">-</span>';
  const match = clueString.match(/^\(([^)]+(?:\([^)]+\))?)\)\s*(.*)$/);
  if (match) {
    const pos = match[1];
    const meaning = match[2];
    return '<div class="flex items-center justify-center gap-2 flex-wrap py-1">' +
      '<span class="text-xs font-black px-2 py-0.5 bg-yellow-200 border-2 border-[#26221F] rounded-md text-[#26221F] shadow-[1.5px_1.5px_0_#26221F]">' + pos + '</span>' +
      '<span class="text-base sm:text-lg lg:text-xl font-black text-[#181614] leading-snug tracking-wide">' + meaning + '</span>' +
    '</div>';
  }
  return '<div class="text-base sm:text-lg lg:text-xl font-black text-[#181614] py-1 leading-snug tracking-wide">' + clueString + '</div>';
}

// ─── Game Init (Spaced Repetition Prioritized Queue) ──────────────────────────
function initGame() {
  const pool = getFilteredWords();
  if (!pool.length) return;

  const today = todayString();
  const playedThisSession = getPlayedWords(activeSection);
  let candidatePool = pool.filter(item => !playedThisSession.includes(item.word));

  if (candidatePool.length === 0) {
    const secName = activeSection === "ALL" ? "ทั้งหมด" : activeSection;
    showToast("คุณเล่นครบทุกคำในหมวด " + secName + " แล้ว! เริ่มรอบใหม่", "success", 4000);
    playedWordsPerCategory[activeSection] = [];
    saveCategoryProgress();
    candidatePool = [...pool];
  }

  // Spaced Repetition Sorting:
  // 1. คำที่ถึงกำหนดทบทวน (Box > 0 และ nextReview <= today)
  // 2. คำใหม่ (Box 0)
  // 3. คำอื่นๆ
  const dueWords = candidatePool.filter(item => {
    const srs = wordProgress[item.word];
    return srs && srs.box > 0 && srs.nextReview <= today;
  });

  const newWords = candidatePool.filter(item => {
    const srs = wordProgress[item.word];
    return !srs || srs.box === 0;
  });

  if (dueWords.length > 0) {
    currentItem = dueWords[Math.floor(Math.random() * dueWords.length)];
  } else if (newWords.length > 0) {
    currentItem = newWords[Math.floor(Math.random() * newWords.length)];
  } else {
    currentItem = candidatePool[Math.floor(Math.random() * candidatePool.length)];
  }

  if (!playedThisSession.includes(currentItem.word)) {
    playedThisSession.push(currentItem.word);
    saveCategoryProgress();
  }
  secretWord = currentItem.word;

  revealedTiles = new Array(secretWord.length).fill(false);
  revealedTiles[0] = true; // First letter given as initial hint!
  currentTileIndex = 1;
  while (currentTileIndex < secretWord.length && revealedTiles[currentTileIndex]) {
    currentTileIndex++;
  }

  mistakes = 0;
  isGameOver = false;

  activeKeys = generateKeyPool(secretWord);
  const targetUnit = currentItem.unit || (activeUnit !== "ALL" ? activeUnit : "");
  const uText = targetUnit && targetUnit !== "ALL" ? (formatUnitLabel(targetUnit) + " · ") : "";
  const secText = (currentItem.category || activeSection) === "ALL" ? "ทั้งหมด" : (currentItem.category || activeSection);
  document.getElementById("category-tag").textContent = uText + "หมวด: " + secText;
  document.getElementById("clue-text").innerHTML = formatClueHTML(currentItem.clue);
  document.getElementById("status").innerHTML = "";
  checkAndProcessDailyStreak();
  updateScoreBoard();
  updateDisplay();
  renderKeyboard();
  updateHintButton();
  updateHangmanSVG(0, false);
  updateSessionProgress();
  updateKeyboardDisabledStates();
  checkGameEnd();
}

// ─── Keyboard ─────────────────────────────────────────────────────────────────
function renderKeyboard() {
  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";
  let ki = 0;
  ROW_LAYOUT.forEach((count, ri) => {
    const row = document.createElement("div");
    row.className = "flex justify-center gap-2 sm:gap-2.5 w-full";
    for (let i = 0; i < count && ki < activeKeys.length; i++) {
      const letter = activeKeys[ki];
      const rot = KEY_ROTATIONS[ki % KEY_ROTATIONS.length];
      ki++;
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.id = "btn-" + letter;
      const isVowel = ["A","E","I","O","U"].includes(letter);
      const cc = isVowel ? "key-vowel" : "key-consonant";
      btn.className = "key-btn " + cc;
      btn.style.setProperty("--rot", rot + "deg");
      btn.onclick = () => handleGuess(letter);
      row.appendChild(btn);
    }
    keyboard.appendChild(row);
  });

  if (window.gsap) {
    gsap.fromTo("#keyboard .key-btn", 
      { scale: 0.75, opacity: 0 }, 
      { scale: 1, opacity: 1, stagger: 0.015, duration: 0.28, ease: "back.out(1.6)" }
    );
  }
}

function disableKeyButton(btn) {
  if (!btn) return;
  btn.disabled = true;
  btn.classList.remove("key-vowel","key-consonant");
  btn.classList.add("key-disabled");
}

function getRemainingLetterCount(letter) {
  let count = 0;
  for (let i = 0; i < secretWord.length; i++) {
    if (!revealedTiles[i] && secretWord[i] === letter) {
      count++;
    }
  }
  return count;
}

function updateKeyboardDisabledStates() {
  activeKeys.forEach(letter => {
    const btn = document.getElementById("btn-" + letter);
    if (!btn) return;
    const remaining = getRemainingLetterCount(letter);
    if (secretWord.includes(letter)) {
      if (remaining === 0) {
        disableKeyButton(btn);
      }
    }
  });
}

// ─── Sequential Guess ─────────────────────────────────────────────────────────
function handleGuess(letter) {
  if (isGameOver || currentTileIndex >= secretWord.length) return;

  const btn = document.getElementById("btn-" + letter);
  const expected = secretWord[currentTileIndex];

  if (btn && !btn.disabled) {
    btn.classList.add("key-pressed");
    setTimeout(() => btn.classList.remove("key-pressed"), 100);
  }

  if (letter === expected) {
    playSound("click");
    if (window.gsap && btn) {
      gsap.fromTo(btn, { scale: 0.85 }, { scale: 1, duration: 0.22, ease: "back.out(2)" });
    }
    const justRevealedIdx = currentTileIndex;
    revealedTiles[currentTileIndex] = true;
    currentTileIndex++;
    while (currentTileIndex < secretWord.length && revealedTiles[currentTileIndex]) {
      currentTileIndex++;
    }
    updateKeyboardDisabledStates();
    updateDisplay();
    if (window.gsap) {
      const tiles = document.querySelectorAll("#word-container > div");
      if (tiles[justRevealedIdx]) {
        gsap.fromTo(tiles[justRevealedIdx], 
          { scale: 0.2, opacity: 0, rotation: -25 }, 
          { scale: 1, opacity: 1, rotation: TILE_ROTATIONS[justRevealedIdx % TILE_ROTATIONS.length], duration: 0.32, ease: "back.out(2.4)" }
        );
      }
    }
  } else {
    mistakes++;
    playSound("wrong");
    if (btn) {
      if (window.gsap) {
        gsap.killTweensOf(btn);
        gsap.timeline()
          .to(btn, { x: -6, duration: 0.04 })
          .to(btn, { x: 6, duration: 0.04 })
          .to(btn, { x: -4, duration: 0.04 })
          .to(btn, { x: 4, duration: 0.04 })
          .to(btn, { x: 0, duration: 0.05 })
          .call(() => {
            if (getRemainingLetterCount(letter) === 0) disableKeyButton(btn);
          });
      } else {
        btn.classList.add("key-shake");
        setTimeout(() => {
          btn.classList.remove("key-shake");
          if (getRemainingLetterCount(letter) === 0) disableKeyButton(btn);
        }, 380);
      }
    }
    updateHangmanSVG(mistakes, false);
    updateDisplay();
    if (window.gsap) {
      const livesRow = document.getElementById("lives-display");
      if (livesRow) {
        gsap.fromTo(livesRow, { x: -6 }, { x: 0, duration: 0.3, ease: "elastic.out(1.5, 0.3)" });
        const usedChips = livesRow.querySelectorAll(".life-chip-used");
        const lastUsed = usedChips[usedChips.length - 1];
        if (lastUsed) {
          gsap.fromTo(lastUsed, { scale: 1.4, rotate: -15 }, { scale: 0.9, rotate: 0, duration: 0.3, ease: "back.out(2)" });
        }
      }
    }
  }

  updateHintButton();
  checkGameEnd();
}

function revealLetter() {
  if (isGameOver || currentTileIndex >= secretWord.length) return;
  if (getRevealedCount() >= getMaxRevealedAllowed()) return;

  const justRevealedIdx = currentTileIndex;
  revealedTiles[currentTileIndex] = true;
  playSound("reveal");
  currentTileIndex++;
  while (currentTileIndex < secretWord.length && revealedTiles[currentTileIndex]) {
    currentTileIndex++;
  }

  updateKeyboardDisabledStates();
  updateDisplay();
  if (window.gsap) {
    const tiles = document.querySelectorAll("#word-container > div");
    if (tiles[justRevealedIdx]) {
      gsap.fromTo(tiles[justRevealedIdx], 
        { scale: 0.2, opacity: 0, rotation: -25 }, 
        { scale: 1, opacity: 1, rotation: TILE_ROTATIONS[justRevealedIdx % TILE_ROTATIONS.length], duration: 0.32, ease: "back.out(2.4)" }
      );
    }
  }
  updateHintButton();
  checkGameEnd();
}

function updateHintButton() {
  const btn = document.getElementById("hint-btn");
  const badge = document.getElementById("hint-count-badge");
  const rem = getMaxRevealedAllowed() - getRevealedCount();
  if (isGameOver || rem <= 0 || currentTileIndex >= secretWord.length) {
    btn.disabled = true;
    if (badge) badge.style.display = 'none';
  } else {
    btn.disabled = false;
    if (badge) {
      badge.style.display = 'flex';
      badge.textContent = rem;
    }
  }
}

function getMaxRevealedAllowed() { return Math.min(secretWord.length-1, Math.max(1, Math.floor(secretWord.length*0.8))); }
function getRevealedCount() { return revealedTiles.filter(Boolean).length; }

// ─── Pause Game (หยุดพัก) ───────────────────────────────────────────────────
function pauseGame() {
  saveWordProgress();
  saveCategoryProgress();
  syncScoreToGAS();
  goToHome();
  showToast("⏸️ บันทึกความคืบหน้าเรียบร้อยแล้ว พักผ่อนได้เลย!", "info", 3000);
}

// ─── Skip ─────────────────────────────────────────────────────────────────────
function skipWord() {
  if (isGameOver) { initGame(); return; }
  isGameOver = true;
  sessionWordsPlayed++;
  const srsResult = updateWordSRS(secretWord, false);
  checkAndProcessDailyStreak();
  updateScoreBoard();
  syncScoreToGAS();
  playSound("wrong");
  updateHangmanSVG(MAX_MISTAKES, true);
  logActivityToGAS({ word: secretWord, isWon: false, mistakes, score, streak, maxStreak, box: srsResult.box, nextReview: srsResult.nextReview, action: "skip", category: (currentItem && currentItem.category) || activeSection });
  document.getElementById("status").innerHTML = '<span class="stamp-banner stamp-neutral"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>ข้ามคำ! (Box ' + srsResult.box + ' · ทบทวนใน 1 วัน) คำตอบคือ ' + secretWord + '</span>';
  updateDisplay(true);
  updateSessionProgress();

  const pool = getFilteredWords();
  const playedThisSession = getPlayedWords(activeSection);
  const roundComplete = playedThisSession.length >= pool.length;

  if (roundComplete || (sessionWordsPlayed > 0 && sessionWordsPlayed % 5 === 0)) {
    setTimeout(showSessionSummary, 1800);
  } else {
    setTimeout(() => {
      if (isGameOver) initGame();
    }, 1600);
  }
}

// ─── Lives (Balloons) ──────────────────────────────────────────────────────────
const BALLOON_COLOR = "#d9401e";
const BALLOON_SVG = (color) => `<svg class="w-6 h-6 animate-pulse" style="animation-duration: 2s; transform-origin: bottom center;" viewBox="0 0 24 24" fill="${color}" stroke="#26221F" stroke-width="2"><path d="M12 2C9 2 7 4.5 7 8c0 3.5 2 6.5 5 10l-1.5 4h3l-1.5-4c3-3.5 5-6.5 5-10 0-3.5-2-6-5-6z"/></svg>`;
const POP_SVG = `<svg class="w-6 h-6 text-gray-400 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12v.01M6 6v.01M18 6v.01M6 18v.01M18 18v.01"/></svg>`; // simple particle pop

function renderLivesChips() {
  return Array.from({length: MAX_MISTAKES}, (_, i) => {
    const isPopped = i < mistakes; // Note: mistakes fill up from 0 to MAX_MISTAKES
    // We want the balloons to pop from right to left?
    // Actually mistakes=1 means i=0 is popped. Let's just pop left to right.
    const content = isPopped ? POP_SVG : BALLOON_SVG(BALLOON_COLOR);
    const classes = isPopped ? "life-chip life-chip-used scale-75" : "life-chip hover:-translate-y-1 transition-transform";
    return `<span class="${classes}">${content}</span>`;
  }).join("");
}

// ─── Display ──────────────────────────────────────────────────────────────────
function updateDisplay(revealAll) {
  const container = document.getElementById("word-container");
  container.innerHTML = "";
  const wl = secretWord.length;
  const fs = wl > 10 ? "text-lg sm:text-xl" : wl > 7 ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl";

  secretWord.split("").forEach((letter, idx) => {
    const slot = document.createElement("div");
    const base = "flex-1 min-w-0 max-w-[52px] aspect-[4/5] rounded-[6px] flex items-center justify-center font-display font-extrabold " + fs;

    if (revealedTiles[idx]) {
      slot.textContent = letter;
      slot.style.setProperty("--rot", TILE_ROTATIONS[idx % TILE_ROTATIONS.length] + "deg");
      slot.style.background = TILE_COLORS[idx % TILE_COLORS.length];
      slot.className = base + " tile-filled";
    } else if (revealAll) {
      slot.textContent = letter;
      slot.style.setProperty("--rot", TILE_ROTATIONS[idx % TILE_ROTATIONS.length] + "deg");
      slot.className = base + " tile-revealed-miss";
    } else if (idx === currentTileIndex) {
      slot.textContent = "?";
      slot.className = base + " tile-active-target";
    } else {
      slot.textContent = "";
      slot.className = base + " tile-empty";
    }
    container.appendChild(slot);
  });
  document.getElementById("lives-display").innerHTML = '<span class="lives-label">ชีวิต</span><span class="life-chips">' + renderLivesChips() + '</span>';
}

// ─── Game End ─────────────────────────────────────────────────────────────────
function checkGameEnd() {
  const isWon = revealedTiles.every(Boolean) || currentTileIndex >= secretWord.length;
  const isLost = mistakes >= MAX_MISTAKES;
  if (!isWon && !isLost) return;

  isGameOver = true;
  sessionWordsPlayed++;
  document.querySelectorAll("#keyboard button").forEach(b => disableKeyButton(b));
  document.getElementById("hint-btn").disabled = true;

  if (isWon) {
    const pts = Math.max(10, 20 - mistakes * 2);
    score += pts;
    sessionWordsWon++;
    const srsResult = updateWordSRS(secretWord, true);
    checkAndProcessDailyStreak();
    updateScoreBoard();
    playSound("stamp");
    setTimeout(() => playSound("win"), 120);
    speakCurrentWord();
    triggerConfetti();
    updateHangmanSVG(mistakes, false);
    logActivityToGAS({ word: secretWord, isWon: true, mistakes, score, streak, maxStreak, box: srsResult.box, nextReview: srsResult.nextReview, action: "win", category: (currentItem && currentItem.category) || activeSection });
    
    const stampLabel = srsResult.box >= 4 ? "MASTERED" : streak >= 3 ? "HOT STREAK" : "CORRECT! ✓";
    const stampColorClass = srsResult.box >= 4 ? "stamp-ink-gold" : streak >= 3 ? "stamp-ink-red" : "stamp-ink-green";
    const randRot = (Math.random() * 8 - 4).toFixed(1);
    
    document.getElementById("status").innerHTML = '<div class="rubber-stamp ' + stampColorClass + ' stamp-slam-anim" style="--rot:' + randRot + 'deg"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>' + stampLabel + ' (+' + pts + ' · Box ' + srsResult.box + ')</span></div>';
    
    if (window.gsap) {
      gsap.fromTo("#score-val", { scale: 1.5, color: "#2E7D32" }, { scale: 1, color: "inherit", duration: 0.4, ease: "back.out(2)" });
      gsap.fromTo("#streak-val", { scale: 1.5, color: "#E65100" }, { scale: 1, color: "inherit", duration: 0.4, ease: "back.out(2)" });
    }

    updateSessionProgress();
    const pool = getFilteredWords();
    const playedThisSession = getPlayedWords(activeSection);
    const roundComplete = playedThisSession.length >= pool.length;

    if (roundComplete || (sessionWordsPlayed > 0 && sessionWordsPlayed % 5 === 0)) {
      setTimeout(showSessionSummary, 1800);
    } else {
      setTimeout(() => {
        if (isGameOver) initGame();
      }, 1600);
    }
  } else {
    const srsResult = updateWordSRS(secretWord, false);
    checkAndProcessDailyStreak();
    updateScoreBoard();
    syncScoreToGAS();
    playSound("stamp");
    setTimeout(() => playSound("lose"), 120);
    speakCurrentWord();
    updateHangmanSVG(MAX_MISTAKES, true);
    updateDisplay(true);
    logActivityToGAS({ word: secretWord, isWon: false, mistakes, score, streak, maxStreak, box: srsResult.box, nextReview: srsResult.nextReview, action: "lose", category: (currentItem && currentItem.category) || activeSection });
    
    const randRot = (Math.random() * 8 - 4).toFixed(1);
    document.getElementById("status").innerHTML = '<div class="rubber-stamp stamp-ink-red stamp-slam-anim" style="--rot:' + randRot + 'deg"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><span>OUT OF LIVES! (Box ' + srsResult.box + ') — ' + secretWord + '</span></div>';
    if (window.gsap) {
      const stamp = document.querySelector("#status .stamp-banner");
      if (stamp) {
        gsap.fromTo(stamp, 
          { scale: 2.2, opacity: 0, rotate: -10, y: -20 }, 
          { scale: 1, opacity: 1, rotate: -2, y: 0, duration: 0.45, ease: "bounce.out" }
        );
      }
    }

    updateSessionProgress();
    const pool = getFilteredWords();
    const playedThisSession = getPlayedWords(activeSection);
    const roundComplete = playedThisSession.length >= pool.length;

    if (roundComplete || (sessionWordsPlayed > 0 && sessionWordsPlayed % 5 === 0)) {
      setTimeout(showSessionSummary, 1800);
    } else {
      setTimeout(() => {
        if (isGameOver) initGame();
      }, 1800);
    }
  }
}

// ─── Session Summary ──────────────────────────────────────────────────────────
function showSessionSummary() {
  const modal = document.getElementById("session-summary-modal");
  if (!modal) return;
  document.getElementById("ss-words-played").textContent = sessionWordsPlayed;
  document.getElementById("ss-words-won").textContent = sessionWordsWon;
  document.getElementById("ss-score").textContent = score;
  document.getElementById("ss-streak").textContent = streak;
  document.getElementById("ss-mastered").textContent = masteredWords.length;
  const totalWordsEl = document.getElementById("ss-total-words");
  if (totalWordsEl) totalWordsEl.textContent = WORD_DATABASE.length;
  openModalWithGSAP("session-summary-modal");
}
function closeSessionSummary() {
  closeModalWithGSAP("session-summary-modal", () => initGame());
}
function finishSessionAndGoHome() {
  closeModalWithGSAP("session-summary-modal", () => {
    goToHome();
  });
}

// ─── Telemetry ────────────────────────────────────────────────────────────────
async function logActivityToGAS(payload) {
  if (!navigator.onLine) return;
  const wordSRS = wordProgress[payload.word] || {};
  const data = JSON.stringify({
    userAction: payload.action || (payload.isWon ? "win" : "lose"),
    userEmail: userEmail || (currentUser && currentUser.email) || "anonymous",
    userName: userName || (currentUser && currentUser.name) || "ผู้เรียนทั่วไป",
    word: payload.word || "",
    category: payload.category || (currentItem && currentItem.category) || activeSection || "",
    isWon: payload.isWon,
    mistakes: payload.mistakes !== undefined ? payload.mistakes : mistakes,
    score: payload.score !== undefined ? payload.score : score,
    streak: payload.streak !== undefined ? payload.streak : streak,
    maxStreak: payload.maxStreak !== undefined ? payload.maxStreak : maxStreak,
    box: payload.box !== undefined ? payload.box : (wordSRS.box !== undefined ? wordSRS.box : ""),
    nextReview: payload.nextReview || wordSRS.nextReview || "",
    timestamp: new Date().toISOString()
  });
  try { fetch(GAS_BASE + "?action=logActivity&data=" + encodeURIComponent(data)).catch(() => {}); } catch(e) {}
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function showSkeleton() {
  const el = document.getElementById("skeleton-overlay");
  if (el) { el.classList.remove("hidden"); el.style.opacity = "1"; }
}
function hideSkeleton() {
  const el = document.getElementById("skeleton-overlay");
  if (el) {
    el.style.opacity = "0";
    setTimeout(() => el.classList.add("hidden"), 300);
  }
}

// ─── Dynamic Category Styling & Icons ─────────────────────────────────────────
const CATEGORY_COLORS = ["var(--yellow)", "var(--blue)", "var(--green)", "var(--purple)", "var(--coral)", "var(--pink)"];

function getCategoryIconSVG(cat) {
  const c = (cat || "").toLowerCase();
  if (c === "all" || c === "ทั้งหมด") {
    return '<svg class="w-5 h-5 inline-block fill-yellow-400 stroke-[#26221F]" viewBox="0 0 24 24" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  if (c.includes("traveler") || c.includes("person") || c.includes("people") || c.includes("human")) {
    return '<svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 2v-2h8v2"/></svg>';
  }
  if (c.includes("skill") || c.includes("direct") || c.includes("map") || c.includes("place") || c.includes("travel")) {
    return '<svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>';
  }
  if (c.includes("verb") || c.includes("idiom") || c.includes("phrase") || c.includes("word") || c.includes("grammar") || c.includes("talk")) {
    return '<svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  }
  if (c.includes("food") || c.includes("drink") || c.includes("cook") || c.includes("fruit")) {
    return '<svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>';
  }
  if (c.includes("tech") || c.includes("digital") || c.includes("app") || c.includes("code") || c.includes("device")) {
    return '<svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
  }
  return '<svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
}

function getCategorySubtitle(cat, count) {
  const c = (cat || "").toLowerCase();
  if (c === "all") return count + " คำศัพท์ครบทุกหมวดหมู่ในเล่ม";
  if (c.includes("traveler")) return count + " คำศัพท์เกี่ยวกับประเภทผู้เดินทาง";
  if (c.includes("skill")) return count + " คำศัพท์เกี่ยวกับการเดินทางและทิศทาง";
  if (c.includes("multi-word") || c.includes("verb")) return count + " คำกริยาวลีที่ใช้บ่อย";
  return count + " คำศัพท์ในหมวดหมู่นี้";
}

function formatUnitLabel(unit) {
  if (!unit || unit === "ALL") return "ทุกบทเรียน";
  const str = String(unit).trim().replace(/^(unit\s*)+/i, "");
  return "Unit " + str;
}

function getUnitIconSVG(unit) {
  if (unit === "ALL") {
    return '<svg class="w-5 h-5 inline-block fill-yellow-400 stroke-[#26221F]" viewBox="0 0 24 24" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  return '<svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
}

function renderUnitModalList() {
  const container = document.getElementById("unit-modal-list");
  if (!container) return;
  container.innerHTML = "";

  const units = Array.from(new Set(WORD_DATABASE.map(i => String(i.unit || "").trim()).filter(Boolean)));
  units.sort((a, b) => {
    const na = parseInt(a.replace(/\D/g, ""), 10);
    const nb = parseInt(b.replace(/\D/g, ""), 10);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return a.localeCompare(b);
  });

  const allList = [{ name: "ALL", label: "ทุกบทเรียน (All Units)", count: WORD_DATABASE.length, sub: "รวมคำศัพท์ครบทุกบทเรียนในระบบ" }];
  units.forEach(u => {
    const cnt = WORD_DATABASE.filter(i => String(i.unit || "").trim() === u).length;
    const uLabel = formatUnitLabel(u);
    allList.push({ name: u, label: uLabel, count: cnt, sub: cnt + " คำศัพท์ในบทเรียนนี้" });
  });

  allList.forEach((unitObj, idx) => {
    const btn = document.createElement("button");
    btn.className = "category-card";
    
    btn.onclick = () => selectUnit(unitObj.name);

    btn.innerHTML = 
      '<div class="flex items-center justify-between w-full">' +
        '<div class="flex items-center gap-2 font-extrabold text-base text-[#26221F]">' +
          getUnitIconSVG(unitObj.name) +
          '<span>' + unitObj.label + '</span>' +
        '</div>' +
        '<span class="text-xs font-black px-2 py-0.5 bg-[#EBDCB9] border border-[#26221F] rounded-md shrink-0 shadow-[1px_1px_0_#26221F]">' + unitObj.count + ' คำ</span>' +
      '</div>' +
      '<span class="text-xs opacity-75 font-bold mt-1 text-[#26221F]">' + unitObj.sub + '</span>';

    container.appendChild(btn);
  });
}

function renderCategoryModalList() {
  const container = document.getElementById("category-modal-list");
  if (!container) return;
  container.innerHTML = "";

  const uLabel = formatUnitLabel(activeUnit);
  const titleEl = document.getElementById("category-modal-title");
  if (titleEl) {
    titleEl.textContent = activeUnit === "ALL" ? "เลือกหมวดหมู่คำศัพท์" : ("เลือกหมวดหมู่ (" + uLabel + ")");
  }
  const subEl = document.getElementById("category-modal-subtitle");
  if (subEl) {
    subEl.textContent = activeUnit === "ALL" ? "คลิกเลือกหมวดหมู่ที่ต้องการฝึกฝนเพื่อเริ่มเล่นเกม" : ("คำศัพท์เฉพาะใน " + uLabel);
  }

  const unitPool = activeUnit === "ALL" ? WORD_DATABASE : WORD_DATABASE.filter(i => String(i.unit || "").trim() === String(activeUnit).trim());
  const categories = Array.from(new Set(unitPool.map(i => i.category).filter(Boolean)));
  
  const allLabel = activeUnit === "ALL" ? "ทั้งหมด (All Words)" : ("ทั้งหมดใน " + uLabel + " (All)");
  const allSub = activeUnit === "ALL" ? (WORD_DATABASE.length + " คำศัพท์ครบทุกหมวดหมู่ในเล่ม") : (unitPool.length + " คำศัพท์ใน " + uLabel);
  
  const allList = [{ name: "ALL", label: allLabel, count: unitPool.length, customSub: allSub }];
  categories.forEach(cat => {
    const cnt = unitPool.filter(i => i.category === cat).length;
    allList.push({ name: cat, label: cat, count: cnt });
  });

  allList.forEach((catObj, idx) => {
    const btn = document.createElement("button");
    btn.className = "category-card";
    
    btn.onclick = () => selectCategoryAndPlay(catObj.name);

    btn.innerHTML = 
      '<div class="flex items-center justify-between w-full">' +
        '<div class="flex items-center gap-2 font-extrabold text-base text-[#26221F]">' +
          getCategoryIconSVG(catObj.name) +
          '<span>' + catObj.label + '</span>' +
        '</div>' +
        '<span class="text-xs font-black px-2 py-0.5 bg-[#EBDCB9] border border-[#26221F] rounded-md shrink-0 shadow-[1px_1px_0_#26221F]">' + catObj.count + ' คำ</span>' +
      '</div>' +
      '<span class="text-xs opacity-75 font-bold mt-1 text-[#26221F]">' + (catObj.customSub || getCategorySubtitle(catObj.name, catObj.count)) + '</span>';

    container.appendChild(btn);
  });
}

// ─── Online Vocab ─────────────────────────────────────────────────────────────
async function loadOnlineVocab() {
  showSkeleton();
  let updated = false;

  try {
    const res = await fetchWithTimeout(GAS_BASE + "?action=getVocab&t=" + Date.now());
    if (res.ok) {
      const json = await res.json();
      if (json.status === "success" && Array.isArray(json.data) && json.data.length > 0) {
        const mapped = json.data.map(item => {
          const rawWord = item.vocabulary || item.word || item.vocab || item["คำศัพท์"] || "";
          const word = rawWord.toUpperCase().replace(/[^A-Z]/g, "");
          const pos = item["part of speech"] || item.partofspeech || item.pos || item["ชนิดของคำ"] || "";
          const meaning = item.meaning || item.clue || item["ความหมาย"] || "";
          let clue = meaning;
          if (pos && !meaning.includes("(")) clue = "(" + pos.trim() + ") " + meaning;
          const category = item.section || item.category || item.group || item["หมวดหมู่"] || "หนังสือคำศัพท์";
          const rawUnit = String(item.unit || item.Unit || item["บทเรียน"] || item["ยูนิต"] || "5").trim();
          const unit = rawUnit.replace(/^(unit\s*)+/i, "").trim() || "5";
          return { word, clue, category, unit };
        }).filter(item => item.word.length >= 3);

        if (mapped.length > 0) {
          WORD_DATABASE = mapped;
          localStorage.setItem("hangman_cached_vocab", JSON.stringify(WORD_DATABASE));
          updated = true;
        }
      }
    }
  } catch(e) {}

  if (!updated) {
    try {
      const res = await fetchWithTimeout(SPREADSHEET_CSV_URL + "&_nocache=" + Date.now());
      if (res.ok) {
        const csv = await res.text();
        const parsed = parseCSVVocab(csv);
        if (parsed.length > 0) {
          WORD_DATABASE = parsed;
          localStorage.setItem("hangman_cached_vocab", JSON.stringify(WORD_DATABASE));
          updated = true;
        }
      }
    } catch(e) {}
  }

  renderUnitModalList();
  renderCategoryModalList();
  renderSectionTabs();
  updateScoreBoard();
  const vaultModal = document.getElementById("vault-modal");
  if (vaultModal && !vaultModal.classList.contains("hidden")) renderVaultList();
  initGame();
  hideSkeleton();
}

function parseCSVVocab(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length <= 1) return [];
  const headers = lines[0].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(c => c.replace(/^"|"$/g,"").trim().toLowerCase());
  const vocabIdx = headers.findIndex(h => h.includes("vocab") || h.includes("word") || h.includes("คำ"));
  const posIdx = headers.findIndex(h => h.includes("pos") || h.includes("part") || h.includes("ชนิด"));
  const meaningIdx = headers.findIndex(h => h.includes("meaning") || h.includes("clue") || h.includes("ความหมาย"));
  const sectionIdx = headers.findIndex(h => h.includes("section") || h.includes("cat") || h.includes("group") || h.includes("หมวด"));
  const unitIdx = headers.findIndex(h => h === "unit" || h.includes("unit") || h.includes("บท") || h.includes("ยูนิต"));

  return lines.slice(1).reduce((acc, line) => {
    if (!line.trim()) return acc;
    const cols = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(c => c.replace(/^"|"$/g,"").trim());
    const rawWord = cols[vocabIdx >= 0 ? vocabIdx : 1] || "";
    const w = rawWord.toUpperCase().replace(/[^A-Z]/g,"");
    const pos = cols[posIdx >= 0 ? posIdx : 2] || "";
    const meaning = cols[meaningIdx >= 0 ? meaningIdx : 3] || "";
    const section = cols[sectionIdx >= 0 ? sectionIdx : 4] || "หนังสือคำศัพท์";
    const rawUnit = (cols[unitIdx >= 0 ? unitIdx : 5] || "5").trim();
    const unit = rawUnit.replace(/^(unit\s*)+/i, "").trim() || "5";
    let clue = meaning;
    if (pos && !meaning.includes("(")) clue = "(" + pos.trim() + ") " + meaning;
    if (w.length >= 3) acc.push({ word: w, clue, category: section, unit });
    return acc;
  }, []);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function generateKeyPool(word) {
  const wl = Array.from(new Set(word.split("")));
  const others = shuffleArray(ALPHABET.filter(l => !wl.includes(l)));
  return shuffleArray([...wl, ...others.slice(0, Math.max(0, TOTAL_KEYS - wl.length))]);
}

// ─── Modals (GSAP Animated) ───────────────────────────────────────────────────
function openModalWithGSAP(modalId) {
  const modal = typeof modalId === "string" ? document.getElementById(modalId) : modalId;
  if (!modal) return;
  modal.classList.remove("hidden");
  const paper = modal.querySelector(".modal-paper");
  if (window.gsap && paper) {
    gsap.killTweensOf([modal, paper]);
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out" });
    gsap.fromTo(paper, 
      { scale: 0.84, opacity: 0, rotation: -3.5, y: 24 }, 
      { scale: 1, opacity: 1, rotation: -0.5, y: 0, duration: 0.38, ease: "back.out(1.7)" }
    );
  }
}

function closeModalWithGSAP(modalId, callback) {
  const modal = typeof modalId === "string" ? document.getElementById(modalId) : modalId;
  if (!modal) { if (callback) callback(); return; }
  const paper = modal.querySelector(".modal-paper");
  if (window.gsap && paper && !modal.classList.contains("hidden")) {
    gsap.killTweensOf([modal, paper]);
    gsap.to(paper, { scale: 0.88, opacity: 0, y: 12, duration: 0.18, ease: "power2.in" });
    gsap.to(modal, { 
      opacity: 0, 
      duration: 0.18, 
      ease: "power2.in", 
      onComplete: () => {
        modal.classList.add("hidden");
        gsap.set(modal, { opacity: 1 });
        gsap.set(paper, { opacity: 1, scale: 1, y: 0, rotation: -0.5 });
        if (callback) callback();
      }
    });
  } else {
    modal.classList.add("hidden");
    if (callback) callback();
  }
}

function openProfileModal() {
  document.getElementById("profile-name-input").value = userName;
  document.getElementById("profile-email-input").value = userEmail;
  document.getElementById("modal-streak-count").textContent = streak;
  const maxEl = document.getElementById("modal-max-streak-count");
  if (maxEl) maxEl.textContent = maxStreak;
  document.getElementById("modal-score-count").textContent = score;
  document.getElementById("modal-mastered-count").textContent = masteredWords.length;
  const totEl = document.getElementById("modal-total-vault-count");
  if (totEl) totEl.textContent = WORD_DATABASE.length;
  updateScoreBoard();
  openModalWithGSAP("profile-modal");
}
function closeProfileModal() { closeModalWithGSAP("profile-modal"); }
function saveProfile() {
  const n = document.getElementById("profile-name-input").value.trim();
  const e = document.getElementById("profile-email-input").value.trim();
  if (n) userName = n;
  if (e) userEmail = e;
  updateScoreBoard();
  syncScoreToGAS();
  closeProfileModal();
}

function openLeaderboardModal() { fetchLeaderboardData(); openModalWithGSAP("leaderboard-modal"); }
function closeLeaderboardModal() { closeModalWithGSAP("leaderboard-modal"); }

async function fetchLeaderboardData() {
  const c = document.getElementById("leaderboard-list");
  c.innerHTML = '<p class="text-xs opacity-60 text-center py-4">⏳ กำลังโหลดอันดับ...</p>';
  let players = [];
  try {
    if (navigator.onLine) {
      const res = await fetchWithTimeout(GAS_BASE + "?action=getLeaderboard&t=" + Date.now());
      if (res.ok) { const j = await res.json(); if (j.status==="success" && Array.isArray(j.data)) players = j.data; }
    }
  } catch(e) {}
  if (!players.length) {
    players = [{ name: userName, score, streak: maxStreak, isCurrent: true },
      { name: "คุณครูผู้สอน", score: 180, streak: 12 },
      { name: "นักเรียนดีเด่น", score: 140, streak: 9 },
      { name: "คุณานนท์ 2/5", score: 90, streak: 5 }];
  } else if (!players.some(p => p.name===userName||p.email===(userEmail||"").toLowerCase()) && score>0) {
    players.push({ name: userName, score, streak: maxStreak, isCurrent: true });
  }
  players.sort((a,b) => (b.score||0)-(a.score||0));
  renderLeaderboardRows(players);
}

function renderLeaderboardRows(players) {
  const c = document.getElementById("leaderboard-list");
  c.innerHTML = "";
  players.forEach((p, idx) => {
    const isSelf = p.name===userName || (userEmail && p.email===userEmail.toLowerCase()) || p.isCurrent;
    const rankNum = idx + 1;
    const rankBadgeClass = rankNum === 1 ? "bg-yellow-300 border-yellow-700 text-yellow-950" : rankNum === 2 ? "bg-slate-200 border-slate-600 text-slate-900" : rankNum === 3 ? "bg-amber-600 border-amber-800 text-white" : "bg-white/80 border-[#181614] text-[#181614]";
    const row = document.createElement("div");
    row.className = "p-2.5 border-2 border-[#181614] rounded-md flex justify-between items-center gap-2 text-xs font-bold " + (isSelf ? "bg-[#FFC531] shadow-[2px_2px_0_#181614]" : "bg-white/60");
    row.innerHTML = '<div class="flex items-center gap-2 min-w-0 flex-1 text-left"><span class="text-xs font-black px-1.5 py-0.5 border rounded shrink-0 ' + rankBadgeClass + '">#' + rankNum + '</span><div class="flex flex-col min-w-0 flex-1"><span class="text-sm font-bold truncate">'+p.name+(isSelf?' <span class="text-[10px] bg-[#181614] text-white px-1 rounded inline-block">(คุณ)</span>':'')+'</span><span class="text-[10px] opacity-70">Streak '+(p.streak||1)+' วัน</span></div></div><div class="text-right shrink-0"><span class="text-sm font-black">'+(p.score||0)+'</span><span class="text-[10px] block opacity-70">PTS</span></div>';
    c.appendChild(row);
  });
}

function formatVaultClueHTML(clueString) {
  if (!clueString) return "";
  const match = clueString.match(/^\(([^)]+(?:\([^)]+\))?)\)\s*(.*)$/);
  if (match) {
    const pos = match[1];
    const meaning = match[2];
    return '<div class="flex items-center gap-1.5 flex-wrap mt-1"><span class="text-[10px] font-bold px-1.5 py-0.5 bg-yellow-200 border border-[#26221F] rounded text-[#26221F] shadow-[1px_1px_0_#26221F]">' + pos + '</span><span class="text-xs sm:text-sm font-bold text-[#26221F]">' + meaning + '</span></div>';
  }
  return '<div class="mt-1 text-xs sm:text-sm font-bold text-[#26221F]">' + clueString + '</div>';
}

function openVaultModal() { renderVaultList(); openModalWithGSAP("vault-modal"); }
function closeVaultModal() { closeModalWithGSAP("vault-modal"); }
function renderVaultList() {
  const q = (document.getElementById("vault-search").value||"").toLowerCase();
  const c = document.getElementById("vault-list");
  const today = todayString();
  const filtered = WORD_DATABASE.filter(i => i.word.toLowerCase().includes(q)||i.clue.toLowerCase().includes(q));
  c.innerHTML = filtered.length ? "" : '<p class="text-xs opacity-60 text-center py-4">ไม่พบคำศัพท์ที่ค้นหา</p>';
  const starSVG = '<svg class="w-3.5 h-3.5 fill-yellow-400 stroke-[#181614] inline-block shrink-0" viewBox="0 0 24 24" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  
  filtered.forEach(item => {
    const srs = getWordSRS(item.word);
    const boxNum = srs.box || 0;
    const m = boxNum >= 2;
    
    let boxBadge = '';
    if (boxNum === 0) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-gray-100 border border-gray-400 rounded text-gray-700">Box 0</span>';
    else if (boxNum === 1) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-red-100 border border-red-400 rounded text-red-800">Box 1 (1 วัน)</span>';
    else if (boxNum === 2) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-yellow-100 border border-yellow-400 rounded text-yellow-800">Box 2 (3 วัน)</span>';
    else if (boxNum === 3) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-blue-100 border border-blue-400 rounded text-blue-800">Box 3 (7 วัน)</span>';
    else if (boxNum === 4) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-green-100 border border-green-400 rounded text-green-800">Box 4 (14 วัน)</span>';

    let reviewBadge = '';
    if (boxNum > 0) {
      if (srs.nextReview <= today) {
        reviewBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-amber-200 border border-amber-500 rounded text-amber-950">ถึงกำหนดทบทวน</span>';
      } else {
        reviewBadge = '<span class="text-[9px] font-bold opacity-60">ทบทวน ' + srs.nextReview.slice(5) + '</span>';
      }
    }

    const unitBadge = item.unit ? '<span class="text-[10px] font-black opacity-90 px-1.5 py-0.5 bg-blue-100 border border-[#181614] rounded-md">' + formatUnitLabel(item.unit) + '</span>' : '';
    const card = document.createElement("div");
    card.className = "p-3 border-2 border-[#181614] rounded-lg bg-white/75 flex justify-between items-center gap-3 text-xs shadow-[2px_2px_0_#181614]";
    card.innerHTML = '<div class="flex-1 min-w-0 text-left"><div class="flex items-center gap-1.5 flex-wrap font-bold text-sm text-[#181614]"><span class="font-black tracking-wide text-base">' + item.word + '</span>' + (m ? starSVG : '') + unitBadge + '<span class="text-[10px] font-bold opacity-80 px-1.5 py-0.5 bg-yellow-200 border border-[#181614] rounded-md">' + item.category + '</span>' + boxBadge + reviewBadge + '</div>' + formatVaultClueHTML(item.clue) + '</div><button onclick="speakText(\'' + item.word + '\')" class="audio-btn shrink-0" title="ฟังเสียงอ่าน"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></button>';
    c.appendChild(card);
  });
}

// ─── Auth System ──────────────────────────────────────────────────────────────
let currentUser = JSON.parse(localStorage.getItem("hangman_session_user") || "null");

function checkAuthSession() {
  const overlay = document.getElementById("login-overlay");
  if (!currentUser || !currentUser.email) {
    openModalWithGSAP("login-overlay");
  } else {
    closeModalWithGSAP("login-overlay");
    userName = currentUser.name || userName;
    userEmail = currentUser.email || userEmail;
    score = currentUser.score !== undefined ? Number(currentUser.score) : score;
    streak = currentUser.streak !== undefined ? Number(currentUser.streak) : streak;
    maxStreak = currentUser.maxStreak !== undefined ? Number(currentUser.maxStreak) : (currentUser.streak !== undefined ? Number(currentUser.streak) : maxStreak);
    if (Array.isArray(currentUser.masteredWords)) masteredWords = currentUser.masteredWords;
    if (currentUser.playedProgress && typeof currentUser.playedProgress === "object") {
      wordProgress = currentUser.playedProgress;
      localStorage.setItem("hangman_word_progress", JSON.stringify(wordProgress));
    }
    if (currentUser.categoryProgress && typeof currentUser.categoryProgress === "object") {
      playedWordsPerCategory = currentUser.categoryProgress;
    }
    updateScoreBoard();
  }
}

function switchAuthTab(tab) {
  const lf = document.getElementById("login-form");
  const rf = document.getElementById("register-form");
  const tl = document.getElementById("auth-tab-login");
  const tr = document.getElementById("auth-tab-register");
  if (tab === "login") { lf.classList.remove("hidden"); rf.classList.add("hidden"); tl.classList.add("active"); tr.classList.remove("active"); }
  else { lf.classList.add("hidden"); rf.classList.remove("hidden"); tl.classList.remove("active"); tr.classList.add("active"); }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("login-email-input").value.trim();
  const pin = document.getElementById("login-pin-input").value.trim();
  const errEl = document.getElementById("login-error-msg");
  const btn = e.target.querySelector("button[type=submit]");
  if (!email || pin.length !== 4) { errEl.textContent = "กรุณากรอกอีเมลและ PIN 4 หลักให้ถูกต้อง"; errEl.classList.remove("hidden"); return; }
  errEl.classList.add("hidden");
  if (btn) { btn.disabled = true; btn.textContent = "กำลังตรวจสอบ..."; }

  const pinHash = await hashPin(pin);
  let userRecord = null;

  try {
    const res = await fetchWithTimeout(GAS_BASE + "?action=loginUser&email=" + encodeURIComponent(email) + "&pinHash=" + encodeURIComponent(pinHash));
    if (res.ok) {
      const j = await res.json();
      if (j.status === "success" && j.user) { userRecord = j.user; }
      else if (j.status === "error") {
        errEl.textContent = j.message || "อีเมลหรือ PIN ไม่ถูกต้อง";
        errEl.classList.remove("hidden");
        if (btn) { btn.disabled = false; btn.textContent = "เข้าเรียนและโหลดสถิติ"; }
        return;
      }
    }
  } catch(err) { showToast("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ใช้ข้อมูลออฟไลน์แทน", "warning", 4000); }

  if (!userRecord) {
    const stored = JSON.parse(localStorage.getItem("hangman_registered_users") || "[]");
    const match = stored.find(u => u.email.toLowerCase() === email.toLowerCase() && (u.pinHash === pinHash || u.pin === pin));
    userRecord = match || { name: email.split("@")[0], email, pinHash, score: 0, streak: 0, maxStreak: 0, masteredWords: [], playedProgress: {} };
  }

  currentUser = userRecord;
  userName = userRecord.name || userName;
  userEmail = userRecord.email || userEmail;
  score = Number(userRecord.score) || 0;
  streak = Number(userRecord.streak) || 0;
  maxStreak = Number(userRecord.maxStreak) || Number(userRecord.streak) || 0;
  if (Array.isArray(userRecord.masteredWords)) masteredWords = userRecord.masteredWords;
  if (userRecord.playedProgress && typeof userRecord.playedProgress === "object") {
    wordProgress = userRecord.playedProgress;
    localStorage.setItem("hangman_word_progress", JSON.stringify(wordProgress));
  }

  localStorage.setItem("hangman_session_user", JSON.stringify(currentUser));
  saveCategoryProgress();
  updateScoreBoard();
  logActivityToGAS({ word: "LOGIN_ACCOUNT", isWon: true, mistakes: 0, score, streak, maxStreak, action: "login" });

  if (btn) { btn.disabled = false; btn.textContent = "เข้าเรียนและโหลดสถิติ"; }
  checkAuthSession();
  initGame();
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name-input").value.trim();
  const email = document.getElementById("reg-email-input").value.trim();
  const pin = document.getElementById("reg-pin-input").value.trim();
  const errEl = document.getElementById("reg-error-msg");
  const btn = e.target.querySelector("button[type=submit]");
  if (!name || !email || pin.length !== 4) { errEl.textContent = "กรุณากรอกชื่อ อีเมล และ PIN 4 หลักให้ครบถ้วน"; errEl.classList.remove("hidden"); return; }
  errEl.classList.add("hidden");
  if (btn) { btn.disabled = true; btn.textContent = "กำลังสร้างบัญชี..."; }

  const pinHash = await hashPin(pin);

  try {
    const res = await fetchWithTimeout(GAS_BASE + "?action=registerUser&name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&pinHash=" + encodeURIComponent(pinHash));
    if (res.ok) {
      const j = await res.json();
      if (j.status === "error" && j.message && j.message.includes("มีอีเมลนี้")) {
        errEl.textContent = j.message; errEl.classList.remove("hidden");
        if (btn) { btn.disabled = false; btn.textContent = "สร้างบัญชีและเข้าเรียน"; }
        return;
      }
    }
  } catch(err) { showToast("บันทึกออฟไลน์เท่านั้น", "warning", 4000); }

  const newUser = { name, email, pinHash, score: 0, streak: 0, maxStreak: 0, masteredWords: [], playedProgress: {} };
  const stored = JSON.parse(localStorage.getItem("hangman_registered_users") || "[]");
  const idx = stored.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx >= 0) stored[idx] = newUser; else stored.push(newUser);
  localStorage.setItem("hangman_registered_users", JSON.stringify(stored));

  currentUser = newUser;
  userName = name;
  userEmail = email;
  score = 0;
  streak = 0;
  maxStreak = 0;
  masteredWords = [];
  wordProgress = {};
  playedWordsPerCategory = {};

  localStorage.setItem("hangman_session_user", JSON.stringify(currentUser));
  localStorage.setItem("hangman_word_progress", JSON.stringify(wordProgress));
  saveCategoryProgress();
  updateScoreBoard();
  logActivityToGAS({ word: "REGISTER_ACCOUNT", isWon: true, mistakes: 0, score: 0, streak: 0, maxStreak: 0, action: "register" });

  if (btn) { btn.disabled = false; btn.textContent = "สร้างบัญชีและเข้าเรียน"; }
  showToast("ยินดีต้อนรับ " + name + "! บัญชีถูกสร้างแล้ว", "success", 3000);
  checkAuthSession();
  initGame();
}

function handleLogout() {
  localStorage.removeItem("hangman_session_user");
  currentUser = null;
  userName = "ผู้เรียนทั่วไป";
  userEmail = "";
  sessionWordsPlayed = 0;
  sessionWordsWon = 0;
  updateScoreBoard();
  // Close profile modal
  const pm = document.getElementById("profile-modal");
  if (pm) pm.classList.add("hidden");
  showToast("ออกจากระบบแล้ว", "info", 2500);
  checkAuthSession();
}

// ─── Keyboard Input & Hotkeys ──────────────────────────────────────────────────
window.addEventListener("keydown", e => {
  const activeEl = document.activeElement;
  const tag = activeEl ? activeEl.tagName.toLowerCase() : "";
  if (tag === "input" || tag === "textarea") return;

  if (e.key === "Escape") {
    // Smoothly close any open modal
    document.querySelectorAll(".modal-overlay:not(.hidden)").forEach(modal => {
      if (!modal.id.includes("login")) {
        closeModalWithGSAP(modal.id);
      }
    });
    return;
  }

  // Hotkey for hint: '?' or '1'
  if (e.key === "?" || e.key === "1") {
    const hintBtn = document.getElementById("hint-btn");
    if (hintBtn && !hintBtn.disabled) {
      revealLetter();
      return;
    }
  }

  if (isGameOver) return;
  const k = e.key.toUpperCase();
  if (/^[A-Z]$/.test(k) && activeKeys.includes(k)) {
    const btn = document.getElementById("btn-" + k);
    if (btn && !btn.disabled) {
      handleGuess(k);
    }
  }
});

// ─── Interactive Washi Tape, Pins & Paperclip Wiggles ────────────────────────
document.addEventListener("click", e => {
  const target = e.target.closest(".paperclip-deco, .tape, .washi-tape, .push-pin, .rubber-stamp");
  if (!target) return;
  playSound("tap");
  if (window.gsap) {
    gsap.killTweensOf(target);
    gsap.timeline()
      .to(target, { scale: 1.14, rotate: "+=8", duration: 0.08, ease: "power1.out" })
      .to(target, { rotate: "-=16", duration: 0.1, ease: "power1.inOut" })
      .to(target, { rotate: "+=10", duration: 0.1, ease: "power1.inOut" })
      .to(target, { scale: 1, rotate: target.style.getPropertyValue("--rot") || 0, duration: 0.18, ease: "back.out(2)" });
  }
});

// ─── Screen Navigation & Modal Controllers (moved from inline HTML) ──────────
function openRulesModal() { openModalWithGSAP('rules-modal'); }
function closeRulesModal() { closeModalWithGSAP('rules-modal'); }

function openUnitModal() {
  if (typeof renderUnitModalList === 'function') renderUnitModalList();
  openModalWithGSAP('unit-modal');
}
function closeUnitModal() { closeModalWithGSAP('unit-modal'); }

function selectUnit(unit) {
  activeUnit = unit;
  closeModalWithGSAP('unit-modal', () => { openCategoryModal(); });
}

function backToUnitModal() {
  closeModalWithGSAP('category-modal', () => { openUnitModal(); });
}

function openCategoryModal() {
  if (typeof renderCategoryModalList === 'function') renderCategoryModalList();
  openModalWithGSAP('category-modal');
}
function closeCategoryModal() { closeModalWithGSAP('category-modal'); }

function selectCategoryAndPlay(category) {
  closeModalWithGSAP('category-modal', () => {
    activeSection = category;
    renderSectionTabs();
    initGame();
    goToGame();
  });
}

function goToGame() {
  const home = document.getElementById('home-screen');
  const game = document.getElementById('game-screen');
  const isMobile = window.innerWidth < 900;
  if (window.gsap) {
    const homeWrap = home.querySelector('.paper-wrap');
    const gameWrap = game.querySelector('.paper-wrap');
    gsap.killTweensOf([homeWrap, gameWrap]);
    gsap.to(homeWrap, {
      scale: 0.95, opacity: 0, y: -12, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        home.classList.add('hidden');
        game.classList.remove('hidden');
        checkAuthSession();
        gsap.fromTo(gameWrap,
          { scale: 0.95, opacity: 0, y: 15, rotate: isMobile ? 0 : 1.2 },
          { scale: 1, opacity: 1, y: 0, rotate: isMobile ? 0 : -0.4, duration: 0.32, ease: "back.out(1.5)" }
        );
      }
    });
  } else {
    home.classList.add('hidden');
    game.classList.remove('hidden');
    checkAuthSession();
  }
}

function goToHome() {
  const home = document.getElementById('home-screen');
  const game = document.getElementById('game-screen');
  const isMobile = window.innerWidth < 900;
  if (window.gsap) {
    const homeWrap = home.querySelector('.paper-wrap');
    const gameWrap = game.querySelector('.paper-wrap');
    gsap.killTweensOf([homeWrap, gameWrap]);
    gsap.to(gameWrap, {
      scale: 0.95, opacity: 0, y: -12, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        game.classList.add('hidden');
        home.classList.remove('hidden');
        if (typeof updateScoreBoard === 'function') updateScoreBoard();
        gsap.fromTo(homeWrap,
          { scale: 0.95, opacity: 0, y: 15, rotate: isMobile ? 0 : -1.2 },
          { scale: 1, opacity: 1, y: 0, rotate: isMobile ? 0 : -0.4, duration: 0.32, ease: "back.out(1.5)" }
        );
      }
    });
  } else {
    game.classList.add('hidden');
    home.classList.remove('hidden');
  }
}

function openLeaderboardFromHome() { openLeaderboardModal(); }

// ─── Bootstrap ────────────────────────────────────────────────────────────────
renderUnitModalList();
renderCategoryModalList();
renderSectionTabs();
checkAuthSession();
initGame();
loadOnlineVocab();
if (window.gsap) {
  gsap.fromTo(".cutout-letter",
    { scale: 0.2, y: 40, opacity: 0, rotation: () => (Math.random() > 0.5 ? 20 : -20) },
    { scale: 1, y: 0, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.08, ease: "back.out(2)", clearProps: "transform,opacity" }
  );
  gsap.fromTo(".master-label",
    { scale: 0, opacity: 0, rotate: -10 },
    { scale: 1, opacity: 1, rotate: 2, duration: 0.5, delay: 0.5, ease: "back.out(2)", clearProps: "transform,opacity" }
  );
  gsap.fromTo(".home-card",
    { y: 40, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, delay: 0.4, ease: "back.out(1.5)", clearProps: "transform,opacity" }
  );
  gsap.fromTo(".brand-bar", 
    { y: -20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: "power2.out", clearProps: "transform,opacity" }
  );
}

// --- Responsive Paper Background Mockup ---
function initDynamicBackgrounds() {
  function scallopEdge(xStart, y, xEnd, bumps, amp, direction, seed) {
    var width = xEnd - xStart;
    var segW = width / bumps;
    var d = "";
    for (var i = 0; i < bumps; i++) {
      var xMid = xStart + segW * i + segW / 2;
      var xEndSeg = xStart + segW * (i + 1);
      var rnd = Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1;
      var yBump = y + direction * amp * (0.75 + rnd * 0.5);
      d += "Q " + xMid.toFixed(1) + " " + yBump.toFixed(1) + " " + xEndSeg.toFixed(1) + " " + y + " ";
    }
    return d;
  }

  function wavyRectPath(x0, yTop, x1, yBottom, bumpsTop, ampTop, bumpsBottom, ampBottom, seedA, seedB) {
    const rx = 16;
    var d = "M " + x0 + " " + (yTop + rx) + " ";
    d += "Q " + x0 + " " + yTop + " " + (x0 + rx) + " " + yTop + " ";
    d += scallopEdge(x0 + rx, yTop, x1 - rx, bumpsTop, ampTop, -1, seedA);
    d += "Q " + x1 + " " + yTop + " " + x1 + " " + (yTop + rx) + " ";
    d += "L " + x1 + " " + (yBottom - rx) + " ";
    d += "Q " + x1 + " " + yBottom + " " + (x1 - rx) + " " + yBottom + " ";
    d += scallopEdge(x1 - rx, yBottom, x0 + rx, bumpsBottom, ampBottom, 1, seedB);
    d += "Q " + x0 + " " + yBottom + " " + x0 + " " + (yBottom - rx) + " ";
    d += "Z";
    return d;
  }

  function wavyTopOnlyPath(x0, yTop, x1, yBottom, bumps, amp, seedA) {
    const rx = 16;
    var d = "M " + x0 + " " + (yTop + rx) + " ";
    d += "Q " + x0 + " " + yTop + " " + (x0 + rx) + " " + yTop + " ";
    d += scallopEdge(x0 + rx, yTop, x1 - rx, bumps, amp, -1, seedA);
    d += "Q " + x1 + " " + yTop + " " + x1 + " " + (yTop + rx) + " ";
    d += "L " + x1 + " " + (yBottom - rx) + " ";
    d += "Q " + x1 + " " + yBottom + " " + (x1 - rx) + " " + yBottom + " ";
    d += "L " + (x0 + rx) + " " + yBottom + " ";
    d += "Q " + x0 + " " + yBottom + " " + x0 + " " + (yBottom - rx) + " ";
    d += "Z";
    return d;
  }

  function drawBackgrounds() {
    const svgs = document.querySelectorAll('.dynamic-paper-bg');
    if (!svgs || !svgs.length) return;
    svgs.forEach(svg => {
      const parent = svg && svg.parentElement;
      if (!parent) return;
      const w = parent.clientWidth || 0;
      const h = parent.clientHeight || 0;
      if (!w || !h) return;

      const cx = w / 2;
      const cy = h / 2;

      const whiteD = wavyRectPath(0, 0, w, h, Math.floor(w/20), 4, Math.floor(w/20), 4, 1.7, 4.2);
      const tanD = wavyTopOnlyPath(-15, -15, w + 12, h + 15, Math.floor((w+27)/20), 5, 2.3);
      
      const bx = -30, by = -20, bw = w + 50, bh = h + 45;

      let tanLines = '';
      for (let x = -10; x < w + 10; x += 18) {
        tanLines += `<line x1="${x}" y1="-15" x2="${x}" y2="${h+15}" stroke="#4e3116" stroke-opacity="0.3" stroke-width="1"/>`;
      }

      const clipId = 'tanClip-' + Math.random().toString(36).substr(2, 9);
      const whiteClipId = 'whiteClip-' + Math.random().toString(36).substr(2, 9);

      svg.innerHTML = `
        <defs>
          <clipPath id="${clipId}"><path d="${tanD}"/></clipPath>
          <clipPath id="${whiteClipId}"><path d="${whiteD}"/></clipPath>
        </defs>
        
        <!-- BLUE CARD -->
        <g filter="url(#softShadow)" transform="rotate(1.5 ${cx} ${cy})">
          <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="24" fill="url(#cardGrad)"/>
          <rect x="${bx+12}" y="${by+12}" width="${bw-24}" height="${bh-24}" rx="14" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="2"/>
        </g>


        <!-- WHITE PAPER -->
        <g filter="url(#softShadowSmall)">
          <path fill="url(#whiteGrad)" d="${whiteD}"/>
          <g clip-path="url(#${whiteClipId})">
            <rect x="-10" y="-10" width="${w+20}" height="${h+20}" filter="url(#paperGrain)"/>
          </g>
        </g>

        <!-- PAPERCLIP -->
        <g transform="translate(-15, -15) rotate(-15 30 50)" filter="url(#clipShadow)">
          <rect x="14" y="6" width="32" height="95" rx="16" fill="none" stroke="url(#clipGrad)" stroke-width="6"/>
          <rect x="24" y="6" width="12" height="65" rx="6" fill="none" stroke="url(#clipGrad)" stroke-width="6"/>
          <rect x="15" y="7" width="30" height="35" rx="15" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.5"/>
        </g>
      `;
    });
  }

  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => drawBackgrounds());
    document.querySelectorAll('.paper-wrap').forEach(el => ro.observe(el));
  } else if (typeof window !== "undefined") {
    window.addEventListener("resize", drawBackgrounds);
  }
  drawBackgrounds();
}

if (typeof document !== "undefined") {
  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initDynamicBackgrounds);
  } else {
    initDynamicBackgrounds();
  }
}
