import httpRequest from "@/request/index";

interface GetWorkflowsDetailParams {
 id: string,
 workflowsId: string,
 workflowDetailId: string,
}

interface GetContractDeployDetailParams {
  id: string,
  version: string,
}

interface GetDetailLogsParams {
  workflowsId: string;
  workflowDetailId: string;
}

interface GetDetailStagelogsParams {
  id: string | number;
  workflowsId: string,
  workflowDetailId: number;
  stagename: string;
  start: number;
}

// templates-category?type=1
export function apiGetTemplates(params: GetWorkflowsDetailParams) {
  return httpRequest({
    url: `/api/templates-category`,
    method: "get",
    params: params,
  });
}

// 获取workFlows详情 workflows/:id
export function apiGetWorkflowsDetail(params: GetWorkflowsDetailParams) {
  return httpRequest({
    url: `/api/workflows/${params.workflowsId}/detail/${params.workflowDetailId}`,
    method: "get",
  });
}

// 合约列表详情  workflows/:id/details/:workflowDetailId/contract
export function apiGetWorkFlowsContract(params: GetWorkflowsDetailParams) {
  return httpRequest({
    url: `/api/workflows/${params.workflowsId}/detail/${params.workflowDetailId}/contract`,
    method: "get",
  });
}

// workflow下的check report  workflows/:id/details/:workflowDetailId/report
export function apiGetWorkFlowsReport(params: GetWorkflowsDetailParams) {
  return httpRequest({
    url: `/api/workflows/${params.workflowsId}/detail/${params.workflowDetailId}/report`,
    method: "get",
  });
}

// 获取已部署的版本列表
export function apiGetProjectsVersions(params: any) {
  return httpRequest({
    url: `/api/projects/${params.id}/versions`,
    method: "get",
  });
}

//  根据版本查询合约信息/api/projects/:id/contract/:version
export function apiGetProjectsContract(params: any) {
  // console.log(id, version)
  return httpRequest({
    url: `/api/projects/${params.id}/contract/${params.version}`,
    method: "get",
  });
}

// 获取部署详情信息 ==== 详情页
// export function apiGetContractDeployDetail(deployId: string) {
//   return httpRequest({
//     url: `/contract/deploy/${deployId}/detail`,
//     method: "get",
//   });
// }

// projects/:id/contract/deploy/detail?version=xxx
export function apiGetContractDeployDetail(params: GetContractDeployDetailParams) {
  return httpRequest({
    url: `/api/projects/${params.id}/contract/deploy/detail`,
    method: "get",
    params: { version: params.version }
  });
}

//  获取指定stage日志  /workflows/:id/detail/:workflowDetailId/logs/:stageName
export function apiGetDetailStageLogs(params: GetDetailStagelogsParams) {
  return httpRequest({
    url: `/api/workflows/${params.workflowsId}/detail/${params.workflowDetailId}/logs/${params.stagename}`,
    method: "get",
    params: { start: params.start },
  });
}

// 查看所有日志   /workflows/:id/detail/:workflowDetailId/logs
export function apiGetDetailLogs(params: GetDetailLogsParams) {
  return httpRequest({
    url: `/api/workflows/${params.workflowsId}/detail/${params.workflowDetailId}/logs`,
    method: "get",
  });
}
