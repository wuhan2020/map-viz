# React 疫情地图可视化组件

本地图组件提供了完整的全国疫情查看功能，并提供增加聚焦到省显示市级数据与回到省级的功能。
@author: shadowingszy,yarray

## 传入参数:

resolution: 时间精度。
data: echarts 中每个区域的疫情数据。
type: 三种不同的charts显示方式(可选值为: overview, pc, mobile)。

## 参数说明：

传入参数的数据格式为:

```typescript
interface Props {
  resolution: number; // 地图放大的程度
  data: { [name: string]: PatientStatData };//echarts 中每个区域的疫情数据。
  type: 'overview' | 'pc' | 'mobile';
}

interface PatientStatData {
  confirmed: number;
  suspected: number;
  cured: number;
  dead: number;
}
```

data属性数据样例1:

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

数据样例2:

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
<HierarchicalVirusMap data={data} resolution={resolution} type={'overview'} />
<HierarchicalVirusMap data={data} resolution={resolution} type={'pc'} />
<HierarchicalVirusMap data={data} resolution={resolution} type={'mobile'} />
```
