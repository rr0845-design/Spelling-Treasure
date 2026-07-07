/**
 * 🚀 Spelling Master (Vivid Wonderland Update)
 * Digital Signature: Antigravity (AI Assistant)
 * Last Modified: July 2026
 * Features: Auth, Audio, GSAP Animations, Auto-Shrink Responsive, Physical Keyboard Feedback
 */
// 🔗 เชื่อมต่อกับ Google Apps Script ของคุณครู
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxa9HhI_ddfU6kPD76FDbWoIejWgsh2NU9qbfDkfVn1RG80nKV9UltGnLKe3ofXtDUMJA/exec';

let wordList = [];
let wordResults = []; 
let userEmail = ""; 
let userName = ""; 
let dailyStreak = 0;
const blockColors = ['color-pink', 'color-mint', 'color-yellow', 'color-blue', 'color-purple', 'color-orange'];

// 🎵 Audio System (10/10 Upgrade)
const soundCorrect = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-video-game-quest-completed-notification-206.wav');
const soundWrong = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-interface-click-soft-2575.wav');
const bgmMusic = new Audio('https://assets.mixkit.co/music/preview/mixkit-game-level-music-689.mp3');
bgmMusic.loop = true;
bgmMusic.volume = 0.2;

let sfxEnabled = true;
let bgmEnabled = false; 
let hardModeEnabled = false;

// 🎮 Game State
let currentIndex = 0;
let targetWord = "";
let guessedLetters = new Set();
let mistakes = 0;
const MAX_MISTAKES = 5;
let score = 0;
let totalWords = 20; 
let isInputLocked = false;
let currentStreak = 0; // 🔥 Streak System

// 📝 Test Room State
let isTestMode = false;
let currentTestType = "";
let testScore = 0;

// ⏱️ Timer State
let timeLeft = 60;
let timerInterval;
let timerTween;
let isPaused = false;
let hintsLeft = 3; 

// --- 💾 LocalStorage Buffer (Save locally, sync to GAS only on complete/HOME) ---
const LS_KEY = 'spellingmaster_pending';

function saveToLocalBuffer() {
    if (!userEmail || wordResults.length === 0) return;
    const pending = {
        email: userEmail,
        results: [...wordResults],
        savedAt: Date.now()
    };
    localStorage.setItem(LS_KEY, JSON.stringify(pending));
    // ❌ ไม่ส่ง GAS ที่นี่ — ส่งเฉพาะตอนจบ 20 คำ หรือกด HOME เท่านั้น
}

// --- 📱 Screen Flow & Settings ---
window.onload = () => {
    // ตรวจสอบ pending buffer จากเซสชันก่อนหน้า (กรณีปิดหน้าก่อน sync เสร็จ)
    const pending = localStorage.getItem(LS_KEY);
    if (pending) {
        try {
            const data = JSON.parse(pending);
            // ถ้าข้อมูลค้างไม่เกิน 24 ชั่วโมง ให้ลอง sync ใหม่
            if (data && data.savedAt && (Date.now() - data.savedAt) < 86400000) {
                console.log('📦 Found pending buffer from last session, retrying sync...');
                fetch(`${GAS_URL}?action=updateProgress&email=${encodeURIComponent(data.email)}&updates=${encodeURIComponent(JSON.stringify(data.results))}&t=${Date.now()}`)
                    .then(r => r.json())
                    .then(json => { if (json && json.status === 'success') localStorage.removeItem(LS_KEY); })
                    .catch(() => {});
            } else {
                localStorage.removeItem(LS_KEY); // ข้อมูลเก่าเกินไป ลบทิ้ง
            }
        } catch(e) { 
            // JSON เสียหาย ไม่สามารถ sync ได้ แต่ไม่ลบตามกฎ localStorage โดยไม่ผ่าน GAS
            console.warn('⚠️ localStorage buffer corrupted, cannot recover.');
        }
    }

    setTimeout(() => {
        gsap.to("#splash-screen", { opacity: 0, duration: 0.5, onComplete: () => {
            document.getElementById('splash-screen').classList.add('hidden');
            if (!userEmail) {
                document.getElementById('login-overlay').classList.remove('hidden');
                gsap.from("#login-overlay", { opacity: 0, duration: 0.3 });
            } else {
                document.getElementById('home-screen').classList.remove('hidden');
                gsap.from("#home-screen", { opacity: 0, scale: 0.9, duration: 0.5 });
            }
        }});
    }, 2000);
};

function startGameFlow() {
    isTestMode = false;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    resetGameStats();
    loadWord();
    if(bgmEnabled) bgmMusic.play().catch(()=>{});
}

function startTestMode(type) {
    if (!userEmail) {
        document.getElementById('test-room-modal').classList.add('hidden');
        document.getElementById('home-screen').classList.add('hidden');
        document.getElementById('login-overlay').classList.remove('hidden');
        gsap.from("#login-overlay", { opacity: 0, duration: 0.3 });
        return;
    }
    
    currentTestType = type;
    isTestMode = true;
    testScore = 0;
    
    document.getElementById('test-room-modal').classList.add('hidden');
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    
    resetGameStats();
    loadWord();
    if(bgmEnabled) bgmMusic.play().catch(()=>{});
}

function returnToHome() {
    // หยุด timer และ lock input ทันทีเพื่อป้องกัน triggerLose ซ้อนระหว่าง save
    stopTimer();
    isInputLocked = true;
    isPaused = true;

    if (wordResults.length > 0) {
        document.getElementById('pause-modal').classList.add('hidden');
        document.getElementById('result-modal').classList.add('hidden');
        if (isTestMode) submitTestScoreToGAS();
        else saveProgressToGAS();
        return;
    }

    isPaused = false;
    isInputLocked = false;
    bgmMusic.pause();
    document.getElementById('pause-modal').classList.add('hidden');
    document.getElementById('result-modal').classList.add('hidden');
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('hidden');
    gsap.from("#home-screen", { opacity: 0, y: 20, duration: 0.4 });
}

async function restartGame() {
    document.getElementById('pause-modal').classList.add('hidden');
    document.getElementById('result-modal').classList.add('hidden');
    isPaused = false;

    // ถ้ามี progress ค้างอยู่ → ส่ง GAS แบบ fire-and-forget (ไม่รอ) ลบ localStorage หลัง GAS ยืนยันเท่านั้น
    if (wordResults.length > 0) {
        saveToLocalBuffer();
        const payload = [...wordResults];
        const email = userEmail;
        fetch(`${GAS_URL}?action=updateProgress&email=${encodeURIComponent(email)}&updates=${encodeURIComponent(JSON.stringify(payload))}&t=${Date.now()}`)
            .then(r => r.json())
            .then(json => { 
                if (json && json.status === 'success') {
                    localStorage.removeItem(LS_KEY); // ✅ ลบหลัง GAS ยืนยันแล้วเท่านั้น
                }
            })
            .catch(() => {}); // ถ้าล้ม buffer ยังอยู่ retry ตอนเปิดเกมใหม่
    }

    resetGameStats();
    loadWord();
}

function resetGameStats() {
    currentIndex = 0;
    score = 0;
    currentStreak = 0;
    wordResults = [];
    hintsLeft = 3;
    updateScoreDisplay();
    updateHintDisplay();
    updateStreakDisplay();
}

// --- ⚙️ Settings Logic (10/10 Upgrade) ---
function openSettings() {
    document.getElementById('settings-modal').classList.remove('hidden');
    gsap.fromTo("#settings-modal > div", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
}

function closeSettings() {
    document.getElementById('settings-modal').classList.add('hidden');
}

function toggleBGM() {
    bgmEnabled = document.getElementById('toggle-bgm').checked;
    if(bgmEnabled && document.getElementById('game-container').classList.contains('hidden') === false) {
        bgmMusic.play().catch(()=>{});
    } else {
        bgmMusic.pause();
    }
}

function toggleSFX() {
    sfxEnabled = document.getElementById('toggle-sfx').checked;
}

function toggleHardMode() {
    hardModeEnabled = document.getElementById('toggle-hard').checked;
}

function playSound(audio) {
    if (sfxEnabled) {
        audio.currentTime = 0; 
        audio.play().catch(e=>{});
    }
}

// --- 🚧 Coming Soon Logic ---
function openComingSoon(featureName) {
    document.getElementById('coming-soon-text').innerText = featureName + " กำลังอยู่ระหว่างการพัฒนา รอติดตามได้เลย!";
    const modal = document.getElementById('coming-soon-modal');
    modal.classList.remove('hidden');
    gsap.fromTo(modal.children[0], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
}

function closeComingSoon() {
    document.getElementById('coming-soon-modal').classList.add('hidden');
}

// --- 🏆 Leaderboard Logic ---
function openLeaderboard() {
    const modal = document.getElementById('leaderboard-modal');
    modal.classList.remove('hidden');
    gsap.fromTo(modal.children[0], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
    fetchLeaderboard();
}

function closeLeaderboard() {
    document.getElementById('leaderboard-modal').classList.add('hidden');
}

async function fetchLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = `<p class="text-[#60A5FA] font-bold py-4 text-center">⏳ Loading...</p>`;
    try {
        const res = await fetch(`${GAS_URL}?action=getLeaderboard&t=${Date.now()}`);
        const json = await res.json();
        if (json.status === "success") {
            list.innerHTML = "";
            json.data.forEach((player, idx) => {
                let rankDisplay = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx+1}`;
                list.innerHTML += `
                    <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-[#E0F2FE]">
                        <div class="flex items-center gap-3">
                            <span class="text-2xl w-8 text-center">${rankDisplay}</span>
                            <span class="font-black text-[#1E3A8A] truncate max-w-[120px]">${player.name}</span>
                        </div>
                        <span class="font-black text-[#FF3366] text-xl">${player.score} <span class="text-xs text-[#93C5FD]">PTS</span></span>
                    </div>
                `;
            });
            if (json.data.length === 0) list.innerHTML = `<p class="text-center text-[#93C5FD] font-bold py-4">ยังไม่มีข้อมูล</p>`;
        } else {
            list.innerHTML = `<p class="text-center text-[#FF3366] font-bold py-4">❌ ${json.message}</p>`;
        }
    } catch (err) {
        list.innerHTML = `<p class="text-center text-[#FF3366] font-bold py-4">❌ โหลดข้อมูลล้มเหลว กรุณาลองใหม่</p>`;
    }
}

// --- 📝 Test Room Logic ---
function openTestRoom() {
    const modal = document.getElementById('test-room-modal');
    modal.classList.remove('hidden');
    gsap.fromTo(modal.children[0], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
}

function closeTestRoom() {
    document.getElementById('test-room-modal').classList.add('hidden');
}

// --- 🔐 ระบบล็อกอิน (Auth) ---
let currentAuthMode = "login";
function switchTab(mode) {
    currentAuthMode = mode;
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const nameInputContainer = document.getElementById('name-input-container');
    const authTitle = document.getElementById('auth-title');
    
    if (mode === 'login') {
        tabLogin.className = "flex-1 py-2 rounded-full text-white font-black bg-[#3B82F6] shadow-[0_4px_0_#2563EB]";
        tabRegister.className = "flex-1 py-2 rounded-full text-[#60A5FA] font-bold";
        nameInputContainer.classList.add('hidden');
        authTitle.innerText = "LOGIN";
    } else {
        tabRegister.className = "flex-1 py-2 rounded-full text-white font-black bg-[#3B82F6] shadow-[0_4px_0_#2563EB]";
        tabLogin.className = "flex-1 py-2 rounded-full text-[#60A5FA] font-bold";
        nameInputContainer.classList.remove('hidden');
        authTitle.innerText = "SIGN UP";
    }
}

async function submitAuth() {
    const emailInput = document.getElementById('email-input').value.trim();
    const nameInput = document.getElementById('name-input').value.trim();
    if (!emailInput) {
        document.getElementById('auth-error').innerText = "⚠️ กรุณากรอกอีเมล";
        return;
    }
    
    document.getElementById('auth-error').innerText = "";
    document.getElementById('auth-btn-text').innerText = "...";
    try {
        const url = `${GAS_URL}?action=${currentAuthMode}&email=${encodeURIComponent(emailInput)}&name=${encodeURIComponent(nameInput)}&t=${Date.now()}`;
        const response = await fetch(url);
        const json = await response.json();
        
        if (json.status === "success") {
            userEmail = emailInput;
            userName = currentAuthMode === 'register' ? nameInput : json.name;
            dailyStreak = json.streak || 0;
            
            document.getElementById('player-name-display').innerText = userName;
            document.getElementById('home-player-name').innerText = userName;
            document.getElementById('home-streak-display').innerText = `${dailyStreak} Days`;
            
            gsap.to("#login-overlay", { opacity: 0, scale: 1.05, duration: 0.4, onComplete: () => {
                document.getElementById('login-overlay').classList.add('hidden');
                document.getElementById('home-screen').classList.remove('hidden');
                gsap.from("#home-screen", { opacity: 0, scale: 0.9, duration: 0.5 });
            }});
            fetchWordsFromGAS();
        } else {
            document.getElementById('auth-error').innerText = "❌ " + (json.message || "เกิดข้อผิดพลาด");
        }
    } catch (err) {
        document.getElementById('auth-error').innerText = "❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้";
        console.error(err);
    } finally {
        document.getElementById('auth-btn-text').innerText = "PLAY";
    }
}

async function fetchWordsFromGAS() {
    try {
        const response = await fetch(`${GAS_URL}?action=getVocab&email=${userEmail}&hardMode=${hardModeEnabled}&t=${Date.now()}`);
        const json = await response.json();
        if (json.status === "success" && json.data.length > 0) {
            wordList = json.data.map(item => ({
                id: item.id, word: item.v1.toUpperCase(), meaningMain: item.meaningMain || item.meaning
            }));
            totalWords = wordList.length;
            updateScoreDisplay();
        }
    } catch (error) { console.error("Fetch Error:", error); }
}

function updateScoreDisplay() {
    document.getElementById('score-display').innerHTML = `${score.toString().padStart(2, '0')}<span class="text-xs text-[#93C5FD]">/${totalWords.toString().padStart(2, '0')}</span>`;
}

// --- 🔥 Streak System (10/10 Upgrade) ---
function updateStreakDisplay() {
    const badge = document.getElementById('streak-badge');
    if (currentStreak >= 2) {
        badge.innerText = `STREAK x${currentStreak} 🔥`;
        badge.classList.remove('hidden');
        badge.classList.add('animate-fire');
        gsap.fromTo(badge, {scale: 0}, {scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)"});
    } else {
        badge.classList.add('hidden');
        badge.classList.remove('animate-fire');
    }
}

// --- 💡 ระบบช่วยเหลือ (Hint System) ---
function updateHintDisplay() { document.getElementById('hint-count').innerText = hintsLeft; }

function useHint() {
    if (isTestMode) {
        alert("ไม่อนุญาตให้ใช้ตัวช่วยในห้องสอบ!");
        return;
    }
    if (isInputLocked || isPaused || hintsLeft <= 0) return;
    
    let unrevealed = [];
    for (let char of targetWord) {
        if (char !== ' ' && char !== '-' && !guessedLetters.has(char)) unrevealed.push(char);
    }

    if (unrevealed.length > 0) {
        hintsLeft--;
        updateHintDisplay();
        
        let randomChar = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        guessedLetters.add(randomChar);
        currentStreak = 0; // ใช้ Hint สตรีคจะขาดทันที
        updateStreakDisplay();
        
        const buttons = document.querySelectorAll('.gsap-btn');
        buttons.forEach(btn => { if (btn.innerText === randomChar) btn.classList.add('disabled'); });
        renderSlots();
    }
}

// --- ⏸️ ระบบ Pause ---
function togglePause() {
    if (isInputLocked && !isPaused) return; 
    
    isPaused = !isPaused;
    const modal = document.getElementById('pause-modal');
    
    if (isPaused) {
        clearInterval(timerInterval);
        if (timerTween) timerTween.pause();
        saveToLocalBuffer(); // 💾 กด Pause → เซฟลง localStorage ทันที
        modal.classList.remove('hidden');
        gsap.fromTo(modal.children[0], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
    } else {
        modal.classList.add('hidden');
        clearInterval(timerInterval); // บังคับล้างเวลาเก่าทิ้งให้หมดชัวร์ๆ
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) { stopTimer(); triggerLose(true); }
        }, 1000);
        if (timerTween) timerTween.resume();
    }
}

// --- ⏱️ Timer Logic (Hard Mode Included) ---
function startTimer() {
    stopTimer();
    timeLeft = isTestMode ? 20 : (hardModeEnabled ? 30 : 60); 
    let duration = timeLeft;
    
    gsap.set("#timer-bar", {width: "100%", backgroundImage: "linear-gradient(to right, #00E5FF, #3B82F6)"});
    
    timerTween = gsap.to("#timer-bar", {
        width: "0%", duration: duration, ease: "none",
        onUpdate: function() {
            let progress = this.progress();
            if (progress > 0.75) { gsap.to("#timer-bar", {backgroundImage: "linear-gradient(to right, #FF3366, #FF9A9E)", duration: 0.5, overwrite: "auto"}); }
        }
    });

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) { stopTimer(); triggerLose(true); } 
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    if (timerTween) timerTween.kill();
}

function loadWord() {
    if (currentIndex >= wordList.length) {
        if (isTestMode) submitTestScoreToGAS();
        else saveProgressToGAS(); 
        return;
    }

    const currentObj = wordList[currentIndex];
    targetWord = currentObj.word.toUpperCase();
    guessedLetters.clear();
    mistakes = 0;
    isInputLocked = false;

    // Hard Mode หรือ Test Mode จะไม่มีคำใบ้ตัวอักษรให้เลย
    const pureLength = targetWord.replace(/[\s-]/g, '').length;
    let autoHintCount = 0;
    if (!hardModeEnabled && !isTestMode) {
        if (pureLength >= 10) autoHintCount = 4;
        else if (pureLength >= 8) autoHintCount = 3;
        else if (pureLength >= 6) autoHintCount = 2;
        else if (pureLength >= 5) autoHintCount = 1;
    }
    const uniqueLetters = Array.from(new Set(targetWord.split('').filter(c => c !== ' ' && c !== '-')));
    autoHintCount = Math.min(autoHintCount, uniqueLetters.length - 2);

    if (autoHintCount > 0) {
        const shuffled = uniqueLetters.sort(() => Math.random() - 0.5);
        for(let i = 0; i < autoHintCount; i++) guessedLetters.add(shuffled[i]);
    }

    document.getElementById('meaning-display').innerHTML = currentObj.meaningMain.trim();
    gsap.fromTo("#meaning-display", {opacity: 0, y: 10}, {opacity: 1, y: 0, duration: 0.4});

    renderHearts(); 
    renderSlots(true);
    generateLetterPool();
    startTimer(); 
}

function renderHearts() {
    const container = document.getElementById('hearts-container');
    let html = '';
    for(let i = 0; i < MAX_MISTAKES; i++) {
        if(i < mistakes) html += `<span class="text-[20px] filter grayscale opacity-20 transition-all duration-300">❤️</span>`;
        else html += `<span class="text-[20px] drop-shadow-[0_0_8px_#FF3366] text-[#FF3366] transition-all">❤️</span>`;
    }
    container.innerHTML = html;
}

function renderSlots(isInitial = false) {
    const container = document.getElementById('spelling-slots');
    container.innerHTML = '';
    let isWon = true;

    for (let char of targetWord) {
        if (char === ' ' || char === '-') {
            container.innerHTML += `<div class="w-4 flex items-end justify-center pb-2 text-[#93C5FD] font-black">-</div>`;
            continue;
        }

        if (guessedLetters.has(char)) {
            container.innerHTML += `<div class="gsap-slot block-3d color-yellow flex-1 size-slot">${char}</div>`;
        } else {
            container.innerHTML += `<div class="gsap-slot slot-empty flex-1 size-slot">_</div>`;
            isWon = false;
        }
    }

    if (isInitial) gsap.fromTo(".gsap-slot", {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)"});
    if (!isInitial) {
        if (isWon) triggerWin();
        else if (mistakes >= MAX_MISTAKES) triggerLose(false);
    }
}

function generateLetterPool() {
    const pool = document.getElementById('letter-pool');
    pool.innerHTML = '';

    let letters = Array.from(new Set(targetWord.split('')));
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    while(letters.length < 12) {
        let r = alphabet[Math.floor(Math.random() * alphabet.length)];
        if(!letters.includes(r)) letters.push(r);
    }
    letters.sort(() => Math.random() - 0.5);

    letters.forEach((letter, i) => {
        const btn = document.createElement('div');
        const color = blockColors[i % blockColors.length];
        btn.className = `gsap-btn block-3d ${color} size-btn`;
        btn.innerText = letter;
        if (guessedLetters.has(letter)) btn.classList.add('disabled');
        btn.onclick = () => handleGuess(letter, btn);
        pool.appendChild(btn);
    });
    gsap.fromTo(".gsap-btn", {y: 40, opacity: 0}, {y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: "back.out(1.5)"});
}

function handleGuess(letter, btnElement) {
    if (isInputLocked || isPaused || guessedLetters.has(letter)) return;
    guessedLetters.add(letter);
    btnElement.classList.add('disabled');

    if (targetWord.includes(letter)) {
        playSound(soundCorrect);
        renderSlots();
    } else {
        playSound(soundWrong);
        mistakes++;
        currentStreak = 0; // ผิดปุ๊บ สตรีคขาดปั๊บ
        updateStreakDisplay();
        renderHearts();
        
        // เคลียร์อนิเมชันเก่าทิ้งก่อนเริ่มสั่นรอบใหม่ ป้องกันหน้าจอค้างเยื้องศูนย์กลาง
        gsap.killTweensOf("main");
        gsap.set("main", {x: 0});
        gsap.fromTo("main", {x: -10}, {x: 10, duration: 0.05, yoyo: true, repeat: 5, onComplete: () => gsap.set("main", {x: 0})});
        
        renderSlots();
    }
}

// --- 🏆 ระบบแสดงผลลัพธ์ (Modal) ---
function showResultModal(isWin, isTimeUp) {
    const modal = document.getElementById('result-modal');
    const title = document.getElementById('result-title');
    const icon = document.getElementById('result-icon');
    const wordDisplay = document.getElementById('result-word');
    const actions = document.getElementById('result-actions');
    const bg = document.getElementById('result-bg');
    const streakDisplay = document.getElementById('result-streak');

    wordDisplay.innerText = targetWord;
    modal.classList.remove('hidden');

    if (isWin) {
        let isLastWord = currentIndex >= wordList.length - 1;
        let nextBtnText = isTestMode ? (isLastWord ? "SUBMIT TEST" : "NEXT QUESTION") : "NEXT LEVEL";
        
        icon.innerText = "🎉";
        title.innerText = isTestMode ? "CORRECT!" : "EXCELLENT!";
        title.className = "text-4xl font-black text-[#22C55E] mb-2 uppercase";
        bg.className = "absolute inset-0 bg-gradient-to-b from-[#4ADE80] to-white opacity-20 z-0";
        actions.innerHTML = `<button onclick="proceedNextWord()" class="block-3d color-mint py-4 text-xl w-full">${nextBtnText}</button>`;
        
        if (currentStreak >= 2) {
            streakDisplay.innerText = `🔥 PERFECT STREAK x${currentStreak}!`;
            streakDisplay.classList.remove('hidden');
            // ถ้ายิ่งสตรีคเยอะ พลุยิ่งอลังการ
            confetti({ particleCount: 150 + (currentStreak * 50), spread: 100, origin: { y: 0.6 }, colors: ['#FF8A00', '#FF3366', '#FFD166'] });
        } else {
            streakDisplay.classList.add('hidden');
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#00E5FF', '#FF3366', '#FFD166', '#A855F7'] });
        }
    } else {
        let isLastWord = currentIndex >= wordList.length - 1;
        let nextBtnText = isTestMode ? (isLastWord ? "SUBMIT TEST" : "NEXT QUESTION") : "CONTINUE ANYWAY";
        
        icon.innerText = isTimeUp ? "⏱️" : "💔";
        title.innerText = isTimeUp ? "TIME'S UP!" : "GAME OVER";
        title.className = "text-4xl font-black text-[#FF3366] mb-2 uppercase";
        bg.className = "absolute inset-0 bg-gradient-to-b from-[#FF9A9E] to-white opacity-20 z-0";
        streakDisplay.classList.add('hidden');
        actions.innerHTML = `
            <button onclick="proceedNextWord()" class="block-3d color-orange py-4 text-xl w-full">${nextBtnText}</button>
            ${!isTestMode ? `<button onclick="returnToHome()" class="block-3d bg-[#F8FAFC] text-[#3B82F6] py-4 text-xl w-full shadow-none border-2 border-[#BFDBFE] mt-2">HOME</button>` : ''}
        `;
    }
    
    gsap.fromTo(modal.children[0], { scale: 0.8, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" });
}

function triggerWin() {
    isInputLocked = true;
    stopTimer();
    wordResults.push({ id: wordList[currentIndex].id, isCorrect: true });
    saveToLocalBuffer(); // 💾 บันทึกลง localStorage ทันที
    
    document.querySelectorAll('.gsap-slot').forEach(slot => slot.className = "gsap-slot block-3d blast-flash flex-1 size-slot");
    
    // อัปเดตสตรีค (ถ้าไม่ผิดเลยในตานี้)
    if (mistakes === 0) currentStreak++;
    updateStreakDisplay();
    
    score += 1; 
    if (isTestMode) testScore += 1;
    updateScoreDisplay();
    
    setTimeout(() => { showResultModal(true, false); }, 1000);
}

function triggerLose(isTimeUp) {
    isInputLocked = true;
    stopTimer();
    wordResults.push({ id: wordList[currentIndex].id, isCorrect: false });
    saveToLocalBuffer(); // 💾 บันทึกลง localStorage ทันที
    
    currentStreak = 0; // แพ้แล้วสตรีคขาด
    updateStreakDisplay();
    
    const container = document.getElementById('spelling-slots');
    container.innerHTML = '';
    for (let char of targetWord) {
        if(char === ' ' || char === '-') container.innerHTML += `<div class="w-4"></div>`;
        else container.innerHTML += `<div class="block-3d ${isTimeUp ? 'color-orange' : 'color-pink'} flex-1 size-slot opacity-90">${char}</div>`;
    }

    setTimeout(() => { showResultModal(false, isTimeUp); }, 1000);
}

function proceedNextWord() {
    document.getElementById('result-modal').classList.add('hidden');
    gsap.to(".gsap-btn, .gsap-slot", {scale: 0, opacity: 0, duration: 0.2});
    setTimeout(() => {
        currentIndex++;
        loadWord();
    }, 300);
}

async function saveProgressToGAS() {
    if (wordResults.length === 0) return;
    let payload = [...wordResults];
    wordResults = []; // clear it so returnToHome doesn't loop
    
    document.getElementById('meaning-display').innerText = "⏳ กำลังบันทึกผลการเรียนรู้...";
    try {
        const url = `${GAS_URL}?action=updateProgress&email=${encodeURIComponent(userEmail)}&updates=${encodeURIComponent(JSON.stringify(payload))}&t=${Date.now()}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json && json.status === "success") {
            localStorage.removeItem(LS_KEY); // ✅ sync สำเร็จ ลบ buffer ทิ้ง
            document.getElementById('meaning-display').innerHTML = `<span class="text-[#22C55E]">🎉 <strong>บันทึกคะแนนสำเร็จ</strong></span>`;
        } else {
            document.getElementById('meaning-display').innerHTML = `<span class="text-[#FF3366]">❌ เกิดข้อผิดพลาดในการบันทึก</span>`;
        }
    } catch (err) { 
        console.error(err);
        document.getElementById('meaning-display').innerHTML = `<span class="text-[#FF3366]">❌ ไม่สามารถเชื่อมต่อได้ (ข้อมูลบันทึกไว้ชั่วคราวแล้ว)</span>`;
    }
    setTimeout(() => returnToHome(), 2500);
}

async function submitTestScoreToGAS() {
    document.getElementById('meaning-display').innerText = "⏳ กำลังส่งกระดาษคำตอบ...";
    wordResults = []; // clear to prevent loop
    try {
        const url = `${GAS_URL}?action=submitTestScore&email=${encodeURIComponent(userEmail)}&testType=${encodeURIComponent(currentTestType)}&score=${testScore}&maxScore=${wordList.length}&t=${Date.now()}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json && json.status === "success") {
            document.getElementById('meaning-display').innerHTML = `<span class="text-[#22C55E]">🎉 <strong>ส่งข้อสอบเรียบร้อย! ได้ ${testScore}/${wordList.length} คะแนน</strong></span>`;
        } else {
            document.getElementById('meaning-display').innerText = "❌ เกิดข้อผิดพลาดในการส่งข้อสอบ";
        }
    } catch (err) { console.error(err); }
    setTimeout(() => returnToHome(), 3500);
}

document.addEventListener('keydown', (e) => {
    if (isInputLocked || isPaused) return;
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    if (/^[a-zA-Z]$/.test(e.key)) {
        const letter = e.key.toUpperCase();
        const pool = document.getElementById('letter-pool');
        if (!pool) return;
        const buttons = pool.querySelectorAll('.gsap-btn:not(.disabled)');
        for (let btn of buttons) {
            if (btn.innerText === letter) { 
                // สร้างเอฟเฟกต์ปุ่มบุ๋มลงไปเมื่อกดคีย์บอร์ด
                btn.classList.add('active-simulate');
                setTimeout(() => btn.classList.remove('active-simulate'), 100);
                
                btn.click(); 
                break; 
            }
        }
    }
});