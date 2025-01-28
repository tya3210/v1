// 地図の初期化
const map = L.map('map').setView([35.6895, 139.6917], 10);

// 地理院タイルのレイヤーを定義
const standardMap = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: '国土地理院',
    maxZoom: 18,
});

const paleMap = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
    attribution: '国土地理院',
    maxZoom: 18,
});

const aerialPhoto = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
    attribution: '国土地理院',
    maxZoom: 18,
});

// レイヤーを追加
const baseLayers = {
    "標準地図": standardMap,
    "淡色地図": paleMap,
    "空中写真": aerialPhoto,
};

// レイヤーコントロールを追加
L.control.layers(baseLayers).addTo(map);

// 初期表示のレイヤー
standardMap.addTo(map);
