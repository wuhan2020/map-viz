import React from 'react';
declare type Props = {
    data: any;
    area: string;
    path: Array<string>;
};
declare type State = {
    echartOptions: any;
};
export declare class VirusChart extends React.Component<Props, Readonly<State>> {
    static defaultProps: {
        data: {
            provincesSeries: {};
            countrySeries: {};
        };
        area: string;
        path: string;
    };
    getOrderedTimeData(data: any): any[];
    fixChartFontSize(baseFontSize: number): number;
    getData(orderedProvinceData: Array<any>, orderedOverviewData: Array<any>, area: string, path: Array<string>): {
        confirmedData: any[];
        suspectedData: any[];
        curedData: any[];
        deadData: any[];
    };
    getConfirmedSuspectChartOptions(orderedProvinceData: Array<any>, orderedOverviewData: Array<any>, area: string, path: Array<string>): {
        legend: {
            orient: string;
            data: string[];
        };
        grid: {
            bottom: string;
        };
        tooltip: {
            trigger: string;
        };
        xAxis: {
            name: string;
            type: string;
            nameTextStyle: {
                fontSize: number;
            };
            nameGap: number;
            axisLabel: {
                textStyle: {
                    fontSize: number;
                };
                formatter: (params: any) => string;
            };
        };
        yAxis: {
            name: string;
            nameTextStyle: {
                fontSize: number;
            };
            nameGap: number;
            axisLabel: {
                textStyle: {
                    fontSize: number;
                };
            };
        };
        series: {
            name: string;
            data: any[];
            type: string;
            stack: string;
            symbolSize: number;
            lineStyle: {
                width: number;
            };
            areaStyle: {
                color: string;
            };
        }[];
        color: string[];
    };
    getCuredDeadChartOptions(orderedProvinceData: Array<any>, orderedOverviewData: Array<any>, area: string, path: Array<string>): {
        tooltip: {
            trigger: string;
        };
        grid: {
            bottom: string;
        };
        xAxis: {
            name: string;
            title: string;
            type: string;
            nameTextStyle: {
                fontSize: number;
            };
            nameGap: number;
            axisLabel: {
                textStyle: {
                    fontSize: number;
                };
                formatter: (params: any) => string;
            };
        };
        yAxis: {
            name: string;
            nameTextStyle: {
                fontSize: number;
            };
            nameGap: number;
            axisLabel: {
                textStyle: {
                    fontSize: number;
                };
            };
        };
        legend: {
            orient: string;
            data: string[];
        };
        series: {
            name: string;
            data: any[];
            type: string;
            symbolSize: number;
            lineStyle: {
                width: number;
            };
        }[];
        color: string[];
    };
    render(): JSX.Element;
}
export {};
