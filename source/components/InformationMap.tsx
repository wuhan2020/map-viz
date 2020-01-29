/**
 * WebCell地图可视化通用组件，接入百度地图API
 * 本地图组件为地图定制化开发提供了最高的自由度
 * @author: shadowingszy
 * 
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import { BaiduMap } from './BaiduMap';
import informationMockData from '../../mock/information_mock_data';

@observer
@component({
  tagName: 'information-map',
  renderTarget: 'children'
})
export class InformationMap extends mixin<{}, {}>() {
  // TODO: 这里需要针对infoWindowTitle和infoWindowContent提供样式（要等设计）
  getMapOptions() {
    return informationMockData
  }
  public render() {
    return (
      <BaiduMap
        baiduMapKey={'4CsWt6kSluEoQFXxh8GlqoFDrctcoAIo'}
        mapOptions={this.getMapOptions()}
      />
    );
  }
}