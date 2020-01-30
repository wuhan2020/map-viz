/**
 * WebCell分层疫情地图组件
 * 在 VirusMap 基础上，增加聚焦到省显示市级数据与回到省级的功能
 * @author: yarray
 *
 * 自包含控件，不含任何 props
 *
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import { VirusMap } from './VirusMap';
import { PatientStatData } from '../adapters/patientStatInterface';
import rawData from '../../data/isaaclin/current.json';
import { convertCountry } from '../adapters/isaaclin';

const data = convertCountry(rawData['results']);

interface Props {}

interface State {
  path: string[];
}

@observer
@component({
  tagName: 'hierarchical-virus-map',
  renderTarget: 'children'
})
export class HierarchicalVirusMap extends mixin<Props, State>() {
  state = { path: [] };
  navigateDown(params) {
    if (params.name) {
      this.setState({ path: [...this.state.path, params.name] });
    }
    // console.log(params);
  }
  getVirusMapConfig(path) {
    let name = '中国';

    let dataOnMap: { [name: string]: PatientStatData };
    if (path.length === 0) {
      dataOnMap = data.provinces;
    } else if (path.length === 1) {
      name = path[0];
      dataOnMap = data.provinces[name].cities;
    }
    return {
      name,
      data: dataOnMap,
      navigateDown: this.navigateDown.bind(this)
    };
  }
  navigateUp = () => {
    console.log('called');
    // back to country view
    if (this.state.path.length > 0) {
      this.setState({
        path: this.state.path.slice(0, this.state.path.length - 1)
      });
    }
  };

  public render({}, { path }: State) {
    const config = this.getVirusMapConfig(path);
    return (
      <div style={{ position: 'relative' }}>
        <VirusMap
          name={config.name}
          data={config.data}
          chartOnClickCallBack={config.navigateDown}
          onDblClick={this.navigateUp}
        />
        <button
          class="btn btn-light"
          style={{
            display: this.state.path.length > 0 ? 'block' : 'none',
            width: '30px',
            height: '30px',
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            padding: '5px'
          }}
          onClick={this.navigateUp}
        >
          <span class="fa fa-search-minus"></span>
        </button>
      </div>
    );
  }
}
