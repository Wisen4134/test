# 🎨 前端練習小天地 | Frontend Playground

這是一個用於練習 JavaScript、CSS 和各種前端功能與套件的專案集合。所有示範都可以透過 GitHub Pages 直接瀏覽。

This is a collection of frontend practice projects and demos for JavaScript, CSS, and various features/libraries. All demos can be viewed directly via GitHub Pages.

## 📁 專案結構 | Project Structure

```
.
├── index.html          # 主頁面 | Main landing page
├── demos/              # 所有示範專案 | All demo projects
│   ├── accroding/      # 手風琴效果 | Accordion effect
│   ├── bsCard/         # 名片卡片 | Business card
│   ├── fishCat/        # 貓咪與魚 | Fish Cat demo
│   ├── proj1/          # 專案一 | Project 1
│   ├── proj2/          # 專案二 | Project 2
│   ├── scroll/          # 全頁滾動 | Full page scroll
│   └── wishList/       # 願望清單 | Wish list
├── assets/             # 共用資源 | Shared assets
│   ├── images/         # 圖片 | Images
│   ├── js/             # JavaScript 檔案 | JavaScript files
│   └── videos/         # 影片 | Videos
└── README.md           # 說明文件 | Documentation
```

## 🚀 如何使用 | How to Use

### 本地開發 | Local Development

1. 克隆此專案 | Clone this repository
   ```bash
   git clone <your-repo-url>
   cd "git-page of test proj"
   ```

2. 直接在瀏覽器開啟 `index.html` 或使用本地伺服器
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 或使用 Node.js (需要安裝 http-server)
   npx http-server
   ```

3. 在瀏覽器開啟 `http://localhost:8000`

### GitHub Pages 部署 | GitHub Pages Deployment

1. 將專案推送到 GitHub
2. 前往 Repository Settings > Pages
3. 選擇 Source: `main` branch (或你的主要分支)
4. 儲存後，你的網站將在 `https://<username>.github.io/<repo-name>` 上線

## 📝 新增示範 | Adding New Demos

1. 在 `demos/` 資料夾中建立新的資料夾
2. 在該資料夾中建立 `index.html`
3. 在根目錄的 `index.html` 中新增示範資訊到 `demos` 陣列

範例 | Example:
```javascript
{
    title: '新示範',
    description: '示範描述',
    path: 'demos/new-demo/index.html',
    icon: '🎯'
}
```

## 🛠️ 技術棧 | Tech Stack

- HTML5
- CSS3 (包含動畫與響應式設計)
- Vanilla JavaScript
- 各種前端套件與函式庫

## 📚 示範列表 | Demo List

- **手風琴效果** - CSS 手風琴滑塊展示
- **名片卡片** - Bootstrap 風格卡片設計
- **全頁滾動** - DocSlider 全頁滾動效果
- **願望清單** - 互動式願望清單功能
- 更多示範持續新增中...

## 📄 授權 | License

此專案僅供學習與練習使用。

This project is for learning and practice purposes only.

## 🤝 貢獻 | Contributing

歡迎提出建議與改進！

Suggestions and improvements are welcome!

---

**Happy Coding! 🎉**
