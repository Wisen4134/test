/*
act(全站禁用狀態) => "1"
ar(地點) => "復興南路二段235號前"
aren(地址英文) => "No.235， Sec. 2， Fuxing S. Rd."
bemp(空位數量) => 24
infoDate(各場站來源資料更新時間) => "2023-11-29"
infoTime(各場站來源資料更新時間) => "2023-11-29 11:19:05"
lat(緯度) => 25.02605
lng(經度) => 121.5436
mday(資料更新時間) => "2023-11-29 11:19:05"
sarea(場站區域) => "大安區"
sareaen(場站區域英文) => "Daan Dist."
sbi(場站目前車輛數量) => 4
sna(場站中文名稱) => "YouBike2.0_捷運科技大樓站"
snaen(場站名稱英文) => "YouBike2.0_MRT Technology Bldg. Sta."
sno(站點代號) => "500101001"
srcUpdateTime(YouBike2.0系統發布資料更新的時間) => "2023-11-29 11:19:44"
tot(場站總停車格) => 28
updateTime(大數據平台經過處理後將資料存入DB的時間) => "2023-11-29 11:19:51"

*/

const 大安 = [];
const 大同 = [];
const 士林 = [];
const 文山 = [];
const 中正 = [];
const 中山 = [];
const 內湖 = [];
const 北投 = [];
const 松山 = [];
const 南港 = [];
const 信義 = [];
const 萬華 = [];
const 臺大公館校區 = [];

async function showInfo(el){
    console.log(el);
}

function GenerateElement(el){
    var b = document.createElement('div');
    
    
    el.forEach(element => {
        b.innerHTML = element['sna']
        console.log(b.innerHTML);
    });
}


async function main() {

    // 用Fetch打API （YouBike2.0臺北市公共自行車即時資訊 - https://data.taipei/dataset/detail?id=c6bc8aed-557d-41d5-bfb1-8da24f78f2fb）
    const response = await fetch("https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    // 將response格式化成json
    const result = await response.json();
    console.log(result);

    // 假如回傳的東西沒資料 or 失敗
    const isFail = (result == null);
    console.log(isFail);
    if (isFail) {
        console.error("API沒資料！ or 連線讀取失敗！");
        return;
    }

    // 依序將Response填入Data Model
    for (let index = 0; index < result.length; index++) {
        switch (result[index]['sarea']) {
            case '大安區':
                大安.push(result[index]);
                
                break;
            case '大同區':
                大同.push(result[index]);
                break;
            case '士林區':
                士林.push(result[index]);
                break;
            case '文山區':
                文山.push(result[index]);
                break;
            case '中正區':
                中正.push(result[index]);
                break;
            case '中山區':
                中山.push(result[index]);
                break;
            case '內湖區':
                內湖.push(result[index]);
                break;
            case '北投區':
                北投.push(result[index]);
                break;
            case '松山區':
                松山.push(result[index]);
                break;
            case '南港區':
                南港.push(result[index]);
                break;
            case '信義區':
                信義.push(result[index]);
                break;
            case '萬華區':
                萬華.push(result[index]);
                break;
            case '臺大公館校區':
                臺大公館校區.push(result[index]);
                break;
            default:
                break;
        }

    }

    // 做後續處理
    let a = document.getElementById('test');
    a.innerHTML += 大安[0].sarea;
    console.log(大安);
    
    

}

// 先撈一次
main();


// 每一分半再撈一次
//setInterval(main,90000);