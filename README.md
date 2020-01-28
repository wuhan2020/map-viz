# 武汉新型冠状病毒防疫信息收集平台-地图可视化项目

本项目负责平台的信息展示，可视化地理信息。

## 任务

基于ECharts可视化库及其他技术栈：

### 创建一个完整独立的疫情地图
- **目的&设计**：创建一个独立的疫情地图可视化，有两个主要目标
  1. 地理精度：有市级地理粒度，最开始是一个全国地图的heatmap，点击一个省重绘成省map。（[重绘参考](https://gallery.echartsjs.com/editor.html?c=xm3iS_cb0g)）
  2. 时间信息：有时间轴，点击一个地区可以画出[stacked area chart](https://echarts.apache.org/examples/en/editor.html?c=area-stack)之类的疫情发展图 (确诊/疑似/死亡为不同层)，也可以根据选择的时间点重绘地图。([时间轴参考案例](https://echarts.apache.org/examples/en/editor.html?c=mix-timeline-finance))
- **使用**：单独webpage，最终作为iframe整合进前端页面
  - 与下面的通用组件不同，疫情地图与前端其他组件交互较少，且数据可以[通过API直接获取](http://lab.isaaclin.cn/nCoV/api/area?latest=0)，单独成项目更合理。

### 创建一个通用地图组件
- **目的**：用于可视化各种不同地理信息（例如医院位置，酒店位置，etc.）
- **使用**：作为组件被前端调用，数据来自前端。
- **基础设计**：点图+地图（[参考例子](https://www.echartsjs.com/examples/zh/editor.html?c=effectScatter-bmap)）
- **交互**：
  - 不自带过滤等交互组件，上层应该自己创建checkbox, slider, etc. 过滤后数据传入地图组件可以重绘地图
  - 接受传入的mouseEvent，可以帮助做信息过滤及定位（e.g., 点击一个省选中它的信息）
  - ([相关讨论](https://github.com/wuhan2020/map-viz/issues/2#issuecomment-578626578))
- [数据格式设计讨论](https://github.com/wuhan2020/map-viz/issues/3)

### 任务细化
（可以自己创建issue开始做）
#### 疫情图
- [x] 基础疫情地图
- [ ] 链接API拿到实时数据(QQ或丁香医生)
- [ ] 添加时间信息
  - [ ] 做时间轴+数据统计stacked area chart/line chart
- [ ] 实现交互
  - [ ] 点击省重绘省内地图/双击或提供按钮退出省内地图，同时重绘stacked area chart
  - [ ] 点时间轴改变地图颜色

#### 通用地图
- [ ] 基础通用地图
- [ ] 做医院/酒店的数据mockup


## 技术栈

-   可视化库: [ECharts v4][13]
-   逻辑语言: [TypeScript v3][5]
-   组件引擎: [WebCell v2][6]
-   组件库: [BootCell v1][7]
-   状态管理: [MobX v5][8]
-   PWA 框架: [Workbox v4][9]
-   打包工具: [Parcel v1][10]
-   CI / CD: [Travis CI][11] + [GitHub Pages][12]

## 本地开发

### 配置
1. [安装 Node.js](https://nodejs.org/en/download/package-manager/)
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

### 教程及有用链接

[5 分钟上手 ECharts](https://www.echartsjs.com/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)

[echarts example](https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)

[百度地图](http://lbsyun.baidu.com/jsdemo.htm#canvaslayer)


#### 例子

[百度迁徙](https://qianxi.baidu.com/?from=shoubai#city=420100)

[百度实时疫情数据](https://voice.baidu.com/act/newpneumonia/newpneumonia)

[丁香园实时疫情数据](https://3g.dxy.cn/newh5/view/pneumonia)

[qq实时疫情数据](https://news.qq.com/zt2020/page/feiyan.htm)


#### 临时接口

[省市每日历史数据](http://ncov.nosensor.com:8080/api/)

[百度实时疫情](https://service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/release/newpneumonia)

[百度迁徙](https://service-8o85sm22-1252957949.gz.apigw.tencentcs.com/release/qianxi) 

[丁香园实时疫情](https://service-0gg71fu4-1252957949.gz.apigw.tencentcs.com/release/dingxiangyuan)

[丁香园每分钟历史数据](http://lab.isaaclin.cn/nCoV/api/area?latest=0)

[丁香园其他](http://lab.isaaclin.cn/nCoV/)

[qq实时+历史疫情](https://service-n9zsbooc-1252957949.gz.apigw.tencentcs.com/release/qq )





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
