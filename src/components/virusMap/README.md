# React 疫情地图可视化组件

本地图组件提供了完整的全国疫情查看功能，并提供增加聚焦到省显示市级数据与回到省级的功能。
@author: shadowingszy,yarray

## 传入参数:

- resolution: 时间精度。
- data: echarts 中每个区域的疫情数据。
- type: 三种不同的charts显示方式(可选值为: overview, pc, mobile)。

## 参数说明：

传入参数的数据格式为:

```typescript
interface Props {
  resolution: number; // 地图放大的程度
  type: 'overview' | 'pc' | 'mobile'; // 三种不同的显示模式，分别对应总览（不支持下钻，无折线图）、pc端（支持下钻，折线图在地图右方）、移动端（支持下钻，折线图在地图下方）
  data: { 
    provinceSeries: {
      [time: number]: ProvinceData
    },
    countrySeries: {
      [time: number]: CountryData
    } 
  }; //echarts 中每个区域的疫情数据。
}

interface ProvinceData {
  name: string;
  timestamp: number;
  confirmed: number;
  suspected: number;
  cured: number;
  dead: number;
  cities: {
    [name: string]: PatientStatData 
  }
}

interface PatientStatData {
  name: string,
	timestamp: 1580699799130,
  confirmed: number;
  suspected: number;
  cured: number;
  dead: number;
}

interface CountryData {
  confirmedCount: number;
	suspectedCount: number;
	curedCount: number;
	deadCount: number;
	seriousCount: number;
  updateTime: number;
}
```

data属性数据样例:

```json
{
	"provincesSeries":{
		"1580659200000": {
			"name": "福建",
			"timestamp": 1580699799130,
			"cities": {
				"福州": {
					"name": "福州",
					"timestamp": 1580699799130,
					"confirmed": 47,
					"suspected": 0,
					"cured": 0,
					"dead": 0,
				}, 
				"莆田": {
					"name": "莆田",
					"timestamp": 1580699799130,
					"confirmed": 47,
					"suspected": 0,
					"cured": 0,
					"dead": 0,
				}
			},
			"confirmed": 179,
			"suspected": 0,
			"cured": 0,
			"dead": 0,
		},
		"1580572800000": {
			"name": "福建",
			"timestamp": 1580699799130,
			"cities": {
				"福州": {
					"name": "福州",
					"timestamp": 1580699799130,
					"confirmed": 97,
					"suspected": 0,
					"cured": 0,
					"dead": 0,
				}, 
				"莆田": {
					"name": "莆田",
					"timestamp": 1580699799130,
					"confirmed": 107,
					"suspected": 0,
					"cured": 0,
					"dead": 0,
				}
			},
			"confirmed": 219,
			"suspected": 0,
			"cured": 0,
			"dead": 0,
		}
	},
	"countrySeries": {
		"1580659200000": {
			"confirmedCount": 14490,
			"suspectedCount": 19544,
			"curedCount": 434,
			"deadCount": 304,
			"seriousCount": 0,
			"updateTime": 1580659262067
		},
		"1580572800000": {
			"confirmedCount": 14490,
			"suspectedCount": 19544,
			"curedCount": 434,
			"deadCount": 304,
			"seriousCount": 0,
			"updateTime": 1580572800000
		},
	}
}
```

## 使用样例

```js
<HierarchicalVirusMap data={data} resolution={resolution} type={'overview'} />
<HierarchicalVirusMap data={data} resolution={resolution} type={'pc'} />
<HierarchicalVirusMap data={data} resolution={resolution} type={'mobile'} />
```
