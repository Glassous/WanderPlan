<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# WanderPlan · 智能/手动旅程规划与地图可视化

WanderPlan 是一个前端应用，支持 AI 自动生成旅程，也支持完全手动编辑与自定义。它提供优雅的主页表单、历史记录管理、可视化世界地图以及细致的编辑模式，让你从“灵感”到“可执行行程”一气呵成。

## 特性概览

- 规划模式：根据目的地、天数、预算、时间限制等生成结构化行程数据（含经纬度）
- 自定义模式：无需 AI，快速创建空白行程，自由添加/删除天数与活动
- 编辑模式：对天数与活动进行增删改、可实时编辑经纬度坐标与主题
- 地图视图：使用 `react-leaflet` 展示各天活动的地理位置与连线轨迹
- 历史记录：本地持久化存储，支持导入/导出 JSON
- 预算联动卡片：在“旅行偏好 & 备注”内根据预算动态提供快捷卡片，点击即可填充
- 主题与夜间模式：柔和背景主题与深色模式切换
- 移动端体验：分屏视图与底部标签切换（行程/地图）

## 技术栈

- 框架：`React 19` + `Vite 6`
- 地图：`react-leaflet` + `leaflet`
- 图标：`lucide-react`
- 类型：`TypeScript`

## 快速开始

**环境要求**
- Node.js 18+（推荐 LTS）
- 一个有效的通义千问 API Key（用于规划模式）

**步骤**
1. 安装依赖：
   `npm install`
2. 配置环境变量：在项目根目录创建 `.env.local` 文件，并设置：
   `VITE_QWEN_API_KEY=你的API密钥`
3. 开发模式运行：
   `npm run dev`
4. 生产构建与预览：
   `npm run build`
   `npm run preview`

> 说明：项目默认使用千问兼容接口，读取 `import.meta.env.VITE_QWEN_API_KEY`。

## 目录与核心文件

- `App.tsx`：应用入口与主布局、主题切换、删除确认弹窗、移动端标签栏
- `components/TravelForm.tsx`：主页表单（规划/自定义/历史记录切换、预算联动卡片、表单项）
- `components/ItineraryList.tsx`：行程列表与编辑模式（天数/活动的增删改、坐标编辑、导出）
- `components/MapDisplay.tsx`：地图渲染（Marker、Polyline、方向箭头、日颜色）
- `components/ThemeBackground.tsx`：背景主题容器（渐变与形状层）
- `services/qwenservice.ts`：调用千问接口，生成符合结构的行程 JSON
- `utils/themeData.ts`：主题背景配置与样式生成
- `types.ts`：行程与活动的数据结构定义
- `vite.config.ts`：Vite 配置与别名
- `index.tsx` / `index.html`：应用挂载与基础页面模板

## 使用说明

- 主页表单（规划）：填写目的地、天数、同行者、时间限制、预算与备注后点击“开启规划”
- 自定义模式：在切换条选择“自定义”，输入标题、天数、简介后点击“创建空白行程”
- 编辑模式：在行程视图点击“编辑”，即可对天数与活动进行增删、修改详情与坐标
- 历史记录：自动保存在浏览器 `localStorage` 中；可导入/导出 JSON；删除有图形化确认弹窗
- 地图：切换到地图视图查看活动位置与路线，选择某天可高亮显示

## 数据结构（简要）

- `Itinerary`：`id`、`createdAt`、`tripTitle`、`summary`、`days[]`、`visualTheme`
- `DayPlan`：`day`、`theme`、`activities[]`
- `Activity`：`time`、`activityName`、`description`、`locationName`、`coordinates{ latitude, longitude }`

## 安全与隐私

- API Key 仅用于客户端请求，请避免将密钥提交到仓库
- 历史记录存储于浏览器本地，清除浏览器数据会删除历史

## 部署

- `npm run build` 生成 `dist` 静态文件，可直接部署至任意静态站点服务
- 需要环境变量时，请在托管平台设置 `VITE_QWEN_API_KEY`

## Supabase 社区功能数据库 SQL

```sql
create extension if not exists pgcrypto;

create table if not exists public.community_itineraries (
  id uuid primary key default gen_random_uuid(),
  trip_title text not null,
  created_at timestamptz not null default now(),
  itinerary jsonb not null
);

create index if not exists community_itineraries_created_at_idx
  on public.community_itineraries (created_at desc);

alter table public.community_itineraries enable row level security;

create policy "Community read"
  on public.community_itineraries
  for select
  using (true);

create policy "Community insert"
  on public.community_itineraries
  for insert
  with check (true);
```

## 相关链接

- Vite 文档：https://vitejs.dev/
- React-Leaflet 文档：https://react-leaflet.js.org/
- 通义千问兼容模式：https://dashscope.aliyun.com/

---

如需增加更多主题、导出模板或引入服务端，请提出需求或直接提交 PR。
