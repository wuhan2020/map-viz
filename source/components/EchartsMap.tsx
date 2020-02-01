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
  chartOptions?: any;
  isForceRatio?: number;
  isAdjustLabel?: boolean;
  chartOnClickCallBack?: (param: any, chart: any) => void;
  chartGeoRoamCallBack?: (param: any, chart: any) => void;
  chartAdjustLabel?: (param: any, chart: any) => void;
}

@observer
@component({
  tagName: 'echarts-map',
  renderTarget: 'children'
})
export class EchartsMap extends mixin<MapProps, {}>() {
  @attribute
  @watch
  public mapUrl: string = '';

  @attribute
  @watch
  public isForceRatio: number = null;

  @attribute
  @watch
  public isAdjustLabel: number = null;

  @attribute
  @watch
  public chartOptions: Object = {};

  @attribute
  @watch
  public chartOnClickCallBack = (param, chart: any) => {
    console.log('click', param, chart);
  };

  @attribute
  @watch
  public chartGeoRoamCallBack = (param, chart) => {
    console.log('roam', param, chart);
  };

  @attribute
  @watch
  public chartAdjustLabel = (param, chart) => {
    console.log('adjust-label', param, chart);
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

        // implement hover-then-click on mobile devices
        let eventState = {
          hovered: ''
        };
        this.chart.on('mouseover', 'series', params => {
          // prevent click event to trigger immediately
          setTimeout(() => (eventState.hovered = params.name), 0);
        });
        this.chart.on('mouseout', 'series', () => {
          eventState.hovered = '';
        });
        this.chart.on('click', 'series', params => {
          if (eventState.hovered.length > 0) {
            chartOnClickCallBack(params, this.chart);
            eventState.hovered = '';
          }
        });

        this.chart.on('click', 'timeline', params => {
          this.chart.dispatchAction({
            type: 'timelineChange',
            // index of time point
            currentIndex: chartOptions.baseOption.timeline.data.findIndex(
              d => d === params.dataIndex
            )
          });
        });

        // this.chart.on('georoam', function(params) {
        //   if (
        //     this.chart !== undefined &&
        //     params.dy === undefined &&
        //     params.dx === undefined
        //   ) {
        //     chartGeoRoamCallBack(params, this.chart);
        //   }
        // });
        let originFunction = (window as any).onresize;
        window.onresize = () => {
          originFunction();

          this.chart.resize();
          if (this.props.chartAdjustLabel) {
            this.props.chartAdjustLabel(null, this.chart);
          }
          // this.adjustOption();
        };
        if (this.props.chartAdjustLabel) {
          this.props.chartAdjustLabel(null, this.chart);
        }
        this.chart.hideLoading();
      })
      .catch(e => console.log('获取地图失败', e));
  }

  public render() {
    return (
      <div>
        <div id={this.chartId} style={{ width: '100%', height: '100%' }}></div>
      </div>
    );
  }
}
