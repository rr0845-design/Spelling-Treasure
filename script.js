const GAS_URL = "https://script.google.com/macros/s/AKfycbxwMOOFzMKnwiOI6t3vHOA4B8M5PziNM8MXpweYZ-4LInLUydp49y8KKMAMiMm2daOamg/exec";

let wordList = [];
let wordResults = []; // เก็บประวัติการเล่นแต่ละคำ [{id: 'W001', isCorrect: true}, ...]
let userEmail = ""; // เก็บอีเมลผู้เล่นที่เข้าสู่ระบบ
let userName = ""; // เก็บชื่อผู้เล่น
const blockColors = ['color-pink', 'color-mint', 'color-yellow', 'color-blue', 'color-purple', 'color-orange'];

// 🔊 Sound effects
const soundCorrect = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-video-game-quest-completed-notification-206.wav');
const soundWrong = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-interface-click-soft-2575.wav');

let currentIndex = 0;
let targetWord = "";
let guessedLetters = new Set();
let mistakes = 0;
const MAX_MISTAKES = 5;
let score = 0;
let totalWords = 20; 
let isInputLocked = false;
let timeLeft = 60;
let timerInterval;

let currentAuthMode = "login";

function switchTab(mode) {
    currentAuthMode = mode;
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const nameInputContainer = document.getElementById('name-input-container');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const authError = document.getElementById('auth-error');
    
    authError.innerText = "";
    
    const activeTab = "flex-1 py-2 rounded-full text-white font-black bg-[#23C552] shadow-[0_4px_0_#168F3A] transition-all transform active:translate-y-[2px] active:shadow-[0_2px_0_#168F3A]";
    const inactiveTab = "flex-1 py-2 rounded-full text-[#A59DF6] font-bold hover:text-white transition-all";
    
    if (mode === 'login') {
        tabLogin.className = activeTab;
        tabRegister.className = inactiveTab;
        nameInputContainer.classList.add('hidden');
        authTitle.innerText = "LOGIN";
        authSubtitle.innerText = "เข้าสู่ระบบด้วยอีเมลเดิมของคุณ";
    } else {
        tabRegister.className = activeTab;
        tabLogin.className = inactiveTab;
        nameInputContainer.classList.remove('hidden');
        authTitle.innerText = "SIGN UP";
        authSubtitle.innerText = "สมัครสมาชิกใหม่เพื่อเริ่มเล่นเกม";
    }
}

async function submitAuth() {
    const emailInput = document.getElementById('email-input').value.trim();
    const nameInput = document.getElementById('name-input').value.trim();
    const authError = document.getElementById('auth-error');
    const authBtn = document.getElementById('auth-btn');
    const authBtnText = document.getElementById('auth-btn-text');
    
    authError.innerText = "";
    
    if (!emailInput) {
        authError.innerText = "⚠️ กรุณากรอกอีเมล";
        return;
    }
    
    if (currentAuthMode === 'register' && !nameInput) {
        authError.innerText = "⚠️ กรุณากรอกชื่อผู้เล่น";
        return;
    }
    
    // แสดงสถานะโหลด
    const originalText = authBtnText.innerText;
    authBtnText.innerText = "กำลังตรวจสอบ...";
    authBtn.classList.add('opacity-50', 'pointer-events-none');
    
    try {
        const timestamp = new Date().getTime();
        const url = `${GAS_URL}?action=${currentAuthMode}&email=${encodeURIComponent(emailInput)}&name=${encodeURIComponent(currentAuthMode === 'register' ? nameInput : "")}&t=${timestamp}`;
        
        const response = await fetch(url);
        
        let json;
        try {
            json = await response.json();
        } catch (e) {
            // ถ้าพังตรงนี้ แปลว่า GAS ไม่ได้ตอบกลับมาเป็น JSON (อาจจะตอบกลับมาเป็นหน้าเว็บ Error ของ Google)
            console.error("Server didn't return JSON. Please check GAS deployment.");
            authError.innerText = "❌ ลืมกด New Deployment หรือเปล่าครับ?";
            return;
        }
        
        if (json.status === "success") {
            userEmail = emailInput;
            userName = currentAuthMode === 'register' ? nameInput : json.name;
            
            // แสดงชื่อบนมุมซ้ายบน
            document.getElementById('player-name-display').innerText = userName;
            
            // อนิเมชันซ่อนหน้าจอ Login
            gsap.to("#login-overlay", {
                opacity: 0, 
                scale: 1.05,
                duration: 0.4, 
                ease: "power2.inOut",
                onComplete: () => {
                    document.getElementById('login-overlay').style.display = "none";
                }
            });
            
            fetchWordsFromGAS();
        } else {
            authError.innerText = "❌ " + (json.message || "เกิดข้อผิดพลาด");
        }
    } catch (err) {
        console.error(err);
        authError.innerText = "❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้";
    } finally {
        authBtnText.innerText = originalText;
        authBtn.classList.remove('opacity-50', 'pointer-events-none');
    }
}

async function fetchWordsFromGAS() {
    const meaningDisplay = document.getElementById('meaning-display');
    
    try {
        // เพิ่ม t เพื่อป้องกัน Browser Caching
        const timestamp = new Date().getTime();
        const response = await fetch(`${GAS_URL}?action=getVocab&email=${userEmail}&t=${timestamp}`, {
            cache: "no-store"
        });
        const json = await response.json();

        if (json.status === "success" && json.data && json.data.length > 0) {
            wordList = json.data.map(item => ({
                id: item.id,
                word: item.v1.toUpperCase(),
                meaning: item.meaning
            }));
            totalWords = wordList.length;
            updateScoreDisplay();
            loadWord(); // โหลดคำศัพท์แรกลงในเกม
        } else {
            console.error("GAS Response API:", json); // ให้ผู้ใช้เห็นว่า API คืนค่าอะไรมา
            meaningDisplay.innerText = "❌ ไม่พบชุดคำศัพท์ประจำวัน";
        }
    } catch (error) {
        meaningDisplay.innerText = "❌ เชื่อมต่อฐานข้อมูลล้มเหลว";
        console.error("Fetch Error:", error);
    }
}

function updateScoreDisplay() {
    let displayScore = score.toString().padStart(2, '0');
    let displayTotal = totalWords.toString().padStart(2, '0');
    document.getElementById('score-display').innerHTML = `${displayScore}<span class="text-lg text-gray-500">/${displayTotal}</span>`;
}

// ⏳ เริ่มระบบจับเวลา
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    document.getElementById('timer-text').innerText = timeLeft + 's';
    
    gsap.killTweensOf("#timer-bar");
    gsap.set("#timer-bar", {width: "100%", backgroundImage: "linear-gradient(to right, #FFD166, #FF9F1C)", boxShadow: "0 0 12px #FFD166"});
    
    gsap.to("#timer-bar", {
        width: "0%", 
        duration: 60, 
        ease: "none",
        onUpdate: function() {
            let progress = this.progress();
            if (progress > 0.75) { 
                gsap.to("#timer-bar", {backgroundImage: "linear-gradient(to right, #FF3366, #FF0044)", boxShadow: "0 0 12px #FF3366", duration: 0.5, overwrite: "auto"});
            } else if (progress > 0.5) { 
                gsap.to("#timer-bar", {backgroundImage: "linear-gradient(to right, #FF9F1C, #FF6B00)", boxShadow: "0 0 12px #FF9F1C", duration: 0.5, overwrite: "auto"});
            }
        }
    });

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-text').innerText = timeLeft + 's';
        if (timeLeft <= 0) {
            stopTimer();
            triggerTimeUp();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    gsap.killTweensOf("#timer-bar");
}

function loadWord() {
    if (currentIndex >= wordList.length) {
        document.getElementById('meaning-display').innerText = "🎉 ยินดีด้วย! คุณเล่นจบแล้ว";
        document.getElementById('spelling-slots').innerHTML = "";
        document.getElementById('letter-pool').innerHTML = "";
        stopTimer();
        saveProgressToGAS(); // 💾 บันทึกผลการเรียนรู้
        return;
    }

    const currentObj = wordList[currentIndex];
    targetWord = currentObj.word.toUpperCase();
    guessedLetters.clear();
    mistakes = 0;
    isInputLocked = false;

    document.getElementById('meaning-display').innerText = currentObj.meaning;
    gsap.fromTo("#meaning-display", {opacity: 0, scale: 0.95}, {opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)"});

    renderHearts();
    renderSlots(true);
    generateLetterPool();
    
    startTimer(); 
}

function renderHearts() {
    const container = document.getElementById('hearts-container');
    let html = '';
    for(let i = 0; i < MAX_MISTAKES; i++) {
        if(i < mistakes) {
            html += `<span class="text-[20px] filter grayscale opacity-20 transition-all duration-300">❤️</span>`;
        } else {
            html += `<span class="gsap-heart text-[20px] drop-shadow-[0_0_8px_#FF3366] text-[#FF3366] transition-all">❤️</span>`;
        }
    }
    container.innerHTML = html;
}

function renderSlots(isInitial = false) {
    const container = document.getElementById('spelling-slots');
    container.innerHTML = '';
    
    let isWon = true;

    for (let char of targetWord) {
        if (char === ' ' || char === '-') {
            container.innerHTML += `<div class="w-4 flex items-end justify-center pb-2 text-white/30 font-black">-</div>`;
            continue;
        }

        if (guessedLetters.has(char)) {
            container.innerHTML += `<div class="gsap-slot block-3d color-yellow w-[48px] h-[60px] md:w-[72px] md:h-[84px] text-[30px] md:text-[40px] transition-all">${char}</div>`;
        } else {
            container.innerHTML += `<div class="gsap-slot slot-empty w-[48px] h-[60px] md:w-[72px] md:h-[84px] text-[30px] md:text-[40px]">_</div>`;
            isWon = false;
        }
    }

    if (isInitial) {
        gsap.fromTo(".gsap-slot", {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)"});
    }

    if (!isInitial) {
        if (isWon) triggerWin();
        else if (mistakes >= MAX_MISTAKES) triggerLose();
    }
}

function generateLetterPool() {
    const pool = document.getElementById('letter-pool');
    pool.innerHTML = '';

    let letters = Array.from(new Set(targetWord.split('')));
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    while(letters.length < 12) {
        let randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
        if(!letters.includes(randomChar)) letters.push(randomChar);
    }
    letters.sort(() => Math.random() - 0.5);

    letters.forEach((letter, i) => {
        const btn = document.createElement('div');
        const randomColor = blockColors[i % blockColors.length];
        
        btn.className = `gsap-btn block-3d ${randomColor} w-[56px] h-[64px] md:w-[76px] md:h-[84px] text-[28px] md:text-[38px]`;
        btn.innerText = letter;
        
        btn.onclick = () => handleGuess(letter, btn, randomColor);
        pool.appendChild(btn);
    });

    gsap.fromTo(".gsap-btn", {y: 40, opacity: 0}, {y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: "back.out(1.5)"});
}

function handleGuess(letter, btnElement, colorClass) {
    if (isInputLocked || guessedLetters.has(letter)) return;
    
    guessedLetters.add(letter);
    
    gsap.fromTo(btnElement, {scale: 0.8}, {scale: 1, duration: 0.2});
    btnElement.classList.add('disabled');

    if (targetWord.includes(letter)) {
        soundCorrect.currentTime = 0;
        soundCorrect.play().catch(e => console.log('Audio error:', e));
        renderSlots();
    } else {
        soundWrong.currentTime = 0;
        soundWrong.play().catch(e => console.log('Audio error:', e));
        mistakes++;
        renderHearts();
        gsap.to("main", { x: [-8, 8, -5, 5, -2, 2, 0], duration: 0.4, ease: "power1.inOut" });
        renderSlots();
    }
}

function triggerWin() {
    isInputLocked = true;
    stopTimer();
    
    // บันทึกผลว่าตอบถูก
    wordResults.push({ id: wordList[currentIndex].id, isCorrect: true });
    
    const slots = document.querySelectorAll('.gsap-slot');
    slots.forEach(slot => { slot.className = "gsap-slot block-3d blast-flash w-[48px] h-[60px] md:w-[72px] md:h-[84px] text-[30px] md:text-[40px]"; });

    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#FF3366', '#20E3B2', '#FFD166', '#B5179E'] });

    const msg = document.getElementById('feedback-msg');
    msg.innerText = "BLAST!";
    msg.className = "h-8 mt-6 text-3xl font-black tracking-widest text-center text-[#20E3B2] drop-shadow-[0_0_15px_#20E3B2]";
    gsap.fromTo(msg, {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)"});

    score += 1; 
    updateScoreDisplay();
    gsap.fromTo("#score-display", {scale: 1.5}, {scale: 1, duration: 0.4});

    setTimeout(() => { moveToNextWord(msg); }, 1500);
}

function triggerLose() {
    isInputLocked = true;
    stopTimer();
    
    // บันทึกผลว่าตอบผิด
    wordResults.push({ id: wordList[currentIndex].id, isCorrect: false });
    
    const container = document.getElementById('spelling-slots');
    container.innerHTML = '';
    for (let char of targetWord) {
        container.innerHTML += `<div class="block-3d color-pink w-[48px] h-[60px] md:w-[72px] md:h-[84px] text-[30px] md:text-[40px] opacity-80">${char}</div>`;
    }

    const msg = document.getElementById('feedback-msg');
    msg.innerText = "OUT OF MOVES!";
    msg.className = "h-8 mt-6 text-2xl font-black tracking-widest text-center text-[#FF3366] drop-shadow-[0_0_15px_#FF3366]";
    gsap.fromTo(msg, {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)"});

    setTimeout(() => { moveToNextWord(msg); }, 2000);
}

function triggerTimeUp() {
    isInputLocked = true;
    
    // บันทึกผลว่าตอบผิด (หมดเวลา)
    wordResults.push({ id: wordList[currentIndex].id, isCorrect: false });
    
    const container = document.getElementById('spelling-slots');
    container.innerHTML = '';
    for (let char of targetWord) {
        container.innerHTML += `<div class="block-3d color-orange w-[48px] h-[60px] md:w-[72px] md:h-[84px] text-[30px] md:text-[40px] opacity-80">${char}</div>`;
    }

    const msg = document.getElementById('feedback-msg');
    msg.innerText = "TIME'S UP!";
    msg.className = "h-8 mt-6 text-2xl font-black tracking-widest text-center text-[#FF9F1C] drop-shadow-[0_0_15px_#FF9F1C]";
    gsap.fromTo(msg, {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)"});

    setTimeout(() => { moveToNextWord(msg); }, 2000);
}

function skipWord() {
    if (isInputLocked) return;
    isInputLocked = true;
    stopTimer();

    // บันทึกผลว่าข้าม (เท่ากับผิด)
    wordResults.push({ id: wordList[currentIndex].id, isCorrect: false });

    const container = document.getElementById('spelling-slots');
    container.innerHTML = '';
    for (let char of targetWord) {
        container.innerHTML += `<div class="block-3d bg-[#2A2A3E] text-gray-400 w-[48px] h-[60px] md:w-[72px] md:h-[84px] text-[30px] md:text-[40px] shadow-[0_6px_0_#181826] border border-white/5">${char}</div>`;
    }

    const msg = document.getElementById('feedback-msg');
    msg.innerText = "SKIPPED";
    msg.className = "h-8 mt-6 text-2xl font-black tracking-widest text-center text-[#8BA1AB] drop-shadow-md";
    gsap.fromTo(msg, {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)"});

    setTimeout(() => { moveToNextWord(msg); }, 1200);
}

function moveToNextWord(msgElement) {
    gsap.to(".block-3d, .gsap-btn, .gsap-slot", {scale: 0, opacity: 0, duration: 0.3, stagger: 0.02});
    gsap.to(msgElement, {opacity: 0, duration: 0.3});
    setTimeout(() => {
        currentIndex++;
        loadWord();
    }, 400);
}

// 💾 ฟังก์ชันส่งผลคะแนนกลับไปบันทึกที่ Google Apps Script
async function saveProgressToGAS() {
    if (wordResults.length === 0) return;
    
    const meaningDisplay = document.getElementById('meaning-display');
    meaningDisplay.innerText = "⏳ กำลังบันทึกผลการเรียนรู้...";
    
    try {
        const timestamp = new Date().getTime();
        const updatesStr = encodeURIComponent(JSON.stringify(wordResults));
        const url = `${GAS_URL}?action=updateProgress&email=${encodeURIComponent(userEmail)}&updates=${updatesStr}&t=${timestamp}`;
        
        const response = await fetch(url);
        
        const json = await response.json();
        if (json.status === "success") {
            meaningDisplay.innerText = "🎉 ยินดีด้วย! บันทึกผลลง Google Sheet สำเร็จแล้ว";
        } else {
            console.error("Save Error:", json);
            meaningDisplay.innerText = "⚠️ เล่นจบแล้ว แต่บันทึกผลล้มเหลว (เกิดข้อผิดพลาด)";
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        meaningDisplay.innerText = "❌ เล่นจบแล้ว แต่ไม่สามารถติดต่อเซิร์ฟเวอร์เพื่อบันทึกผลได้";
    }
}
