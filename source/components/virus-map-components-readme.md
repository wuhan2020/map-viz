# WebCell 疫情地图可视化组件
本地图组件提供了开箱即用的疫情地图可视化组件。
@author: shadowingszy

## 传入参数及说明:
mapUrl: 地图json文件地址。
data: echarts中每个区域的疫情数据。
chartOnClickCallBack: 点击地图后的回调函数。

入参样例1：
```
{
  "name": "中国",
  "mapUrl": "https://map-1252957949.cos.ap-guangzhou.myqcloud.com/china.json",
  "data": [
    {
      "name": "北京",
      "confirmed": 1,
      "suspect": 10,
      "cured": 20,
      "death": 1
    },
    {
      "name": "上海",
      "confirmed": 3,
      "suspect": 10,
      "cured": 20,
      "death": 1
    },
    {
      "name": "重庆",
      "confirmed": 4,
      "suspect": 10,
      "cured": 20,
      "death": 1
    },
    {
      "name": "河北",
      "confirmed": 5,
      "suspect": 10,
      "cured": 20,
      "death": 1
    }
  ]
}
```

入参样例2：
```
{
  "name": "湖北",
  "mapUrl": "https://map-1252957949.cos.ap-guangzhou.myqcloud.com/china/hubei.json",
  "data":[
    {
      "provice": "湖北省",
      "name": "武汉市",
      "confirmed": 698,
      "death": 42,
      "cured": 63
    },
    {
      "provice": "湖北省",
      "name": "黄石市",
      "confirmed": 36,
      "death": 0,
      "cured": 1
    },
    {
      "provice": "湖北省",
      "name": "十堰市",
      "confirmed": 40,
      "death": 0,
      "cured": 0
    },
    {
      "provice": "湖北省",
      "name": "襄阳市",
      "confirmed": 36,
      "death": 0,
      "cured": 0
    },
    {
      "provice": "湖北省",
      "name": "宜昌市",
      "confirmed": 31,
      "death": 0,
      "cured": 1
    },
    {
      "provice": "湖北省",
      "name": "荆州市",
      "confirmed": 47,
      "death": 0,
      "cured": 2
    },
    {
      "provice": "湖北省",
      "name": "荆门市",
      "confirmed": 90,
      "death": 0,
      "cured": 3
    },
    {
      "provice": "湖北省",
      "name": "鄂州市",
      "confirmed": 20,
      "death": 0,
      "cured": 0
    },
    {
      "provice": "湖北省",
      "name": "孝感市",
      "confirmed": 100,
      "death": 0,
      "cured": 1
    }
  ]
```

## 使用样例
使用样例见MapViz.tsx组件