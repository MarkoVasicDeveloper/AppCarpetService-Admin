/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export default function api(
    path: string,
    method: "get" | "post" | "patch" | "delete",
    body: Record<string, any> | undefined,
    role: "user" | "administrator" = "user"
) {
    return new Promise<ApiResponse>((resolve) => {
        const requestData = {
            method: method,
            url: path,
            baseURL: "https://washersoftware.com",
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: getToken(role),
            },
        };
        axios(requestData)
            .then((res) => responseHandler(res, resolve))
            .catch(async (err) => {
                if (err.response.status === 401) {
                    const newToken = await refreshToken(role);

                    if (!newToken) {
                        const response: ApiResponse = {
                            status: "login",
                            data: null,
                        };

                        return resolve(response);
                    }
                    console.log(newToken)
                    saveToken(role, newToken);

                    requestData.headers["Authorization"] = getToken(role);

                    return await repeatRequest(requestData, resolve);
                }

                const response: ApiResponse = {
                    status: "error",
                    data: err,
                };

                resolve(response);
            });
    });
}

export interface ApiResponse {
    status: "ok" | "error" | "login";
    data: Record<string, unknown> | null;
}

async function responseHandler(
    res: AxiosResponse<Record<string, unknown>>,
    resolve: (value: ApiResponse) => void
) {
    if (res.status < 200 || res.status >= 300) {
        const response: ApiResponse = {
            status: "error",
            data: res.data,
        };

        return resolve(response);
    }

    const response: ApiResponse = {
        status: "ok",
        data: res.data,
    };

    return resolve(response);
}

function getToken(role: "user" | "administrator"): string {
    const token = localStorage.getItem("api_token" + role);
    return "Bearer " + token;
}

export function saveToken(role: "user" | "administrator", token: string) {
    localStorage.setItem("api_token" + role, token);
}

function getRefreshToken(role: "user" | "administrator"): string {
    const token = localStorage.getItem("api_refresh_token" + role);
    return token + "";
}

export function saveRefreshToken(
    role: "user" | "administrator",
    token: string
) {
    localStorage.setItem("api_refresh_token" + role, token);
}

export function saveIdentity(role: "user" | "administrator", itentity: string) {
    localStorage.setItem("api_identity" + role, itentity);
}

export function getIdentity(role: "user" | "administrator"): string {
    const token = localStorage.getItem("api_identity" + role);
    return "Bearer " + token;
}

export function removeTokenData(role: "user" | "administrator") {
    localStorage.removeItem("api_token" + role);
    localStorage.removeItem("api_refresh_token" + role);
    localStorage.removeItem("api_identity" + role);
}

async function refreshToken(
    role: "user" | "administrator"
): Promise<string | null> {
    const path = "auth/" + role + "/refresh";
    const data = {
        token: getRefreshToken(role),
    };

    const refreshTokenRequestData: AxiosRequestConfig = {
        method: "post",
        url: path,
        baseURL: "https://washersoftware.com",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    };

    const rtr: { data: { token: string | undefined } } = await axios(
        refreshTokenRequestData
    );

    if (!rtr.data.token) {
        return null;
    }

    return rtr.data.token;
}

async function repeatRequest(
    requestData: AxiosRequestConfig,
    resolve: (value: ApiResponse) => void
) {
    axios(requestData)
        .then((res) => {
            let response: ApiResponse;

            if (res.status === 401) {
                response = {
                    status: "login",
                    data: null,
                };
            } else {
                response = {
                    status: "ok",
                    data: res.data,
                };
            }

            return resolve(response);
        })
        .catch((err) => {
            const response: ApiResponse = {
                status: "error",
                data: err,
            };

            return resolve(response);
        });
}