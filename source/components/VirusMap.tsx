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

interface VirusMapProps {
  name: string;
  data?: { [name: string]: PatientStatData };
  chartOnClickCallBack?: Function;
}

interface VirusMapState {
  mapScale: number;
}

@observer
@component({
  tagName: 'virus-map',
  renderTarget: 'children'
})
export class VirusMap extends mixin<VirusMapProps, VirusMapState>() {
  @attribute
  @watch
  name = '';

  @attribute
  @watch
  data = [];

  @attribute
  @watch
  chartOnClickCallBack = (param, chart) => {
    console.log(param, chart);
  };

  state = {
    mapScale: 1
  };

  getChartOptions(data: { [name: string]: PatientStatData }, mapScale) {
    return {
      title: {
        text: '疫情地图'
      },
      tooltip: {
        trigger: 'item',
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
      dataRange: {
        x: '65%',
        y: '30%',
        splitList: [
          { start: 0, end: 0, color: '#EEEEEE' },
          { start: 1, end: 10, color: '#FFEBCD' },
          { start: 10, end: 50, color: '#FFAF50' },
          { start: 50, end: 100, color: '#FF4500' },
          { start: 100, end: 500, color: '#CD5C5C' },
          { start: 500, end: 1000, color: '#866666' },
          { start: 1000, color: '#600000' }
        ]
      },
      series: [
        {
          name: '疫情数据',
          type: 'map',
          mapType: 'map',
          // roam: true, // disable zoom
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
          data: Object.keys(data).map(name => ({
            name,
            value: data[name].confirmed || 0
          }))
        }
      ]
    };
  }

  public render(
    { name, data, chartOnClickCallBack }: VirusMapProps,
    { mapScale }: VirusMapState
  ) {
    // 缩放时间重新set一下option
    const chartGeoRoamCallBack = (params, chart) => {
      this.setState({
        mapScale: mapScale *= params.zoom
      });
      // 这里使用防抖函数
      chart.setOption(this.getChartOptions(data, mapScale));
    };
    return (
      <EchartsMap
        mapUrl={MapUrls[name]}
        chartOptions={this.getChartOptions(data, mapScale)}
        chartOnClickCallBack={chartOnClickCallBack}
        chartGeoRoamCallBack={chartGeoRoamCallBack}
      />
    );
  }
}
