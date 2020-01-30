/*
    InformationMap组件的mock数据

    主要结构:
    [
        {
            "initPoint": 地图初始点坐标
            "zoom": 地图初始缩放比例
            "hospitalArray": 医院标记点的内容，详见/mock/hospital_mock_data.js
            "hospitalLabel": {
              labelText: 医院标记点label显示的文字
              labelStyle: 医院标记点label的样式
            }
        },
        ...
    ]
*/

import hospitalArray from './hospital_mock_data';

export default {
  initPoint: [116.350658, 39.938285],
  zoom: 6,
  hospitalArray: hospitalArray,
  hospitalLabel: {
    labelText: '医院',
    labelStyle: {
      color: 'white',
      backgroundColor: 'red',
      border: '0px'
    },
  }
}