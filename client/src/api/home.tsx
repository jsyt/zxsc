import request from './index';
import { SliderData, LessonData } from '@/typings'

export function getSliders() {
  return request.get<SliderData, SliderData>(`/slider/list`);
}


export function getLessons<T>(
  category: string = 'all',
  offset: number,
  limit: number
) {
  return request.get<T, T>(`/lesson/list?category=${category}&offset=${offset}&limit=${limit}`);
}

