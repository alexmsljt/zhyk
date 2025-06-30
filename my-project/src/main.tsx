import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
// 优化错误边界组件
import ErrorBoundary from "@/components/ErrorBoundary";
import { validateConfig } from "@/lib/utils";

// 加载环境配置
const envConfig = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
  PUBLIC_KEY: import.meta.env.VITE_PUBLIC_KEY,
  // 其他配置项...
};

try {
  validateConfig(envConfig);
} catch (error) {
  console.error('配置验证失败:', error);
  // 可以在这里添加配置错误的UI展示
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);