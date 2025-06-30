import { Link } from "react-router-dom";
import { AuthContext } from "@/App";
import { useContext } from "react";
import Navbar from "@/components/Navbar";

// 前端功能数据
const frontendFeatures = [
  {
    title: "内容浏览",
    description: "浏览免费和付费内容，按分类筛选",
    icon: "fa-solid fa-book-open",
    path: "/"
  },
  {
    title: "用户投稿",
    description: "提交原创内容获取积分奖励",
    icon: "fa-solid fa-pen-to-square",
    path: "/contribute"
  },
  {
    title: "会员中心",
    description: "管理账户信息和会员权益",
    icon: "fa-solid fa-user",
    path: "/member"
  },
  {
    title: "代理中心",
    description: "加入代理计划获取收益",
    icon: "fa-solid fa-handshake",
    path: "/agent"
  }
];

// 后端功能数据
const backendFeatures = [
  {
    title: "内容管理",
    description: "发布和管理平台内容",
    icon: "fa-solid fa-file-lines",
    path: "/admin/article"
  },
  {
    title: "课程审核",
    description: "审核用户提交的课程",
    icon: "fa-solid fa-clipboard-check",
    path: "/admin/courses"
  },
  {
    title: "版权管理",
    description: "处理内容版权和水印",
    icon: "fa-solid fa-copyright",
    path: "/admin/copyright"
  },
  {
    title: "数据抓取",
    description: "配置智能内容抓取规则",
    icon: "fa-solid fa-spider",
    path: "/admin/crawler"
  }
];

export default function FeaturePreview() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">功能预览</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        {/* 前端功能展示 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#001F3F] mb-6 border-b pb-2">前端功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frontendFeatures.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.path}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-[#001F3F] text-3xl mb-4">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* 后端功能展示 */}
        {user?.role === 'admin' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#001F3F] mb-6 border-b pb-2">后台管理</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {backendFeatures.map((feature, index) => (
                <Link 
                  key={index} 
                  to={feature.path}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-[#001F3F] text-3xl mb-4">
                    <i className={feature.icon}></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link 
            to="/sitemap" 
            className="inline-block bg-[#001F3F] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
          >
            <i className="fa-solid fa-sitemap mr-2"></i>查看完整网站地图
          </Link>
        </div>
      </div>
    </div>
  );
}
