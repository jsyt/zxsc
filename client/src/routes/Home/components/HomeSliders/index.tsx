import React, { useEffect, PropsWithChildren } from 'react';
import './index.less';

import { Carousel } from 'antd';

import { BarsOutlined } from '@ant-design/icons';
import { Slider } from '@/typings';

type Props = PropsWithChildren<{
  sliders: Slider[],
  getSliders: () => void
}>

function HomeSliders(props: Props) {

  // function onChange(a, b, c) {
  //   console.log(a, b, c);
  // }
  useEffect(() => {
    if (props.sliders.length === 0) {
      props.getSliders();
    }
  }, [])

  return (
    <Carousel >
      {
        props.sliders.map((item: Slider, index: number) => (
          <div key={ item.id }>
            <img src={ item.url } />
          </div>
        ))
      }
    </Carousel>
  )
}

export default HomeSliders;