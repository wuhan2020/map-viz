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

const history = new History();

@observer
@component({
  tagName: 'map-viz',
  renderTarget: 'children'
})
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
    );
  }
}
