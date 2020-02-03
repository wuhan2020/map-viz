/**
 * React Echarts可视化通用组件
 * 本地图组件为使用echarts进行开发提供了基础组件
 * @author: shadowingszy
 *
 * 传入props说明:
 * chartOptions: echarts中的所有options。
 */

import React from 'react';
import echarts from 'echarts';

type Props = {
  chartOptions: any;
}

export class ReactEcharts extends React.Component<Props> {
  static defaultProps = {
    chartOptions: {}
  }

  chartId: string = this.generateChartId();
  chart: any = null;

  /**
   * 使用随机数+date生成当前组件的唯一ID
   */
  generateChartId() {
    const random = Math.floor(Math.random() * 100);
    const dateStr = new Date().getTime();
    return 'map' + random.toString() + dateStr.toString();
  }

  componentDidMount() {
    setTimeout(() => {
      if (document.getElementById(this.chartId)) {
        this.chart = echarts.init((document.getElementById(this.chartId) as HTMLDivElement));
        // console.log(this.chart);
        this.chart.setOption(this.props.chartOptions);
        let onResizeFunction = (window as any).onresize;
        window.onresize = () => {
          if (onResizeFunction) {
            onResizeFunction();
          }
          this.chart.resize();
        };
      }
      
    }, 0);
  }

  public render() {
    if (this.chart) {
      this.chart.setOption(this.props.chartOptions, false, false);
    }
    // console.log(this.chart, this.props);
    return (
      <div id={this.chartId} style={{ width: '100%', height: '100%' }}></div>
    );
  }
}
