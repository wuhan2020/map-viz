/**
 * WebCell地图可视化通用组件，接入百度地图API
 * 本地图组件为地图定制化开发提供了最高的自由度
 * @author: shadowingszy
 * 
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import { BaiduMap } from './BaiduMap';

interface InformationMapProps {
  options: Object
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

  generateHospitalInfoWindowContent(requests: Array<any>, url: string, address: string, contact: string, note: string) {
    let requestsHTML = ``;
    for (let item of requests) {
      if (item[1] !== null && item[1] !== undefined && item[1] !== true) {
        requestsHTML += `<div>${item[0] + ' ' + item[1]}</div>`
      }
    }
    let contactHTML = ``;
    for (let item of contact.split('|')) {
      contactHTML += `<div>${item}</div>`
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
    `
  }

  generateHospitalMarker(hospitalDataArray: Array<any>, label: any) {
    let output = [];
    for (let item of hospitalDataArray) {
      let marker = {
        point: item.coord,
        labelText: label.labelText,
        labelStyle: label.labelStyle,
        infoWindowTitle: item.name,
        infoWindowContent: this.generateHospitalInfoWindowContent(item.requests, item.url, item.address, item.contact, item.note),
      }
      output.push(marker);
    }
    return output;
  }

  getMapOptions(options: any) {
    const output = {
      initPoint: options.initPoint,
      zoom: options.zoom,
      markerArray: []
    }
    const hospitalMarkerArray = this.generateHospitalMarker(options.hospitalArray, options.hospitalLabel);
    output.markerArray = output.markerArray.concat(hospitalMarkerArray);
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