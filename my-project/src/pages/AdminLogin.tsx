import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import { useContext } from "react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!formData.username.trim()) {
      newErrors.username = '请输入管理员账号';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少6位字符';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // 模拟管理员登录
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 设置固定测试账号 admin / admin123
      const testUsername = "admin";
      const testPassword = "admin123";
      
          if (formData.username !== testUsername || formData.password !== testPassword) {
            toast.error(`账号或密码错误，测试账号: ${testUsername}/${testPassword}`);
            return;
          }
      
      login({
        id: 'admin-1',
        username: testUsername,
        email: `${testUsername}@admin.com`,
        memberLevel: 'premium',
        balance: 0,
        points: 0,
        role: 'admin',
        permissions: ['feedback:review']
      });
      
      toast.success('管理员登录成功');
      navigate('/admin/crawler');
    } catch (error) {
      toast.error('登录失败，请检查账号密码');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] to-[#003366] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFD700]/10 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FFD700]/10 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#001F3F] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-lock text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-[#001F3F] dark:text-white">管理员登录</h2>
            <p className="text-gray-500 dark:text-gray-300 mt-2">请输入管理员凭据访问后台</p>
            
            {/* 添加显眼的测试账号提示 */}
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fa-solid fa-key text-yellow-500"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <span className="font-medium">测试账号:</span> admin / admin123
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                管理员账号
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className={`w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md pl-10 pr-3 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all`}
                     placeholder="admin (测试账号: admin)"
                />
              </div>
              {errors.username && <p className="mt-2 text-sm text-red-500 flex items-center">
                <i className="fa-solid fa-circle-exclamation mr-1"></i>
                {errors.username}
              </p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400"></i>
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md pl-10 pr-3 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all`}
                     placeholder="•••••••• (测试密码: admin123)"
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-500 flex items-center">
                <i className="fa-solid fa-circle-exclamation mr-1"></i>
                {errors.password}
              </p>}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#001F3F] to-[#003366] text-white px-4 py-3 rounded-md hover:from-[#001a33] hover:to-[#00264d] transition-all shadow-md hover:shadow-lg flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016 12H4c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  登录中...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket mr-2"></i>
                  登录管理后台
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link to="/login" className="text-[#001F3F] hover:text-[#FFD700] transition-colors font-medium flex items-center justify-center">
              <i className="fa-solid fa-arrow-left mr-2"></i>
              返回用户登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}