import {
  CountryData,
  ProvinceData,
  CityData,
  PatientStatData
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
        (cities[long2short(c.cityName)] = convertCity(c))
    );
  }
  return {
    name: source.provinceShortName,
    timestamp: source.updateTime,
    cities,
    ...convertStat(source)
  };
}

function convertCity(source): CityData {
  return { name: long2short(source.cityName), ...convertStat(source) };
}

export { convertCountry, convertProvince, convertCity };
