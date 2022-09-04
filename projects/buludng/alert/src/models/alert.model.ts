import { AlertTypesEnum } from "../enums/alert-types.enum";

export interface AlertModel {
    title: string;
    text: string;
    type: AlertTypesEnum
}