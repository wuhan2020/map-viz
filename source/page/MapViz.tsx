/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell } from 'web-cell';
import { VirusMap } from '../components/VirusMap';

import rawData from '../../data/isaaclin/current.json';
import { convertCountry } from '../adapters/isaaclin';
import { PatientStatData } from '../adapters/patientStatInterface';
import { InformationMap } from '../components/InformationMap';
import informationMockData from '../../mock/information_map_general_mock_data';

interface State {
  path: string[];
}

const data = convertCountry(rawData['results']);

@observer
@component({
  tagName: 'map-viz',
  renderTarget: 'children'
})
export class MapViz extends mixin<{}, State>() {
  state = { path: [] };
  chartOnClickCallBack(params) {
    if (params.name) {
      this.setState({ path: [...this.state.path, params.name] });
    }
  }
  getVirusMapConfig(path) {
    let name = '中国';

    let dataOnMap: { [name: string]: PatientStatData };
    if (path.length === 0) {
      dataOnMap = data.provinces;
    } else if (path.length === 1) {
      name = path[0];
      dataOnMap = data.provinces[name].cities;
    }
    return {
      name,
      data: dataOnMap,
      chartOnClickCallBack: this.chartOnClickCallBack.bind(this)
    };
  }
  onClick = () => {
    // back to country view
    if (this.state.path.length > 0) {
      this.setState({
        path: this.state.path.slice(0, this.state.path.length - 1)
      });
    }
  };


  public render({ }, { path }: State) {
    const config = this.getVirusMapConfig(path);
    return (
      <div>
        <div style={{ width: '100%', height: '50%' }} onClick={this.onClick}>
          <VirusMap
            name={config.name}
            data={config.data}
            chartOnClickCallBack={config.chartOnClickCallBack}
          />
        </div>
        <div style={{ width: '100%', height: '50%' }}>
          <InformationMap
            options={informationMockData}
          />
        </div>
      </div>
    );
  }
}
