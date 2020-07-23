import * as actionTypes from '@/store/action-types';
import { validate } from '@/api/profile';
import { push } from "connected-react-router";
import { register, login } from '@/api/profile'
import { message } from 'antd';
import { RegisterData, LoginData } from '@/typings/response';
import { AxiosResponse } from 'axios';


export interface RegisterPayload {
  username: string;
  password: string;
  confirmPassword: string;
  email: string
}

export interface LoginPayload {
  username: string;
  password: string;
}

export default {
  validate() {
    return {
      type: actionTypes.VALIDATE,
      payload: validate()
    }
  },
  logout() {
    return (dispatch: any) => {
      sessionStorage.removeItem('access_token');
      dispatch(push('/login'));
    }
  },
  register(value: RegisterPayload) {
    return function (dispatch: any, getState: any) {
      (async function () {
        try {
          let result: RegisterData = await register<RegisterData>(value);
          if (result.success) {
            dispatch(push('/login'))
          } else {
            message.error('注册失败！')
          }
        } catch (error) {
          message.error('注册失败！')
        }
      })()
    }
  },
  login(value: LoginPayload) {
    return function (dispatch: any, getState: any) {
      (async function () {
        try {
          let result: LoginData = await login<LoginData>(value);
          if (result.success) {
            sessionStorage.setItem('access_token', result.data);
            dispatch(push('/profile'))
          } else {
            message.error('登录失败！')
          }
        } catch (error) {
          message.error('登录失败！')
        }
      })()
    }
  },
  setAvatar(avatarUrl: string) {
    return {
      type: actionTypes.SET_AVATAR,
      payload: avatarUrl
    }
  }
}