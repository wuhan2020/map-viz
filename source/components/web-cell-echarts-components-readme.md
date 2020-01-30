# WebCell Echarts 可视化组件

本地图组件为使用 echarts 进行开发提供了基础组件
@author: shadowingszy

## 传入参数及说明:

chartOptions: echarts 中的所有 options。

数据样例：

```
{
  title: {
    text: '疫情数据折线图'
  },
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    type: 'time'
  },
  yAxis: {},
  series: [
    {
      data: [
        ['2020-01-21', 200],
        ['2020-01-22', 345],
        ['2020-01-23', 494],
        ['2020-01-24', 531],
        ['2020-01-25', 795],
        ['2020-01-26', 936],
        ['2020-01-27', 1396],
      ],
      type: 'line'
    }
  ]
}
```

## 使用样例

使用样例见 VirusLineCharts.tsx 组件
