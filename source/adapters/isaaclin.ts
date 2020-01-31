import {
  CountryData,
  ProvinceData,
  CityData,
  PatientStatData,
  Series
} from './patientStatInterface';
import long2short from './long2short'; // some city names are NOT short names so we also convert them here

function convertStat(source): PatientStatData {
  return {
    confirmed: source.confirmedCount,
    suspected: source.suspectedCount,
    cured: source.curedCount,
    dead: source.deadCount
  };
}

function convertCountry(source): CountryData {
  let provinces = {};

  source.forEach(
    (p: { provinceShortName: string }) =>
      (provinces[p.provinceShortName] = convertProvince(p))
  );

  // currently we only support china
  return {
    name: '中国',
    confirmed: 0,
    suspected: 0,
    cured: 0,
    dead: 0,
    provinces
  };
}

function convertProvince(source): ProvinceData {
  let cities = {};
  if (source.cities && source.cities.length > 0) {
    source.cities.forEach(
      (c: { cityName: string }) =>
        // 把省级的更新时间传入市级由于市级没有各自的数据更新时间
        (cities[long2short(c.cityName)] = convertCity(c, source.updateTime))
    );
  }
  return {
    name: source.provinceShortName,
    timestamp: source.updateTime,
    cities,
    ...convertStat(source)
  };
}

function convertCity(source, updateTime): CityData {
  return {
    name: long2short(source.cityName),
    timestamp: updateTime, // 使用传入的省级数据更新时间
    ...convertStat(source)
  };
}

function roundTime(t: number, resolution: number) {
  const offset = resolution >= 24 * 3600000 ? 8 * 3600000 : 0; // consider locale if resolution > 1 day
  return Math.floor((t + offset) / resolution) * resolution - offset;
}

function convertProvincesSeries(
  source,
  resolution: number // in ms
): Series<ProvinceData> {
  let res: Series<ProvinceData> = {};
  source.forEach(item => {
    const t = roundTime(item.updateTime, resolution);
    if (res[t] === undefined) {
      res[t] = {};
    }
    const prov = convertProvince(item);
    res[t][prov.name] = prov;
  });
  return res;
}

function extractCitiesSeries(
  series: Series<ProvinceData>,
  name: string,
  resolution: number
): Series<CityData> {
  let res: Series<CityData> = {};
  Object.values(series).forEach(provs => {
    if (provs[name] !== undefined) {
      res[roundTime(provs[name].timestamp, resolution)] = provs[name].cities;
    }
  });
  return res;
}

export {
  convertCountry,
  convertProvince,
  convertCity,
  convertProvincesSeries,
  extractCitiesSeries
};
