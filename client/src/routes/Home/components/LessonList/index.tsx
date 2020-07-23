import React, { useEffect, PropsWithChildren } from 'react';
import './index.less';

import { Card, Button, Alert } from 'antd';

import { BarsOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Slider, Lesson } from '@/typings';
import { Lessons } from '@/store/reducers/home';



type Props = PropsWithChildren<{
  lessons: Lessons;
  getLessons: () => void
}>

function LessonList(props: Props) {
  useEffect(() => {
    props.getLessons();
  }, [])
  return (
    <section className='lesson-list'>
      <h2>
        <MenuFoldOutlined />
        全部视频
      </h2>
      {
        props.lessons.list.map((item: Lesson, index: number) => (
          <Card
            key = {item.id}
            hoverable={ true }
            style={ { width: '100%' } }
            cover = {<img src={item.poster} />}
          >
            <Card.Meta title={item.title} description={`价格：${item.price}`} />

          </Card>
        ))
      }
      {
        props.lessons.hasMore ? <Button
          onClick={ props.getLessons }
          type="primary"
          loading={props.lessons.loading}
          block > {props.lessons.loading ? '' : "加载更多"} </Button> : <Alert style={ { textAlign: 'center' } } message="到底了" type="warning" ></Alert>
      }
    </section>
  )

}

export default LessonList;