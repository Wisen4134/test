# 學習筆記：從 `curl` 到 CORS 與網站架構

這份筆記整理了從 `curl` 指令的使用、在 Postman 中模擬、Windows 環境下的差異、如何利用瀏覽器開發者工具除錯，到深入理解網域 (Domain)、子網域 (Subdomain)、來源 (Origin)、CORS，以及現代網站架構演進的相關知識。

---

## 一、`curl` 指令轉換與 Postman 使用

### 1. 目標
將 API 文件或範例中提供的 `curl` 指令，在 Postman 圖形化介面中模擬執行。

### 2. `curl` 指令結構解析

* **基本格式:** `curl [選項] [URL]`
* **常用選項:**
    * `-X <方法>`: 指定 HTTP 方法 (如 `GET`, `POST`, `PUT`, `DELETE`)。`GET` 是預設值，可省略 `-X GET`。
    * `-H '<標頭鍵>: <標頭值>'`: 添加 HTTP 請求標頭 (Header)。
        * 範例 1: `-H 'Authorization: Bearer <your_token>'` (身份驗證)
        * 範例 2: `-H 'Client-Id: <your_client_id>'` (應用程式識別，如 Twitch API)
        * 範例 3: `-H 'Content-Type: application/json'` (告知請求主體格式，常用於 POST/PUT)
        * **注意:** 每個標頭都需要一個獨立的 `-H` 參數。
    * `URL`: 請求的目標網址，可包含查詢參數 (Query Parameters)，如 `?key1=value1&key2=value2`。
    * `-d '<資料>'`: (用於 `POST`, `PUT` 等方法) 發送請求主體 (Request Body)，通常是 JSON 字串。

### 3. 在 Postman 中手動設定

* **Method:** 在下拉選單中選擇對應 `-X` 的 HTTP 方法 (預設為 `GET`)。
* **URL:** 將 `curl` 指令中的網址貼到 Postman 的 URL 輸入框。
* **Headers Tab:**
    * 將每個 `-H 'Key: Value'` 分別填入 Key 和 Value 欄位。
    * 例如：
        * Key: `Authorization`, Value: `Bearer <your_token>`
        * Key: `Client-Id`, Value: `<your_client_id>`

### 4. 在 Postman 中快速匯入 `curl` (推薦)

1.  點擊 Postman 左上角的 **`Import`** 按鈕。
2.  選擇 **`Raw Text`** 分頁。
3.  將 **整段** `curl` 指令複製貼上到輸入框中。
4.  點擊 `Continue`，然後 `Import`。
5.  Postman 會自動解析指令，設定好 Method, URL, Headers, Body。

### 5. API 請求失敗的排錯 (Troubleshooting)

* **檢查狀態碼 (Status Code):**
    * `401 Unauthorized`: **Token 問題** (無效、過期、格式錯誤、未提供)。
    * `400 Bad Request`: **請求本身有誤** (參數錯誤、格式不對、缺少必要標頭)。
    * `403 Forbidden`: **權限不足** (Token 對了，但無權訪問該資源)。
    * `404 Not Found`: **URL 錯誤** 或請求的資源不存在。
    * `5xx Server Error`: **伺服器內部錯誤** (問題在後端)。
* **確認 Token:** 是否為最新？是否過期？
* **確認 Client-ID:** (若 API 要求) 是否與 Token 對應？
* **確認參數:** URL 中的 ID 或 Body 中的資料是否正確？

---

## 二、`curl` 在 Windows 環境的使用

### 1. 為何 Windows CMD 可以用 `curl`?
自 **Windows 10 版本 1803** 開始，系統內建了 `curl.exe` (通常位於 `C:\Windows\System32\`)，因此可以直接在命令提示字元 (CMD) 或 PowerShell 中使用。

### 2. Windows CMD vs Linux/macOS `curl` 語法差異

* **引號 (Quotes):**
    * Linux/macOS: 常用 **單引號 `'`** 包住 URL 或 Header 值。
    * Windows CMD: **必須** 使用 **雙引號 `"`**。直接貼上使用單引號的指令會失敗。
* **換行 (Line Breaks):**
    * Linux/macOS: 可用反斜線 `\` 將長指令換行，增加可讀性。
    * Windows CMD: **不支援** `\` 換行，必須將 **整條指令寫在同一行**。

* **範例轉換:**
    * *Linux/bash 格式 (API 文件常見):*
        ```bash
        curl -X GET '[https://api.example.com/items?id=123](https://api.example.com/items?id=123)' \
        -H 'Authorization: Bearer xyz' \
        -H 'Accept: application/json'
        ```
    * *Windows CMD 格式:*
        ```bash
        curl -X GET "[https://api.example.com/items?id=123](https://api.example.com/items?id=123)" -H "Authorization: Bearer xyz" -H "Accept: application/json"
        ```

### 3. Windows PowerShell
PowerShell 更接近 Linux 環境，語法較為彈性：
* 可以使用單引號 `'` 或雙引號 `"`。
* 換行符是 **倒引號 ```** (backtick)。
* *範例 (PowerShell):*
    ```powershell
    curl -X GET 'https://api.example.com/items?id=123' `
    -H 'Authorization: Bearer xyz' `
    -H 'Accept: application/json'
    ```

### 4. 為何 API 文件偏好 Linux/bash 格式?
* **通用性:** `curl` 是伺服器端最常用、跨平台的 HTTP 工具。
* **自動化:** 非常適合用於 Shell 腳本進行自動化測試或操作。
* **開發者生態:** 許多後端、DevOps 工程師主要工作環境是 Linux/macOS。
* **習慣/簡潔:** 文件撰寫者可能預設讀者環境或能自行轉換。

---

## 三、使用 Chrome DevTools 抓取 `curl` 指令進行 Debug

### 1. 場景
前端網頁呼叫 API 時失敗，需要取得該次請求的完整資訊 (Headers, Body, Token 等) 來重現問題，以便自己排查或交由後端處理。

### 2. 步驟

1.  在 Chrome 瀏覽器按 `F12` 開啟 **開發者工具 (DevTools)**。
2.  切換到 **`Network` (網路)** 分頁。
3.  確保左上角 **錄製按鈕 (●)** 是紅色的 (表示正在記錄)。
4.  在網頁上執行觸發錯誤 API 的操作。
5.  在 `Network` 列表中找到 **紅色** (狀態碼 4xx 或 5xx) 的請求。
6.  在該請求上 **按右鍵**。
7.  選擇 `Copy` (複製) -> `Copy as cURL (...)`。
8.  **選擇正確的版本 (非常重要):**
    * **`Copy as cURL (cmd)`**: 產生的指令適用於 **Windows 命令提示字元 (CMD)**。會自動使用雙引號 `"` 並放在一行。
    * **`Copy as cURL (bash)`**: 產生的指令適用於 **Linux, macOS, Git Bash, WSL, 或 Windows PowerShell**。可能使用單引號 `'` 和 `\` 換行。
9.  將複製的指令貼到對應的終端機執行，或提供給後端。

### 3. 好處
能精確複製瀏覽器發送請求時的所有細節，是 **前後端協作除錯** 的利器。

---

## 四、深入理解 Domain, Subdomain, Origin 與 CORS

### 1. 來源 (Origin) 的嚴格定義
一個「來源」由以下 **三部分** 組合決定：
1.  **協定 (Scheme):** 如 `http`, `https`。
2.  **主機名 (Hostname):** 如 `www.example.com`, `api.example.com`, `localhost`。
3.  **埠號 (Port):** 如 `80`, `443`, `8080`, `3000`。

**核心規則：** 這三者 **必須完全一致**，才算「同源 (Same-Origin)」。只要有 **任一** 不同，就是「跨來源 (Cross-Origin)」。

### 2. 範例：同源 vs 跨來源

* `https://www.example.com` vs `http://www.example.com` => **跨來源** (協定不同)
* `https://www.example.com` vs `https://api.example.com` => **跨來源** (主機名不同)
* `https://www.example.com` vs `https://www.example.com:8080` => **跨來源** (埠號不同)
* `http://localhost:3000` vs `http://localhost:8000` => **跨來源** (埠號不同)

### 3. 網域 (Domain) 與 子網域 (Subdomain)

* **網域 (Domain):** 主要註冊的名稱，如 `example.com`。
* **子網域 (Subdomain):** 在主網域前的部分，如 `www`, `api`, `static` 都是 `example.com` 的子網域。
* **關係:** 不同子網域屬於 **不同主機名**，因此 `www.example.com` 和 `api.example.com` 之間互訪是 **跨來源**。

### 4. Cookie 的作用域 (Scope) 與 子網域

* Cookie 是伺服器指示瀏覽器儲存的資料，預設只在同源請求中發送。
* **跨子網域共用 Cookie:** 可透過伺服器設置 `Set-Cookie` 標頭時指定 `Domain` 屬性達成。
    * `Set-Cookie: session_id=abc; Domain=.example.com; Path=/`
    * **注意 `.` 開頭**，表示此 Cookie 對 `example.com` 及其 **所有子網域** (`www.`, `api.` 等) 都有效。
* 如果未指定 `Domain`，則 Cookie 只對設置它的那個具體來源有效。

### 5. CORS (Cross-Origin Resource Sharing / 跨來源資源共享)

* **背景:** 瀏覽器基於 **同源政策 (Same-Origin Policy, SOP)** 的安全限制，預設禁止 JavaScript 發起跨來源的 HTTP 請求。
* **目的:** 為了在保障安全的前提下，允許合法的跨來源請求 (例如前端 `www.example.com` 請求後端 `api.example.com`)。
* **機制:** 一套基於 **HTTP 標頭** 的標準，讓 **伺服器** 能告知瀏覽器，哪些來源被允許存取其資源。
* **關鍵標頭 (伺服器回應中):**
    * `Access-Control-Allow-Origin: <允許的來源>`
        * 可以是特定來源: `https://www.example.com`
        * 可以是 `*`: 允許任何來源 (較不安全，且通常不允許帶身份驗證資訊如 Cookie 的請求)。
    * `Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS` (允許的方法)
    * `Access-Control-Allow-Headers: Content-Type, Authorization` (允許的自訂標頭)
    * `Access-Control-Allow-Credentials: true` (是否允許請求攜帶 Cookie 等身份驗證資訊，此時 `Allow-Origin` 不能是 `*`)
* **瀏覽器行為:**
    1.  JS 發起跨來源請求時，瀏覽器自動加上 `Origin` 標頭。
    2.  (若為非簡單請求) 可能先發送 `OPTIONS` **預檢請求 (Preflight)**。
    3.  收到伺服器回應後，檢查 `Access-Control-Allow-Origin` 等標頭。
    4.  若檢查通過，才將回應數據交給 JS；否則 **阻止 JS 讀取回應** 並在控制台報 CORS 錯誤。
* **重要釐清:**
    * CORS 是 **瀏覽器** 執行的機制，用來保護使用者。伺服器本身不阻止跨來源請求的接收。
    * **Cookie 共用** 和 **CORS 許可** 是兩回事。即使 Cookie 能送到伺服器，若伺服器沒回對 CORS 標頭，瀏覽器照樣會阻止前端讀取回應。

---

## 五、網站架構演進與相關技術

### 1. 歷史脈絡與動機

* **早期 (單體應用 Monolith):** 所有功能 (前端、後端、資料庫、靜態資源) 部署在單一伺服器，單一網域。簡單，但難擴展、維護。
* **演進 (拆分):** 為了解決效能、可用性、維護性、安全性等問題，逐漸走向拆分：
    * **前後端分離:** 前端 (SPA) 與後端 API 獨立開發部署。
    * **靜態資源分離:** 圖片、CSS、JS 等放至獨立伺服器或 CDN。
    * **服務化/微服務:** 後端按功能拆分成更小的獨立服務。
* **結果:** 這種拆分自然導致了 **不同服務部署在不同 (子)網域**，從而使得 **跨來源請求** 成為常態，CORS 知識變得必要。

### 2. 子網域在架構中的常見用途

* `www.example.com`: 主要網站/前端應用。
* `api.example.com`: 後端 API 服務。
* `static.example.com` / `cdn.example.com`: 靜態資源 (圖片、CSS、JS)。
* `auth.example.com`: 獨立的身份驗證服務。
* `images.example.com`: 專門的圖片伺服器。

### 3. 相關輔助技術

* **反向代理 (Reverse Proxy):** (如 Nginx, HAProxy)
    * **核心作用:** 作為外部請求的入口，根據 **主機名 (子網域)** 或 **URL 路徑** 將請求 **轉發 (proxy)** 到後方正確的內部伺服器。
    * **附加功能:** 負載平衡、SSL 加解密、靜態內容快取、壓縮、安全防護、統一處理 CORS 標頭等。
* **負載平衡器 (Load Balancer):**
    * **核心作用:** 將大量請求 **分散** 到多台提供 **相同服務** 的後端伺服器，提高效能與可用性。
    * 可由硬體或軟體實現 (Nginx 也可做 LB)。
* **CDN (Content Delivery Network):**
    * **核心作用:** 將 **靜態資源** 快取到全球各地的邊緣節點，讓使用者從最近處獲取，**加速載入** 並 **降低源站負載**。

### 4. 解惑

* **「前端要打不同主機/網址很麻煩？」**
    * 對開發者通常是透明的。後端/維運會配置好 DNS、反向代理等，前端只需知道目標 URL。
* **「LB 分流給相同服務的機器 vs 多子域代表不同服務」**
    * 兩者並存。多子域是 **邏輯上** 的服務劃分；LB 是為了 **擴展單一服務** (不論是哪個子域的服務) 的處理能力。一個子域的服務 (如 `api.example.com`) 背後可能有多台機器透過 LB 提供服務。

---

## 六、釐清 Web 相關術語與實務用法

### 1. 正式定義

* **Web Server:** 指能接收 HTTP 請求並回應的 **軟體** (如 Nginx, Apache, IIS) 或運行此軟體的伺服器硬體。主要處理靜態內容或作為反向代理。
* **Application Server:** 主要負責執行 **應用程式/業務邏輯** 的後端服務環境 (如 Node.js + Express, Java + Tomcat, Python + Django/Flask)。Web Server 常將動態請求轉交給它處理。
* **Static Server:** 專門高效提供靜態檔案 (圖片、CSS、JS) 的伺服器 (Nginx 可扮演此角色，CDN 節點也是)。
* **Endpoint (端點):** 指 API 提供的一個 **具體的 URL 路徑**，代表一個可互動的功能點 (如 `/users`, `/products/{id}`)。**它不是伺服器本身**。

### 2. 實際口語 / 業界慣用說法 (可能與正式定義有出入)

* **Web Server:**
    * **誤用/泛指:** 常被非嚴謹地用來指 **任何處理 Web 請求的後端伺服器**，可能包含 Application Server。例如，「後端 Web Server 掛了」可能指 Node.js 服務死了。
    * **口語:** 「開一台 Web Server」可能意味著架設整個 Web 服務環境 (OS + Nginx/Apache + 後端語言環境 + 資料庫等)。
* **Application Server:**
    * **口語:** 較少直接說 Application Server，更常說「API Server」、「Backend Server」、「後端服務」、「Node 服」、「Java 服」等具體技術或功能的名稱。
* **Endpoint (端點):**
    * **常見誤用 1:** 用來指 **整個 API 的 URL**，例如「這個 API 的 endpoint 是什麼？」(意指 URL)。
    * **常見誤用 2 (較少但存在):** 用來指 **提供 API 服務的伺服器本身**，例如「打不到 endpoint」(意指 API 伺服器連不上)。
    * **最常見口語:** 「打哪個 API？」、「Call 哪個 Function？」、「哪個路徑？」比直接說「哪個 Endpoint」更普遍。但理解其意涵是指特定的 API 路徑很重要。
* **(Sub)domain (網域/子網域):**
    * **口語:** 有時會說「打哪個 domain？」或「連哪個 domain？」，實際意思可能是指某個特定的子網域 (`api.example.com`)。
* **Server / 主機:**
    * **泛指:** 這是最籠統的詞。可以指**物理機器**、**虛擬機 (VM)**、**雲主機 (Instance)**、**Docker 容器 (Container)**，甚至是指某個 **服務進程 (Process)** (如 Nginx process, Node process)。
    * **口語:** 「Server 掛了」需要根據上下文判斷是哪個層級出了問題。

**重點:** 理解正式定義有助於精確溝通，但同時也要了解實務上大家可能存在的口語習慣或簡稱，才能更好地融入團隊溝通。

---

## 七、學習路線圖建議 (快速融入)

1.  **基礎觀念:**
    * HTTP (方法、狀態碼、標頭)。
    * DNS 解析流程。
    * 瀏覽器儲存 (Cookie vs LocalStorage)。
    * **核心:** 來源 (Origin) 定義、同源政策 (SOP)。
2.  **CORS:**
    * 為何存在？解決什麼問題？
    * `Access-Control-Allow-Origin` 等關鍵標頭。
    * 簡單請求 vs 預檢請求。
3.  **架構模式:**
    * 為何要拆分服務/子網域？
    * 前後端分離概念。
    * RESTful API 風格。
4.  **關鍵技術概念:**
    * 反向代理 (Nginx 基本配置)。
    * 負載平衡器作用。
    * CDN 作用。
5.  **動手實作 (最有效):**
    * 在本機搭建簡單的前後端分離環境 (e.g., 前端 `localhost:3000`, 後端 API `localhost:8000`)。
    * **親自觸發並解決 CORS 錯誤**。
    * (進階) 嘗試用 Nginx 做反向代理整合前後端訪問路徑。