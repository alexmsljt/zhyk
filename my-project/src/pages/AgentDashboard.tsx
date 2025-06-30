import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useContext } from "react";
import { AuthContext } from "@/App";
import { toast } from "sonner";

export default function AgentDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">代理后台</h1>
          <Link 
            to="/agent" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回代理中心
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">欢迎回来，{user?.username}</h2>
          <p className="text-gray-600">这是您的代理后台，您可以在这里管理您的代理业务。</p>
        </div>
      </div>
    </div>
  );
}
