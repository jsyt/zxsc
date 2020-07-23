import validator from 'validator';
import { UserDocument } from '../modules'

export interface RegisterInput extends Partial<UserDocument> {
  confirmPassword?: string
}
export interface RegisterInputValidateResult {
  errors: RegisterInput,
  valid: boolean
}

// 校验用户注册 提交数据合法性
export const validateRegisterInput = (username: string, password: string, confirmPassword: string, email: string): RegisterInputValidateResult => {
  let errors: RegisterInput = {};
  if (username == undefined || username.length == 0) {
    errors.username = "用户名不能为空";
  }
  if (password == undefined || password.length == 0) {
    errors.password = "密码不能为空";
  }
  if (confirmPassword == undefined || confirmPassword.length == 0) {
    errors.confirmPassword = "确认密码不能为空";
  }
  if (confirmPassword !== password ) {
    errors.confirmPassword = "密码不一致"
  }
  if (email == undefined || email.length == 0) {
    errors.email = "email不能为空"
  }
  if (!validator.isEmail(email)) {
    errors.email = "email 格式错误"
  }
  return { valid: Object.keys(errors).length == 0, errors };
}