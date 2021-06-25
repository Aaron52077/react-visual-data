/* eslint-disable */
import React, { useEffect } from 'react';
import { Form, Input, Button, message, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { IconFont } from '~components';
import { aesEncrypt } from '~utils';
import { accountIn, getMeunList } from '@/api';
import { useDocumentTitle } from '~common/hooks';
import './styles.less';

const LoginAuth = (props) => {
  const [form] = Form.useForm();
  const { dispatch, history } = props;
  useDocumentTitle('DataV Pro 登录');

  const onLoginHandle = async (values) => {
    const params = {
      username: values.username,
      password: aesEncrypt(values.password)
    };

    const { data } = await accountIn(params);
    const meunList = await getMeunList();

    if (data.access_token) {
      dispatch({ type: 'app/accessToken', data: data.access_token });
      dispatch({ type: 'app/refreshToken', data: data.refresh_token });
      dispatch({ type: 'app/routes', data: meunList.data });
      dispatch({ type: 'app/userInfo', data: data });
      dispatch({ type: 'app/routerPath', data: '/dashboard' });
      message.success('登录成功');
      history.replace('/dashboard');
    } else {
      message.error('登录验证失败');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    // TODO：优先清空存储的token
    dispatch({ type: 'app/resetState' });
  }, []);

  return (
    <div
      className="gc-login"
      style={{
        backgroundImage: 'url(./static/component/bg.jpg)'
      }}
    >
      <div className="gc-login__bd">
        <div className="gc-login__title">DataV Pro 实验室</div>
        <div className="gc-login__items">
          <Form
            form={form}
            name="control-hooks"
            initialValues={{
              username: 'admin',
              password: '111111'
            }}
            onFinish={onLoginHandle}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input prefix={<IconFont antd={true} type="UserOutlined" />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input.Password
                prefix={<IconFont antd={true} type="LockOutlined" />}
                allowClear={true}
              />
            </Form.Item>
            <Form.Item>
              <Tooltip
                placement="right"
                title="数据基于mockjs开发无需验证，任意帐号体验即可"
                destroyTooltipOnHide
              >
                <Button type="primary" htmlType="submit" block>
                  登录
                </Button>
              </Tooltip>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="gc-login__footer">
        <p className="gc-login__footer--copyright">
          Copyright&nbsp;&nbsp;&nbsp;2020 react Admin pro 实验台&nbsp;&nbsp;
          <Button type="link" href="https://github.com/Aaron52077" target="_blank">
            @Aaron
          </Button>
        </p>
        <p className="gc-login__footer--options">
          <Button type="link">帮助</Button>
          <Button type="link">隐私</Button>
          <Button type="link">条款</Button>
        </p>
      </div>
    </div>
  );
};

export default connect((state) => state.app)(LoginAuth);
