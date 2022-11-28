// 导入axios实例
import httpRequest from "@/request/index";

interface AddAppParams {
  name: string;
  description: string;
  chain: string;
  network: string;
  account: string;
}

interface GetAppsParams {
  account: string;
  page: number;
  size: number;
}

// 获取链列表
export function apiGetChains() {
  return httpRequest({
    url: "/chains",
    method: "get",
  });
}
//获取网络列表
export function apiGetNetworks(chain: String) {
  return httpRequest({
    url: `/networks/${chain}`,
    method: "get",
  });
}

//获取app列表
export function apiGetApps(params: GetAppsParams) {
  return httpRequest({
    url: `/apps/${params.account}`,
    method: "get",
    data: params,
  });
}
// 创建app
export function apiAddApp(params: AddAppParams) {
  return httpRequest({
    url: "/app",
    method: "post",
    data: params,
  });
}

//删除app
export function apiGetPipelineByName(account: String, app_id: String) {
  return httpRequest({
    url: `/app/${account}/${app_id}`,
    method: "DELETE",
  });
}
