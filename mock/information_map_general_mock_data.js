/*
    InformationMap组件的mock数据

    主要结构:
        {
          "initPoint": 地图初始点坐标
          "zoom": 地图初始缩放比例
          "markerArray": 地图标记点的内容
        },
        ...

    其中，markerArray中每一项的内容为：
    export interface GeoData {
      type: "hospital"|"hotel"|"other";
      name: string;
      url?: string;
      coord: [number, number];
      metadata: Metadata[];
    }
    export interface Metadata {
      key: string;
      label?: string;
      value: string|number|InquiryMeta[],
    }
    
    使用:
    <InformationMap 
      initPoint={initPoint} 
      zoom={zoom} 
      markers={makerArray} />
*/

export default {
  initPoint: [110.350658, 32.938285],
  zoom: 6,
  makerArray: [
    {
      name: '华中科技大学同济医学院附属协和医院',
      type: "hospital",
      coord: [114.281196, 30.590103],
      url: 'https://mp.weixin.qq.com/s/geO3CCd0_8B3L-r_xlBbZQ',
      metadata: [
        {
          key: "request",
          label: "物资需求",
          value: [
            ['普通医用口罩', 10000],
            ['医用外科口罩', true],
            ['医用防护口罩 | N95口罩', 10000],
            ['防冲击眼罩/护目镜/防护眼镜', true],
            ['防护面罩', 25050],
            ['防护帽/医用帽/圆帽', 10420],
            ['隔离衣', true],
            ['防护服', 5000],
            ['手术衣', true],
            ['乳胶手套', true],
            ['长筒胶鞋/防污染靴', true],
            ['防污染鞋套', true],
            ['防污染靴套', true],
            ['84消毒液', true],
            ['过氧乙酸', true],
            ['75%酒精', true],
            ['手部皮肤消毒液', true],
            ['活力碘', true],
            ['床罩', true],
            ['医用面罩式雾化器', true],
            ['测体温设备', true],
            ['空气消毒设备', true],
            ['医用紫外线消毒车', true]
          ]
        }, {
          key: "address",
          value: '湖北省武汉市江汉区解放大道1277号华中科技大学同济医学院附属协和医院总务处',
          label: "邮寄地址",
        }, {
          key: "note",
          value: null,
          label: "备注信息",
        }
      ]
    },
    {
      name: '红安县人民医院',
      coord: [114.625222, 31.286868],
      url: 'https://mp.weixin.qq.com/s/geO3CCd0_8B3L-r_xlBbZQ',
      address: '红安县人民医院红安县城关镇陵园大道附50号',
      metadata: [
        {
          key: "request",
          label: "物资需求",
          value: [
            ['普通医用口罩', 1000],
            ['医用外科口罩', 1000],
            ['医用防护口罩 | N95口罩', 10000],
            ['防冲击眼罩/护目镜/防护眼镜', 1000],
            ['防护面罩', true],
            ['防护帽/医用帽/圆帽', 1000],
            ['隔离衣', true],
            ['防护服', 100],
            ['手术衣', true],
            ['乳胶手套', 1000],
            ['长筒胶鞋/防污染靴', 100],
            ['防污染鞋套', 100],
            ['防污染靴套', 10000],
            ['84消毒液', true],
            ['过氧乙酸', true],
            ['75%酒精', true],
            ['手部皮肤消毒液', true],
            ['活力碘', true],
            ['床罩', true],
            ['医用面罩式雾化器', true],
            ['测体温设备', true],
            ['空气消毒设备', true],
            ['医用紫外线消毒车', true]
          ]
        }, {
          key: "address",
          value: '湖北省武汉市江汉区解放大道1277号华中科技大学同济医学院附属协和医院总务处',
          label: "邮寄地址",
        }, {
          key: "note",
          value: null,
          label: "备注信息",
        }, {
          key: "contact",
          label: "联系方式",
          value: [
            ['0713-5242320'],
            ['设备科周主任, 13636105950']
          ]
        }
      ]
    },
    {
      type: 'hotel',
      name: '住宿数据1',
      coord: [114.881337, 30.205063],
      metadata: [
        {
          key: "capability",
          value: 100,
          label: "容量",
        }, {
          key: "note",
          value: '发布日期, 2020年1月25日',
          label: "备注信息",
        }, {
          key: "contact",
          label: "联系方式",
          value: [
            ['XXX：123456789'],
          ]
        }
      ]
    },
    
    {
      type: 'others',
      name: '其他数据',
      coord: [114.681337, 30.295063],
      metadata: [
        {
          key: "内容",
          value: '我是内容'
        }
      ]
    }
  ]
};
