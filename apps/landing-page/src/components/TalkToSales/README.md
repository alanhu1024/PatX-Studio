# Talk to Sales 组件使用指南

这个目录包含了完整的"联系销售"功能组件，设计为可复用的组件，既可以作为独立页面使用，也可以作为弹框使用。

## 🎨 设计特点

### 完全匹配设计稿
- 左侧产品介绍区域，包含4个功能亮点
- 右侧表单区域，使用浅蓝色背景卡片
- 橙色主题按钮，与设计稿完全一致
- 响应式布局，支持移动端和桌面端

### 样式系统
- 使用 Tailwind CSS 进行样式设计
- 提供专用样式文件 `styles.css`
- 支持自定义主题色和样式变量

### 完整导航体验
- 包含 Header (Navbar) 和 Footer
- 面包屑导航，清楚显示当前位置
- 智能链接：在主页使用锚点，在子页面使用完整路径
- 用户可以轻松返回主页和其他页面

## 组件列表

### 1. TalkToSalesForm
核心表单组件，包含所有表单字段和逻辑。

**Props:**
- `isModal?: boolean` - 是否为弹框模式，影响布局和样式
- `onClose?: () => void` - 关闭回调函数（弹框模式必需）

**使用示例:**
```tsx
// 作为独立页面
<TalkToSalesForm isModal={false} />

// 作为弹框内容
<TalkToSalesForm isModal={true} onClose={handleClose} />
```

### 2. TalkToSalesModal
弹框组件，包装了TalkToSalesForm。

**Props:**
- `open: boolean` - 控制弹框显示/隐藏
- `onOpenChange: (open: boolean) => void` - 弹框状态变化回调

**使用示例:**
```tsx
const [isOpen, setIsOpen] = useState(false)

<TalkToSalesModal 
  open={isOpen} 
  onOpenChange={setIsOpen} 
/>
```

### 3. TalkToSalesPage
独立页面组件，包含完整的页面布局和导航。

**特点:**
- 自动包含 Navbar 和 Footer
- 面包屑导航，显示当前位置
- 完整的页面结构

**使用示例:**
```tsx
import TalkToSalesPage from "@/components/TalkToSalesPage"

export default function Page() {
  return <TalkToSalesPage />
}
```

### 4. TalkToSalesTrigger
触发按钮组件，点击后自动打开弹框。

**Props:**
- `variant?: "default" | "outline" | "secondary" | "ghost" | "link"` - 按钮样式
- `size?: "default" | "sm" | "lg" | "icon"` - 按钮大小
- `children?: React.ReactNode` - 按钮内容
- `className?: string` - 自定义样式类

**使用示例:**
```tsx
// 默认样式（橙色主题）
<TalkToSalesTrigger>Talk to Sales</TalkToSalesTrigger>

// 自定义样式
<TalkToSalesTrigger 
  variant="outline" 
  size="lg"
  className="w-full"
>
  Schedule Demo
</TalkToSalesTrigger>
```

### 5. useTalkToSales Hook
管理弹框状态的自定义Hook。

**返回值:**
- `isOpen: boolean` - 弹框是否打开
- `open: () => void` - 打开弹框
- `close: () => void` - 关闭弹框
- `toggle: () => void` - 切换弹框状态

**使用示例:**
```tsx
import { useTalkToSales } from "@/hooks/useTalkToSales"

function MyComponent() {
  const { isOpen, open, close } = useTalkToSales()
  
  return (
    <>
      <button onClick={open}>打开弹框</button>
      <TalkToSalesModal open={isOpen} onOpenChange={close} />
    </>
  )
}
```

## 页面路由

- `/talk-to-sales` - 独立的联系销售页面（包含完整导航）
- `/demo` - 组件演示页面（包含完整导航）

## 导航功能

### Header (Navbar)
- **Logo**: 点击可返回主页
- **导航链接**: Home, Feature, Testimonials, Pricing
- **智能链接**: 在主页使用锚点，在子页面使用完整路径
- **右侧按钮**: Talk to Sales, Sign up

### Footer
- 包含完整的页脚信息
- 与主页保持一致的样式和内容

### 面包屑导航
- 显示当前位置：Home > Talk to Sales
- 提供返回主页的快捷链接
- 使用图标增强视觉效果

## 样式定制

### 使用专用样式文件
```css
/* 导入专用样式 */
@import "@/components/TalkToSales/styles.css";

/* 使用预定义样式类 */
<div className="sales-benefits-section">
  <h1 className="sales-benefits-title">...</h1>
</div>
```

### 自定义样式
所有组件都使用Tailwind CSS类名，可以通过以下方式定制：

1. 修改组件内的className
2. 通过props传递自定义样式
3. 在全局CSS中覆盖样式变量
4. 使用专用样式文件中的类名

## 表单字段

表单包含以下字段：
- First Name (必填)
- Last Name (必填)
- Business Email (必填)
- Company (必填)
- Job Title (必填)
- Patent analysis needs (专利分析需求描述)
- Terms agreement checkbox (同意条款复选框，必填)

## 响应式设计

- **桌面端**: 左右两栏布局，左侧产品介绍，右侧表单
- **平板端**: 保持两栏布局，调整间距
- **移动端**: 单栏布局，产品介绍在上，表单在下

## 注意事项

1. 所有组件都使用"use client"指令，确保在客户端渲染
2. 表单提交逻辑需要根据实际需求实现
3. 组件已适配移动端和桌面端响应式布局
4. 支持键盘导航和屏幕阅读器
5. 样式完全匹配设计稿，包括颜色、字体、间距等
6. 支持大弹框使用，布局会自动调整
7. 页面组件自动包含完整的导航结构
8. 智能导航链接，确保在任何页面都能正确返回主页

## 样式优化

### 颜色系统
- **主色调**: 橙色 (#f97316) - 用于按钮和强调
- **背景色**: 浅蓝色 (#4A9EFF/10) - 用于表单卡片
- **文字色**: 深灰色 (#111827) - 用于标题和正文
- **边框色**: 浅灰色 (#d1d5db) - 用于输入框边框

### 图标样式
- **背景**: 浅橙色 (#fed7aa)
- **图标**: 深橙色 (#ea580c)
- **尺寸**: 20x20px (h-5 w-5)

### 响应式断点
- **lg**: 1024px - 桌面端两栏布局
- **md**: 768px - 平板端调整
- **sm**: 640px - 移动端单栏布局

## 导航体验

### 用户流程
1. 用户从主页点击 "Talk to Sales" 进入联系页面
2. 页面显示完整的导航结构，包括 Header 和 Footer
3. 面包屑导航清楚显示当前位置
4. 用户可以点击 Logo 或 "Home" 链接返回主页
5. 也可以使用其他导航链接访问其他页面

### 智能链接系统
- **在主页**: 使用锚点链接 (#home, #features 等)
- **在子页面**: 使用完整路径链接 (/, /#features 等)
- 确保用户在任何页面都能正确导航
