// ─── API Endpoints ──────────────────────────────────────────────────────────
const GAS_BASE = 'https://script.google.com/macros/s/AKfycbz7kvbxg8Mo7xEiKaGXZylXrN6BiQ8GMSrUMu2HKqB-nN7ZutuYIL0PpczYo34iA9Bc/exec';
const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1dY39PZ4YF_iN3CeueclsUA3uluZW2oolKkPSTp0Bk7c/export?format=csv&gid=1873851496';

// ─── Verified Official Vocabulary Database (48 Master Words) ────────────────
const VOCAB_SCHEMA_VERSION = "v4.0_20260826";

const MASTER_OFFICIAL_VOCAB = [
  // หมวด: Travelers (17 คำ)
  { word: "AUTHOR", clue: "(n.) ผู้แต่ง, นักเขียน", category: "Travelers", unit: "5" },
  { word: "INVOLVE", clue: "(v.) เกี่ยวข้อง, มีส่วนร่วม, รวมถึง", category: "Travelers", unit: "5" },
  { word: "STIMULATE", clue: "(v.) กระตุ้น", category: "Travelers", unit: "5" },
  { word: "DESCRIBE", clue: "(v.) บรรยาย, อธิบายพรรณนา", category: "Travelers", unit: "5" },
  { word: "ACCOMMODATION", clue: "(n.) ที่พัก, ที่พักอาศัย", category: "Travelers", unit: "5" },
  { word: "CENTURY", clue: "(n.) ศตวรรษ (100 ปี)", category: "Travelers", unit: "5" },
  { word: "VACATION", clue: "(n.) วันหยุดพักผ่อน", category: "Travelers", unit: "5" },
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

  // หมวด: Travel skills (20 คำ)
  { word: "AMBULANCE", clue: "(n.) รถพยาบาล", category: "Travel skills", unit: "5" },
  { word: "ARRIVAL", clue: "(n.) มาถึง", category: "Travel skills", unit: "5" },
  { word: "CALCULATE", clue: "(v.) คำนวณ", category: "Travel skills", unit: "5" },
  { word: "COMPASS", clue: "(n.) เข็มทิศ", category: "Travel skills", unit: "5" },
  { word: "CURRENCY", clue: "(n.) สกุลเงิน", category: "Travel skills", unit: "5" },
  { word: "DEPARTURE", clue: "(n.) ออกเดินทาง", category: "Travel skills", unit: "5" },
  { word: "DIRECTIONS", clue: "(n.) ทิศทาง", category: "Travel skills", unit: "5" },
  { word: "EMERGENCY", clue: "(n./adj.) เหตุฉุกเฉิน, ภาวะฉุกเฉิน", category: "Travel skills", unit: "5" },
  { word: "EXCHANGERATE", clue: "(comp. n) อัตราแลกเปลี่ยน", category: "Travel skills", unit: "5" },
  { word: "LOCATE", clue: "(v.) หาตำแหน่งที่ตั้ง", category: "Travel skills", unit: "5" },
  { word: "SCHEDULE", clue: "(n.) ตารางเวลา", category: "Travel skills", unit: "5" },
  { word: "OPTION", clue: "(n.) ตัวเลือก, ทางเลือก", category: "Travel skills", unit: "5" },
  { word: "FORCE", clue: "(n./v.) แรง, กำลัง / บังคับ, ผลักดัน", category: "Travel skills", unit: "5" },
  { word: "STUFF", clue: "(n./v.) สิ่งของ / ยัด, ใส่", category: "Travel skills", unit: "5" },
  { word: "MEDICAL", clue: "(adj.) ทางการแพทย์", category: "Travel skills", unit: "5" },
  { word: "POSITION", clue: "(n.) ตำแหน่ง", category: "Travel skills", unit: "5" },
  { word: "JOURNEY", clue: "(n.) การเดินทาง", category: "Travel skills", unit: "5" },
  { word: "SUCCESSFULLY", clue: "(adv.) อย่างประสบความสำเร็จ", category: "Travel skills", unit: "5" },
  { word: "CHOICE", clue: "(n.) ทางเลือก, การตัดสินใจเลือก", category: "Travel skills", unit: "5" },
  { word: "PERMANENTLY", clue: "(adv.) อย่างถาวร", category: "Travel skills", unit: "5" },

  // หมวด: Multi-word verb (11 คำ)
  { word: "DRIVEOUT", clue: "(phr v.) ขับไล่, บีบให้ออกไป", category: "Multi-word verb", unit: "5" },
  { word: "ENDUP", clue: "(phr v.) ลงเอยด้วย, จบลงที่", category: "Multi-word verb", unit: "5" },
  { word: "GIVEAWAY", clue: "(phr v.) แจกฟรี, ยกให้ผู้อื่น", category: "Multi-word verb", unit: "5" },
  { word: "GOAWAY", clue: "(phr v.) ไปให้พ้น, ออกไปข้างนอก, หายไป", category: "Multi-word verb", unit: "5" },
  { word: "GROWUP", clue: "(phr v.) เติบโต, โตเป็นผู้ใหญ่", category: "Multi-word verb", unit: "5" },
  { word: "HIDEOUT", clue: "(phr v.) กบดาน, ซ่อนตัว", category: "Multi-word verb", unit: "5" },
  { word: "MOVEAWAY", clue: "(phr v.) ย้ายที่อยู่อาศัยไปที่อื่น", category: "Multi-word verb", unit: "5" },
  { word: "PACKUP", clue: "(phr v.) เก็บข้าวของ", category: "Multi-word verb", unit: "5" },
  { word: "STAYAWAY", clue: "(phr v.) อยู่ให้ห่าง, ไม่เข้าใกล้", category: "Multi-word verb", unit: "5" },
  { word: "STAYUP", clue: "(phr v.) นอนดึก, ยังไม่ยอมนอน", category: "Multi-word verb", unit: "5" },
  { word: "STAYOUT", clue: "(phr v.) อยู่นอกบ้าน", category: "Multi-word verb", unit: "5" }
];

// ─── Standardized 20 Words for Pre-test & Post-test Assessment ───────────────
const ASSESSMENT_20_WORDS = [
  { word: "AUTHOR", clue: "(n.) ผู้แต่ง, นักเขียน", category: "Travelers", unit: "5" },
  { word: "INVOLVE", clue: "(v.) เกี่ยวข้อง, มีส่วนร่วม, รวมถึง", category: "Travelers", unit: "5" },
  { word: "PASSENGER", clue: "(n.) ผู้โดยสาร", category: "Travelers", unit: "5" },
  { word: "DIRECTIONS", clue: "(n.) ทิศทาง", category: "Travel skills", unit: "5" },
  { word: "SCHEDULE", clue: "(n.) ตารางเวลา", category: "Travel skills", unit: "5" },
  { word: "OPTION", clue: "(n.) ตัวเลือก, ทางเลือก", category: "Travel skills", unit: "5" },
  { word: "MEDICAL", clue: "(adj.) ทางการแพทย์", category: "Travel skills", unit: "5" },
  { word: "CHOICE", clue: "(n.) ทางเลือก, การตัดสินใจเลือก", category: "Travel skills", unit: "5" },
  { word: "VIRUS", clue: "(n.) ไวรัส", category: "OVEREXPOSURE (1)", unit: "4" },
  { word: "PERHAPS", clue: "(adv.) บางที, อาจจะ", category: "OVEREXPOSURE (1)", unit: "4" },
  { word: "EFFECT", clue: "(n.) ผลกระทบ, ผลลัพธ์", category: "OVEREXPOSURE (2)", unit: "4" },
  { word: "NORMAL", clue: "(adj.) ปกติ, ธรรมดา", category: "OVEREXPOSURE (2)", unit: "4" },
  { word: "RECENT", clue: "(adj.) เร็วๆ นี้, เมื่อไม่นานมานี้", category: "OVEREXPOSURE (2)", unit: "4" },
  { word: "RESEARCH", clue: "(n., v.) การวิจัย, วิจัย", category: "OVEREXPOSURE (2)", unit: "4" },
  { word: "SUGGEST", clue: "(v.) แนะนำ, เสนอแนะ", category: "OVEREXPOSURE (2)", unit: "4" },
  { word: "CELEBRITY", clue: "(n.) คนดัง, ผู้มีชื่อเสียง", category: "OVEREXPOSURE (2)", unit: "4" },
  { word: "PERMISSION", clue: "(n.) การอนุญาต", category: "Photography", unit: "4" },
  { word: "PROTECT", clue: "(v.) ปกป้อง, ป้องกัน", category: "Photography", unit: "4" },
  { word: "PREVIOUS", clue: "(adj.) ก่อนหน้า", category: "OVEREXPOSURE (1)", unit: "4" },
  { word: "TRUTH", clue: "(n.) ความจริง", category: "OVEREXPOSURE (1)", unit: "4" }
];

let cachedVocab = null;
try {
  const cachedVer = localStorage.getItem("hangman_vocab_version");
  if (cachedVer === VOCAB_SCHEMA_VERSION) {
    const stored = localStorage.getItem("hangman_cached_vocab");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length >= 40) {
        cachedVocab = parsed;
      }
    }
  } else {
    // Purge outdated/corrupted cache
    localStorage.removeItem("hangman_cached_vocab");
    localStorage.setItem("hangman_vocab_version", VOCAB_SCHEMA_VERSION);
  }
} catch(e) {}

let WORD_DATABASE = cachedVocab || [...MASTER_OFFICIAL_VOCAB];

// ─── Game Constants ──────────────────────────────────────────────────────────
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_MISTAKES = 5;
const ROW_LAYOUT = [5, 4, 3];
const TOTAL_KEYS = ROW_LAYOUT.reduce((s, c) => s + c, 0);

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
let comboCount = 0;

// ─── Test Mode State (Assessment 20 Questions) ──────────────────────────────
let isTestMode = false;
let selectedAssessmentType = "pre";
let testQuestionsState = [];
let testCurrentIndex = 0;
let testStartTime = 0;

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

const SOUND_ON_SVG = '<svg class="w-4 h-4 text-[#C26754]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
const SOUND_OFF_SVG = '<svg class="w-4 h-4 text-[#998495]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';

// ─── Sound Toggle ─────────────────────────────────────────────────────────────
function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem("hangman_sound", JSON.stringify(soundEnabled));
  const btn = document.getElementById("sound-toggle-btn");
  if (btn) btn.innerHTML = soundEnabled ? SOUND_ON_SVG : SOUND_OFF_SVG;
  showToast(soundEnabled ? "เปิดเสียงแล้ว" : "ปิดเสียงแล้ว", "info", 1800);
}

// ─── Audio Engine (Crystal Glass & Patina Chimes) ───────────────────────────
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

["pointerdown", "touchstart", "click", "keydown"].forEach(evt => {
  window.addEventListener(evt, () => {
    getAudioContext();
  }, { once: true, passive: true });
});

function playSound(type, multiplier = 1) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === "click" || type === "tap") {
      // Dynamic pitch shift based on combo multiplier
      const baseFreq = 780 + Math.min(600, (multiplier - 1) * 80);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq / 2, now + 0.05);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "reveal" || type === "hint") {
      [783.99, 1174.66, 1567.98].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);
        gain.gain.setValueAtTime(0.14, now + idx * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.035 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.035);
        osc.stop(now + idx * 0.035 + 0.18);
      });
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === "stamp") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.07);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (type === "win") {
      [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.35);
      });
    } else if (type === "lose") {
      [329.63, 293.66, 261.63, 220.00].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.28);
      });
    }
  } catch(e) {}
}

// ─── Native Web Speech API (TTS with Waveform Visualizer) ───────────────────
function speakCurrentWord() {
  if (!secretWord) return;
  speakText(secretWord);
}

function speakText(text) {
  if (!('speechSynthesis' in window)) {
    showToast("เบราว์เซอร์ไม่รองรับ Text-to-Speech", "warning", 2000);
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.88;
  utterance.pitch = 1.0;

  const wave = document.getElementById("audio-wave");
  utterance.onstart = () => {
    if (wave) wave.classList.remove("hidden");
  };
  utterance.onend = utterance.onerror = () => {
    if (wave) wave.classList.add("hidden");
  };

  window.speechSynthesis.speak(utterance);
}

// ─── Sparkle Burst Particle (เมื่อทายถูก) ──────────────────────────────────
function spawnSparkleBurst(targetElement) {
  if (!targetElement) return;
  const rect = targetElement.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const colors = ["#E5AD7A", "#C26754", "#A37B8F", "#FFFFFF", "#FCD8C1"];
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement("div");
    spark.style.position = "fixed";
    spark.style.left = cx + "px";
    spark.style.top = cy + "px";
    spark.style.width = (Math.random() * 5 + 4) + "px";
    spark.style.height = spark.style.width;
    spark.style.borderRadius = "50%";
    spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "9999";
    spark.style.boxShadow = "0 0 8px rgba(229, 173, 122, 0.8)";
    document.body.appendChild(spark);

    const angle = (Math.PI * 2 / 8) * i + (Math.random() - 0.5) * 0.5;
    const dist = Math.random() * 32 + 20;
    const destX = cx + Math.cos(angle) * dist;
    const destY = cy + Math.sin(angle) * dist;

    if (window.gsap) {
      gsap.to(spark, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        scale: 0,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => spark.remove()
      });
    } else {
      setTimeout(() => spark.remove(), 450);
    }
  }
}

// ─── Confetti (Patina & Copper Theme) ────────────────────────────────────────
function triggerConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#E5AD7A", "#C26754", "#A37B8F", "#B3B9C9", "#D97D69", "#7B859C", "#3D8B6E"];
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 150,
      y: canvas.height / 2 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 1.2) * 12,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12
    });
  }

  const start = performance.now();
  function anim(now) {
    const elapsed = now - start;
    const delta = 0.016;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 9.8 * delta;
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

function updateHangmanSVG(mistakeCount, isLost) {}

// ─── Leitner Spaced Repetition System (SRS) ───────────────────────────────────
const BOX_INTERVALS = {
  0: 0,
  1: 1,
  2: 3,
  3: 7,
  4: 14
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
    if (current.box === 0) {
      nextBox = 2;
    } else {
      nextBox = Math.min(4, current.box + 1);
    }
  } else {
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

// ─── 30-Level Player Rank & Progression System ───────────────────────────────
const RANK_TIERS_30 = [
  // Tier 1: Beginner & Apprentice (Lv.1 - 5)
  { level: 1, title: "Novice 🌱", badgeClass: "bg-[#F0F8F4] text-[#3D8B6E] border-[#C2E2D4]" },
  { level: 2, title: "Seeker 🔍", badgeClass: "bg-[#F0F8F4] text-[#3D8B6E] border-[#C2E2D4]" },
  { level: 3, title: "Scout 🧭", badgeClass: "bg-[#FFF8F2] text-[#C26754] border-[#FDE0C8]" },
  { level: 4, title: "Apprentice 📖", badgeClass: "bg-[#FFF8F2] text-[#C26754] border-[#FDE0C8]" },
  { level: 5, title: "Adventurer 🎒", badgeClass: "bg-[#FFF8F2] text-[#C26754] border-[#FDE0C8]" },

  // Tier 2: Spellcaster & Scholar (Lv.6 - 10)
  { level: 6, title: "Spellcaster 🪄", badgeClass: "bg-[#F8EFF4] text-[#A37B8F] border-[#CCA8B9]" },
  { level: 7, title: "Word Hunter 🏹", badgeClass: "bg-[#F8EFF4] text-[#A37B8F] border-[#CCA8B9]" },
  { level: 8, title: "Lexicon Knight ⚔️", badgeClass: "bg-[#F0F3F8] text-[#5E4B5B] border-[#B3B9C9]" },
  { level: 9, title: "Scholar 📜", badgeClass: "bg-[#F0F3F8] text-[#5E4B5B] border-[#B3B9C9]" },
  { level: 10, title: "Rune Master 🔮", badgeClass: "bg-[#F0F3F8] text-[#5E4B5B] border-[#B3B9C9]" },

  // Tier 3: Vanguard & Champion (Lv.11 - 15)
  { level: 11, title: "Vanguard 🛡️", badgeClass: "bg-[#FFF4EC] text-[#A8503E] border-[#FCD8C1]" },
  { level: 12, title: "Cipher Breaker 🗝️", badgeClass: "bg-[#FFF4EC] text-[#A8503E] border-[#FCD8C1]" },
  { level: 13, title: "Grammar Captain ⚓", badgeClass: "bg-[#FFF4EC] text-[#A8503E] border-[#FCD8C1]" },
  { level: 14, title: "Champion 🏆", badgeClass: "bg-[#FFF1E6] text-[#A8503E] border-[#E5AD7A]" },
  { level: 15, title: "High Scholar 🏛️", badgeClass: "bg-[#FFF1E6] text-[#A8503E] border-[#E5AD7A]" },

  // Tier 4: Sage & Grandmaster (Lv.16 - 20)
  { level: 16, title: "Word Sage 🧙‍♂️", badgeClass: "bg-[#F8EFF4] text-[#7A4B6B] border-[#A37B8F]" },
  { level: 17, title: "Archmage 💫", badgeClass: "bg-[#F8EFF4] text-[#7A4B6B] border-[#A37B8F]" },
  { level: 18, title: "Mythic Guardian 🐉", badgeClass: "bg-[#F8EFF4] text-[#7A4B6B] border-[#A37B8F]" },
  { level: 19, title: "Grandmaster 👑", badgeClass: "bg-gradient-to-r from-[#FFF1E6] to-[#FCD8C1] text-[#A8503E] border-[#E5AD7A]" },
  { level: 20, title: "Linguistic Lord 🏰", badgeClass: "bg-gradient-to-r from-[#FFF1E6] to-[#FCD8C1] text-[#A8503E] border-[#E5AD7A]" },

  // Tier 5: Cosmic & Celestial (Lv.21 - 25)
  { level: 21, title: "Star Voyager 🚀", badgeClass: "bg-gradient-to-r from-[#F0F3F8] to-[#CBD1DE] text-[#384257] border-[#7B859C]" },
  { level: 22, title: "Astral Weaver ✨", badgeClass: "bg-gradient-to-r from-[#F0F3F8] to-[#CBD1DE] text-[#384257] border-[#7B859C]" },
  { level: 23, title: "Cosmic Scholar 🌌", badgeClass: "bg-gradient-to-r from-[#F0F3F8] to-[#CBD1DE] text-[#384257] border-[#7B859C]" },
  { level: 24, title: "Titan of Words ⚡", badgeClass: "bg-gradient-to-r from-[#F8EFF4] to-[#E5D0DC] text-[#5E4B5B] border-[#A37B8F]" },
  { level: 25, title: "Celestial Sovereign 🌞", badgeClass: "bg-gradient-to-r from-[#F8EFF4] to-[#E5D0DC] text-[#5E4B5B] border-[#A37B8F]" },

  // Tier 6: Supreme & Immortal (Lv.26 - 30)
  { level: 26, title: "Infinite Oracle 👁️", badgeClass: "bg-gradient-to-r from-[#FFF4EC] to-[#FCE2D2] text-[#A8503E] border-[#E5AD7A]" },
  { level: 27, title: "Omniscient Mind 🧠", badgeClass: "bg-gradient-to-r from-[#FFF4EC] to-[#FCE2D2] text-[#A8503E] border-[#E5AD7A]" },
  { level: 28, title: "Eternal Paragon 💎", badgeClass: "bg-gradient-to-r from-[#F0F8F4] to-[#C2E2D4] text-[#1B4D3E] border-[#3D8B6E]" },
  { level: 29, title: "God of Lexicon 🔱", badgeClass: "bg-gradient-to-r from-[#FFF1E6] via-[#FCD8C1] to-[#E5AD7A] text-[#8C3422] border-[#C26754]" },
  { level: 30, title: "Supreme Deity 🌠", badgeClass: "bg-gradient-to-r from-[#FFF1E6] via-[#E5AD7A] to-[#C26754] text-[#5E4B5B] border-[#C26754]" }
];

// ─── 6 League Divisions (Highest to Lowest) ──────────────────────────────────
const LEAGUE_DIVISIONS = [
  { id: "supreme", name: "SUPREME IMMORTAL", icon: "🌠", minLevel: 26, maxLevel: 30, range: "Lv.26 - 30 · 1,250+ PTS", hdrClass: "tier-hdr-supreme" },
  { id: "celestial", name: "CELESTIAL & TITAN", icon: "🌌", minLevel: 21, maxLevel: 25, range: "Lv.21 - 25 · 1,000 - 1,249 PTS", hdrClass: "tier-hdr-celestial" },
  { id: "grandmaster", name: "GRANDMASTER & SAGE", icon: "👑", minLevel: 16, maxLevel: 20, range: "Lv.16 - 20 · 750 - 999 PTS", hdrClass: "tier-hdr-grandmaster" },
  { id: "champion", name: "VANGUARD & CHAMPION", icon: "🏆", minLevel: 11, maxLevel: 15, range: "Lv.11 - 15 · 500 - 749 PTS", hdrClass: "tier-hdr-champion" },
  { id: "scholar", name: "SCHOLAR & KNIGHT", icon: "⚔️", minLevel: 6, maxLevel: 10, range: "Lv.6 - 10 · 250 - 499 PTS", hdrClass: "tier-hdr-scholar" },
  { id: "novice", name: "NOVICE & EXPLORER", icon: "🌱", minLevel: 1, maxLevel: 5, range: "Lv.1 - 5 · 0 - 249 PTS", hdrClass: "tier-hdr-novice" }
];

function getPlayerRankInfo(scoreVal) {
  const s = Math.max(0, Number(scoreVal) || 0);
  const rawLevel = Math.floor(s / 50) + 1;
  const level = Math.min(30, Math.max(1, rawLevel));
  const currentXP = level >= 30 && s >= 1450 ? 50 : s % 50;
  const percent = level >= 30 && s >= 1450 ? 100 : Math.min(100, Math.round((currentXP / 50) * 100));

  const tier = RANK_TIERS_30[level - 1] || RANK_TIERS_30[RANK_TIERS_30.length - 1];
  const title = tier.title;
  const badgeClass = tier.badgeClass;
  const fullLabel = "Lv." + level + " " + title;

  return { level, title, fullLabel, badgeClass, currentXP, percent, isMax: level >= 30 };
}

function updatePlayerLevelXP() {
  const rankInfo = getPlayerRankInfo(score);
  const rankBadge = document.getElementById("player-rank-badge");
  if (rankBadge) rankBadge.textContent = rankInfo.fullLabel;

  const xpText = document.getElementById("current-xp-text");
  if (xpText) {
    xpText.textContent = rankInfo.isMax && rankInfo.percent === 100 ? "MAX" : rankInfo.currentXP;
  }

  const xpFill = document.getElementById("xp-bar-fill");
  if (xpFill) xpFill.style.width = rankInfo.percent + "%";
}

// ─── Rank Details Modal Controller ───────────────────────────────────────────
function openRankModal() {
  playSound('click');
  renderRankModal();
  const modal = document.getElementById("rank-modal");
  if (modal) {
    modal.classList.remove("hidden");
    if (window.gsap) {
      gsap.fromTo(modal.querySelector(".modal-paper"), 
        { scale: 0.92, opacity: 0, y: 15 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.28, ease: "back.out(1.5)" }
      );
    }
  }
}

function closeRankModal() {
  playSound('click');
  const modal = document.getElementById("rank-modal");
  if (modal) modal.classList.add("hidden");
}

function renderRankModal() {
  const currentCardEl = document.getElementById("rank-modal-current-card");
  const listEl = document.getElementById("rank-modal-list");
  if (!listEl) return;

  const currentScore = Number(score) || 0;
  const userRank = getPlayerRankInfo(currentScore);
  const nextLevel = Math.min(30, userRank.level + 1);
  const nextTargetTier = RANK_TIERS_30[nextLevel - 1];
  const ptsNeededForNext = userRank.isMax ? 0 : (userRank.level * 50 - currentScore);

  // 1. Render Current Card
  if (currentCardEl) {
    const iconParts = userRank.title.split(" ");
    const iconChar = iconParts.length > 1 ? iconParts[iconParts.length - 1] : "👑";

    currentCardEl.innerHTML = `
      <div class="flex items-center justify-between gap-2 mb-2">
        <div class="flex items-center gap-2.5">
          <div class="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-xs shrink-0 border border-[#E5AD7A]/60">
            ${iconChar}
          </div>
          <div>
            <div class="text-[10px] font-bold text-[#A8503E] uppercase tracking-wider">ระดับปัจจุบันของคุณ</div>
            <div class="text-base font-black text-[#5E4B5B] flex items-center gap-1.5 mt-0.5">
              <span>${userRank.fullLabel}</span>
            </div>
          </div>
        </div>
        <div class="text-right shrink-0">
          <span class="text-xl font-black text-[#C26754]">${currentScore}</span>
          <span class="text-[9px] block text-[#7A6677] font-extrabold">PTS รวม</span>
        </div>
      </div>
      <div class="mt-2.5 pt-2 border-t border-[#E5AD7A]/30">
        <div class="flex justify-between items-center text-[10px] font-bold text-[#7A6677] mb-1">
          <span>ความคืบหน้าเลเวล: <strong class="text-[#5E4B5B]">${userRank.isMax && userRank.percent === 100 ? '50 / 50 XP (MAX)' : `${userRank.currentXP} / 50 XP`}</strong></span>
          <span class="text-[#A8503E] font-black">${userRank.isMax ? '🏆 สูงสุดแล้ว (MAX)' : `อีก ${ptsNeededForNext} PTS ปลดล็อก ${nextTargetTier.title}`}</span>
        </div>
        <div class="w-full h-2.5 bg-white/90 rounded-full overflow-hidden border border-[#E5AD7A]/40 p-0.5 shadow-inner">
          <div class="h-full rounded-full bg-gradient-to-r from-[#C26754] via-[#D97D69] to-[#E5AD7A] transition-all duration-500" style="width: ${userRank.percent}%;"></div>
        </div>
      </div>
    `;
  }

  // 2. Render 6 Tiers & 30 Levels List (Descending: Highest Lv.30 at TOP, Lowest Lv.1 at BOTTOM)
  let html = "";
  LEAGUE_DIVISIONS.forEach(div => {
    // League Header
    html += `
      <div class="tier-header ${div.hdrClass} mt-3 mb-1.5">
        <div class="flex items-center gap-2 font-black text-xs sm:text-sm">
          <span class="text-base sm:text-lg drop-shadow-xs">${div.icon}</span>
          <span class="tracking-wide">${div.name}</span>
        </div>
        <span class="text-[10px] font-bold opacity-85">
          ${div.range}
        </span>
      </div>
    `;

    // Levels in this tier: Descending order (maxLevel down to minLevel)
    for (let lv = div.maxLevel; lv >= div.minLevel; lv--) {
      const tier = RANK_TIERS_30[lv - 1];
      if (!tier) continue;

      const minPts = (lv - 1) * 50;
      const isUnlocked = userRank.level >= lv;
      const isCurrent = userRank.level === lv;
      const isNextTarget = (userRank.level + 1 === lv);

      let statusBadge = "";
      if (isCurrent) {
        statusBadge = `<span class="text-[10px] font-black px-2.5 py-0.5 bg-[#C26754] text-white rounded-full shadow-xs animate-pulse">ระดับปัจจุบัน</span>`;
      } else if (isUnlocked) {
        statusBadge = `<span class="text-[10px] font-extrabold px-2.5 py-0.5 bg-[#F0F8F4] text-[#3D8B6E] border border-[#C2E2D4] rounded-full">✓ ปลดล็อกแล้ว</span>`;
      } else if (isNextTarget) {
        statusBadge = `<span class="text-[10px] font-black px-2.5 py-0.5 bg-[#FFF4EC] text-[#C26754] border border-[#E5AD7A] rounded-full">🔒 ขาดอีก ${minPts - currentScore} PTS</span>`;
      } else {
        statusBadge = `<span class="text-[10px] font-bold px-2 py-0.5 bg-slate-100/90 text-[#998495] border border-slate-200 rounded-full">🔒 ${minPts} PTS</span>`;
      }

      html += `
        <div class="p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${isCurrent ? 'bg-[#FFF9F5] border-[#E5AD7A] shadow-sm ring-2 ring-[#E5AD7A]/40' : (isUnlocked ? 'bg-white/90 border-slate-200/90 shadow-xs' : 'bg-white/45 border-slate-200/50 opacity-70')}">
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <span class="text-xs font-black min-w-10 text-center px-1.5 py-1 rounded-lg border shrink-0 ${tier.badgeClass}">
              Lv.${lv}
            </span>
            <div class="min-w-0 flex-1">
              <div class="font-black text-sm text-[#5E4B5B] truncate">${tier.title}</div>
              <div class="text-[10px] text-[#998495] font-semibold">${minPts} - ${minPts + 49} PTS</div>
            </div>
          </div>
          <div class="shrink-0">
            ${statusBadge}
          </div>
        </div>
      `;
    }
  });

  listEl.innerHTML = html;
}

// ─── Combo System ─────────────────────────────────────────────────────────────
function renderComboBadge() {
  const container = document.getElementById("combo-container");
  if (!container) return;
  if (comboCount >= 2) {
    container.innerHTML = `<span class="combo-badge">🔥 x${comboCount} COMBO! (+${comboCount * 5} XP)</span>`;
  } else {
    container.innerHTML = "";
  }
}

// ─── Session Progress ─────────────────────────────────────────────────────────
function updateSessionProgress() {
  const el = document.getElementById("session-progress");
  if (!el) return;
  if (isTestMode && testQuestionsState && testQuestionsState.length > 0) {
    el.textContent = "ข้อที่ " + (testCurrentIndex + 1) + "/" + testQuestionsState.length;
  } else {
    const pool = getFilteredWords();
    const playedList = getPlayedWords(activeSection);
    if (pool.length > 0) {
      el.textContent = "คำที่ " + playedList.length + "/" + pool.length;
    } else {
      el.textContent = sessionWordsPlayed + " คำวันนี้";
    }
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

  const nameToDisplay = (currentUser && currentUser.name) || userName || "ผู้เรียน";
  set("home-user-name", nameToDisplay);
  set("home-streak-days", streak);
  set("home-mastered-summary", masteredWords.length + "/" + WORD_DATABASE.length);
  set("home-streak-badge", streak);

  updatePlayerLevelXP();

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
  if (!clueString) return '<span class="text-sm font-bold text-[#998495]">-</span>';
  const match = clueString.match(/^\(([^)]+(?:\([^)]+\))?)\)\s*(.*)$/);
  if (match) {
    const pos = match[1].trim();
    const meaning = match[2].trim();
    return '<div class="flex items-center justify-center gap-2 flex-wrap py-1">' +
      '<span class="text-[11px] font-extrabold px-2 py-0.5 bg-[#F8EFF4] text-[#8C3454] border border-[#CCA8B9] rounded-md shadow-xs">' + pos + '</span>' +
      '<span class="text-base sm:text-lg lg:text-xl font-bold text-[#5E4B5B] leading-snug tracking-normal">' + meaning + '</span>' +
    '</div>';
  }
  return '<div class="text-base sm:text-lg lg:text-xl font-bold text-[#5E4B5B] py-1 leading-snug tracking-normal">' + clueString + '</div>';
}

// ─── Game Init ───────────────────────────────────────────────────────────────
function initGame() {
  const pool = getFilteredWords();

  if (isTestMode && testQuestionsState && testQuestionsState.length > 0) {
    // Assessment mode: delegate to loadTestQuestion instead
    loadTestQuestion(testCurrentIndex);
    return;
  } else {
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
  }

  secretWord = currentItem.word;

  revealedTiles = new Array(secretWord.length).fill(false);
  revealedTiles[0] = true;
  currentTileIndex = 1;
  while (currentTileIndex < secretWord.length && revealedTiles[currentTileIndex]) {
    currentTileIndex++;
  }

  mistakes = 0;
  comboCount = 0;
  isGameOver = false;

  activeKeys = generateKeyPool(secretWord);
  const targetUnit = currentItem.unit || (activeUnit !== "ALL" ? activeUnit : "");
  const uText = targetUnit && targetUnit !== "ALL" ? (formatUnitLabel(targetUnit) + " · ") : "";
  const secText = (currentItem.category || activeSection) === "ALL" ? "ทั้งหมด" : (currentItem.category || activeSection);
  const prefix = isTestMode ? "📝 โหมดทดสอบ: " : "";
  document.getElementById("category-tag").textContent = prefix + uText + "หมวด: " + secText;
  document.getElementById("clue-text").innerHTML = formatClueHTML(currentItem.clue);
  document.getElementById("status").innerHTML = "";
  checkAndProcessDailyStreak();
  updateScoreBoard();
  renderComboBadge();
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
      ki++;
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.id = "btn-" + letter;
      const isVowel = ["A","E","I","O","U"].includes(letter);
      const cc = isVowel ? "key-vowel" : "key-consonant";
      btn.className = "key-btn " + cc;
      btn.onclick = () => handleGuess(letter);
      row.appendChild(btn);
    }
    keyboard.appendChild(row);
  });

  if (window.gsap) {
    gsap.fromTo("#keyboard .key-btn", 
      { scale: 0.85, opacity: 0 }, 
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

// ─── 3D Card Flip Sequential Guessing ─────────────────────────────────────────
// ─── 3D Card Flip Sequential Guessing ─────────────────────────────────────────
function handleGuess(letter) {
  if (isGameOver || currentTileIndex >= secretWord.length) return;

  const btn = document.getElementById("btn-" + letter);
  const expected = secretWord[currentTileIndex];

  if (btn && !btn.disabled) {
    btn.classList.add("key-pressed");
    setTimeout(() => btn.classList.remove("key-pressed"), 100);
  }

  if (letter === expected) {
    const justGuessedIdx = currentTileIndex;
    comboCount++;
    playSound("click", comboCount);
    
    if (window.gsap && btn) {
      gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.22, ease: "back.out(2)" });
    }

    // 1. Direct 3D Flip on Target Card Element
    const targetCard = document.getElementById("tile-card-" + justGuessedIdx);
    if (targetCard) {
      const front = targetCard.querySelector(".tile-card-front");
      if (front) {
        front.classList.remove("is-active-target");
        front.textContent = "";
      }
      targetCard.classList.add("is-flipped");
      spawnSparkleBurst(targetCard);

      if (window.gsap) {
        gsap.fromTo(targetCard, { scale: 1.15 }, { scale: 1, duration: 0.35, ease: "back.out(2)" });
      }
    }

    revealedTiles[justGuessedIdx] = true;
    currentTileIndex++;
    while (currentTileIndex < secretWord.length && revealedTiles[currentTileIndex]) {
      currentTileIndex++;
    }

    // 2. Set next active target card
    if (currentTileIndex < secretWord.length) {
      const nextCard = document.getElementById("tile-card-" + currentTileIndex);
      if (nextCard && !nextCard.classList.contains("is-flipped")) {
        const nextFront = nextCard.querySelector(".tile-card-front");
        if (nextFront) {
          nextFront.classList.add("is-active-target");
          nextFront.textContent = "?";
        }
      }
    }

    updateKeyboardDisabledStates();
    renderComboBadge();
    updateLivesDisplay();

    if (isTestMode && testQuestionsState && testQuestionsState[testCurrentIndex]) {
      const q = testQuestionsState[testCurrentIndex];
      q.revealedTiles = [...revealedTiles];
      q.currentTileIndex = currentTileIndex;
      q.mistakes = mistakes;
      if (!q.isCompleted) q.status = "in_progress";
      renderTestPalette();
    }
  } else {
    mistakes++;
    comboCount = 0;
    renderComboBadge();
    playSound("wrong");

    if (isTestMode && testQuestionsState && testQuestionsState[testCurrentIndex]) {
      const q = testQuestionsState[testCurrentIndex];
      q.mistakes = mistakes;
      if (!q.isCompleted) q.status = "in_progress";
      renderTestPalette();
    }

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
    updateLivesDisplay();

    if (window.gsap) {
      const livesRow = document.getElementById("lives-display");
      if (livesRow) {
        gsap.fromTo(livesRow, { x: -6 }, { x: 0, duration: 0.3, ease: "elastic.out(1.5, 0.3)" });
        const usedChips = livesRow.querySelectorAll(".life-chip-used");
        const lastUsed = usedChips[usedChips.length - 1];
        if (lastUsed) {
          gsap.fromTo(lastUsed, { scale: 1.3 }, { scale: 0.85, duration: 0.3, ease: "back.out(2)" });
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

  const targetIdx = currentTileIndex;
  const targetCard = document.getElementById("tile-card-" + targetIdx);
  if (targetCard) {
    const front = targetCard.querySelector(".tile-card-front");
    if (front) {
      front.classList.remove("is-active-target");
      front.textContent = "";
    }
    targetCard.classList.add("is-flipped");
    spawnSparkleBurst(targetCard);
  }

  revealedTiles[targetIdx] = true;
  playSound("reveal");
  currentTileIndex++;
  while (currentTileIndex < secretWord.length && revealedTiles[currentTileIndex]) {
    currentTileIndex++;
  }

  if (currentTileIndex < secretWord.length) {
    const nextCard = document.getElementById("tile-card-" + currentTileIndex);
    if (nextCard && !nextCard.classList.contains("is-flipped")) {
      const nextFront = nextCard.querySelector(".tile-card-front");
      if (nextFront) {
        nextFront.classList.add("is-active-target");
        nextFront.textContent = "?";
      }
    }
  }

  updateKeyboardDisabledStates();
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

// ─── Pause Game ─────────────────────────────────────────────────────────────
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
  comboCount = 0;
  renderComboBadge();
  const srsResult = isTestMode ? { box: 0, nextReview: '' } : updateWordSRS(secretWord, false);
  if (!isTestMode) {
    checkAndProcessDailyStreak();
    updateScoreBoard();
    syncScoreToGAS();
  }
  playSound("wrong");
  updateHangmanSVG(MAX_MISTAKES, true);
  if (!isTestMode) {
    logActivityToGAS({ word: secretWord, isWon: false, mistakes, score, streak, maxStreak, box: srsResult.box, nextReview: srsResult.nextReview, action: "skip", category: (currentItem && currentItem.category) || activeSection });
    document.getElementById("status").innerHTML = '<span class="stamp-banner stamp-neutral"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>ข้ามคำ! (Box ' + srsResult.box + ' · ทบทวนใน 1 วัน) คำตอบคือ ' + secretWord + '</span>';
  } else {
    document.getElementById("status").innerHTML = '<span class="stamp-banner stamp-neutral"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>ข้ามคำ! คำตอบคือ ' + secretWord + '</span>';
  }
  
  // Staggered 3D flip for all remaining tiles
  flipAllTilesSequentially(true);
  updateSessionProgress();

  if (isTestMode && testQuestionsState && testQuestionsState[testCurrentIndex]) {
    const q = testQuestionsState[testCurrentIndex];
    q.isCompleted = true;
    q.isWon = false;
    q.status = "failed";
    q.mistakes = MAX_MISTAKES;

    renderTestPalette();

    setTimeout(() => {
      if (!isTestMode) return;
      const nextUnans = findNextUnansweredQuestion(testCurrentIndex);
      if (nextUnans !== -1) {
        jumpToTestQuestion(nextUnans);
      } else {
        showToast("คุณตอบครบ 20 ข้อแล้ว! กดส่งข้อสอบได้เลย", "info", 3500);
      }
    }, 1300);
    return;
  }

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

// ─── Lives (Terracotta Patina Hearts) ─────────────────────────────────────────
const HEART_SVG = `<svg class="w-5 h-5 text-[#C26754] fill-[#C26754] drop-shadow-sm" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
const HEART_EMPTY_SVG = `<svg class="w-5 h-5 text-[#D5CBD1] fill-[#EBE4E8] opacity-60" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

function renderLivesChips() {
  return Array.from({length: MAX_MISTAKES}, (_, i) => {
    const isPopped = i < mistakes;
    const content = isPopped ? HEART_EMPTY_SVG : HEART_SVG;
    const classes = isPopped ? "life-chip life-chip-used" : "life-chip hover:scale-110 transition-transform";
    return `<span class="${classes}">${content}</span>`;
  }).join("");
}

function updateLivesDisplay() {
  const livesEl = document.getElementById("lives-display");
  if (livesEl) {
    livesEl.innerHTML = '<span class="lives-label text-[#7A6677] font-bold text-xs">ชีวิต</span><span class="life-chips">' + renderLivesChips() + '</span>';
  }
}

// ─── 3D Card Display Renderer ─────────────────────────────────────────────────
function updateDisplay(revealAll) {
  const container = document.getElementById("word-container");
  if (!container) return;

  const currentCards = container.querySelectorAll(".tile-card-3d");
  const needsRebuild = (currentCards.length !== secretWord.length);

  if (needsRebuild) {
    container.innerHTML = "";
    secretWord.split("").forEach((letter, idx) => {
      const card = document.createElement("div");
      card.id = "tile-card-" + idx;
      card.className = "tile-card-3d";

      const isFlipped = revealedTiles[idx] || revealAll;
      if (isFlipped) card.classList.add("is-flipped");

      const isActive = (idx === currentTileIndex && !isFlipped);
      const isMiss = (revealAll && !revealedTiles[idx]);

      card.innerHTML = `
        <div class="tile-card-inner">
          <div class="tile-card-front ${isActive ? 'is-active-target' : ''}">
            ${isActive ? '?' : ''}
          </div>
          <div class="tile-card-back ${isMiss ? 'is-miss' : ''}">
            ${letter}
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } else {
    // In-place updates to keep CSS 3D transitions intact!
    secretWord.split("").forEach((letter, idx) => {
      const card = document.getElementById("tile-card-" + idx);
      if (!card) return;
      
      const isFlipped = revealedTiles[idx] || revealAll;
      if (isFlipped) {
        card.classList.add("is-flipped");
      } else {
        card.classList.remove("is-flipped");
      }

      const isActive = (idx === currentTileIndex && !isFlipped);
      const front = card.querySelector(".tile-card-front");
      if (front) {
        if (isActive) {
          front.classList.add("is-active-target");
          front.textContent = "?";
        } else {
          front.classList.remove("is-active-target");
          front.textContent = "";
        }
      }

      const back = card.querySelector(".tile-card-back");
      if (back) {
        if (revealAll && !revealedTiles[idx]) {
          back.classList.add("is-miss");
        } else {
          back.classList.remove("is-miss");
        }
      }
    });
  }

  updateLivesDisplay();
}

function flipAllTilesSequentially(isMiss = false) {
  const cards = document.querySelectorAll("#word-container .tile-card-3d");
  cards.forEach((card, idx) => {
    if (!card.classList.contains("is-flipped")) {
      setTimeout(() => {
        if (isMiss) {
          const back = card.querySelector(".tile-card-back");
          if (back) back.classList.add("is-miss");
        }
        const front = card.querySelector(".tile-card-front");
        if (front) {
          front.classList.remove("is-active-target");
          front.textContent = "";
        }
        card.classList.add("is-flipped");
        if (!isMiss) spawnSparkleBurst(card);
      }, idx * 85);
    }
  });
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
    const pts = Math.max(10, 20 - mistakes * 2) + Math.min(15, comboCount * 3);
    if (!isTestMode) {
      score += pts;
    }
    sessionWordsWon++;
    const srsResult = isTestMode ? { box: 0, nextReview: '' } : updateWordSRS(secretWord, true);
    if (!isTestMode) {
      checkAndProcessDailyStreak();
      updateScoreBoard();
      syncScoreToGAS();
    }
    playSound("stamp");
    setTimeout(() => playSound("win"), 120);
    speakCurrentWord();
    triggerConfetti();
    flipAllTilesSequentially(false);
    updateHangmanSVG(mistakes, false);
    if (!isTestMode) {
      logActivityToGAS({ word: secretWord, isWon: true, mistakes, score, streak, maxStreak, box: srsResult.box, nextReview: srsResult.nextReview, action: "win", category: (currentItem && currentItem.category) || activeSection });
      const stampLabel = srsResult.box >= 4 ? "MASTERED ✨" : streak >= 3 ? "HOT STREAK 🔥" : "CORRECT! ✓";
      document.getElementById("status").innerHTML = '<div class="stamp-banner stamp-win"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>' + stampLabel + ' (+' + pts + ' · Box ' + srsResult.box + ')</span></div>';
    } else {
      document.getElementById("status").innerHTML = '<div class="stamp-banner stamp-win"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>CORRECT! ✓ สะกดถูกต้อง</span></div>';
    }
    
    if (!isTestMode && window.gsap) {
      gsap.fromTo("#score-val", { scale: 1.4, color: "#3D8B6E" }, { scale: 1, color: "inherit", duration: 0.4, ease: "back.out(2)" });
      gsap.fromTo("#streak-val", { scale: 1.4, color: "#E5AD7A" }, { scale: 1, color: "inherit", duration: 0.4, ease: "back.out(2)" });
    }

    updateSessionProgress();

    if (isTestMode && testQuestionsState && testQuestionsState[testCurrentIndex]) {
      const q = testQuestionsState[testCurrentIndex];
      q.isCompleted = true;
      q.isWon = true;
      q.status = "completed";
      q.revealedTiles = [...revealedTiles];
      q.currentTileIndex = currentTileIndex;
      q.mistakes = mistakes;

      renderTestPalette();

      setTimeout(() => {
        if (!isTestMode) return;
        const nextUnans = findNextUnansweredQuestion(testCurrentIndex);
        if (nextUnans !== -1) {
          jumpToTestQuestion(nextUnans);
        } else {
          showToast("🎉 คุณตอบครบ 20 ข้อแล้ว! ตรวจสอบคำตอบหรือกดส่งข้อสอบได้เลย", "success", 3500);
        }
      }, 1300);
      return;
    }

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
    comboCount = 0;
    renderComboBadge();
    const srsResult = isTestMode ? { box: 0, nextReview: '' } : updateWordSRS(secretWord, false);
    if (!isTestMode) {
      checkAndProcessDailyStreak();
      updateScoreBoard();
      syncScoreToGAS();
    }
    playSound("stamp");
    setTimeout(() => playSound("lose"), 120);
    speakCurrentWord();
    updateHangmanSVG(MAX_MISTAKES, true);
    updateDisplay(true);
    flipAllTilesSequentially(true);
    if (!isTestMode) {
      logActivityToGAS({ word: secretWord, isWon: false, mistakes, score, streak, maxStreak, box: srsResult.box, nextReview: srsResult.nextReview, action: "lose", category: (currentItem && currentItem.category) || activeSection });
      document.getElementById("status").innerHTML = '<div class="stamp-banner stamp-lose"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><span>หมดหัวใจ! (Box ' + srsResult.box + ') — ' + secretWord + '</span></div>';
    } else {
      document.getElementById("status").innerHTML = '<div class="stamp-banner stamp-lose"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><span>หมดหัวใจ! คำตอบคือ ' + secretWord + '</span></div>';
    }

    updateSessionProgress();

    if (isTestMode && testQuestionsState && testQuestionsState[testCurrentIndex]) {
      const q = testQuestionsState[testCurrentIndex];
      q.isCompleted = true;
      q.isWon = false;
      q.status = "failed";
      q.mistakes = MAX_MISTAKES;

      renderTestPalette();

      setTimeout(() => {
        if (!isTestMode) return;
        const nextUnans = findNextUnansweredQuestion(testCurrentIndex);
        if (nextUnans !== -1) {
          jumpToTestQuestion(nextUnans);
        } else {
          showToast("คุณตอบครบ 20 ข้อแล้ว! ตรวจสอบคำตอบหรือกดส่งข้อสอบได้เลย", "info", 3500);
        }
      }, 1500);
      return;
    }

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

// ─── Dynamic Category Styling & Icons (Patina Palette) ────────────────────────
function getCategoryIconSVG(cat) {
  const c = (cat || "").toLowerCase();
  if (c === "all" || c === "ทั้งหมด") {
    return '<svg class="w-5 h-5 inline-block text-[#C26754] fill-[#E5AD7A]" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  if (c.includes("traveler") || c.includes("person") || c.includes("people") || c.includes("human")) {
    return '<svg class="w-5 h-5 inline-block text-[#A37B8F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 2v-2h8v2"/></svg>';
  }
  if (c.includes("skill") || c.includes("direct") || c.includes("map") || c.includes("place") || c.includes("travel")) {
    return '<svg class="w-5 h-5 inline-block text-[#7B859C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>';
  }
  if (c.includes("verb") || c.includes("idiom") || c.includes("phrase") || c.includes("word") || c.includes("grammar") || c.includes("talk")) {
    return '<svg class="w-5 h-5 inline-block text-[#C26754]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  }
  return '<svg class="w-5 h-5 inline-block text-[#998495]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
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
    return '<svg class="w-5 h-5 inline-block text-[#C26754] fill-[#E5AD7A]" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  return '<svg class="w-5 h-5 inline-block text-[#A37B8F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
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

  allList.forEach((unitObj) => {
    const btn = document.createElement("button");
    btn.className = "category-card group";
    btn.onclick = () => {
      playSound('click');
      selectUnit(unitObj.name);
    };

    btn.innerHTML = `
      <div class="category-card-icon">
        ${getUnitIconSVG(unitObj.name)}
      </div>
      <div class="flex-1 min-w-0 text-left">
        <div class="font-black text-base text-[#5E4B5B] truncate">${unitObj.label}</div>
        <div class="text-xs text-[#7A6677] font-semibold mt-0.5 truncate">${unitObj.sub}</div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-xs font-black px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[#7A6677] shadow-sm">
          ${unitObj.count} คำ
        </span>
        <div class="category-card-arrow">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    `;

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

  allList.forEach((catObj) => {
    const btn = document.createElement("button");
    btn.className = "category-card group";
    btn.onclick = () => {
      playSound('click');
      selectCategoryAndPlay(catObj.name);
    };

    btn.innerHTML = `
      <div class="category-card-icon">
        ${getCategoryIconSVG(catObj.name)}
      </div>
      <div class="flex-1 min-w-0 text-left">
        <div class="font-black text-base text-[#5E4B5B] truncate">${catObj.label}</div>
        <div class="text-xs text-[#7A6677] font-semibold mt-0.5 truncate">${(catObj.customSub || getCategorySubtitle(catObj.name, catObj.count))}</div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-xs font-black px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[#7A6677] shadow-sm">
          ${catObj.count} คำ
        </span>
        <div class="category-card-arrow">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    `;

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
          localStorage.setItem("hangman_vocab_version", VOCAB_SCHEMA_VERSION);
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
          localStorage.setItem("hangman_vocab_version", VOCAB_SCHEMA_VERSION);
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

  const gameScreen = document.getElementById("game-screen");
  const isPlayingActiveWord = gameScreen && !gameScreen.classList.contains("hidden") && secretWord && !isGameOver;
  if (!isPlayingActiveWord) {
    initGame();
  }
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
      { scale: 0.92, opacity: 0, y: 16 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }
    );
  }
}

function closeModalWithGSAP(modalId, callback) {
  const modal = typeof modalId === "string" ? document.getElementById(modalId) : modalId;
  if (!modal) { if (callback) callback(); return; }
  const paper = modal.querySelector(".modal-paper");
  if (window.gsap && paper && !modal.classList.contains("hidden")) {
    gsap.killTweensOf([modal, paper]);
    gsap.to(paper, { scale: 0.92, opacity: 0, y: 10, duration: 0.18, ease: "power2.in" });
    gsap.to(modal, { 
      opacity: 0, 
      duration: 0.18, 
      ease: "power2.in", 
      onComplete: () => {
        modal.classList.add("hidden");
        gsap.set(modal, { opacity: 1 });
        gsap.set(paper, { opacity: 1, scale: 1, y: 0 });
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

function openLeaderboardModal() {
  playSound('click');
  openModalWithGSAP("leaderboard-modal");
  fetchLeaderboardData(false);
}

function closeLeaderboardModal() {
  closeModalWithGSAP("leaderboard-modal");
}

function getLocalLeaderboardPool() {
  let list = [];
  
  // 1. Try cached remote leaderboard
  try {
    const raw = localStorage.getItem("hangman_cached_leaderboard");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(item => {
          if (item && (item.name || item.email)) {
            const pName = String(item.name || item.email.split("@")[0] || "ผู้เรียน");
            // Filter out any legacy mock demo names
            if (!pName.includes("คุณครูผู้สอน") && !pName.includes("นักเรียนดีเด่น") && !pName.includes("คุณานนท์ 2/5")) {
              list.push({
                name: pName,
                email: String(item.email || "").toLowerCase(),
                score: Number(item.score) || 0,
                streak: Number(item.streak) || 1,
                maxStreak: Number(item.maxStreak) || Number(item.streak) || 1
              });
            }
          }
        });
      }
    }
  } catch(e) {}

  // 2. Add real local registered users
  try {
    const storedUsers = JSON.parse(localStorage.getItem("hangman_registered_users") || "[]");
    if (Array.isArray(storedUsers)) {
      storedUsers.forEach(u => {
        if (u && (u.name || u.email)) {
          const uEmail = String(u.email || "").toLowerCase();
          const uName = String(u.name || "ผู้เรียน");
          if (!list.some(p => (uEmail && p.email === uEmail) || p.name === uName)) {
            list.push({
              name: uName,
              email: uEmail,
              score: Number(u.score) || 0,
              streak: Number(u.streak) || 1,
              maxStreak: Number(u.maxStreak) || Number(u.streak) || 1
            });
          }
        }
      });
    }
  } catch(e) {}

  // 3. Ensure current active user is always present
  const currentEmail = String(userEmail || (currentUser && currentUser.email) || "").toLowerCase();
  const currentName = String(userName || (currentUser && currentUser.name) || "ผู้เรียนทั่วไป");
  const currentScore = Number(score) || (currentUser && Number(currentUser.score)) || 0;
  const currentStreak = Number(maxStreak) || Number(streak) || 1;

  const userIdx = list.findIndex(p => (currentEmail && p.email === currentEmail) || p.name === currentName);
  if (userIdx >= 0) {
    list[userIdx].score = Math.max(Number(list[userIdx].score) || 0, currentScore);
    list[userIdx].streak = Math.max(Number(list[userIdx].streak) || 0, currentStreak);
    list[userIdx].name = currentName;
    list[userIdx].isCurrent = true;
  } else {
    list.push({
      name: currentName,
      email: currentEmail,
      score: currentScore,
      streak: currentStreak,
      maxStreak: currentStreak,
      isCurrent: true
    });
  }

  // Sort descending by score
  list.sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
  return list;
}

async function fetchLeaderboardData(isManualRefresh = false) {
  const c = document.getElementById("leaderboard-list");
  const statusEl = document.getElementById("leaderboard-sync-status");
  const refreshBtn = document.getElementById("leaderboard-refresh-btn");
  if (!c) return;

  if (refreshBtn && isManualRefresh) {
    refreshBtn.classList.add("animate-spin");
    setTimeout(() => refreshBtn.classList.remove("animate-spin"), 1000);
  }

  // 1. Render immediately from local / benchmark pool (Guaranteed Instant Display)
  let players = getLocalLeaderboardPool();
  renderLeaderboardRows(players);

  if (statusEl) {
    statusEl.textContent = "● กำลังซิงค์ข้อมูล...";
    statusEl.className = "text-[10px] font-bold text-[#E5AD7A]";
  }

  // 2. Background Sync with GAS
  try {
    if (navigator.onLine) {
      const res = await fetchWithTimeout(GAS_BASE + "?action=getLeaderboard&t=" + Date.now(), {}, 3500);
      if (res.ok) {
        const j = await res.json();
        if (j.status === "success" && Array.isArray(j.data) && j.data.length > 0) {
          localStorage.setItem("hangman_cached_leaderboard", JSON.stringify(j.data));
          players = getLocalLeaderboardPool();
          renderLeaderboardRows(players);
          if (statusEl) {
            statusEl.textContent = "● อัปเดตล่าสุดแล้ว";
            statusEl.className = "text-[10px] font-bold text-[#3D8B6E]";
          }
          if (isManualRefresh) showToast("อัปเดตตารางจัดอันดับล่าสุดเรียบร้อย", "success", 2000);
          return;
        }
      }
    }
  } catch (err) {
    // Graceful fallback to local cache
  }

  if (statusEl) {
    statusEl.textContent = "● โหมดออฟไลน์ / แคชในเครื่อง";
    statusEl.className = "text-[10px] font-bold text-[#7A6677]";
  }
}

function renderLeaderboardRows(players) {
  const c = document.getElementById("leaderboard-list");
  if (!c) return;

  if (!Array.isArray(players) || players.length === 0) {
    players = getLocalLeaderboardPool();
  }

  const currentEmail = String(userEmail || (currentUser && currentUser.email) || "").toLowerCase();
  const currentDisplayName = String(userName || (currentUser && currentUser.name) || "ผู้เรียนทั่วไป");

  // Assign global ranks
  const rankedPlayers = players.map((p, idx) => {
    const pScore = Number(p.score) || 0;
    const rankInfo = getPlayerRankInfo(pScore);
    return {
      ...p,
      globalRank: idx + 1,
      rankInfo,
      scoreNum: pScore
    };
  });

  let html = "";

  LEAGUE_DIVISIONS.forEach(div => {
    const divPlayers = rankedPlayers.filter(p => p.rankInfo.level >= div.minLevel && p.rankInfo.level <= div.maxLevel);
    if (!divPlayers.length) return;

    // League Tier Header (Rank Divisions)
    html += `
      <div class="tier-header ${div.hdrClass}">
        <div class="flex items-center gap-2 font-black text-xs sm:text-sm">
          <span class="text-base sm:text-lg drop-shadow-xs">${div.icon}</span>
          <span class="tracking-wide">${div.name}</span>
          <span class="text-[10px] font-bold opacity-75 hidden sm:inline">(${div.range})</span>
        </div>
        <span class="text-[10px] font-black px-2.5 py-0.5 bg-white/90 border border-slate-200/60 rounded-full shadow-xs text-[#5E4B5B]">
          ${divPlayers.length} คน
        </span>
      </div>
    `;

    // Players inside this League Tier
    divPlayers.forEach(p => {
      const pName = String(p.name || p.email || "ผู้เรียน");
      const pStreak = Number(p.streak) || Number(p.maxStreak) || 1;
      const isSelf = Boolean(p.isCurrent || (currentEmail && p.email && String(p.email).toLowerCase() === currentEmail) || (pName === currentDisplayName));
      const rankNum = p.globalRank;

      let rankBadgeClass = "bg-white/80 border-slate-200 text-[#7A6677]";
      if (rankNum === 1) rankBadgeClass = "bg-gradient-to-r from-[#FFF1E6] to-[#FCD8C1] border-[#E5AD7A] text-[#A8503E]";
      else if (rankNum === 2) rankBadgeClass = "bg-gradient-to-r from-[#F0F3F8] to-[#CBD1DE] border-[#B3B9C9] text-[#5E4B5B]";
      else if (rankNum === 3) rankBadgeClass = "bg-gradient-to-r from-[#F8EFF4] to-[#CCA8B9] border-[#A37B8F] text-[#5E4B5B]";

      html += `
        <div class="p-3 border border-white/95 rounded-2xl flex justify-between items-center gap-2.5 text-xs font-bold transition-all mb-1.5 ${isSelf ? 'bg-gradient-to-r from-[#FFF4EC] to-[#FCD8C1] border-[#E5AD7A] shadow-sm ring-2 ring-[#E5AD7A]/50' : 'bg-white/85 shadow-sm hover:bg-white'}">
          <div class="flex items-center gap-2.5 min-w-0 flex-1 text-left">
            <span class="text-xs font-black px-2 py-0.5 border rounded-full shrink-0 ${rankBadgeClass}">#${rankNum}</span>
            <div class="flex flex-col min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-sm font-black text-[#5E4B5B] truncate">${pName}</span>
                ${isSelf ? '<span class="text-[10px] bg-[#C26754] text-white px-2 py-0.5 rounded-full inline-block font-black shrink-0">คุณ</span>' : ''}
                <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border shadow-xs shrink-0 ${p.rankInfo.badgeClass}">
                  ${p.rankInfo.fullLabel}
                </span>
              </div>
              <div class="text-[10px] text-[#998495] flex items-center gap-2 mt-0.5 font-semibold">
                <span>🔥 Streak ${pStreak} วัน</span>
              </div>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="text-base font-black text-[#5E4B5B]">${p.scoreNum}</span>
            <span class="text-[9px] block text-[#998495] font-bold">PTS</span>
          </div>
        </div>
      `;
    });
  });

  c.innerHTML = html;
}

function formatVaultClueHTML(clueString) {
  if (!clueString) return "";
  const match = clueString.match(/^\(([^)]+(?:\([^)]+\))?)\)\s*(.*)$/);
  if (match) {
    const pos = match[1];
    const meaning = match[2];
    return '<div class="flex items-center gap-1.5 flex-wrap mt-1"><span class="text-[10px] font-bold px-1.5 py-0.5 bg-[#FFF4EC] text-[#A8503E] border border-[#FCD8C1] rounded">' + pos + '</span><span class="text-xs sm:text-sm font-bold text-[#5E4B5B]">' + meaning + '</span></div>';
  }
  return '<div class="mt-1 text-xs sm:text-sm font-bold text-[#5E4B5B]">' + clueString + '</div>';
}

let vaultActiveCategory = "ALL";

function openVaultModal() {
  playSound('click');
  renderVaultCategoryPills();
  renderVaultList();
  openModalWithGSAP("vault-modal");
}

function closeVaultModal() {
  closeModalWithGSAP("vault-modal");
}

function renderVaultCategoryPills() {
  const container = document.getElementById("vault-category-pills");
  if (!container) return;
  
  const categories = Array.from(new Set(WORD_DATABASE.map(i => i.category).filter(Boolean)));
  const allList = [{ name: "ALL", label: "ทั้งหมด (" + WORD_DATABASE.length + ")" }];
  categories.forEach(cat => {
    const cnt = WORD_DATABASE.filter(i => i.category === cat).length;
    allList.push({ name: cat, label: cat + " (" + cnt + ")" });
  });

  container.innerHTML = "";
  allList.forEach(item => {
    const pill = document.createElement("button");
    const isActive = (item.name === vaultActiveCategory);
    pill.className = "vault-pill " + (isActive ? "active" : "");
    pill.textContent = item.label;
    pill.onclick = () => {
      playSound('click');
      vaultActiveCategory = item.name;
      renderVaultCategoryPills();
      renderVaultList();
    };
    container.appendChild(pill);
  });
}

function renderVaultList() {
  const q = (document.getElementById("vault-search").value || "").trim().toLowerCase();
  const c = document.getElementById("vault-list");
  if (!c) return;

  let filtered = WORD_DATABASE;
  if (vaultActiveCategory !== "ALL") {
    filtered = filtered.filter(i => i.category === vaultActiveCategory);
  }
  if (q) {
    filtered = filtered.filter(i => i.word.toLowerCase().includes(q) || i.clue.toLowerCase().includes(q));
  }

  if (!filtered.length) {
    c.innerHTML = '<p class="text-xs text-[#998495] text-center py-6">ไม่พบคำศัพท์ที่ค้นหาในหมวดหมู่นี้</p>';
    return;
  }

  const starSVG = '<svg class="w-3.5 h-3.5 fill-[#E5AD7A] stroke-[#C26754] inline-block shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

  // Group by category if viewing ALL and no search query active
  if (vaultActiveCategory === "ALL" && !q) {
    const grouped = {};
    filtered.forEach(item => {
      const cat = item.category || "ทั่วไป";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    let html = "";
    Object.keys(grouped).forEach(cat => {
      const items = grouped[cat];
      html += `
        <div class="vault-category-divider">
          <span class="flex items-center gap-1.5 text-[#5E4B5B]">
            ${getCategoryIconSVG(cat)}
            <span>${cat}</span>
          </span>
          <span class="text-[10px] font-black px-2 py-0.5 bg-white/90 border border-slate-200/90 rounded-full text-[#7A6677] shadow-sm">
            ${items.length} คำ
          </span>
        </div>
      `;

      items.forEach(item => {
        html += buildVaultCardHTML(item, starSVG);
      });
    });

    c.innerHTML = html;
  } else {
    let html = "";
    filtered.forEach(item => {
      html += buildVaultCardHTML(item, starSVG);
    });
    c.innerHTML = html;
  }
}

function buildVaultCardHTML(item, starSVG) {
  const srs = getWordSRS(item.word);
  const boxNum = srs.box || 0;
  const isMastered = boxNum >= 2;

  let boxBadge = '';
  if (boxNum === 0) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-700">Box 0</span>';
  else if (boxNum === 1) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-[#FFF2EE] border border-[#F5B5A6] rounded text-[#A8503E]">Box 1 (1 วัน)</span>';
  else if (boxNum === 2) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-[#FFF8F2] border border-[#FDE0C8] rounded text-[#C26754]">Box 2 (3 วัน)</span>';
  else if (boxNum === 3) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-[#F2F5F9] border border-[#CBD1DE] rounded text-[#7B859C]">Box 3 (7 วัน)</span>';
  else if (boxNum === 4) boxBadge = '<span class="text-[9px] font-extrabold px-1.5 py-0.5 bg-[#F0F8F4] border border-[#C2E2D4] rounded text-[#3D8B6E]">Box 4 (14 วัน)</span>';

  const unitBadge = item.unit ? '<span class="text-[10px] font-black px-1.5 py-0.5 bg-[#F8EFF4] border border-[#CCA8B9] text-[#A37B8F] rounded-md">' + formatUnitLabel(item.unit) + '</span>' : '';

  return `
    <div class="p-3.5 border border-white/95 rounded-2xl bg-white/85 backdrop-blur flex justify-between items-center gap-3 text-xs shadow-sm hover:shadow transition-all">
      <div class="flex-1 min-w-0 text-left">
        <div class="flex items-center gap-1.5 flex-wrap font-bold text-sm text-[#5E4B5B]">
          <span class="font-black tracking-wide text-base">${item.word}</span>
          ${isMastered ? starSVG : ''}
          ${unitBadge}
          <span class="text-[10px] font-bold px-1.5 py-0.5 bg-[#FFF4EC] text-[#A8503E] border border-[#FCD8C1] rounded-md">${item.category}</span>
          ${boxBadge}
        </div>
        ${formatVaultClueHTML(item.clue)}
      </div>
      <button onclick="speakText('${item.word}')" class="audio-btn shrink-0" title="ฟังเสียงอ่าน">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
      </button>
    </div>
  `;
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
    document.querySelectorAll(".modal-overlay:not(.hidden)").forEach(modal => {
      if (!modal.id.includes("login")) {
        closeModalWithGSAP(modal.id);
      }
    });
    return;
  }

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

// ─── Screen Navigation & Modal Controllers ──────────────────────────────────
function toggleRulesDropdown() {
  const content = document.getElementById("rules-dropdown-content");
  const arrow = document.getElementById("rules-dropdown-arrow");
  const btnText = document.getElementById("rules-dropdown-btn-text");
  if (!content) return;
  
  playSound('click');

  const isOpen = content.style.gridTemplateRows === "1fr";
  
  if (isOpen) {
    content.style.gridTemplateRows = "0fr";
    content.style.opacity = "0";
    if (arrow) arrow.classList.remove("rotate-180");
    if (btnText) btnText.textContent = "ดูกติกา";
  } else {
    content.style.gridTemplateRows = "1fr";
    content.style.opacity = "1";
    if (arrow) arrow.classList.add("rotate-180");
    if (btnText) btnText.textContent = "ปิดกติกา";
  }
}

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
    isTestMode = false;
    testQuestionsState = [];
    const testPal = document.getElementById("test-palette-card");
    if (testPal) testPal.classList.add("hidden");
    const nFoot = document.getElementById("normal-game-footer");
    if (nFoot) nFoot.classList.remove("hidden");
    const tFoot = document.getElementById("test-game-footer");
    if (tFoot) tFoot.classList.add("hidden");

    activeSection = category;
    renderSectionTabs();
    initGame();
    goToGame();
  });
}

// ─── Test Mode (Pre-test / Post-test Assessment System) ───────────────────────
function openTestModal() {
  playSound('click');
  selectAssessmentType(selectedAssessmentType || 'pre');
  openModalWithGSAP("test-modal");
}

function closeTestModal() {
  closeModalWithGSAP("test-modal");
}

function selectAssessmentType(type) {
  playSound('click');
  selectedAssessmentType = type;
  
  const preBtn = document.getElementById("test-type-pre");
  const postBtn = document.getElementById("test-type-post");
  const checkPre = document.getElementById("test-check-pre");
  const checkPost = document.getElementById("test-check-post");
  const btnText = document.getElementById("start-test-btn-text");

  if (type === "pre") {
    if (preBtn) {
      preBtn.className = "test-type-card active p-3.5 rounded-2xl border-2 border-[#7B859C] bg-gradient-to-br from-[#F0F3F8] to-[#D5DAE6] text-left transition-all cursor-pointer shadow-sm";
    }
    if (postBtn) {
      postBtn.className = "test-type-card p-3.5 rounded-2xl border-2 border-slate-200 bg-white/80 text-left transition-all cursor-pointer shadow-xs hover:border-[#E5AD7A]";
    }
    if (checkPre) checkPre.classList.remove("hidden");
    if (checkPost) checkPost.classList.add("hidden");
    if (btnText) btnText.textContent = "เริ่มทำแบบทดสอบก่อนเรียน (Pre-test) 🚀";
  } else {
    if (preBtn) {
      preBtn.className = "test-type-card p-3.5 rounded-2xl border-2 border-slate-200 bg-white/80 text-left transition-all cursor-pointer shadow-xs hover:border-[#7B859C]";
    }
    if (postBtn) {
      postBtn.className = "test-type-card active p-3.5 rounded-2xl border-2 border-[#C26754] bg-gradient-to-br from-[#FFF1E6] to-[#FCD8C1] text-left transition-all cursor-pointer shadow-sm";
    }
    if (checkPre) checkPre.classList.add("hidden");
    if (checkPost) checkPost.classList.remove("hidden");
    if (btnText) btnText.textContent = "เริ่มทำแบบทดสอบหลังเรียน (Post-test) 🚀";
  }
}

function startAssessmentTest() {
  isTestMode = true;
  testStartTime = Date.now();

  // Initialize the 20 test questions independently
  testQuestionsState = ASSESSMENT_20_WORDS.map((item, idx) => {
    const w = item.word.toUpperCase();
    const revealed = new Array(w.length).fill(false);
    revealed[0] = true; // First letter is opened as standard clue
    let targetIdx = 1;
    while (targetIdx < w.length && revealed[targetIdx]) targetIdx++;

    return {
      index: idx,
      word: w,
      clue: item.clue,
      category: item.category,
      unit: item.unit,
      revealedTiles: revealed,
      userGuesses: [],
      currentTileIndex: targetIdx,
      mistakes: 0,
      activeKeys: generateKeyPool(w),
      isCompleted: false,
      isWon: false,
      status: "unanswered"
    };
  });

  testCurrentIndex = 0;

  closeModalWithGSAP("test-modal", () => {
    const typeTitle = selectedAssessmentType === "pre" ? "แบบทดสอบก่อนเรียน (Pre-test)" : "แบบทดสอบหลังเรียน (Post-test)";
    showToast(`📝 เริ่มต้น ${typeTitle} 20 ข้อ!`, "info", 3000);
    
    // Switch game UI to test layout
    const testPal = document.getElementById("test-palette-card");
    if (testPal) testPal.classList.remove("hidden");
    const nFoot = document.getElementById("normal-game-footer");
    if (nFoot) nFoot.classList.add("hidden");
    const tFoot = document.getElementById("test-game-footer");
    if (tFoot) tFoot.classList.remove("hidden");

    loadTestQuestion(0);
    goToGame();
  });
}

function updateTestFooterButtons() {
  if (!isTestMode || !testQuestionsState) return;
  const answeredCount = testQuestionsState.filter(q => q.isCompleted).length;
  const allDone = answeredCount >= testQuestionsState.length;
  const prevBtn = document.getElementById("test-prev-btn");
  const nextBtn = document.getElementById("test-next-btn");
  if (allDone) {
    // Hide prev/next when all 20 questions are answered
    if (prevBtn) prevBtn.classList.add("hidden");
    if (nextBtn) nextBtn.classList.add("hidden");
  } else {
    // Show prev/next when there are still unanswered questions
    if (prevBtn) prevBtn.classList.remove("hidden");
    if (nextBtn) nextBtn.classList.remove("hidden");
  }
}

function loadTestQuestion(index) {
  if (!testQuestionsState || !testQuestionsState[index]) return;
  const q = testQuestionsState[index];
  testCurrentIndex = index;

  currentItem = {
    word: q.word,
    clue: q.clue,
    category: q.category,
    unit: q.unit
  };
  secretWord = q.word;
  revealedTiles = [...q.revealedTiles];
  currentTileIndex = q.currentTileIndex;
  mistakes = q.mistakes;
  activeKeys = [...q.activeKeys];
  isGameOver = q.isCompleted;
  comboCount = 0;

  // Header & tags
  const typeLabel = selectedAssessmentType === "pre" ? "PRE-TEST" : "POST-TEST";
  document.getElementById("category-tag").textContent = `📝 ${typeLabel} · ${q.category}`;
  document.getElementById("session-progress").textContent = `ข้อที่ ${index + 1}/20`;
  
  const testBadge = document.getElementById("test-type-badge");
  if (testBadge) {
    testBadge.textContent = typeLabel;
    testBadge.className = selectedAssessmentType === "pre" 
      ? "text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#7B859C] text-white"
      : "text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#C26754] text-white";
  }

  const testProg = document.getElementById("test-progress-text");
  if (testProg) testProg.textContent = `ข้อที่ ${index + 1}/20`;

  const ansCount = testQuestionsState.filter(item => item.isCompleted).length;
  const ansCountEl = document.getElementById("test-answered-count");
  if (ansCountEl) ansCountEl.textContent = `(ตอบแล้ว ${ansCount}/20)`;

  document.getElementById("clue-text").innerHTML = formatClueHTML(currentItem.clue);

  const statusEl = document.getElementById("status");
  if (q.isCompleted) {
    if (q.isWon) {
      statusEl.innerHTML = '<div class="stamp-banner stamp-win"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>ข้อนี้สะกดถูกต้องแล้ว ✓</span></div>';
    } else {
      statusEl.innerHTML = '<div class="stamp-banner stamp-lose"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><span>ข้อนี้หมดหัวใจแล้ว — ' + q.word + '</span></div>';
    }
  } else {
    statusEl.innerHTML = "";
  }

  updateDisplay();
  renderKeyboard();
  updateLivesDisplay();
  updateHangmanSVG(mistakes, mistakes >= MAX_MISTAKES);
  updateKeyboardDisabledStates();
  renderTestPalette();
  
  if (q.isCompleted) {
    document.querySelectorAll("#keyboard button").forEach(b => disableKeyButton(b));
    flipAllTilesSequentially(!q.isWon);
  }
}

function jumpToTestQuestion(newIndex) {
  if (newIndex < 0 || newIndex >= testQuestionsState.length) return;
  playSound('click');
  
  // Save current question state before switching
  if (testQuestionsState[testCurrentIndex]) {
    const curr = testQuestionsState[testCurrentIndex];
    curr.revealedTiles = [...revealedTiles];
    curr.currentTileIndex = currentTileIndex;
    curr.mistakes = mistakes;
  }

  loadTestQuestion(newIndex);
}

function prevTestQuestion() {
  if (testCurrentIndex > 0) {
    jumpToTestQuestion(testCurrentIndex - 1);
  } else {
    jumpToTestQuestion(testQuestionsState.length - 1);
  }
}

function nextTestQuestion() {
  if (testCurrentIndex < testQuestionsState.length - 1) {
    jumpToTestQuestion(testCurrentIndex + 1);
  } else {
    jumpToTestQuestion(0);
  }
}

function findNextUnansweredQuestion(fromIndex) {
  const len = testQuestionsState.length;
  for (let step = 1; step < len; step++) {
    const checkIdx = (fromIndex + step) % len;
    if (!testQuestionsState[checkIdx].isCompleted) {
      return checkIdx;
    }
  }
  return -1;
}

function renderTestPalette() {
  const container = document.getElementById("test-question-chips");
  if (!container || !isTestMode || !testQuestionsState) return;

  container.innerHTML = testQuestionsState.map((q, idx) => {
    let cls = "test-chip";
    if (idx === testCurrentIndex) {
      cls += " is-active";
    }
    if (q.isCompleted) {
      if (q.isWon) {
        cls += " is-completed";
      } else {
        cls += " is-failed";
      }
    } else if (q.status === "in_progress") {
      cls += " is-touched";
    }

    return `<button type="button" onclick="jumpToTestQuestion(${idx})" class="${cls}" title="ข้อที่ ${idx + 1}">${idx + 1}</button>`;
  }).join("");

  const ansCount = testQuestionsState.filter(item => item.isCompleted).length;
  const ansCountEl = document.getElementById("test-answered-count");
  if (ansCountEl) ansCountEl.textContent = `(ตอบแล้ว ${ansCount}/20)`;

  // Update footer buttons: hide prev/next when all 20 are done
  updateTestFooterButtons();
}

function confirmSubmitTest() {
  playSound('click');
  const answeredCount = testQuestionsState.filter(q => q.isCompleted).length;
  const total = testQuestionsState.length;
  
  const msgEl = document.getElementById("test-confirm-msg");
  if (msgEl) {
    if (answeredCount < total) {
      msgEl.innerHTML = `คุณทำไปแล้ว <strong class="text-[#C26754] font-black">${answeredCount}/${total} ข้อ</strong> (ยังเหลืออีก ${total - answeredCount} ข้อ)<br>ต้องการส่งแบบทดสอบเลยหรือไม่?`;
    } else {
      msgEl.innerHTML = `คุณทำครบทั้ง <strong class="text-[#3D8B6E] font-black">20 ข้อ</strong> เรียบร้อยแล้ว!<br>พร้อมส่งแบบทดสอบและบันทึกคะแนนใช่หรือไม่?`;
    }
  }
  openModalWithGSAP("test-confirm-modal");
}

async function submitAssessmentTestFinal() {
  closeModalWithGSAP("test-confirm-modal");

  const total = testQuestionsState.length;
  const correct = testQuestionsState.filter(q => q.isWon).length;
  const wrong = total - correct;
  const pct = Math.round((correct / total) * 100);
  const elapsedSec = Math.round((Date.now() - testStartTime) / 1000);
  const mins = Math.floor(elapsedSec / 60);
  const secs = elapsedSec % 60;
  const timeStr = mins > 0 ? `${mins}:${secs < 10 ? '0' : ''}${secs} นาที` : `${secs} วินาที`;

  // Grade Assessment
  let gradeText = "🌟 ยอดเยี่ยมไร้ที่ติ (Grade A+)";
  let badgeClass = "bg-[#F0F8F4] text-[#1B4D3E] border-[#3D8B6E]";
  if (pct < 50) {
    gradeText = "💪 ต้องพยายามฝึกฝนเพิ่มเติมนะ (Grade F)";
    badgeClass = "bg-[#FFF2EE] text-[#A8503E] border-[#F5B5A6]";
  } else if (pct < 70) {
    gradeText = "👌 ผ่านเกณฑ์พื้นฐาน (Grade C)";
    badgeClass = "bg-[#FFF8F2] text-[#C26754] border-[#FCD8C1]";
  } else if (pct < 85) {
    gradeText = "👍 ทำได้ดีมาก (Grade B)";
    badgeClass = "bg-[#F0F3F8] text-[#384257] border-[#7B859C]";
  } else if (pct < 100) {
    gradeText = "✨ ยอดเยี่ยมมาก (Grade A)";
    badgeClass = "bg-[#F0F8F4] text-[#244C3D] border-[#7EBDA4]";
  }

  const scoreEl = document.getElementById("test-result-score-num");
  const totalEl = document.getElementById("test-result-total-num");
  const pctEl = document.getElementById("test-result-percentage");
  if (scoreEl) scoreEl.textContent = correct;
  if (totalEl) totalEl.textContent = total;
  if (pctEl) pctEl.textContent = `ความแม่นยำ ${pct}% · ใช้เวลา ${timeStr}`;
  
  const gradeBadge = document.getElementById("test-result-grade-badge");
  if (gradeBadge) {
    gradeBadge.textContent = gradeText;
    gradeBadge.className = `inline-block text-xs font-black px-3 py-1 border rounded-full shadow-xs mb-2 ${badgeClass}`;
  }

  const resCorr = document.getElementById("test-res-correct");
  const resWrong = document.getElementById("test-res-wrong");
  const resXP = document.getElementById("test-res-xp");
  if (resCorr) resCorr.textContent = correct;
  if (resWrong) resWrong.textContent = wrong;
  if (resXP) resXP.textContent = "+" + (correct * 15);

  const subTitleEl = document.getElementById("test-result-subtitle");
  if (subTitleEl) {
    const typeName = selectedAssessmentType === "pre" ? "แบบทดสอบก่อนเรียน (Pre-test)" : "แบบทดสอบหลังเรียน (Post-test)";
    subTitleEl.textContent = `สรุปผล ${typeName} 20 ข้อ`;
  }

  // Words list breakdown
  const listEl = document.getElementById("test-result-words-list");
  if (listEl) {
    listEl.innerHTML = testQuestionsState.map((q, idx) => {
      const icon = q.isWon 
        ? `<span class="w-5 h-5 rounded-full bg-[#E8F6ED] border border-[#7EBDA4] text-[#244C3D] flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">✓</span>`
        : `<span class="w-5 h-5 rounded-full bg-[#FFEAE5] border border-[#F5B5A6] text-[#C26754] flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">✗</span>`;
      return `
        <div class="p-2 rounded-xl border border-white/80 bg-white/70 flex items-center justify-between gap-2 shadow-2xs text-left">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-[10px] font-black text-[#7A6677] w-4 text-center shrink-0">${idx + 1}.</span>
            ${icon}
            <div class="min-w-0">
              <div class="font-black text-xs text-[#5E4B5B] flex items-center gap-1.5">
                <span>${q.word}</span>
                <span class="text-[10px] text-[#998495] font-semibold">${q.category ? `(${q.category})` : ''}</span>
              </div>
              <div class="text-[11px] text-[#7A6677] truncate">${q.clue || ''}</div>
            </div>
          </div>
          <button onclick="speakText('${q.word}')" class="audio-btn !w-6 !h-6 !text-[10px] shrink-0" title="ฟังเสียง">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </button>
        </div>
      `;
    }).join("");
  }

  // Send to Google Sheets Assessment_Records
  sendAssessmentToGAS(selectedAssessmentType, correct);

  if (pct >= 70) {
    triggerConfetti();
    playSound("win");
  } else {
    playSound("lose");
  }

  openModalWithGSAP("test-result-modal");
}

async function sendAssessmentToGAS(testType, scoreNum) {
  const url = GAS_BASE;
  if (!url) return;
  const user = userEmail || userName;
  const payload = {
    action: "recordAssessment",
    email: user,
    testType: testType,
    score: String(scoreNum)
  };

  try {
    const res = await fetchWithTimeout(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }, 8000);
    const data = await res.json();
    if (data && data.status === "success") {
      const syncEl = document.getElementById("test-sync-status");
      if (syncEl) syncEl.innerHTML = `<svg class="w-3.5 h-3.5 text-[#3D8B6E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>บันทึกผลลงในชีต Assessment_Records เรียบร้อยแล้ว</span>`;
    }
  } catch(err) {
    // GET fallback
    try {
      const getUrl = `${url}?action=recordAssessment&email=${encodeURIComponent(user)}&testType=${encodeURIComponent(testType)}&score=${encodeURIComponent(scoreNum)}`;
      const img = new Image();
      img.src = getUrl;
    } catch(e) {}
  }
}

function finishTestAndGoHome() {
  closeModalWithGSAP("test-result-modal", () => {
    isTestMode = false;
    testQuestionsState = [];
    goToHome();
  });
}

function retakeTestMode() {
  closeModalWithGSAP("test-result-modal", () => {
    startAssessmentTest();
  });
}

function goToGame() {
  const home = document.getElementById('home-screen');
  const game = document.getElementById('game-screen');
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
          { scale: 0.94, opacity: 0, y: 16 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }
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
  isTestMode = false;
  testQuestionsState = [];
  const testPal = document.getElementById("test-palette-card");
  if (testPal) testPal.classList.add("hidden");
  const nFoot = document.getElementById("normal-game-footer");
  if (nFoot) nFoot.classList.remove("hidden");
  const tFoot = document.getElementById("test-game-footer");
  if (tFoot) tFoot.classList.add("hidden");

  const home = document.getElementById('home-screen');
  const game = document.getElementById('game-screen');
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
          { scale: 0.94, opacity: 0, y: 16 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }
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
  // 3D Flip Card Entrance: Starts flipped 180deg and flips face up sequentially!
  gsap.fromTo(".cutout-letter",
    { 
      rotateY: 180, 
      scale: 0.7, 
      y: -12, 
      opacity: 0,
      boxShadow: "0 14px 28px rgba(94, 75, 91, 0.25)"
    },
    { 
      rotateY: 0, 
      scale: 1, 
      y: 0, 
      opacity: 1, 
      boxShadow: "0 4px 12px rgba(94, 75, 91, 0.1), 0 1px 2px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)",
      duration: 0.6, 
      stagger: { each: 0.06, from: "start" }, 
      ease: "back.out(1.5)", 
      clearProps: "transform,opacity,boxShadow" 
    }
  );
  gsap.fromTo(".home-card",
    { y: 24, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, delay: 0.35, ease: "back.out(1.4)", clearProps: "transform,opacity" }
  );
}

// ─── Playful Idle Letter 3D Flip Animation (Every 30 Seconds) ────────────────
function triggerTitleFlipAnimation() {
  const letters = document.querySelectorAll("#home-screen .cutout-letter");
  if (!letters || letters.length === 0) return;
  
  const homeScreen = document.getElementById("home-screen");
  if (homeScreen && homeScreen.classList.contains("hidden")) return;

  if (window.gsap) {
    const tl = gsap.timeline();
    // 3D Flip each letter 360 degrees one by one, with elevation pop and shadow
    tl.to(letters, {
      rotateY: "+=360",
      y: -8,
      scale: 1.14,
      boxShadow: "0 12px 24px rgba(94, 75, 91, 0.22), 0 0 16px rgba(229, 173, 122, 0.6)",
      duration: 0.45,
      stagger: {
        each: 0.08,
        from: "start"
      },
      ease: "power2.inOut"
    })
    .to(letters, {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 12px rgba(94, 75, 91, 0.1), 0 1px 2px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)",
      duration: 0.35,
      stagger: {
        each: 0.08,
        from: "start"
      },
      ease: "back.out(1.4)",
      clearProps: "transform,boxShadow"
    }, "-=0.28");
  }
}

// Trigger 3D flip every 30 seconds
setInterval(triggerTitleFlipAnimation, 30000);

// Interactive click to flip immediately
const titleLettersWrap = document.querySelector("#home-screen .flex.flex-col.items-center.justify-center.gap-2.my-4");
if (titleLettersWrap) {
  titleLettersWrap.style.cursor = "pointer";
  titleLettersWrap.setAttribute("title", "แตะเพื่อดูเอฟเฟกต์พลิกตัวอักษร 3D");
  titleLettersWrap.addEventListener("click", () => {
    playSound("click");
    triggerTitleFlipAnimation();
  });
}
