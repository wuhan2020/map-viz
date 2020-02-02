import './style.css';

import {
  convertCountry,
  convertProvincesSeries,
  convertCountrySeries
} from './adapters/isaaclin';

import patchData from './../data/isaaclin/patch.json';
import rawData from './../data/isaaclin/history.json';
import rawCurrentData from './../data/isaaclin/current.json';
import overviewData from './../data/isaaclin/overall.json';

const resolution = 3600000 * 24;
const VirusData = {
  provincesSeries: convertProvincesSeries(
    [...rawData['results'], ...patchData],
    resolution,
    true
  ),
  countrySeries: convertCountrySeries(overviewData['results'], resolution),
  countryData: convertCountry(rawCurrentData['results'])
};

const rawVirus = { patchData, rawData, overviewData };
export { VirusData, rawVirus };
export { HierarchicalVirusMap } from './components/HierarchicalVirusMap';
export { VirusMap } from './components/VirusMap';
export { VirusChart } from './components/VirusChart';
export { EchartsMap } from './components/EchartsMap';
export { InformationMap } from './components/InformationMap';
export {
  convertCountry,
  convertProvincesSeries,
  convertCountrySeries
} from './adapters/isaaclin';
