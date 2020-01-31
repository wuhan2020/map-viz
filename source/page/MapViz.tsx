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
import { convertProvincesSeries } from '../adapters/isaaclin';
import { InformationMap } from '../components/InformationMap';
import informationMockData from '../../mock/information_map_general_mock_data';
import { VirusLineCharts } from '../components/VirusLineCharts';

interface State {
  path: string[];
}

// const data = convertCountry(rawData['results']);
const resolution = 3600000 * 24;
const data = convertProvincesSeries(
  [...rawData['results'], ...patchData],
  resolution
);

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
        <div style={{ width: '100%', height: '100%' }}>
          <HierarchicalVirusMap data={data} resolution={resolution} />
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <VirusLineCharts />
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <InformationMap options={informationMockData} />
        </div>
      </div>
    );
  }
}
