import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "@/App";
import SponsorCard from "@/components/SponsorCard";
import Navbar from "@/components/Navbar";

const membershipPlans = [
  {
    level: 'basic',
    name: '基础会员',
    price: 99,
    features: ['所有免费内容', '每月3次打赏内容下载', '基础客服支持'],
    color: 'bg-blue-500'
  },
  {
    level: 'premium',
    name: '高级会员',
    price: 299,
    features: ['所有免费内容', '无限次打赏内容下载', '专属客服', '优先内容更新'],
    color: 'bg-[#FFD700]'
  }
];

// 会员中心赞助商数据
const memberSponsors = [
  {
    id: 5,
    name: "VIP专属服务",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=VIP%E4%B8%93%E5%B1%9E%E6%9C%8D%E5%8A%A1logo&sign=1d4d00b370913baec21ee5cd48284378",
    description: "为高级会员提供的专属优惠和服务",
    website: "https://example.com/vip",
    tier: "gold"
  },
  {
    id: 6,
    name: "会员折扣",
    logo: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E4%BC%9A%E5%91%98%E6%8A%98%E6%89%A3logo&sign=8309a6f1a0e1de7ebbd485f1bae5bc58",
    description: "享受合作商家独家会员折扣",
    website: "https://example.com/discount",
    tier: "silver"
  }
];

export default function MemberCenter() {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // 分销商功能
  const referralLink = user?.referralLink || `${window.location.origin}/register?ref=${user?.id}`;
  const referralQrCode = `https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%24%7BencodeURIComponent%28%27%E5%88%86%E9%94%80%E5%95%86%E6%8E%A8%E8%8D%90%E4%BA%8C%E7%BB%B4%E7%A0%81%27%29%7D&sign=d18524dcdecb628287f73d07deb0bcc5`;

  const handleUpgrade = (level: 'basic' | 'premium') => {
    if (!user) return;
    
    // 模拟支付流程
    toast.success(`成功升级为${level === 'basic' ? '基础' : '高级'}会员`);
    updateUser({ 
      memberLevel: level,
      isDistributor: level === 'premium',
      referralCode: level === 'premium' ? `ref_${user.id}` : '',
      referralLink: level === 'premium' ? `${window.location.origin}/register?ref=${user.id}` : ''
    });
    setSelectedPlan(null);
  };

  const handleDonate = () => {
    toast.success('感谢您的支持！打赏金额将转换为积分');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">会员中心</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">当前会员状态</h2>
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${user.memberLevel === 'free' ? 'bg-gray-400' : user.memberLevel === 'basic' ? 'bg-blue-500' : 'bg-[#FFD700]'}`}></div>
                <span className="font-medium">
                  {user.memberLevel === 'free' ? '免费用户' : user.memberLevel === 'basic' ? '基础会员' : '高级会员'}
                </span>
              </div>
              
              <div className="bg-gradient-to-r from-[#FFD700] to-[#e6c200] p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">当前积分</span>
                  <span className="text-xl font-bold">{user.credit || 0}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button 
                    className="bg-[#001F3F] text-white py-2 rounded-md hover:bg-opacity-90 transition-opacity"
                    onClick={() => toast.success('跳转至积分充值页面')}
                  >
                    充值积分 (1元=10积分)
                  </button>
                  <button 
                    className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-opacity"
                    onClick={handleDonate}
                  >
                    打赏支持
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                * 打赏是用户自愿行为，平台不强制要求
              </div>
              {user.memberLevel !== 'free' && (
                <div className="text-sm text-gray-600">
                  会员到期时间: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">请先登录查看会员状态</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-6">升级会员</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {membershipPlans.map(plan => (
              <div key={plan.level} className={`border rounded-xl p-6 ${selectedPlan === plan.level ? 'border-[#001F3F] ring-2 ring-[#001F3F]/20' : 'border-gray-200'}`}>
                <div className={`${plan.color} text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-4`}>
                  {plan.name}
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">¥{plan.price}</span>
                  <span className="text-gray-500">/年</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <i className="fa-solid fa-check text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => user ? handleUpgrade(plan.level as 'basic' | 'premium') : setSelectedPlan(plan.level)}
                  className={`w-full py-2 rounded-md font-medium ${user ? 'bg-[#001F3F] hover:bg-[#001F3F]/90 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {user ? '立即升级' : '选择此方案'}
                </button>
              </div>
            ))}
          </div>

          {!user && selectedPlan && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">请先登录或注册</h3>
              <p className="text-sm text-gray-600 mb-4">选择会员方案后需要登录账号才能完成支付</p>
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  登录
                </Link>
                <Link 
                  to="/register" 
                  className="bg-[#FFD700] text-[#001F3F] px-4 py-2 rounded-md hover:bg-[#e6c200] transition-colors"
                >
                  注册
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

         {/* 会员专属赞助商展示 */}
         <div className="container mx-auto px-4">
           <div className="bg-white p-6 rounded-xl shadow-md mb-6">
             <h2 className="text-xl font-semibold text-[#001F3F] mb-6">会员专属优惠</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {memberSponsors.map(sponsor => (
                 <SponsorCard key={sponsor.id} sponsor={sponsor} />
               ))}
             </div>
           </div>
           
            {/* 内容创作入口 */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h2 className="text-xl font-semibold text-[#001F3F] mb-4">内容创作</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">提交课程</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    将您的专业知识转化为课程，获得持续收益
                  </p>
                  {user ? (
                    <Link 
                      to="/member/submit-course" 
                      className="inline-block bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      <i className="fa-solid fa-plus mr-2"></i>
                      提交新课程
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        toast.error('请先登录');
                        navigate('/login');
                      }}
                      className="inline-block bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      <i className="fa-solid fa-plus mr-2"></i>
                      提交新课程
                    </button>
                  )}
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-800 mb-2">投稿内容</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    分享您的知识，审核通过后可获得积分奖励
                  </p>
                  <Link 
                    to="/member/submit-contribution" 
                    className="inline-block bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                    提交投稿
                  </Link>
                </div>
              </div>
            </div>
         </div>


       {/* 底部"加入创富机会"按钮 - 优化动画性能 */}
       <div className="sticky bottom-0 bg-white py-6 px-4 shadow-lg border-t border-gray-200">
         <div className="container mx-auto">
           <div className="relative group w-full">
             <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-ping">
               NEW
             </div>
             <Link 
               to="/agent/opportunity" 
               className="bg-gradient-to-r from-[#FFD700] to-[#e6c200] text-[#001F3F] px-6 py-4 rounded-xl font-extrabold hover:from-[#e6c200] hover:to-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl w-full flex items-center justify-center animate-bounce border-4 border-[#001F3F]/20 will-change-transform"
               style={{ 
                 textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                 boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
               }}
               onClick={(e) => {
                 e.preventDefault();
                 window.location.href = "/agent/opportunity";
               }}
             >
               <i className="fa-solid fa-coins mr-3 text-2xl"></i>
               <span className="text-xl">加入创富机会 →</span>
             </Link>
             <div className="absolute inset-0 bg-[#FFD700] rounded-xl blur-lg opacity-40 -z-10 group-hover:opacity-60 transition-opacity duration-300 will-change-opacity"></div>
             <div className="absolute -inset-2 rounded-xl bg-[#FFD700]/30 -z-20 group-hover:bg-[#FFD700]/50 transition-all duration-500 will-change-transform"></div>
           </div>
         </div>
       </div>
    </div>
  );
}