import { Routes, Route, Link, useLocation } from "react-router-dom";
import AgentDashboard from "@/pages/AgentDashboard";
import FeaturePreview from "@/pages/FeaturePreview";
import Register from "@/pages/Register";
import { createContext, useState, useEffect, useCallback } from "react";
import AdCooperationForm from "@/pages/AdCooperationForm";
import ContentCooperationForm from "@/pages/ContentCooperationForm";
import SponsorCooperationForm from "@/pages/SponsorCooperationForm";
import AgentCooperationForm from "@/pages/AgentCooperationForm";
import Home from "@/pages/Home";
// 添加错误边界组件
import ErrorBoundary from "@/components/ErrorBoundary";
import Agent from "@/pages/Agent";
import AgentApply from "@/pages/AgentApply";
import AgentOpportunity from "@/pages/AgentOpportunity";
import Copyright from "@/pages/Copyright";
import Settlement from "@/pages/Settlement";
import { Toaster } from 'sonner';
import ChatBot from "@/components/ChatBot";
import Article from "@/pages/Article";
import MemberCenter from "@/pages/MemberCenter";
import TestPage from "@/pages/TestPage";
import Crawler from "@/pages/Crawler";
import Contribute from "@/pages/Contribute";
import UserLogin from "@/pages/UserLogin";
import AdminLogin from "@/pages/AdminLogin";
import AgentLogin from "@/pages/AgentLogin";
import Incubator from "@/pages/Incubator";
import IncubatorSubmit from "@/pages/IncubatorSubmit";
import CourseReview from "@/pages/CourseReview";
import FeedbackManagement from "@/pages/FeedbackManagement";
import AdminLayout from "@/components/AdminLayout";
import Sitemap from "@/components/Sitemap";
import { toast } from "sonner";
import Feedback from "@/pages/Feedback";
import Business from "@/pages/Business";

interface UserData {
  id: string;
  username: string;
  email: string;
  memberLevel: 'free' | 'basic' | 'premium';
  balance: number;
  points: number;
  role: 'user' | 'admin' | 'agent';
  credit: number;
  agreeTerms: boolean;
  isDistributor: boolean; // 是否是分销商
  referralCode: string; // 分销商专属推荐码
  referralLink: string; // 分销商专属链接
}

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null as UserData | null,
  login: (userData: UserData) => {},
  logout: () => {},
  updateUser: (userData: Partial<UserData>) => {},
});

export default function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null as UserData | null,
  });

  const login = useCallback((userData: UserData) => {
    try {
      // 新增用户协议检查
      if (!userData.agreeTerms) {
        toast.error('请先阅读并同意用户协议和隐私政策');
        return;
      }
      
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthState({ isAuthenticated: true, user: userData });
      toast.success(`欢迎回来，${userData.username}`);
    } catch (error) {
      toast.error('登录状态保存失败');
      console.error('LocalStorage error:', error);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('user');
      setAuthState({ isAuthenticated: false, user: null });
      toast.success('已退出登录');
    } catch (error) {
      toast.error('退出登录失败');
      console.error('LocalStorage error:', error);
    }
  }, []);

  const updateUser = useCallback((userData: Partial<UserData>) => {
    if (authState.user) {
      try {
        const updatedUser = { ...authState.user, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAuthState({ ...authState, user: updatedUser });
      } catch (error) {
        toast.error('用户信息更新失败');
        console.error('LocalStorage error:', error);
      }
    }
  }, [authState]);

  // 初始化时检查本地存储
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          // 验证用户数据格式
          if (user && user.id && user.username) {
            setAuthState({ isAuthenticated: true, user });
          } else {
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('user');
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        login,
        logout,
        updateUser,
      }}
    >
      <Toaster position="top-center" />
      <Routes>
        {/* 功能预览 */}
        <Route path="/preview" element={<FeaturePreview />} />

        {/* 前台路由 */}
        <Route path="/" element={<Home />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/agent/apply" element={<AgentApply />} />
        <Route path="/agent/dashboard" element={<AgentDashboard />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/opportunity" element={<AgentOpportunity />} />
        <Route path="/member" element={<MemberCenter />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/incubator" element={<Incubator />} />
        <Route path="/member/submit-course" element={<IncubatorSubmit />} />
        <Route path="/member/courses/:id" element={<IncubatorSubmit />} />
        <Route path="/member/submit-contribution" element={<Contribute />} />

        <Route path="/business" element={<Business />} />
        <Route path="/business/ad" element={<AdCooperationForm />} />
        <Route path="/business/content" element={<ContentCooperationForm />} />
        <Route path="/business/sponsor" element={<SponsorCooperationForm />} />
        <Route path="/business/agent" element={<AgentCooperationForm />} />
        <Route path="/copyright" element={<Copyright />} />
        
        {/* 登录页面 */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/agent/login" element={<AgentLogin />} />

        {/* 后台管理路由 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="crawler" element={<Crawler />} />
          <Route path="test" element={<TestPage />} />
          <Route path="courses" element={<CourseReview />} />
          <Route path="settlement" element={<Settlement />} />
          <Route path="article" element={<Article />} />
          <Route path="feedback" element={<FeedbackManagement />} />
        </Route>

        {/* 前台反馈页面 */}
        <Route path="/feedback" element={<Feedback />} />

        {/* 404 页面 */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">页面未找到</p>
            <Link 
              to="/" 
              className="bg-[#001F3F] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              返回首页
            </Link>
          </div>
        } />
      </Routes>
      <ChatBot />
    </AuthContext.Provider>
  );
}