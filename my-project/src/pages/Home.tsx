import { useState, useContext, useEffect } from "react";
import SponsorCard from "@/components/SponsorCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ContentCard from "@/components/ContentCard";

const mockContents = [
  {
    id: 1,
    title: "电商运营实战",
    type: "pdf",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E7%94%B5%E5%95%86%E8%BF%90%E8%90%A5%E5%AE%9E%E6%88%98&sign=3725e3e174c27832b655282c768a40d0",
    price: 29.9,
    encrypted: true,
    category: "电商运营",
    authenticity: {
      successRate: 78,
      riskPoints: ["需要前期投入广告费", "市场竞争激烈"],
      requiresInvestment: true
    }
  },
  {
    id: 2,
    title: "AI工具大全",
    type: "video",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=AI%E5%B7%A5%E5%85%B7%E5%A4%A7%E5%85%A8&sign=faa6fc15f6d408cdee2c8dbf7cf4983d",
    price: 39.9,
    encrypted: true,
    category: "AI工具",
    authenticity: {
      successRate: 85,
      riskPoints: ["部分工具需要付费"]
    }
  },
  {
    id: 3,
    title: "自媒体起号指南",
    type: "pdf",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E8%87%AA%E5%AA%92%E4%BD%93%E8%B5%B7%E5%8F%B7%E6%8C%87%E5%8D%97&sign=181b076a652a2faf1433140346940260",
    price: 19.9,
    encrypted: true,
    category: "自媒体起号",
    authenticity: {
      successRate: 65,
      riskPoints: ["需要持续内容产出", "前期流量增长慢"]
    }
  },
  {
    id: 4,
    title: "信息差赚钱案例",
    type: "pdf",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%BF%A1%E6%81%AF%E5%B7%AE%E8%B5%9A%E9%92%B1%E6%A1%88%E4%BE%8B&sign=d4e8e9c5c93eaac63637734c254bb3d6",
    price: 49.9,
    encrypted: true,
    category: "野路子信息差",
    authenticity: {
      successRate: 72,
      riskPoints: ["时效性强", "需要快速执行"],
      requiresInvestment: true
    }
  },
  {
    id: 8,
    title: "小众平台套利方法",
    type: "pdf",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%B0%8F%E4%BC%97%E5%B9%B3%E5%8F%B0%E5%A5%97%E5%88%A9%E6%96%B9%E6%B3%95&sign=768e5e5a374ced63b652edcc522566f0",
    price: 39.9,
    encrypted: true,
    category: "野路子信息差",
    authenticity: {
      successRate: 68,
      riskPoints: ["需要多账号操作", "平台规则变化快"]
    }
  },
  {
    id: 9,
    title: "跨境信息差实战",
    type: "video",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E8%B7%A8%E5%A2%83%E4%BF%A1%E6%81%AF%E5%B7%AE%E5%AE%9E%E6%88%98&sign=236341f7f574fa71f0acbfbdb5fc0de0",
    price: 59.9,
    encrypted: true,
    category: "野路子信息差",
    authenticity: {
      successRate: 75,
      riskPoints: ["需要外语能力", "支付方式复杂"],
      requiresInvestment: true
    }
  },
  {
    id: 10,
    title: "季节性信息差指南",
    type: "article",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%AD%A3%E8%8A%82%E6%80%A7%E4%BF%A1%E6%81%AF%E5%B7%AE%E6%8C%87%E5%8D%97&sign=8b5b0a22dbb86ce212a7e6b9e9c53ad8",
    price: 29.9,
    encrypted: true,
    category: "野路子信息差",
    previewContent: "季节性信息差是每年固定时间出现的赚钱机会。本文将分析节假日、季节变换等时间节点的信息差套利方法...",
    fullContent: "季节性信息差是每年固定时间出现的赚钱机会。本文将详细分析节假日、季节变换等时间节点的信息差套利方法，包括春节礼品、夏季避暑产品、开学季学习用品等季节性需求的信息差利用..."
  },
  {
    id: 11,
    title: "免费信息差资源",
    type: "pdf",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%85%8D%E8%B4%B9%E4%BF%A1%E6%81%AF%E5%B7%AE%E8%B5%84%E6%BA%90&sign=1bf4477cff80b283c3099865abac143e",
    isFree: true,
    category: "野路子信息差",
    authenticity: {
      successRate: 60,
      riskPoints: ["竞争较激烈", "利润较低"]
    }
  },
  {
    id: 5,
    title: "TypeScript进阶",
    type: "video",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=TypeScript%E8%AF%BE%E7%A8%8B%E5%B0%81%E9%9D%A2&sign=7bf2b5c9c8fe277d5e074872e72e36ef",
    price: 35.9,
    encrypted: true,
    category: "其他"
  },
  {
    id: 6,
    title: "前端性能优化指南",
    type: "article",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E6%96%87%E7%AB%A0&sign=ab5c11eaefe6d8ec14c2e0e3014a35bd",
    price: 25.9,
    encrypted: true,
    category: "其他",
    previewContent: "前端性能优化是提升用户体验的关键。本文将介绍常见的性能优化技巧，包括代码拆分、懒加载、缓存策略等...",
    fullContent: "前端性能优化是提升用户体验的关键。本文将详细介绍常见的性能优化技巧，包括代码拆分、懒加载、缓存策略等。第一部分将探讨如何通过Webpack进行代码拆分和按需加载..."
  },
  {
    id: 7,
    title: "React Hooks最佳实践",
    type: "article",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=React%20Hooks%E6%96%87%E7%AB%A0&sign=9e39419bf514621c4597d4f24b57756a",
    price: 22.9,
    encrypted: true,
    category: "其他",
    previewContent: "React Hooks是React 16.8引入的新特性，它允许你在不编写class的情况下使用state和其他React特性...",
    fullContent: "React Hooks是React 16.8引入的新特性，它允许你在不编写class的情况下使用state和其他React特性。本文将深入探讨useState、useEffect等核心Hook的使用场景和最佳实践..."
  }
];

const agentBenefits = [
  {
    title: "高额佣金",
    description: "最高可获得50%的销售分成",
    icon: "fa-solid fa-money-bill-wave"
  },
  {
    title: "专属支持",
    description: "专业团队提供营销和技术支持",
    icon: "fa-solid fa-headset"
  },
  {
    title: "灵活政策",
    description: "自由设置价格和推广方式",
    icon: "fa-solid fa-sliders"
  }
];

const userContributions = [
  {
    id: 101,
    title: "我的React学习心得",
    type: "article",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=React%E5%AD%A6%E4%B9%A0%E5%BF%83%E5%BE%97&sign=7d8d4be347138dbf3ab9aad217dc28d8",
    author: "张三",
    points: 50,
    status: "approved"
  },
  {
    id: 102,
    title: "前端设计技巧分享",
    type: "video",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%89%8D%E7%AB%AF%E8%AE%BE%E8%AE%A1%E6%8A%80%E5%B7%A7&sign=df9b03e171ac5bf41318074ed4408963",
    author: "李四",
    points: 80,
    status: "approved"
  }
];

// 公告数据
const announcements = [
  {
    id: 1,
    title: "系统维护通知",
    content: "平台将于本周六凌晨2:00-4:00进行系统维护，期间可能无法访问",
    date: "2025-06-20"
  },
  {
    id: 2,
    title: "新功能上线",
    content: "文章发布功能已升级，新增多种分类和格式支持",
    date: "2025-06-15"
  },
  {
    id: 3,
    title: "会员福利",
    content: "高级会员本月可免费下载3篇付费文章",
    date: "2025-06-10"
  }
];

// 免费内容数据
const freeContents = [
  {
    id: 101,
    title: "新手入门指南",
    type: "pdf",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E6%89%8B%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97&sign=b11fe7aee644e05c6c89e0fbfb225c9b",
    isFree: true,
    category: "指南"
  },
  {
    id: 102,
    title: "常见问题解答",
    type: "article",
    previewUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94&sign=cc45554b318d192559142309b970ce89",
    isFree: true,
    category: "帮助"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activePreviewId, setActivePreviewId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [contentType, setContentType] = useState<"all" | "free" | "paid">("all");

  // 纯前端展示逻辑 - 获取展示内容
  const getDisplayContents = () => {
    const allContents = [...mockContents, ...freeContents];
    
    // 根据搜索词过滤
    let filtered = allContents.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // 根据内容类型过滤
    if (contentType === "free") {
      return filtered.filter(item => item.isFree);
    } else if (contentType === "paid") {
      return filtered.filter(item => !item.isFree);
    }
    return filtered;
  };

  // 公告轮播效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 处理打赏逻辑
  const handlePurchase = (item: typeof mockContents[0]) => {
    if (!user) {
      toast.error('请先登录');
      navigate('/login');
      return;
    }
    if (user.credit < item.price * 10) {
      toast.error('积分不足，请先充值');
      navigate('/member');
      return;
    }
    toast.success(`感谢您的支持！打赏${item.price * 10}积分获取"${item.title}"`);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />
      
      <div className="container mx-auto py-8 px-4">

           {/* 公告栏 - 添加动画效果 */}
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-[#001F3F] mb-6">
            <div className="flex items-center">
              <i className="fa-solid fa-bullhorn text-[#001F3F] mr-3"></i>
              <div className="overflow-hidden">
                <div className="whitespace-nowrap animate-marquee">
                  <span className="font-medium mr-4">{announcements[currentAnnouncement].title}:</span>
                  <span>{announcements[currentAnnouncement].content}</span>
                </div>
              </div>
            </div>
          </div>


        {/* 代理招募横幅 - 纯展示 */}
        <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] text-white rounded-xl p-6 mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">加入我们的合伙人创富计划</h2>
            <p className="mb-4">成为合伙人，获得丰厚佣金和独家资源</p>
            <Link 
              to="/agent/opportunity" 
              className="bg-[#FFD700] text-[#001F3F] px-6 py-2 rounded-md font-bold hover:bg-[#e6c200] transition-colors inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/agent/opportunity";
              }}
            >
              了解机会
            </Link>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#FFD700]/20 to-transparent"></div>
        </div>

        {/* 顶部搜索栏 - 纯前端交互 */}
        <div className="bg-white p-4 shadow-md mb-6 sticky top-0 z-10">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex flex-wrap gap-2">
               <button 
                 onClick={() => {
                   setSearchTerm("");
                   setContentType("all");
                 }}
                 className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                   !searchTerm && contentType === "all" ? 'bg-[#001F3F] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                 }`}
               >
                 全部内容
               </button>
               {['电商运营', 'AI工具', '自媒体起号', '野路子信息差'].map(category => (
                 <button
                   key={category}
                   onClick={() => setSearchTerm(category)}
                   className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                     searchTerm === category ? `bg-${category === '电商运营' ? 'blue' : 
                       category === 'AI工具' ? 'purple' : 
                       category === '自媒体起号' ? 'green' : 'orange'}-600 text-white` : 
                     `bg-${category === '电商运营' ? 'blue' : 
                       category === 'AI工具' ? 'purple' : 
                       category === '自媒体起号' ? 'green' : 'orange'}-100 text-${category === '电商运营' ? 'blue' : 
                       category === 'AI工具' ? 'purple' : 
                       category === '自媒体起号' ? 'green' : 'orange'}-800 hover:bg-${category === '电商运营' ? 'blue' : 
                       category === 'AI工具' ? 'purple' : 
                       category === '自媒体起号' ? 'green' : 'orange'}-200`
                   }`}
                   title={`筛选${category}内容`}
                 >
                   {category === '野路子信息差' ? (
                     <>
                       <i className="fa-solid fa-lightbulb mr-1"></i>
                       {category}
                     </>
                   ) : category}
                 </button>
               ))}
             </div>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="输入关键词搜索内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

           {/* 野路子信息差模块 - 文章形式展示 */}
           <div className="bg-white p-6 rounded-xl shadow-md mb-8">
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-semibold text-[#001F3F] flex items-center">
                 <i className="fa-solid fa-lightbulb text-[#FFD700] mr-2"></i>
                 野路子信息差
               </h2>
               <div className="flex space-x-2">
                 <button className="px-3 py-1 bg-[#001F3F]/10 text-[#001F3F] rounded-full text-sm">
                   全部
                 </button>
                 <button className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                   最新
                 </button>
                 <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                   免费
                 </button>
               </div>
             </div>
             <div className="grid grid-cols-1 gap-4">
               {mockContents
                 .filter(item => item.category === '野路子信息差')
                 .map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow h-48 overflow-hidden">
                    <div className="flex flex-row gap-4 h-full">
                      <div className="flex-shrink-0 w-1/3">
                        <img 
                          src={item.previewUrl}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#001F3F] mb-2 line-clamp-2">{item.title}</h3>
                          {item.previewContent && (
                            <p className="text-gray-600 text-sm line-clamp-2">{item.previewContent}</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={item.isFree ? "text-green-500 font-bold" : "text-[#001F3F] font-bold"}>
                            {item.isFree ? '免打赏' : `${item.price * 10}积分`}
                          </span>
                          <button
                            onClick={() => {
                              if (item.isFree) {
                                toast.success('已获取免费内容');
                              } else {
                                setActivePreviewId(item.id);
                              }
                            }}
                            className={`${item.isFree ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'} 
                              text-white px-3 py-1 rounded-md text-sm font-medium transition-all shadow-md hover:shadow-lg`}
                          >
                            {item.isFree ? '获取' : '打赏获取'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* 众创孵化模块 */}
          <div className="bg-gradient-to-r from-[#001F3F]/5 to-[#003366]/10 p-6 rounded-xl shadow-md mb-8 border border-[#001F3F]/20">
            <h2 className="text-xl font-semibold text-[#001F3F] mb-6">众创孵化计划</h2>
            <div className="relative">
              <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  {
                    id: 1,
                    title: "课程创作",
                    description: "将您的专业知识转化为课程，获得持续收益",
                    icon: "fa-solid fa-book",
                    link: "/incubator"
                  },
                  {
                    id: 2,
                    title: "内容投稿",
                    description: "分享您的知识，审核通过可获得积分奖励",
                    icon: "fa-solid fa-pen-to-square",
                    link: "/contribute"
                  },
                  {
                    id: 3,
                    title: "代理计划",
                    description: "加入代理计划，获得高额佣金分成",
                    icon: "fa-solid fa-handshake",
                    link: "/agent"
                  },
                  {
                    id: 4,
                    title: "合伙人计划",
                    description: "成为合伙人，享受最高分成比例",
                    icon: "fa-solid fa-crown",
                    link: "/agent/apply?type=partner"
                  }
                ].map(item => (
                  <div key={item.id} className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-[#001F3F]/10 rounded-full flex items-center justify-center mr-3">
                        <i className={`${item.icon} text-[#001F3F]`}></i>
                      </div>
                      <h3 className="font-bold text-[#001F3F]">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <Link 
                      to={item.link}
                      className="text-sm text-[#001F3F] hover:text-[#FFD700] transition-colors flex items-center"
                    >
                      了解更多 <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>
          </div>

         {/* 内容展示区 - 纯展示 */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-[#001F3F]">所有内容</h2>
            <div className="flex space-x-2">
              {['all', 'free', 'paid'].map(type => (
                <button
                  key={type}
                  onClick={() => setContentType(type as "all" | "free" | "paid")}
                  className={`px-4 py-2 rounded-md ${
                    contentType === type ? 
                      type === 'all' ? "bg-[#001F3F] text-white" : 
                      type === 'free' ? "bg-green-500 text-white" : "bg-[#FFD700] text-[#001F3F]"
                    : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {type === 'all' ? '全部' : type === 'free' ? '免费' : '打赏'}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            * 打赏是用户自愿行为，平台不强制要求。打赏金额将转换为积分用于获取内容。
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getDisplayContents().map(item => (
              <div key={item.id} className="relative">
                <ContentCard 
                  item={item} 
                  onPurchase={handlePurchase}
                  activePreviewId={activePreviewId}
                  setActivePreviewId={setActivePreviewId}
                  className="hover:shadow-lg transition-shadow duration-300"
                />
                {item.category && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                    item.category === '电商运营' ? 'bg-blue-100 text-blue-800' :
                    item.category === 'AI工具' ? 'bg-purple-100 text-purple-800' :
                    item.category === '自媒体起号' ? 'bg-green-100 text-green-800' :
                    item.category === '野路子信息差' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.category}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



         {/* 赞助商展示区 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-6">合作伙伴</h2>
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {sponsors.map(sponsor => (
                <div key={sponsor.id} className="flex-shrink-0 w-64">
                  <SponsorCard sponsor={sponsor} />
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* 新增广告商展示区 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-6">广告合作</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advertisers.map(advertiser => (
              <div key={advertiser.id} className="bg-blue-50 rounded-lg p-4 border border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <img 
                    src={advertiser.logo} 
                    alt={advertiser.name}
                    className="w-12 h-12 object-contain mr-3"
                  />
                  <h3 className="font-bold text-[#001F3F]">{advertiser.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{advertiser.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{advertiser.category}</span>
                  <Link 
                    to={advertiser.website} 
                    target="_blank"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    了解更多 <i className="fa-solid fa-arrow-right ml-1"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 法律声明 - 移动到页面底部 */}
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-red-500 mt-8">
          <div className="flex items-center mb-3">
            <i className="fa-solid fa-scale-balanced text-red-500 mr-3"></i>
            <h3 className="font-bold text-[#001F3F]">法律声明</h3>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. 本平台所有内容仅供学习参考，不构成任何投资建议</p>
            <p>2. 用户需自行承担使用平台内容的风险</p>
            <p>3. 禁止非法传播、复制或商业利用平台内容</p>
            <p>4. 打赏是用户自愿行为，平台不强制要求</p>
            <p>5. 平台不对用户与代理之间的交易负责</p>
            <Link to="/copyright" className="text-blue-500 hover:underline block mt-2">
              查看完整版权声明
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 赞助商数据
const sponsors = [
  {
    id: 1,
    name: "科技云",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E7%A7%91%E6%8A%80%E4%BA%91logo&sign=e739d7602d2629406ec1de8f350ffce4",
    description: "领先的云计算服务提供商，助力企业数字化转型",
    website: "https://example.com",
    tier: "platinum"
  },
  {
    id: 2,
    name: "金服金融",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E9%87%91%E8%9E%8D%E6%9C%8D%E5%8A%A1logo&sign=3bedefed467507024e8c07a026ba1eb8",
    description: "专业的金融服务平台，为您提供全方位理财方案",
    website: "https://example.com",
    tier: "gold"
  },
  {
    id: 3,
    name: "创意设计",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E5%88%9B%E6%84%8F%E8%AE%BE%E8%AE%A1logo&sign=bfd55a380854dd6893576d8657275960",
    description: "创新设计工作室，打造独特品牌形象",
    website: "https://example.com",
    tier: "silver"
  },
  {
    id: 4,
    name: "数据智能",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E6%95%B0%E6%8D%AE%E6%99%BA%E8%83%BDlogo&sign=a8ccbbf2f6289cf77c410e8aa9db066e",
    description: "大数据分析与人工智能解决方案专家",
    website: "https://example.com",
    tier: "gold"
  }
];

// 广告商数据
const advertisers = [
  {
    id: 101,
    name: "云端科技",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E4%BA%91%E7%AB%AF%E7%A7%91%E6%8A%80logo&sign=bb0ccf748fda4e7d760d87a26f3bcefb",
    description: "提供企业级云解决方案和技术支持",
    website: "https://example.com/ad1",
    category: "科技"
  },
  {
    id: 102,
    name: "数字营销",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E6%95%B0%E5%AD%97%E8%90%A5%E9%94%80logo&sign=3c67761351d4caf7651eddc68f3c1b66",
    description: "专业的数字营销服务，提升品牌影响力",
    website: "https://example.com/ad2",
    category: "营销"
  },
  {
    id: 103,
    name: "智能硬件",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E6%99%BA%E8%83%BD%E7%A1%AC%E4%BB%B6logo&sign=dca1e8ed78df445d46685e1bc699bc1c",
    description: "创新智能硬件产品研发与生产",
    website: "https://example.com/ad3",
    category: "硬件"
  }
];
