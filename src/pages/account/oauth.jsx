/* eslint-disable */
import React, { useEffect } from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { AutoLoading } from '~components';
import { accountIn, getMeunList } from '@/api';
import { pathToParam } from '~utils';

function SSOAuth(props) {
  const { dispatch, history } = props;

  const onLoginHandle = async (values) => {
    const res = await accountIn(values);
    const res1 = await getMeunList();

    if (res.data.access_token) {
      dispatch({ type: 'app/accessToken', data: res.data.access_token });
      dispatch({ type: 'app/refreshToken', data: res.data.refresh_token });
      dispatch({ type: 'app/routes', data: res1.data });
      dispatch({ type: 'app/userInfo', data: res.data });
      dispatch({ type: 'app/routerPath', data: '/dashboard' });
      history.replace('/dashboard');
    }
  };

  useEffect(() => {
    let { token } = pathToParam();
    if (token) {
      onLoginHandle({
        username: 'admin',
        password: '111111'
      });
    } else {
      notification.error({
        description: '授权失败，请联系管理员',
        message: '无法自动登录'
      });
    }
  }, []);

  return <AutoLoading tip="授权登录中..." />;
}

export default connect((state) => ({ refreshToken: state.app.refreshToken }))(SSOAuth);
