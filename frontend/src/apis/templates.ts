// 导入axios实例
import httpRequest from "@/request/index";

// 查询模版分类信息
export function apiTemplatesCategory(type: String) {
  return httpRequest({
    url: "/templates-category",
    method: "get",
    params: {
      type: type
    },
  });
}
// 根据模版类型ID查询模版信息
export function apiTemplatesCategoryById(id: Number) {
  return httpRequest({
    url: `/templates-category/${id}/templates`,
    method: "get",
  });
}
// 查询模版详情
export function apiTemplatesDetail(id: Number) {
  return httpRequest({
    url: `/templates/${id}`,
    method: "get",
  });
}
