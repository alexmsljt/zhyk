import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import { useContext } from "react";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
      isValid = false;
    } else if (formData.username.length < 4) {
      newErrors.username = '用户名至少4个字符';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少6个字符';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // 模拟注册和登录
    login({
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      memberLevel: 'free',
      balance: 0,
      points: 0,
      role: 'user'
    });
    
    toast.success('注册成功');
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#001F3F] mb-6 text-center">用户注册</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
              placeholder="至少4个字符"
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
              placeholder="example@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
              placeholder="至少6个字符"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2`}
              placeholder="再次输入密码"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            注册
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          已有账号？<Link to="/login" className="text-[#FFD700] hover:underline">立即登录</Link>
        </div>
      </div>
    </div>
  );
}