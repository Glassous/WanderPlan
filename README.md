<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

**WanderPlan - 智能旅行规划与地图可视化平台**

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](LICENSE)

</div>

## 🌟 项目简介

WanderPlan 是一个现代化的旅行规划应用，结合了AI智能规划与手动自定义功能。通过优雅的界面设计和强大的地图可视化能力，帮助用户从旅行灵感到详细行程规划，提供一站式的旅行解决方案。

### 核心特性

- 🤖 **AI智能规划** - 基于通义千问等AI模型自动生成个性化行程
- 🎯 **手动自定义** - 完全手动编辑，灵活控制每个行程细节
- 🗺️ **地图可视化** - 使用Leaflet地图展示行程路线和地理位置
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🌓 **主题切换** - 支持浅色/深色/系统主题模式
- 💾 **本地存储** - 自动保存历史记录，支持导入导出
- 🔗 **社区分享** - 通过Supabase实现行程分享功能

## 🚀 快速开始

### 环境要求

- Node.js 18+ (推荐LTS版本)
- npm 或 yarn 包管理器
- 有效的AI API密钥（用于智能规划功能）

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd WanderPlan
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **环境配置**
   在项目根目录创建 `.env.local` 文件：
   ```env
   # 通义千问API密钥
   VITE_QWEN_API_KEY=your_qwen_api_key_here
   
   # Supabase配置（可选，用于社区功能）
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **构建生产版本**
   ```bash
   npm run build
   npm run preview
   ```

## 📁 项目结构

```
WanderPlan/
├── components/           # React组件
│   ├── TravelForm.tsx   # 旅行表单组件
│   ├── ItineraryList.tsx # 行程列表组件
│   ├── MapDisplay.tsx   # 地图显示组件
│   ├── ThemeBackground.tsx # 主题背景组件
│   └── DestinationPicker.tsx # 目的地选择器
├── services/            # 服务层
│   ├── qwenservice.ts  # AI服务接口
│   ├── supabaseClient.ts # Supabase客户端
│   └── community.ts    # 社区功能服务
├── data/               # 数据文件
│   ├── domesticCities.ts # 国内城市数据
│   └── internationalCities.ts # 国际城市数据
├── utils/              # 工具函数
│   └── themeData.ts    # 主题配置
├── public/             # 静态资源
├── types.ts            # TypeScript类型定义
└── App.tsx            # 应用主入口
```

## 🛠️ 技术栈

- **前端框架**: React 19.2.0
- **构建工具**: Vite 6.2.0
- **开发语言**: TypeScript 5.8.2
- **地图组件**: React-Leaflet + Leaflet
- **图标库**: Lucide React
- **状态管理**: React Hooks
- **样式方案**: CSS Modules + 自定义主题
- **数据存储**: localStorage + Supabase

## 💡 使用指南

### 智能规划模式
1. 在首页选择"智能规划"标签
2. 填写目的地、旅行天数、预算等信息
3. 选择AI模型（可选）
4. 点击"开启规划"生成个性化行程

### 自定义模式
1. 切换到"自定义"标签
2. 输入行程标题、天数和简介
3. 手动添加每日活动安排
4. 实时编辑活动详情和地理位置

### 地图视图
1. 点击底部"地图"标签切换视图
2. 查看行程路线和活动位置
3. 选择特定日期高亮显示相关活动

### 历史记录
- 自动保存在浏览器本地存储
- 支持导入/导出JSON格式
- 提供删除确认和批量管理功能

## 🔧 开发指南

### 添加新的AI模型
在 `App.tsx` 的 `models` 数组中添加新的模型配置：

```typescript
const models = [
  // ...现有模型
  { value: 'new-model', label: '新模型名称' }
];
```

### 自定义主题
修改 `utils/themeData.ts` 中的主题配置：

```typescript
export const themes = {
  // 添加新的主题配置
  newTheme: {
    background: 'your-gradient',
    colors: ['#color1', '#color2']
  }
};
```

### 扩展数据类型
在 `types.ts` 中定义新的数据类型：

```typescript
export interface NewFeature {
  id: string;
  // 定义属性
}
```

## 🌐 部署说明

### 静态站点部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到平台**
   - Vercel、Netlify、GitHub Pages等
   - 需要配置环境变量

### 环境变量配置
在部署平台设置以下环境变量：

```env
VITE_QWEN_API_KEY=生产环境API密钥
VITE_SUPABASE_URL=生产环境Supabase URL
VITE_SUPABASE_ANON_KEY=生产环境Supabase密钥
```

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范
- 使用 TypeScript 进行类型安全开发
- 遵循 React Hooks 最佳实践
- 保持组件单一职责原则
- 添加适当的注释和文档

## 📄 许可证

本项目采用 Apache 2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## ⚠️ 安全提示

- 请勿在版本控制中提交API密钥
- 生产环境使用安全的密钥管理方案
- 定期更新依赖包以修复安全漏洞

## 🔗 相关链接

- [React 官方文档](https://reactjs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Leaflet 地图文档](https://leafletjs.com/)
- [通义千问 API](https://dashscope.aliyun.com/)

## 🐛 问题反馈

如果您遇到任何问题或有功能建议，请通过以下方式反馈：

1. 在 GitHub Issues 中创建新问题
2. 提供详细的问题描述和复现步骤
3. 包含浏览器版本和操作系统信息

---

<div align="center">

**Made with ❤️ for travelers around the world**

</div>