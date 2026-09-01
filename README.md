# 🎮 SPELLING MASTER — Patina Edition (Beta Version)

แอปพลิเคชันเว็บเกมการเรียนรู้และฝึกสะกดคำศัพท์ภาษาอังกฤษระดับพรีเมียม สไตล์ **Patinaed Hues Soft Light Glassmorphism UI** พร้อมระบบทบทวนความจำระยะยาว **Spaced Repetition System (Leitner SRS)**, ระบบไต่ระดับ **30 Ranks & 6 League Divisions**, และการเชื่อมต่อฐานข้อมูล **Google Sheets API** แบบเรียลไทม์

---

## 🎨 1. แนวคิดและดีไซน์ (Design & Visual Identity)

* **Patinaed Hues Palette:** ชุดสีพาทินาละมุนตา ได้รับการออกแบบตามหลัก Soft Metallic Light:
  * 🟤 **Warm Copper (`#E5AD7A`):** โทนทองแดงอุ่นสำหรับปุ่มแอ็กชันหลักและแสงประกาย Glow
  * 🔴 **Terracotta Rust (`#C26754`):** โทนอิฐเผาสำหรับคะแนน Streak และเป้าหมายสำคัญ
  * 🟣 **Dusty Mauve (`#A37B8F`):** โทนม่วงตุ่นนุ่มลึกสำหรับป้ายหมวดและเงา Ambient
  * ⚪ **Muted Slate (`#B3B9C9`):** โทนเงินเทาสำหรับกรอบโลหะและปุ่มคีย์แคป
  * 🟫 **Deep Aubergine Bronze (`#5E4B5B`):** ตัวหนังสือหลักคมชัด สบายตา
* **Soft Light Glassmorphism:** ผิวสัมผัสกระจกฝ้าโปร่งแสง `backdrop-filter: blur(20px)` พร้อมเส้นขอบแสงเงา Soft Glow
* **Flowing Aurora Background:** ฉากหลังลูกแก้วคลื่นแสง Aurora เคลื่อนไหวลอยตัวแบบ 3 มิติ 60 FPS
* **3D Tactile Physics:** ปุ่มกดและคีย์แคปโลหะมีมิติการยุบตัวตามหลักฟิสิกส์สปริง (Spring Dynamics)

---

## 🕹️ 2. ระบบการเล่นเกมและฟีเจอร์หลัก (Core Gameplay Mechanics)

### 🎴 ระบบการ์ดตัวอักษร 3D (3D Card Flip Tiles)
* การ์ดคำศัพท์แต่ละตัวอักษรแสดงผลเป็นโมเดล 3 มิติ
* เมื่อผู้เล่นสะกดถูก การ์ดจะทำการ **หมุนพลิก 3D 180 องศา (3D Flip)** พร้อมเอฟเฟกต์สะท้อนแสงประกายดาว (**Sparkle Burst**) และขยายตัวแบบ Elastic Pop
* มีป้ายเป้าหมาย `?` กะพริบนำสายตาบอกตำแหน่งตัวอักษรที่ต้องทายถัดไป

### ⌨️ ระบบแป้นพิมพ์อัจฉริยะ (Adaptive Keyboard)
* ตัวอักษรบนแป้นพิมพ์จะถูกสุ่มเฉพาะตัวอักษรในคำและตัวลวงรวม 12 ตัว
* **ตัดตัวอักษรที่ใช้ครบแล้วอัตโนมัติ:** เมื่อสะกดตัวอักษรนั้นจนครบจำนวนในคำ ตัวอักษรบนแป้นจะเปลี่ยนสถานะเป็น Disabled ทันที
* แอนิเมชันสั่นเตือน (Key Shake) เมื่อเลือกตัวอักษรผิด พร้อมลดหัวใจ 1 ดวง

### 🔥 ระบบ Combo & คะแนนสะสม (Combo & XP Multiplier)
* ทายตัวอักษรถูกต้องติดต่อกันจะได้รับตัวคูณคอมโบ `🔥 x2, x3, x4... Combo!`
* ทุกคอมโบจะมอบคะแนนโบนัสพิเศษ `+5 XP` ต่อขั้น ยิ่งสะกดเร็วและแม่นยำ ยิ่งได้รับคะแนนสูง

### 💡 ระบบตัวช่วย "แปะคำใบ้ 1 ตัว" (Smart Hint System)
* ผู้เล่นสามารถกดปุ่มตัวช่วยเพื่อเปิดเผยตัวอักษรเป้าหมายทันที 1 ใบ
* จำกัดจำนวนการใช้งานตามสัดส่วนความยาวของคำศัพท์ เพื่อความท้าทายที่เหมาะสม

### 🔊 ระบบเสียงสังเคราะห์ & อ่านออกเสียง (Audio & Speech Synthesis)
* **Web Audio API Sound Engine:** สังเคราะห์เสียงคลิกปุ่มโลหะ (Tactile Click), เสียงคริสตัลชามส์ (Crystal Chimes), เสียงระเบิดดาว (Win Fanfare) โดยไม่ต้องโหลดไฟล์เสียงภายนอก
* **Web Speech API (TTS):** กดปุ่มลำโพงเพื่อฟังเสียงอ่านสำเนียงภาษาอังกฤษแท้ พร้อมแถบคลื่นเสียงเคลื่อนไหว (**Audio Waveform Visualizer**)

### 📝 โหมดแบบทดสอบวัดผลการเรียนรู้ (Pre-test & Post-test Assessment Mode)
* **ปุ่มเข้าสู่โหมดทดสอบ:** ปุ่มสไตล์ Slate Metallic บนหน้าโฮม (อยู่ใต้ปุ่มเริ่มเกมหลัก)
* **ตัวเลือกแบบทดสอบมาตรฐาน 20 ข้อ:**
  * 📘 **Pre-test (แบบทดสอบก่อนเรียน)**
  * 📙 **Post-test (แบบทดสอบหลังเรียน)**
* **ชุดคำศัพท์มาตรฐาน 20 คำ:** `AUTHOR`, `INVOLVE`, `PASSENGER`, `DIRECTIONS`, `SCHEDULE`, `OPTION`, `MEDICAL`, `CHOICE`, `VIRUS`, `PERHAPS`, `EFFECT`, `NORMAL`, `RECENT`, `RESEARCH`, `SUGGEST`, `CELEBRITY`, `PERMISSION`, `PROTECT`, `PREVIOUS`, `TRUTH`
* **ระบบสลับข้อสอบอิสระ (Question Palette & Navigator):**
  * มีแถบหมายเลข **[ 1 ] - [ 20 ]** ด้านบนหน้าจอ พร้อมปุ่ม **ข้อก่อนหน้า / ข้อถัดไป**
  * ผู้เรียนสามารถกดสลับข้อไปมา ข้ามไปทำข้ออื่น หรือย้อนกลับมาทบทวนคำตอบได้ตลอดการสอบ
  * มีสีระบุสถานะรายข้อ: สีส้มเข้ม (ข้อปัจจุบัน), สีเขียว (ตอบถูก), สีแดง (หมดหัวใจ), สีเหลือง (กำลังทำ), สีเทา (ยังไม่ทำ)
* **ระบบส่งผลคะแนนอัตโนมัติ (Google Sheets Assessment_Records):**
  * เมื่อกดส่งข้อสอบ คะแนนจะถูกบันทึกไปยังชีต **`Assessment_Records`** ทันที
  * บันทึกข้อมูล 4 คอลัมน์: **`Timestamp`**, **`User_Email`**, **`Test_type`** (`pre` / `post`), **`Score`** (เช่น `20`, `18`)
* **ระบบรายงานผลการประเมิน (Assessment Report Card):**
  * สรุปคะแนน (เช่น `18/20`), ความแม่นยำ (%) และเวลาที่ใช้
  * ระดับเกรดประเมินผล (Grade A+, A, B, C, F)
  * รายการเฉลย 20 คำศัพท์พร้อมสถานะ (ถูก ✓ / ผิด ✗) และปุ่มกดฟังเสียงอ่าน TTS
  * มอบโบนัส EXP พิเศษเข้าสู่ระบบจริง

### ✨ แอนิเมชันเปิดตัวและแอนิเมชันพักหน้าจอ (Idle 3D Letter Wave)
* **ตอนเปิดเว็บครั้งแรก:** ตัวอักษร **"SPELLING MASTER"** จะเริ่มจากคว่ำการ์ด 180° แล้วทยอยพลิกหงายหน้าการ์ด 3D ขึ้นมาทีละใบอย่างสวยงาม
* **ขณะพักหน้าจอทุกๆ 30 วินาที:** ตัวอักษรหน้าโฮมจะทำการหมุนพลิกการ์ด 3D 360° ทีละตัวแบบลูกคลื่นอัตโนมัติ

---

## 🧠 3. ระบบกล่องความจำระยะยาว (Leitner Spaced Repetition System - SRS)

เกมใช้หลักจิตวิทยาและประสาทวิทยาศาสตร์การจำ **Leitner Box 4 ระดับ** เพื่อเปลี่ยนความจำระยะสั้นให้กลายเป็นความจำระยะยาว:

| กล่องความจำ | ระยะเวลาทบทวนรอบถัดไป | เงื่อนไขการเลื่อนกล่อง |
| :--- | :---: | :--- |
| **📦 Box 1 (เริ่มต้น)** | **1 วัน** | คำศัพท์ใหม่ หรือคำที่เพิ่งตอบผิด |
| **📦 Box 2 (คุ้นเคย)** | **3 วัน** | ตอบถูกจาก Box 1 |
| **📦 Box 3 (เชี่ยวชาญ)** | **7 วัน** | ตอบถูกจาก Box 2 |
| **📦 Box 4 (จำได้แม่นยำ)** | **14 วัน** | ตอบถูกจาก Box 3 (ถือเป็น Mastered Word 🌟) |

> ⚠️ **กฎความแม่นยำ:** หากตอบผิดหรือหมดหัวใจในคำใด คำนั้นจะตกกลับมาที่ **Box 1** ทันที เพื่อนำกลับมาทบทวนซ้ำจนกว่าจะจำได้

---

## 👑 4. ระบบเลเวลและ 6 ลีก (30-Level Progression & League Tree)

ผู้เรียนจะสะสมคะแนนจากการสะกดคำถูก ทุกๆ **50 คะแนน (+50 XP)** จะเลื่อนขั้น 1 เลเวล โดยแบ่งเป็น **6 ลีกการแข่งขัน (6 League Divisions)**:

```
🌠 Tier 6: SUPREME IMMORTAL (Lv.26 - 30 · 1,250+ PTS)
   ├── Lv.30 Supreme Deity 🌠 (1,450 - 1,499 PTS) [MAX RANK]
   ├── Lv.29 God of Lexicon 🔱 (1,400 - 1,449 PTS)
   ├── Lv.28 Eternal Paragon 💎 (1,350 - 1,399 PTS)
   ├── Lv.27 Omniscient Mind 🧠 (1,300 - 1,349 PTS)
   └── Lv.26 Infinite Oracle 👁️ (1,250 - 1,299 PTS)

🌌 Tier 5: CELESTIAL & TITAN (Lv.21 - 25 · 1,000 - 1,249 PTS)
   ├── Lv.25 Celestial Sovereign 🌞 (1,200 - 1,249 PTS)
   ├── Lv.24 Titan of Words ⚡ (1,150 - 1,199 PTS)
   ├── Lv.23 Cosmic Scholar 🌌 (1,100 - 1,149 PTS)
   ├── Lv.22 Astral Weaver ✨ (1,050 - 1,099 PTS)
   └── Lv.21 Star Voyager 🚀 (1,000 - 1,049 PTS)

👑 Tier 4: GRANDMASTER & SAGE (Lv.16 - 20 · 750 - 999 PTS)
   ├── Lv.20 Linguistic Lord 🏰 (950 - 999 PTS)
   ├── Lv.19 Grandmaster 👑 (900 - 949 PTS)
   ├── Lv.18 Mythic Guardian 🐉 (850 - 899 PTS)
   ├── Lv.17 Archmage 💫 (800 - 849 PTS)
   └── Lv.16 Word Sage 🧙‍♂️ (750 - 799 PTS)

🏆 Tier 3: VANGUARD & CHAMPION (Lv.11 - 15 · 500 - 749 PTS)
   ├── Lv.15 High Scholar 🏛️ (700 - 749 PTS)
   ├── Lv.14 Champion 🏆 (650 - 699 PTS)
   ├── Lv.13 Grammar Captain ⚓ (600 - 649 PTS)
   ├── Lv.12 Cipher Breaker 🗝️ (550 - 599 PTS)
   └── Lv.11 Vanguard 🛡️ (500 - 549 PTS)

⚔️ Tier 2: SCHOLAR & KNIGHT (Lv.6 - 10 · 250 - 499 PTS)
   ├── Lv.10 Rune Master 🔮 (450 - 499 PTS)
   ├── Lv.9  Scholar 📜 (400 - 449 PTS)
   ├── Lv.8  Lexicon Knight ⚔️ (350 - 399 PTS)
   ├── Lv.7  Word Hunter 🏹 (300 - 349 PTS)
   └── Lv.6  Spellcaster 🪄 (250 - 299 PTS)

🌱 Tier 1: NOVICE & EXPLORER (Lv.1 - 5 · 0 - 249 PTS)
   ├── Lv.5  Adventurer 🎒 (200 - 249 PTS)
   ├── Lv.4  Apprentice 📖 (150 - 199 PTS)
   ├── Lv.3  Scout 🧭 (100 - 149 PTS)
   ├── Lv.2  Seeker 🔍 (50 - 99 PTS)
   └── Lv.1  Novice 🌱 (0 - 49 PTS)
```

* **Rank Progression Modal:** ผู้เล่นสามารถแตะที่แถบโปรไฟล์บนหน้าโฮม เพื่อเปิดหน้าต่างดูรายละเอียด 30 ระดับ, ดูหลอด EXP, คะแนนที่ขาดสำหรับขั้นถัดไป และสถานะปลดล็อกแบบเรียงลำดับจากสูงสุดลงมาต่ำสุด

---

## 🏆 5. ตารางจัดอันดับและโปรไฟล์ผู้เรียน (Leaderboard & Streak)

* **ตารางอันดับแบบแบ่งลีก (League Divided Leaderboard):** แสดงอันดับผู้เรียนจริงทั้งหมด โดยจัดกลุ่มตาม 6 ลีกแบนเนอร์ พร้อมไฮไลต์แถวของตัวผู้เล่น (`คุณ`)
* **Daily Streak System (🔥):** นับจำนวนวันที่เข้าเรียนต่อเนื่องทุกวัน เพื่อส่งเสริมวินัยในการเรียนรู้
* **ระบบความปลอดภัยของบัญชี (SHA-256 PIN Security):** ล็อกอินและลงทะเบียนด้วยอีเมลและรหัส PIN 4–6 หลัก โดยทำการแฮชรหัสแบบ Client-side SHA-256 ก่อนส่งบันทึก

---

## 📚 6. คลังคำศัพท์บทเรียน (Word Vault)

* บรรจุคำศัพท์มาตรฐาน 48 คำ ครบทั้ง 3 หมวดการเรียนรู้ (Unit 5):
  1. **หมวด Travelers (17 คำ):** `AUTHOR`, `INVOLVE`, `STIMULATE`, `DESCRIBE`, `ACCOMMODATION`, `CENTURY`, `VACATION`, `ADVENTURER`, `BACKPACKER`, `COMMUTER`, `EXPLORER`, `IMMIGRANT`, `MOTORIST`, `NOMAD`, `PASSENGER`, `REFUGEE`, `TOURIST`
  2. **หมวด Travel skills (20 คำ):** `AMBULANCE`, `ARRIVAL`, `CALCULATE`, `COMPASS`, `CURRENCY`, `DEPARTURE`, `DIRECTIONS`, `EMERGENCY`, `EXCHANGERATE`, `LOCATE`, `SCHEDULE`, `OPTION`, `FORCE`, `STUFF`, `MEDICAL`, `POSITION`, `JOURNEY`, `SUCCESSFULLY`, `CHOICE`, `PERMANENTLY`
  3. **หมวด Multi-word verb (11 คำ):** `DRIVEOUT`, `ENDUP`, `GIVEAWAY`, `GOAWAY`, `GROWUP`, `HIDEOUT`, `MOVEAWAY`, `PACKUP`, `STAYAWAY`, `STAYUP`, `STAYOUT`
* **ระบบค้นหาคำศัพท์ Real-time:** ค้นหาคำแปล ชนิดของคำ หรือตัวสะกดได้ทันที
* **ปุ่มกดฟังเสียงอ่านรายคำ:** สามารถกดฟังการออกเสียงคำศัพท์ทุกคำในคลังได้ไม่จำกัด

---

## ☁️ 7. สถาปัตยกรรมระบบหลังบ้าน (Backend Multi-Sheet Architecture)

ระบบขับเคลื่อนด้วย **Google Apps Script Web App (`Code.gs`)** เชื่อมต่อไปยัง **Google Sheets** โดยทำการแยกและกระจายข้อมูลอัตโนมัติลงในชีตทั้ง 5 หน้า:

| ชื่อชีต (Sheet Name) | โครงสร้างคอลัมน์ | หน้าที่การทำงาน |
| :--- | :--- | :--- |
| **1. `User_Profile`** | `Email, Name, PinHash, Score, Streak, MaxStreak, MasteredCount, MasteredWords, PlayedProgress, LastPlayed, RegisteredAt` | เก็บโปรไฟล์หลัก คะแนนสะสม และสถานะความคืบหน้ารวม |
| **2. `User_Streak`** | `email, Streak, Latest date` | บันทึกประวัติและจำนวนวันที่เข้าเรียนต่อเนื่องรายวัน |
| **3. `User_Progress`** | `email, vocab_id, box_level, next_review` | บันทึกสถานะกล่องความจำ Leitner Box (Box 1-4) และวันทบทวนรอบถัดไปของแต่ละคำศัพท์ |
| **4. `Activity_Logs`** | `Timestamp, Email, Name, Word, Category, Result, Mistakes, Score, Streak, MaxStreak, Box, NextReview, Action` | บันทึกประวัติ Telemetry ทุกการกดสะกดคำ ชนะ แพ้ ข้ามคำ และการเข้าสู่ระบบ |
| **5. `Vocab_Master`** | `id, vocabulary, part of speech, meaning, section, unit` | ฐานข้อมูลคำศัพท์หลักของบทเรียน |

### ⚡ ฟังก์ชันพิเศษใน `Code.gs`:
* **`updateScore`**: ซิงค์คะแนนทันทีเมื่อชนะคำศัพท์ พร้อมเขียนข้อมูลกระจายลงชีต `User_Profile`, `User_Streak`, และ `User_Progress` พร้อมกัน
* **`migrateOldData`**: ฟังก์ชันสำหรับคุณครู กดคลิกเดียวใน Apps Script เพื่อดึงประวัติคำศัพท์เก่าของนักเรียนทุกคน กระจายลงชีต `User_Progress` และจัดระเบียบตารางให้อัตโนมัติใน 1 วินาที

---

<div align="center">
  <sub>พัฒนาด้วย ❤️ และเทคโนโลยีเว็บมาตรฐานสมัยใหม่ (Vanilla JS · TailwindCSS · GSAP · Google Apps Script)</sub>
</div>
