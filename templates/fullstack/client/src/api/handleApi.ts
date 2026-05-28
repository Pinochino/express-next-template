import { AxiosRequestConfig } from "axios";
import axiosClient from "./axiosClient";

interface IHandleApi extends AxiosRequestConfig {
    url: string;
    method: "GET" | "POST" | "DELETE" | "UPDATE" | "PATCH",
    data: unknown
}

export const handleApi = ({ url, method, data, ...props }: IHandleApi) => {
    return axiosClient({
        url,
        method,
        data,
        ...props
    })
}