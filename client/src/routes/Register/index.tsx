import React, { PropsWithChildren } from 'react'
import { Form, Input, Button } from 'antd';
import './index.less';
import { RootState } from '@/store/reducers';
import { ProfileState } from '@/store/reducers/profile';
import { connect } from 'react-redux';
import actions from '@/store/actions/profile'
import {
  UserOutlined,
  UnlockTwoTone,
  MailTwoTone
} from '@ant-design/icons'
import { RouteComponentProps, Link } from 'react-router-dom';
import Nav from '@/components/Nav';


type Props = PropsWithChildren<RouteComponentProps> & ReturnType<typeof mapStateToProps> & typeof actions


// interface Props {

// }

function Register(props: Props) {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('onFinish Success:', values);
    props.register(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('onFinishFailed Failed:', errorInfo);
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('onCheck Success:', values);
    } catch (errorInfo) {
      console.log('onCheck Failed:', errorInfo);
    }
  };

  return (
    <>
      <Nav history={props.history}></Nav>
      <Form form={ form }
        name="register_form"
        className='login-form'
        onFinish={ onFinish }
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input
            placeholder="用户名"
            prefix={ <UserOutlined /> }
            style={{color: 'rgba(0.0.0.25)'}}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
          ]}
        >
          <Input
            placeholder="密码"
            prefix={ <UnlockTwoTone /> }
            style={{color: 'rgba(0.0.0.25)'}}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="ConfirmPassword"
          rules={[
            {
              required: true,
              message: '确认密码不能为空',
            },
          ]}
        >
          <Input
            placeholder="确认密码"
            prefix={ <UnlockTwoTone /> }
            style={{color: 'rgba(0.0.0.25)'}}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: '邮箱不能为空',
            }, {
              pattern: /@/,
              message: '邮箱格式不正确',
            }
          ]}
        >
          <Input
            placeholder="email"
            prefix={ <MailTwoTone /> }
            style={{color: 'rgba(0.0.0.25)'}}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'

          >
            注册
          </Button>
          或者
          <Link to='/login'>登录</Link>
        </Form.Item>
      </Form>
    </>
  )
}


let mapStateToProps = (state: RootState): ProfileState => state.profile;
export default connect(mapStateToProps, actions)(Register);