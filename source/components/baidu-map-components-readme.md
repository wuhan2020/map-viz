# WebCell 百度地图地图可视化通用组件
本地图组件已接入百度地图API，为百度地图定制化开发提供了最高的自由度
@author: shadowingszy

## 传入参数及说明:
key: 百度地图API的密钥，默认为我自己申请的百度地图API密钥，建议自己申请。
mapOptions: 地图配置项，可参考百度地图API进行配置。

mapOptions入参样例：
```
{
  initPoint: [116.350658, 39.938285], // 地图初始化时中心点坐标
  zoom: 6, // 地图初始化时缩放比例
  markerArray: [ // 地图上标记点数组
    {
      type: "hospital",
      name: "XXXXX",
      coord: [111,30],
      metaData: {} // 根据type不同，属性也不同
    }
  ]
}
```

目前支持的type有：hospital,hotel,others三种
hospital样例：
```
metaData: {
  requests: [
    ['普通医用口罩', 1000],
    ['医用外科口罩', 1000],
    ['医用防护口罩 | N95口罩', 10000],
    ['防冲击眼罩/护目镜/防护眼镜', 1000],
    ['防护面罩', true],
    ['防护帽/医用帽/圆帽', 1000],
  ],
  url: 'https://mp.weixin.qq.com/s/geO3CCd0_8B3L-r_xlBbZQ',
  address: '红安县人民医院红安县城关镇陵园大道附50号',
  contact: '0713-5242320',
  note: '设备科周主任13636105950',
}
```

hotel样例：
```
metaData: {
  capacity: 50,
  address: 'XXXXXXXXXXX',
  contact: 'XXX：123456789',
  note: '发布日期, 2020年1月26日',
}
```

others样例：
```
metaData: {
  content: '我是内容',
}
```

## 使用样例
使用样例见InformationMap.tsx组件