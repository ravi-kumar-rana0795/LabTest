export type TestItem = {
      id: number;
      test: string;
      result: string;
      unit: string;
      ref: string;
      flag?: string;
    }
  | {
      id: number;
      section: string;
    };


export const data: TestItem[] = [
  {id: 1, section: "CBC" },
  { id: 2, test: "HAEMOGLOBIN", result: "", flag: "", unit: "gm/dl", ref: "13.5 - 18.0" },
  { id: 3, test: "TOTAL LEUCOCYTE COUNT", result: "", unit: "/cumm", ref: "4000 - 11000" },

  { id: 4, section: "DIFFERENTIAL LEUCOCYTE COUNT (DLC)" },

  { id: 5, test: "Neutrophils", result: "", unit: "%", ref: "40 - 75" },
  { id: 6, test: "Lymphocytes", result: "", unit: "%", ref: "20 - 40" },
  { id: 7, test: "Eosinophils", result: "", unit: "%", ref: "00 - 06" },
  { id: 8, test: "Monocytes", result: "", unit: "%", ref: "00 - 06" },
  { id: 9, test: "Basophils", result: "", unit: "%", ref: "00 - 01" },

  { id: 10, test: "PLATELET COUNT", result: "", unit: "lacs/mm3", ref: "1.50 - 4.50" },
  { id: 11, test: "RBC", result: "", unit: "million/cumm", ref: "3.5 - 5.5" },
  { id: 12, test: "HAEMATOCRIT", result: "", unit: "%", ref: "35 - 54" },
  { id: 13, test: "MCV", result: "", unit: "fl", ref: "76 - 96" },
  { id: 14, test: "MCH", result: "", unit: "pg", ref: "27.00 - 32.00" },
  { id: 15, test: "MCHC", result: "", unit: "g/dl", ref: "30.50 - 34.50" },
];