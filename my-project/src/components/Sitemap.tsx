import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SitemapItem {
  title: string;
  path: string;
  children?: SitemapItem[];
}

const sitemapData: SitemapItem[] = [
  {
    title: "首页",
    path: "/",
  },
  {
    title: "功能预览",
    path: "/preview",
  },
  {
    title: "创富机会",
    path: "/agent",
    children: [
      { title: "代理申请", path: "/agent/apply" },
      { title: "创富机会", path: "/agent/opportunity" },
    ],
  },
  {
    title: "会员中心",
    path: "/member",
  },
  {
    title: "用户投稿",
    path: "/contribute",
  },
  {
    title: "众创孵化",
    path: "/incubator",
    children: [
      { title: "提交课程", path: "/incubator/submit" },
    ],
  },
  {
    title: "客户反馈",
    path: "/feedback",
  },
  {
    title: "商务合作",
    path: "/business",
  },
  {
    title: "后台管理",
    path: "/admin",
    children: [
      { title: "内容抓取", path: "/admin/crawler" },
      { title: "课程审核", path: "/admin/courses" },
      { title: "结算管理", path: "/admin/settlement" },
      { title: "版权管理", path: "/admin/copyright" },
      { title: "文章管理", path: "/admin/article" },
      { title: "反馈管理", path: "/admin/feedback" },
    ],
  },
  {
    title: "登录/注册",
    path: "/login",
    children: [
      { title: "用户登录", path: "/login" },
      { title: "用户注册", path: "/register" },
      { title: "管理员登录", path: "/admin/login" },
      { title: "代理登录", path: "/agent/login" },
    ],
  },
];

function SitemapNode({ item, level = 0 }: { item: SitemapItem; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(level < 1);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className={cn("ml-4", level > 0 && "border-l border-gray-200 pl-4")}>
      <div className="flex items-center py-2">
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 text-gray-500 hover:text-[#001F3F]"
          >
            <i className={`fa-solid fa-chevron-${isExpanded ? "down" : "right"} text-xs`}></i>
          </button>
        )}
        <Link
          to={item.path}
          className={cn(
            "text-[#001F3F] hover:text-[#FFD700] transition-colors",
            level === 0 ? "font-medium" : "font-normal"
          )}
        >
          {item.title}
        </Link>
      </div>
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {item.children?.map((child, index) => (
            <SitemapNode key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sitemap() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-[#001F3F] mb-6">网站地图</h1>
      <div className="space-y-2">
        {sitemapData.map((item, index) => (
          <SitemapNode key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
