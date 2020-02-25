import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { loginAdmin1, loginAdmin2, adminLogin } from '@/services/login';

let oldInnerWidth = window.innerWidth;

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setScreenSize(oldInnerWidth);
    window.addEventListener('resize', this.windowResize, false);
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

  windowResize = () => {
    if (window.innerWidth >= 1280 && oldInnerWidth < 1280) {
      // log('浏览器放大到1280分辨率及以上');
      oldInnerWidth = window.innerWidth;
      this.setScreenSize(oldInnerWidth);
    }
    if ((window.innerWidth < 1280 && oldInnerWidth >= 1280) || (window.innerWidth > 768 && oldInnerWidth <= 768)) {
      // log('浏览器处于768-1280分辨率之间');
      oldInnerWidth = window.innerWidth;
      this.setScreenSize(oldInnerWidth);
    }
    if (window.innerWidth <= 768 && oldInnerWidth > 768) {
      // log('浏览器缩小到768分辨率及以下');
      oldInnerWidth = window.innerWidth;
      this.setScreenSize(oldInnerWidth);
    }
  };

  setScreenSize = (size) => {
    log('当前尺寸', size);
    let sizeType = '';
    const { dispatch } = this.props;
    if (size >= 1280) {
      sizeType = 'lg'
    } else if (size > 768 && size < 1280){
      sizeType = 'md'
    } else if (size <= 768) {
      sizeType = 'xs'
    }
    dispatch({
      type: 'setting/setScreenSize',
      payload: sizeType
    })
  };

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
