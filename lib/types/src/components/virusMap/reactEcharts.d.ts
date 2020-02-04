import React from 'react';
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
    render(): JSX.Element;
}
export {};
