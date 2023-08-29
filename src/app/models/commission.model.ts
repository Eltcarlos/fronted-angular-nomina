export interface CommissionData {
  _id?: string;
  experienceName: string;
  target: number;
  commissionTier1: number;
  commissionTier2: number;
  commissionTier3: number;
}

export interface ApiResponseCommission {
  success: boolean;
  message: string;
  data: CommissionData[];
}
