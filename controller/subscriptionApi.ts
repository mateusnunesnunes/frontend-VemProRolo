import { ApiResponse } from 'apisauce';
import { Subscription } from '../model/subscription';
import { api } from './index';

export namespace ISubscriptionApi {
    export const Instance = {
        isUserAllowedToLike: (): Promise<ApiResponse<boolean>> => {
            return api.get<boolean>(`/subscriptions/allowed-to-like`);
        },
        getCurrentUserSubscription: (): Promise<ApiResponse<Subscription>> => {
            return api.get(`/subscriptions`);
        }
    };
}
export default ISubscriptionApi.Instance;
export type SubscriptionApi = typeof ISubscriptionApi.Instance;