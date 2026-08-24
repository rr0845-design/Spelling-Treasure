# Spelling Master — Cut-Out Scrapbook Brutalism

แอปพลิเคชันเกมทายคำศัพท์ภาษาอังกฤษสไตล์ **Cut-Out Scrapbook Brutalism** พร้อมระบบเชื่อมต่อ Google Sheets API แบบเรียลไทม์ และระบบ Spaced Repetition (SRS)

## 📁 โครงสร้างไฟล์
- 📄 [`index.html`](file:///c:/Users/tone0/Documents/antigravity/cool-hopper/index.html) — ไฟล์โครงสร้างหลักของเกม
- 🎨 [`style.css`](file:///c:/Users/tone0/Documents/antigravity/cool-hopper/style.css) — ไฟล์การกำหนดสไตล์ Scrapbook Brutalism
- ⚡ [`script.js`](file:///c:/Users/tone0/Documents/antigravity/cool-hopper/script.js) — ไฟล์ระบบประมวลผล เสียงสังเคราะห์ คลังคำศัพท์ และ API Sync
- ☁️ [`Code.gs`](file:///c:/Users/tone0/Documents/antigravity/cool-hopper/Code.gs) — สคริปต์ Google Apps Script (Backend API)
- 📖 [`README.md`](file:///c:/Users/tone0/Documents/antigravity/cool-hopper/README.md) — คู่มือการใช้งาน

## 🌟 ฟีเจอร์หลัก
1. **คลังคำศัพท์จากบทเรียน**: ดึงจากตาราง Google Sheet (`Vocab_Master`) อัตโนมัติ พร้อมระบบ Offline Cache
2. **ระบบเสียง & ออกเสียง**: สังเคราะห์เสียงเอฟเฟกต์ด้วย Web Audio API และอ่านออกเสียงสำเนียงภาษาอังกฤษด้วย Web Speech API (TTS)
3. **จัดกลุ่มบทเรียน & หมวดหมู่**: กรองบทเรียนได้ตาม Unit และหมวดย่อย
4. **กล่องทบทวนความจำ (Leitner SRS)**: แบ่งกล่องทบทวน Box 1-4 ทบทวนตามระยะเวลาเพื่อความจำระยะยาว
5. **ตารางอันดับ & โปรไฟล์**: ระบบบันทึกคะแนน Daily Streak และ Leaderboard แสดงอันดับผู้เรียน
