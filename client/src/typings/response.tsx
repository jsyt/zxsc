import { User } from '@/store/reducers/profile';

export interface RegisterData {
  success: boolean;
  data: User;
}

export interface LoginData {
  success: boolean;
  data: string;
}