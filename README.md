# 🌟 TikTok 主播粉絲社群資料庫 (TikTok Streamer Hub)

> 專為 **TikTok 直播主播、公會團隊、直播家族** 量身打造的開源社群粉絲管理系統與互動記憶小幫手。  
> 隨時掌握鐵粉、榜一大哥、管理員的生日、喜好話題與偏好禮物，開播連麥不再忘記任何細節！

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com)
[![Pure Frontend](https://img.shields.io/badge/Platform-Pure%20HTML%2FCSS%2FJS-red.svg)](https://pages.github.com)

---

## 🎯 為什麼需要這個專案？

在 TikTok 開播時，主播常面臨以下挑戰：
- 房間大哥大姐進場，突然記不起他的暱稱或生日？
- 想要製造話題，卻忘了他喜歡聊什麼動漫或吃什麼美食？
- 粉絲慶生想準備驚喜，卻常錯過生日當天？
- 擔心個資放雲端資料庫外洩？

**TikTok Streamer Hub** 是一個**純前端、零依賴、免資料庫、開箱即用**的輕量化開源解決方案。所有資料安全存儲於**您自己的瀏覽器本地（LocalStorage）**，杜絕任何隱私個資外洩風險，並支援隨時**一鍵匯出 / 匯入備份 JSON**！

---

## ✨ 核心特色功能

### 1. 📇 完整社群成員管理 (CRUD)
- **新增成員**：快速登記粉絲姓名、身分標籤（如：榜一大哥、榜二、房管、守護神、鐵粉、連麥嘉賓）、TikTok 帳號、生日、喜愛動漫、美食偏好與主播備忘錄。
- **即時星座推算**：輸入生日（例如 `8/21`）系統將自動智慧推算對應星座！
- **自訂頭像**：支援上傳本機圖片（自動轉為 Base64 儲存）、自訂圖片網址，或自動產生多樣化趣味向量頭像。
- **編輯與修正**：滑鼠懸停於卡片即可快捷編輯，或點擊卡片開啟詳細檢視視窗修改。
- **安全防呆刪除**：具備二次確認對話框，防止手滑誤刪重要鐵粉資料。

### 2. 🎂 智慧生日提醒與狂歡慶生
- **即時比對**：每次開啟頁面自動檢測今日是否有壽星粉絲。
- **狂歡慶祝彈窗**：專屬五彩紙屑（Confetti）動畫與全螢幕慶祝視窗，方便在直播間第一時間送上最熱情的專屬祝福。
- **浮動提醒按鈕**：直播途中可隨時點擊右下角按鈕重新喚起壽星列表。

### 3. 🔍 多維度智慧搜尋與篩選
- **即時全局搜尋**：打字瞬間同步比對姓名、身分、TikTok 帳號、動漫或食物關鍵字。
- **標籤快速過濾**：
  - 👑 **身分標籤**（榜一大哥 / 房管 / 守護神 / 鐵粉 等）
  - 🎂 **今日壽星**
  - ⭐ **十二星座選擇器**
  - 📅 **生日月份篩選器**
  - 📺 **動漫話題**
  - 🍲 **美食偏好**

### 4. 📊 資料缺漏與完整度分析 (`missing-info.html`)
- 獨立儀表板頁面，即時計算全體資料之**完整度百分比**。
- 自動統計並分類「缺少生日」、「缺少星座」、「缺少動漫話題」、「缺少食物禮物」之名單。
- 點擊缺漏成員小卡，直接自動導航回首頁並鎖定該成員！

### 5. 💾 100% 隱私保護與備份機制
- **完全離線可用**：無需購買伺服器或後端資料庫，資料全部保存在瀏覽器 LocalStorage。
- **一鍵匯出 (Export JSON)**：一鍵打包下載完整名單備份檔（`tiktok-streamer-crew-*.json`）。
- **一鍵匯入 (Import JSON)**：換電腦或換瀏覽器時，可直接上傳備份檔，支援「覆蓋」或「合併新增」。
- **一鍵重設示範資料**：提供開源預設的趣味虛擬示範成員，方便初次上手展示。

### 6. 🎨 潮流主播主題風格
- 融入 TikTok 經典霓虹色調（`#fe2c55` 與 `#25f4ee`）。
- 精緻玻璃擬態（Glassmorphism）與滑順微動態效果。
- 支援**深色 (Dark) / 淺色 (Light) 主題切換**，適應不同開播燈光環境。

---

## 🚀 快速開始

### 方法一：直接在本地執行（免安裝任何環境）
1. 將本專案下載或 `git clone` 至電腦。
2. 雙擊直接開啟 `index.html` 即可立即開始使用！

### 方法二：一鍵部署至 GitHub Pages（免費個人專屬線上版）
1. 在 GitHub 上 Fork 或新建自己的 Repository。
2. 將本專案檔案 Push 至倉庫的 `main` 分支。
3. 進入 GitHub Repository 的 **Settings** -> **Pages**。
4. 在 **Build and deployment** -> **Branch** 選擇 `main` / `root`，點擊 **Save**。
5. 數分鐘後即可獲得您的專屬網址（例如：`https://<你的帳號>.github.io/<專案名>/`），在手機、平板或電腦皆能隨時存取！

---

## 📁 專案檔案結構

```text
├── index.html              # 主頁面：成員卡片網格、搜尋篩選、新增/編輯/刪除彈窗
├── missing-info.html       # 缺漏資料分析頁面：資料完整度統計與缺漏列表
├── app.js                  # 核心邏輯：CRUD 操作、LocalStorage 同步、星座推算、匯入匯出
├── styles.css              # 現代 TikTok 霓虹風格 UI、深淺模式切換、響應式排版
├── data/
│   └── sample-data.json    # 官方預設示範資料範本（無任何私人個資）
├── image/
│   ├── default-avatar.svg  # 預設通用向量頭像
│   └── README.md           # 本機頭像存放說明
├── .gitignore              # 已忽略敏感備份與個人暫存檔案
├── LICENSE                 # MIT 開源授權協議
└── README.md               # 專案詳細說明文件
```

---

## 🔒 隱私與安全說明

- 本開源專案程式碼中**僅包含虛擬示例資料**，絕無任何真實個人個資。
- 用戶輸入的所有資料只會儲存在本機瀏覽器的 `localStorage` 中，不會傳輸到任何外部伺服器。
- 建議定期使用頂部的 **匯出 JSON** 功能備份您的重要粉絲名單。

---

## 🤝 參與貢獻 (Contributing)

歡迎提交 Issue 與 Pull Request！
1. Fork 本倉庫
2. 建立新分支 (`git checkout -b feature/AmazingFeature`)
3. 提交修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送至分支 (`git push origin feature/AmazingFeature`)
5. 發起 Pull Request

---

## 📄 開源授權 (License)

本專案採用 [MIT License](LICENSE) 開源授權，歡迎自由修改、分享或二次開發。

