/**
 * React 疫情地图组件
 * 基于EchartsMap组件构建的疫情地图组件，传入地图url及各区域的具体信息后自动生成疫情地图。
 * @author: shadowingszy, yarray
 *
 * 传入props说明:
 * name: 地图对应的行政区划（简写）
 * data: 显示在地图中的疫情数据。
 * breaks: 疫情严重程度分层。
 * chartData: 折线图数据。
 * chartPath: 热力图点击路径
 * currentChartArea: 当前点击位置
 * type: overview, pc, mobile 三种不同的charts显示方式
 * chartOnClickCallBack: 点击地图后的回调函数。
 */

import React from 'react';
import { EchartsMap } from './echartsMap';
import { VirusChart } from './virusChart';
import mapUrls from '../../data/map/district';

type MapDataType = {
  [name: string]: any
};

type STMapDataType = {
  timeline: number[];
  data: { [timestamp: number]: MapDataType };
}; // spatio-temporal data

interface Props {
  name: string;
  data: MapDataType | STMapDataType;
  breaks: number[];
  chartData: any;
  chartPath: Array<string>;
  currentChartArea: string;
  type: string;
  chartOnClickCallBack: Function;
}

const mapName = (name: string) => {
  return name === '中国' ? 'china' : 'map';
}

const PALETTE = [
  '#FFFFFF',
  '#FFFADD',
  '#FFDC90',
  '#FFA060',
  '#DD6C5C',
  '#AC2F13',
  '#3E130E'
];

const pair = (s: any[]) =>
  s.slice(0, s.length - 1).map((item, i) => [item, s[i + 1]]);

function createPieces(breaks: number[], palette: string[]) {
  return [
    { min: 0, max: 0, color: palette[0] },
    ...pair(breaks).map(([b1, b2], i) => ({
      gte: b1,
      lt: b2,
      color: palette[i + 1]
    })),
    { gte: breaks[breaks.length - 1], color: palette[breaks.length] }
  ];
}

export class VirusMap extends React.Component<Props>  {

  constructor(props: Props) {
    super(props);
    this.state = {
      mapScale: 1,
      chartArea: this.props.name
    };
  }

  static defaultProps = {
    name: '',
    data: {},
    breaks: [1, 10, 50, 100, 500, 1000],
    chartData: {},
    chartPath: [],
    currentChartArea: '',
    type: 'pc',
    chartOnClickCallBack: (param: any, chart: any) => {
      console.log(param, chart);
    }
  }

  public state = {
    mapScale: 1,
    chartArea: this.props.name
  };

  private genBasicVisualMap() {
    return {
      show: true,
      type: 'piecewise',
      left: '20px',
      right: undefined,
      top: '50px',
      bottom: undefined,
      orient: 'vertical',
      itemHeight: 10,
      itemWidth: 14,
      itemGap: 10,
      itemSymbol: 'circle',
      backgroundColor: 'rgba(200,200,200, 0.2)',
      padding: 10,
      textStyle: {
        fontSize: 10
      }
    };
  }

  private baseOptions(name: string, breaks: number[]) {
    const pieceDict = { pieces: createPieces(breaks, PALETTE) };
    const visualMap = {
      ...this.genBasicVisualMap(),
      ...pieceDict
    };
    return {
      title: {
        text: name + '疫情地图', // workaround for incomplete map data
        left: '20px',
        top: '20px'
      },
      tooltip: {},
      visualMap: [visualMap],
      series: [
        {
          name: '疫情数据',
          type: 'map',
          map: mapName(name),
          mapType: 'map',
          zoom: 1,
          label: {
            show: this.props.type === 'pc',
            fontSize: 8,
            textBorderColor: '#FAFAFA',
            textBorderWidth: 1
          },
          emphasis: {
            label: {
              show: this.props.type === 'pc',
              fontSize: 8
            }
          },
          data: []
        }
      ]
    };
  }

  private overrides(data: MapDataType) {
    return {
      tooltip: {
        trigger: 'item',
        triggerOn: 'onmousemove',
        confine: 'true',
        formatter: (params: any) => {
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
          if (this.props.type === 'mobile') {
            outputArray.push('<br/><div id="tooltip-detail">再次点击查看详情</div>');
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

  public getChartOptions(data: MapDataType, options: any = null) {
    if (!options) {
      options = this.baseOptions(this.props.name, this.props.breaks);
    }
    let extra = this.overrides(data);
    options.series[0].data = extra.series[0].data;
    options.tooltip = extra.tooltip;
    return options;
  }

  public getSTChartOptions(data: STMapDataType, options: any = null) {
    if (!options) {
      options = this.baseOptions(this.props.name, this.props.breaks);
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
        formatter: function (param: any) {
          return new Date(parseInt(param, 10))
            .toLocaleDateString('zh-CN')
            .substring(5); // year is not necessary, standardize to ISO
        }
      }
    };
    return {
      baseOption: options,
      options: data.timeline.sort().map(t => this.overrides(data.data[t]))
    };
  }

  private isTimelineData(data: MapDataType | STMapDataType): boolean {
    return (data as STMapDataType).timeline !== undefined;
  }

  public render() {
    const { name, data, chartOnClickCallBack, chartData, chartPath, currentChartArea, type } = this.props;
    const mapUrl = mapUrls[name]

    return (
      <div style={
        type === 'mobile' ?
          { display: 'flex', flexDirection: 'column', width: '100%', height: '100%' } :
          { display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }
      }>
        <div style={
          type !== 'mobile' ?
            type !== 'overview' ?
              { width: '65%', height: '100%' } :
              { width: '100%', height: '100%' } :
            { width: '100%', height: '50%' }
        }>
          <EchartsMap
            mapUrl={mapUrl}
            mapName={mapName(name)}
            chartOptions={
              this.isTimelineData(data)
                ? this.getSTChartOptions(data as STMapDataType)
                : this.getChartOptions(data as MapDataType)
            }
            chartOnClickCallBack={chartOnClickCallBack}
            mobile={type === 'mobile'}
          />
        </div>
        <div style={
          type !== 'mobile' ?
            type !== 'overview' ?
              { width: '65%', height: '100%' } :
              { display: 'none' } :
            { width: '100%', height: '50%' }
        }>
          <VirusChart
            data={chartData}
            area={currentChartArea}
            path={chartPath}
          />
        </div>
      </div>
    );
  }
}
