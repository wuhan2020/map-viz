/**
 * WebCell地图可视化通用组件，接入百度地图API
 * 本地图组件为地图定制化开发提供了最高的自由度
 * @author: shadowingszy
 *
 */

import { observer } from 'mobx-web-cell';
import { component, mixin, createCell, attribute, watch } from 'web-cell';
import { BaiduMap } from './BaiduMap';
import '../style.css';

type InquiryMeta = [string, number|string|boolean]

export interface Metadata {
  key: string;
  label?: string;
  value: string|number|InquiryMeta[],
}

export interface GeoData {
  type: "hospital"|"hotel"|"other";
  name: string;
  url?: string;
  coord: [number, number];
  metadata: Metadata[];
}


interface InformationMapProps {
  initPoint: [number, number];
  zoom: number;
  markers: GeoData[];
}

interface LabelMeta {
  labelText: string,
  labelStyle: {
    color: string,
    backgroundColor: string,
    border: string
  }
};

@observer
@component({
  tagName: 'information-map',
  renderTarget: 'children'
})
export class InformationMap extends mixin<InformationMapProps, {}>() {
  @attribute
  @watch
  initPoint: [number, number] = [0, 0];

  @attribute
  @watch
  zoom: number = 1;

  @attribute
  @watch
  markers: GeoData[] = [];


  generateDefaultInfoWindowContent(content: string) {
    return `
      <div>${content}</div>
    `;
  }

  generateTooltipContent(metas: Metadata[], url: string) {
    let tooltip = ""
    metas.forEach((meta: Metadata) => {
      let content = meta.value;
      
      if (meta.value && typeof(meta.value) !== "string" && typeof(meta.value) !== "number") {
        content = "";
        (meta.value as InquiryMeta[]).forEach(item => {
          const filterItem = item
            .filter(i => typeof(i) === "string" || typeof(i) === "number")
            .map(i => `${i}`);
          if (filterItem.length > 0) {
            content += `<div>${filterItem.join(" ")}</div>`;
          }
        })
      }
      if (content) {
        tooltip += `<div><span class='info-label'>${meta.label || meta.key}</span>${content}</div>`;
      }
      
    });
    if (url) {
      tooltip += `<div><span class='info-label'>详情链接</span><a href='${url}'>点此查看</a></div>`
    }
    return tooltip;
  }

  generateOptions(item: GeoData, label: LabelMeta) {
    let marker = {
      point: item.coord,
      labelText: label.labelText,
      labelStyle: label.labelStyle,
      infoWindowTitle: item.name,
      infoWindowContent: this.generateTooltipContent (item.metadata, item.url)
    };
    return marker;
  }

  generateMarker(markerArray: GeoData[]): LabelMeta[] {
    const output = [];
    let label: LabelMeta = {
        labelText: '医院',
        labelStyle: {
          color: 'white',
          backgroundColor: 'red',
          border: '0px'
        }
      };
    for (const item of markerArray) {
      if (item.type === 'hospital') {
        label = {
          labelText: '医院',
          labelStyle: {
            color: 'white',
            backgroundColor: 'red',
            border: '0px'
          }
        };
        //output.push(this.generateHospitalMarker(item, label));
      } else if (item.type === 'hotel') {
        label = {
          labelText: '住宿',
          labelStyle: {
            color: 'white',
            backgroundColor: 'blue',
            border: '0px'
          }
        };
        //output.push(this.generateHotelMarker(item, label));
      } else {
        label = {
          labelText: '其他',
          labelStyle: {
            color: 'white',
            backgroundColor: 'black',
            border: '0px'
          }
        };
        //output.push(this.generateDefaultMarker(item, label));
      }
      output.push(this.generateOptions(item, label))
    }
    return output;
  }

  getMapOptions(initPoint: [number, number], zoom: number, markers: GeoData[]) {
    const output = {
      initPoint: initPoint,
      zoom: zoom,
      markerArray: []
    };
    let markerArray = this.generateMarker(markers);
    output.markerArray = output.markerArray.concat(markerArray);
    return output;
  }

  public render() {
    return (
      <BaiduMap
        baiduMapKey={'4CsWt6kSluEoQFXxh8GlqoFDrctcoAIo'}
        mapOptions={this.getMapOptions(this.props.initPoint, this.props.zoom, this.props.markers)}
      />
    );
  }
}
