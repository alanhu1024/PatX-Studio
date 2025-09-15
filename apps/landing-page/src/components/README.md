# 组件库

这个目录包含了网站的主要组件，每个组件都是独立的、可重用的模块。

## 主要组件

### HeroSection
- **位置**: `HeroSection.tsx`
- **功能**: 网站的主要英雄区域，包含标题、描述和应用界面预览
- **特点**: 
  - 响应式设计
  - 包含浮动的装饰元素
  - 左侧文本内容，右侧应用界面模拟

### LogoCloud
- **位置**: `LogoCloud.tsx`
- **功能**: 展示信任品牌的logo轮播
- **特点**:
  - 无缝循环播放
  - 悬停效果
  - 响应式设计

### FeatureSection
- **位置**: `FeatureSection.tsx`
- **功能**: 展示产品的主要特性
- **特点**:
  - 三个主要特性展示
  - 左右交替的布局
  - 包含UI模拟和详细说明
  - 浮动的装饰元素

### Navbar
- **位置**: `navbar.tsx`
- **功能**: 网站导航栏
- **特点**: 响应式导航，包含logo和菜单项

## 使用方法

### 导入组件
```tsx
// 从组件索引文件导入
import { HeroSection, LogoCloud, FeatureSection, Navbar } from "@/components";

// 或者单独导入
import { HeroSection } from "@/components/HeroSection";
```

### 在页面中使用
```tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LogoCloud />
      <FeatureSection />
      {/* 其他内容 */}
    </div>
  );
}
```

## 组件结构

```
components/
├── index.ts              # 组件导出索引
├── HeroSection.tsx       # 英雄区域组件
├── LogoCloud.tsx         # Logo云组件
├── FeatureSection.tsx    # 特性展示组件
├── navbar.tsx            # 导航栏组件
├── icons.tsx             # 图标组件
├── ui/                   # UI基础组件
│   ├── avatar.tsx        # 头像组件
│   └── badge.tsx         # 徽章组件
└── README.md             # 本文档
```

## 样式和主题

所有组件都使用Tailwind CSS进行样式设计，并遵循项目的设计系统：
- 使用CSS变量定义颜色主题
- 响应式设计，支持移动端和桌面端
- 一致的间距和排版规范

## 维护说明

- 每个组件都是独立的，可以单独修改而不影响其他组件
- 组件使用TypeScript，提供类型安全
- 所有组件都支持响应式设计
- 组件内部包含必要的样式和逻辑，无需外部依赖
