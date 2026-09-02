# 🎮 SPELLING MASTER — Patina Edition (Beta Version)

แอปพลิเคชันเว็บเกมการเรียนรู้และฝึกสะกดคำศัพท์ภาษาอังกฤษระดับพรีเมียม สไตล์ **Patinaed Hues Soft Light Glassmorphism UI** พร้อมระบบทบทวนความจำระยะยาว **Spaced Repetition System (Leitner SRS)**, ระบบวิเคราะห์ผู้เรียนสำหรับคุณครู **Teacher Dashboard**, โหมดแบบทดสอบวัดผล **Pre-test & Post-test**, และการเชื่อมต่อฐานข้อมูล **Google Sheets API** แบบเรียลไทม์ความเร็วสูง

---

## 🎨 1. แนวคิดและดีไซน์ (Design & Visual Identity)

* **Patinaed Hues Palette:** ชุดสีพาทินาละมุนตา ได้รับการออกแบบตามหลัก Soft Metallic Light:
  * 🟤 **Warm Copper (`#E5AD7A`):** โทนทองแดงอุ่นสำหรับปุ่มแอ็กชันหลัก แสงประกาย Glow และการเน้นตัวเลือก
  * 🔴 **Terracotta Rust (`#C26754`):** โทนอิฐเผาสำหรับคะแนน สถิติ Streak และเป้าหมายสำคัญ
  * 🟣 **Dusty Mauve (`#A37B8F`):** โทนม่วงตุ่นนุ่มลึกสำหรับป้ายหมวดหมู่และเงา Ambient
  * ⚪ **Muted Slate (`#B3B9C9`):** โทนเงินเทาสำหรับกรอบโลหะและปุ่มคีย์แคป
  * 🟫 **Deep Aubergine Bronze (`#5E4B5B`):** ตัวหนังสือหลักคมชัด สบายตา อ่านง่ายทุกสภาพแสง
* **Soft Light Glassmorphism:** ผิวสัมผัสกระจกฝ้าโปร่งแสง `backdrop-filter: blur(16px)` พร้อมเส้นขอบแสงเงา Soft Glow
* **3D Responsive Letter Tiles:** การ์ดตัวอักษร 3 มิติ `.title-letter-row` และ `.cutout-letter` รองรับหน้าจอมือถือทุกขนาดโดยไม่มีตัวอักษรตกบรรทัด
* **3D Tactile Physics:** ปุ่มกดและคีย์แคปโลหะมีมิติการยุบตัวตามหลักฟิสิกส์สปริง (Spring Dynamics)

---

## 🕹️ 2. ระบบการเล่นเกมและฟีเจอร์หลัก (Core Gameplay Mechanics)

### 🎴 ระบบการ์ดตัวอักษร 3D (3D Card Flip Tiles)
* การ์ดคำศัพท์แต่ละตัวอักษรแสดงผลเป็นโมเดล 3 มิติ
* เมื่อผู้เล่นสะกดถูก การ์ดจะทำการ **หมุนพลิก 3D 180 องศา (3D Flip)** พร้อมเอฟเฟกต์สะเก็ดดาว (**Sparkle Burst**) และขยายตัวแบบ Elastic Pop
* มีป้ายเป้าหมาย `?` กะพริบนำสายตาบอกตำแหน่งตัวอักษรที่ต้องทายถัดไป

### 🔁 ระบบทบทวนอัจฉริยะประจำบทเรียน (Smart Unit Review Mode)
* ปุ่มแรกในหน้าต่างเลือกบทเรียนถูกยกระดับเป็น **`🔁 ทบทวนใน Unit [X]`** (หรือ `ทบทวนความจำ (SRS Review)`)
* ระบบจะคำนวณและดึงคำศัพท์เฉพาะใน Unit นั้นที่เข้าเกณฑ์:
  1. **🔴 คำใน Box 1:** คำที่เพิ่งเริ่มฝึก หรือคำที่เพิ่งตอบผิด
  2. **⏰ คำที่ถึงกำหนดทบทวน:** คำใน Box 2, 3, 4 ที่มีวันที่กำหนดทบทวน (`nextReview <= วันนี้`)
* แสดงป้ายจำนวนคำที่ต้องทบทวนจริง และมีข้อความแจ้งเตือนเมื่อทบทวนครบทุกคำแล้ว

### ⌨️ ระบบแป้นพิมพ์อัจฉริยะ (Adaptive Keyboard)
* ตัวอักษรบนแป้นพิมพ์จะถูกสุ่มเฉพาะตัวอักษรในคำและตัวลวงรวม 12 ตัว
* **ตัดตัวอักษรที่ใช้ครบแล้วอัตโนมัติ:** เมื่อสะกดตัวอักษรนั้นจนครบจำนวนในคำ ตัวอักษรบนแป้นจะเปลี่ยนสถานะเป็น Disabled ทันที
* แอนิเมชันสั่นเตือน (Key Shake) เมื่อเลือกตัวอักษรผิด พร้อมลดหัวใจ 1 ดวง

### 🔥 ระบบ Combo & ตัวคูณคะแนน (Combo Multiplier)
* ทายตัวอักษรถูกต้องติดต่อกันจะได้รับตัวคูณคอมโบ `🔥 x2, x3, x4... Combo!`
* ทุกคอมโบจะมอบคะแนนโบนัสพิเศษ ยิ่งสะกดเร็วและแม่นยำ ยิ่งได้รับคะแนนสูง

### 💡 ระบบตัวช่วย "แปะคำใบ้ 1 ตัว" (Smart Hint System)
* ผู้เล่นสามารถกดปุ่มตัวช่วยเพื่อเปิดเผยตัวอักษรเป้าหมายทันที 1 ใบ
* มีการบันทึกประวัติการใช้คำใบ้ (`hints`) เข้าสู่ระบบสถิติของครูโดยอัตโนมัติ

### 🔊 ระบบเสียงสังเคราะห์ & อ่านออกเสียง (Audio & Speech Synthesis)
* **Web Audio API Sound Engine:** สังเคราะห์เสียงคลิกปุ่มโลหะ (Tactile Click), เสียงคริสตัลชามส์ (Crystal Chimes), เสียงระเบิดดาว (Win Fanfare) โดยไม่ต้องดาวน์โหลดไฟล์เสียงภายนอก
* **Web Speech API (TTS):** กดปุ่มลำโพงเพื่อฟังเสียงอ่านสำเนียงภาษาอังกฤษแท้ พร้อมแถบคลื่นเสียงเคลื่อนไหว (**Audio Waveform Visualizer**)

### 📝 โหมดแบบทดสอบวัดผลการเรียนรู้ (Pre-test & Post-test Assessment Mode)
* **ตัวเลือกแบบทดสอบมาตรฐาน 20 ข้อ:**
  * 📘 **Pre-test (แบบทดสอบก่อนเรียน)**
  * 📙 **Post-test (แบบทดสอบหลังเรียน)**
* **ชุดคำศัพท์มาตรฐาน 20 คำ:** `AUTHOR`, `INVOLVE`, `PASSENGER`, `DIRECTIONS`, `SCHEDULE`, `OPTION`, `MEDICAL`, `CHOICE`, `VIRUS`, `PERHAPS`, `EFFECT`, `NORMAL`, `RECENT`, `RESEARCH`, `SUGGEST`, `CELEBRITY`, `PERMISSION`, `PROTECT`, `PREVIOUS`, `TRUTH`
* **ระบบสลับข้อสอบอิสระ (Question Palette & Navigator):**
  * มีแถบหมายเลข **[ 1 ] - [ 20 ]** ด้านบนหน้าจอ พร้อมปุ่ม **ข้อก่อนหน้า / ข้อถัดไป**
  * ผู้เรียนสามารถกดสลับข้อไปมา ข้ามไปทำข้ออื่น หรือย้อนกลับมาทบทวนคำตอบได้ตลอดการสอบ
  * มีสีระบุสถานะรายข้อ: สีส้มเข้ม (ข้อปัจจุบัน), สีเขียว (ตอบถูก), สีแดง (หมดหัวใจ), สีเหลือง (กำลังทำ), สีเทา (ยังไม่ทำ)
* **ระบบบันทึกและส่งผลคะแนนอัตโนมัติ (Google Sheets Assessment_Records):**
  * เมื่อกดส่งข้อสอบ คะแนนจะถูกบันทึกไปยังชีต **`Assessment_Records`** ทันที พร้อมแสดงใบรายงานผล (Report Card) รายละเอียดข้อถูก/ผิด และระดับเกรดประเมินผล

---

## 🧠 3. ระบบกล่องความจำระยะยาว (Leitner Spaced Repetition System - SRS)

เกมใช้หลักจิตวิทยาและประสาทวิทยาศาสตร์การจำ **Leitner Box 5 ระดับ (0–4)** เพื่อเปลี่ยนความจำระยะสั้นให้กลายเป็นความจำระยะยาว:

| กล่องความจำ (Leitner Box) | ระยะเวลาทบทวนรอบถัดไป | สถานะและความหมาย |
| :--- | :---: | :--- |
| **📦 Box 0 (ยังไม่เคยฝึก)** | — | คำศัพท์ใหม่ที่ยังไม่เคยเล่นในระบบ |
| **📦 Box 1 (เริ่มต้น/ทบทวนซ้ำ)** | **1 วัน** | คำศัพท์ที่เพิ่งเริ่มจำ หรือเพิ่งตอบผิด |
| **📦 Box 2 (คุ้นเคย)** | **3 วัน** | ตอบถูกสะสม 1 ครั้ง |
| **📦 Box 3 (เชี่ยวชาญ)** | **7 วัน** | ตอบถูกสะสม 2 ครั้ง |
| **📦 Box 4 (จำได้แม่นยำ)** | **14 วัน** | ตอบถูกสะสม 3 ครั้งขึ้นไป (ถือเป็น Mastered Word 🌟) |

> ⚠️ **กฎความแม่นยำ:** หากตอบผิดหรือหมดหัวใจในคำใด คำนั้นจะตกกลับมาที่ **Box 1** ทันที เพื่อนำกลับมาทบทวนซ้ำจนกว่าจะจำได้

---

## 👑 4. ระบบเลเวลและยศผู้เรียน (20-Level Progression & Tier System)

ระบบเลเวล 20 ขั้น (Lv.1 ถึง Lv.20) พร้อมระบบ EXP แบบก้าวหน้า แบ่งออกเป็น 4 ระดับชั้นยศหลัก (Tiers):

```
👑 Tier 4: SAGE & GRANDMASTER (Lv.16 - 20)
   ├── Lv.20 Word Sage 🧙‍♂️ [MAX RANK]
   ├── Lv.19 Grandmaster 👑
   ├── Lv.18 Mythic Guardian 🐉
   ├── Lv.17 Archmage 💫
   └── Lv.16 High Scholar 🏛️

🏆 Tier 3: MASTER & SCHOLAR (Lv.11 - 15)
   ├── Lv.15 Master of Lexicon 🔱
   ├── Lv.14 Champion 🏆
   ├── Lv.13 Grammar Captain ⚓
   ├── Lv.12 Cipher Breaker 🗝️
   └── Lv.11 Vanguard 🛡️

⚔️ Tier 2: ADVENTURER & KNIGHT (Lv.6 - 10)
   ├── Lv.10 Rune Master 🔮
   ├── Lv.9  Scholar 📜
   ├── Lv.8  Lexicon Knight ⚔️
   ├── Lv.7  Word Hunter 🏹
   └── Lv.6  Spellcaster 🪄

🌱 Tier 1: NOVICE & EXPLORER (Lv.1 - 5)
   ├── Lv.5  Adventurer 🎒
   ├── Lv.4  Pathfinder 🗺️
   ├── Lv.3  Scout 🧭
   ├── Lv.2  Seeker 🔍
   └── Lv.1  Novice 🌱
```

---

## 📊 5. แดชบอร์ดสำหรับคุณครู (Teacher Dashboard)

หน้าแดชบอร์ดสำหรับครูผู้สอน (`dashboard/dashboard.html`) ออกแบบมาเพื่อติดตามและประเมินผลการเรียนรู้ของนักเรียนแบบครบวงจร:

1. **ภาพรวมสถิติห้องเรียน (Summary Metrics):**
   * จำนวนผู้เรียนทั้งหมด, ผู้เรียนที่ Active วันนี้, จำนวนครั้งการเล่นสะสม, อัตราการสะกดถูก (Win Rate), และจำนวนผู้เล่น Online แบบ Real-time
2. **ระบบวิเคราะห์ความจำทั้งห้องเรียน (Classroom Retention & SRS Overview):**
   * กราฟสัดส่วนกล่องความจำ Box 0 ถึง Box 4 รวมทั้งห้อง
   * ความคืบหน้าการจำคำศัพท์แยกตาม Unit
3. **ระบบเจาะลึกผู้เรียนรายบุคคล (Student SRS Profile & Word-by-word Telemetry):**
   * สามารถกดปุ่ม **"🔍 ดู SRS"** หรือคลิกที่ชื่อนักเรียนในตาราง เพื่อเปิด Modal ดูรายละเอียดความจำของนักเรียนคนนั้น
   * แสดงจำนวนคำที่จำได้ใน Box 0, 1, 2, 3, 4
   * ตารางแสดงคำศัพท์ครบทุกคำ พร้อมสถานะกล่อง (Box), วันที่ต้องทบทวนรอบถัดไป, จำนวนครั้งที่เล่น, ทายถูก, ทายผิด, การข้าม, และการกดใช้คำใบ้
4. **การวิเคราะห์คำศัพท์ (Word Difficulty Analysis):**
   * สรุป 8 คำศัพท์ที่นักเรียน **ตอบถูกมากที่สุด** และ 8 คำศัพท์ที่ **ตอบผิด/ข้ามมากที่สุด** (คัดกรองเฉพาะคำศัพท์จริงในบทเรียน)
5. **ระบบติดตามผลการทดสอบ (Pre/Post Assessment Tracking):**
   * ตารางคะแนน Pre-test และ Post-test ของนักเรียน พร้อมการเปรียบเทียบพัฒนาการ
6. **ตัวกรองชั้นเรียนและเลขที่ (Classroom & Student No Filter):**
   * ค้นหาและจัดกลุ่มนักเรียนตามชั้นเรียน (เช่น `ม.4/1`, `ม.4/2`) และเลขที่ได้อย่างสะดวก

---

## ☁️ 6. สถาปัตยกรรมฐานข้อมูล (Google Sheets 5-Sheet Database Schema)

ระบบเชื่อมต่อกับ Google Apps Script Web App (`Code.gs`) จัดเก็บข้อมูลแยกเป็น 5 ชีตอย่างเป็นระเบียบ:

| ชื่อชีต (Sheet Name) | โครงสร้างคอลัมน์ (Headers) | หน้าที่การทำงาน |
| :--- | :--- | :--- |
| **1. `User_Profile`** | `StudentID, Name, PinHash, Score, Streak, MaxStreak, MasteredCount, MasteredWords, PlayedProgress, LastPlayed, RegisteredAt, Classroom, StudentNo` | จัดเก็บข้อมูลผู้ใช้งาน คะแนนสะสม ข้อมูล SRS รวม และข้อมูลชั้นเรียน |
| **2. `User_Streak`** | `StudentID, Streak, Latest date` | จัดเก็บประวัติการเข้าเรียนต่อเนื่องรายวัน |
| **3. `User_Progress`** | `StudentID, vocab_id, box_level, next_review` | บันทึกระดับกล่องความจำ (Box 1–4) และวันทบทวนรอบถัดไปรายคำของนักเรียนแต่ละคน |
| **4. `Activity_Logs`** | `Timestamp, StudentID, Name, Word, Category, Result, Mistakes, Hints, Score, Streak, MaxStreak, Box, NextReview, Action, Classroom, StudentNo` | บันทึกประวัติ Telemetry ทุกการเล่น ชนะ แพ้ ข้ามคำ และจำนวนคำใบ้ที่ใช้ |
| **5. `Assessment_Records`** | `Timestamp, StudentID, Test_type, Score, Classroom, StudentNo` | บันทึกประวัติและคะแนนการทำแบบทดสอบ Pre-test และ Post-test |

---

## ⚡ 7. ประสิทธิภาพการทำงานระดับสูง (High-Performance Engine)

ระบบได้รับการปรับปรุงเพื่อรองรับการใช้งานพร้อมกันในห้องเรียน (**Concurrent Classroom Play**):
* **Batch Spreadsheet Writes:** รวมคำสั่งเขียนข้อมูลใน Apps Script ให้เสร็จสิ้นใน 1 คำสั่ง ลดระยะเวลาประมวลผลจาก 2–4 วินาที เหลือไม่กี่มิลลิวินาที
* **Debounced Background Sync:** ซิงค์คะแนนลงเครื่องทันที 0ms และส่งขึ้นเซิร์ฟเวอร์ในเบื้องหลังทุก 10–12 วินาที ช่วยลด Traffic ได้มากกว่า 80%
* **Non-blocking Telemetry:** การบันทึกประวัติการเล่นทำงานแบบ Fire-and-Forget เบื้องหลัง ไม่ขัดจังหวะการเล่นเกม
* **Mobile 60 FPS Optimization:** ปรับแต่ง Canvas Confetti และ Particle Animations ให้ใช้หน่วยความจำต่ำ เล่นได้ลื่นไหลบนสมาร์ตโฟนทุกรุ่น

---

## 📚 8. คลังคำศัพท์หลักสูตร (Master Vocabulary Database - 48 Words)

บรรจุคำศัพท์มาตรฐาน 48 คำ ครบทั้ง 3 หมวดการเรียนรู้ (Unit 5):
1. **หมวด Travelers (17 คำ):** `AUTHOR`, `INVOLVE`, `STIMULATE`, `DESCRIBE`, `ACCOMMODATION`, `CENTURY`, `VACATION`, `ADVENTURER`, `BACKPACKER`, `COMMUTER`, `EXPLORER`, `IMMIGRANT`, `MOTORIST`, `NOMAD`, `PASSENGER`, `REFUGEE`, `TOURIST`
2. **หมวด Travel skills (20 คำ):** `AMBULANCE`, `ARRIVAL`, `CALCULATE`, `COMPASS`, `CURRENCY`, `DEPARTURE`, `DIRECTIONS`, `EMERGENCY`, `EXCHANGERATE`, `LOCATE`, `SCHEDULE`, `OPTION`, `FORCE`, `STUFF`, `MEDICAL`, `POSITION`, `JOURNEY`, `SUCCESSFULLY`, `CHOICE`, `PERMANENTLY`
3. **หมวด Multi-word verb (11 คำ):** `DRIVEOUT`, `ENDUP`, `GIVEAWAY`, `GOAWAY`, `GROWUP`, `HIDEOUT`, `MOVEAWAY`, `PACKUP`, `STAYAWAY`, `STAYUP`, `STAYOUT`

---

<div align="center">
  <sub>พัฒนาด้วย ❤️ สำหรับการจัดการเรียนรู้คำศัพท์ภาษาอังกฤษยุคใหม่ (Vanilla JS · TailwindCSS · GSAP · Google Apps Script)</sub>
</div>
