import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import { useContext } from "react";
import { toast } from "sonner";

export default function AgentLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('请输入代理账号和密码，测试账号可使用任意用户名/密码');
      return;
    }

    // 模拟代理登录
    login({
      id: 'agent-1',
      username: formData.username,
      email: `${formData.username}@agent.com`,
      memberLevel: 'basic',
      balance: 1000,
      points: 500,
      role: 'agent'
    });
    toast.success('代理登录成功');
    navigate('/agent');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#001F3F] mb-6 text-center">代理登录</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">代理账号</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="请输入代理账号"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="请输入密码"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFD700] text-[#001F3F] px-4 py-2 rounded-md font-medium hover:bg-[#e6c200] transition-colors"
          >
            登录
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          还不是代理？<Link to="/agent/apply" className="text-[#001F3F] hover:underline">申请成为代理</Link>
        </div>
      </div>
    </div>
  );
}