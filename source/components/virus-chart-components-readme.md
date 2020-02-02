# WebCell 疫情数据折线图可视化组件

本组件使用stack line chart和line chart展现信息
@author: shadowingszy

## 传入参数及说明:

data: 各省市或国家数据。
area: 当前选中的国家或省市。

data 数据格式，为

```
{
  provincesSeries: Series<ProvinceData> | CountryData;
  countrySeries: Series<CountryOverviewData>;
}
```

参考:

```
interface CountryOverviewData extends PatientStatData {
  name: string; // '中国'
  timestamp?: number; // integer, unit is 'ms', unix epoch time
}

interface CityData extends PatientStatData {
  name: string; // '武汉'
  timestamp?: number;
}

interface CountryData extends PatientStatData {
  name: string; // '中国'
  timestamp?: number; // integer, unit is 'ms', unix epoch time
  provinces?: { [name: string]: ProvinceData };
}

interface ProvinceData extends PatientStatData {
  name: string; // '湖北'
  timestamp?: number;
  cities: { [name: string]: CityData };
}

type Series<T extends CountryData | ProvinceData | CityData> = {
  [timestamp: number]: { [name: string]: T };
};

interface OverallCountryData {
  provincesSeries: Series<ProvinceData> | CountryData;
  countrySeries: Series<CountryOverviewData>;
}
```

## 使用样例

使用样例见 VirusMap.tsx 组件
