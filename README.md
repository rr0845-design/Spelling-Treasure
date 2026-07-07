# 🚀 Spelling Master (Vivid Wonderland Edition)

Welcome to the Spelling Master game! A highly polished, interactive vocabulary learning web app designed for students. It connects to a Google Apps Script (GAS) backend to fetch daily vocabulary and save player progress.

---

## 🌟 Key Features

- **🎨 Liquid Glass UI**: Moving aurora gradient background + glassmorphism card frame.
- **📱 Cross-Platform Responsive**: Auto-Shrink layout fits perfectly on mobile, tablet, and 16:9 PC screens.
- **💡 Smart Hint System**:
  - Auto-hints scale with word length (5 letters = 1 free hint → 10+ letters = 4 free hints).
  - Reduces hints automatically for words with many duplicate letters (e.g. BANANA).
  - Manual lightbulb button reveals a random unrevealed letter.
- **💾 Auto-Save on Exit**: Pressing HOME from Pause or Game Over saves all current progress to Google Sheet before transitioning — no data lost mid-game.
- **🔥 Streak System**: Rewards consecutive correct answers with fire badges.
- **⚡ Hard Mode**: 30s timer, no auto-hints.
- **🔊 SFX & BGM**: Immersive audio with a settings toggle.
- **⌨️ Physical Keyboard**: Real keyboard input triggers 3D button press animations.

---

## 🛠️ Architecture

- **Frontend**: HTML5, Vanilla CSS (glassmorphism, 3D shadows), Tailwind CSS (layout), Vanilla JavaScript.
- **Animations**: GSAP (GreenSock) + canvas-confetti.
- **Backend**: Google Apps Script (GAS) — fetches words, logs `Activity_Logs`, saves progress and test scores.

---

## 🚀 Deployment

To update the GAS backend:
1. Edit code in the Google Apps Script editor.
2. **Deploy > Manage Deployments > New version**.
3. Update `GAS_URL` in `script.js` with the new deployment URL.

*(Current `GAS_URL` points to the `Activity_Logs` deployment.)*

---

## 📜 Changelog

### [2.1.0] - 2026-07-07
**UX Polish & Game Balance Update**
- **Changed**: UI frame redesigned as **Liquid Glass** (glassmorphism) with aurora gradient moved to body background.
- **Changed**: Label renamed from `TRANSLATE` → `MEANING` for clarity.
- **Changed**: Hover scale animation removed from Meaning card (mobile-friendly).
- **Fixed**: Pause menu buttons disappearing after the first word (caused by GSAP animation targeting `.block-3d` globally).
- **Fixed**: Timer now correctly pauses when Pause modal is open.
- **Fixed**: Removed `X` close button from Pause modal (redundant with CONTINUE button).
- **Added**: Auto-Save on HOME — intercepts the return-to-home action to save `wordResults` first whether from Pause or Game Over.
- **Added**: Smart auto-hint scaling by word length (5→1, 6-7→2, 8-9→3, 10+→4 hints).
- **Fixed**: Meaning text trimmed on load to remove invisible spaces from Google Sheets.
- **Fixed**: MEANING badge alignment (removed `tracking-widest` that caused optical off-center).
- **Fixed**: Removed tilt rotation from Meaning card for pixel-perfect centering.

### [2.0.0] - 2026-07-07
**Massive Overhaul (Vivid Wonderland Update)**
- **Added**: Splash Screen and Home Menu (`WORDMASTER`).
- **Added**: Settings Modal (BGM, SFX, Hard Mode toggles).
- **Added**: Hint System (3 uses per game).
- **Added**: Streak System with fire badge animations.
- **Added**: Advanced Result Modal with dynamic confetti.
- **Added**: Auto-Shrink responsive CSS layout.
- **Added**: `active-simulate` visual feedback for physical keyboard typing.
- **Fixed**: `gsap.killTweensOf("main")` to fix screen-shake hang on rapid wrong answers.

### [1.1.1] - 2026-07-06
**Layout & Bug Fixes**
- **Fixed**: Keyboard no longer cut off on landscape 16:9 screens.
- **Fixed**: End-game success message cleaned up for student-facing UX.

### [1.1.0] - 2026-07-06
**Theme & UX Enhancements**
- **Changed**: Flat UI replaced with 3D Claymorphism (Duolingo-style) theme.
- **Added**: Physical keyboard event listeners (A-Z).
- **Fixed**: CSS `transition: all` replaced with pseudo-class animations to stop button jitter.

### [1.0.0] - 2026-07-06
**Initial Release**
- **Added**: Core gameplay loop (fetch vocabulary, track mistakes, GSAP animations).
- **Added**: Google Apps Script connectivity for login, daily words, and progress saving.
- **Added**: Base responsive HTML structure.

---

*Maintained by Antigravity (AI Assistant)*
