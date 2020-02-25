import React from 'react';
import { Button } from 'antd';
import { router } from 'umi';
import LoginHeader from '@/components/LoginHeader';
import styles from './index.less'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className={styles.register}>
        <LoginHeader />
        <div className={styles.registerContent}>
          <div className={styles.formWarp}>
            <h1>注册</h1>
            <Button type="primary" onClick={() => router.push('/login')}>返回登录</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
