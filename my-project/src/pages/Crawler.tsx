import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import ContentCard from "@/components/ContentCard";

interface CrawlRule {
  id: string;
  name: string;
  url: string;
  selector: string;
  frequency: string;
  lastRun?: string;
  isGlobalSearch?: boolean;
  aiRewrite?: boolean;
  schedule?: string;
  legalCheck?: boolean;
}

interface CrawledContent {
  id: string;
  title: string;
  url: string;
  content: string;
  source: string;
  crawledAt: string;
  category?: string;
  isRewritten?: boolean;
  originalSource?: string;
}

export default function Crawler() {
  const [rules, setRules] = useState<CrawlRule[]>([]);
  const [contents, setContents] = useState<CrawledContent[]>([]);
  const [newRule, setNewRule] = useState<Omit<CrawlRule, 'id'>>({
    name: '',
    url: '',
    selector: '',
    frequency: 'daily',
    isGlobalSearch: false,
    aiRewrite: true,
    schedule: '',
    legalCheck: true
  });
  const [isCrawling, setIsCrawling] = useState(false);
  const [activeTab, setActiveTab] = useState('rules');

  // 从本地存储加载规则和内容
  useEffect(() => {
    const savedRules = localStorage.getItem('crawlRules');
    const savedContents = localStorage.getItem('crawledContents');
    
    if (savedRules) setRules(JSON.parse(savedRules));
    if (savedContents) setContents(JSON.parse(savedContents));
  }, []);

  // 保存数据到本地存储
  const saveData = () => {
    localStorage.setItem('crawlRules', JSON.stringify(rules));
    localStorage.setItem('crawledContents', JSON.stringify(contents));
  };

  // 添加抓取规则
  const addRule = () => {
    if (!newRule.name || (!newRule.url && !newRule.isGlobalSearch) || !newRule.selector) {
      toast.error('请填写完整规则信息');
      return;
    }

    const rule = {
      ...newRule,
      id: Date.now().toString()
    };

    setRules([...rules, rule]);
    setNewRule({
      name: '',
      url: '',
      selector: '',
      frequency: 'daily',
      isGlobalSearch: false,
      aiRewrite: true,
      schedule: '',
      legalCheck: true
    });
    saveData();
    toast.success('规则已添加');
  };

  // 删除规则
  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    saveData();
    toast.success('规则已删除');
  };

  // 模拟AI二次创作
  const aiRewriteContent = (content: string): string => {
    const rewrites = [
      "基于原始内容，AI重新组织了语言结构，保持了核心观点但使用了不同的表达方式。",
      "通过自然语言处理技术，AI对原文进行了语义理解和重新表述。",
      "AI系统分析了原文内容，提取关键信息后生成了新的表述形式。"
    ];
    return rewrites[Math.floor(Math.random() * rewrites.length)] + "\n\n原始内容参考自: " + content;
  };

  // 模拟抓取过程
  const runCrawl = () => {
    if (rules.length === 0) {
      toast.error('请先添加抓取规则');
      return;
    }

    setIsCrawling(true);
    toast.info('开始抓取内容...');

    // 模拟抓取过程
    setTimeout(() => {
      const mockContents = rules.map(rule => {
        const baseContent = `这是从${rule.url || '全网搜索'}抓取的内容示例。选择器: ${rule.selector}`;
        const content = rule.aiRewrite ? aiRewriteContent(baseContent) : baseContent;
        
        return {
          id: Date.now().toString(),
          title: `抓取自: ${rule.name}`,
          url: rule.url || '全网搜索结果',
          content: content,
          source: rule.name,
          crawledAt: new Date().toISOString(),
          category: '未分类',
          isRewritten: rule.aiRewrite,
          originalSource: rule.url || '全网搜索'
        };
      });

      setContents([...contents, ...mockContents]);
      setRules(rules.map(rule => ({
        ...rule,
        lastRun: new Date().toISOString()
      })));
      saveData();
      setIsCrawling(false);
      toast.success(`成功抓取 ${rules.length} 条内容`);
    }, 2000);
  };

  // 删除内容
  const deleteContent = (id: string) => {
    setContents(contents.filter(content => content.id !== id));
    saveData();
    toast.success('内容已删除');
  };

  // 模拟定时发布
  const schedulePublish = (contentId: string, scheduleTime: string) => {
    const now = new Date();
    const scheduleDate = new Date(scheduleTime);
    
    if (scheduleDate <= now) {
      toast.error('请选择未来的时间');
      return;
    }

    toast.success(`内容已计划在 ${scheduleDate.toLocaleString()} 发布`);
    // 实际应用中这里会调用API设置定时任务
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#001F3F]">智能内容抓取管理</h1>
          <Link 
            to="/" 
            className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            返回首页
          </Link>
        </div>

        {/* 标签页导航 */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-2 px-4 font-medium ${activeTab === 'rules' ? 'text-[#001F3F] border-b-2 border-[#001F3F]' : 'text-gray-500'}`}
          >
            抓取规则
          </button>
          <button
            onClick={() => setActiveTab('contents')}
            className={`py-2 px-4 font-medium ${activeTab === 'contents' ? 'text-[#001F3F] border-b-2 border-[#001F3F]' : 'text-gray-500'}`}
          >
            内容管理
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-2 px-4 font-medium ${activeTab === 'schedule' ? 'text-[#001F3F] border-b-2 border-[#001F3F]' : 'text-gray-500'}`}
          >
            定时发布
          </button>
        </div>

        {activeTab === 'rules' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 抓取规则管理 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-[#001F3F] mb-4">智能抓取规则</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">规则名称</label>
                  <input
                    type="text"
                    value={newRule.name}
                    onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="规则名称"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="globalSearch"
                    checked={newRule.isGlobalSearch}
                    onChange={(e) => setNewRule({...newRule, isGlobalSearch: e.target.checked})}
                    className="h-4 w-4 text-[#001F3F] focus:ring-[#001F3F] border-gray-300 rounded"
                  />
                  <label htmlFor="globalSearch" className="ml-2 block text-sm text-gray-700">
                    全网搜索抓取
                  </label>
                </div>
                
                {!newRule.isGlobalSearch && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">目标URL</label>
                    <input
                      type="text"
                      value={newRule.url}
                      onChange={(e) => setNewRule({...newRule, url: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="https://example.com"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">内容选择器</label>
                  <input
                    type="text"
                    value={newRule.selector}
                    onChange={(e) => setNewRule({...newRule, selector: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder=".content"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">抓取频率</label>
                  <select
                    value={newRule.frequency}
                    onChange={(e) => setNewRule({...newRule, frequency: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="hourly">每小时</option>
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="aiRewrite"
                    checked={newRule.aiRewrite}
                    onChange={(e) => setNewRule({...newRule, aiRewrite: e.target.checked})}
                    className="h-4 w-4 text-[#001F3F] focus:ring-[#001F3F] border-gray-300 rounded"
                  />
                  <label htmlFor="aiRewrite" className="ml-2 block text-sm text-gray-700">
                    AI二次创作
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="legalCheck"
                    checked={newRule.legalCheck}
                    onChange={(e) => setNewRule({...newRule, legalCheck: e.target.checked})}
                    className="h-4 w-4 text-[#001F3F] focus:ring-[#001F3F] border-gray-300 rounded"
                  />
                  <label htmlFor="legalCheck" className="ml-2 block text-sm text-gray-700">
                    内容合规性检查
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">定时发布(可选)</label>
                  <input
                    type="datetime-local"
                    value={newRule.schedule}
                    onChange={(e) => setNewRule({...newRule, schedule: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <button
                  onClick={addRule}
                  className="w-full bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  添加规则
                </button>
                
                <button
                  onClick={runCrawl}
                  disabled={isCrawling || rules.length === 0}
                  className={`w-full py-2 rounded-md font-medium ${isCrawling || rules.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FFD700] hover:bg-[#e6c200] text-[#001F3F]'}`}
                >
                  {isCrawling ? '抓取中...' : '执行抓取'}
                </button>
              </div>
              
              {rules.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-[#001F3F] mb-2">已配置规则</h3>
                  <div className="space-y-2">
                    {rules.map(rule => (
                      <div key={rule.id} className="border border-gray-200 rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{rule.name}</div>
                            <div className="text-sm text-gray-500 truncate">
                              {rule.isGlobalSearch ? "全网搜索" : rule.url}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteRule(rule.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <div>选择器: {rule.selector}</div>
                          <div>频率: {rule.frequency === 'hourly' ? '每小时' : rule.frequency === 'daily' ? '每天' : '每周'}</div>
                          <div>AI创作: {rule.aiRewrite ? '开启' : '关闭'}</div>
                          {rule.schedule && (
                            <div>定时发布: {new Date(rule.schedule).toLocaleString()}</div>
                          )}
                        </div>
                        {rule.lastRun && (
                          <div className="text-xs text-gray-400 mt-1">
                            上次运行: {new Date(rule.lastRun).toLocaleString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 抓取内容展示 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-[#001F3F] mb-4">已抓取内容</h2>
              
              {contents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">暂无抓取内容</div>
              ) : (
                <div className="space-y-4">
                  {contents.map(content => (
                    <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[#001F3F]">{content.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">来源: {content.source}</p>
                          <p className="text-sm text-gray-500 mt-1">{new Date(content.crawledAt).toLocaleString()}</p>
                          {content.isRewritten && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                              AI创作
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => deleteContent(content.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <p className="mt-2 text-gray-700 line-clamp-3">{content.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'contents' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#001F3F] mb-4">内容管理</h2>
            
            {contents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">暂无抓取内容</div>
            ) : (
              <div className="space-y-4">
                {contents.map(content => (
                  <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-[#001F3F]">{content.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">来源: {content.source}</p>
                        <p className="text-sm text-gray-500 mt-1">原始来源: {content.originalSource}</p>
                        <p className="text-sm text-gray-500 mt-1">{new Date(content.crawledAt).toLocaleString()}</p>
                        {content.isRewritten && (
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                            AI创作
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => deleteContent(content.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <p className="mt-2 text-gray-700">{content.content}</p>
                    <div className="mt-4 flex justify-end">
                      <input
                        type="datetime-local"
                        className="border border-gray-300 rounded-md px-3 py-2 mr-2"
                        min={new Date().toISOString().slice(0, 16)}
                      />
                      <button
                        onClick={() => toast.success("内容已计划发布")}
                        className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        定时发布
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#001F3F] mb-4">定时发布管理</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fa-solid fa-exclamation-circle text-yellow-400"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    注意: 定时发布功能需要后端服务支持，当前为前端模拟实现。实际应用中请确保:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-yellow-700">
                    <li>遵守内容来源网站的版权政策</li>
                    <li>AI创作内容需标注原始来源</li>
                    <li>确保内容符合法律法规</li>
                  </ul>
                </div>
              </div>
            </div>

            {contents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">暂无可发布内容</div>
            ) : (
              <div className="space-y-4">
                {contents.map(content => (
                  <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-[#001F3F]">{content.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">来源: {content.source}</p>
                        <p className="text-sm text-gray-500 mt-1">{new Date(content.crawledAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700 line-clamp-2">{content.content}</p>
                    <div className="mt-4 flex items-center">
                      <input
                        type="datetime-local"
                        className="border border-gray-300 rounded-md px-3 py-2 mr-2 flex-1"
                        min={new Date().toISOString().slice(0, 16)}
                      />
                      <button
                        onClick={() => schedulePublish(content.id, new Date().toISOString())}
                        className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        设置定时
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}