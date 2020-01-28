/**
 * WebCell地图可视化通用组件
 * 本地图组件为地图定制化开发提供了最高的自由度
 * @author: shadowingszy
 * 
 * 传入props说明:
 * mapUrl: 地图json文件地址。
 * chartOptions: echarts中的所有options，注意，地图的map项值为'map'。
 * chartOnClickCallBack: 点击地图后的回调函数。
 * 
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import echarts from 'echarts';

interface MapProps {
  mapUrl?: string;
  chartOptions?: Object;
  chartOnClickCallBack?: Function;
}

@observer
@component({
  tagName: 'echarts-map',
  renderTarget: 'children'
})
export class EchartsMap extends mixin<MapProps, {}>() {
  @attribute
  @watch
  mapUrl = '';

  @attribute
  @watch
  chartOptions = {};

  @attribute
  @watch
  chartOnClickCallBack = (param) => { console.log(param) };

  connectedCallback() {
    const { mapUrl, chartOptions, chartOnClickCallBack } = this.props;
    setTimeout(() => {
      fetch(mapUrl)
        .then(response => response.json())
        .then(data => {
          echarts.registerMap('map', data);
          const myChart = echarts.init(document.getElementById('map'));
          myChart.setOption(chartOptions)
          myChart.on('click', function (params) {
            chartOnClickCallBack(params);
          });
        })
        .catch(e => console.log("获取地图失败", e));
    }, 0)
  }

  public render() {
    return (
      <div id='map' style={{ width: "100%", height: "100%" }}></div>
    );
  }
}