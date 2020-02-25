import React from 'react';
import styles from './index.less';

class LoginHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      font: '登录前公用头部组件'
    }
  }

  changeFont = () => {
    this.setState({
      font: '头部组件被点击了'
    })
  };

  render() {
    const { font } = this.state;

    return (
      <header className={styles.loginHeader}>
        <span onClick={this.changeFont}>{font}</span>
      </header>
    );
  }
}

export default LoginHeader;
