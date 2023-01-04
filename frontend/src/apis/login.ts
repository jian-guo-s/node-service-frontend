import httpRequest from "@/request/index";

interface AddLoginParams {
  code: string,
  clientId: string,
}

// login
export function apiLogin(params: AddLoginParams) {
  return httpRequest({
    url: "/api/login",
    method: "post",
    data: params,
  });
}