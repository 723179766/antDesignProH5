import React from 'react';
import { connect } from 'dva';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    const { setting } = this.props;
    const screenSize = setting.screenSize;

    return (
      <div>
        <h1>
          {screenSize === 'lg' && (<span>1280及以上大屏</span>)}
          {screenSize === 'md' && (<span>1280以下768以上</span>)}
          {screenSize === 'xs' && (<span>768及以下小屏</span>)}
        </h1>
        账户概览
      </div>
    );
  }
}

export default connect(({ setting }) => ({
  setting,
}))(Dashboard);
