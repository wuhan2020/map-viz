/**
 * React 百度地图地图可视化通用组件，接入百度地图API
 * 本地图组件为百度地图定制化开发提供了最高的自由度
 * @author: shadowingszy
 *
 * 传入props说明:
 * key: 百度地图API的密钥，默认为我自己申请的百度地图API密钥，建议自己申请
 * mapUrl: 地图json文件地址
 */
import React from 'react';

type Marker = {
  point: Array<number>;
  icon: string;
  labelText: string;
  labelStyle: Object;
  infoWindowTitle: string;
  infoWindowContent: string;
}

type MapOptions = {
  initPoint: Array<number>;
  zoom: number;
  markerArray: Array<Marker>;
}

type Props = {
  baiduMapKey: string;
  mapOptions: MapOptions;
}

export class BaiduMap extends React.Component<Props> {

  static defaultProps = {
    baiduMapKey: '4CsWt6kSluEoQFXxh8GlqoFDrctcoAIo',
    mapOptions: {}
  }

  mapId = this.generateMapId();

  /**
   * 使用随机数+date生成当前组件的唯一ID
   */
  generateMapId() {
    const random = Math.floor(Math.random() * 100);
    const dateStr = new Date().getTime();
    return 'map' + dateStr.toString() + random.toString();
  }

  componentDidMount() {
    setTimeout(() => {
      const script = document.createElement('script');
      script.src =
        'http://api.map.baidu.com/api?v=2.0&ak=' +
        this.props.baiduMapKey +
        '&callback=initialize';
      document.body.appendChild(script);
      (window as any).initialize = () => {
        const map = new (window as any).BMap.Map(this.mapId);
        let point = new (window as any).BMap.Point(
          this.props.mapOptions.initPoint[0],
          this.props.mapOptions.initPoint[1]
        );
        map.centerAndZoom(point, this.props.mapOptions.zoom);
        map.enableScrollWheelZoom(true);
        map.addControl(new (window as any).BMap.NavigationControl());

        for (const item of this.props.mapOptions.markerArray) {
          const position = new (window as any).BMap.Point(
            item.point[0],
            item.point[1]
          );
          const myIcon = new (window as any).BMap.Icon(
            item.icon,
            new (window as any).BMap.Size(25, 25),
            {
              offset: new (window as any).BMap.Size(10, 25)
            }
          );
          const marker = new (window as any).BMap.Marker(position, {
            icon: myIcon
          });

          marker.addEventListener('click', function() {
            var infoWindow = new (window as any).BMap.InfoWindow(
              item.infoWindowContent,
              {
                title: item.infoWindowTitle
              }
            );
            marker.openInfoWindow(infoWindow, map.getCenter());
          });

          map.addOverlay(marker);
        }
      };
    }, 0);
  }

  public render() {
    return (
      <div id={this.mapId} style={{ width: '100%', height: '100%' }}></div>
    );
  }
}
