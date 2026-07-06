const GAS_URL = "https://script.google.com/macros/s/AKfycbwdNyjU1tlQ7tjRvKo08UItDA_WzKcD0GncwoYdVaQuZTRHGgaDiliuYbJNnFN0PJxP/exec";

let wordList = [];
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

window.onload = () => {
    fetchWordsFromGAS();
};

async function fetchWordsFromGAS() {
    const testEmail = "guest.student@school.edu"; // ใช้อีเมลจำลองไปก่อน
    const meaningDisplay = document.getElementById('meaning-display');
    
    try {
        // เพิ่ม t เพื่อป้องกัน Browser Caching
        const timestamp = new Date().getTime();
        const response = await fetch(`${GAS_URL}?action=getVocab&email=${testEmail}&t=${timestamp}`, {
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
            container.innerHTML += `<div class="gsap-slot block-3d color-yellow w-[52px] h-[64px] text-[30px] transition-all">${char}</div>`;
        } else {
            container.innerHTML += `<div class="gsap-slot slot-empty w-[52px] h-[64px] text-[30px]">_</div>`;
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
        
        btn.className = `gsap-btn block-3d ${randomColor} w-full h-[64px] text-[28px]`;
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
    
    const slots = document.querySelectorAll('.gsap-slot');
    slots.forEach(slot => { slot.className = "gsap-slot block-3d blast-flash w-[52px] h-[64px] text-[30px]"; });

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
    
    const container = document.getElementById('spelling-slots');
    container.innerHTML = '';
    for (let char of targetWord) {
        container.innerHTML += `<div class="block-3d color-pink w-[52px] h-[64px] text-[30px] opacity-80">${char}</div>`;
    }

    const msg = document.getElementById('feedback-msg');
    msg.innerText = "OUT OF MOVES!";
    msg.className = "h-8 mt-6 text-2xl font-black tracking-widest text-center text-[#FF3366] drop-shadow-[0_0_15px_#FF3366]";
    gsap.fromTo(msg, {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)"});

    setTimeout(() => { moveToNextWord(msg); }, 2000);
}

function triggerTimeUp() {
    isInputLocked = true;
    
    const container = document.getElementById('spelling-slots');
    container.innerHTML = '';
    for (let char of targetWord) {
        container.innerHTML += `<div class="block-3d color-orange w-[52px] h-[64px] text-[30px] opacity-80">${char}</div>`;
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

    const container = document.getElementById('spelling-slots');
    container.innerHTML = '';
    for (let char of targetWord) {
        container.innerHTML += `<div class="block-3d bg-[#2A2A3E] text-gray-400 w-[52px] h-[64px] text-[30px] shadow-[0_6px_0_#181826] border border-white/5">${char}</div>`;
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
