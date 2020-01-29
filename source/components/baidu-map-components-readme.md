# WebCell 百度地图地图可视化通用组件
本地图组件已接入百度地图API，为百度地图定制化开发提供了最高的自由度
@author: shadowingszy

## 传入参数及说明:
key: 百度地图API的密钥，默认为我自己申请的百度地图API密钥，建议自己申请。
mapUrl: 地图json文件地址，可参考x中的数据进行配置。

mapUrl入参样例：
```
{
  initPoint: [116.350658, 39.938285], // 地图初始化时中心点坐标
  zoom: 6, // 地图初始化时缩放比例
  markerArray: [ // 地图上标记点数组
    {
      point: [116.350658, 39.938285], // 地图标记点坐标
      labelText: '医院物资', // 地图标记点label内容
      labelStyle: { // 地图标记点label样式
        color : "white",
        backgroundColor: "red",
        border: "0px" 
      },
      infoWindowTitle: '<p>XX医院</p>', // 点击地图标记点弹出窗口（InfoWindow）的标题（支持HTMLElement）
      infoWindowContent: '<p>1、医用防护口罩（N95）10个</p>'// 点击地图标记点弹出窗口（InfoWindow）内容（支持HTMLElement）
    },
  ]
}
```

## 使用样例
使用样例见InformationMap.tsx组件