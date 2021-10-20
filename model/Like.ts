
import { LikeType } from "./types/LikeType";
import { Vehicle } from "./Vehicle";

export interface Like {
    id?: number,
    matched?: boolean,
    likeType?: LikeType
    vehicle?: Vehicle
}