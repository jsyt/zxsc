import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';  // 访问日志
import helmet from 'helmet';  // 安全过滤
import multer from 'multer';  // 上传头像
import 'dotenv/config';   // 读取 .env 文件 写入 process.env
import path from 'path';
import errorMiddleware from './middlewares/errorMiddleware'
import HttpException from './exception/HttpException';
import { Slider, Lesson } from './modules'
import * as userController from './controllers/user'
import * as sliderController from './controllers/slider'
import * as lessonController from './controllers/lesson'

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public', 'uploads'),
  filename(_req: Request, file: Express.Multer.File, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage });

const app: Express = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/user/register', userController.register);
app.post('/user/login', userController.login);
app.get('/user/validate', userController.validate);
app.post('/user/uploadAvatar', upload.single('avatar'), userController.uploadAvatar);


app.get('/slider/list', sliderController.list)
app.get('/lesson/list', lessonController.list)

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: HttpException = new HttpException(404, "此路径尚未分配路由");
  next(error);
})
app.use(errorMiddleware);

app.get('/', (_req, res, _next) => {
  res.json({
    success: true,
    data: 'hello world'
  })
});



(async function () {
  await mongoose.set('useNewUrlParser', true);
  await mongoose.set('useNewUrlParser', true);
  const MONGOOSE_URL = process.env.MONGOOSE_URL || 'mongodb://localhost/zxscapp';
  await mongoose.connect(MONGOOSE_URL);
  await createInitialSliders();
  await createInitialLessons();
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
  })
})();


async function createInitialSliders() {
  const sliders = await Slider.find();
  if (sliders.length === 0) {
    const sliders = [
      { url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp' },
      { url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/6f97175fa2.webp' },
      { url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp' },
      { url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/4ca17b0h_1c.webp' },
      { url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/00d5331_1c.webp' }
    ]
    await Slider.create(sliders);
  }
}

async function createInitialLessons() {
  const lessons = await Lesson.find();
  if (lessons.length === 0) {
    const lessons = [
      {
        order: 1,
        title: '1.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/00d5331_1c.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/00d5331_1c.webp',
        price: '¥100.00元',
        category: 'react'
      },
      {
        order: 2,
        title: '2.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/4ca17b0h_1c.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/4ca17b0h_1c.webp',
        price: '¥200.00元',
        category: 'react'
      },
      {
        order: 3,
        title: '3.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥300.00元',
        category: 'react'
      },
      {
        order: 4,
        title: '4.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/6f97175fa2.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/6f97175fa2.webp',
        price: '¥400.00元',
        category: 'react'
      },
      {
        order: 5,
        title: '5.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥500.00元',
        category: 'react'
      },
      {
        order: 6,
        title: '6.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥100.00元',
        category: 'vue'
      },
      {
        order: 7,
        title: '7.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥200.00元',
        category: 'vue'
      },
      {
        order: 8,
        title: '8.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥300.00元',
        category: 'vue'
      },
      {
        order: 9,
        title: '9.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥400.00元',
        category: 'vue'
      },
      {
        order: 10,
        title: '10.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥500.00元',
        category: 'vue'
      },
      {
        order: 11,
        title: '11.公主连结Re:Dive',
        "video": "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥600.00元',
        category: 'react'
      },
      {
        order: 12,
        title: '12.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥700.00元',
        category: 'react'
      },
      {
        order: 13,
        title: '13.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥800.00元',
        category: 'react'
      },
      {
        order: 14,
        title: '14.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥900.00元',
        category: 'react'
      },
      {
        order: 15,
        title: '15.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥1000.00元',
        category: 'react'
      },
      {
        order: 16,
        title: '16.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥1000.00元',
        category: 'vue'
      },
      {
        order: 17,
        title: '17.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥1000.00元',
        category: 'vue'
      },
      {
        order: 18,
        title: '18.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥800.00元',
        category: 'vue'
      },
      {
        order: 19,
        title: '19.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥1234.00元',
        category: 'vue'
      },
      {
        order: 20,
        title: '20.公主连结Re:Dive',
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp",
        url: 'https://img-1256541035.cos.ap-shanghai.myqcloud.com/imgs/360ae36bfc.webp',
        price: '¥1111.00元',
        category: 'vue'
      }
    ]
    await Lesson.create(lessons);
  }
}