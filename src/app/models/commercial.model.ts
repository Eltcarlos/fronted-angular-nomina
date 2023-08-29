export interface Advisor {
  _id?: string;
  name: {
    firstName: string;
    lastName: string;
    _id: string;
  };
  email: string;
  document: number;
  phone: number;
  numberAccount: number;
  category: string;
  experience: string;
  monthlySales: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponseCommercial {
  success: boolean;
  message: string;
  data: Advisor[];
}
