interface Response<T = any> {
  code: number;
  message: string;
  data: T; // 使用泛型支持不同的 data 类型
}

declare function $t(key: string, options?: any): string;