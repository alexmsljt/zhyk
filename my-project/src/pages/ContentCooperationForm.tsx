import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";

export default function ContentCooperationForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    contentType: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 提交逻辑
    navigate('/business');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">内容合作申请</h1>
          <Link 
            to="/business" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回商务合作
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名/机构名称</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">联系方式</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">内容类型</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.contentType}
                onChange={(e) => setFormData({...formData, contentType: e.target.value})}
                required
              >
                <option value="">请选择</option>
                <option value="article">文章</option>
                <option value="video">视频</option>
                <option value="course">课程</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">内容描述</label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#001F3F] text-white px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              提交申请
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
