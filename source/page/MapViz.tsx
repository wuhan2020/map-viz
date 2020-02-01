/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转。
 * 使用InformationMap组件构建通用地图信息展示。
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, createCell } from 'web-cell';
import { HierarchicalVirusMapDemo } from './HierarchicalVirusMapDemo';
import { InformationMapDemo } from './InformationMapDemo';
import { History, HTMLRouter } from 'cell-router/source';

<<<<<<< HEAD
const history = new History();
=======
// import rawData from '../../data/isaaclin/current.json';
// import { convertCountry } from '../adapters/isaaclin';
import patchData from '../../data/isaaclin/patch.json';
import {
  convertProvincesSeries,
  convertCountrySeries
} from '../adapters/isaaclin';

import {
  InformationMap,
  GeoData,
  Metadata
} from '../components/InformationMap';
import informationMockData from '../../mock/information_map_general_mock_data';
import rawData from '../../data/isaaclin/history.json';
import overviewData from '../../data/isaaclin/overall.json';

interface State {
  path: string[];
}

const resolution = 3600000 * 24;
const data = {
  provincesSeries: convertProvincesSeries(
    [...rawData['results'], ...patchData],
    resolution,
    true
  ),
  countrySeries: convertCountrySeries(overviewData['results'], resolution)
};
>>>>>>> upstream/master

@observer
@component({
  tagName: 'map-viz',
  renderTarget: 'children'
})
<<<<<<< HEAD
export class MapViz extends HTMLRouter {
  protected history = history;
  protected routes = [
    { paths: ['virusMap'], component: HierarchicalVirusMapDemo },
    { paths: ['informationMap'], component: InformationMapDemo }
  ];

  public render({}, {}) {
    return (
      <main>
        <ul>
          <li>
            <a href="virusMap">疫情地图组件</a>
          </li>
          <li>
            <a href="informationMap">通用地图组件</a>
          </li>
        </ul>
        <div>{super.render({}, {})}</div>
      </main>
=======
export class MapViz extends mixin<{}, State>() {
  state = { path: [] };
  chartOnClickCallBack(params) {
    if (params.name) {
      this.setState({ path: [...this.state.path, params.name] });
    }
  }

  public generateMockData(): GeoData[] {
    return [];
  }

  public render() {
    return (
      <div>
        <div style={{ width: '100%', height: '100%' }}>
          <HierarchicalVirusMap data={data} resolution={resolution} />
        </div>
        <div style={{ width: '100%', height: '80%' }}>
          <InformationMap
            initPoint={informationMockData.initPoint}
            zoom={informationMockData.zoom}
            markers={informationMockData.makerArray}
          />
        </div>
      </div>
>>>>>>> upstream/master
    );
  }
}
