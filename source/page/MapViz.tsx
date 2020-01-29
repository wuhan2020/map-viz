/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch, on } from 'web-cell';
import { VirusMap } from '../components/VirusMap';
// import mockData from '../../mock/map_viz_mock_data.js';
import rawData from '../../data/isaaclin/current.json';
import { convertCountry } from '../adapters/isaaclin';
import { PatientStatData } from '../adapters/patientStatInterface';

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
    } else if (this.state.path.length > 0) {
      // TODO: will not trigger, try other approach
      this.setState({
        path: this.state.path.slice(0, this.state.path.length - 1)
      });
    }
    // console.log(params);
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

  public render({}, { path }: State) {
    const config = this.getVirusMapConfig(path);
    return (
      <div>
        <div style={{ width: '100%', height: '90%' }}>
          <VirusMap
            name={config.name}
            data={config.data}
            chartOnClickCallBack={config.chartOnClickCallBack}
          />
        </div>
      </div>
    );
  }
}
