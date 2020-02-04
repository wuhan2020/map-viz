import React from 'react';
interface Props {
    mapUrl: string;
    chartOptions: any;
    mapName: string;
    mobile: boolean;
    chartOnClickCallBack: Function;
}
export declare class EchartsMap extends React.Component<Props> {
    static defaultProps: {
        mapUrl: string;
        chartOptions: {};
        mapName: string;
        mobile: boolean;
        chartOnClickCallBack: (param: any, chart: any) => void;
    };
    chartId: string;
    chart: any;
    generateChartId(): string;
    componentDidMount(): void;
    updateMap(mapUrl: string, mapName: string, chartOptions: any, chartOnClickCallBack: Function): void;
    render(): JSX.Element;
}
export {};
