import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

interface Course {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function CourseReview() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "React高级实战",
      author: "张三",
      description: "深入讲解React高级特性与最佳实践",
      price: 199,
      coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=React%E9%AB%98%E7%BA%A7%E5%AE%9E%E6%88%98&sign=78da4bd74ca6074ae54f0ae42347dba3",
      status: 'pending',
      createdAt: "2025-06-20"
    },
    {
      id: 2,
      title: "TypeScript设计模式",
      author: "李四",
      description: "使用TypeScript实现常见设计模式",
      price: 159,
      coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=TypeScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F&sign=89c64e7c1717c2461e73cc484bd399a4",
      status: 'pending',
      createdAt: "2025-06-22"
    }
  ]);

  const handleReview = (id: number, status: 'approved' | 'rejected') => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status } : course
    ));
    toast.success(`课程已${status === 'approved' ? '通过' : '拒绝'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">课程审核</h1>
          <Link 
            to="/admin" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回后台
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">待审核课程</h2>
          
          {courses.filter(c => c.status === 'pending').length === 0 ? (
            <div className="text-center py-8 text-gray-500">暂无待审核课程</div>
          ) : (
            <div className="space-y-6">
              {courses.filter(c => c.status === 'pending').map(course => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        src={course.coverImage} 
                        alt={course.title}
                        className="w-48 h-32 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#001F3F]">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">作者: {course.author}</p>
                      <p className="text-sm text-gray-500">价格: ¥{course.price}</p>
                      <p className="text-sm text-gray-500">提交时间: {course.createdAt}</p>
                      <p className="mt-2 text-gray-700 line-clamp-2">{course.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={() => handleReview(course.id, 'rejected')}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      拒绝
                    </button>
                    <button
                      onClick={() => handleReview(course.id, 'approved')}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                    >
                      通过
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mt-8">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">已审核课程</h2>
          
          {courses.filter(c => c.status !== 'pending').length === 0 ? (
            <div className="text-center py-8 text-gray-500">暂无已审核课程</div>
          ) : (
            <div className="space-y-4">
              {courses.filter(c => c.status !== 'pending').map(course => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[#001F3F]">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">作者: {course.author}</p>
                      <p className="text-sm text-gray-500">状态: 
                        <span className={`ml-1 ${
                          course.status === 'approved' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {course.status === 'approved' ? '已通过' : '已拒绝'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}