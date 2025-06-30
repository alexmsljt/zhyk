import { Outlet, useLocation, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/App";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { name: "内容抓取", path: "/admin/crawler", icon: "fa-solid fa-spider" },
  { name: "课程审核", path: "/admin/courses", icon: "fa-solid fa-clipboard-check" },
  { name: "结算管理", path: "/admin/settlement", icon: "fa-solid fa-money-bill-wave" },
  { name: "版权管理", path: "/admin/copyright", icon: "fa-solid fa-copyright" },
  { name: "文章管理", path: "/admin/article", icon: "fa-solid fa-file-lines" },
  { name: "反馈管理", path: "/admin/feedback", icon: "fa-solid fa-comment-dots" },
];

export default function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // 检查用户权限
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error("请先登录管理员账号");
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 管理后台导航栏 */}
      <div className="bg-[#001F3F] text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/admin" className="text-xl font-bold text-[#FFD700]">
                管理后台
              </Link>
              
              <nav className="hidden md:flex space-x-1">
                {adminNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                      location.pathname === item.path
                        ? "bg-[#FFD700] text-[#001F3F]"
                        : "text-white hover:bg-[#003366]"
                    )}
                  >
                    <i className={`${item.icon} mr-2`}></i>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  logout();
                  toast.success("已退出管理员账号");
                }}
                className="text-white hover:text-[#FFD700] transition-colors"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 面包屑导航和内容区域 */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Link to="/admin" className="hover:text-[#FFD700]">
            首页
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#FFD700]">
            {adminNavItems.find(item => item.path === location.pathname)?.name || '当前页面'}
          </span>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}