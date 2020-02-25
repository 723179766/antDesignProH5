import React from 'react';
import { Button, Result } from 'antd';
import { router } from 'umi';

const NoFoundPage = () => (
  <Result
    status="403"
    title="403"
    subTitle="没有权限访问该页面"
    extra={
      <Button type="primary" onClick={() => router.push('/login')}>Back Login</Button>
    }
  >
  </Result>
);

export default NoFoundPage;
