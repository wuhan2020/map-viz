/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转。
 * 使用InformationMap组件构建通用地图信息展示。
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell } from 'web-cell';
import { VirusData, VirusMap } from 'wuhan2020-map-viz';

@observer
@component({
  tagName: 'virus-map-simple-demo',
  renderTarget: 'children'
})
export class VirusMapSimpleDemo extends mixin<{}, {}>() {
  public render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <VirusMap
          name="中国"
          data={VirusData.countryData.provinces}
          chartData={VirusData}
          currentChartArea="中国"
        ></VirusMap>
      </div>
    );
  }
}
