/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转。
 * 使用InformationMap组件构建通用地图信息展示。
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell } from 'web-cell';
import {
  HierarchicalVirusMap,
  convertProvincesSeries,
  convertCountrySeries,
  VirusData
} from 'wuhan2020-map-viz';

const { patchData, rawData, overviewData } = VirusData;
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
  tagName: 'hierarchical-virus-map-demo',
  renderTarget: 'children'
})
export class HierarchicalVirusMapDemo extends mixin<{}, {}>() {
  public render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <HierarchicalVirusMap data={data} resolution={resolution} />
      </div>
    );
  }
}
