import apisauce, { ApisauceInstance } from 'apisauce';

export interface ApiException {
    message?: string;
    code?: string;
    details?: any[];
}

// tslint:disable-next-line:no-empty
export const parseErrorFromServer = (data: any) => {
    if (typeof data === 'string') {
        // add some custom stuff in the future, i.e.
        return {
            error: data
        } as ApiException;
    }
    return {
        error: data
    } as ApiException;
};

const instance = (): ApisauceInstance => {
    const api: ApisauceInstance = apisauce.create({
        baseURL: 'http://10.0.2.2:3333',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Encoding': 'application/json'
        },
        timeout: 15000
    });

    api.axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error && error.response && error.response.status && error.response.status === 401) {
                // TODO LOGOUT
                console.log("erro na api");
                removeApiToken();
            } else {
                error.data = parseErrorFromServer(error.data);
            }
            return Promise.reject(error);
        }
    );
    return api as ApisauceInstance;
};

export const api = instance();

export const setApiToken = (token?: string) => (token ? api.setHeader('Authorization', token) : api.deleteHeader('Authorization'));
export const removeApiToken = () => api.deleteHeader('Authorization');

export default {
    api
};
