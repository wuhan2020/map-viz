# WebCell 疫情地图可视化组件

本地图组件提供了完整的全国疫情查看功能
在 VirusMap 基础上，增加聚焦到省显示市级数据与回到省级的功能
@author: yarray

## 传入参数及说明:

name: 地区名称
data: echarts 中每个区域的疫情数据。
chartOnClickCallBack: 点击地图后的回调函数。

data 数据格式，为

```typescript
// 地图放大的程度
resolution: number
//echarts 中每个区域的疫情数据。
data: { [name: string]: PatientStatData };
```

data 参考:

```typescript
interface PatientStatData {
  confirmed: number;
  suspected: number;
  cured: number;
  dead: number;
}
```

数据样例： 1.

```json
{
  "吉林": {
    "name": "吉林",
    "timestamp": 1580260529915,
    "confirmed": 9,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  },
  "西藏": {
    "name": "西藏",
    "timestamp": 1580264158978,
    "confirmed": 0,
    "suspected": 1,
    "cured": 0,
    "dead": 0
  },
  "北京": {
    "confirmed": 102,
    "suspected": 0,
    "cured": 4,
    "dead": 1
  },
```

数据样例： 2.

```json
{
  "晋中": {
    "name": "晋中",
    "confirmed": 9,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  },
  "运城": {
    "name": "运城",
    "confirmed": 4,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  },
  "太原": {
    "name": "太原",
    "confirmed": 3,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  },
  "大同": {
    "name": "大同",
    "confirmed": 3,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  },
  "吕梁": {
    "name": "吕梁",
    "confirmed": 3,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  },
  "朔州": {
    "name": "朔州",
    "confirmed": 2,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  },
  "阳泉": {
    "name": "阳泉",
    "confirmed": 1,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  },
  "长治": {
    "name": "长治",
    "confirmed": 1,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  },
  "临汾": {
    "name": "临汾",
    "confirmed": 1,
    "suspected": 0,
    "cured": 0,
    "dead": 0
  }
}
```

## 使用样例

```js
<HierarchicalVirusMap data={data} resolution={resolution} />
```

使用样例见 [`HierarchicalVirusMapDemo.tsx`](https://github.com/wuhan2020/map-viz/blob/master/demo/source/page/HierarchicalVirusMapDemo.tsx) 组件
