// 🛑 นำ Web App URL ที่ได้จาก GAS มาใส่ตรงนี้
const GAS_URL = "https://script.google.com/macros/s/AKfycbwdNyjU1tlQ7tjRvKo08UItDA_WzKcD0GncwoYdVaQuZTRHGgaDiliuYbJNnFN0PJxP/exec"; 

let wordList = [];
let currentWordIndex = 0;
let score = 0;
let currentAnswer = []; 
let targetWord = "";

// 1. ฟังก์ชันดึงคำศัพท์ 20 คำจาก GAS
async function fetchWordsFromGAS() {
    const testEmail = "guest.student@school.edu"; // ใช้อีเมลจำลองไปก่อน
    const meaningDisplay = document.getElementById('meaning-display');
    
    try {
        // เพิ่ม t เพื่อป้องกัน Browser Caching (Cache Buster)
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

// 2. ฟังก์ชันโหลดด่าน
function loadWord() {
    if (currentWordIndex >= wordList.length) {
        document.getElementById('meaning-display').innerText = "🎉 ยินดีด้วย! คุณเคลียร์คำศัพท์ครบแล้ว";
        document.getElementById('spelling-slots').innerHTML = "";
        document.getElementById('letter-pool').innerHTML = "";
        return;
    }

    const currentData = wordList[currentWordIndex];
    targetWord = currentData.word;
    currentAnswer = Array(targetWord.length).fill("");

    // แสดงคำใบ้
    document.getElementById('meaning-display').innerText = `ความหมาย: ${currentData.meaning}`;

    // สร้างช่องว่าง (Slots)
    const slotsContainer = document.getElementById('spelling-slots');
    slotsContainer.innerHTML = "";
    for (let i = 0; i < targetWord.length; i++) {
        const slot = document.createElement('div');
        slot.className = "slot-empty";
        slot.id = `slot-${i}`;
        slotsContainer.appendChild(slot);
    }

    // สร้างบล็อกตัวอักษร
    generateLetterBlocks(targetWord);
    updateScoreDisplay();
}

// 3. สร้างบล็อกตัวอักษร 3D สับเปลี่ยนตำแหน่ง
function generateLetterBlocks(word) {
    const poolContainer = document.getElementById('letter-pool');
    poolContainer.innerHTML = "";

    // เอาตัวอักษรที่ถูกต้องมารวมกับตัวหลอก
    let letters = word.split('');
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    while (letters.length < 10) { // ทำให้มีอย่างน้อย 10 บล็อก
        letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }

    // สลับตำแหน่ง (Shuffle)
    letters.sort(() => Math.random() - 0.5);

    letters.forEach((char, index) => {
        const block = document.createElement('div');
        block.className = "block-3d color-orange";
        block.innerText = char;
        block.onclick = () => handleBlockClick(block, char);
        poolContainer.appendChild(block);
    });
}

// 4. เมื่อผู้เล่นกดบล็อกตัวอักษร
function handleBlockClick(blockElement, char) {
    const emptyIndex = currentAnswer.findIndex(val => val === "");
    if (emptyIndex !== -1) {
        // ใส่ตัวอักษรลงในช่องว่าง
        currentAnswer[emptyIndex] = char;
        const slot = document.getElementById(`slot-${emptyIndex}`);
        slot.innerText = char;
        slot.classList.remove('slot-empty');
        slot.classList.add('slot-filled');

        // ซ่อนบล็อกที่กดไปแล้ว
        blockElement.classList.add('block-hidden');

        // เช็คว่าเติมครบหรือยัง
        if (!currentAnswer.includes("")) {
            setTimeout(checkAnswer, 300);
        }
    }
}

// 5. ตรวจคำตอบ
function checkAnswer() {
    const userAnswer = currentAnswer.join("");
    const slots = document.querySelectorAll('#spelling-slots div');

    if (userAnswer === targetWord) {
        // ตอบถูก
        slots.forEach(slot => slot.classList.add('animate-blast'));
        score++;
        setTimeout(() => {
            currentWordIndex++;
            loadWord();
        }, 1000);
    } else {
        // ตอบผิด (สั่นแล้วรีเซ็ต)
        slots.forEach(slot => slot.classList.add('animate-shake'));
        setTimeout(() => {
            // คืนค่ากลับไปเริ่มสะกดใหม่คำเดิม
            currentAnswer = Array(targetWord.length).fill("");
            slots.forEach(slot => {
                slot.className = "slot-empty";
                slot.innerText = "";
            });
            // โชว์บล็อกที่ถูกซ่อนกลับมา
            document.querySelectorAll('.block-hidden').forEach(block => {
                block.classList.remove('block-hidden');
            });
        }, 600);
    }
}

// 6. อัปเดตคะแนน
function updateScoreDisplay() {
    document.getElementById('score-display').innerText = `${score} / ${wordList.length || 20}`;
}

// เริ่มต้นเกมเมื่อเปิดเว็บ
window.onload = () => {
    fetchWordsFromGAS();
};
