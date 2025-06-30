import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// 配置验证函数
export function validateConfig(config: Record<string, any>) {
  const requiredKeys = ['API_BASE_URL', 'AUTH_DOMAIN', 'PUBLIC_KEY'];
  const missingKeys = requiredKeys.filter(key => !config[key]);
  
  if (missingKeys.length > 0) {
    throw new Error(`缺少必要的配置项: ${missingKeys.join(', ')}`);
  }
  return true;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
