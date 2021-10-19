import { PlanType } from "./types/PlanType";

export interface Plan {
    id?: number,
    planType?: PlanType,
    price?: number,
}