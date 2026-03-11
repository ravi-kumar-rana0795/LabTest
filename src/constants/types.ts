import { TestItem } from "./hematology";

export type RecordType = {
    id:string;
    patientName:string;
    ageSex:string;
    referredBy:string;
    reportingTime:string;
    labRefNo:string;
    patientId:string;
    tests: TestItem[];
    createdAt: string;
};