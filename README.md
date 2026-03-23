# 🎨 前端Demo區 | Frontend Demo Zone

這是一個用於整理「各種前端常見功能/元件」的實驗性倉庫。你可以放入純 `HTML/CSS/JavaScript` 的練習，也可以把使用像 `Bootstrap`、`Vue`、`React`（或其他套件/框架）的範例放進來做快速驗證與學習。

All registered demos are viewable via GitHub Pages.

## 📌 首頁是動態產生的（方便擴充）

首頁 `index.html` 會讀取頁面內的 `demos` 陣列，並自動生成每個示範的入口卡片。

因此未來你新增 demo 時，不需要維護一份「固定示範列表」：只要照新增流程把新入口註冊進 `demos` 陣列即可。

## 📁 專案結構（概念性）

```text
.
├── index.html          # 首頁（動態顯示 demo 入口）
├── demos/             # 多個實驗入口（每個實驗可放自己的入口頁，如 index.html）
├── assets/            # 共用資源（圖片/腳本/影片等，可按需擴充）
└── README.md
```

> 註：實際子資料夾名稱會隨你的實驗內容持續調整；重點是「每個 demo 有自己的入口頁，並在首頁註冊」。

## 🚀 如何使用（本地開發 / GitHub Pages）

### 本地開發 | Local Development

1. 克隆此專案 | Clone this repository

   ```bash
   git clone <your-repo-url>
   cd "<your-project-folder>"
   ```

2. 使用簡單伺服器啟動（避免部分資源路徑在某些瀏覽器下受限）

   ```bash
   # 使用 Python
   python -m http.server 8000

   # 或使用 Node.js（需要安裝 http-server）
   npx http-server
   ```

3. 瀏覽器開啟 `http://localhost:8000`

### GitHub Pages 部署 | GitHub Pages Deployment

1. 推送到 GitHub
2. 到 Repository Settings > Pages
3. 設定 Source（例如 `main` branch）並儲存
4. 網站將可在 `https://<username>.github.io/<repo-name>` 存取

## 📝 新增一個 demo | Adding New Demos

1. 在 `demos/` 下建立你的 demo 資料夾（命名可自由調整）
2. 在該資料夾放入入口頁（通常用 `index.html`）
3. 回到根目錄的 `index.html`，在 `demos` 陣列新增一筆資訊：`title/description/path`

範例（目前首頁使用的欄位）| Example:

```js
{
  title: "新示範",
  description: "示範描述",
  path: "demos/new-demo/index.html"
}
```

## 🛠️ 技術棧 | Tech Stack

- HTML5 / CSS3
- Vanilla JavaScript（以及可擴充的互動程式碼）
- 依 demo 需求額外使用套件或框架（例如 Bootstrap / Vue / React 等）

## 📄 授權 | License

此專案僅供學習與練習使用。

This project is for learning and practice purposes only.

## 🤝 貢獻 | Contributing

歡迎提出建議與改進。

Suggestions and improvements are welcome!

---

Happy Coding!
