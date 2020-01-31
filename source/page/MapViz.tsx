/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转。
 * 使用InformationMap组件构建通用地图信息展示。
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell } from 'web-cell';
import { HierarchicalVirusMap } from '../components/HierarchicalVirusMap';

// import rawData from '../../data/isaaclin/current.json';
// import { convertCountry } from '../adapters/isaaclin';
import rawData from '../../data/isaaclin/history.json';
import patchData from '../../data/isaaclin/patch.json';
import overviewData from '../../data/isaaclin/overall.json';
import {
  convertProvincesSeries,
  convertCountrySeries,
  convertCountry
} from '../adapters/isaaclin';
import { InformationMap } from '../components/InformationMap';
import informationMockData from '../../mock/information_map_general_mock_data';
import { VirusChart } from '../components/VirusChart';

interface State {
  path: string[];
}

// const data = convertCountry(rawData['results']);
const resolution = 3600000 * 24;
const data = {
  provincesSeries: convertProvincesSeries(
    [...rawData['results'], ...patchData],
    resolution,
    true
  ),
  countrySeries: convertCountrySeries(overviewData['results'], resolution)
};

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

  public render({}, {}: State) {
    return (
      <div>
        <div style={{ width: '100%', height: '100%', margin: '0 10px' }}>
          <HierarchicalVirusMap data={data} resolution={resolution} />
        </div>
        {/* <div style={{ width: '100%', height: '100%', margin: '0 10px' }}>
          <VirusChart data={data} />
        </div> */}
        {/* <div style={{ width: '100%', height: '100%' }}>
          <InformationMap options={informationMockData} />
        </div> */}
      </div>
    );
  }
}
