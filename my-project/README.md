# 智汇云库网创平台

[![GitHub license](https://img.shields.io/github/license/yourusername/your-repo)](https://github.com/yourusername/your-repo/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/your-repo)](https://github.com/yourusername/your-repo/stargazers)

一个基于React+TypeScript的网创资源分享平台，提供优质网络创业资源和知识。

## 功能特性

- 用户注册/登录系统
- 内容浏览与打赏功能
- 会员等级体系
- 代理分销系统
- 管理员后台
- 智能客服助手
- 内容抓取与管理

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Sonner (Toast通知)

## 快速开始

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm run dev
```

### 生产构建
```bash
pnpm run build
```

### 测试账号
- 管理员: admin/admin123
- 普通用户: 任意用户名/密码

## 项目结构

```
├── src
│   ├── components      # 公共组件
│   ├── pages           # 页面组件
│   ├── hooks           # 自定义Hook
│   ├── lib             # 工具函数
│   └── main.tsx        # 应用入口
├── public              # 静态资源
├── vite.config.ts      # Vite配置
└── tailwind.config.js  # Tailwind配置
```

## 部署指南

### Vercel部署
1. Fork本仓库
2. 登录Vercel并导入项目
3. 配置环境变量（如需）
4. 点击部署

### 本地部署
1. 克隆仓库
2. 安装依赖
3. 构建项目
4. 使用任意静态服务器部署dist目录

## 贡献指南
欢迎提交Pull Request或Issue。

## 许可证
MIT
