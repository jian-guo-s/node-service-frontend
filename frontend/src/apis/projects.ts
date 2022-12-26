// 导入axios实例
import httpRequest from "@/request/index";

interface AddProjectsParams {
  name: string;
  type: number;
  templateUrl: string;
  frameType: string;
  userId: string;
}

interface GetProjectsParams {
  query: string;
  page: number;
  size: number;
}
//创建项目
export function apiAddProjects(params: AddProjectsParams) {
  return httpRequest({
    url: "/projects",
    method: "post",
    data: params,
  });
}
// 查询项目列表
export function apiGetProjects(params: GetProjectsParams) {
  return httpRequest({
    url: "/projects",
    method: "get",
    params: params,
  });
}
// 查询项目详情
export function apiGetProjectsDetail(id: Number) {
  return httpRequest({
    url: `/projects/${id}`,
    method: "get",
  });
}
//项目check
export function apiProjectsCheck(id: Number) {
  return httpRequest({
    url: `/projects/${id}/check`,
    method: "post",
  });
}
//项目build
export function apiProjectsBuild(id: Number) {
  return httpRequest({
    url: `/projects/${id}/build`,
    method: "post",
  });
}
