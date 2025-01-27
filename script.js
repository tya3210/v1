var map = L.map('map').setView([35.6895, 139.6917], 13); // 東京駅周辺を初期表示

L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>'
}).addTo(map);

var hazardLayer = L.layerGroup(); // ハザードマップレイヤー (最初は非表示)
var shelterLayer = L.layerGroup(); // 避難所レイヤー (最初は非表示)
var shopLayer = L.layerGroup();   // お店情報レイヤー (最初は非表示)

// 仮のハザードマップデータ (geojson形式を想定)
var hazardData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [139.691, 35.688],
            [139.693, 35.690],
            [139.695, 35.687],
            [139.691, 35.688]
          ]
        ]
      }
    }
  ]
};

// 仮の避難所データ (geojson形式を想定)
var shelterData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "〇〇小学校",
        "capacity": "500人"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [139.692, 35.689]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "△△公民館",
        "capacity": "300人"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [139.694, 35.686]
      }
    }
  ]
};

// 仮のお店データ (geojson形式を想定)
var shopData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "□□スーパー",
        "category": "スーパー",
        "status": "営業中"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [139.693, 35.687]
      }
    }
  ]
};


// ハザードマップレイヤーのgeojson表示 (仮データ)
L.geoJSON(hazardData).addTo(hazardLayer);

// 避難所レイヤーのgeojson表示 (仮データ)
L.geoJSON(shelterData, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng)
      .bindPopup("<b>" + feature.properties.name + "</b><br>収容人数: " + feature.properties.capacity);
  }
}).addTo(shelterLayer);

// お店情報レイヤーのgeojson表示 (仮データ)
L.geoJSON(shopData, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng)
      .bindPopup("<b>" + feature.properties.name + "</b><br>カテゴリ: " + feature.properties.category + "<br>状況: " + feature.properties.status);
  }
}).addTo(shopLayer);


function toggleLayer(layerName) {
  if (layerName === 'hazard') {
    if (map.hasLayer(hazardLayer)) {
      map.removeLayer(hazardLayer);
    } else {
      map.addLayer(hazardLayer);
    }
  } else if (layerName === 'shelter') {
    if (map.hasLayer(shelterLayer)) {
      map.removeLayer(shelterLayer);
    } else {
      map.addLayer(shelterLayer);
    }
  } else if (layerName === 'shop') {
    if (map.hasLayer(shopLayer)) {
      map.removeLayer(shopLayer);
    } else {
      map.addLayer(shopLayer);
    }
  }
}
