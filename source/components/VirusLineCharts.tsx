/**
 * WebCell Echarts可视化通用组件
 * 本地图组件为使用echarts进行开发提供了基础组件
 * @author: shadowingszy
 *
 * 传入props说明:
 * chartOptions: echarts中的所有options。
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell } from 'web-cell';
import { WebCellEcharts } from './WebCellEcharts';

@observer
@component({
  tagName: 'virus-line-charts',
  renderTarget: 'children'
})
export class VirusLineCharts extends mixin<{}, {}>() {
  public getChartOptions() {
    return {
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
            ['2020-01-27', 1396]
          ],
          type: 'line'
        }
      ]
    };
  }

  public render() {
    return <WebCellEcharts chartOptions={this.getChartOptions()} />;
  }
}
