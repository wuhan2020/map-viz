# 武汉新型冠状病毒防疫信息收集平台-地图可视化项目

本项目负责平台的信息展示，可视化地理信息。

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

[疫情省市历史数据](http://ncov.nosensor.com:8080/api/)

[百度实时疫情](https://service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/release/newpneumonia)

[百度迁徙](https://service-8o85sm22-1252957949.gz.apigw.tencentcs.com/release/qianxi) 

[丁香园实时疫情](https://service-0gg71fu4-1252957949.gz.apigw.tencentcs.com/release/dingxiangyuan)

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
