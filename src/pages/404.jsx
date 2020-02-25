import React from 'react';
import { Button, Result } from 'antd';
import { router } from 'umi';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => router.push('/login')}>Back Login</Button>
    }
  >
  </Result>
);

export default NoFoundPage;
