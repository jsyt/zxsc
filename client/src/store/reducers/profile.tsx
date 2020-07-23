

import { AnyAction } from 'redux';
import * as actionTypes from '@/store/action-types'
export interface User {
  id?: string;
  username: string
  email: string
  avatar: string
}
export enum LOGIN_TYPES {
  UN_VALIDATE = 'UN_VALIDATE',
  LOGINED = 'LOGINED',
  UN_LOGINED = 'UN_LOGINED'
}
export interface ProfileState {
  loginState: LOGIN_TYPES;
  user: User | null;
  error: string | null;
}

const initialState: ProfileState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
}

export default function (state: ProfileState = initialState, action: AnyAction): ProfileState {
  switch (action.type) {
    case actionTypes.VALIDATE:
      if (action.payload.success) {
        return {
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload.data,
          error: null
        }
      } else {
        return {
          loginState: LOGIN_TYPES.UN_LOGINED,
          user: null,
          error: action.payload
        }
      }

      break;
    case actionTypes.LOGOUT:
      return {
        loginState: LOGIN_TYPES.UN_LOGINED,
        user: null,
        error: null
      }
      break;
    case actionTypes.SET_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload
        }
      }
      break;
    default:
      break;
  }
  return state
}