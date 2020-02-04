import React from 'react';
import './App.css';
import { HierarchicalVirusMap, InformationMap } from 'wuhan2020-mapviz';
import { convertProvincesSeries, convertCountrySeries, } from './adapters/isaaclin';
import patchData from './data/isaaclin/patch.json';
import rawData from './data/isaaclin/history.json';
import overviewData from './data/isaaclin/overall.json';
import informationMockData from './mock/informationMapMockData';


export default class App extends React.Component {
  render() {
    const resolution = 3600000 * 24;
    const data = {
      provincesSeries: convertProvincesSeries(
        [...rawData['results'], ...patchData],
        resolution,
        true
      ),
      countrySeries: convertCountrySeries(overviewData['results'], resolution)
    };

    const initPoint = informationMockData.initPoint;
    const zoom = informationMockData.zoom;
    const makerArray = informationMockData.makerArray;

    return (
      <div className="app">
        <h2>疫情地图组件</h2>
        <div className="virus-map">
          <HierarchicalVirusMap data={data} resolution={resolution} type={'pc'} />
        </div>
        <div className="information-map">
          <h2>通用地图组件</h2>
          <InformationMap
            initPoint={initPoint}
            zoom={zoom}
            markers={makerArray}
          />
        </div>
      </div>
    );
  }
}
