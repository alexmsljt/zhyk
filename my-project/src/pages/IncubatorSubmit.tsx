import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default function IncubatorSubmit() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technology',
    price: 99,
    coverImage: '',
    videoUrl: '',
    attachments: [] as string[],
    isOriginal: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('请填写课程标题和描述');
      return;
    }

    if (formData.price < 0) {
      toast.error('课程价格不能为负数');
      return;
    }

    setIsSubmitting(true);
    
    // 模拟提交过程
    setTimeout(() => {
      toast.success('课程提交成功，等待审核');
      setIsSubmitting(false);
      navigate('/incubator');
    }, 1500);
  };

  const generateImage = (prompt: string) => {
    const encodedPrompt = encodeURIComponent(prompt);
    return `https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%24%7BencodedPrompt%7D&sign=8f5fd81feee7fd500e66fafdde1a9609`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">提交课程</h1>
          <Link 
            to="/incubator" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回孵化计划
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程标题</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                placeholder="输入课程标题"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程描述</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                placeholder="详细描述课程内容"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">课程分类</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                >
                  <option value="technology">技术</option>
                  <option value="design">设计</option>
                  <option value="business">商业</option>
                  <option value="marketing">营销</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">课程价格(元)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">封面图片</label>
              <div className="flex items-center space-x-4">
                {formData.coverImage ? (
                  <div className="relative">
                    <img src={formData.coverImage} alt="封面预览" className="w-32 h-32 object-cover rounded-md border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, coverImage: ''})}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <i className="fa-solid fa-xmark text-xs"></i>
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                    <i className="fa-regular fa-image text-gray-400 text-2xl"></i>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setFormData({...formData, coverImage: generateImage(`课程封面: ${formData.title}`)})}
                  className="bg-[#FFD700] text-[#001F3F] px-4 py-2 rounded-md font-medium hover:bg-[#e6c200] transition-colors"
                >
                  <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
                  生成封面
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程视频URL</label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                placeholder="https://example.com/video.mp4"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程附件</label>
              <div className="space-y-2">
                {formData.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="url"
                      value={attachment}
                      onChange={(e) => {
                        const newAttachments = [...formData.attachments];
                        newAttachments[index] = e.target.value;
                        setFormData({...formData, attachments: newAttachments});
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                      placeholder="https://example.com/file.pdf"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newAttachments = [...formData.attachments];
                        newAttachments.splice(index, 1);
                        setFormData({...formData, attachments: newAttachments});
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({...formData, attachments: [...formData.attachments, '']})}
                  className="text-[#001F3F] hover:text-[#FFD700] transition-colors flex items-center mt-2"
                >
                  <i className="fa-solid fa-plus mr-2"></i>
                  添加附件
                </button>
              </div>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="isOriginal"
                checked={formData.isOriginal}
                onChange={(e) => setFormData({...formData, isOriginal: e.target.checked})}
                className="h-4 w-4 text-[#001F3F] focus:ring-[#001F3F] border-gray-300 rounded mt-1"
                required
              />
              <label htmlFor="isOriginal" className="ml-2 block text-sm text-gray-700">
                我确认这是原创内容，并同意平台审核和发布规则
              </label>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-md font-medium transition-all ${
                  isSubmitting 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#FFD700] to-[#e6c200] hover:from-[#e6c200] hover:to-[#FFD700] text-[#001F3F] shadow-md hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    提交中...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane mr-2"></i>
                    提交课程
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}