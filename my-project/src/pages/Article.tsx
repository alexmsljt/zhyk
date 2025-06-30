import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  price: number;
  createdAt: string;
  author: string;
  previewUrl?: string;
}

interface Contribution {
  id: number;
  title: string;
  content: string;
  type: 'article' | 'video' | 'audio';
  author: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  previewUrl?: string;
}

// 免费内容数据
const freeContents = [
  {
    id: 1,
    title: "新手入门指南",
    content: "这里是免费的入门指南内容，帮助新用户快速了解平台使用方法。",
    category: "指南"
  },
  {
    id: 2,
    title: "常见问题解答",
    content: "收集了用户最常遇到的问题和解决方案，供大家参考。",
    category: "帮助"
  }
];

// 公告信息数据
const announcements = [
  {
    id: 1,
    title: "系统维护通知",
    content: "平台将于本周六凌晨2:00-4:00进行系统维护，期间可能无法访问。",
    date: "2025-06-20"
  },
  {
    id: 2,
    title: "新功能上线",
    content: "文章发布功能已升级，新增多种分类和格式支持。",
    date: "2025-06-15"
  }
];

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [formData, setFormData] = useState<Omit<Article, 'id' | 'createdAt'>>({
    title: '',
    content: '',
    category: '技术',
    price: 0,
    author: '当前用户'
  });

  // 从本地存储加载数据
  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    const savedContributions = localStorage.getItem('contributions');
    
    if (savedArticles) setArticles(JSON.parse(savedArticles));
    if (savedContributions) setContributions(JSON.parse(savedContributions));
  }, []);

  // 保存数据到本地存储
  const saveData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // 处理文章提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('请填写标题和内容');
      return;
    }

    const newArticle: Article = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      previewUrl: `https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%24%7BencodeURIComponent%28formData.title%29%7D&sign=798aef44af7334d7994e289b5e9de9c6`
    };

    setArticles(prev => {
      const newArticles = [...prev, newArticle];
      saveData('articles', newArticles);
      return newArticles;
    });
    
    setFormData({
      title: '',
      content: '',
      category: '技术',
      price: 0,
      author: '当前用户'
    });
    toast.success('文章发布成功');
  };

  // 处理投稿审核
  const handleContributionReview = (id: number, status: 'approved' | 'rejected') => {
    setContributions(prev => {
      const updated = prev.map(item => 
        item.id === id ? { ...item, status } : item
      );
      saveData('contributions', updated);
      return updated;
    });
    toast.success(`投稿已${status === 'approved' ? '通过' : '拒绝'}`);
  };

  // 处理表单变化
  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 删除文章
  const handleDelete = (id: number) => {
    setArticles(prev => {
      const newArticles = prev.filter(article => article.id !== id);
      saveData('articles', newArticles);
      return newArticles;
    });
    toast.success('文章已删除');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">内容管理</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 免费内容展示区 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#001F3F] mb-4">免费内容</h2>
            <div className="space-y-4">
              {freeContents.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-[#001F3F]">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  <p className="mt-2 text-gray-700 line-clamp-3">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 公告信息展示区 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#001F3F] mb-4">公告信息</h2>
            <div className="space-y-4">
              {announcements.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-[#001F3F]">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                  <p className="mt-2 text-gray-700 line-clamp-3">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 后端发布区域 */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-3">
            <h2 className="text-xl font-semibold text-[#001F3F] mb-4">后端发布</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="输入文章标题"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="技术">技术</option>
                  <option value="设计">设计</option>
                  <option value="营销">营销</option>
                  <option value="管理">管理</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
                  placeholder="输入文章内容"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">价格(元)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#FFD700] text-[#001F3F] px-4 py-2 rounded-md font-medium hover:bg-[#e6c200] transition-colors"
              >
                发布文章
              </button>
            </form>

            {/* 已发布文章列表 */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#001F3F] mb-4">已发布文章</h2>
              {articles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">暂无文章</div>
              ) : (
                <div className="space-y-4">
                  {articles.map(article => (
                    <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[#001F3F]">{article.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{article.category} · ¥{article.price}</p>
                          <p className="text-sm text-gray-500 mt-1">{new Date(article.createdAt).toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <p className="mt-2 text-gray-700 line-clamp-2">{article.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 用户投稿审核 */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#001F3F] mb-4">用户投稿审核</h2>
              {contributions.filter(c => c.status === 'pending').length === 0 ? (
                <div className="text-center py-8 text-gray-500">暂无待审核投稿</div>
              ) : (
                <div className="space-y-4">
                  {contributions.filter(c => c.status === 'pending').map(contribution => (
                    <div key={contribution.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[#001F3F]">{contribution.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">作者: {contribution.author}</p>
                          <p className="text-sm text-gray-500 mt-1">类型: {contribution.type}</p>
                          <p className="text-sm text-gray-500 mt-1">积分: +{contribution.points}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleContributionReview(contribution.id, 'approved')}
                            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                          >
                            通过
                          </button>
                          <button
                            onClick={() => handleContributionReview(contribution.id, 'rejected')}
                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                          >
                            拒绝
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700 line-clamp-2">{contribution.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}