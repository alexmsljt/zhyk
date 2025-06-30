import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Copyright() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">版权与法律声明</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold text-[#001F3F] mb-6 border-b pb-2">知识产权声明</h2>
          <div className="prose max-w-none">
            <p className="font-medium mb-4">1. 平台内容所有权</p>
            <p className="mb-6">本平台所有原创内容（包括但不限于文章、课程、视频、图片等）的知识产权归平台及原作者所有，未经许可不得擅自使用、复制、修改或商业利用。</p>
            
            <p className="font-medium mb-4">2. 用户上传内容</p>
            <p className="mb-6">用户上传的内容应保证不侵犯任何第三方的知识产权。如因用户上传内容引发的版权纠纷，由用户承担全部责任。</p>
            
            <p className="font-medium mb-4">3. 版权保护措施</p>
            <p className="mb-6">平台采用数字水印、内容加密等技术保护知识产权。发现侵权行为，请通过客服渠道举报。</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-[#001F3F] mb-6 border-b pb-2">免责声明</h2>
          <div className="prose max-w-none">
            <p className="font-medium mb-4">1. 内容免责</p>
            <p className="mb-6">平台提供的信息资料仅供参考，不构成任何投资建议或承诺。用户应自行判断内容价值并承担使用风险。</p>
            
            <p className="font-medium mb-4">2. 交易免责</p>
            <p className="mb-6">用户与代理之间的交易属于独立商业行为，平台仅提供信息展示服务，不参与实际交易，不对交易结果负责。</p>
            
            <p className="font-medium mb-4">3. 分销责任</p>
            <p className="mb-6">代理应遵守国家法律法规，不得进行虚假宣传或违规操作。平台有权对违规代理进行处罚。</p>
            
            <p className="font-medium mb-4">4. 打赏规则</p>
            <p className="mb-6">打赏是用户自愿行为，平台不强制要求。打赏金额将转换为积分用于获取内容，平台不保证内容质量或效果。</p>
            
            <p className="font-medium mb-4">5. 法律适用</p>
            <p className="mb-6">本平台运营受中华人民共和国法律管辖。如发生争议，应协商解决；协商不成，提交平台所在地法院诉讼。</p>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fa-solid fa-exclamation-triangle text-yellow-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                重要提示：使用本平台即表示您已阅读并同意以上声明。打赏是自愿行为，平台不强制要求。如有任何疑问，请联系客服咨询。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
