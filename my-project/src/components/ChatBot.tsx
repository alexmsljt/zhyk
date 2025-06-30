import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// 常见问题数据集
const FAQ_DATA = [
  {
    question: "如何成为会员？",
    answer: "您可以在会员中心页面选择会员等级并完成支付，即可升级为会员。"
  },
  {
    question: "会员有哪些特权？",
    answer: "会员享有更多内容访问权限、更高下载次数和专属客服支持。"
  },
  {
    question: "如何成为代理？",
    answer: "请访问代理中心页面，提交代理申请并通过审核后即可成为代理。"
  },
  {
    question: "代理有哪些收益？",
    answer: "代理可获得销售分成、下级代理提成和平台专属资源支持。"
  },
  {
    question: "如何投稿内容？",
    answer: "登录后访问用户投稿页面，填写内容信息并提交审核。"
  },
  {
    question: "投稿能获得什么？",
    answer: "通过审核的内容可获得积分奖励，积分可用于兑换付费内容。"
  }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean}>>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 处理发送消息
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // 模拟AI回复
    setTimeout(() => {
      const faqMatch = FAQ_DATA.find(item => 
        inputValue.toLowerCase().includes(item.question.toLowerCase())
      );
      
      const botMessage = {
        text: faqMatch 
          ? faqMatch.answer 
          : "您好！我是智汇云库客服助手。您可以询问关于会员、代理、投稿等方面的问题。",
        isUser: false
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  // 处理常见问题点击
  const handleFAQClick = (question: string) => {
    setInputValue(question);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 聊天窗口 */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-t-xl shadow-xl flex flex-col border border-gray-200">
          {/* 标题栏 */}
          <div className="bg-[#001F3F] text-white p-3 rounded-t-xl flex justify-between items-center">
            <h3 className="font-bold flex items-center">
              <i className="fa-solid fa-robot mr-2"></i>
              智汇云库客服助手
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
          
          {/* 消息区域 */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center text-gray-500">
                <i className="fa-solid fa-comments text-4xl mb-3 text-[#001F3F]/50"></i>
                <p>您好！我是智汇云库客服助手</p>
                <p>请问有什么可以帮您？</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex",
                      msg.isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "max-w-[80%] p-3 rounded-lg",
                        msg.isUser 
                          ? "bg-[#001F3F] text-white rounded-tr-none" 
                          : "bg-white border border-gray-200 rounded-tl-none"
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* 输入区域 */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F]"
                placeholder="输入您的问题..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#001F3F] text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition-opacity"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
            
            {/* 常见问题快捷入口 */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {FAQ_DATA.slice(0,4).map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleFAQClick(faq.question)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-[#001F3F] px-2 py-1 rounded truncate transition-colors"
                  title={faq.question}
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* 浮动按钮 */}
      <button
        id="chatbot-button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            toast.success("客服助手已就绪", {
              position: "bottom-right"
            });
          }
        }}
        className="w-14 h-14 bg-[#001F3F] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-all transform hover:scale-110"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-xl"></i>
        ) : (
          <i className="fa-solid fa-comment-dots text-xl"></i>
        )}
      </button>
    </div>
  );
}
