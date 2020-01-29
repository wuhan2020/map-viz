var chinaGeoCoordMap = {
        '台湾': [121.5135,25.0308],
        '香港': [114.157046,22.410655],
        '澳门': [113.538941,22.138267],
		'北京': [116.4551, 40.2539],
		'北京市': [116.4551, 40.2539],
		'上海': [121.4648, 31.2891],
		"重庆": [108.384366, 30.439702],
		"天津": [117.4219, 39.4189],
		"广西": [108.479, 23.1152],
		'内蒙古': [110.3467, 41.4899],
		"新疆": [87.9236, 43.5883],
		"西藏": [91.11, 29.97],
		"宁夏": [106.3586, 38.1775],
		'黑龙江': [127.9688, 45.368],
		"吉林": [125.8154, 44.2584],
		"辽宁": [123.1238, 42.1216],
		"河北": [114.4995, 38.1006],
		"山西": [112.3352, 37.9413],
		"陕西": [109.1162, 34.2004],
		"甘肃": [103.5901, 36.3043],
		"青海": [101.4038, 36.8207],
		"四川": [103.9526, 30.7617],
		"山东": [117.1582, 36.8701],
		"河南": [113.4668, 34.6234],
		"江苏": [118.8062, 31.9208],
		"安徽": [117.29, 32.0581],
		"湖北": [114.3896, 30.6628],
		"浙江": [119.5313, 29.8773],
		"福建": [119.4543, 25.9222],
		"江西": [116.0046, 28.6633],
		"湖南": [113.0823, 28.2568],
		"贵州": [106.6992, 26.7682],
		"云南": [102.9199, 25.4663],
		"广东": [113.12244, 23.009505],
		"海南": [110.3893, 19.8516],
	};

pinyin2province={
          "china": "中国",
          "world": "世界",
          "aomen": "澳门",
          "xianggang": "香港",
          "taiwan": "台湾",
          "beijing": "北京",
          "shanghai": "上海",
          "chongqing": "重庆",
          "guangxi": "广西",
          "xinjiang": "新疆",
          "xizang": "西藏",
          "neimenggu": "内蒙古",
          "yunnan": "云南",
          "jilin": "吉林",
          "sichuan": "四川",
          "tianjin": "天津",
          "ningxia": "宁夏",
          "anhui": "安徽",
          "shangdong": "山东",
          "shangxi": "山西",
          "guangdong": "广东",
          "jiangsu": "江苏",
          "jiangxi": "江西",
          "hebei": "河北",
          "henan": "河南",
          "zhejiang": "浙江",
          "hainan": "海南",
          "hubei": "湖北",
          "hunan": "湖南",
          "gansu": "甘肃",
          "fujian": "福建",
          "guizhou": "贵州",
          "liaoning": "辽宁",
          "shanxi": "陕西",
          "qinghai": "青海",
          "heilongjiang": "黑龙江"
    }

    //北京/ 北京市
    //直辖市那个"市"字 这里默认不带了。。。

    province2pinyin={
        "中国":"china",
        "世界":"world",

        "澳门":"aomen",
        "香港":"xianggang",
        "台湾":"taiwan",

        "北京":"beijing",
        "上海":"shanghai",
        "重庆":"chongqing",
        //自治区
        "广西":"guangxi",
        "新疆":"xinjiang",
        "宁夏":"ningxia",
        "西藏":"xizang",
        "内蒙古":"neimenggu",

        "云南":"yunnan",
        "吉林":"jilin",
        "四川":"sichuan",
        "天津":"tianjin",
        "安徽":"anhui",
        "山东":"shandong",
        "山西":"shanxi",
        "广东":"guangdong",
        "江苏":"jiangsu",
        "江西":"jiangxi",
        "河北":"hebei",
        "河南":"henan",
        "浙江":"zhejiang",
        "海南":"hainan",
        "湖北":"hubei",
        "湖南":"hunan",
        "甘肃":"gansu",
        "福建":"fujian",
        "贵州":"guizhou",
        "辽宁":"liaoning",
        "陕西":"shanxi",
        "青海":"qinghai",
        "黑龙江":"heilongjiang",
        "山东":"shangdong",  //!!!
        "山西":"shangxi",    //!!!
    }

    //大区
    daqu={
        '江苏大区':'jiangsudaqu',
        '华南大区':'huanandaqu',
        '中西大区':'zhoangxidaqu',
        '华中大区':'huazhongdaqu',
        '华东大区':'huadongdaqu',
        '华北大区':'huabeidaqu',
        '东北大区':'dongbeidaqu',
        '北方大区':'beifangdaqu',
        '东南大区':'dongnandaqu',
        '西南大区':'xinandaqu'
    }
    //大区缩写
    daqu1={
        '江苏大区':'jsdq',
        '华南大区':'hndq',
        '中西大区':'zxdq',
        '华中大区':'hzdq',
        '华东大区':'hddq',
        '华北大区':'hbdq',
        '东北大区':'dbdq',
        '北方大区':'bfdq',
        '东南大区':'dndq',
        '西南大区':'xndq'
    }


    daqu3={
      china: [ '中国' ],
      world: [ '世界' ],
      xianggang: [ '香港' ],
      aomen: [ '澳门' ],
      taiwan: [ '台湾' ],
      jsdq: [ '上海', '江苏' ],
      hbdq: [ '河北', '北京', '天津' ],
      bfdq: [ '山西', '内蒙古', '宁夏', '新疆' ],
      dbdq: [ '辽宁', '吉林', '黑龙江' ],
      dndq: [ '浙江', '福建' ],
      hddq: [ '安徽', '山东' ],
      hzdq: [ '江西', '湖北' ,'湖南'],
      zxdq: [ '河南', '陕西', '甘肃', '青海' ],
      hndq: [ '广东', '广西', '海南' ],
      xndq: [ '四川', '贵州', '云南', '西藏', '重庆' ],
    }

    province2daqu={
      '中国': 'china',
      '上海': 'jsdq',
      '河北': 'hbdq',
      '山西': 'bfdq',
      '内蒙古': 'bfdq',
      '辽宁': 'dbdq',
      '吉林': 'dbdq',
      '黑龙江': 'dbdq',
      '江苏': 'jsdq',
      '浙江': 'dndq',
      '安徽': 'hddq',
      '福建': 'dndq',
      '江西': 'hzdq',
      '山东': 'hddq',
      '河南': 'zxdq',
      '湖北': 'hzdq',
      '湖南': 'hunan',
      '广东': 'hndq',
      '广西': 'hndq',
      '海南': 'hndq',
      '四川': 'xndq',
      '贵州': 'xndq',
      '云南': 'xndq',
      '西藏': 'xndq',
      '陕西': 'zxdq',
      '甘肃': 'zxdq',
      '青海': 'zxdq',
      '宁夏': 'bfdq',
      '新疆': 'bfdq',
      '北京': 'hbdq',
      '天津': 'hbdq',
      '重庆': 'xndq',
      '香港': 'xianggang',
      '澳门': 'aomen',
    }

    const get=(u="/")=>fetch(u).then(x=>x.json())
    const MAP_SERVER="https://map-1252957949.cos.ap-guangzhou.myqcloud.com"





    //注册省地图
    test=()=>{
        //echarts=...
        mapName="北京"
        d=province2pinyin[mapName]
        url=MAP_SERVER+"/map/china/"+d+".json"
        r=await get(url)
        echarts.registerMap(mapName, r)
    }

    //注册大区地图
    test1=()=>{
        //echarts=...
        mapName="北京"
        d=province2daqu[mapName]
        url=MAP_SERVER+"/map/"+d+".json"
        r=await get(url)
        echarts.registerMap(mapName, r)
    }
