import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { loginAdmin1, loginAdmin2, adminLogin } from '@/services/login';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const role = localStorage.getItem('role');
    if (role === 'role1') {
      loginAdmin1().then(res => {
        if (res.re === '200') {
          dispatch({
            type: 'user/setUserAuth',
            payload: res.data,
            callback: () => {
              this.setState({isReady: true});
            }
          })
        }
      })
    } else if (role === 'role2') {
      loginAdmin2().then(res => {
        if (res.re === '200') {
          dispatch({
            type: 'user/setUserAuth',
            payload: res.data,
            callback: () => {
              this.setState({isReady: true});
            }
          })
        }
      })
    } else if (role === 'admin') {
      adminLogin().then(res => {
        if (res.re === '200') {
          dispatch({
            type: 'user/setUserAuth',
            payload: res.data,
            callback: () => {
              this.setState({isReady: true});
            }
          })
        }
      })
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, userInfo } = this.props;
    // 判断 token 是否存在
    // const isLogin = Boolean(userInfo);
    const isLogin = true;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin) {
      return <Redirect to={`/login?${queryString}`}></Redirect>;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  userInfo: user.userInfo,
  loading: loading.models.user,
}))(SecurityLayout);
