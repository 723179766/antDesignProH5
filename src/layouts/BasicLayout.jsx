import React from 'react';
import { connect } from 'dva';
import classNames  from 'classnames';
import LayoutMenu from '@/components/LayoutMenu';
import Authorized from '@/Authorized';
import styles from './BasicLayout.less'

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { children, screenSize } = this.props;

    return (
      <div className={styles.basicLayout}>
        <div className={
          classNames(
            styles.basicLayoutLeft,
            screenSize === 'lg' && styles.basicLayoutLeftLg,
            screenSize === 'md' && styles.basicLayoutLeftMd,
            screenSize === 'xs' && styles.basicLayoutLeftXs,
          )
        }>
          <LayoutMenu {...this.props} />
        </div>
        <div className={styles.basicLayoutRight}>
          <div className={styles.basicLayoutHeader}>
            头部
          </div>
          <div className={styles.basicLayoutMain}>
            <div className={styles.mainNav}>
              面包屑
            </div>
            <div className={styles.mainContent}>
              <Authorized init>
                {children}
              </Authorized>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ user, setting }) => ({
  userRouterAuth: user.userRouterAuth,
  screenSize: setting.screenSize,
  setting,
}))(BasicLayout);
