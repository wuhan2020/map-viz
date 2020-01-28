/**
 * WebCell疫情地图组件
 * 基于EchartsMap组件构建的疫情地图组件，传入地图url及各区域的具体信息后自动生成疫情地图。
 * @author: shadowingszy
 * 
 * 传入props说明:
 * mapUrl: 地图json文件地址。
 * data: echarts中的数据。
 * chartOnClickCallBack: 点击地图后的回调函数。
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import { EchartsMap } from '../components/EchartsMap';

interface dataObject {
  name: string;
  confirmed: number;
  suspect: number;
  cured: number;
  death: number;
}

interface VirusMapProps {
  mapUrl?: string;
  data?: Array<dataObject>;
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
  mapUrl = '';

  @attribute
  @watch
  data = [];

  @attribute
  @watch
  chartOnClickCallBack = (param, chart) => { console.log(param, chart) };

  state = {
    mapScale: 1
  };

  getChartOptions(data, mapScale) {
    return {
      title: {
        text: '疫情地图'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const outputArray = [params.name]
          if (data[params.dataIndex].confirmed !== undefined) {
            outputArray.push('确诊：' + data[params.dataIndex].confirmed)
          }
          if (data[params.dataIndex].suspect !== undefined) {
            outputArray.push('疑似：' + data[params.dataIndex].suspect)
          }
          if (data[params.dataIndex].cured !== undefined) {
            outputArray.push('治愈：' + data[params.dataIndex].cured)
          }
          if (data[params.dataIndex].death !== undefined) {
            outputArray.push('死亡：' + data[params.dataIndex].death)
          }
          return outputArray.join('<br/>');
        }
      },
      dataRange: {
        x: 'left',
        y: 'bottom',
        splitList: [
          { start: 0, end: 0, color: '#EEEEEE' },
          { start: 1, end: 10, color: '#FFEBCD' },
          { start: 10, end: 50, color: '#FFAF50' },
          { start: 50, end: 100, color: '#FF4500' },
          { start: 100, end: 500, color: '#CD5C5C' },
          { start: 500, end: 1000, color: '#800000' },
          { start: 1000, color: '#600000' },
        ]
      },
      series: [
        {
          name: '疫情数据',
          type: 'map',
          mapType: 'map',
          roam: true,
          label: {
              show: mapScale > 2.5,
              fontSize: 2 * mapScale
          },
          emphasis: {
            label: {
              show: mapScale > 2.5,
              fontSize: 2 * mapScale
            }
          },
          data: data.map((item) => { return { name: item.name, value: item.confirmed } })
        }
      ]
    };
  }

  public render({ mapUrl, data, chartOnClickCallBack }: VirusMapProps, { mapScale }: VirusMapState) {
    // 缩放时间重新set一下option
    const chartGeoRoamCallBack = (params, chart) => {
      this.setState({
        mapScale: mapScale *= params.zoom
      });
      // 这里使用防抖函数
      chart.setOption(this.getChartOptions(data, mapScale));
    }
    return (
      <EchartsMap
        mapUrl={mapUrl}
        chartOptions={this.getChartOptions(data, mapScale)}
        chartOnClickCallBack={chartOnClickCallBack}
        chartGeoRoamCallBack={chartGeoRoamCallBack}
      />
    );
  }
}