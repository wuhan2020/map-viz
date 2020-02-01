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
import { Series, ProvinceData, CountryData, OverallCountryData } from '../adapters/patientStatInterface';
import { extractCitiesSeries } from '../adapters/isaaclin';

interface Props {
  data: OverallCountryData;
  resolution: number;
}

interface State {
  path: string[];
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
    path: []
  };
  navigateDown(params) {
    // if has name and path length < max length
    // TODO: check the data to see whether we can navigate down
    if (params.name && this.state.path.length < 1) {
      this.setState({
        path: [...this.state.path, params.name]
      });
    }
  }
  getVirusMapConfig(path, data, resolution) {
    let name = '中国';

    let dataOnMap: MapDataType | STMapDataType;
    if (path.length === 0) {
      if ((data as CountryData).provinces) {
        dataOnMap = data.provinces;
      } else {
        dataOnMap = {
          timeline: Object.keys(data as Series<ProvinceData>).map(t =>
            parseInt(t, 10)
          ),
          data
        };
      }
    } else if (path.length === 1) {
      name = path[0];
      if ((data as CountryData).provinces) {
        dataOnMap = data.provinces[name].cities;
      } else {
        // FIXME: no resolution provided
        const citiesSeries = extractCitiesSeries(data, name, resolution);
        dataOnMap = {
          timeline: Object.keys(citiesSeries).map(t => parseInt(t, 10)),
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
        path: this.state.path.slice(0, this.state.path.length - 1)
      });
    }
  }

  public render({ data, resolution }: Props, { path }: State) {
    const config = this.getVirusMapConfig(path, data.provincesSeries, resolution);
    return (
      <div>
        <div style={{ position: 'relative' }}>
          <VirusMap
            name={config.name}
            data={config.data}
            chartData={data}
            chartOnClickCallBack={config.navigateDown}
          />
          <button
            class="btn btn-light"
            style={{
              display: this.state.path.length > 0 ? 'block' : 'none',
              width: '30px',
              height: '30px',
              position: 'absolute',
              bottom: '10px',
              left: '10px',
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
