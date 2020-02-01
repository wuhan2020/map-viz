/**
 * WebCell 疫情数据折线图可视化组件
 * 本组件使用stack line chart和line chart展现信息
 * @author: shadowingszy
 *
 * 传入props说明:
 * data: 各省市数据。
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, watch, attribute } from 'web-cell';
import { WebCellEcharts } from './WebCellEcharts';
import {
  Series,
  ProvinceData,
  CountryData,
  CountryOverviewData
} from '../adapters/patientStatInterface';
import echarts from 'echarts';

interface Props {
  data: {
    provincesSeries: Series<ProvinceData> | CountryData;
    countrySeries: Series<CountryOverviewData>;
  };
  area: string;
}

interface State {
  echartOptions: any;
}

@observer
@component({
  tagName: 'virus-line-charts',
  renderTarget: 'children'
})
export class VirusChart extends mixin<Props, State>() {
  @attribute
  @watch
  public data: CountryData | Series<ProvinceData> = {};

  @attribute
  @watch
  public area: string = '';

  // chartId = this.generateChartId();
  // myChart = null;

  /**
   * 使用随机数+date生成当前组件的唯一ID
   */
  // generateChartId() {
  //   const random = Math.floor(Math.random() * 100);
  //   const dateStr = new Date().getTime();
  //   return 'map' + random.toString() + dateStr.toString();
  // }

  // state = {
  //   echartOptions: this.getConfirmedSuspectChartOptions(
  //     this.getOrderedTimeData(this.props.data.provincesSeries),
  //     this.getOrderedTimeData(this.props.data.countrySeries),
  //     this.props.area)
  // };

  // connectedCallback() {
  //   setTimeout(() => {
  //     this.myChart = echarts.init(document.getElementById(this.chartId));
  //     console.log('123', this.state.echartOptions)
  //     this.myChart.setOption(this.state.echartOptions);
  //   }, 0);
  // }

  public getOrderedTimeData(
    data: CountryData | Series<ProvinceData> | Series<CountryOverviewData>
  ) {
    let output = [];
    for (const property in data) {
      data[property].date = parseInt(property);
      output.push(data[property]);
    }
    output.sort((a, b) => {
      return a.date - b.date;
    });
    return output;
  }

  public getData(
    orderedProvinceData: Array<any>,
    orderedOverviewData: Array<any>,
    area: string
  ) {
    let confirmedData = [];
    let suspectedData = [];
    let curedData = [];
    let deadData = [];

    if (area === '中国') {
      for (const item of orderedOverviewData) {
        confirmedData.push([item.date, item.confirmedCount]);
        suspectedData.push([item.date, item.suspectedCount]);
        curedData.push([item.date, item.curedCount]);
        deadData.push([item.date, item.deadCount]);
      }
    } else {
      for (const item of orderedProvinceData) {
        confirmedData.push([item.date, item[area] ? item[area].confirmed : 0]);
        suspectedData.push([item.date, item[area] ? item[area].suspected : 0]);
        curedData.push([item.date, item[area] ? item[area].cured : 0]);
        deadData.push([item.date, item[area] ? item[area].dead : 0]);
      }
    }

    return {
      confirmedData,
      suspectedData,
      curedData,
      deadData
    };
  }

  public getConfirmedSuspectChartOptions(
    orderedProvinceData: Array<any>,
    orderedOverviewData: Array<any>,
    area: string
  ) {
    const { confirmedData, suspectedData } = this.getData(
      orderedProvinceData,
      orderedOverviewData,
      area
    );

    console.log(area, area === '中国');
    return {
      title: {
        text: area + '疫情确诊/疑似数'
      },
      legend: {
        orient: 'horizontal',
        data: ['确诊', '疑似']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: '时间',
        type: 'time'
      },
      yAxis: {
        name: '例'
      },
      series: [
        {
          name: '确诊',
          data: confirmedData,
          type: 'line',
          stack: '总量',
          areaStyle: {}
        },
        {
          name: '疑似',
          data: suspectedData,
          type: 'line',
          stack: '总量',
          areaStyle: {}
        }
      ],
      color: ['#FF2400', '#FFC30F']
    };
  }

  public getCuredDeadChartOptions(
    orderedProvinceData: Array<any>,
    orderedOverviewData: Array<any>,
    area: string
  ) {
    const { curedData, deadData } = this.getData(
      orderedProvinceData,
      orderedOverviewData,
      area
    );

    return {
      title: {
        text: '疫情治愈/死亡数'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: '时间',
        type: 'time'
      },
      yAxis: {
        name: '例'
      },
      legend: {
        orient: 'horizontal',
        data: ['治愈', '死亡']
      },
      series: [
        {
          name: '治愈',
          data: curedData,
          type: 'line'
        },
        {
          name: '死亡',
          data: deadData,
          type: 'line'
        }
      ],
      color: ['#30cb00', '#808080']
    };
  }

  public render() {
    const { data, area } = this.props;
    const orderedProvincesData = this.getOrderedTimeData(data.provincesSeries);
    const orderedCountryData = this.getOrderedTimeData(data.countrySeries);

    return (
      <div>
        <WebCellEcharts
          chartOptions={this.getConfirmedSuspectChartOptions(
            orderedProvincesData,
            orderedCountryData,
            area
          )}
        />
        <WebCellEcharts
          chartOptions={this.getCuredDeadChartOptions(
            orderedProvincesData,
            orderedCountryData,
            area
          )}
        />
      </div>
    );
  }
}
