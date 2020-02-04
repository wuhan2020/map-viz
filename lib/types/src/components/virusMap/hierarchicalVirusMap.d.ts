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
declare type Props = {
    data: any;
    resolution: number;
    type: 'overview' | 'pc' | 'mobile';
};
declare type State = {
    path: string[];
    currentChartArea: string;
};
declare class HierarchicalVirusMap extends React.Component<Props, Readonly<State>> {
    constructor(props: Props);
    static defaultProps: {
        data: {
            provincesSeries: {};
            countrySeries: {};
        };
        resolution: number;
        type: string;
        detail: boolean;
    };
    navigateDown(params: any): void;
    navigateUp(): void;
    getVirusMapConfig(path: any, data: any, resolution: any): {
        name: string;
        data: STMapDataType;
        navigateDown: any;
    };
    autoBreaks(values: number[]): number[];
    render(): JSX.Element;
}
export default HierarchicalVirusMap;
