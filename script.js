// 🛑 1. ใส่ URL ของ GAS ที่ครูเพิ่ง Deploy ได้มา
const GAS_URL = "https://script.google.com/macros/s/AKfycbyRZ4LmjwE7n5dsTSha0soXUmOM6f9zbK4FAefWx8rO0kEy_RHqCsQ8jMmnrtVzx6W3pQ/exec"; 

let wordList = []; // ปล่อยว่างไว้รอรับข้อมูลจาก GAS
let currentWordIndex = 0;
let score = 0;

// 🛑 2. ฟังก์ชันดึงคำศัพท์ 20 คำจากระบบ Box
async function fetchWordsFromGAS() {
    // ใช้อีเมลจำลองไปก่อน เพื่อให้ระบบ GAS ทำงานได้
    const testEmail = "guest.student@school.edu"; 
    const meaningDisplay = document.getElementById('meaning-display');
    
    try {
        meaningDisplay.innerText = "⏳ กำลังดึงชุดคำศัพท์ประจำวัน...";
        
        // ยิงไปที่ GAS เพื่อขอข้อมูลด้วย action=getVocab
        const response = await fetch(`${GAS_URL}?action=getVocab&email=${testEmail}`);
        const json = await response.json();

        if (json.status === "success" && json.data.length > 0) {
            // แมปข้อมูลจาก GAS (v1 คือคำศัพท์) ให้ตรงกับตัวแปรที่เกมต้องการ
            wordList = json.data.map(item => ({
                id: item.id,
                word: item.v1.toUpperCase(), // แปลงเป็นพิมพ์ใหญ่ทั้งหมดให้เข้ากับบล็อก
                meaning: item.meaning
            }));
            
            // เริ่มเกมโดยโหลดคำแรกขึ้นจอ
            loadWord(); 
        } else {
            meaningDisplay.innerText = "❌ ไม่พบชุดคำศัพท์ หรือดึงข้อมูลล้มเหลว";
        }
    } catch (error) {
        meaningDisplay.innerText = "❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้";
        console.error("Fetch error:", error);
    }
}

// 🛑 3. อัปเดตตอนเปิดหน้าเว็บให้ดึงข้อมูลก่อน
window.onload = () => {
    updateScoreDisplay();
    fetchWordsFromGAS(); // เรียกใช้แทนที่การ loadWord() ตรงๆ
};
