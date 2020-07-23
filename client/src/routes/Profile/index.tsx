import React, { useEffect, PropsWithChildren, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '@/store/reducers';
import profile, { ProfileState, LOGIN_TYPES } from '@/store/reducers/profile';
import mapDispatchToProps from '@/store/actions/profile';
import Nav from '@/components/Nav'
import { Descriptions, Button, Alert, message, Upload } from 'antd';
import './index.less';
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import {
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons'



type Props = PropsWithChildren<RouteComponentProps> & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

function Profile(props: Props) {

  useEffect(() => {
    props.validate();
  }, [])
  const [uploading, setUploading] = useState(false);
  let content;
  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    content = null;
  } else if (props.loginState === LOGIN_TYPES.LOGINED) {
    const uploadButton = (
      <div>
        { uploading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status === 'uploading') {
        setUploading(true);
      } else if (info.file.status === 'done') {
        let { success, data } = info.file.response;
        if (success) {
          setUploading(false);
          props.setAvatar(data);
        } else {
          message.error('上传头像失败')
        }
      }
    }

    content = (
      <div className="user-info">
        <Descriptions title="当前用户">
          <Descriptions.Item label='用户名'>{ props.user.username }</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{ props.user.email }</Descriptions.Item>
          <Descriptions.Item label='头像'>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="http://localhost:8001/user/uploadAvatar"
              beforeUpload={beforeUpload}
              data={ { userId: props.user.id } }
              onChange={ handleChange }
            >
              {
                props.user.avatar ? <img src={ props.user.avatar } alt="avatar" style={ { width: '100%' } } /> : uploadButton
              }
            </Upload>

          </Descriptions.Item>
        </Descriptions>
        <Button type='primary' onClick={props.logout}>退出</Button>
      </div>
    )
  } else {
    content = (
      <div className="user-info">
        <Alert showIcon message="未登录" type="warning" closable description="亲爱的用户你好，你尚未登录，请你注册或登录" />
        <div>
          <Button type='dashed' onClick={ () => props.history.push('/login') }>登录</Button>
          <Button type='dashed' onClick={() => props.history.push('/register')}> 注册</Button>
        </div>

      </div>
    )
  }
  return (
    <section>
      <Nav history={props.history}><div>个人中心</div></Nav>
      {content}
    </section>
  )
}

const mapStateToProps = (state: RootState): ProfileState => state.profile
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

// (file: RcFile, FileList: RcFile[]) => boolean | PromiseLike<void>
function beforeUpload(file: RcFile, _FileList: RcFile[]): boolean | PromiseLike<void> {
  const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error("你只能上传 JPG/PNG 文件");
  }
  const isLessThan2M = file.size / 1024 / 1024 < 2;
  if (!isLessThan2M) {
    message.error('图片必须小于 2M');
  }
  return isJpgOrPng && isLessThan2M;
}
