# WebCell 地图信息可视化组件

本地图组件是对 BaiduMap 可视化组件进行的封装。
本组件固定了地图上 Marker 的格式以及样式。
@author: shadowingszy

## 传入参数及说明:

mapOptions: 地图配置项，可参考百度地图 API 进行配置。（可参考/mock/information_map_general_mock_data.js）

mapOptions 入参样例：

```js
{
  initPoint: [116.350658, 39.938285], // 地图初始化时中心点坐标
  zoom: 6, // 地图初始化时缩放比例
  markers: [ // 地图上标记点数组
    {
      name: '华中科技大学同济医学院附属协和医院',
      //目前支持的 type 有：hospital,hotel,others 三种
      type: "hospital",
      // 坐标
      coord: [114.281196, 30.590103],
      // 有则填，无则不填
      url?: 'https://mp.weixin.qq.com/s/geO3CCd0_8B3L-r_xlBbZQ',
      // 一些属性，可能会不同
      metadata: []
    }
  ]
}
```

其中 metadata 的 type:

```js
{
  key: string; // 一个关键词
  label?: string; // 如果有label，这个作为显示词，覆盖key
  value: string|number|InquiryMeta[], // 具体值
}
// 例子
metadata: [
  { // 酒店
    key: "request",
    label: "物资需求",
    value: [
      ['普通医用口罩', 10000],
      ['医用外科口罩', true]
    ]
  }, { // 地理位置
    key: "address",
    value: '湖北省武汉市江汉区解放大道1277号华中科技大学同济医学院附属协和医院总务处',
    label: "邮寄地址",
  }, { // 酒店容量
    key: "capability",
    value: 100,
    label: "容量",
  }
]
```

## 使用样例

```js
<InformationMap initPoint={initPoint} zoom={zoom} markers={makerArray} />
```

使用样例见 [`InformationMapDemo.tsx`](https://github.com/wuhan2020/map-viz/blob/master/demo/source/page/InformationMapDemo.tsx) 组件
