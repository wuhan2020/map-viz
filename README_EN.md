# 2019-nCoV Pneumonia Epidemic Prevention information Platform
# Prevention-Map Visualization Project

This project is responsible for platform information display and visual geographic information.

## TASK

Based on ECharts visualization library and other technology repository:

### 1)	Create a complete and independent outbreak map for Pneumonia Caused by the Novel Coronavirus (2019-nCoV)
- **Purpose & Design**：Create an independent epidemic map visualization with two main goals
  i.Geographical accuracy: There is a city-level geographic granularity, and the beginning is a heatmap of a national map. Click on a province to redraw it into a provincial map. （[Redraw reference](https://gallery.echartsjs.com/editor.html?c=xm3iS_cb0g)）
  ii.Time information: There is a time axis. Click on an area to draw an epidemic development chart such as a[stacked area chart](https://echarts.apache.org/examples/en/editor.html?c=area-stack).([Timeline reference case](https://echarts.apache.org/examples/en/editor.html?c=mix-timeline-finance))
- **Usage**:Separate webpage, finally integrated into the front-end page as an iframe
  - i.	Unlike the common components below, the epidemic map has fewer interactions with other front-end components, and the data can be directly obtained through[the API](http://lab.isaaclin.cn/nCoV/api/area?latest=0). It is more reasonable to form a separate project.
### Create a universal map component
- **Purpose**:To visualize various geographic information (such as hospital location, hotel location, etc.)
- **Usage**:As a component is called by the front end, the data comes from the front end.
- **Basic design**：point map + map （[reference example](https://www.echartsjs.com/examples/zh/editor.html?c=effectScatter-bmap)）
- **Interaction**：
  - There is no built-in interactive components such as filtering. The upper layer should create checkboxes, sliders, etc. The filtered data is passed to the map component to redraw the map.
  - Accepting the incoming mouseEvent can help with information filtering and positioning (e.g., click a province to select its information)
  - ([Related discussion](https://github.com/wuhan2020/map-viz/issues/2#issuecomment-578626578))
- [Data format design discussion](https://github.com/wuhan2020/map-viz/issues/3)

## TASK SPLIT & PARTICIPATION GUIDE
For the cooperation guide, please refer to the[main repo](https://github.com/wuhan2020/wuhan2020/blob/master/CONTRIBUTING.md)(viz does not have a project robot + pay attention to changing the demo script to our repo)
TL;DR:
1. Please claim & self-assign issues in the[project Panel](https://github.com/wuhan2020/map-viz/projects/1)(If you cannot change the assignee, please reply “issue” to claim, we will add assign later)
2. For data and design discussions, see the following issues:
  - [Map Design Discussion](https://github.com/wuhan2020/map-viz/issues/2)
  - [Data format design discussion](https://github.com/wuhan2020/map-viz/issues/3)
  - [Collect existing data and visualization](https://github.com/wuhan2020/map-viz/issues/7)
3. If you have other suggestions, please open an issue
4. To participate in more discussions, please join the[slack discussion group](https://join.slack.com/t/wuhan2020/shared_invite/enQtOTI2NTU1NzU3MTM2LWQ1YjIzMDllYjYzYTE1OTNhMWU4OTZkOGYzOGJhOWM2MzdlMjgwMmZiOWEzYTQwNmJkZDI4OWRmM2Q2ZDM1MTc), we are in channel # proj-map-visualization


## TECHNOLOGY REPOSITORY

-   Visualization library: [ECharts v4][13]
-   Logical language: [TypeScript v3][5]
-   Component Engine: [WebCell v2][6]
-   Component library: [BootCell v1][7]
-   State Management: [MobX v5][8]
-   PWA framework:[Workbox v4][9]
-   Packaging tool: [Parcel v1][10]
-   CI / CD: [Travis CI][11] + [GitHub Pages][12]

## LOCAL DEVELOPMENT

### Configuration
1. [Install Node.js](https://nodejs.org/en/download/package-manager/)
2. 
```sh
# clone the repo
git clone git@github.com:wuhan2020/map-viz.git
# setup the npm env
cd map-viz
npm install
# start the project
npm start
```

### Tutorials and useful links

[Get started with ECharts in 5 minutes](https://www.echartsjs.com/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)

[echarts example](https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)

[Baidu map](http://lbsyun.baidu.com/jsdemo.htm#canvaslayer)


#### example

[Baidu migration](https://qianxi.baidu.com/?from=shoubai#city=420100)

[Baidu real-time epidemic data](https://voice.baidu.com/act/newpneumonia/newpneumonia)

[DingXiangYuan real-time epidemic data](https://3g.dxy.cn/newh5/view/pneumonia)

[Tencent real-time epidemic data](https://news.qq.com/zt2020/page/feiyan.htm)


#### Temporary interface

[Provinces and cities daily historical data](http://ncov.nosensor.com:8080/api/)

[Baidu real-time epidemic](https://service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/release/newpneumonia)

[Baidu migration](https://huiyan.baidu.com/migration/cityrank.jsonp?dt=city&id=420100&type=move_out&date=20200128&callback=jsonp_1580257678289_5758459) 

[DingXiangYuan real-time epidemic data(https://service-0gg71fu4-1252957949.gz.apigw.tencentcs.com/release/dingxiangyuan)

[DingXiangYuan historical data per minute](http://lab.isaaclin.cn/nCoV/api/area?latest=0)

[DingXiangYuan Other](http://lab.isaaclin.cn/nCoV/)

[Tencent real time + historical epidemic](https://service-n9zsbooc-1252957949.gz.apigw.tencentcs.com/release/qq )

[Baidu map address transform to latitude and longitude](https://service-qf7o2c4u-1252957949.gz.apigw.tencentcs.com/release/bmap?address=华中科技大学)

[News gathering interface](http://ncov.news.dragon-yuan.me/api/news?search=&page=)

[1]: https://developers.google.cn/web/progressive-web-apps
[2]: https://david-dm.org/wuhan2020/wuhan2020.github.io
[3]: https://travis-ci.com/wuhan2020/wuhan2020.github.io
[4]: https://www.w3.org/
[5]: https://typescriptlang.org
[6]: https://web-cell.dev/
[7]: https://web-cell.dev/BootCell/
[8]: https://mobx.js.org
[9]: https://developers.google.com/web/tools/workbox
[10]: https://parceljs.org
[11]: https://travis-ci.com/
[12]: https://pages.github.com/
[13]: https://www.echartsjs.com/
