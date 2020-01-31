/**
 * WebCell分层疫情地图组件
 * 在 VirusMap 基础上，增加聚焦到省显示市级数据与回到省级的功能
 * @author: yarray, shadowingszy
 *
 * 自包含控件，不含任何 props
 *
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import { VirusMap, MapDataType, STMapDataType } from './VirusMap';
import { VirusChart } from '../components/VirusChart';
import {
  Series,
  ProvinceData,
  CountryData,
  CountryOverviewData
} from '../adapters/patientStatInterface';
import { extractCitiesSeries } from '../adapters/isaaclin';

interface Props {
  data: {
    provincesSeries: Series<ProvinceData> | CountryData;
    countrySeries: Series<CountryOverviewData>;
  };
  resolution: number;
}

interface State {
  path: string[];
  currentArea: string;
}

@observer
@component({
  tagName: 'hierarchical-virus-map',
  renderTarget: 'children'
})
export class HierarchicalVirusMap extends mixin<Props, State>() {
  @attribute
  @watch
  public data: CountryData | Series<ProvinceData> = {};

  @attribute
  @watch
  public resolution: number = 3600000;

  state = {
    path: [],
    currentArea: '中国'
  };
  navigateDown(params) {
    console.log(params);
    // if has name and path length < max length
    // TODO: check the data to see whether we can navigate down
    if (params.name && this.state.path.length < 1) {
      this.setState({
        path: [...this.state.path, params.name],
        currentArea: params.name
      });
    }
    // console.log(params);
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
        currentArea: '中国'
      });
    }
  }

  public render({ data, resolution }: Props, { path, currentArea }: State) {
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
            chartOnClickCallBack={config.navigateDown}
            onDblClick={this.navigateUp.bind(this)}
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
        <div style={{ width: '100%', height: '100%', margin: '0 10px' }}>
          <VirusChart data={data} area={currentArea} />
        </div>
      </div>
    );
  }
}
