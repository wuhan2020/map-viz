/**
 * WebCell疫情地图组件
 * 基于EchartsMap组件构建的疫情地图组件，传入地图url及各区域的具体信息后自动生成疫情地图。
 * @author: shadowingszy, yarray
 *
 * 传入props说明:
 * name: 地图对应的行政区划（简写）
 * data: 显示在地图中的疫情数据。
 * chartOnClickCallBack: 点击地图后的回调函数。
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import { EchartsMap } from '../components/EchartsMap';
import { PatientStatData } from '../adapters/patientStatInterface';
import MapUrls from '../../map_data/map_dict.json';

type MapDataType = { [name: string]: PatientStatData };
type STMapDataType = {
  timeline: number[];
  data: { [timestamp: number]: MapDataType };
}; // spatio-temporal data

interface VirusMapProps {
  name: string;
  data?: MapDataType | STMapDataType;
  chartOnClickCallBack?: Function;
}

@observer
@component({
  tagName: 'virus-map',
  renderTarget: 'children'
})
export class VirusMap extends mixin<VirusMapProps, {}>() {
  @attribute
  @watch
  public name: string = '';

  @attribute
  @watch
  public data: MapDataType = {};

  @attribute
  @watch
  public chartOnClickCallBack = (param, chart) => {
    console.log(param, chart);
  };

  public state = {
    mapScale: 1
  };

  constructor() {
    super();
    this.chartAdjustLabel = this.chartAdjustLabel.bind(this);
    this.baseOptions = this.baseOptions.bind(this);
    this.getSTChartOptions = this.getSTChartOptions.bind(this);
    this.getChartOptions = this.getChartOptions.bind(this);
    this.overrides = this.overrides.bind(this);
  }

  baseOptions() {
    return {
      title: {
        text: '疫情地图'
      },
      tooltip: {},
      visualMap: [
        {
          type: 'piecewise',
          right: '10%',
          left: undefined,
          top: undefined,
          orient: 'vertical',
          itemHeight: 10,
          itemWidth: 14,
          itemGap: 10,
          bottom: '10%',
          itemSymbol: 'circle',
          backgroundColor: 'rgba(200,200,200, 0.2)',
          padding: 10,
          textStyle: {
            fontSize: 10
          },
          pieces: [
            { min: 0, max: 0, color: '#EEFFEE' },
            { min: 1, lte: 10, color: '#FFFADD' },
            { gt: 10, lte: 50, color: '#FFDC90' },
            { gt: 50, lte: 100, color: '#FF9040' },
            { gt: 100, lte: 500, color: '#DD5C5C' },
            { gt: 500, lte: 1000, color: '#901010' },
            { gt: 1000, color: '#600000' }
          ]
          /*
        formatter: (gt: number, lte: number) =>  {
          console.log(gt, lte);
          return lte === Infinity ? `> ${gt}` : lte > gt ? `(${gt}, ${lte}]` : `= ${lte}`}
        */
        }
      ],
      series: [
        {
          name: '疫情数据',
          type: 'map',
          mapType: 'map',
          // roam: true,
          zoom: 1,
          label: {
            show: true, //mapScale > 2.5,
            fontSize: 10, //2 * mapScale
            textBorderColor: '#FAFAFA',
            textBorderWidth: 1
          },
          emphasis: {
            label: {
              show: true, //mapScale > 2.5,
              fontSize: 10 //2 * mapScale
            }
          },
          data: []
        }
      ]
    };
  }

  overrides(data: MapDataType) {
    return {
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          if (params.componentType === 'timeline') {
            if ((params.dataIndex % 24) * 3600000 === 0) {
              return new Date(params.dataIndex).toLocaleDateString('zh-CN');
            } else {
              return new Date(params.dataIndex).toLocaleDateString(
                'zh-CN-u-hc-h24'
              );
            }
          }
          const outputArray = [params.name];
          if (data[params.name] === undefined) {
            return params.name + '<br/>暂无数据';
          }
          if (data[params.name].confirmed !== undefined) {
            outputArray.push('确诊：' + data[params.name].confirmed);
          }
          if (data[params.name].suspected !== undefined) {
            outputArray.push('疑似：' + data[params.name].suspected);
          }
          if (data[params.name].cured !== undefined) {
            outputArray.push('治愈：' + data[params.name].cured);
          }
          if (data[params.name].dead !== undefined) {
            outputArray.push('死亡：' + data[params.name].dead);
          }
          return outputArray.join('<br/>');
        }
      },
      series: [
        {
          data: Object.keys(data).map(name => ({
            name,
            value: data[name].confirmed || 0
          }))
        }
      ]
    };
  }

  public chartAdjustLabel(param: any, chart: any): void {
    const isForceRatio = 0.75;
    const isAdjustLabel = true;
    let options = this.baseOptions();
    if (chart && options) {
      const domWidth = chart.getWidth();
      const domHeight = chart.getHeight();
      if (isForceRatio) {
        const maxWidth = Math.min(domWidth, domHeight / isForceRatio);
        const maxHeight = Math.min(domHeight, maxWidth * isForceRatio);
        // move the item MUCH closer
        if (domHeight > domWidth) {
          options.visualMap[0].orient = 'horizontal';
          options.visualMap[0].right = undefined;
          options.visualMap[0].top = Math.max(
            domHeight / 2 - maxHeight / 2 - 50,
            0
          );
          options.visualMap[0].bottom = undefined;
          options.visualMap[0].left = 'center';
        } else if (domHeight > domWidth * isForceRatio) {
          options.visualMap[0].orient = 'vertical';
          options.visualMap[0].left = undefined;
          options.visualMap[0].right = 0 as any;
          options.visualMap[0].bottom = '10%';
          options.visualMap[0].top = undefined;
        } else {
          options.visualMap[0].orient = 'vertical';
          options.visualMap[0].right = undefined;
          options.visualMap[0].top = undefined;
          options.visualMap[0].bottom = '10%';
          options.visualMap[0].left = Math.min(
            domWidth / 2 + maxWidth / 2,
            domWidth - 100
          );
        }
      }
      const scale = param ? param.scale : 1;
      if (isAdjustLabel && scale) {
        options.series.forEach(s => (s.zoom *= scale));
        const size = options.series[0].zoom * Math.min(domWidth, domHeight);
        if (size < 200) {
          options.series.forEach(s => (s.label.show = false));
        } else {
          options.series.forEach(s => (s.label.show = true));
        }
      }
      if (this.isTimelineData(this.props.data)) {
        options = this.getSTChartOptions(
          this.props.data as STMapDataType,
          options
        ) as any;
      } else {
        options = this.getChartOptions(
          this.props.data as MapDataType,
          options
        ) as any;
      }
      chart.setOption(options);
    }
  }

  public getChartOptions(data: MapDataType, options: any = null) {
    if (!options) {
      options = this.baseOptions();
    }
    let extra = this.overrides(data);
    options.series[0].data = extra.series[0].data;
    options.tooltip = extra.tooltip;
    return options;
  }
  public getSTChartOptions(data: STMapDataType, options: any = null) {
    if (!options) {
      options = this.baseOptions();
    }
    options['timeline'] = {
      axisType: 'time',
      show: true,
      tooltip: {},
      // autoPlay: true,
      playInterval: 1500,
      currentIndex: data.timeline.length - 1,
      data: data.timeline,
      label: {
        fontSize: 10,
        position: 10,
        rotate: 45,
        textStyle: {
          align: 'right',
          baseline: 'middle'
        },
        formatter: function(s) {
          return new Date(parseInt(s, 10)).toLocaleDateString().slice(5); // year is not necessary
        }
      }
    };
    return {
      baseOption: options,
      options: data.timeline.map(t => this.overrides(data.data[t]))
    };
  }

  private isTimelineData(data: MapDataType | STMapDataType): boolean {
    return (data as STMapDataType).timeline !== undefined;
  }
  public render({ name, data, chartOnClickCallBack }: VirusMapProps, {}) {
    // 缩放时间重新set一下option
    return (
      <EchartsMap
        mapUrl={MapUrls[name]}
        isForceRatio={0.75}
        isAdjustLabel={true}
        chartOptions={
          this.isTimelineData(data)
            ? this.getSTChartOptions(data as STMapDataType)
            : this.getChartOptions(data as MapDataType)
        }
        chartOnClickCallBack={chartOnClickCallBack}
        chartAdjustLabel={this.chartAdjustLabel}
      />
    );
  }
}

export { MapDataType, STMapDataType };
