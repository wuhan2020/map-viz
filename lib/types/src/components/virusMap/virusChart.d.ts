import React from 'react';
declare type Props = {
    data: any;
    area: string;
    type: string;
    path: Array<string>;
};
declare type State = {
    echartOptions: any;
};
export declare class VirusChart extends React.Component<Props, Readonly<State>> {
    getConfirmedSuspectChart: any;
    curedDeadChart: any;
    static defaultProps: {
        data: {
            provincesSeries: {};
            countrySeries: {};
        };
        area: string;
        path: string;
    };
    getOrderedTimeData(data: any): any[];
    getData(orderedProvinceData: Array<any>, orderedOverviewData: Array<any>, area: string, path: Array<string>): {
        confirmedData: any[];
        suspectedData: any[];
        curedData: any[];
        deadData: any[];
    };
    getConfirmedSuspectChartOptions(orderedProvinceData: Array<any>, orderedOverviewData: Array<any>, area: string, path: Array<string>): {
        title: {
            text: string;
            x: string;
            textStyle: {
                fontSize: number;
            };
        };
        legend: {
            top: number;
            orient: string;
            data: string[];
            itemWidth: number;
            itemHeight: number;
            textStyle: {
                fontSize: number;
            };
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
        title: {
            text: string;
            x: string;
            textStyle: {
                fontSize: number;
            };
        };
        legend: {
            top: number;
            orient: string;
            data: string[];
            itemWidth: number;
            itemHeight: number;
            textStyle: {
                fontSize: number;
            };
        };
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
    getAllChartOptions(orderedProvinceData: Array<any>, orderedOverviewData: Array<any>, area: string, path: Array<string>): {
        title: {
            text: string;
            x: string;
            textStyle: {
                fontSize: number;
            };
        };
        legend: {
            top: number;
            orient: string;
            data: string[];
            itemWidth: number;
            itemHeight: number;
            textStyle: {
                fontSize: number;
            };
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
        series: ({
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
        } | {
            name: string;
            data: any[];
            type: string;
            symbolSize: number;
            lineStyle: {
                width: number;
            };
            stack?: undefined;
            areaStyle?: undefined;
        })[];
        color: string[];
    };
    chartsCount(): 1 | 0 | 2;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
