/**
 * React 分层疫情地图组件
 * 在 VirusMap 基础上，增加聚焦到省显示市级数据与回到省级的功能
 * @author: yarray, shadowingszy
 *
 * 传入参数说明:
 * data: 地图数据
 * resolution: 时间精度
 * type: overview, pc, mobile 三种不同的charts显示方式
 */

import React from 'react';
import { VirusMap } from './virusMap';
import { extractCitiesSeries } from '../../adapters/isaaclin';

type MapDataType = {
  [name: string]: any
};

type STMapDataType = {
  timeline: number[];
  data: { [timestamp: number]: MapDataType };
}; // spatio-temporal data

type Props = {
  data: any;
  resolution: number;
  type: 'overview' | 'pc' | 'mobile';
}

type State = {
  path: string[];
  currentChartArea: string;
}

export class HierarchicalVirusMap extends React.Component<Props, Readonly<State>> {

  constructor(props: Props) {
    super(props);
    this.state = {
      path: [],
      currentChartArea: '中国'
    };
  }

  static defaultProps = {
    data: {
      provincesSeries: {},
      countrySeries: {}
    },
    resolution: 3600000,
    type: 'pc',
    detail: true
  }

  navigateDown(params: any) {
    // enter province view
    this.setState({
      path:
        params.name && this.state.path.length < 1
          ? [...this.state.path, params.name]
          : this.state.path,
      currentChartArea: params.name
    });
  }

  navigateUp() {
    // back to country view
    if (this.state.path.length > 0) {
      this.setState({
        path: this.state.path.slice(0, this.state.path.length - 1),
        currentChartArea: '中国'
      });
    }
  }

  getVirusMapConfig(path: any, data: any, resolution: any) {
    let name = '中国';

    let dataOnMap: STMapDataType = {
      timeline: [],
      data: {}
    };
    if (path.length === 0) {
      dataOnMap = {
        timeline: Object.keys(data as any)
          .map(t => parseInt(t, 10))
          .sort(),
        data
      };
    } else if (path.length === 1) {
      name = path[0];
      const citiesSeries = extractCitiesSeries(data, name, resolution, true);
      dataOnMap = {
        timeline: Object.keys(citiesSeries)
          .map(t => parseInt(t, 10))
          .sort(),
        data: citiesSeries
      };
    }
    return {
      name,
      data: dataOnMap,
      navigateDown: this.navigateDown.bind(this)
    };
  }

  autoBreaks(values: number[]) {
    const base = [1, 10, 50, 100, 500, 1000];
    const k =
      (Math.floor(Math.max(...values.filter(v => v !== undefined)) / 5 / 500) *
        500) /
      Math.max(...base);
    let res = base.map(b => k * b);
    res[0] = 1;
    return res;
  }

  public render() {
    const { data, resolution, type } = this.props;
    const { path, currentChartArea } = this.state;

    const config = this.getVirusMapConfig(
      path,
      data.provincesSeries,
      resolution
    );

    const current = data.provincesSeries[Math.max(...Object.keys(data.provincesSeries).map(t => parseInt(t, 10)))];

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <VirusMap
          name={config.name}
          data={config.data}
          breaks={this.autoBreaks(
            Object.values(current).map((prov: any) => prov.confirmed)
          )} // use current province values to calculate viable mapping breaks
          chartData={data}
          chartPath={path}
          currentChartArea={currentChartArea}
          chartOnClickCallBack={type === 'overview' ? () => { } : config.navigateDown}
          type={type}
        // onDblClick={this.navigateUp.bind(this)}
        />
        <button
          style={{
            display: this.state.path.length > 0 ? 'block' : 'none',
            width: '50px',
            height: '30px',
            position: 'absolute',
            top: '50px',
            left: '120px',
            padding: '5px'
          }}
          onClick={this.navigateUp.bind(this)}
        >
          <span>back</span>
        </button>
      </div>
    );
  }
}
