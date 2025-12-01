// 国内城市数据
// 用于 DestinationPicker 组件的国内城市列表

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface DestinationItem {
  name: string;
  enName: string; // 英文名字段用于图片
  fullName?: string;
  coords: Coordinate;
}

export const DOMESTIC_CITIES: DestinationItem[] = [
  // 热门一线
  { name: '北京', enName: 'beijing', coords: { lat: 39.9042, lng: 116.4074 } },
  { name: '上海', enName: 'shanghai', coords: { lat: 31.2304, lng: 121.4737 } },
  { name: '广州', enName: 'guangzhou', coords: { lat: 23.1291, lng: 113.2644 } },
  { name: '深圳', enName: 'shenzhen', coords: { lat: 22.5431, lng: 114.0579 } },
  { name: '天津', enName: 'tianjin', coords: { lat: 39.0851, lng: 117.1990 } },
  { name: '重庆', enName: 'chongqing', coords: { lat: 29.5630, lng: 106.5516 } },
  { name: '香港', enName: 'hongkong', coords: { lat: 22.3193, lng: 114.1694 } },
  { name: '澳门', enName: 'macau', coords: { lat: 22.1987, lng: 113.5439 } },
  
  // 西南风情
  { name: '成都', enName: 'chengdu', coords: { lat: 30.5728, lng: 104.0668 } },
  { name: '大理', enName: 'dali', coords: { lat: 25.6065, lng: 100.2676 } },
  { name: '丽江', enName: 'lijiang', coords: { lat: 26.8721, lng: 100.2319 } },
  { name: '昆明', enName: 'kunming', coords: { lat: 25.0455, lng: 102.7088 } },
  { name: '西双版纳', enName: 'xishuangbanna', coords: { lat: 21.9753, lng: 100.7989 } },
  { name: '九寨沟', enName: 'jiuzhaigou', coords: { lat: 33.2600, lng: 103.9180 } },
  { name: '稻城亚丁', enName: 'daocheng', coords: { lat: 28.4276, lng: 100.2704 } },
  { name: '拉萨', enName: 'lhasa', coords: { lat: 29.6525, lng: 91.1721 } },
  // 历史人文
  { name: '西安', enName: 'xian', coords: { lat: 34.3416, lng: 108.9398 } },
  { name: '南京', enName: 'nanjing', coords: { lat: 32.0603, lng: 118.7969 } },
  { name: '苏州', enName: 'suzhou', coords: { lat: 31.2989, lng: 120.5853 } },
  { name: '杭州', enName: 'hangzhou', coords: { lat: 30.2741, lng: 120.1551 } },
  { name: '敦煌', enName: 'dunhuang', coords: { lat: 40.1421, lng: 94.6620 } },
  
  // 海滨度假
  { name: '三亚', enName: 'sanya', coords: { lat: 18.2528, lng: 109.5120 } },
  { name: '厦门', enName: 'xiamen', coords: { lat: 24.4798, lng: 118.0894 } },
  { name: '大连', enName: 'dalian', coords: { lat: 38.9140, lng: 121.6147 } },
  { name: '威海', enName: 'weihai', coords: { lat: 37.5187, lng: 122.1195 } },
  { name: '北海', enName: 'beihai', coords: { lat: 21.4733, lng: 109.1197 } },
  { name: '珠海', enName: 'zhuhai', coords: { lat: 22.2769, lng: 113.5678 } },
  
  // 北国风光
  { name: '哈尔滨', enName: 'harbin', coords: { lat: 45.8038, lng: 126.5349 } },
  { name: '长春', enName: 'changchun', coords: { lat: 43.8171, lng: 125.3235 } },
  { name: '沈阳', enName: 'shenyang', coords: { lat: 41.8057, lng: 123.4315 } },
  { name: '长白山', enName: 'changbaishan', coords: { lat: 42.0440, lng: 128.0587 } },
  { name: '漠河', enName: 'mohe', coords: { lat: 53.4732, lng: 122.3582 } },
  { name: '呼伦贝尔', enName: 'hulunbuir', coords: { lat: 49.2016, lng: 119.7655 } },
  
  // 自然山水
  { name: '桂林', enName: 'guilin', coords: { lat: 25.2345, lng: 110.1800 } },
  { name: '张家界', enName: 'zhangjiajie', coords: { lat: 29.1170, lng: 110.4789 } },
  { name: '长沙', enName: 'changsha', coords: { lat: 28.2282, lng: 112.9388 } },
  { name: '武汉', enName: 'wuhan', coords: { lat: 30.5928, lng: 114.3055 } },
  
  // 西北风情
  { name: '乌鲁木齐', enName: 'urumqi', coords: { lat: 43.8256, lng: 87.6168 } },
  { name: '吐鲁番', enName: 'turpan', coords: { lat: 42.9476, lng: 89.1841 } },
  { name: '阿勒泰', enName: 'aletai', coords: { lat: 47.8448, lng: 88.1396 } },
  { name: '兰州', enName: 'lanzhou', coords: { lat: 36.0611, lng: 103.8343 } },
  { name: '西宁', enName: 'xining', coords: { lat: 36.6171, lng: 101.7782 } },
  
  // 中原地区
  { name: '济南', enName: 'jinan', coords: { lat: 36.6512, lng: 117.1201 } },
  { name: '南昌', enName: 'nanchang', coords: { lat: 28.6829, lng: 115.8579 } },
  
  // 华南地区
  { name: '南宁', enName: 'nanning', coords: { lat: 22.8170, lng: 108.3665 } },
];