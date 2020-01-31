# WebCell 地图信息可视化组件
本地图组件是对BaiduMap可视化组件进行的封装。
本组件固定了地图上Marker的格式以及样式。
@author: shadowingszy

## 传入参数及说明:
mapOptions: 地图配置项，可参考百度地图API进行配置。（可参考/mock/information_map_general_mock_data.js）

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
使用样例见MapViz.tsx组件