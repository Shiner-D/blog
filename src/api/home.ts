import { request } from "../service/request";
import { Resume, User, ArticlesResponse } from "./type";
/**
 * 获取用户详细信息
 * @returns
 */
export const resume = (): Promise<Response<Resume>> => {
  return request({
    url: "/api/resume",
    method: "get",
  });
};

/**
 * 获取用户信息
 * @returns
 */
export const info = ():Promise<Response<User>> => {
    return request({
      url: "/api/users",
      method: "get",
    });
}

/**
 * 获取文章信息
 * @returns
 */
export const articles = (): Promise<Response<ArticlesResponse>> => {
  return request({
    url: "/api/articles",
    method: "get",
  });
};