import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default function AgentOpportunity() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#001F3F] mb-4">智汇云库创富机会</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            加入我们的代理计划，开启您的被动收入之旅，最高可获得50%的销售分成
          </p>
        </div>

        {/* 机会介绍部分 */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-2xl font-bold text-[#001F3F] mb-6 border-b pb-2">为什么选择我们？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#001F3F] mb-4 flex items-center">
                <i className="fa-solid fa-star text-[#FFD700] mr-3"></i>
                优质资源
              </h3>
              <p className="text-gray-600">
                我们提供独家网创资源和课程，涵盖电商运营、自媒体变现、AI工具应用等热门领域，
                帮助您的客户快速获得成果。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#001F3F] mb-4 flex items-center">
                <i className="fa-solid fa-chart-line text-[#FFD700] mr-3"></i>
                持续增长
              </h3>
              <p className="text-gray-600">
                平台内容持续更新，紧跟市场趋势，确保您始终有最新、最有效的资源可以推广。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#001F3F] mb-4 flex items-center">
                <i className="fa-solid fa-users text-[#FFD700] mr-3"></i>
                团队支持
              </h3>
              <p className="text-gray-600">
                加入后您将获得专属客户经理支持，以及营销素材、培训资源和销售话术等全套工具。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#001F3F] mb-4 flex items-center">
                <i className="fa-solid fa-shield-halved text-[#FFD700] mr-3"></i>
                零风险启动
              </h3>
              <p className="text-gray-600">
                无需囤货、无需发货，所有产品均为数字内容，您只需专注于推广即可获得收益。
              </p>
            </div>
          </div>
        </div>

        {/* 收益展示部分 */}
        <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] text-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">您的收益潜力</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">50%</div>
              <div className="text-sm">直接销售分成比例</div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">20%</div>
              <div className="text-sm">下级代理销售提成</div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">¥10,000+</div>
              <div className="text-sm">月收入潜力</div>
            </div>
          </div>
        </div>

        {/* 加入流程部分 */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-2xl font-bold text-[#001F3F] mb-6 border-b pb-2">简单四步，开启创富</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {icon: "fa-solid fa-file-signature", title: "提交申请", desc: "填写简单申请表"},
              {icon: "fa-solid fa-phone-volume", title: "审核沟通", desc: "1个工作日内与您联系"},
              {icon: "fa-solid fa-graduation-cap", title: "培训指导", desc: "提供完整培训资料"},
              {icon: "fa-solid fa-rocket", title: "开始推广", desc: "获得专属推广链接"}
            ].map((step, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${step.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="font-bold text-[#001F3F] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 底部CTA */}
        <div className="text-center">
          <button
            onClick={() => {
              toast.success("即将跳转至代理申请页面");
              setTimeout(() => {
                window.location.href = "/agent/apply";
              }, 1000);
            }}
            className="bg-gradient-to-r from-[#FFD700] to-[#e6c200] hover:from-[#e6c200] hover:to-[#FFD700] text-[#001F3F] px-8 py-4 rounded-xl font-extrabold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <i className="fa-solid fa-handshake mr-3"></i>
            立即申请成为代理
          </button>
          <p className="text-gray-500 mt-4">已有账号？<Link to="/agent/login" className="text-[#001F3F] hover:underline">代理登录</Link></p>
        </div>
      </div>
    </div>
  );
}