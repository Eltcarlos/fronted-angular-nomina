export interface Payroll {
  _id: string;
  commercialAdvisor: string;
  commissions: string;
  healthInsurance: number;
  pension: number;
  laborRisks: number;
  totalDeductions: number;
  totalEarnings: number;
  netSalary: number;
  PDF: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponsePayroll {
  success: boolean;
  message: string;
  data: Payroll[];
}
