// 导入axios实例
import httpRequest from "@/request/index";

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
