/**
 * React 地理热力图可视化通用组件
 * 本地图组件为地理热力图定制化开发提供了最高的自由度
 * @author: shadowingszy
 *
 * 传入props说明:
 * mapUrl: 地图json文件地址
 * chartOptions: echarts中的所有options
 * mapName: 地图名称
 * chartOnClickCallBack: 点击地图后的回调函数
 */

import React from 'react';
import echarts from 'echarts';
import long2short from '../../adapters/long2short';

interface Props {
  mapUrl: string;
  chartOptions: any;
  mapName: string;
  chartOnClickCallBack: Function;
}

export class EchartsMap extends React.Component<Props> {

  static defaultProps = {
    mapUrl: '',
    chartOptions: {},
    mapName: '',
    chartOnClickCallBack: (param: any, chart: any) => {
      console.log(param, chart);
    }
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
    const { mapUrl, mapName, chartOptions, chartOnClickCallBack } = this.props;
    this.updateMap(mapUrl, mapName, chartOptions, chartOnClickCallBack);
  }

  updateMap(mapUrl: string, mapName: string, chartOptions: any, chartOnClickCallBack: Function) {
    fetch(mapUrl)
      .then(response => response.json())
      .then(data => {
        if (!document.getElementById(this.chartId)) {
          return;
        }
        data.features.forEach(
          (f: { properties: { name: string } }) =>
            (f.properties.name = long2short(f.properties.name))
        );
        echarts.registerMap(mapName, data);
        if (!this.chart) {
          this.chart = echarts.init((document.getElementById(this.chartId)) as HTMLDivElement);
          // implement hover-then-click on mobile devices
          let eventState = {
            hovered: ''
          };
          this.chart.on('mouseover', 'series', (params: { name: string; }) => {
            // prevent click event to trigger immediately
            setTimeout(() => (eventState.hovered = params.name), 0);
          });
          this.chart.on('mouseout', 'series', () => {
            eventState.hovered = '';
          });
          this.chart.on('click', 'series', (params: any) => {
            if (eventState.hovered.length > 0) {
              chartOnClickCallBack(params, this.chart);
              eventState.hovered = '';
            }
          });

          this.chart.on('click', 'timeline', (params: { dataIndex: any; }) => {
            this.chart.dispatchAction({
              type: 'timelineChange',
              // index of time point
              currentIndex: chartOptions.baseOption.timeline.data.findIndex(
                (d: any) => d === params.dataIndex
              )
            });
          });
        }
        this.chart.setOption(chartOptions);

        let originFunction = (window as any).onresize;
        window.onresize = () => {
          originFunction();
          this.chart.resize();
        };
      })
      .catch(e => console.log('加载疫情地图出现错误！', e));
  }

  public render() {
    if (this.chart) {
      const { mapUrl, mapName, chartOptions, chartOnClickCallBack } = this.props;
      this.updateMap(mapUrl, mapName, chartOptions, chartOnClickCallBack);
    }

    return (
      <div id={this.chartId} style={{ width: '100%', height: '100%' }}></div>
    );
  }
}
