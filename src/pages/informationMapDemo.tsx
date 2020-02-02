import React from 'react';
import { InformationMap } from '../components/informationMap/informationMap';
import informationMockData from '../mock/informationMapMockData';

export class InformationMapDemo extends React.Component<{}, {}> {
  render() {
    const initPoint: any = informationMockData.initPoint;
    const zoom: number = informationMockData.zoom;
    const makerArray: any[] = informationMockData.makerArray;

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <InformationMap
          initPoint={initPoint}
          zoom={zoom}
          markers={makerArray}
        />
      </div>
    );
  }
}