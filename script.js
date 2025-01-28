document.addEventListener('DOMContentLoaded', function () {
    // 地理院地図の初期化
    const map = new ol.Map({
        target: 'map-container', // 地図を表示する要素のID
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', // 地理院地図の標準地図
                    attributions: '地図データ: <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>'
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([139.6917, 35.6895]), // 東京の座標
            zoom: 10
        })
    });

    // 伝言掲示板の機能
    const messageForm = document.getElementById('message-form');
    const messageList = document.getElementById('message-list');

    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const message = document.getElementById('message').value;

        const listItem = document.createElement('li');
        listItem.textContent = message;
        messageList.appendChild(listItem);

        messageForm.reset();
    });

    // 地図上にピンを立てる機能
    map.on('click', function (event) {
        const coordinate = event.coordinate;
        const lonLat = ol.proj.toLonLat(coordinate);

        const marker = new ol.Overlay({
            position: coordinate,
            positioning: 'center-center',
            element: document.createElement('div'),
            stopEvent: false
        });

        marker.getElement().className = 'marker';
        marker.getElement().textContent = '📌';
        marker.getElement().title = `経度: ${lonLat[0].toFixed(6)}, 緯度: ${lonLat[1].toFixed(6)}`;
        map.addOverlay(marker);

        alert(`ピンを立てました: 経度 ${lonLat[0].toFixed(6)}, 緯度 ${lonLat[1].toFixed(6)}`);
    });
});
