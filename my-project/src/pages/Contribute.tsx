import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { AuthContext } from "@/App";

export default function Contribute() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmitClick = () => {
    if (!user) {
      toast.error('请先登录');
      navigate('/login');
      return;
    }
    navigate('/member/submit-contribution');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">用户投稿</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="w-32 h-32 bg-[#001F3F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-pen-to-square text-[#001F3F] text-4xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">分享您的知识</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            将您的专业知识转化为内容，通过审核后可获得积分奖励，积分可用于解锁付费内容或抵扣金额
          </p>
          
          <button
            onClick={handleSubmitClick}
            className="bg-gradient-to-r from-[#FFD700] to-[#e6c200] hover:from-[#e6c200] hover:to-[#FFD700] text-[#001F3F] px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <i className="fa-solid fa-paper-plane mr-2"></i>
            提交投稿
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mt-8">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">投稿规则</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>投稿内容需原创或获得授权</li>
            <li>图文内容不少于300字</li>
            <li>视频内容不少于1分钟</li>
            <li>语音内容不少于2分钟</li>
            <li>支持上传附件: MP4, MP3, MOV, AVI, WAV, PDF, DOC, PPT (最大50MB)</li>
            <li>审核通过后可获得相应积分</li>
            <li>积分可用于解锁付费内容或抵扣金额</li>
          </ul>
        </div>

        {/* 代理和合伙人引导区块 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] text-white rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-[#FFD700] text-[#001F3F] p-3 rounded-full mr-4">
                <i className="fa-solid fa-handshake text-xl"></i>
              </div>
              <h3 className="text-xl font-bold">代理计划</h3>
            </div>
            <p className="mb-6">加入我们的代理计划，获得高额佣金和专属支持</p>
            <Link 
              to="/agent/apply" 
              className="inline-block bg-[#FFD700] hover:bg-[#e6c200] text-[#001F3F] px-6 py-2 rounded-md font-bold transition-colors"
            >
              了解详情
            </Link>
          </div>

          <div className="bg-gradient-to-r from-[#FFD700] to-[#e6c200] text-[#001F3F] rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-[#001F3F] text-[#FFD700] p-3 rounded-full mr-4">
                <i className="fa-solid fa-crown text-xl"></i>
              </div>
              <h3 className="text-xl font-bold">合伙人计划</h3>
            </div>
            <p className="mb-6">成为合伙人，享受最高分成比例和专属资源</p>
            <Link 
              to="/agent/apply?type=partner" 
              className="inline-block bg-[#001F3F] hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-bold transition-colors"
            >
              立即申请
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}