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
  user: string;
  query: string;
  page: number;
  size: number;
}

interface GetWorkflowsParams {
  type: string;
  page: number;
  size: number;
}

interface GetProjectsContractDeployParams {
  id: string,
  contractId: number,
  projectId: number,
  version: string,
  network: string,
  address: string,
}

interface apiProjectsWorkflowsDetailStopParams {
  id: string,
  workflowId: string,
  detailId: string,
}

//创建项目
export function apiAddProjects(params: AddProjectsParams) {
  return httpRequest({
    url: "/api/projects",
    method: "post",
    data: params,
  });
}
// 查询项目列表
export function apiGetProjects(params: GetProjectsParams) {
  return httpRequest({
    url: "/api/projects",
    method: "get",
    params: params,
  });
}
// 查询项目详情
export function apiGetProjectsDetail(id: String) {
  return httpRequest({
    url: `/api/projects/${id}`,
    method: "get",
  });
}
// 获取项目workflow列表 
export function apiGetProjectsWorkflows(id: String, params: GetWorkflowsParams) {
  return httpRequest({
    url: `/api/projects/${id}/workflows`,
    method: "get",
    params: params,
  });
}
//项目check
export function apiProjectsCheck(id: String) {
  return httpRequest({
    url: `/api/projects/${id}/check`,
    method: "post",
  });
}
//项目build
export function apiProjectsBuild(id: String) {
  return httpRequest({
    url: `/api/projects/${id}/build`,
    method: "post",
  });
}

//  保存部署信息
export function apiProjectsContractDeploy(params: GetProjectsContractDeployParams) {
  return httpRequest({
    url: `/api/projects/${params.id}/contract/deploy`,
    method: "post",
    data: params,
  });
}

// 停止workflows
export function apiProjectsWorkflowsStop(params: apiProjectsWorkflowsDetailStopParams) {
  return httpRequest({
    url: `/api/projects/${params.id}/workflows/${params.workflowId}/detail/${params.detailId}/stop`,
    method: "post",
    data: params,
  });
}