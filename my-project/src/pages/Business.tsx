import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useState } from "react";
import { AuthContext } from "@/App";
import { useContext } from "react";

// 模拟从后台获取的二维码数据
const socialMediaData = [
  {
    id: 1,
    name: "微信",
    icon: "fa-brands fa-weixin",
    color: "bg-green-500",
    qrCode: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=WeChat%20QR%20Code&sign=2ede02c3694a87e492a2abf0d5ba1bd2"
  },
  {
    id: 2,
    name: "微信公众号",
    icon: "fa-brands fa-weixin",
    color: "bg-green-600",
    qrCode: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=WeChat%20Official%20Account%20QR%20Code&sign=94169e3e1dcbd755f59c0e15d768d9f4"
  },
  {
    id: 3,
    name: "微博",
    icon: "fa-brands fa-weibo",
    color: "bg-red-500",
    qrCode: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Weibo%20QR%20Code&sign=3391b3bd899f40b4b4d3b1a28315413c"
  },
  {
    id: 4,
    name: "知乎",
    icon: "fa-brands fa-zhihu",
    color: "bg-blue-500",
    qrCode: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Zhihu%20QR%20Code&sign=60934505b36b8bd56f7e4eb6f607177a"
  }
];

export default function Business() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">商务合作</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">合作方式</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-[#001F3F]/10 p-3 rounded-full mr-4">
                  <i className="fa-solid fa-ad text-[#001F3F]"></i>
                </div>
                <h3 className="text-lg font-bold text-[#001F3F]">广告投放</h3>
              </div>
              <p className="text-gray-600 mb-4">在平台展示您的广告，精准触达目标用户</p>
               <Link 
                 to="/business/ad"
                 className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors inline-block text-center"
               >
                 申请广告合作
               </Link>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-[#001F3F]/10 p-3 rounded-full mr-4">
                  <i className="fa-solid fa-file-lines text-[#001F3F]"></i>
                </div>
                <h3 className="text-lg font-bold text-[#001F3F]">内容合作</h3>
              </div>
              <p className="text-gray-600 mb-4">优质内容互换，扩大品牌影响力</p>
               <Link 
                 to="/business/content"
                 className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors inline-block text-center"
               >
                 申请内容合作
               </Link>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-[#001F3F]/10 p-3 rounded-full mr-4">
                  <i className="fa-solid fa-handshake text-[#001F3F]"></i>
                </div>
                <h3 className="text-lg font-bold text-[#001F3F]">品牌赞助</h3>
              </div>
              <p className="text-gray-600 mb-4">品牌联合营销，提升双方知名度</p>
               <Link 
                 to="/business/sponsor"
                 className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors inline-block text-center"
               >
                 申请品牌赞助
               </Link>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-[#001F3F]/10 p-3 rounded-full mr-4">
                  <i className="fa-solid fa-users text-[#001F3F]"></i>
                </div>
                <h3 className="text-lg font-bold text-[#001F3F]">渠道代理</h3>
              </div>
              <p className="text-gray-600 mb-4">成为区域代理，共享平台资源</p>
               <Link 
                 to="/business/agent"
                 className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors inline-block text-center"
               >
                 申请渠道代理
               </Link>
            </div>
          </div>
          
          {/* 联系方式与社交媒体区域 */}
          <div className="mt-6 flex flex-col md:flex-row gap-8">
          {/* 联系方式与社交媒体区域 */}
          <div className="mt-6 flex flex-col md:flex-row gap-8">
            {/* 联系方式 */}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-[#001F3F] mb-2">联系方式</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <i className="fa-solid fa-envelope text-[#001F3F] mr-2"></i>
                    <span className="text-gray-600">商务邮箱：business@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa-solid fa-phone text-[#001F3F] mr-2"></i>
                    <span className="text-gray-600">联系电话：400-123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa-solid fa-clock text-[#001F3F] mr-2"></i>
                    <span className="text-gray-600">工作时间：周一至周五 9:00-18:00</span>
                  </div>
                </div>
              </div>

            {/* 社交媒体联系方式 */}
            <div className="flex-1">
              <h4 className="text-lg font-medium text-[#001F3F] mb-3">关注我们的社交媒体</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialMediaData.map(item => (
                  <div 
                    key={item.id}
                    className="relative group"
                  >
                    <div className={`w-12 h-12 ${item.color} text-white rounded-full flex items-center justify-center text-xl cursor-pointer mx-auto transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <i className={item.icon}></i>
                    </div>
                    <div className="text-center mt-2 text-sm text-[#001F3F]">{item.name}</div>
                    
                    {/* 二维码弹窗 */}
                    <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-3 rounded-lg shadow-xl z-10 border border-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <div className="text-sm font-medium text-center mb-1 text-gray-700">{item.name}二维码</div>
                      <img 
                        src={item.qrCode} 
                        alt={`${item.name}二维码`}
                        className="w-32 h-32 object-contain"
                      />
                      <div className="text-xs text-gray-500 mt-1">扫码关注我们</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
