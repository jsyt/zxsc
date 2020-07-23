
import { Lesson, LessonDocument } from '../modules'
import { Request, Response } from 'express'

export const list = async (req: Request, res: Response) => {
  let { category = 'all', offset, limit } = req.query;
  let nOffset = Number(offset);

  let nLimit = Number(limit);
  let query: Partial<LessonDocument> = {};
  if (category && category != 'all') {
    // @ts-ignore
    query.category = category;
  }
  let total: number = await Lesson.count(query);
  let list: LessonDocument[] = await Lesson.find(query).sort({ order: 1}).skip(nOffset).limit(nLimit);
  res.json({
    success: true, data: {
      list,
      hasMore: total > nOffset + nLimit,
      offset,
    }
  })
}