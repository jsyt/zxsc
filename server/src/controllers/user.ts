

import { Request, Response, NextFunction } from 'express'
import { User, UserDocument } from '../modules'
import HttpException from '../exception/HttpException';
import { UNPROCESSABLE_ENTITY, UNAUTHORIZED } from "http-status-codes";
import { validateRegisterInput } from '../utils/validator';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../typings/payload'


export const register = async (req: Request, res: Response, next: NextFunction) => {

  try {
    let { username, password, confirmPassword, email } = req.body;
    console.log("register----", username, password, confirmPassword, email)
    let { valid, errors } = validateRegisterInput(username, password, confirmPassword, email);
    if (!valid) {
      throw new HttpException(UNPROCESSABLE_ENTITY, '用户提交数据不正确', errors);
    }
    let olduser: UserDocument | null = await User.findOne({ username });
    if (olduser) {
      throw new HttpException(UNPROCESSABLE_ENTITY, '用户名重复', errors)
    }
    let user = new User({ username, password, confirmPassword, email });
    await user.save();
    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { username, password } = req.body;
    let user: UserDocument | null = await User.login(username, password);
    if (!user) {
      throw new HttpException(UNAUTHORIZED, '登录失败');
    }
    let access_token = user.getAccessToken();
    res.json({
      success: true,
      data: access_token
    })
  } catch (error) {
    next(error);
  }
}


export const validate = async (req: Request, res: Response, next: NextFunction) => {
  console.log('validate--------')
  const authorization = req.headers.authorization;
  if (authorization) {
    const access_token = authorization.split(' ')[1];
    if (access_token) {
      try {
        const userPayload: UserPayload = await jwt.verify(access_token, process.env.JWT_SECRET_KEY || 'zxsc') as UserPayload;
        const user: UserDocument | null = await User.findById(userPayload.id);
        if (user) {
          res.json({
            success: true,
            data: user.toJSON()
          })
        } else {
          next(new HttpException(UNAUTHORIZED, 'not found user!'))
        }
      } catch (error) {
        next(new HttpException(UNAUTHORIZED, 'access tokne 不合法'))
      }
    } else {
      next(new HttpException(UNAUTHORIZED, 'not found access tokne'))
    }
  } else {
    next(new HttpException(UNAUTHORIZED, 'autorization not provide access tokne'))
  }
}

export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {

  try {
    let { userId } = req.body;
    let avatar = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
    await User.updateOne({ _id: userId }, { avatar });
    res.json({
      success: true,
      data: avatar
    })
  } catch (error) {
    next(error);
  }
}