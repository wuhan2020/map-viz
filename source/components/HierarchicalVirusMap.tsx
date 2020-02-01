/**
 * WebCell分层疫情地图组件
 * 在 VirusMap 基础上，增加聚焦到省显示市级数据与回到省级的功能
 * @author: yarray, shadowingszy
 *
 * 传入参数说明:
 * data: 地图数据
 * resolution: 时间精度
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import { VirusMap, MapDataType, STMapDataType } from './VirusMap';
import {
  Series,
  ProvinceData,
  CountryData,
  OverallCountryData
} from '../adapters/patientStatInterface';
import { extractCitiesSeries } from '../adapters/isaaclin';

interface Props {
  data: OverallCountryData;
  resolution: number;
}

interface State {
  path: string[];
  currentChartArea: string;
}

@observer
@component({
  tagName: 'hierarchical-virus-map',
  renderTarget: 'children'
})
export class HierarchicalVirusMap extends mixin<Props, State>() {
  @attribute
  @watch
  public data: OverallCountryData = {
    provincesSeries: {},
    countrySeries: {}
  };

  @attribute
  @watch
  public resolution: number = 3600000;

  state = {
    path: [],
    currentChartArea: "中国"
  };
  navigateDown(params) {
    // if has name and path length < max length
    // TODO: check the data to see whether we can navigate down
    this.setState({
      path: params.name && this.state.path.length < 1 ? [...this.state.path, params.name] : this.state.path,
      currentChartArea: params.name
    });

  }
  getVirusMapConfig(path, data, resolution) {
    let name = '中国';

    let dataOnMap: MapDataType | STMapDataType;
    if (path.length === 0) {
      if ((data as CountryData).provinces) {
        dataOnMap = data.provinces;
      } else {
        dataOnMap = {
          timeline: Object.keys(data as Series<ProvinceData>)
            .map(t => parseInt(t, 10))
            .sort(),
          data
        };
      }
    } else if (path.length === 1) {
      name = path[0];
      if ((data as CountryData).provinces) {
        dataOnMap = data.provinces[name].cities;
      } else {
        const citiesSeries = extractCitiesSeries(data, name, resolution, true);
        dataOnMap = {
          timeline: Object.keys(citiesSeries)
            .map(t => parseInt(t, 10))
            .sort(),
          data: citiesSeries
        };
      }
    }
    return {
      name,
      data: dataOnMap,
      navigateDown: this.navigateDown.bind(this)
    };
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

  public render({ data, resolution }: Props, { path, currentChartArea }: State) {
    const config = this.getVirusMapConfig(
      path,
      data.provincesSeries,
      resolution
    );

    return (
      <div>
        <div style={{ position: 'relative' }}>
          <VirusMap
            name={config.name}
            data={config.data}
            chartData={data}
            chartPath={path}
            currentChartArea={currentChartArea}
            chartOnClickCallBack={config.navigateDown}
            onDblClick={this.navigateUp.bind(this)}
          />
          <button
            class="btn btn-dark"
            style={{
              display: this.state.path.length > 0 ? 'block' : 'none',
              width: '30px',
              height: '30px',
              position: 'absolute',
              bottom: '20px',
              right: '35%',
              'margin-right': '10px',
              padding: '5px'
            }}
            onClick={this.navigateUp.bind(this)}
          >
            <span class="fa fa-search-minus"></span>
          </button>
        </div>
      </div>
    );
  }
}
