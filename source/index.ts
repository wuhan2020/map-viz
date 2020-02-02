import './style.css';

export { HierarchicalVirusMap } from './components/HierarchicalVirusMap';
export { InformationMap } from './components/InformationMap';

export {
  convertProvincesSeries,
  convertCountrySeries
} from './adapters/isaaclin';
import patchData from './../data/isaaclin/patch.json';
import rawData from './../data/isaaclin/history.json';
import overviewData from './../data/isaaclin/overall.json';
const VirusData = { patchData, rawData, overviewData };
export { VirusData };
