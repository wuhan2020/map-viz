interface PatientStatData {
  confirmed: number;
  suspected: number;
  cured: number;
  dead: number;
}

interface CountryData extends PatientStatData {
  name: string; // '中国'
  timestamp?: number; // integer, unit is 'ms', unix epoch time
  provinces?: { [name: string]: ProvinceData };
}

interface ProvinceData extends PatientStatData {
  name: string; // '湖北'
  timestamp?: number;
  cities: { [name: string]: CityData };
}

interface CityData extends PatientStatData {
  name: string; // '武汉'
  timestamp?: number;
}

type Series<T extends CountryData | ProvinceData | CityData> = {
  [timestamp: number]: { [name: string]: T };
};

export { PatientStatData, CountryData, ProvinceData, CityData, Series };
