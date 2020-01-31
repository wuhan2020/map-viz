/**
 * WebCell地图可视化通用组件，接入百度地图API
 * 本地图组件为地图定制化开发提供了最高的自由度
 * @author: shadowingszy
 *
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import { BaiduMap } from './BaiduMap';

interface GeoData {
  type: string;
  name: string;
  coord: Array<number>;
  metadata: Object;
}

interface MapOptions {
  initPoint: Array<number>;
  zoom: number;
  marker: Array<GeoData>;
}

interface InformationMapProps {
  options: MapOptions;
}

@observer
@component({
  tagName: 'information-map',
  renderTarget: 'children'
})
export class InformationMap extends mixin<InformationMapProps, {}>() {
  @attribute
  @watch
  options = {};

  generateHospitalInfoWindowContent(
    requests: Array<any>,
    url: string,
    address: string,
    contact: string,
    note: string
  ) {
    let requestsHTML = ``;
    for (let item of requests) {
      if (item[1] !== null && item[1] !== undefined && item[1] !== true) {
        requestsHTML += `<div>${item[0] + ' ' + item[1]}</div>`;
      }
    }
    let contactHTML = ``;
    for (let item of contact.split('|')) {
      contactHTML += `<div>${item}</div>`;
    }
    return `
      <div>物资需求：</div>
      <div>${requestsHTML}</div>
      <br/>
      <div>联系方式：</div>
      <div>${contactHTML}</div>
      <br/>
      <div>邮寄地址：${address}</div>
      <div>备注信息：${note === null || note === undefined ? '无' : note}</div>
      <div>详情链接：<a href='${url}'>点此查看</a></div>
    `;
  }

  generateHotelInfoWindowContent(
    capacity: number,
    address: string,
    contact: string,
    note: string
  ) {
    let contactHTML = ``;
    for (let item of contact.split('|')) {
      contactHTML += `<div>${item}</div>`;
    }
    return `
      <div>容量：${capacity}</div>
      <div>地址：${address}</div>
      <div>备注：${note === null || note === undefined ? '无' : note}</div>
      <br/>
      <div>联系方式：</div>
      <div>${contactHTML}</div>
    `;
  }

  generateDefaultInfoWindowContent(content: string) {
    return `
      <div>${content}</div>
    `;
  }

  generateHospitalMarker(item: any, label: any) {
    let marker = {
      point: item.coord,
      labelText: label.labelText,
      labelStyle: label.labelStyle,
      infoWindowTitle: item.name,
      infoWindowContent: this.generateHospitalInfoWindowContent(
        item.metaData.requests,
        item.metaData.url,
        item.metaData.address,
        item.metaData.contact,
        item.metaData.note
      )
    };
    return marker;
  }

  generateHotelMarker(item: any, label: any) {
    let marker = {
      point: item.coord,
      labelText: label.labelText,
      labelStyle: label.labelStyle,
      infoWindowTitle: item.name,
      infoWindowContent: this.generateHotelInfoWindowContent(
        item.metaData.capacity,
        item.metaData.address,
        item.metaData.contact,
        item.metaData.note
      )
    };
    return marker;
  }

  generateDefaultMarker(item: any, label: any) {
    let marker = {
      point: item.coord,
      labelText: label.labelText,
      labelStyle: label.labelStyle,
      infoWindowTitle: item.name,
      infoWindowContent: this.generateDefaultInfoWindowContent(
        item.metaData.content
      )
    };
    return marker;
  }

  generateMarker(markerArray: Array<any>) {
    const output = [];
    for (const item of markerArray) {
      if (item.type === 'hospital') {
        const label = {
          labelText: '医院',
          labelStyle: {
            color: 'white',
            backgroundColor: 'red',
            border: '0px'
          }
        };
        output.push(this.generateHospitalMarker(item, label));
      } else if (item.type === 'hotel') {
        const label = {
          labelText: '住宿',
          labelStyle: {
            color: 'white',
            backgroundColor: 'blue',
            border: '0px'
          }
        };
        output.push(this.generateHotelMarker(item, label));
      } else {
        const label = {
          labelText: '其他',
          labelStyle: {
            color: 'white',
            backgroundColor: 'black',
            border: '0px'
          }
        };
        output.push(this.generateDefaultMarker(item, label));
      }
    }
    return output;
  }

  getMapOptions(options: any) {
    const output = {
      initPoint: options.initPoint,
      zoom: options.zoom,
      markerArray: []
    };
    let markerArray = this.generateMarker(options.makerArray);
    output.markerArray = output.markerArray.concat(markerArray);
    return output;
  }

  public render() {
    return (
      <BaiduMap
        baiduMapKey={'4CsWt6kSluEoQFXxh8GlqoFDrctcoAIo'}
        mapOptions={this.getMapOptions(this.props.options)}
      />
    );
  }
}
