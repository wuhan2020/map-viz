/**
 * WebCell Echarts热力图-地图可视化通用组件
 * 本地图组件为热力图-地图定制化开发提供了最高的自由度
 * @author: shadowingszy
 *
 * 传入props说明:
 * mapUrl: 地图json文件地址。
 * chartOptions: echarts中的所有options，注意，地图的map项值为'map'。
 * chartOnClickCallBack: 点击地图后的回调函数。
 * chartGeoRoamCallBack: 地图缩放事件回调函数。
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import echarts from 'echarts';
import long2short from '../adapters/long2short';

interface MapProps {
  mapUrl?: string;
  chartOptions?: Object;
  chartOnClickCallBack?: Function;
  chartGeoRoamCallBack?: Function;
}
// This is a workaround to
function findMatchPlaces(places: string[], tested: string) {
  return places.find(p => p.includes(tested));
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
  chartOnClickCallBack = (param, chart) => {
    console.log(param, chart);
  };

  @attribute
  @watch
  chartGeoRoamCallBack = (param, chart) => {
    console.log(param, chart);
  };

  chartId = this.generateChartId();
  chart: any;

  /**
   * 使用随机数+date生成当前组件的唯一ID
   */
  generateChartId() {
    const random = Math.floor(Math.random() * 100);
    const dateStr = new Date().getTime();
    return 'map' + random.toString() + dateStr.toString();
  }

  updatedCallback() {
    const {
      mapUrl,
      chartOptions,
      chartOnClickCallBack,
      chartGeoRoamCallBack
    } = this.props;
    if (this.chart !== undefined) {
      this.chart.showLoading();
    }
    fetch(mapUrl)
      .then(response => response.json())
      .then(data => {
        // convert to short names, better to use a map already with short names
        data.features.forEach(
          (f: { properties: { name: string } }) =>
            (f.properties.name = long2short(f.properties.name))
        );
        echarts.registerMap('map', data);
        this.chart = echarts.init(document.getElementById(this.chartId));
        this.chart.setOption(chartOptions);
        this.chart.on('click', function(params) {
          chartOnClickCallBack(params, this.chart);
        });
        this.chart.on('georoam', function(params) {
          if (params.dy === undefined && params.dx === undefined) {
            chartGeoRoamCallBack(params, this.chart);
          }
        });
        this.chart.hideLoading();
      })
      .catch(e => console.log('获取地图失败', e));
  }

  public render() {
    return (
      <div id={this.chartId} style={{ width: '100%', height: '100%' }}></div>
    );
  }
}
