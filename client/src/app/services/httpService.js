import axios from "axios";
import { toast } from "react-toastify";
import configFile from "./config.json";
import authService from "./authService";
import localStorageSevice from "./localStorageService";
const http = axios.create({ baseURL: configFile.apiEndPoint });

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageSevice.getExpiresToken();
        const refreshToken = localStorageSevice.getRefreshToken();

        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

            if (refreshToken && expiresDate < Date.now()) {
                const data = await authService.refresh;
                localStorageSevice.setToken({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    localId: data.user_id,
                    expiresIn: data.expires_in
                });
            }
            const accessToken = localStorageSevice.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        } else {
            if (refreshToken && expiresDate < Date.now()) {
                const data = await authService.refresh;
                localStorageSevice.setToken(data);
            }
            const accessToken = localStorageSevice.getAccessToken();
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`
                };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transForm(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({ ...data[key] }))
        : data;
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transForm(res.data) };
        }
        res.data = { content: res.data };

        return res;
    },
    function (error) {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500;
        if (!expectedError) {
            console.log("Unexpected error");
            toast("Unexpected error");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete
};

export default httpService;
