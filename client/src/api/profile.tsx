import request from './index';
import { RegisterPayload, LoginPayload } from '@/store/actions/profile';
import { AxiosResponse } from 'axios';




export function validate() {
  return request.get(`/user/validate`);
}


export function register<T>(values: RegisterPayload) {
  return request.post<T, T>(`/user/register`, values);
}


export function login<T>(values: LoginPayload) {
  return request.post<T, T>(`/user/login`, values);
}