# WebCell echarts热力图-地图可视化通用组件
本地图组件为热力图-地图定制化开发提供了最高的自由度，可以由组件使用者自行决定echarts的所有配置项。
@author: shadowingszy

## 功能概述
本组件负责向指定URL发起请求，读取地图信息，并将echarts初始化到id为map的div中。

## 传入参数及说明:
mapUrl: 地图json文件地址。
chartOptions: echarts中的所有options。
chartOnClickCallBack: 点击地图后的回调函数。

注意，在options.series中，我们需要设置type为'map'的一项，比如：
```
series: [
  {
    name: '疫情数据',
    type: 'map',
    mapType: 'map',
    data: data.map((item) => { return { name: item.name, value: item.confirmed } })
  }
]
```
其中mapType一项的值需要固定为'map'

## 使用样例
使用样例见VirusMap.tsx组件