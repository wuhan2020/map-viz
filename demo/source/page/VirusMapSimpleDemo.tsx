/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转。
 * 使用InformationMap组件构建通用地图信息展示。
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell } from 'web-cell';
import { VirusData, VirusMap } from 'wuhan2020-map-viz';

function autoBreaks(values: number[]) {
  const base = [1, 10, 50, 100, 500, 1000];
  const k =
    (Math.floor(Math.max(...values.filter(v => v !== undefined)) / 5 / 500) *
      500) /
    Math.max(...base);
  let res = base.map(b => k * b);
  res[0] = 1;
  return res;
}

const breaks = autoBreaks(
  Object.values(VirusData.countryData.provinces).map(prov => prov.confirmed)
);

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
          breaks={breaks}
          chartData={VirusData}
          currentChartArea="中国"
        ></VirusMap>
      </div>
    );
  }
}
