import './style.css';

import {
  convertProvincesSeries,
  convertCountrySeries
} from './adapters/isaaclin';

import patchData from './../data/isaaclin/patch.json';
import rawData from './../data/isaaclin/history.json';
import overviewData from './../data/isaaclin/overall.json';

const resolution = 3600000 * 24;
const VirusData = {
  provincesSeries: convertProvincesSeries(
    [...rawData['results'], ...patchData],
    resolution,
    true
  ),
  countrySeries: convertCountrySeries(overviewData['results'], resolution)
};

const rawVirus = { patchData, rawData, overviewData };
export { VirusData, rawVirus };
export { HierarchicalVirusMap } from './components/HierarchicalVirusMap';
export { InformationMap } from './components/InformationMap';
export {
  convertProvincesSeries,
  convertCountrySeries
} from './adapters/isaaclin';
