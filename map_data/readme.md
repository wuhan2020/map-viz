[百度坐标拾取](http://api.map.baidu.com/lbsapi/getpoint/index.html)

[省->坐标](https://map-1252957949.cos.ap-guangzhou.myqcloud.com/geo/province.json "")

[市->坐标](https://map-1252957949.cos.ap-guangzhou.myqcloud.com/geo/city.json "")

[县->坐标](https://map-1252957949.cos.ap-guangzhou.myqcloud.com/geo/country.json "")


### 省/直辖市/自治区格式

注意 北京/北京市 这种不要那个市字

```json
{
  "台湾": [
    121.5135,
    25.0308
  ],
  "香港": [
    114.157046,
    22.410655
  ],
  "澳门": [
    113.538941,
    22.138267
  ],
  "北京": [
    116.4551,
    40.2539
  ],
  "新疆": [
    87.9236,
    43.5883
  ]
}


```

### 直辖市/省辖市/市格式

```json
{
  "北京": [
    116.395645,
    39.929986
  ]
  
}
```

### 县格式

2个字的一般不带县字

```json
{
  "徽县": [
    106.11,
    33.78
  ],
  "礼县": [
    105.15,
    34.22
  ],
  "武山": [
    104.88,
    34.69
  ],
  "秦安": [
    105.69,
    34.89
  ]

}

```

```javascript

province=[
      "中国",
      "世界",
      "澳门",
      "香港",
      "台湾",
      "北京",
      "上海",
      "重庆",
      "广西",
      "新疆",
      "宁夏",
      "西藏",
      "内蒙古",
      "云南",
      "吉林",
      "四川",
      "天津",
      "安徽",
      "山东",
      "山西",
      "广东",
      "江苏",
      "江西",
      "河北",
      "河南",
      "浙江",
      "海南",
      "湖北",
      "湖南",
      "甘肃",
      "福建",
      "贵州",
      "辽宁",
      "陕西",
      "青海",
      "黑龙江"
]

```


### 地图文件命名规则


注意 陕西和山西拼音相同
所以 山东山西的山统一改为shang

山东省的地图文件url为 [shangdong.json](https://map-1252957949.cos.ap-guangzhou.myqcloud.com/china/shangdong.json)

拼音汉字互转

```json
{

          "中国": "china",
          "世界": "world",
          "澳门": "aomen",
          "香港": "xianggang",
          "台湾": "taiwan",
          "北京": "beijing",
          "天津": "tianjin",
          "上海": "shanghai",
          "重庆": "chongqing",
          "广西": "guangxi",
          "新疆": "xinjiang",
          "西藏": "xizang",
          "内蒙古": "neimenggu",
          "宁夏": "ningxia",
          "云南": "yunnan",
          "吉林": "jilin",
          "四川": "sichuan",
          "安徽": "anhui",
          "山东": "shangdong",
          "山西": "shangxi",
          "广东": "guangdong",
          "江苏": "jiangsu",
          "江西": "jiangxi",
          "河北": "hebei",
          "河南": "henan",
          "浙江": "zhejiang",
          "海南": "hainan",
          "湖北": "hubei",
          "湖南": "hunan",
          "甘肃": "gansu",
          "福建": "fujian",
          "贵州": "guizhou",
          "辽宁": "liaoning",
          "陕西": "shanxi",
          "青海": "qinghai",
          "黑龙江": "heilongjiang",
          "china": "中国",
          "world": "世界",
          "aomen": "澳门",
          "xianggang": "香港",
          "taiwan": "台湾",
          "beijing": "北京",
          "shanghai": "上海",
          "chongqing": "重庆",
          "guangxi": "广西",
          "xinjiang": "新疆",
          "xizang": "西藏",
          "neimenggu": "内蒙古",
          "yunnan": "云南",
          "jilin": "吉林",
          "sichuan": "四川",
          "tianjin": "天津",
          "ningxia": "宁夏",
          "anhui": "安徽",
          "shangdong": "山东",
          "shangxi": "山西",
          "guangdong": "广东",
          "jiangsu": "江苏",
          "jiangxi": "江西",
          "hebei": "河北",
          "henan": "河南",
          "zhejiang": "浙江",
          "hainan": "海南",
          "hubei": "湖北",
          "hunan": "湖南",
          "gansu": "甘肃",
          "fujian": "福建",
          "guizhou": "贵州",
          "liaoning": "辽宁",
          "shanxi": "陕西",
          "qinghai": "青海",
          "heilongjiang": "黑龙江"
    }

```


### 注册地图方式

```javascript
    const get=(u="/")=>fetch(u).then(x=>x.json())
    const MAP_SERVER="https://map-1252957949.cos.ap-guangzhou.myqcloud.com"

    test1=async ()=>{
        mapName="山东"
        url="https://map-1252957949.cos.ap-guangzhou.myqcloud.com/china/shangdong.json"
        r=await get(url)
        echarts.registerMap(mapName, r)
    }

    test=()=>{
        //echarts=...
        mapName="北京"
        //d=province2pinyin[mapName]
        d="beijing"
        url=MAP_SERVER+"/map/china/"+d+".json"
        r=await get(url)
        echarts.registerMap(mapName, r)
    }

```
