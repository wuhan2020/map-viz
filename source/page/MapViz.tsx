/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看
 * @author: shadowingszy
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch, on } from 'web-cell';
import { VirusMap } from "../components/VirusMap";
import mockData from "../../mock/map_viz_mock_data.js";

interface State {
  index: number;
}

@observer
@component({
  tagName: 'map-viz',
  renderTarget: 'children'
})
export class MapViz extends mixin<{}, State>() {
  state = { index: 1 };

  getVirusMapConfig(index) {
    return {
      mapUrl: mockData[index].mapUrl,
      data: mockData[index].data,
      chartOnClickCallBack: function (params) {
        console.log(params);
      }
    }
  }

  public render({}, { index }: State) {
    const config = this.getVirusMapConfig(index);
    return (
      <div>
        <div style={{ width: '100%', height: '90%' }}>
          <VirusMap
            mapUrl={config.mapUrl}
            data={config.data}
            chartOnClickCallBack={config.chartOnClickCallBack}
          />
        </div>
      </div>

    );
  }
}