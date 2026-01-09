# 🚀 部署指南 | Deployment Guide

## GitHub Pages 部署步驟

### 1. 初始化 Git 倉庫（如果還沒有）

```bash
git init
git add .
git commit -m "Initial commit: Organized frontend playground"
```

### 2. 連接到 GitHub

```bash
# 在 GitHub 上建立新倉庫後
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

### 3. 啟用 GitHub Pages

1. 前往你的 GitHub 倉庫
2. 點擊 **Settings** (設定)
3. 在左側選單找到 **Pages** (頁面)
4. 在 **Source** 選擇：
   - Branch: `main`
   - Folder: `/ (root)`
5. 點擊 **Save** (儲存)

### 4. 等待部署

GitHub 會在幾分鐘內完成部署。完成後，你的網站將在以下網址可用：

```
https://<your-username>.github.io/<repo-name>/
```

### 5. 更新內容

每次推送新的變更到 `main` 分支，GitHub Pages 會自動重新部署：

```bash
git add .
git commit -m "Update: 描述你的變更"
git push
```

## 本地測試

在推送到 GitHub 之前，建議先在本地測試：

```bash
# 使用 Python (Python 3)
python -m http.server 8000

# 或使用 Node.js
npx http-server

# 然後在瀏覽器開啟
# http://localhost:8000
```

## 注意事項

- `.nojekyll` 檔案已建立，確保 GitHub Pages 不會使用 Jekyll 處理
- 所有路徑都是相對路徑，適合 GitHub Pages
- 如果示範無法正常顯示，檢查瀏覽器控制台的錯誤訊息

## 自訂網域（選用）

如果你想使用自訂網域：

1. 在倉庫根目錄建立 `CNAME` 檔案
2. 在檔案中寫入你的網域名稱，例如：`example.com`
3. 在你的 DNS 設定中添加 CNAME 記錄指向 `<username>.github.io`

---

**祝部署順利！** 🎉
