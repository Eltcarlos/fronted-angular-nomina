export interface Name {
  firstName: string;
  lastName: string;
  _id: string;
}

export interface UserData {
  _id: string;
  name: Name;
  email: string;
  role: string;
  createdAt: string;
}

export interface ApiResponseUser {
  success: boolean;
  message: string;
  data: UserData[];
}
