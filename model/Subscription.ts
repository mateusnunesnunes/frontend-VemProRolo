import { Plan } from "./Plan";

export interface Subscription {
    id?: number,
    active?: boolean,
    plan?: Plan
}