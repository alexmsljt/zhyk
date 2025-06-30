import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { AuthContext } from "@/App";
import { toast } from "sonner";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('已退出登录');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#001F3F] text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link 
            to="/" 
            className="text-2xl font-bold text-[#FFD700] hover:text-[#FFD700]/90 transition-colors flex items-center"
            aria-label="首页"
          >
            <i className="fa-solid fa-book-open mr-2"></i>
            智汇云库网创平台
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-4">
          <Link 
            to="/" 
            className={`${isActive('/') ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'} transition-colors`}
          >
            首页
          </Link>

          {user?.role === 'admin' && (
            <>
              <Link 
                to="/admin/crawler" 
                className={`${isActive('/admin/crawler') ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'} transition-colors`}
              >
                内容抓取
              </Link>
              <Link 
                to="/admin/test" 
                className={`${isActive('/admin/test') ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'} transition-colors`}
              >
                测试页面
              </Link>
              <Link 
                to="/admin/courses" 
                className={`${isActive('/admin/courses') ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'} transition-colors`}
              >
                课程审核
              </Link>
            </>
          )}

          {user?.role !== 'admin' && (
            <>
              <Link 
                to="/contribute" 
                className={`${isActive('/contribute') ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'} transition-colors`}
              >
                用户投稿
              </Link>
              <Link 
                to="/incubator" 
                className={`${isActive('/incubator') ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'} transition-colors`}
              >
                众创孵化
              </Link>
               <Link 
                 to="/agent" 
                 className={`${isActive('/agent') ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'} transition-colors`}
               >
                 创富机会
              </Link>
              <Link 
                to="/member" 
                className={`${isActive('/member') ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'} transition-colors`}
              >
                会员中心
              </Link>
            </>
          )}
          {/* 找到我们 - 下拉菜单 */}
          <div className="relative group">
            <div className={`${isActive('/feedback') || isActive('/business') ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'} transition-colors flex items-center cursor-pointer py-2`}>
              <i className="fa-solid fa-location-dot mr-1"></i>找到我们
              <i className="fa-solid fa-chevron-down ml-1 text-xs"></i>
            </div>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link 
                  to="/feedback" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <i className="fa-regular fa-comment-dots mr-2"></i>用户反馈
                </Link>
              <Link 
                to="/business" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <i className="fa-solid fa-handshake mr-2"></i>商务合作
              </Link>
              <button
                onClick={() => document.querySelector('#chatbot-button')?.click()}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <i className="fa-solid fa-robot mr-2"></i>智能客服
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role !== 'admin' && (
                <div className="text-[#FFD700] font-medium">余额: ¥{user.balance}</div>
              )}
              <div className="relative group">
                <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-[#001F3F] font-bold cursor-pointer hover:bg-[#FFD700]/90 transition-colors">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                  <Link 
                    to="/member" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fa-solid fa-user mr-2"></i>个人中心
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>退出登录
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link 
                to="/login" 
                className="bg-[#001F3F] border border-[#FFD700] text-[#FFD700] px-4 py-2 rounded-md hover:bg-[#FFD700] hover:text-[#001F3F] transition-colors"
              >
                <i className="fa-solid fa-right-to-bracket mr-1"></i>登录
              </Link>
              <Link 
                to="/register" 
                className="bg-[#FFD700] text-[#001F3F] px-4 py-2 rounded-md hover:bg-[#e6c200] transition-colors"
              >
                <i className="fa-solid fa-user-plus mr-1"></i>注册
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}