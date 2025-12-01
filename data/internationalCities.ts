// 国际城市数据
// 用于 DestinationPicker 组件的国际城市列表

import { DestinationItem } from './domesticCities';

export interface CountryNode {
  name: string;
  enName: string;
  cities: DestinationItem[];
}

export interface ContinentNode {
  name: string;
  enName: string;
  countries: CountryNode[];
}

export const INTERNATIONAL_DATA: ContinentNode[] = [
  {
    name: '亚洲',
    enName: 'asia',
    countries: [
      {
        name: '日本',
        enName: 'japan',
        cities: [
          { name: '东京', enName: 'tokyo', fullName: '东京, 日本', coords: { lat: 35.6762, lng: 139.6503 } },
          { name: '大阪', enName: 'osaka', fullName: '大阪, 日本', coords: { lat: 34.6937, lng: 135.5023 } },
          { name: '京都', enName: 'kyoto', fullName: '京都, 日本', coords: { lat: 35.0116, lng: 135.7681 } },
          { name: '北海道', enName: 'hokkaido', fullName: '北海道, 日本', coords: { lat: 43.2203, lng: 142.8635 } },
        ]
      },
      {
        name: '韩国',
        enName: 'korea',
        cities: [
          { name: '首尔', enName: 'seoul', fullName: '首尔, 韩国', coords: { lat: 37.5665, lng: 126.9780 } },
          { name: '釜山', enName: 'busan', fullName: '釜山, 韩国', coords: { lat: 35.1796, lng: 129.0756 } },
        ]
      },
      {
        name: '泰国',
        enName: 'thailand',
        cities: [
          { name: '曼谷', enName: 'bangkok', fullName: '曼谷, 泰国', coords: { lat: 13.7563, lng: 100.5018 } },
          { name: '清迈', enName: 'chiangmai', fullName: '清迈, 泰国', coords: { lat: 18.7883, lng: 98.9853 } },
          { name: '普吉岛', enName: 'phuket', fullName: '普吉岛, 泰国', coords: { lat: 7.8804, lng: 98.3923 } },
        ]
      },
      {
        name: '新加坡',
        enName: 'singapore',
        cities: [
          { name: '新加坡', enName: 'singapore', fullName: '新加坡', coords: { lat: 1.3521, lng: 103.8198 } },
        ]
      },
      {
        name: '印度尼西亚',
        enName: 'indonesia',
        cities: [
          { name: '巴厘岛', enName: 'bali', fullName: '巴厘岛, 印尼', coords: { lat: -8.4095, lng: 115.1889 } },
          { name: '雅加达', enName: 'jakarta', fullName: '雅加达, 印尼', coords: { lat: -6.2088, lng: 106.8456 } },
        ]
      }
    ]
  },
  {
    name: '欧洲',
    enName: 'europe',
    countries: [
      {
        name: '法国',
        enName: 'france',
        cities: [
          { name: '巴黎', enName: 'paris', fullName: '巴黎, 法国', coords: { lat: 48.8566, lng: 2.3522 } },
          { name: '尼斯', enName: 'nice', fullName: '尼斯, 法国', coords: { lat: 43.7102, lng: 7.2620 } },
        ]
      },
      {
        name: '英国',
        enName: 'uk',
        cities: [
          { name: '伦敦', enName: 'london', fullName: '伦敦, 英国', coords: { lat: 51.5074, lng: -0.1278 } },
          { name: '爱丁堡', enName: 'edinburgh', fullName: '爱丁堡, 英国', coords: { lat: 55.9533, lng: -3.1883 } },
        ]
      },
      {
        name: '意大利',
        enName: 'italy',
        cities: [
          { name: '罗马', enName: 'rome', fullName: '罗马, 意大利', coords: { lat: 41.9028, lng: 12.4964 } },
          { name: '威尼斯', enName: 'venice', fullName: '威尼斯, 意大利', coords: { lat: 45.4408, lng: 12.3155 } },
          { name: '佛罗伦萨', enName: 'florence', fullName: '佛罗伦萨, 意大利', coords: { lat: 43.7696, lng: 11.2558 } },
          { name: '米兰', enName: 'milan', fullName: '米兰, 意大利', coords: { lat: 45.4642, lng: 9.1900 } },
        ]
      },
      {
        name: '西班牙',
        enName: 'spain',
        cities: [
          { name: '巴塞罗那', enName: 'barcelona', fullName: '巴塞罗那, 西班牙', coords: { lat: 41.3851, lng: 2.1734 } },
          { name: '马德里', enName: 'madrid', fullName: '马德里, 西班牙', coords: { lat: 40.4168, lng: -3.7038 } },
        ]
      },
      {
        name: '德国',
        enName: 'germany',
        cities: [
          { name: '柏林', enName: 'berlin', fullName: '柏林, 德国', coords: { lat: 52.5200, lng: 13.4050 } },
          { name: '慕尼黑', enName: 'munich', fullName: '慕尼黑, 德国', coords: { lat: 48.1351, lng: 11.5820 } },
        ]
      },
      {
        name: '瑞士',
        enName: 'switzerland',
        cities: [
          { name: '苏黎世', enName: 'zurich', fullName: '苏黎世, 瑞士', coords: { lat: 47.3769, lng: 8.5417 } },
          { name: '日内瓦', enName: 'geneva', fullName: '日内瓦, 瑞士', coords: { lat: 46.2044, lng: 6.1432 } },
        ]
      },
      {
        name: '荷兰',
        enName: 'netherlands',
        cities: [
          { name: '阿姆斯特丹', enName: 'amsterdam', fullName: '阿姆斯特丹, 荷兰', coords: { lat: 52.3676, lng: 4.9041 } },
        ]
      }
    ]
  },
  {
    name: '北美洲',
    enName: 'north_america',
    countries: [
      {
        name: '美国',
        enName: 'usa',
        cities: [
          { name: '纽约', enName: 'newyork', fullName: '纽约, 美国', coords: { lat: 40.7128, lng: -74.0060 } },
          { name: '洛杉矶', enName: 'losangeles', fullName: '洛杉矶, 美国', coords: { lat: 34.0522, lng: -118.2437 } },
          { name: '旧金山', enName: 'sanfrancisco', fullName: '旧金山, 美国', coords: { lat: 37.7749, lng: -122.4194 } },
          { name: '拉斯维加斯', enName: 'lasvegas', fullName: '拉斯维加斯, 美国', coords: { lat: 36.1699, lng: -115.1398 } },
        ]
      },
      {
        name: '加拿大',
        enName: 'canada',
        cities: [
          { name: '多伦多', enName: 'toronto', fullName: '多伦多, 加拿大', coords: { lat: 43.6510, lng: -79.3470 } },
          { name: '温哥华', enName: 'vancouver', fullName: '温哥华, 加拿大', coords: { lat: 49.2827, lng: -123.1207 } },
        ]
      }
    ]
  },
  {
    name: '南美洲',
    enName: 'south_america',
    countries: [
      {
        name: '巴西',
        enName: 'brazil',
        cities: [
          { name: '里约热内卢', enName: 'rio_de_janeiro', fullName: '里约热内卢, 巴西', coords: { lat: -22.9068, lng: -43.1729 } },
          { name: '圣保罗', enName: 'sao_paulo', fullName: '圣保罗, 巴西', coords: { lat: -23.5505, lng: -46.6333 } },
        ]
      },
      {
        name: '阿根廷',
        enName: 'argentina',
        cities: [
          { name: '布宜诺斯艾利斯', enName: 'buenos_aires', fullName: '布宜诺斯艾利斯, 阿根廷', coords: { lat: -34.6037, lng: -58.3816 } },
        ]
      },
      {
        name: '秘鲁',
        enName: 'peru',
        cities: [
          { name: '利马', enName: 'lima', fullName: '利马, 秘鲁', coords: { lat: -12.0464, lng: -77.0428 } },
          { name: '库斯科', enName: 'cusco', fullName: '库斯科, 秘鲁', coords: { lat: -13.5319, lng: -71.9675 } },
        ]
      },
      {
        name: '智利',
        enName: 'chile',
        cities: [
          { name: '圣地亚哥', enName: 'santiago', fullName: '圣地亚哥, 智利', coords: { lat: -33.4489, lng: -70.6693 } },
        ]
      }
    ]
  },
  {
    name: '非洲',
    enName: 'africa',
    countries: [
      {
        name: '埃及',
        enName: 'egypt',
        cities: [
          { name: '开罗', enName: 'cairo', fullName: '开罗, 埃及', coords: { lat: 30.0444, lng: 31.2357 } },
        ]
      },
      {
        name: '南非',
        enName: 'south_africa',
        cities: [
          { name: '开普敦', enName: 'cape_town', fullName: '开普敦, 南非', coords: { lat: -33.9249, lng: 18.4241 } },
          { name: '约翰内斯堡', enName: 'johannesburg', fullName: '约翰内斯堡, 南非', coords: { lat: -26.2041, lng: 28.0473 } },
        ]
      },
      {
        name: '肯尼亚',
        enName: 'kenya',
        cities: [
          { name: '内罗毕', enName: 'nairobi', fullName: '内罗毕, 肯尼亚', coords: { lat: -1.2921, lng: 36.8219 } },
        ]
      },
      {
        name: '摩洛哥',
        enName: 'morocco',
        cities: [
          { name: '卡萨布兰卡', enName: 'casablanca', fullName: '卡萨布兰卡, 摩洛哥', coords: { lat: 33.5731, lng: -7.5898 } },
          { name: '马拉喀什', enName: 'marrakech', fullName: '马拉喀什, 摩洛哥', coords: { lat: 31.6295, lng: -7.9811 } },
        ]
      }
    ]
  },
  {
    name: '大洋洲',
    enName: 'oceania',
    countries: [
      {
        name: '澳大利亚',
        enName: 'australia',
        cities: [
          { name: '悉尼', enName: 'sydney', fullName: '悉尼, 澳大利亚', coords: { lat: -33.8688, lng: 151.2093 } },
          { name: '墨尔本', enName: 'melbourne', fullName: '墨尔本, 澳大利亚', coords: { lat: -37.8136, lng: 144.9631 } },
        ]
      },
      {
        name: '新西兰',
        enName: 'newzealand',
        cities: [
          { name: '奥克兰', enName: 'auckland', fullName: '奥克兰, 新西兰', coords: { lat: -36.8485, lng: 174.7633 } },
          { name: '皇后镇', enName: 'queenstown', fullName: '皇后镇, 新西兰', coords: { lat: -45.0312, lng: 168.6626 } },
        ]
      }
    ]
  },
  {
    name: '南极洲',
    enName: 'antarctica',
    countries: [
      {
        name: '南极地区',
        enName: 'antarctic_region',
        cities: [
          { name: '南极点', enName: 'south_pole', fullName: '南极点, 南极洲', coords: { lat: -90.0000, lng: 0.0000 } },
          { name: '长城站', enName: 'great_wall_station', fullName: '长城站, 乔治王岛', coords: { lat: -62.2177, lng: -58.9663 } },
          { name: '麦克默多站', enName: 'mcmurdo_station', fullName: '麦克默多站, 罗斯岛', coords: { lat: -77.8460, lng: 166.6681 } },
        ]
      }
    ]
  }
];