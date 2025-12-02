export interface Coordinate {
  lat: number;
  lng: number;
}

export interface DestinationItem {
  name: string;
  enName: string;
  fullName?: string;
  coords: Coordinate;
}

export interface ProvinceNode {
  name: string;
  enName: string;
  cities: DestinationItem[];
}

export interface RegionNode {
  name: string;
  enName: string;
  provinces: ProvinceNode[];
}

export const DOMESTIC_DATA: RegionNode[] = [
  {
    name: '华东地区',
    enName: 'east_china',
    provinces: [
      {
        name: '上海',
        enName: 'shanghai',
        cities: [
          { name: '上海', enName: 'shanghai', fullName: '上海市', coords: { lat: 31.2304, lng: 121.4737 } },
        ]
      },
      {
        name: '浙江',
        enName: 'zhejiang',
        cities: [
          { name: '杭州', enName: 'hangzhou', fullName: '杭州, 浙江', coords: { lat: 30.2741, lng: 120.1551 } },
          { name: '宁波', enName: 'ningbo', fullName: '宁波, 浙江', coords: { lat: 29.8683, lng: 121.5440 } },
          { name: '绍兴', enName: 'shaoxing', fullName: '绍兴, 浙江', coords: { lat: 30.0017, lng: 120.5761 } },
          { name: '温州', enName: 'wenzhou', fullName: '温州, 浙江', coords: { lat: 27.9943, lng: 120.6994 } },
          { name: '嘉兴', enName: 'jiaxing', fullName: '嘉兴(乌镇), 浙江', coords: { lat: 30.7539, lng: 120.7585 } },
          { name: '舟山', enName: 'zhoushan', fullName: '舟山(普陀山), 浙江', coords: { lat: 29.9855, lng: 122.2066 } },
          { name: '湖州', enName: 'huzhou', fullName: '湖州(莫干山), 浙江', coords: { lat: 30.8943, lng: 120.0868 } },
        ]
      },
      {
        name: '江苏',
        enName: 'jiangsu',
        cities: [
          { name: '南京', enName: 'nanjing', fullName: '南京, 江苏', coords: { lat: 32.0603, lng: 118.7969 } },
          { name: '苏州', enName: 'suzhou', fullName: '苏州, 江苏', coords: { lat: 31.2989, lng: 120.5853 } },
          { name: '无锡', enName: 'wuxi', fullName: '无锡, 江苏', coords: { lat: 31.5681, lng: 120.2990 } },
          { name: '扬州', enName: 'yangzhou', fullName: '扬州, 江苏', coords: { lat: 32.3942, lng: 119.4129 } },
          { name: '徐州', enName: 'xuzhou', fullName: '徐州, 江苏', coords: { lat: 34.2048, lng: 117.2841 } },
          { name: '连云港', enName: 'lianyungang', fullName: '连云港, 江苏', coords: { lat: 34.5967, lng: 119.2216 } },
        ]
      },
      {
        name: '山东',
        enName: 'shandong',
        cities: [
          { name: '青岛', enName: 'qingdao', fullName: '青岛, 山东', coords: { lat: 36.0671, lng: 120.3826 } },
          { name: '济南', enName: 'jinan', fullName: '济南, 山东', coords: { lat: 36.6512, lng: 117.1201 } },
          { name: '威海', enName: 'weihai', fullName: '威海, 山东', coords: { lat: 37.5187, lng: 122.1195 } },
          { name: '烟台', enName: 'yantai', fullName: '烟台, 山东', coords: { lat: 37.5126, lng: 121.3665 } },
          { name: '泰安', enName: 'taian', fullName: '泰安(泰山), 山东', coords: { lat: 36.1956, lng: 117.0872 } },
          { name: '淄博', enName: 'zibo', fullName: '淄博, 山东', coords: { lat: 36.8135, lng: 118.0550 } },
        ]
      },
      {
        name: '福建',
        enName: 'fujian',
        cities: [
          { name: '厦门', enName: 'xiamen', fullName: '厦门, 福建', coords: { lat: 24.4798, lng: 118.0894 } },
          { name: '福州', enName: 'fuzhou', fullName: '福州, 福建', coords: { lat: 26.0745, lng: 119.2965 } },
          { name: '泉州', enName: 'quanzhou', fullName: '泉州, 福建', coords: { lat: 24.8741, lng: 118.6757 } },
          { name: '武夷山', enName: 'wuyishan', fullName: '武夷山, 福建', coords: { lat: 27.7554, lng: 118.0360 } },
          { name: '漳州', enName: 'zhangzhou', fullName: '漳州, 福建', coords: { lat: 24.5130, lng: 117.6472 } },
        ]
      },
      {
        name: '安徽',
        enName: 'anhui',
        cities: [
          { name: '合肥', enName: 'hefei', fullName: '合肥, 安徽', coords: { lat: 31.8206, lng: 117.2272 } },
          { name: '黄山', enName: 'huangshan', fullName: '黄山, 安徽', coords: { lat: 29.7147, lng: 118.3375 } },
          { name: '宏村', enName: 'hongcun', fullName: '宏村, 安徽', coords: { lat: 30.0016, lng: 117.9877 } },
        ]
      },
      {
        name: '江西',
        enName: 'jiangxi',
        cities: [
          { name: '南昌', enName: 'nanchang', fullName: '南昌, 江西', coords: { lat: 28.6829, lng: 115.8579 } },
          { name: '景德镇', enName: 'jingdezhen', fullName: '景德镇, 江西', coords: { lat: 29.2688, lng: 117.1782 } },
          { name: '婺源', enName: 'wuyuan', fullName: '婺源, 江西', coords: { lat: 29.2483, lng: 117.8610 } },
          { name: '庐山', enName: 'lushan', fullName: '庐山, 江西', coords: { lat: 29.5639, lng: 115.9866 } },
        ]
      }
    ]
  },
  {
    name: '华南地区',
    enName: 'south_china',
    provinces: [
      {
        name: '广东',
        enName: 'guangdong',
        cities: [
          { name: '广州', enName: 'guangzhou', fullName: '广州, 广东', coords: { lat: 23.1291, lng: 113.2644 } },
          { name: '深圳', enName: 'shenzhen', fullName: '深圳, 广东', coords: { lat: 22.5431, lng: 114.0579 } },
          { name: '珠海', enName: 'zhuhai', fullName: '珠海, 广东', coords: { lat: 22.2769, lng: 113.5678 } },
          { name: '佛山', enName: 'foshan', fullName: '佛山, 广东', coords: { lat: 23.0215, lng: 113.1214 } },
          { name: '汕头', enName: 'shantou', fullName: '汕头, 广东', coords: { lat: 23.3664, lng: 116.7119 } },
          { name: '顺德', enName: 'shunde', fullName: '顺德, 广东', coords: { lat: 22.8407, lng: 113.2872 } },
          { name: '惠州', enName: 'huizhou', fullName: '惠州, 广东', coords: { lat: 23.1118, lng: 114.4162 } },
        ]
      },
      {
        name: '海南',
        enName: 'hainan',
        cities: [
          { name: '三亚', enName: 'sanya', fullName: '三亚, 海南', coords: { lat: 18.2528, lng: 109.5120 } },
          { name: '海口', enName: 'haikou', fullName: '海口, 海南', coords: { lat: 20.0440, lng: 110.1999 } },
          { name: '万宁', enName: 'wanning', fullName: '万宁, 海南', coords: { lat: 18.7953, lng: 110.3888 } },
          { name: '文昌', enName: 'wenchang', fullName: '文昌, 海南', coords: { lat: 19.6130, lng: 110.7539 } },
        ]
      },
      {
        name: '广西',
        enName: 'guangxi',
        cities: [
          { name: '桂林', enName: 'guilin', fullName: '桂林, 广西', coords: { lat: 25.2345, lng: 110.1800 } },
          { name: '阳朔', enName: 'yangshuo', fullName: '阳朔, 广西', coords: { lat: 24.7766, lng: 110.4908 } },
          { name: '北海', enName: 'beihai', fullName: '北海, 广西', coords: { lat: 21.4733, lng: 109.1197 } },
          { name: '南宁', enName: 'nanning', fullName: '南宁, 广西', coords: { lat: 22.8170, lng: 108.3665 } },
          { name: '柳州', enName: 'liuzhou', fullName: '柳州, 广西', coords: { lat: 24.3255, lng: 109.4126 } },
        ]
      }
    ]
  },
  {
    name: '西南地区',
    enName: 'southwest_china',
    provinces: [
      {
        name: '四川',
        enName: 'sichuan',
        cities: [
          { name: '成都', enName: 'chengdu', fullName: '成都, 四川', coords: { lat: 30.5728, lng: 104.0668 } },
          { name: '九寨沟', enName: 'jiuzhaigou', fullName: '九寨沟, 四川', coords: { lat: 33.2600, lng: 103.9180 } },
          { name: '稻城亚丁', enName: 'daocheng', fullName: '稻城亚丁, 四川', coords: { lat: 28.4276, lng: 100.2704 } },
          { name: '乐山', enName: 'leshan', fullName: '乐山, 四川', coords: { lat: 29.5521, lng: 103.7656 } },
          { name: '峨眉山', enName: 'emeishan', fullName: '峨眉山, 四川', coords: { lat: 29.5332, lng: 103.3653 } },
          { name: '色达', enName: 'seda', fullName: '色达, 四川', coords: { lat: 32.2680, lng: 100.2312 } },
          { name: '都江堰', enName: 'dujiangyan', fullName: '都江堰, 四川', coords: { lat: 30.9912, lng: 103.6267 } },
        ]
      },
      {
        name: '重庆',
        enName: 'chongqing',
        cities: [
          { name: '重庆', enName: 'chongqing', fullName: '重庆市', coords: { lat: 29.5630, lng: 106.5516 } },
          { name: '武隆', enName: 'wulong', fullName: '武隆, 重庆', coords: { lat: 29.3242, lng: 107.7592 } },
        ]
      },
      {
        name: '云南',
        enName: 'yunnan',
        cities: [
          { name: '昆明', enName: 'kunming', fullName: '昆明, 云南', coords: { lat: 25.0455, lng: 102.7088 } },
          { name: '大理', enName: 'dali', fullName: '大理, 云南', coords: { lat: 25.6065, lng: 100.2676 } },
          { name: '丽江', enName: 'lijiang', fullName: '丽江, 云南', coords: { lat: 26.8721, lng: 100.2319 } },
          { name: '西双版纳', enName: 'xishuangbanna', fullName: '西双版纳, 云南', coords: { lat: 21.9753, lng: 100.7989 } },
          { name: '香格里拉', enName: 'shangrila', fullName: '香格里拉, 云南', coords: { lat: 27.8251, lng: 99.7083 } },
          { name: '泸沽湖', enName: 'luguhu', fullName: '泸沽湖, 云南', coords: { lat: 27.6974, lng: 100.7788 } },
          { name: '腾冲', enName: 'tengchong', fullName: '腾冲, 云南', coords: { lat: 25.0213, lng: 98.4908 } },
        ]
      },
      {
        name: '西藏',
        enName: 'tibet',
        cities: [
          { name: '拉萨', enName: 'lhasa', fullName: '拉萨, 西藏', coords: { lat: 29.6525, lng: 91.1721 } },
          { name: '林芝', enName: 'nyingchi', fullName: '林芝, 西藏', coords: { lat: 29.6469, lng: 94.3615 } },
          { name: '日喀则', enName: 'shigatse', fullName: '日喀则, 西藏', coords: { lat: 29.2662, lng: 88.8804 } },
        ]
      },
      {
        name: '贵州',
        enName: 'guizhou',
        cities: [
          { name: '贵阳', enName: 'guiyang', fullName: '贵阳, 贵州', coords: { lat: 26.6477, lng: 106.6301 } },
          { name: '千户苗寨', enName: 'miaozhai', fullName: '西江千户苗寨, 贵州', coords: { lat: 26.4950, lng: 108.1721 } },
          { name: '黄果树', enName: 'huangguoshu', fullName: '黄果树瀑布, 贵州', coords: { lat: 25.9904, lng: 105.6669 } },
          { name: '荔波', enName: 'libo', fullName: '荔波小七孔, 贵州', coords: { lat: 25.4124, lng: 107.8860 } },
        ]
      }
    ]
  },
  {
    name: '华北地区',
    enName: 'north_china',
    provinces: [
      {
        name: '北京',
        enName: 'beijing',
        cities: [
          { name: '北京', enName: 'beijing', fullName: '北京市', coords: { lat: 39.9042, lng: 116.4074 } },
        ]
      },
      {
        name: '天津',
        enName: 'tianjin',
        cities: [
          { name: '天津', enName: 'tianjin', fullName: '天津市', coords: { lat: 39.0851, lng: 117.1990 } },
        ]
      },
      {
        name: '河北',
        enName: 'hebei',
        cities: [
          { name: '秦皇岛', enName: 'qinhuangdao', fullName: '秦皇岛(北戴河), 河北', coords: { lat: 39.9354, lng: 119.6005 } },
          { name: '承德', enName: 'chengde', fullName: '承德(避暑山庄), 河北', coords: { lat: 40.9768, lng: 117.9627 } },
          { name: '石家庄', enName: 'shijiazhuang', fullName: '石家庄, 河北', coords: { lat: 38.0428, lng: 114.5149 } },
        ]
      },
      {
        name: '山西',
        enName: 'shanxi',
        cities: [
          { name: '太原', enName: 'taiyuan', fullName: '太原, 山西', coords: { lat: 37.8706, lng: 112.5489 } },
          { name: '大同', enName: 'datong', fullName: '大同(云冈石窟), 山西', coords: { lat: 40.0768, lng: 113.3001 } },
          { name: '平遥', enName: 'pingyao', fullName: '平遥古城, 山西', coords: { lat: 37.2023, lng: 112.1783 } },
        ]
      },
      {
        name: '内蒙古',
        enName: 'inner_mongolia',
        cities: [
          { name: '呼伦贝尔', enName: 'hulunbuir', fullName: '呼伦贝尔, 内蒙古', coords: { lat: 49.2016, lng: 119.7655 } },
          { name: '呼和浩特', enName: 'hohhot', fullName: '呼和浩特, 内蒙古', coords: { lat: 40.8415, lng: 111.7492 } },
          { name: '满洲里', enName: 'manzhouli', fullName: '满洲里, 内蒙古', coords: { lat: 49.5978, lng: 117.4556 } },
          { name: '额济纳', enName: 'ejina', fullName: '额济纳旗(胡杨林), 内蒙古', coords: { lat: 41.9587, lng: 101.0691 } },
        ]
      }
    ]
  },
  {
    name: '西北地区',
    enName: 'northwest_china',
    provinces: [
      {
        name: '陕西',
        enName: 'shaanxi',
        cities: [
          { name: '西安', enName: 'xian', fullName: '西安, 陕西', coords: { lat: 34.3416, lng: 108.9398 } },
          { name: '延安', enName: 'yanan', fullName: '延安, 陕西', coords: { lat: 36.5854, lng: 109.4897 } },
          { name: '华山', enName: 'huashan', fullName: '华山, 陕西', coords: { lat: 34.4925, lng: 110.0827 } },
        ]
      },
      {
        name: '甘肃',
        enName: 'gansu',
        cities: [
          { name: '兰州', enName: 'lanzhou', fullName: '兰州, 甘肃', coords: { lat: 36.0611, lng: 103.8343 } },
          { name: '敦煌', enName: 'dunhuang', fullName: '敦煌(莫高窟), 甘肃', coords: { lat: 40.1421, lng: 94.6620 } },
          { name: '张掖', enName: 'zhangye', fullName: '张掖(七彩丹霞), 甘肃', coords: { lat: 38.9259, lng: 100.4498 } },
          { name: '嘉峪关', enName: 'jiayuguan', fullName: '嘉峪关, 甘肃', coords: { lat: 39.7731, lng: 98.2894 } },
        ]
      },
      {
        name: '青海',
        enName: 'qinghai',
        cities: [
          { name: '西宁', enName: 'xining', fullName: '西宁, 青海', coords: { lat: 36.6171, lng: 101.7782 } },
          { name: '青海湖', enName: 'qinghai_lake', fullName: '青海湖, 青海', coords: { lat: 36.6974, lng: 100.4828 } },
          { name: '茶卡盐湖', enName: 'chaka', fullName: '茶卡盐湖, 青海', coords: { lat: 36.6833, lng: 99.0792 } },
        ]
      },
      {
        name: '新疆',
        enName: 'xinjiang',
        cities: [
          { name: '乌鲁木齐', enName: 'urumqi', fullName: '乌鲁木齐, 新疆', coords: { lat: 43.8256, lng: 87.6168 } },
          { name: '喀什', enName: 'kashi', fullName: '喀什, 新疆', coords: { lat: 39.4704, lng: 75.9898 } },
          { name: '阿勒泰', enName: 'aletai', fullName: '阿勒泰(禾木/喀纳斯), 新疆', coords: { lat: 47.8448, lng: 88.1396 } },
          { name: '伊犁', enName: 'yili', fullName: '伊犁, 新疆', coords: { lat: 43.9219, lng: 81.3093 } },
          { name: '吐鲁番', enName: 'turpan', fullName: '吐鲁番, 新疆', coords: { lat: 42.9476, lng: 89.1841 } },
        ]
      },
      {
        name: '宁夏',
        enName: 'ningxia',
        cities: [
          { name: '银川', enName: 'yinchuan', fullName: '银川, 宁夏', coords: { lat: 38.4872, lng: 106.2309 } },
          { name: '中卫', enName: 'zhongwei', fullName: '中卫(沙坡头), 宁夏', coords: { lat: 37.5140, lng: 105.1896 } },
        ]
      }
    ]
  },
  {
    name: '华中地区',
    enName: 'central_china',
    provinces: [
      {
        name: '湖北',
        enName: 'hubei',
        cities: [
          { name: '武汉', enName: 'wuhan', fullName: '武汉, 湖北', coords: { lat: 30.5928, lng: 114.3055 } },
          { name: '恩施', enName: 'enshi', fullName: '恩施, 湖北', coords: { lat: 30.2831, lng: 109.4870 } },
          { name: '宜昌', enName: 'yichang', fullName: '宜昌(三峡), 湖北', coords: { lat: 30.6920, lng: 111.2865 } },
        ]
      },
      {
        name: '湖南',
        enName: 'hunan',
        cities: [
          { name: '长沙', enName: 'changsha', fullName: '长沙, 湖南', coords: { lat: 28.2282, lng: 112.9388 } },
          { name: '张家界', enName: 'zhangjiajie', fullName: '张家界, 湖南', coords: { lat: 29.1170, lng: 110.4789 } },
          { name: '凤凰古城', enName: 'fenghuang', fullName: '凤凰古城, 湖南', coords: { lat: 27.9482, lng: 109.5983 } },
          { name: '岳阳', enName: 'yueyang', fullName: '岳阳, 湖南', coords: { lat: 29.3567, lng: 113.1290 } },
        ]
      },
      {
        name: '河南',
        enName: 'henan',
        cities: [
          { name: '郑州', enName: 'zhengzhou', fullName: '郑州, 河南', coords: { lat: 34.7466, lng: 113.6253 } },
          { name: '洛阳', enName: 'luoyang', fullName: '洛阳(龙门石窟), 河南', coords: { lat: 34.6181, lng: 112.4540 } },
          { name: '开封', enName: 'kaifeng', fullName: '开封, 河南', coords: { lat: 34.7972, lng: 114.3076 } },
          { name: '少林寺', enName: 'shaolin', fullName: '登封(少林寺), 河南', coords: { lat: 34.5024, lng: 112.9325 } },
        ]
      }
    ]
  },
  {
    name: '东北地区',
    enName: 'northeast_china',
    provinces: [
      {
        name: '黑龙江',
        enName: 'heilongjiang',
        cities: [
          { name: '哈尔滨', enName: 'harbin', fullName: '哈尔滨, 黑龙江', coords: { lat: 45.8038, lng: 126.5349 } },
          { name: '漠河', enName: 'mohe', fullName: '漠河(北极村), 黑龙江', coords: { lat: 53.4732, lng: 122.3582 } },
          { name: '雪乡', enName: 'xuexiang', fullName: '中国雪乡, 黑龙江', coords: { lat: 44.5367, lng: 128.8576 } },
        ]
      },
      {
        name: '吉林',
        enName: 'jilin',
        cities: [
          { name: '长春', enName: 'changchun', fullName: '长春, 吉林', coords: { lat: 43.8171, lng: 125.3235 } },
          { name: '长白山', enName: 'changbaishan', fullName: '长白山, 吉林', coords: { lat: 42.0440, lng: 128.0587 } },
          { name: '延吉', enName: 'yanji', fullName: '延吉, 吉林', coords: { lat: 42.9068, lng: 129.5076 } },
        ]
      },
      {
        name: '辽宁',
        enName: 'liaoning',
        cities: [
          { name: '沈阳', enName: 'shenyang', fullName: '沈阳, 辽宁', coords: { lat: 41.8057, lng: 123.4315 } },
          { name: '大连', enName: 'dalian', fullName: '大连, 辽宁', coords: { lat: 38.9140, lng: 121.6147 } },
          { name: '丹东', enName: 'dandong', fullName: '丹东, 辽宁', coords: { lat: 40.0001, lng: 124.3541 } },
        ]
      }
    ]
  },
  {
    name: '港澳台',
    enName: 'hmt',
    provinces: [
      {
        name: '香港',
        enName: 'hongkong',
        cities: [
          { name: '香港', enName: 'hongkong', fullName: '中国香港', coords: { lat: 22.3193, lng: 114.1694 } },
        ]
      },
      {
        name: '澳门',
        enName: 'macau',
        cities: [
          { name: '澳门', enName: 'macau', fullName: '中国澳门', coords: { lat: 22.1987, lng: 113.5439 } },
        ]
      },
      {
        name: '台湾',
        enName: 'taiwan',
        cities: [
          { name: '台北', enName: 'taipei', fullName: '台北, 台湾', coords: { lat: 25.0330, lng: 121.5654 } },
          { name: '高雄', enName: 'kaohsiung', fullName: '高雄, 台湾', coords: { lat: 22.6273, lng: 120.3014 } },
          { name: '花莲', enName: 'hualien', fullName: '花莲, 台湾', coords: { lat: 23.9872, lng: 121.6011 } },
          { name: '垦丁', enName: 'kenting', fullName: '垦丁, 台湾', coords: { lat: 21.9466, lng: 120.7966 } },
        ]
      }
    ]
  }
];