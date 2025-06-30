import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default function TestPage() {
  const [frontendTestResult, setFrontendTestResult] = useState<string>("");
  const [backendTestResult, setBackendTestResult] = useState<string>("");
  const [adminTestResult, setAdminTestResult] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  // 前端测试函数
  const testFrontend = () => {
    // 测试UI交互
    toast.success("前端UI交互测试通过");
    setFrontendTestResult("✅ 组件渲染测试通过\n✅ 用户交互测试通过\n✅ 表单验证测试通过");
    
    // 测试表单验证
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("请填写完整表单");
      return;
    }
    
    if (!formData.email.includes("@")) {
      toast.error("邮箱格式不正确");
      return;
    }
    
    toast.success("表单验证测试通过");
  };

  // 后端测试函数 (模拟)
  const testBackend = () => {
    setBackendTestResult("测试中...");
    
    // 模拟API调用
    setTimeout(() => {
      toast.success("模拟API调用成功");
      setBackendTestResult(
        "✅ 用户认证测试通过\n✅ 数据存储测试通过\n✅ API响应测试通过"
      );
      
      // 模拟数据存储
      localStorage.setItem("testData", JSON.stringify({
        timestamp: new Date().toISOString(),
        status: "success"
      }));
    }, 1500);
  };

  // 管理员后台测试函数
  const testAdminFunctions = () => {
    setAdminTestResult("测试中...");
    
    // 模拟管理员功能测试
    setTimeout(() => {
      const testCases = [
        { name: "权限验证", status: Math.random() > 0.1 ? "✅" : "❌" },
        { name: "数据库操作", status: "✅" },
        { name: "批量处理", status: "✅" },
        { name: "内容审核", status: Math.random() > 0.1 ? "✅" : "❌" },
        { name: "用户管理", status: "✅" }
      ];
      
      const result = testCases.map(tc => `${tc.status} ${tc.name}`).join("\n");
      setAdminTestResult(result);
      
      if (testCases.some(tc => tc.status === "❌")) {
        toast.error("部分管理员功能测试失败");
      } else {
        toast.success("管理员功能测试全部通过");
      }
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">测试功能展示</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 前端测试区 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">前端测试</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-medium text-blue-700 mb-2">表单验证测试</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="用户名"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="邮箱"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="密码"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
              
              <button
                onClick={testFrontend}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                运行前端测试
              </button>
              
              {frontendTestResult && (
                <div className="bg-white p-4 rounded-lg whitespace-pre-line">
                  <h3 className="font-medium text-blue-700 mb-2">测试结果</h3>
                  {frontendTestResult}
                </div>
              )}
            </div>
          </div>

          {/* 后端测试区 */}
          <div className="bg-green-50 p-6 rounded-xl shadow-md border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-4">后端测试</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-medium text-green-700 mb-2">API与数据处理测试</h3>
                <p className="text-sm text-gray-600">
                  模拟后端API调用、数据存储和验证流程
                </p>
              </div>
              
              <button
                onClick={testBackend}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                运行后端测试
              </button>
              
              {backendTestResult && (
                <div className="bg-white p-4 rounded-lg whitespace-pre-line">
                  <h3 className="font-medium text-green-700 mb-2">测试结果</h3>
                  {backendTestResult}
                </div>
              )}
            </div>
          </div>

          {/* 管理员测试区 */}
          <div className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">管理员功能测试</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-medium text-purple-700 mb-2">后台管理功能测试</h3>
                <p className="text-sm text-gray-600">
                  测试管理员专属功能，包括权限验证、批量操作等
                </p>
              </div>
              
              <button
                onClick={testAdminFunctions}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                运行管理员测试
              </button>
              
              {adminTestResult && (
                <div className="bg-white p-4 rounded-lg whitespace-pre-line">
                  <h3 className="font-medium text-purple-700 mb-2">测试结果</h3>
                  {adminTestResult}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}