import React from 'react';
declare type MapDataType = {
    [name: string]: any;
};
declare type STMapDataType = {
    timeline: number[];
    data: {
        [timestamp: number]: MapDataType;
    };
};
interface Props {
    name: string;
    data: MapDataType | STMapDataType;
    breaks: number[];
    chartData: any;
    chartPath: Array<string>;
    currentChartArea: string;
    type: string;
    chartOnClickCallBack: Function;
}
export declare class VirusMap extends React.Component<Props> {
    constructor(props: Props);
    static defaultProps: {
        name: string;
        data: {};
        breaks: number[];
        chartData: {};
        chartPath: any[];
        currentChartArea: string;
        type: string;
        chartOnClickCallBack: (param: any, chart: any) => void;
    };
    state: {
        mapScale: number;
        chartArea: string;
    };
    private genBasicVisualMap;
    private baseOptions;
    private overrides;
    getChartOptions(data: MapDataType, options?: any): any;
    getSTChartOptions(data: STMapDataType, options?: any): {
        baseOption: any;
        options: {
            tooltip: {
                trigger: string;
                triggerOn: string;
                confine: string;
                formatter: (params: any) => string;
            };
            series: {
                data: {
                    name: string;
                    value: any;
                }[];
            }[];
        }[];
    };
    private isTimelineData;
    render(): JSX.Element;
}
export {};
