/**
 * React 地理位置信息可视化组件
 * 在 BaiduMap 组件的基础上定制了不同种类的信息及表现方式
 * @author: shadowingszy
 *
 */

import React from 'react';
import { BaiduMap } from './baiduMap';
import markerIcon from './marker';

type InquiryMeta = [string, number | string | boolean];

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

type Props = {
  initPoint: [number, number];
  zoom: number;
  markers: GeoData[];
}

class InformationMap extends React.Component<Props> {

  static defaultProps = {
    initPoint: [0, 0],
    zoom: 1,
    markers: []
  }

  generateDefaultInfoWindowContent(content: string) {
    return `
      <div>${content}</div>
    `;
  }

  generateTooltipContent(metas: Metadata[], url: string) {
    let tooltip = '';
    metas.forEach((meta: Metadata) => {
      let content = meta.value;

      if (
        meta.value &&
        typeof meta.value !== 'string' &&
        typeof meta.value !== 'number'
      ) {
        content = '';
        (meta.value as InquiryMeta[]).forEach(item => {
          const filterItem = item
            .filter(i => typeof i === 'string' || typeof i === 'number')
            .map(i => `${i}`);
          if (filterItem.length > 0) {
            content += `<div>${filterItem.join(' ')}</div>`;
          }
        });
      }
      if (content) {
        tooltip += `<div><span class='info-label'>${meta.label ||
          meta.key}</span>${content}</div>`;
      }
    });
    if (url) {
      tooltip += `<div><span class='info-label'>详情链接</span><a href='${url}'>点此查看</a></div>`;
    }
    return tooltip;
  }

  generateOptions(item: GeoData, iconUrl: string) {
    let marker = {
      point: item.coord,
      icon: iconUrl,
      infoWindowTitle: item.name,
      infoWindowContent: this.generateTooltipContent(item.metadata, item.url)
    };
    return marker;
  }

  generateMarker(markerArray: GeoData[]) {
    const output = [];
    let iconUrl = markerIcon.others;
    for (const item of markerArray) {
      if (item.type === 'hospital') {
        iconUrl = markerIcon.hospital;
      } else if (item.type === 'hotel') {
        iconUrl = markerIcon.hotel;
      } else {
        iconUrl = markerIcon.others;
      }
      output.push(this.generateOptions(item, iconUrl));
    }
    return output;
  }

  getMapOptions(initPoint: [number, number], zoom: number, markers: GeoData[]) {
    const output = {
      initPoint: initPoint,
      zoom: zoom,
      markerArray: []
    };
    let markerArray: any = this.generateMarker(markers);
    output.markerArray = output.markerArray.concat(markerArray);
    return output;
  }

  public render() {
    return (
      <BaiduMap
        baiduMapKey={'4CsWt6kSluEoQFXxh8GlqoFDrctcoAIo'}
        mapOptions={this.getMapOptions(
          this.props.initPoint,
          this.props.zoom,
          this.props.markers
        )}
      />
    );
  }
}

export default InformationMap;
