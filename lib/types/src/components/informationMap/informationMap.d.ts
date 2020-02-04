import React from 'react';
declare type InquiryMeta = [string, number | string | boolean];
export interface Metadata {
    key: string;
    label?: string;
    value: string | number | InquiryMeta[];
}
export interface GeoData {
    type: 'hospital' | 'hotel' | 'other';
    name: string;
    url: string;
    coord: [number, number];
    metadata: Metadata[];
}
declare type Props = {
    initPoint: [number, number];
    zoom: number;
    markers: GeoData[];
};
declare class InformationMap extends React.Component<Props> {
    static defaultProps: {
        initPoint: number[];
        zoom: number;
        markers: any[];
    };
    generateDefaultInfoWindowContent(content: string): string;
    generateTooltipContent(metas: Metadata[], url: string): string;
    generateOptions(item: GeoData, iconUrl: string): {
        point: [number, number];
        icon: string;
        infoWindowTitle: string;
        infoWindowContent: string;
    };
    generateMarker(markerArray: GeoData[]): any[];
    getMapOptions(initPoint: [number, number], zoom: number, markers: GeoData[]): {
        initPoint: [number, number];
        zoom: number;
        markerArray: any[];
    };
    render(): JSX.Element;
}
export default InformationMap;
