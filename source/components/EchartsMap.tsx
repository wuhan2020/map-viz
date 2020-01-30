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
  chartOnDblClickCallBack?: Function;
  chartGeoRoamCallBack?: Function;
}

const LONG_PRESS_INTERVAL = 500;

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
  public chartOnDblClickCallBack = (param, chart) => {
    console.log('double click', param, chart);
  };

  @attribute
  @watch
  public chartOnLongPressCallBack = (param, chart) => {
    console.log('long press', param, chart);
  };

  @attribute
  @watch
  public chartGeoRoamCallBack = (param, chart) => {
    this.adjustOption(param.zoom);
  };

  constructor() {
    super();
    this.adjustOption = this.adjustOption.bind(this);
  }

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

  public adjustOption(scale: number = 1): void {
    const options = this.props.chartOptions;
    if (this.chart && options) {
      const domWidth = this.chart.getWidth();
      const domHeight = this.chart.getHeight();

      options.series[0].zoom *= scale;
      const size = options.series[0].zoom * Math.min(domWidth, domHeight);
      if (this.props.isForceRatio) {
        const maxWidth = Math.min(
          domWidth,
          domHeight / this.props.isForceRatio
        );
        // move the item MUCH closer
        if (domHeight > domWidth) {
          options.visualMap[0].orient = 'horizontal';
          options.visualMap[0].right = undefined;
          options.visualMap[0].left = undefined;
        } else if (domHeight > domWidth * this.props.isForceRatio) {
          options.visualMap[0].orient = 'vertical';
          options.visualMap[0].left = undefined;
          options.visualMap[0].right = 0;
        } else {
          options.visualMap[0].orient = 'vertical';
          options.visualMap[0].right = undefined;
          options.visualMap[0].left = Math.min(
            domWidth / 2 + maxWidth / 2,
            domWidth - 100
          );
        }
      }
      if (this.props.isAdjustLabel && scale) {
        if (size < 200) {
          options.series[0].label.show = false;
        } else {
          options.series[0].label.show = true;
        }
      }
      this.chart.setOption(options);
    }
  }

  updatedCallback() {
    const {
      mapUrl,
      chartOptions,
      chartOnDblClickCallBack,
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
        this.chart.on('dblclick', function(params) {
          chartOnDblClickCallBack(params, this.chart);
        });

        // implement hover-then-click on mobile devices
        let eventState = {
          hovered: ''
        };
        this.chart.on('mouseover', params => {
          // prevent click event to trigger immediately
          setTimeout(() => (eventState.hovered = params.name), 0);
        });
        this.chart.on('mouseout', () => {
          eventState.hovered = '';
        });
        this.chart.on('click', params => {
          if (eventState.hovered.length > 0) {
            chartOnDblClickCallBack(params, this.chart);
            eventState.hovered = '';
          }
        });

        this.chart.on('georoam', function(params) {
          if (
            this.chart !== undefined &&
            params.dy === undefined &&
            params.dx === undefined
          ) {
            chartGeoRoamCallBack(params, this.chart);
          }
        });
        window.onresize = () => {
          this.chart.resize();
          this.adjustOption();
        };
        this.adjustOption();
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
