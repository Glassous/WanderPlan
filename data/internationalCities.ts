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
          { name: '横滨', enName: 'yokohama', fullName: '横滨, 日本', coords: { lat: 35.4437, lng: 139.6380 } },
          { name: '名古屋', enName: 'nagoya', fullName: '名古屋, 日本', coords: { lat: 35.1815, lng: 136.9066 } },
          { name: '札幌', enName: 'sapporo', fullName: '札幌, 日本', coords: { lat: 43.0618, lng: 141.3545 } },
          { name: '神户', enName: 'kobe', fullName: '神户, 日本', coords: { lat: 34.6901, lng: 135.1955 } },
          { name: '福冈', enName: 'fukuoka', fullName: '福冈, 日本', coords: { lat: 33.5902, lng: 130.4017 } },
          { name: '川崎', enName: 'kawasaki', fullName: '川崎, 日本', coords: { lat: 35.5304, lng: 139.7030 } },
          { name: '广岛', enName: 'hiroshima', fullName: '广岛, 日本', coords: { lat: 34.3853, lng: 132.4553 } },
          { name: '仙台', enName: 'sendai', fullName: '仙台, 日本', coords: { lat: 38.2682, lng: 140.8694 } },
          { name: '北九州', enName: 'kitakyushu', fullName: '北九州, 日本', coords: { lat: 33.8833, lng: 130.8752 } },
          { name: '千叶', enName: 'chiba', fullName: '千叶, 日本', coords: { lat: 35.6074, lng: 140.1065 } },
          { name: '埼玉', enName: 'saitama', fullName: '埼玉, 日本', coords: { lat: 35.8617, lng: 139.6455 } },
          { name: '静冈', enName: 'shizuoka', fullName: '静冈, 日本', coords: { lat: 34.9756, lng: 138.3828 } },
          { name: '熊本', enName: 'kumamoto', fullName: '熊本, 日本', coords: { lat: 32.8031, lng: 130.7079 } },
          { name: '冈山', enName: 'okayama', fullName: '冈山, 日本', coords: { lat: 34.6551, lng: 133.9195 } },
          { name: '金泽', enName: 'kanazawa', fullName: '金泽, 日本', coords: { lat: 36.5613, lng: 136.6562 } },
          { name: '那霸', enName: 'naha', fullName: '那霸, 日本', coords: { lat: 26.2124, lng: 127.6809 } },
          { name: '长崎', enName: 'nagasaki', fullName: '长崎, 日本', coords: { lat: 32.7503, lng: 129.8779 } }
        ]
      },
      {
        name: '韩国',
        enName: 'korea',
        cities: [
          { name: '首尔', enName: 'seoul', fullName: '首尔, 韩国', coords: { lat: 37.5665, lng: 126.9780 } },
          { name: '釜山', enName: 'busan', fullName: '釜山, 韩国', coords: { lat: 35.1796, lng: 129.0756 } },
          { name: '仁川', enName: 'incheon', fullName: '仁川, 韩国', coords: { lat: 37.4563, lng: 126.7052 } },
          { name: '大邱', enName: 'daegu', fullName: '大邱, 韩国', coords: { lat: 35.8714, lng: 128.6014 } },
          { name: '大田', enName: 'daejeon', fullName: '大田, 韩国', coords: { lat: 36.3504, lng: 127.3845 } },
          { name: '光州', enName: 'gwangju', fullName: '光州, 韩国', coords: { lat: 35.1595, lng: 126.8526 } },
          { name: '水原', enName: 'suwon', fullName: '水原, 韩国', coords: { lat: 37.2636, lng: 127.0286 } },
          { name: '蔚山', enName: 'ulsan', fullName: '蔚山, 韩国', coords: { lat: 35.5384, lng: 129.3114 } },
          { name: '昌原', enName: 'changwon', fullName: '昌原, 韩国', coords: { lat: 35.2279, lng: 128.6811 } },
          { name: '高阳', enName: 'goyang', fullName: '高阳, 韩国', coords: { lat: 37.6584, lng: 126.8320 } },
          { name: '龙仁', enName: 'yongin', fullName: '龙仁, 韩国', coords: { lat: 37.2410, lng: 127.1775 } },
          { name: '城南', enName: 'seongnam', fullName: '城南, 韩国', coords: { lat: 37.4200, lng: 127.1265 } },
          { name: '富川', enName: 'bucheon', fullName: '富川, 韩国', coords: { lat: 37.5034, lng: 126.7660 } },
          { name: '清州', enName: 'cheongju', fullName: '清州, 韩国', coords: { lat: 36.6424, lng: 127.4890 } },
          { name: '安山', enName: 'ansan', fullName: '安山, 韩国', coords: { lat: 37.3219, lng: 126.8309 } },
          { name: '全州', enName: 'jeonju', fullName: '全州, 韩国', coords: { lat: 35.8242, lng: 127.1480 } },
          { name: '天安', enName: 'cheonan', fullName: '天安, 韩国', coords: { lat: 36.8151, lng: 127.1139 } },
          { name: '南杨州', enName: 'namyangju', fullName: '南杨州, 韩国', coords: { lat: 37.6360, lng: 127.2165 } },
          { name: '华城', enName: 'hwaseong', fullName: '华城, 韩国', coords: { lat: 37.1995, lng: 126.8315 } },
          { name: '济州岛', enName: 'jeju', fullName: '济州岛, 韩国', coords: { lat: 33.4996, lng: 126.5312 } }
        ]
      },
      {
        name: '印度',
        enName: 'india',
        cities: [
          { name: '新德里', enName: 'new_delhi', fullName: '新德里, 印度', coords: { lat: 28.6139, lng: 77.2090 } },
          { name: '孟买', enName: 'mumbai', fullName: '孟买, 印度', coords: { lat: 19.0760, lng: 72.8777 } },
          { name: '班加罗尔', enName: 'bangalore', fullName: '班加罗尔, 印度', coords: { lat: 12.9716, lng: 77.5946 } },
          { name: '海得拉巴', enName: 'hyderabad', fullName: '海得拉巴, 印度', coords: { lat: 17.3850, lng: 78.4867 } },
          { name: '钦奈', enName: 'chennai', fullName: '钦奈, 印度', coords: { lat: 13.0827, lng: 80.2707 } },
          { name: '加尔各答', enName: 'kolkata', fullName: '加尔各答, 印度', coords: { lat: 22.5726, lng: 88.3639 } },
          { name: '浦那', enName: 'pune', fullName: '浦那, 印度', coords: { lat: 18.5204, lng: 73.8567 } },
          { name: '阿艾哈迈达巴德', enName: 'ahmedabad', fullName: '阿艾哈迈达巴德, 印度', coords: { lat: 23.0225, lng: 72.5714 } },
          { name: '斋浦尔', enName: 'jaipur', fullName: '斋浦尔, 印度', coords: { lat: 26.9124, lng: 75.7873 } },
          { name: '苏拉特', enName: 'surat', fullName: '苏拉特, 印度', coords: { lat: 21.1702, lng: 72.8311 } },
          { name: '勒克瑙', enName: 'lucknow', fullName: '勒克瑙, 印度', coords: { lat: 26.8467, lng: 80.9462 } },
          { name: '坎普尔', enName: 'kanpur', fullName: '坎普尔, 印度', coords: { lat: 26.4499, lng: 80.3319 } },
          { name: '那格浦尔', enName: 'nagpur', fullName: '那格浦尔, 印度', coords: { lat: 21.1458, lng: 79.0882 } },
          { name: '印多尔', enName: 'indore', fullName: '印多尔, 印度', coords: { lat: 22.7196, lng: 75.8577 } },
          { name: '博帕尔', enName: 'bhopal', fullName: '博帕尔, 印度', coords: { lat: 23.2599, lng: 77.4126 } },
          { name: '巴特那', enName: 'patna', fullName: '巴特那, 印度', coords: { lat: 25.5941, lng: 85.1376 } },
          { name: '瓦多达拉', enName: 'vadodara', fullName: '瓦多达拉, 印度', coords: { lat: 22.3072, lng: 73.1812 } },
          { name: '阿格拉', enName: 'agra', fullName: '阿格拉, 印度', coords: { lat: 27.1767, lng: 78.0081 } },
          { name: '纳西克', enName: 'nashik', fullName: '纳西克, 印度', coords: { lat: 19.9975, lng: 73.7898 } },
          { name: '瓦拉纳西', enName: 'varanasi', fullName: '瓦拉纳西, 印度', coords: { lat: 25.3176, lng: 82.9739 } }
        ]
      },
      {
        name: '泰国',
        enName: 'thailand',
        cities: [
          { name: '曼谷', enName: 'bangkok', fullName: '曼谷, 泰国', coords: { lat: 13.7563, lng: 100.5018 } },
          { name: '清迈', enName: 'chiangmai', fullName: '清迈, 泰国', coords: { lat: 18.7883, lng: 98.9853 } },
          { name: '普吉岛', enName: 'phuket', fullName: '普吉岛, 泰国', coords: { lat: 7.8804, lng: 98.3923 } },
          { name: '芭堤雅', enName: 'pattaya', fullName: '芭堤雅, 泰国', coords: { lat: 12.9236, lng: 100.8824 } },
          { name: '苏梅岛', enName: 'samui', fullName: '苏梅岛, 泰国', coords: { lat: 9.5120, lng: 100.0136 } },
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
          { name: '雅加达', enName: 'jakarta', fullName: '雅加达, 印尼', coords: { lat: -6.2088, lng: 106.8456 } },
          { name: '巴厘岛', enName: 'bali', fullName: '巴厘岛, 印尼', coords: { lat: -8.4095, lng: 115.1889 } },
          { name: '泗水', enName: 'surabaya', fullName: '泗水, 印尼', coords: { lat: -7.2575, lng: 112.7521 } },
          { name: '万隆', enName: 'bandung', fullName: '万隆, 印尼', coords: { lat: -6.9175, lng: 107.6191 } },
          { name: '棉兰', enName: 'medan', fullName: '棉兰, 印尼', coords: { lat: 3.5952, lng: 98.6722 } },
        ]
      },
      {
        name: '越南',
        enName: 'vietnam',
        cities: [
          { name: '河内', enName: 'hanoi', fullName: '河内, 越南', coords: { lat: 21.0285, lng: 105.8542 } },
          { name: '胡志明市', enName: 'ho_chi_minh', fullName: '胡志明市, 越南', coords: { lat: 10.8231, lng: 106.6297 } },
          { name: '岘港', enName: 'da_nang', fullName: '岘港, 越南', coords: { lat: 16.0544, lng: 108.2022 } },
          { name: '芽庄', enName: 'nha_trang', fullName: '芽庄, 越南', coords: { lat: 12.2388, lng: 109.1967 } },
          { name: '海防', enName: 'hai_phong', fullName: '海防, 越南', coords: { lat: 20.8449, lng: 106.6881 } },
        ]
      },
      {
        name: '马来西亚',
        enName: 'malaysia',
        cities: [
          { name: '吉隆坡', enName: 'kuala_lumpur', fullName: '吉隆坡, 马来西亚', coords: { lat: 3.1390, lng: 101.6869 } },
          { name: '槟城', enName: 'penang', fullName: '槟城, 马来西亚', coords: { lat: 5.4141, lng: 100.3288 } },
          { name: '新山', enName: 'johor_bahru', fullName: '新山, 马来西亚', coords: { lat: 1.4927, lng: 103.7414 } },
          { name: '亚庇', enName: 'kota_kinabalu', fullName: '亚庇, 马来西亚', coords: { lat: 5.9804, lng: 116.0753 } },
        ]
      },
      {
        name: '菲律宾',
        enName: 'philippines',
        cities: [
          { name: '马尼拉', enName: 'manila', fullName: '马尼拉, 菲律宾', coords: { lat: 14.5995, lng: 120.9842 } },
          { name: '宿务', enName: 'cebu', fullName: '宿务, 菲律宾', coords: { lat: 10.3157, lng: 123.8854 } },
          { name: '达沃', enName: 'davao', fullName: '达沃, 菲律宾', coords: { lat: 7.1907, lng: 125.4553 } },
        ]
      },
      {
        name: '土耳其',
        enName: 'turkey',
        cities: [
          { name: '伊斯坦布尔', enName: 'istanbul', fullName: '伊斯坦布尔, 土耳其', coords: { lat: 41.0082, lng: 28.9784 } },
          { name: '安卡拉', enName: 'ankara', fullName: '安卡拉, 土耳其', coords: { lat: 39.9334, lng: 32.8597 } },
          { name: '伊兹密尔', enName: 'izmir', fullName: '伊兹密尔, 土耳其', coords: { lat: 38.4237, lng: 27.1428 } },
          { name: '安塔利亚', enName: 'antalya', fullName: '安塔利亚, 土耳其', coords: { lat: 36.8969, lng: 30.7133 } },
        ]
      },
      {
        name: '沙特阿拉伯',
        enName: 'saudi_arabia',
        cities: [
          { name: '利雅得', enName: 'riyadh', fullName: '利雅得, 沙特', coords: { lat: 24.7136, lng: 46.6753 } },
          { name: '吉达', enName: 'jeddah', fullName: '吉达, 沙特', coords: { lat: 21.4858, lng: 39.1925 } },
          { name: '麦加', enName: 'mecca', fullName: '麦加, 沙特', coords: { lat: 21.3891, lng: 39.8579 } },
        ]
      },
      {
        name: '阿联酋',
        enName: 'uae',
        cities: [
          { name: '迪拜', enName: 'dubai', fullName: '迪拜, 阿联酋', coords: { lat: 25.2048, lng: 55.2708 } },
          { name: '阿布扎比', enName: 'abu_dhabi', fullName: '阿布扎比, 阿联酋', coords: { lat: 24.4539, lng: 54.3773 } },
        ]
      },
      {
        name: '马尔代夫',
        enName: 'maldives',
        cities: [
          { name: '马累', enName: 'male', fullName: '马累, 马尔代夫', coords: { lat: 4.1755, lng: 73.5093 } },
        ]
      },
      {
        name: '斯里兰卡',
        enName: 'sri_lanka',
        cities: [
          { name: '科伦坡', enName: 'colombo', fullName: '科伦坡, 斯里兰卡', coords: { lat: 6.9271, lng: 79.8612 } },
          { name: '康提', enName: 'kandy', fullName: '康提, 斯里兰卡', coords: { lat: 7.2906, lng: 80.6337 } },
        ]
      },
      {
        name: '尼泊尔',
        enName: 'nepal',
        cities: [
          { name: '加德满都', enName: 'kathmandu', fullName: '加德满都, 尼泊尔', coords: { lat: 27.7172, lng: 85.3240 } },
          { name: '博卡拉', enName: 'pokhara', fullName: '博卡拉, 尼泊尔', coords: { lat: 28.2096, lng: 83.9856 } },
        ]
      },
      {
        name: '柬埔寨',
        enName: 'cambodia',
        cities: [
          { name: '金边', enName: 'phnom_penh', fullName: '金边, 柬埔寨', coords: { lat: 11.5564, lng: 104.9282 } },
          { name: '暹粒', enName: 'siem_reap', fullName: '暹粒, 柬埔寨', coords: { lat: 13.3633, lng: 103.8564 } },
        ]
      },
      {
        name: '缅甸',
        enName: 'myanmar',
        cities: [
          { name: '仰光', enName: 'yangon', fullName: '仰光, 缅甸', coords: { lat: 16.8409, lng: 96.1735 } },
          { name: '曼德勒', enName: 'mandalay', fullName: '曼德勒, 缅甸', coords: { lat: 21.9588, lng: 96.0891 } },
        ]
      },
      {
        name: '老挝',
        enName: 'laos',
        cities: [
          { name: '万象', enName: 'vientiane', fullName: '万象, 老挝', coords: { lat: 17.9757, lng: 102.6331 } },
          { name: '琅勃拉邦', enName: 'luang_prabang', fullName: '琅勃拉邦, 老挝', coords: { lat: 19.8893, lng: 102.1313 } },
        ]
      },
      {
        name: '卡塔尔',
        enName: 'qatar',
        cities: [
          { name: '多哈', enName: 'doha', fullName: '多哈, 卡塔尔', coords: { lat: 25.2854, lng: 51.5310 } },
        ]
      },
      {
        name: '科威特',
        enName: 'kuwait',
        cities: [
          { name: '科威特城', enName: 'kuwait_city', fullName: '科威特城, 科威特', coords: { lat: 29.3759, lng: 47.9774 } },
        ]
      },
      {
        name: '蒙古',
        enName: 'mongolia',
        cities: [
          { name: '乌兰巴托', enName: 'ulaanbaatar', fullName: '乌兰巴托, 蒙古', coords: { lat: 47.8864, lng: 106.9057 } },
        ]
      },
      {
        name: '哈萨克斯坦',
        enName: 'kazakhstan',
        cities: [
          { name: '阿拉木图', enName: 'almaty', fullName: '阿拉木图, 哈萨克斯坦', coords: { lat: 43.2220, lng: 76.8512 } },
          { name: '阿斯塔纳', enName: 'astana', fullName: '阿斯塔纳, 哈萨克斯坦', coords: { lat: 51.1694, lng: 71.4491 } },
        ]
      },
      {
        name: '乌兹别克斯坦',
        enName: 'uzbekistan',
        cities: [
          { name: '塔什干', enName: 'tashkent', fullName: '塔什干, 乌兹别克斯坦', coords: { lat: 41.2995, lng: 69.2401 } },
          { name: '撒马尔罕', enName: 'samarkand', fullName: '撒马尔罕, 乌兹别克斯坦', coords: { lat: 39.6270, lng: 66.9749 } },
        ]
      },
      {
        name: '约旦',
        enName: 'jordan',
        cities: [
          { name: '安曼', enName: 'amman', fullName: '安曼, 约旦', coords: { lat: 31.9454, lng: 35.9284 } },
          { name: '佩特拉', enName: 'petra', fullName: '佩特拉, 约旦', coords: { lat: 30.3285, lng: 35.4444 } },
        ]
      },
      {
        name: '格鲁吉亚',
        enName: 'georgia',
        cities: [
          { name: '第比利斯', enName: 'tbilisi', fullName: '第比利斯, 格鲁吉亚', coords: { lat: 41.7151, lng: 44.8271 } },
          { name: '巴统', enName: 'batumi', fullName: '巴统, 格鲁吉亚', coords: { lat: 41.6168, lng: 41.6367 } },
        ]
      },
      {
        name: '文莱',
        enName: 'brunei',
        cities: [
          { name: '斯里巴加湾市', enName: 'bandar_seri_begawan', fullName: '斯里巴加湾市, 文莱', coords: { lat: 4.9031, lng: 114.9398 } },
        ]
      }
    ]
  },
  {
    name: '欧洲',
    enName: 'europe',
    countries: [
      {
        name: '英国',
        enName: 'uk',
        cities: [
          { name: '伦敦', enName: 'london', fullName: '伦敦, 英国', coords: { lat: 51.5074, lng: -0.1278 } },
          { name: '曼彻斯特', enName: 'manchester', fullName: '曼彻斯特, 英国', coords: { lat: 53.4808, lng: -2.2426 } },
          { name: '伯明翰', enName: 'birmingham', fullName: '伯明翰, 英国', coords: { lat: 52.4862, lng: -1.8904 } },
          { name: '爱丁堡', enName: 'edinburgh', fullName: '爱丁堡, 英国', coords: { lat: 55.9533, lng: -3.1883 } },
          { name: '格拉斯哥', enName: 'glasgow', fullName: '格拉斯哥, 英国', coords: { lat: 55.8642, lng: -4.2518 } },
          { name: '利物浦', enName: 'liverpool', fullName: '利物浦, 英国', coords: { lat: 53.4084, lng: -2.9916 } },
          { name: '利兹', enName: 'leeds', fullName: '利兹, 英国', coords: { lat: 53.8008, lng: -1.5491 } },
          { name: '布里斯托', enName: 'bristol', fullName: '布里斯托, 英国', coords: { lat: 51.4545, lng: -2.5879 } },
          { name: '剑桥', enName: 'cambridge', fullName: '剑桥, 英国', coords: { lat: 52.2053, lng: 0.1218 } },
          { name: '牛津', enName: 'oxford', fullName: '牛津, 英国', coords: { lat: 51.7520, lng: -1.2577 } },
          { name: '卡迪夫', enName: 'cardiff', fullName: '卡迪夫, 英国', coords: { lat: 51.4816, lng: -3.1791 } },
          { name: '贝尔法斯特', enName: 'belfast', fullName: '贝尔法斯特, 英国', coords: { lat: 54.5973, lng: -5.9301 } },
          { name: '纽卡斯尔', enName: 'newcastle', fullName: '纽卡斯尔, 英国', coords: { lat: 54.9783, lng: -1.6178 } },
          { name: '诺丁汉', enName: 'nottingham', fullName: '诺丁汉, 英国', coords: { lat: 52.9548, lng: -1.1581 } },
          { name: '谢菲尔德', enName: 'sheffield', fullName: '谢菲尔德, 英国', coords: { lat: 53.3811, lng: -1.4701 } },
        ]
      },
      {
        name: '法国',
        enName: 'france',
        cities: [
          { name: '巴黎', enName: 'paris', fullName: '巴黎, 法国', coords: { lat: 48.8566, lng: 2.3522 } },
          { name: '马赛', enName: 'marseille', fullName: '马赛, 法国', coords: { lat: 43.2965, lng: 5.3698 } },
          { name: '里昂', enName: 'lyon', fullName: '里昂, 法国', coords: { lat: 45.7640, lng: 4.8357 } },
          { name: '图卢兹', enName: 'toulouse', fullName: '图卢兹, 法国', coords: { lat: 43.6047, lng: 1.4442 } },
          { name: '尼斯', enName: 'nice', fullName: '尼斯, 法国', coords: { lat: 43.7102, lng: 7.2620 } },
          { name: '南特', enName: 'nantes', fullName: '南特, 法国', coords: { lat: 47.2184, lng: -1.5536 } },
          { name: '斯特拉斯堡', enName: 'strasbourg', fullName: '斯特拉斯堡, 法国', coords: { lat: 48.5734, lng: 7.7521 } },
          { name: '蒙彼利埃', enName: 'montpellier', fullName: '蒙彼利埃, 法国', coords: { lat: 43.6108, lng: 3.8767 } },
          { name: '波尔多', enName: 'bordeaux', fullName: '波尔多, 法国', coords: { lat: 44.8378, lng: -0.5792 } },
          { name: '里尔', enName: 'lille', fullName: '里尔, 法国', coords: { lat: 50.6292, lng: 3.0573 } },
          { name: '雷恩', enName: 'rennes', fullName: '雷恩, 法国', coords: { lat: 48.1173, lng: -1.6778 } },
          { name: '兰斯', enName: 'reims', fullName: '兰斯, 法国', coords: { lat: 49.2583, lng: 4.0317 } },
          { name: '勒阿弗尔', enName: 'le_havre', fullName: '勒阿弗尔, 法国', coords: { lat: 49.4944, lng: 0.1079 } },
          { name: '圣艾蒂安', enName: 'saint_etienne', fullName: '圣艾蒂安, 法国', coords: { lat: 45.4397, lng: 4.3872 } },
          { name: '土伦', enName: 'toulon', fullName: '土伦, 法国', coords: { lat: 43.1242, lng: 5.9280 } },
        ]
      },
      {
        name: '德国',
        enName: 'germany',
        cities: [
          { name: '柏林', enName: 'berlin', fullName: '柏林, 德国', coords: { lat: 52.5200, lng: 13.4050 } },
          { name: '慕尼黑', enName: 'munich', fullName: '慕尼黑, 德国', coords: { lat: 48.1351, lng: 11.5820 } },
          { name: '汉堡', enName: 'hamburg', fullName: '汉堡, 德国', coords: { lat: 53.5511, lng: 9.9937 } },
          { name: '法兰克福', enName: 'frankfurt', fullName: '法兰克福, 德国', coords: { lat: 50.1109, lng: 8.6821 } },
          { name: '科隆', enName: 'cologne', fullName: '科隆, 德国', coords: { lat: 50.9375, lng: 6.9603 } },
          { name: '斯图加特', enName: 'stuttgart', fullName: '斯图加特, 德国', coords: { lat: 48.7758, lng: 9.1829 } },
          { name: '杜塞尔多夫', enName: 'dusseldorf', fullName: '杜塞尔多夫, 德国', coords: { lat: 51.2277, lng: 6.7735 } },
          { name: '多特蒙德', enName: 'dortmund', fullName: '多特蒙德, 德国', coords: { lat: 51.5136, lng: 7.4653 } },
          { name: '埃森', enName: 'essen', fullName: '埃森, 德国', coords: { lat: 51.4556, lng: 7.0116 } },
          { name: '莱比锡', enName: 'leipzig', fullName: '莱比锡, 德国', coords: { lat: 51.3397, lng: 12.3731 } },
          { name: '不来梅', enName: 'bremen', fullName: '不来梅, 德国', coords: { lat: 53.0793, lng: 8.8017 } },
          { name: '德累斯顿', enName: 'dresden', fullName: '德累斯顿, 德国', coords: { lat: 51.0504, lng: 13.7373 } },
          { name: '汉诺威', enName: 'hanover', fullName: '汉诺威, 德国', coords: { lat: 52.3759, lng: 9.7320 } },
          { name: '纽伦堡', enName: 'nuremberg', fullName: '纽伦堡, 德国', coords: { lat: 49.4520, lng: 11.0767 } },
          { name: '杜伊斯堡', enName: 'duisburg', fullName: '杜伊斯堡, 德国', coords: { lat: 51.4344, lng: 6.7623 } },
        ]
      },
      {
        name: '意大利',
        enName: 'italy',
        cities: [
          { name: '罗马', enName: 'rome', fullName: '罗马, 意大利', coords: { lat: 41.9028, lng: 12.4964 } },
          { name: '米兰', enName: 'milan', fullName: '米兰, 意大利', coords: { lat: 45.4642, lng: 9.1900 } },
          { name: '那不勒斯', enName: 'naples', fullName: '那不勒斯, 意大利', coords: { lat: 40.8518, lng: 14.2681 } },
          { name: '都灵', enName: 'turin', fullName: '都灵, 意大利', coords: { lat: 45.0703, lng: 7.6869 } },
          { name: '巴勒莫', enName: 'palermo', fullName: '巴勒莫, 意大利', coords: { lat: 38.1157, lng: 13.3615 } },
          { name: '热那亚', enName: 'genoa', fullName: '热那亚, 意大利', coords: { lat: 44.4056, lng: 8.9463 } },
          { name: '博洛尼亚', enName: 'bologna', fullName: '博洛尼亚, 意大利', coords: { lat: 44.4949, lng: 11.3426 } },
          { name: '佛罗伦萨', enName: 'florence', fullName: '佛罗伦萨, 意大利', coords: { lat: 43.7696, lng: 11.2558 } },
          { name: '威尼斯', enName: 'venice', fullName: '威尼斯, 意大利', coords: { lat: 45.4408, lng: 12.3155 } },
          { name: '维罗纳', enName: 'verona', fullName: '维罗纳, 意大利', coords: { lat: 45.4384, lng: 10.9916 } },
          { name: '巴里', enName: 'bari', fullName: '巴里, 意大利', coords: { lat: 41.1171, lng: 16.8719 } },
          { name: '卡塔尼亚', enName: 'catania', fullName: '卡塔尼亚, 意大利', coords: { lat: 37.5079, lng: 15.0830 } },
          { name: '帕多瓦', enName: 'padua', fullName: '帕多瓦, 意大利', coords: { lat: 45.4064, lng: 11.8768 } },
          { name: '的里雅斯特', enName: 'trieste', fullName: '的里雅斯特, 意大利', coords: { lat: 45.6495, lng: 13.7768 } },
          { name: '布雷西亚', enName: 'brescia', fullName: '布雷西亚, 意大利', coords: { lat: 45.5416, lng: 10.2118 } },
        ]
      },
      {
        name: '西班牙',
        enName: 'spain',
        cities: [
          { name: '马德里', enName: 'madrid', fullName: '马德里, 西班牙', coords: { lat: 40.4168, lng: -3.7038 } },
          { name: '巴塞罗那', enName: 'barcelona', fullName: '巴塞罗那, 西班牙', coords: { lat: 41.3851, lng: 2.1734 } },
          { name: '瓦伦西亚', enName: 'valencia', fullName: '瓦伦西亚, 西班牙', coords: { lat: 39.4699, lng: -0.3763 } },
          { name: '塞维利亚', enName: 'seville', fullName: '塞维利亚, 西班牙', coords: { lat: 37.3891, lng: -5.9845 } },
          { name: '萨拉戈萨', enName: 'zaragoza', fullName: '萨拉戈萨, 西班牙', coords: { lat: 41.6488, lng: -0.8891 } },
          { name: '马拉加', enName: 'malaga', fullName: '马拉加, 西班牙', coords: { lat: 36.7212, lng: -4.4217 } },
          { name: '穆尔西亚', enName: 'murcia', fullName: '穆尔西亚, 西班牙', coords: { lat: 37.9922, lng: -1.1307 } },
          { name: '帕尔马', enName: 'palma', fullName: '帕尔马, 西班牙', coords: { lat: 39.5696, lng: 2.6502 } },
          { name: '拉斯帕尔马斯', enName: 'las_palmas', fullName: '拉斯帕尔马斯, 西班牙', coords: { lat: 28.1235, lng: -15.4363 } },
          { name: '毕尔巴鄂', enName: 'bilbao', fullName: '毕尔巴鄂, 西班牙', coords: { lat: 43.2630, lng: -2.9350 } },
        ]
      },
      {
        name: '冰岛',
        enName: 'iceland',
        cities: [
          { name: '雷克雅未克', enName: 'reykjavik', fullName: '雷克雅未克, 冰岛', coords: { lat: 64.1466, lng: -21.9426 } },
        ]
      },
      {
        name: '塞尔维亚',
        enName: 'serbia',
        cities: [
          { name: '贝尔格莱德', enName: 'belgrade', fullName: '贝尔格莱德, 塞尔维亚', coords: { lat: 44.7866, lng: 20.4489 } },
          { name: '诺维萨德', enName: 'novi_sad', fullName: '诺维萨德, 塞尔维亚', coords: { lat: 45.2671, lng: 19.8335 } },
        ]
      },
      {
        name: '克罗地亚',
        enName: 'croatia',
        cities: [
          { name: '萨格勒布', enName: 'zagreb', fullName: '萨格勒布, 克罗地亚', coords: { lat: 45.8150, lng: 15.9819 } },
          { name: '杜布罗夫尼克', enName: 'dubrovnik', fullName: '杜布罗夫尼克, 克罗地亚', coords: { lat: 42.6507, lng: 18.0944 } },
        ]
      },
      {
        name: '摩纳哥',
        enName: 'monaco',
        cities: [
          { name: '摩纳哥城', enName: 'monaco_city', fullName: '摩纳哥城, 摩纳哥', coords: { lat: 43.7384, lng: 7.4246 } },
        ]
      },
      {
        name: '荷兰',
        enName: 'netherlands',
        cities: [
          { name: '阿姆斯特丹', enName: 'amsterdam', fullName: '阿姆斯特丹, 荷兰', coords: { lat: 52.3676, lng: 4.9041 } },
          { name: '鹿特丹', enName: 'rotterdam', fullName: '鹿特丹, 荷兰', coords: { lat: 51.9244, lng: 4.4777 } },
          { name: '海牙', enName: 'the_hague', fullName: '海牙, 荷兰', coords: { lat: 52.0705, lng: 4.3007 } },
          { name: '乌特勒支', enName: 'utrecht', fullName: '乌特勒支, 荷兰', coords: { lat: 52.0907, lng: 5.1214 } },
        ]
      },
      {
        name: '瑞士',
        enName: 'switzerland',
        cities: [
          { name: '苏黎世', enName: 'zurich', fullName: '苏黎世, 瑞士', coords: { lat: 47.3769, lng: 8.5417 } },
          { name: '日内瓦', enName: 'geneva', fullName: '日内瓦, 瑞士', coords: { lat: 46.2044, lng: 6.1432 } },
          { name: '巴塞尔', enName: 'basel', fullName: '巴塞尔, 瑞士', coords: { lat: 47.5596, lng: 7.5886 } },
          { name: '伯尔尼', enName: 'bern', fullName: '伯尔尼, 瑞士', coords: { lat: 46.9480, lng: 7.4474 } },
        ]
      },
      {
        name: '瑞典',
        enName: 'sweden',
        cities: [
          { name: '斯德哥尔摩', enName: 'stockholm', fullName: '斯德哥尔摩, 瑞典', coords: { lat: 59.3293, lng: 18.0686 } },
          { name: '哥德堡', enName: 'gothenburg', fullName: '哥德堡, 瑞典', coords: { lat: 57.7089, lng: 11.9746 } },
          { name: '马尔默', enName: 'malmo', fullName: '马尔默, 瑞典', coords: { lat: 55.6049, lng: 13.0038 } },
        ]
      },
      {
        name: '挪威',
        enName: 'norway',
        cities: [
          { name: '奥斯陆', enName: 'oslo', fullName: '奥斯陆, 挪威', coords: { lat: 59.9139, lng: 10.7522 } },
          { name: '卑尔根', enName: 'bergen', fullName: '卑尔根, 挪威', coords: { lat: 60.3913, lng: 5.3221 } },
        ]
      },
      {
        name: '丹麦',
        enName: 'denmark',
        cities: [
          { name: '哥本哈根', enName: 'copenhagen', fullName: '哥本哈根, 丹麦', coords: { lat: 55.6761, lng: 12.5683 } },
          { name: '奥胡斯', enName: 'aarhus', fullName: '奥胡斯, 丹麦', coords: { lat: 56.1629, lng: 10.2039 } },
        ]
      },
      {
        name: '芬兰',
        enName: 'finland',
        cities: [
          { name: '赫尔辛基', enName: 'helsinki', fullName: '赫尔辛基, 芬兰', coords: { lat: 60.1695, lng: 24.9354 } },
          { name: '埃斯波', enName: 'espoo', fullName: '埃斯波, 芬兰', coords: { lat: 60.2055, lng: 24.6559 } },
        ]
      },
      {
        name: '比利时',
        enName: 'belgium',
        cities: [
          { name: '布鲁塞尔', enName: 'brussels', fullName: '布鲁塞尔, 比利时', coords: { lat: 50.8503, lng: 4.3517 } },
          { name: '安特卫普', enName: 'antwerp', fullName: '安特卫普, 比利时', coords: { lat: 51.2194, lng: 4.4025 } },
          { name: '根特', enName: 'ghent', fullName: '根特, 比利时', coords: { lat: 51.0543, lng: 3.7174 } },
        ]
      },
      {
        name: '奥地利',
        enName: 'austria',
        cities: [
          { name: '维也纳', enName: 'vienna', fullName: '维也纳, 奥地利', coords: { lat: 48.2082, lng: 16.3738 } },
          { name: '萨尔茨堡', enName: 'salzburg', fullName: '萨尔茨堡, 奥地利', coords: { lat: 47.8095, lng: 13.0550 } },
          { name: '格拉茨', enName: 'graz', fullName: '格拉茨, 奥地利', coords: { lat: 47.0707, lng: 15.4395 } },
        ]
      },
      {
        name: '波兰',
        enName: 'poland',
        cities: [
          { name: '华沙', enName: 'warsaw', fullName: '华沙, 波兰', coords: { lat: 52.2297, lng: 21.0122 } },
          { name: '克拉科夫', enName: 'krakow', fullName: '克拉科夫, 波兰', coords: { lat: 50.0647, lng: 19.9450 } },
        ]
      },
      {
        name: '捷克',
        enName: 'czechia',
        cities: [
          { name: '布拉格', enName: 'prague', fullName: '布拉格, 捷克', coords: { lat: 50.0755, lng: 14.4378 } },
          { name: '布尔诺', enName: 'brno', fullName: '布尔诺, 捷克', coords: { lat: 49.1951, lng: 16.6068 } },
        ]
      },
      {
        name: '匈牙利',
        enName: 'hungary',
        cities: [
          { name: '布达佩斯', enName: 'budapest', fullName: '布达佩斯, 匈牙利', coords: { lat: 47.4979, lng: 19.0402 } },
        ]
      },
      {
        name: '希腊',
        enName: 'greece',
        cities: [
          { name: '雅典', enName: 'athens', fullName: '雅典, 希腊', coords: { lat: 37.9838, lng: 23.7275 } },
          { name: '塞萨洛尼基', enName: 'thessaloniki', fullName: '塞萨洛尼基, 希腊', coords: { lat: 40.6401, lng: 22.9444 } },
        ]
      },
      {
        name: '葡萄牙',
        enName: 'portugal',
        cities: [
          { name: '里斯本', enName: 'lisbon', fullName: '里斯本, 葡萄牙', coords: { lat: 38.7223, lng: -9.1393 } },
          { name: '波尔图', enName: 'porto', fullName: '波尔图, 葡萄牙', coords: { lat: 41.1579, lng: -8.6291 } },
        ]
      },
      {
        name: '爱尔兰',
        enName: 'ireland',
        cities: [
          { name: '都柏林', enName: 'dublin', fullName: '都柏林, 爱尔兰', coords: { lat: 53.3498, lng: -6.2603 } },
          { name: '科克', enName: 'cork', fullName: '科克, 爱尔兰', coords: { lat: 51.8985, lng: -8.4756 } },
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
          { name: '纽约', enName: 'new_york', fullName: '纽约, 美国', coords: { lat: 40.7128, lng: -74.0060 } },
          { name: '洛杉矶', enName: 'los_angeles', fullName: '洛杉矶, 美国', coords: { lat: 34.0522, lng: -118.2437 } },
          { name: '芝加哥', enName: 'chicago', fullName: '芝加哥, 美国', coords: { lat: 41.8781, lng: -87.6298 } },
          { name: '休斯顿', enName: 'houston', fullName: '休斯顿, 美国', coords: { lat: 29.7604, lng: -95.3698 } },
          { name: '菲尼克斯', enName: 'phoenix', fullName: '菲尼克斯, 美国', coords: { lat: 33.4484, lng: -112.0740 } },
          { name: '费城', enName: 'philadelphia', fullName: '费城, 美国', coords: { lat: 39.9526, lng: -75.1652 } },
          { name: '圣安东尼奥', enName: 'san_antonio', fullName: '圣安东尼奥, 美国', coords: { lat: 29.4241, lng: -98.4936 } },
          { name: '圣地亚哥', enName: 'san_diego', fullName: '圣地亚哥, 美国', coords: { lat: 32.7157, lng: -117.1611 } },
          { name: '达拉斯', enName: 'dallas', fullName: '达拉斯, 美国', coords: { lat: 32.7767, lng: -96.7970 } },
          { name: '圣荷西', enName: 'san_jose', fullName: '圣荷西, 美国', coords: { lat: 37.3382, lng: -121.8863 } },
          { name: '奥斯汀', enName: 'austin', fullName: '奥斯汀, 美国', coords: { lat: 30.2672, lng: -97.7431 } },
          { name: '杰克逊维尔', enName: 'jacksonville', fullName: '杰克逊维尔, 美国', coords: { lat: 30.3322, lng: -81.6557 } },
          { name: '旧金山', enName: 'san_francisco', fullName: '旧金山, 美国', coords: { lat: 37.7749, lng: -122.4194 } },
          { name: '哥伦布', enName: 'columbus', fullName: '哥伦布, 美国', coords: { lat: 39.9612, lng: -82.9988 } },
          { name: '印第安纳波利斯', enName: 'indianapolis', fullName: '印第安纳波利斯, 美国', coords: { lat: 39.7684, lng: -86.1581 } },
          { name: '沃思堡', enName: 'fort_worth', fullName: '沃思堡, 美国', coords: { lat: 32.7555, lng: -97.3308 } },
          { name: '夏洛特', enName: 'charlotte', fullName: '夏洛特, 美国', coords: { lat: 35.2271, lng: -80.8431 } },
          { name: '西雅图', enName: 'seattle', fullName: '西雅图, 美国', coords: { lat: 47.6062, lng: -122.3321 } },
          { name: '丹佛', enName: 'denver', fullName: '丹佛, 美国', coords: { lat: 39.7392, lng: -104.9903 } },
          { name: '华盛顿特区', enName: 'washington_dc', fullName: '华盛顿特区, 美国', coords: { lat: 38.9072, lng: -77.0369 } },
          { name: '波士顿', enName: 'boston', fullName: '波士顿, 美国', coords: { lat: 42.3601, lng: -71.0589 } },
          { name: '拉斯维加斯', enName: 'las_vegas', fullName: '拉斯维加斯, 美国', coords: { lat: 36.1699, lng: -115.1398 } }
        ]
      },
      {
        name: '加拿大',
        enName: 'canada',
        cities: [
          { name: '多伦多', enName: 'toronto', fullName: '多伦多, 加拿大', coords: { lat: 43.6510, lng: -79.3470 } },
          { name: '蒙特利尔', enName: 'montreal', fullName: '蒙特利尔, 加拿大', coords: { lat: 45.5017, lng: -73.5673 } },
          { name: '温哥华', enName: 'vancouver', fullName: '温哥华, 加拿大', coords: { lat: 49.2827, lng: -123.1207 } },
          { name: '卡尔加里', enName: 'calgary', fullName: '卡尔加里, 加拿大', coords: { lat: 51.0447, lng: -114.0719 } },
          { name: '埃德蒙顿', enName: 'edmonton', fullName: '埃德蒙顿, 加拿大', coords: { lat: 53.5461, lng: -113.4938 } },
          { name: '渥太华', enName: 'ottawa', fullName: '渥太华, 加拿大', coords: { lat: 45.4215, lng: -75.6972 } },
          { name: '温尼伯', enName: 'winnipeg', fullName: '温尼伯, 加拿大', coords: { lat: 49.8951, lng: -97.1384 } },
          { name: '魁北克市', enName: 'quebec_city', fullName: '魁北克市, 加拿大', coords: { lat: 46.8139, lng: -71.2080 } },
          { name: '哈密尔顿', enName: 'hamilton', fullName: '哈密尔顿, 加拿大', coords: { lat: 43.2557, lng: -79.8711 } },
          { name: '基奇纳', enName: 'kitchener', fullName: '基奇纳, 加拿大', coords: { lat: 43.4504, lng: -80.4832 } },
        ]
      },
      {
        name: '墨西哥',
        enName: 'mexico',
        cities: [
          { name: '墨西哥城', enName: 'mexico_city', fullName: '墨西哥城, 墨西哥', coords: { lat: 19.4326, lng: -99.1332 } },
          { name: '瓜达拉哈拉', enName: 'guadalajara', fullName: '瓜达拉哈拉, 墨西哥', coords: { lat: 20.6597, lng: -103.3496 } },
          { name: '蒙特雷', enName: 'monterrey', fullName: '蒙特雷, 墨西哥', coords: { lat: 25.6866, lng: -100.3161 } },
          { name: '坎昆', enName: 'cancun', fullName: '坎昆, 墨西哥', coords: { lat: 21.1619, lng: -86.8515 } },
          { name: '蒂华纳', enName: 'tijuana', fullName: '蒂华纳, 墨西哥', coords: { lat: 32.5149, lng: -117.0382 } },
        ]
      },
      {
        name: '古巴',
        enName: 'cuba',
        cities: [
          { name: '哈瓦那', enName: 'havana', fullName: '哈瓦那, 古巴', coords: { lat: 23.1136, lng: -82.3666 } },
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
          { name: '圣保罗', enName: 'sao_paulo', fullName: '圣保罗, 巴西', coords: { lat: -23.5505, lng: -46.6333 } },
          { name: '里约热内卢', enName: 'rio_de_janeiro', fullName: '里约热内卢, 巴西', coords: { lat: -22.9068, lng: -43.1729 } },
          { name: '巴西利亚', enName: 'brasilia', fullName: '巴西利亚, 巴西', coords: { lat: -15.8267, lng: -47.9218 } },
          { name: '萨尔瓦多', enName: 'salvador', fullName: '萨尔瓦多, 巴西', coords: { lat: -12.9777, lng: -38.5016 } },
          { name: '福塔雷萨', enName: 'fortaleza', fullName: '福塔雷萨, 巴西', coords: { lat: -3.7319, lng: -38.5267 } },
          { name: '贝洛奥里藏特', enName: 'belo_horizonte', fullName: '贝洛奥里藏特, 巴西', coords: { lat: -19.9167, lng: -43.9345 } },
          { name: '玛瑙斯', enName: 'manaus', fullName: '玛瑙斯, 巴西', coords: { lat: -3.1190, lng: -60.0217 } },
          { name: '库里蒂巴', enName: 'curitiba', fullName: '库里蒂巴, 巴西', coords: { lat: -25.4284, lng: -49.2733 } },
          { name: '累西腓', enName: 'recife', fullName: '累西腓, 巴西', coords: { lat: -8.0578, lng: -34.8829 } },
          { name: '阿雷格里港', enName: 'porto_alegre', fullName: '阿雷格里港, 巴西', coords: { lat: -30.0346, lng: -51.2177 } },
        ]
      },
      {
        name: '阿根廷',
        enName: 'argentina',
        cities: [
          { name: '布宜诺斯艾利斯', enName: 'buenos_aires', fullName: '布宜诺斯艾利斯, 阿根廷', coords: { lat: -34.6037, lng: -58.3816 } },
          { name: '科尔多瓦', enName: 'cordoba', fullName: '科尔多瓦, 阿根廷', coords: { lat: -31.4201, lng: -64.1888 } },
          { name: '罗萨里奥', enName: 'rosario', fullName: '罗萨里奥, 阿根廷', coords: { lat: -32.9442, lng: -60.6505 } },
          { name: '门多萨', enName: 'mendoza', fullName: '门多萨, 阿根廷', coords: { lat: -32.8895, lng: -68.8458 } },
        ]
      },
      {
        name: '哥伦比亚',
        enName: 'colombia',
        cities: [
          { name: '波哥大', enName: 'bogota', fullName: '波哥大, 哥伦比亚', coords: { lat: 4.7110, lng: -74.0721 } },
          { name: '麦德林', enName: 'medellin', fullName: '麦德林, 哥伦比亚', coords: { lat: 6.2442, lng: -75.5812 } },
          { name: '卡利', enName: 'cali', fullName: '卡利, 哥伦比亚', coords: { lat: 3.4516, lng: -76.5320 } },
        ]
      },
      {
        name: '智利',
        enName: 'chile',
        cities: [
          { name: '圣地亚哥', enName: 'santiago', fullName: '圣地亚哥, 智利', coords: { lat: -33.4489, lng: -70.6693 } },
          { name: '瓦尔帕莱索', enName: 'valparaiso', fullName: '瓦尔帕莱索, 智利', coords: { lat: -33.0472, lng: -71.6127 } },
        ]
      },
      {
        name: '秘鲁',
        enName: 'peru',
        cities: [
          { name: '利马', enName: 'lima', fullName: '利马, 秘鲁', coords: { lat: -12.0464, lng: -77.0428 } },
          { name: '库斯科', enName: 'cusco', fullName: '库斯科, 秘鲁', coords: { lat: -13.5319, lng: -71.9675 } },
          { name: '阿雷基帕', enName: 'arequipa', fullName: '阿雷基帕, 秘鲁', coords: { lat: -16.4090, lng: -71.5375 } },
        ]
      },
      {
        name: '委内瑞拉',
        enName: 'venezuela',
        cities: [
          { name: '加拉加斯', enName: 'caracas', fullName: '加拉加斯, 委内瑞拉', coords: { lat: 10.4806, lng: -66.9036 } },
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
          { name: '布里斯班', enName: 'brisbane', fullName: '布里斯班, 澳大利亚', coords: { lat: -27.4698, lng: 153.0251 } },
          { name: '珀斯', enName: 'perth', fullName: '珀斯, 澳大利亚', coords: { lat: -31.9505, lng: 115.8605 } },
          { name: '阿德莱德', enName: 'adelaide', fullName: '阿德莱德, 澳大利亚', coords: { lat: -34.9285, lng: 138.6007 } },
          { name: '黄金海岸', enName: 'gold_coast', fullName: '黄金海岸, 澳大利亚', coords: { lat: -28.0167, lng: 153.4000 } },
          { name: '堪培拉', enName: 'canberra', fullName: '堪培拉, 澳大利亚', coords: { lat: -35.2809, lng: 149.1300 } },
          { name: '纽卡斯尔', enName: 'newcastle_au', fullName: '纽卡斯尔, 澳大利亚', coords: { lat: -32.9283, lng: 151.7817 } },
          { name: '霍巴特', enName: 'hobart', fullName: '霍巴特, 澳大利亚', coords: { lat: -42.8821, lng: 147.3272 } },
          { name: '达尔文', enName: 'darwin', fullName: '达尔文, 澳大利亚', coords: { lat: -12.4634, lng: 130.8456 } },
        ]
      },
      {
        name: '新西兰',
        enName: 'new_zealand',
        cities: [
          { name: '奥克兰', enName: 'auckland', fullName: '奥克兰, 新西兰', coords: { lat: -36.8485, lng: 174.7633 } },
          { name: '惠灵顿', enName: 'wellington', fullName: '惠灵顿, 新西兰', coords: { lat: -41.2866, lng: 174.7756 } },
          { name: '基督城', enName: 'christchurch', fullName: '基督城, 新西兰', coords: { lat: -43.5321, lng: 172.6362 } },
          { name: '皇后镇', enName: 'queenstown', fullName: '皇后镇, 新西兰', coords: { lat: -45.0312, lng: 168.6626 } },
        ]
      },
       {
        name: '斐济',
        enName: 'fiji',
        cities: [
          { name: '苏瓦', enName: 'suva', fullName: '苏瓦, 斐济', coords: { lat: -18.1416, lng: 178.4419 } },
        ]
      },
      {
        name: '法属波利尼西亚',
        enName: 'french_polynesia',
        cities: [
          { name: '帕皮提', enName: 'papeete', fullName: '帕皮提, 大溪地', coords: { lat: -17.5516, lng: -149.5585 } },
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
          { name: '亚历山大', enName: 'alexandria', fullName: '亚历山大, 埃及', coords: { lat: 31.2001, lng: 29.9187 } },
          { name: '卢克索', enName: 'luxor', fullName: '卢克索, 埃及', coords: { lat: 25.6872, lng: 32.6396 } },
        ]
      },
      {
        name: '南非',
        enName: 'south_africa',
        cities: [
          { name: '约翰内斯堡', enName: 'johannesburg', fullName: '约翰内斯堡, 南非', coords: { lat: -26.2041, lng: 28.0473 } },
          { name: '开普敦', enName: 'cape_town', fullName: '开普敦, 南非', coords: { lat: -33.9249, lng: 18.4241 } },
          { name: '德班', enName: 'durban', fullName: '德班, 南非', coords: { lat: -29.8587, lng: 31.0218 } },
          { name: '比勒陀利亚', enName: 'pretoria', fullName: '比勒陀利亚, 南非', coords: { lat: -25.7479, lng: 28.2293 } },
        ]
      },
      {
        name: '尼日利亚',
        enName: 'nigeria',
        cities: [
          { name: '拉各斯', enName: 'lagos', fullName: '拉各斯, 尼日利亚', coords: { lat: 6.5244, lng: 3.3792 } },
          { name: '阿布贾', enName: 'abuja', fullName: '阿布贾, 尼日利亚', coords: { lat: 9.0765, lng: 7.3986 } },
        ]
      },
      {
        name: '肯尼亚',
        enName: 'kenya',
        cities: [
          { name: '内罗毕', enName: 'nairobi', fullName: '内罗毕, 肯尼亚', coords: { lat: -1.2921, lng: 36.8219 } },
          { name: '蒙巴萨', enName: 'mombasa', fullName: '蒙巴萨, 肯尼亚', coords: { lat: -4.0435, lng: 39.6682 } },
        ]
      },
      {
        name: '摩洛哥',
        enName: 'morocco',
        cities: [
          { name: '卡萨布兰卡', enName: 'casablanca', fullName: '卡萨布兰卡, 摩洛哥', coords: { lat: 33.5731, lng: -7.5898 } },
          { name: '拉巴特', enName: 'rabat', fullName: '拉巴特, 摩洛哥', coords: { lat: 34.0209, lng: -6.8416 } },
          { name: '马拉喀什', enName: 'marrakech', fullName: '马拉喀什, 摩洛哥', coords: { lat: 31.6295, lng: -7.9811 } },
        ]
      },
      {
        name: '埃塞俄比亚',
        enName: 'ethiopia',
        cities: [
          { name: '亚的斯亚贝巴', enName: 'addis_ababa', fullName: '亚的斯亚贝巴, 埃塞俄比亚', coords: { lat: 9.0054, lng: 38.7636 } },
        ]
      },
      {
        name: '加纳',
        enName: 'ghana',
        cities: [
          { name: '阿克拉', enName: 'accra', fullName: '阿克拉, 加纳', coords: { lat: 5.6037, lng: -0.1870 } },
        ]
      },
      {
        name: '坦桑尼亚',
        enName: 'tanzania',
        cities: [
          { name: '达累斯萨拉姆', enName: 'dar_es_salaam', fullName: '达累斯萨拉姆, 坦桑尼亚', coords: { lat: -6.7924, lng: 39.2083 } },
          { name: '桑给巴尔', enName: 'zanzibar', fullName: '桑给巴尔, 坦桑尼亚', coords: { lat: -6.1659, lng: 39.2026 } },
        ]
      },
      {
        name: '毛里求斯',
        enName: 'mauritius',
        cities: [
          { name: '路易港', enName: 'port_louis', fullName: '路易港, 毛里求斯', coords: { lat: -20.1609, lng: 57.5015 } },
        ]
      },
      {
        name: '突尼斯',
        enName: 'tunisia',
        cities: [
          { name: '突尼斯市', enName: 'tunis', fullName: '突尼斯市, 突尼斯', coords: { lat: 36.8065, lng: 10.1815 } },
        ]
      },
      {
        name: '塞舌尔',
        enName: 'seychelles',
        cities: [
          { name: '维多利亚', enName: 'victoria', fullName: '维多利亚, 塞舌尔', coords: { lat: -4.6191, lng: 55.4513 } },
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
          { name: '沃斯托克站', enName: 'vostok_station', fullName: '沃斯托克站, 南极洲', coords: { lat: -78.4645, lng: 106.8340 } },
          { name: '阿蒙森-斯科特站', enName: 'amundsen_scott', fullName: '阿蒙森-斯科特站, 南极点', coords: { lat: -90.0000, lng: 0.0000 } },
        ]
      }
    ]
  }
];