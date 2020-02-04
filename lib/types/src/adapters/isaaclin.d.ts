declare function convertCountry(source: any): {
    name: string;
    confirmed: number;
    suspected: number;
    cured: number;
    dead: number;
    provinces: {};
};
declare function convertProvince(source: any): any;
declare function convertCity(source: any, updateTime: any): any;
declare function convertProvincesSeries(source: any, resolution: any, shouldFillForward: any): {};
declare function extractCitiesSeries(series: any, name: any, resolution: any, shouldFillForward: any): {};
declare function convertCountrySeries(source: any, resolution: any): {};
export { convertCountry, convertProvince, convertCity, convertProvincesSeries, convertCountrySeries, extractCitiesSeries };
