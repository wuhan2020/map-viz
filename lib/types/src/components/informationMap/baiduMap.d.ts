import React from 'react';
declare type Marker = {
    point: Array<number>;
    icon: string;
    labelText: string;
    labelStyle: Object;
    infoWindowTitle: string;
    infoWindowContent: string;
};
declare type MapOptions = {
    initPoint: Array<number>;
    zoom: number;
    markerArray: Array<Marker>;
};
declare type Props = {
    baiduMapKey: string;
    mapOptions: MapOptions;
};
export declare class BaiduMap extends React.Component<Props> {
    static defaultProps: {
        baiduMapKey: string;
        mapOptions: {};
    };
    mapId: string;
    generateMapId(): string;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
