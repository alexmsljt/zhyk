import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// 结算记录数据类型
interface SettlementRecord {
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}

// 余额数据类型
interface BalanceData {
  available: number;
  threshold: number;
}

// 提现表单数据类型
interface WithdrawalFormData {
  paymentMethod: 'bank' | 'alipay' | 'wechat';
  bankName: string;
  accountNumber: string;
  qrCodeUrl: string;
  amount: number;
}

export default function Settlement() {
  // Mock数据
  const [balance, setBalance] = useState<BalanceData>({
    available: 150,
    threshold: 100
  });

  const [records, setRecords] = useState<SettlementRecord[]>([
    { date: "2023-01-01", amount: 120, status: "paid" },
    { date: "2023-01-08", amount: 150, status: "paid" },
    { date: "2023-01-15", amount: 180, status: "pending" }
  ]);

const [formData, setFormData] = useState<WithdrawalFormData>({
  paymentMethod: 'bank',
  bankName: '',
  accountNumber: '',
  qrCodeUrl: '',
  amount: 0
});

  // 处理提现申请
  const handleWithdrawal = () => {
    if (formData.amount < balance.threshold) {
      toast.error(`提现金额不能低于${balance.threshold}元`);
      return;
    }

    if (formData.amount > balance.available) {
      toast.error('提现金额不能超过可用余额');
      return;
    }

    // 模拟提现处理
    toast.success('提现申请已提交');
    setBalance(prev => ({
      ...prev,
      available: prev.available - formData.amount
    }));
    setRecords(prev => [
      { date: new Date().toISOString().split('T')[0], amount: formData.amount, status: 'pending' },
      ...prev
    ]);
    setFormData({
      bankName: '',
      accountNumber: '',
      amount: 0
    });
  };

  // 处理表单变化
  const handleFormChange = (field: keyof WithdrawalFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">结算中心</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        {/* 余额卡片 */}
        <div className="bg-gradient-to-r from-[#FFD700] to-[#e6c200] p-6 rounded-xl shadow-md mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-[#001F3F]">可提现余额</h2>
              <p className="text-sm text-[#001F3F]/80">提现门槛: ¥{balance.threshold}</p>
            </div>
            <div className="text-4xl font-bold text-[#001F3F]">¥{balance.available}</div>
          </div>
        </div>

        {/* 结算记录 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">结算记录</h2>
          
          <div className="space-y-4">
            {records.map((record, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-3 h-3 mt-1.5 rounded-full bg-[#FFD700]"></div>
                <div className="ml-4 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex justify-between">
                    <span className="font-medium text-[#001F3F]">{record.date}</span>
                    <span className="font-bold text-[#FFD700]">¥{record.amount}</span>
                  </div>
                  <div className={`text-sm ${
                    record.status === 'paid' ? 'text-green-500' : 
                    record.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {record.status === 'paid' ? '已支付' : 
                     record.status === 'pending' ? '处理中' : '失败'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 提现表单 */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#001F3F] mb-4">提现申请</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">支付方式</label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => handleFormChange('paymentMethod', 'bank')}
                  className={cn(
                    "py-2 rounded-md border",
                    formData.paymentMethod === 'bank' 
                      ? "bg-[#001F3F] text-white border-[#001F3F]"
                      : "bg-white text-[#001F3F] border-gray-300"
                  )}
                >
                  银行卡
                </button>
                <button
                  type="button"
                  onClick={() => handleFormChange('paymentMethod', 'alipay')}
                  className={cn(
                    "py-2 rounded-md border",
                    formData.paymentMethod === 'alipay' 
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-blue-500 border-gray-300"
                  )}
                >
                  支付宝
                </button>
                <button
                  type="button"
                  onClick={() => handleFormChange('paymentMethod', 'wechat')}
                  className={cn(
                    "py-2 rounded-md border",
                    formData.paymentMethod === 'wechat' 
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white text-green-500 border-gray-300"
                  )}
                >
                  微信
                </button>
              </div>
            </div>

            {formData.paymentMethod === 'bank' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">银行名称</label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleFormChange('bankName', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="请输入银行名称"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">银行卡号</label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => handleFormChange('accountNumber', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="请输入银行卡号"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.paymentMethod === 'alipay' ? '支付宝' : '微信'}收款码
                </label>
                <div className="flex items-center space-x-4">
                  {formData.qrCodeUrl ? (
                    <img src={formData.qrCodeUrl} alt="收款码" className="w-32 h-32 object-contain border border-gray-200" />
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                      <i className="fa-regular fa-image text-gray-400 text-2xl"></i>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      const prompt = formData.paymentMethod === 'alipay' 
                        ? '支付宝收款码，蓝色背景' 
                        : '微信收款码，绿色背景';
                      const qrCodeUrl = `https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%24%7BencodeURIComponent%28prompt%29%7D&sign=377a1d45306d195b2521e1948d89b253`;
                      handleFormChange('qrCodeUrl', qrCodeUrl);
                    }}
                    className="bg-[#FFD700] text-[#001F3F] px-4 py-2 rounded-md font-medium"
                  >
                    上传收款码
                  </button>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">提现金额</label>
              <input
                type="number"
                value={formData.amount || ''}
                onChange={(e) => handleFormChange('amount', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder={`最低提现金额¥${balance.threshold}`}
                min={balance.threshold}
                max={balance.available}
              />
            </div>
            
            <button
              onClick={handleWithdrawal}
              disabled={balance.available < balance.threshold || 
                (formData.paymentMethod !== 'bank' && !formData.qrCodeUrl)}
              className={cn(
                "w-full py-3 rounded-md font-medium transition-colors",
                balance.available >= balance.threshold && 
                (formData.paymentMethod === 'bank' || formData.qrCodeUrl)
                  ? "bg-[#FFD700] hover:bg-[#e6c200] text-[#001F3F]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              {balance.available >= balance.threshold ? '申请提现' : '余额不足'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}