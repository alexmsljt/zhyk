import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  previewUrl: string;
  price: number;
  encrypted: boolean;
  isFree?: boolean;
  downloadUrl?: string;
  previewContent?: string;
  fullContent?: string;
  category?: '电商运营' | 'AI工具' | '自媒体起号' | '野路子信息差' | '其他';
  authenticity?: {
    successRate?: number;
    riskPoints?: string[];
    requiresInvestment?: boolean;
  };
}

interface ContentCardProps {
  item: ContentItem;
  onPurchase: (item: ContentItem) => void;
  activePreviewId: number | null;
  setActivePreviewId: (id: number | null) => void;
  className?: string;
}

export default function ContentCard({ 
  item, 
  onPurchase,
  activePreviewId,
  setActivePreviewId,
  className
}: ContentCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const showDialog = activePreviewId === item.id;



  const handlePreviewClick = useCallback(() => {
    // 清除任何悬停计时器
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (item.type === 'article' && item.previewContent) {
      setActivePreviewId(item.id);
    } else if (item.isFree) {
      handlePurchase();
    } else {
      setActivePreviewId(item.id);
    }
  }, [item]);

  const handlePurchase = useCallback(() => {
    try {
      if (!item) {
        toast.error('无效的内容项');
        return;
      }
      onPurchase(item);
    } catch (error) {
      toast.error('购买过程中出错');
      console.error('Purchase error:', error);
    }
  }, [item, onPurchase]);

  const handleDonate = useCallback(() => {
    try {
      toast.success('感谢您的支持！打赏金额将转换为积分');
      handlePurchase();
    } catch (error) {
      toast.error('打赏过程中出错');
      console.error('Donation error:', error);
    }
  }, [handlePurchase]);

  return (
      <div className={cn("bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5", className)}>
      <div className="relative group overflow-hidden rounded-t-lg">
        <img 
          src={item.previewUrl} 
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-300 ease-out group-hover:scale-105 will-change-transform"
          loading="lazy"
        />
        {item.encrypted && !item.isFree && (
          <div className="absolute top-2 right-2 bg-[#FFD700] text-[#001F3F] px-2 py-1 rounded-full text-xs font-bold">
            加密
          </div>
        )}
        {item.isFree && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            免费
          </div>
        )}
                    <div 
                      className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out will-change-opacity"
                      onClick={handlePreviewClick}
                      onMouseEnter={() => {
                        // 设置延迟显示预览，防止快速移动时闪烁
                        const timeout = setTimeout(() => {
                          if (item.type === 'article' && item.previewContent) {
                            setActivePreviewId(item.id);
                          }
                        }, 200);
                        setHoverTimeout(timeout);
                      }}
                      onMouseLeave={() => {
                        if (hoverTimeout) {
                          clearTimeout(hoverTimeout);
                          setHoverTimeout(null);
                        }
                        // 只有当鼠标离开整个卡片区域时才关闭预览
                        if (!showDialog) {
                          setActivePreviewId(null);
                        }
                      }}
                    >
          <div className="text-[#001F3F] font-bold bg-white/80 px-4 py-2 rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-110">
            {item.type === 'article' ? '点击预览内容' : '查看详情'}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-1 flex-wrap gap-1">
          {item.category && (
            <span className="bg-[#001F3F]/10 text-[#001F3F] text-xs px-2 py-1 rounded-full">
              {item.category}
            </span>
          )}
          {item.isFree && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              免费
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-[#001F3F] mb-2 line-clamp-2" title={item.title}>
          {item.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className={item.isFree ? "text-green-500 font-bold" : "text-[#001F3F] font-bold"}>
             {item.isFree ? '免打赏' : `${item.price * 10}积分`}
          </span>
          <button 
            onClick={handlePreviewClick}
            disabled={isPurchasing}
            className={`${item.isFree ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'} 
              text-white px-4 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isPurchasing ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                处理中...
              </>
            ) : (
              item.isFree ? '获取' : '打赏获取'
            )}
          </button>
        </div>
      </div>

      {showDialog && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
           onClick={(e) => {
             if (e.target === e.currentTarget) {
               setActivePreviewId(null);
             }
           }}
           onMouseEnter={() => setActivePreviewId(item.id)}
           onMouseLeave={() => setActivePreviewId(null)}
           onMouseDown={(e) => e.stopPropagation()} // 防止冒泡导致意外关闭


        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#001F3F] mb-4">
              {item.type === 'article' ? '文章预览' : '确认打赏'}
            </h3>
            {item.authenticity && (
              <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-[#001F3F] mb-2">课程真实性信息</h4>
                {item.authenticity.successRate && (
                  <div className="flex items-center mb-1">
                    <span className="text-sm mr-2">学员成功率:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${item.authenticity.successRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm ml-2">{item.authenticity.successRate}%</span>
                  </div>
                )}
                {item.authenticity.riskPoints && item.authenticity.riskPoints.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm font-medium">潜在风险:</span>
                    <ul className="list-disc pl-5 text-sm">
                      {item.authenticity.riskPoints.map((risk, i) => (
                        <li key={i}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.authenticity.requiresInvestment && (
                  <div className="mt-2 text-sm text-yellow-600">
                    <i className="fa-solid fa-exclamation-triangle mr-1"></i>
                    需要额外资金投入
                  </div>
                )}
              </div>
            )}

            {item.type === 'article' && item.previewContent && (
              <div className="mb-4">
                <p className="text-gray-700 mb-4">{item.previewContent}</p>
                <div className="text-sm text-gray-500 text-center py-2 border-t border-b border-gray-200 my-4">
                  —— 预览结束，完整内容需打赏后查看 ——
                </div>
              </div>
            )}
            
            <p className="mb-6">确定要打赏获取"{item.title}"吗？</p>
            <div className="text-xs text-gray-500 mb-4">
              * 打赏是用户自愿行为，平台不强制要求
            </div>
             <div className="flex flex-wrap justify-end gap-2 sm:gap-4">
               <button 
                 onClick={(e) => {
                   e.stopPropagation();
                   setActivePreviewId(null);
                 }}
                 className="min-w-[80px] px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
               >
                 取消
               </button>
               <button 
                 onClick={handleDonate}
                 disabled={isPurchasing}
                 className="min-w-[100px] bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isPurchasing ? (
                   <>
                     <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                     处理中...
                   </>
                 ) : (
                   item.isFree ? '立即获取' : '打赏获取'
                 )}
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}