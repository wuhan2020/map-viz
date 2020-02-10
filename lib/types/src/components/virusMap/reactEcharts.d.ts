import React from 'react';
import echarts from 'echarts';
declare type Props = {
    chartOptions: any;
};
export declare class ReactEcharts extends React.Component<Props> {
    static defaultProps: {
        chartOptions: {};
    };
    chartId: string;
    chart: any;
    generateChartId(): string;
    componentDidMount(): void;
    getEchartsInstance: () => echarts.ECharts;
    render(): JSX.Element;
}
export {};
