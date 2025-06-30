import React from 'react';
import { toast } from 'sonner';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 错误上报
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    toast.error(`发生错误: ${error.message}`);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // 自定义降级后的 UI
      return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md">
            <h1 className="text-2xl font-bold text-red-500 mb-4">发生错误</h1>
            <p className="mb-4">抱歉，发生了一些错误，请刷新页面重试</p>
            {this.state.error && (
              <details className="mb-4 text-left text-sm text-gray-500">
                <summary>错误详情</summary>
                <p>{this.state.error.toString()}</p>
              </details>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}