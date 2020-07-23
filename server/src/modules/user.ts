import mongoose, { Schema, Model, Document, HookNextFunction } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../typings/payload'

export interface UserDocument extends Document {
  username: string;
  password: string;
  avatar: string;
  email: string;
  getAccessToken: () => string;
  _doc: Document;
}

const UserSchema: Schema<UserDocument> = new Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    minlength: [3, '最小长度不能小于 3 位'],
    maxlength: [12, '最大长度不能大于 12 位'],
  },
  password: String,
  avatar: String,
  email: {
    type: String,
    trim: true,
    validate: {
      validator: validator.isEmail
    }
  }
}, {
    timestamps: true,  // 自动添加 createAt updateAt
    toJSON: {
      transform: function (_doc: any, result: any) {
        result.id = result._id;
        delete result._id;
        delete result.password;
        delete result.__v;
        delete result.updatedAt;
        delete result.createdAt;
        return result;
      }
    }
});

// 在保存文档之前
UserSchema.pre<UserDocument>('save', async function (next: HookNextFunction) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
})


//  给 User 模型 动态添加 login 方法
UserSchema.static('login', async function (this: any, username: string, password: string): Promise<UserDocument | null> {
  let user: UserDocument | null = await this.model('User').findOne({ username });
  if (user) {
    const matched = await bcryptjs.compare(password, user.password);
    if (matched) {
      return user;
    } else {
      return null;
    }
  }
  return null;
})
interface UserModel<T extends Document> extends Model<T> {
  login: (user: string, password: string) => UserDocument | null
}

// 给 User 模型实例 扩展 getAccessToken 方法
UserSchema.methods.getAccessToken = function (this: UserDocument): string {
  let payload: UserPayload = { id: this._id };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'zxsc', { expiresIn: '1h'})
}

export  const User: UserModel<UserDocument> = mongoose.model<UserDocument, UserModel<UserDocument>>('User', UserSchema);
