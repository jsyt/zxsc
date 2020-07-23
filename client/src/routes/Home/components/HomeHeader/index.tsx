import React, { useState, CSSProperties } from 'react';
import './index.less';
import { BarsOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { Transition } from "react-transition-group";

let logo = require('../../../../assets/images/mall.jpg')

const duration = 200;
const defaultStyle: CSSProperties = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
}
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 }
}
interface Props {
  currentCategory: string;
  setCurrentCategory: (currentCategory: string) => any;
}

function HomeHeader(props: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    let target: HTMLUListElement = event.target as HTMLUListElement;
    let catetory = target.dataset.category;
    props.setCurrentCategory(catetory);
    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <header className='home-header'>
      <div className="logo-header">
        <img src={ logo.default } />
        <BarsOutlined onClick={ () => setIsMenuVisible(!isMenuVisible)}/>
      </div>
      <Transition in={ isMenuVisible } timeout={ duration }>
        {
          (state) => {
            return isMenuVisible ? (
              <ul className="category"
                onClick={ setCurrentCategory }
                style={ {
                  ...defaultStyle,
                  ...transitionStyles[state]
                } }
              >
                <li data-category='all' className={ classnames({ active: props.currentCategory === 'all' }) }>全部课程</li>
                <li data-category='react' className={ classnames({ active: props.currentCategory === 'react' }) }>React课程</li>
                <li data-category='vue' className={ classnames({ active: props.currentCategory === 'vue' }) }>Vue课程</li>
              </ul>
            ) : null;
          }
        }
      </Transition>

    </header>
  )
}

export default HomeHeader;