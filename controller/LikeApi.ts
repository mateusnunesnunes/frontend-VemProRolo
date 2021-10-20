import { ApiResponse } from 'apisauce';
import { Like } from '../model/Like';
import { api } from './index';

export namespace ILikeApi {
    export const Instance = {
        createLike: (like: Like): Promise<ApiResponse<Like>> => {
            return api.post(`/likes`, like);
        }
    };
}
export default ILikeApi.Instance;
export type LikeApi = typeof ILikeApi.Instance;