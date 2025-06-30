import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { AuthContext } from "@/App";

interface Course {
  id: number;
  title: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
  revenue: number;
  createdAt: string;
}

export default function Incubator() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // 模拟课程数据
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "React高级实战",
      author: "张三",
      status: 'approved',
      revenue: 1200,
      createdAt: "2025-06-20"
    },
    {
      id: 2,
      title: "TypeScript设计模式",
      author: "李四",
      status: 'pending',
      revenue: 0,
      createdAt: "2025-06-22"
    }
  ]);

  const handleCourseClick = (courseId: number) => {
    if (!user) {
      toast.error('请先登录');
      navigate('/login');
      return;
    }
    // 检查用户是否已申请众创计划
    const hasApplied = true; // 这里应该从用户数据中获取实际状态
    if (!hasApplied) {
      toast.error('请先申请众创计划');
      navigate('/member');
      return;
    }
    navigate(`/member/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">众创孵化计划</h1>
          {user ? (
            <Link 
              to="/member/submit-course" 
              className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              提交课程
            </Link>
          ) : (
            <button 
              onClick={() => {
                toast.error('请先登录');
                navigate('/login');
              }}
              className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed"
            >
              提交课程
            </button>
          )}
        </div>

        {/* 计划说明 - 公开信息 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">计划说明</h2>
          <div className="space-y-4">
            <p>
               众创孵化计划鼓励用户提交原创课程内容，通过审核后将在平台上线销售，
               创作者可获得课程销售额的50%作为分成收入。高级会员自动成为分销商，
               可通过专属链接推广课程获得额外收益。
             </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">分成规则</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>基础分成比例：50%</li>
                <li>优质课程可获得额外奖励</li>
                <li>每月15日结算上月收入</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 用户专属区域 */}
        {user ? (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-xl font-semibold text-[#001F3F] mb-4">我的课程</h2>
            
            {courses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                您尚未提交任何课程
                <button
                  onClick={() => navigate('/member/submit-course')}
                  className="block mt-4 text-[#001F3F] hover:text-[#FFD700] transition-colors"
                >
                  立即提交第一门课程
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map(course => (
                  <div 
                    key={course.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-[#001F3F]">{course.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">提交时间: {course.createdAt}</p>
                        <p className="text-sm text-gray-500">状态: 
                          <span className={`ml-1 ${
                            course.status === 'approved' ? 'text-green-500' :
                            course.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {course.status === 'approved' ? '已上线' : 
                            course.status === 'pending' ? '审核中' : '已拒绝'}
                          </span>
                        </p>
                        {course.status === 'approved' && (
                          <p className="text-sm text-[#FFD700] font-medium mt-1">
                            累计收益: ¥{course.revenue}
                          </p>
                        )}
                      </div>
                      <i className="fa-solid fa-chevron-right text-[#001F3F]"></i>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 text-center">
            <h2 className="text-xl font-semibold text-[#001F3F] mb-4">加入众创计划</h2>
            <p className="mb-6">登录后即可查看和管理您的课程</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-[#001F3F] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              立即登录/注册
            </button>
          </div>
        )}
      </div>

      {/* 代理合伙人引导区块 */}
      <div className="mt-12 bg-gradient-to-r from-[#001F3F]/90 to-[#003366]/90 text-white rounded-xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=abstract%20gold%20network%20background&sign=a107a62032263337a60e32099ff122e0')] bg-cover opacity-10"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-bold mb-4">成为合伙人，开启创富之旅</h2>
          <p className="mb-6 max-w-2xl mx-auto">加入我们的合伙人计划，享受更高分成比例和专属资源支持</p>
          <Link 
            to="/agent/apply?type=partner"
            className="inline-block bg-gradient-to-r from-[#FFD700] to-[#e6c200] hover:from-[#e6c200] hover:to-[#FFD700] text-[#001F3F] px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <i className="fa-solid fa-crown mr-2"></i>
            了解合伙人计划
          </Link>
        </div>
      </div>
    </div>
  );
}
