import { Model } from "./Model";
import { VehicleImage } from "./VehicleImage";

export interface Vehicle {
    id?: number,
    year: number | undefined,
    color: string,
    model: Model,
    fuelType: string,
    transmissionType: string,
    category: string,
    details: string,
    images: VehicleImage[]
    kilometers: number | undefined;
    doorsNumber: number | undefined;
    price: number | null;
    isToLike: boolean;
    isForSale: boolean;
}