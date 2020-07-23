import React, { PropsWithChildren, useCallback } from 'react'
import { RouteComponentProps } from "react-router-dom";
import { Link, NavLink, withRouter } from 'react-router-dom';
import { History } from "history";

import {
  LeftOutlined,

} from '@ant-design/icons';
import './index.less';


type Props = PropsWithChildren<{
  history: History
}>

function Nav(props: Props) {
  const memorizedGoBack = useCallback(
    () => {
      props.history.goBack();
    },
    [],
  )
  return (
    <header className='nav-header'>
      <div className='nav-content'>
        <LeftOutlined onClick={ memorizedGoBack }/>
        {props.children}
      </div>

    </header>
  )
}

export default Nav;