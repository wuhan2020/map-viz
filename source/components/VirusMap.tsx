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

  baseOptions() {
    return {
      title: {
        text: '疫情地图'
      },
      tooltip: {
        trigger: 'item',
        formatter: (_params: any) => ''
      },
      visualMap: [
        {
          type: 'piecewise',
          right: '10%',
          //orient: "horizontal",
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
            { min: 0, max: 0, color: '#EEEEEE' },
            { gt: 1, lte: 10, color: '#FFFADD' },
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
        formatter: function(params) {
          const outputArray = [params.name];
          if (data[params.name] === undefined) {
            data[params.name] = {
              confirmed: 0,
              suspected: 0,
              cured: 0,
              dead: 0
            };
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

  public getChartOptions(data: MapDataType) {
    let options = this.baseOptions();
    let extra = this.overrides(data);
    options.series[0].data = extra.series[0].data;
    options.tooltip.formatter = extra.tooltip.formatter;
    return options;
  }

  public getSTChartOptions(data: STMapDataType) {
    let options = this.baseOptions();
    options['timeline'] = {
      show: true,
      autoPlay: true,
      playInterval: 1500,
      data: data.timeline
    };
    return {
      baseOption: options,
      options: data.timeline.map(t => this.overrides(data.data[t]))
    };
  }

  public render({ name, data, chartOnClickCallBack }: VirusMapProps, {}) {
    // 缩放时间重新set一下option
    return (
      <EchartsMap
        mapUrl={MapUrls[name]}
        isForceRatio={0.75}
        isAdjustLabel={true}
        chartOptions={
          (data as STMapDataType).timeline !== undefined
            ? this.getSTChartOptions(data as STMapDataType)
            : this.getChartOptions(data as MapDataType)
        }
        chartOnClickCallBack={chartOnClickCallBack}
      />
    );
  }
}

export { MapDataType, STMapDataType };
