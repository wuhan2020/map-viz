/**
 * WebCell疫情地图展示页面
 * 使用VirusMap组件构建疫情地图的示例，包含了国家级、省级不同粒度疫情地图的查看与跳转。
 * 使用InformationMap组件构建通用地图信息展示。
 * @author: shadowingszy, yarray
 */

import { observer } from 'mobx-web-cell';
import { component, createCell, Fragment } from 'web-cell';
import { HierarchicalVirusMapDemo } from './HierarchicalVirusMapDemo';
import { InformationMapDemo } from './InformationMapDemo';
import { History, HTMLRouter } from 'cell-router/source';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';

const history = new History();

@observer
@component({
  tagName: 'map-viz',
  renderTarget: 'children'
})
export class MapViz extends HTMLRouter {
  protected history = history;

  protected menu = [
    {
      title: '疫情地图',
      href: 'virusMap'
    },
    {
      title: '通用地图',
      href: 'informationMap'
    }
  ];
  protected routes = [
    { paths: ['informationMap'], component: InformationMapDemo },
    { paths: ['virusMap', ''], component: HierarchicalVirusMapDemo }
  ];

  public render() {
    return (
      <Fragment>
        <NavBar title="Wuhan2020 地图可视化" menu={this.menu} narrow />
        <main>
          <div style={{ marginTop: '56px', width: '100%', height: '90%' }}>
            <div>{super.render()}</div>
          </div>
        </main>
      </Fragment>
    );
  }
}
