import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import store from './store'
import './assets/style/common.less'
import Home from './routes/Home'
import Mine from './routes/Mine'
import Profile from './routes/Profile'
import Register from './routes/Register'
import Login from './routes/Login'
import { ConnectedRouter } from 'connected-react-router'
import history from '@/history'
import Tab from '@/components/Tabs'

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <ConfigProvider locale={zh_CN}>
        <main className="main-container">
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path='/mine' exact component={ Mine } />
            <Route path='/profile' exact component={ Profile } />
            <Route path='/register' exact component={ Register } />
            <Route path='/login' exact component={ Login } />
          </Switch>
        </main>
        <Tab/>
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));