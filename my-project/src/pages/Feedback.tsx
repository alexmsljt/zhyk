import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "@/App";
import { useContext } from "react";
import Navbar from "@/components/Navbar";

export default function Feedback() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: '',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content) {
      toast.error('请填写反馈内容');
      return;
    }

    // 保存反馈数据到localStorage
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    const newFeedback = {
      id: Date.now().toString(),
      content: formData.content,
      contact: formData.contact || (user ? user.email : '匿名'),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    feedbacks.push(newFeedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    
    toast.success('反馈提交成功，感谢您的意见！');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">客户反馈</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">提交反馈</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-[#001F3F]/10 p-3 rounded-full mr-4">
                  <i className="fa-solid fa-comment-dots text-[#001F3F]"></i>
                </div>
                <h3 className="text-lg font-bold text-[#001F3F]">意见反馈</h3>
              </div>
              <p className="text-gray-600 mb-4">我们重视每一位用户的意见，您的反馈将帮助我们改进产品和服务</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    反馈内容<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                    placeholder="请详细描述您的问题或建议"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    联系方式（可选）
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                    placeholder="邮箱/电话/微信"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  提交反馈
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>我们重视每一位用户的反馈，审核通过的意见将会展示在网站首页。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
