import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { AuthContext } from "@/App";
import { useContext } from "react";

interface FormData {
  name: string;
  contact: string;
  wechat: string;
  region: string;
  experience: string;
  promotionPlan: string;
  agreement: boolean;
  agentLevel: string;
}

// 代理级别数据
const AGENT_LEVELS = [
  {
    id: "partner",
    name: "合伙人",
    requirements: {
      investment: "¥10,000起",
      sales: "月销售额¥50,000+",
      team: "需组建5人以上团队",
      commission: "最高60%分成"
    },
    benefits: [
      "最高级别佣金比例",
      "专属运营支持",
      "优先获取优质资源",
      "参与平台决策"
    ]
  },
  {
    id: "agent",
    name: "代理商",
    requirements: {
      investment: "¥5,000起",
      sales: "月销售额¥20,000+",
      team: "需组建3人以上团队",
      commission: "50%分成"
    },
    benefits: [
      "高级别佣金比例",
      "专业培训支持",
      "营销素材支持",
      "定期资源更新"
    ]
  },
  {
    id: "distributor",
    name: "分销商",
    requirements: {
      investment: "无",
      sales: "月销售额¥5,000+",
      team: "无要求",
      commission: "30-40%分成",
      note: "高级会员自动成为分销商"
    },
    benefits: [
      "灵活推广方式",
      "基础培训支持",
      "标准营销素材",
      "按需资源获取",
      "专属推荐链接和二维码",
      "自动获得分销商资格（高级会员）"
    ]
  }
];

export default function AgentApply() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    wechat: "",
    region: "",
    experience: "",
    promotionPlan: "",
    agreement: false,
    agentLevel: ""
  });

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.agreement) {
      toast.error("请先阅读并同意代理协议");
      return;
    }

    // 保存申请数据到localStorage
    const applications = JSON.parse(localStorage.getItem("agentApplications") || "[]");
    applications.push({
      ...formData,
      userId: user?.id,
      date: new Date().toISOString(),
      status: "pending"
    });
    localStorage.setItem("agentApplications", JSON.stringify(applications));

    toast.success("代理申请已提交");
    navigate("/agent");
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!selectedLevel) {
        toast.error("请选择代理级别");
        return;
      }
      // 确保代理级别数据已保存
      setFormData(prev => ({
        ...prev,
        agentLevel: selectedLevel
      }));
    }
    if (currentStep === 2) {
      if (!formData.name || !formData.contact || !formData.experience) {
        toast.error("请填写姓名、联系方式和相关经验");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const selectLevel = (levelId: string) => {
    setSelectedLevel(levelId);
    handleChange("agentLevel", levelId);
    setFormData(prev => ({
      ...prev,
      agentLevel: levelId
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">代理申请</h1>
          <Link 
            to="/agent" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回代理中心
          </Link>
        </div>

        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map(step => (
              <div 
                key={step} 
                className={`flex-1 text-center font-medium ${currentStep >= step ? "text-[#001F3F]" : "text-gray-400"}`}
              >
                步骤 {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-[#001F3F] to-[#003366] h-2.5 rounded-full" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 表单内容 */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#001F3F] mb-4">选择代理级别</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {AGENT_LEVELS.map(level => (
                  <div 
                    key={level.id}
                    onClick={() => selectLevel(level.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedLevel === level.id 
                        ? "border-[#001F3F] ring-2 ring-[#001F3F]/20 bg-[#001F3F]/5" 
                        : "border-gray-200 hover:border-[#001F3F]/50"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold text-[#001F3F]">{level.name}</h3>
                      {selectedLevel === level.id && (
                        <i className="fa-solid fa-check-circle text-green-500 ml-2"></i>
                      )}
                    </div>
                    <div className="mb-3 bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">加入条件:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li className="flex items-start">
                          <i className="fa-solid fa-coins text-yellow-500 mr-1 mt-0.5"></i>
                          <span>投资金额: {level.requirements.investment}</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fa-solid fa-chart-line text-blue-500 mr-1 mt-0.5"></i>
                          <span>销售要求: {level.requirements.sales}</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fa-solid fa-users text-purple-500 mr-1 mt-0.5"></i>
                          <span>团队要求: {level.requirements.team}</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fa-solid fa-percent text-green-500 mr-1 mt-0.5"></i>
                          <span>佣金比例: {level.requirements.commission}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-[#001F3F]/5 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">专属权益:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {level.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <i className="fa-solid fa-check text-green-500 mr-1 mt-0.5"></i>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-sm text-gray-500 mt-4">
                * 平台采用打赏模式运营，用户自愿支持创作者，平台不强制要求消费
              </div>

              <div className="pt-4">
              <button
                onClick={nextStep}
                disabled={!selectedLevel}
                className={`w-full py-2 rounded-md font-medium ${
                  selectedLevel
                    ? "bg-[#001F3F] text-white hover:bg-opacity-90" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                下一步
              </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#001F3F] mb-4">基本信息</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">真实姓名<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                    placeholder="请输入真实姓名"
                    required
                    minLength={2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">联系方式<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => handleChange("contact", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                    placeholder="手机号或邮箱"
                    required
                  />
                </div>
              </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">微信/QQ</label>
                 <input
                   type="text"
                   value={formData.wechat}
                   onChange={(e) => handleChange("wechat", e.target.value)}
                   className="w-full border border-gray-300 rounded-md px-3 py-2"
                   placeholder="方便我们与您联系"
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">所在地区</label>
                 <input
                   type="text"
                   value={formData.region}
                   onChange={(e) => handleChange("region", e.target.value)}
                   className="w-full border border-gray-300 rounded-md px-3 py-2"
                   placeholder="省/市"
                 />
               </div>
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">相关经验<span className="text-red-500">*</span></label>
               <textarea
                 value={formData.experience}
                 onChange={(e) => handleChange("experience", e.target.value)}
                 className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                 placeholder="请描述您在相关领域的经验"
                 required
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">推广计划</label>
               <textarea
                 value={formData.promotionPlan}
                 onChange={(e) => handleChange("promotionPlan", e.target.value)}
                 className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                 placeholder="请简要描述您的推广计划和方法"
               />
             </div>
             
             <div className="flex justify-between pt-4">
               <button
                 onClick={prevStep}
                 className="border border-[#001F3F] text-[#001F3F] px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
               >
                 上一步
               </button>
               <button
                 onClick={nextStep}
                 className="bg-[#001F3F] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
               >
                 下一步
               </button>
             </div>
           </div>
         )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#001F3F] mb-4">代理协议</h2>
              
              <div className="bg-gray-50 p-4 rounded-md max-h-64 overflow-y-auto mb-4">
                <h3 className="font-bold text-[#001F3F] mb-2">代理合作协议</h3>
                <p className="text-sm text-gray-600 mb-2">
                  1. 代理方需遵守平台各项规定，不得进行虚假宣传或违规操作。
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  2. 代理佣金比例为销售额的30%-60%，具体比例根据代理等级确定。
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  3. 平台有权对违规代理进行处罚，包括但不限于暂停代理资格、扣除佣金等。
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  4. 代理方需每月完成最低销售额要求，否则可能降级或取消代理资格。
                </p>
                <p className="text-sm text-gray-600">
                  5. 本协议自双方签字之日起生效，有效期一年。
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={formData.agreement}
                  onChange={(e) => handleChange("agreement", e.target.checked)}
                  className="h-4 w-4 text-[#001F3F] focus:ring-[#001F3F] border-gray-300 rounded"
                />
                <label htmlFor="agreement" className="ml-2 block text-sm text-gray-700">
                  我已阅读并同意代理合作协议
                </label>
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  onClick={prevStep}
                  className="border border-[#001F3F] text-[#001F3F] px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.agreement}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    formData.agreement 
                      ? "bg-[#FFD700] text-[#001F3F] hover:bg-[#e6c200]" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  提交申请
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}