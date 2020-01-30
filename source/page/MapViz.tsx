/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch, on } from 'web-cell';
import { HierarchicalVirusMap } from '../components/HierarchicalVirusMap';

// import mockData from '../../mock/map_viz_mock_data.js';
import { InformationMap } from '../components/InformationMap';

interface State {}

@observer
@component({
  tagName: 'map-viz',
  renderTarget: 'children'
})
export class MapViz extends mixin<{}, State>() {
  state = {};

  public render({}, {}: State) {
    return (
      <div>
        <div style={{ width: '100%', height: '50%' }}>
          <HierarchicalVirusMap />
        </div>
        <div style={{ width: '100%', height: '50%' }}>
          <InformationMap></InformationMap>
        </div>
      </div>
    );
  }
}
