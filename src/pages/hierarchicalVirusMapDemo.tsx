import React from 'react';
import { HierarchicalVirusMap } from '../components/virus-map/hierarchicalVirusMap';
import { convertProvincesSeries, convertCountrySeries, } from '../adapters/isaaclin';
import patchData from '../data/isaaclin/patch.json';
import rawData from '../data/isaaclin/history.json';
import overviewData from '../data/isaaclin/overall.json';

export class HierarchicalVirusMapDemo extends React.Component<{}, {}> {
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

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <HierarchicalVirusMap data={data} resolution={resolution} />
      </div>
    );
  }
}