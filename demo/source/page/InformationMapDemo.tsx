/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转。
 * 使用InformationMap组件构建通用地图信息展示。
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell } from 'web-cell';
import { InformationMap } from 'wuhan2020-map-viz';
import informationMockData from '../../mock/information_map_general_mock_data';

@observer
@component({
  tagName: 'information-map-demo',
  renderTarget: 'children'
})
export class InformationMapDemo extends mixin<{}, {}>() {
  public render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <InformationMap
          initPoint={informationMockData.initPoint}
          zoom={informationMockData.zoom}
          markers={informationMockData.makerArray}
        />
      </div>
    );
  }
}
