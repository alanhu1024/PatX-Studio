import { 
  TalkToSalesForm, 
  TalkToSalesModal, 
  TalkToSalesPage, 
  TalkToSalesTrigger,
  Navbar,
  Footer
} from "@/components"
import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export default function DemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* 面包屑导航 */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link 
                href="/" 
                className="flex items-center hover:text-gray-900 transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Component Demo</span>
            </nav>
          </div>
        </div>

        <div className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Talk to Sales 组件演示
              </h1>
              <p className="text-xl text-gray-600">
                展示所有组件的使用方法和效果
              </p>
            </div>

            <div className="grid gap-8">
              {/* 触发按钮演示 */}
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <h2 className="text-2xl font-bold mb-4">触发按钮组件</h2>
                <p className="text-gray-600 mb-6">
                  点击按钮可以打开弹框，组件会自动管理弹框状态
                </p>
                <div className="flex flex-wrap gap-4">
                  <TalkToSalesTrigger>联系销售</TalkToSalesTrigger>
                  <TalkToSalesTrigger variant="outline">预约演示</TalkToSalesTrigger>
                  <TalkToSalesTrigger variant="secondary" size="lg">
                    了解更多
                  </TalkToSalesTrigger>
                </div>
              </div>

              {/* 手动控制弹框演示 */}
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <h2 className="text-2xl font-bold mb-4">手动控制弹框</h2>
                <p className="text-gray-600 mb-6">
                  使用useState手动控制弹框的显示和隐藏
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    打开弹框
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    关闭弹框
                  </button>
                </div>
                
                <TalkToSalesModal 
                  open={isModalOpen} 
                  onOpenChange={setIsModalOpen} 
                />
              </div>

              {/* 独立表单演示 */}
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <h2 className="text-2xl font-bold mb-4">独立表单组件</h2>
                <p className="text-gray-600 mb-6">
                  表单组件可以独立使用，不依赖弹框
                </p>
                <div className="max-w-2xl">
                  <TalkToSalesForm isModal={false} />
                </div>
              </div>

              {/* 页面组件演示 */}
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <h2 className="text-2xl font-bold mb-4">页面组件</h2>
                <p className="text-gray-600 mb-6">
                  完整的页面组件，包含所有功能和样式
                </p>
                <a
                  href="/talk-to-sales"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  查看完整页面
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
