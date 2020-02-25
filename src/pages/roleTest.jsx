import React from 'react';
import { Menu, Dropdown, Button, message  } from 'antd';
import { router } from 'umi';
import Authorized from '@/Authorized';
const { getAuths, renderAuthorized } = Authorized;

class roleTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    log('getAuths()', getAuths());
    log('renderAuthorized btn3', renderAuthorized(['add']))
  }

  btnEvent = (name) => {
    message.info(`Click on item ${name}`);
  };

  menuClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  render() {
    return (
      <div className="role-test">
        <Authorized paramsAuth={['btn1']}>
          <Button style={{ marginRight: 7 }} type="primary" onClick={() => this.btnEvent('按钮一')}>按钮一</Button>
        </Authorized>
        <Authorized paramsAuth={['btn2']}>
          <Button style={{ marginRight: 7 }} type="primary" onClick={() => this.btnEvent('按钮二')}>按钮二</Button>
        </Authorized>
        {renderAuthorized(['btn3']) && (
          <Button style={{ marginRight: 7 }} type="primary" onClick={() => this.btnEvent('按钮三')}>按钮三</Button>
        )}
        {renderAuthorized(['btn4']) && (
          <Button style={{ marginRight: 7 }} type="primary" onClick={() => this.btnEvent('按钮四')}>按钮四</Button>
        )}
        <div style={{ marginTop: 20 }}>
          {renderAuthorized(['add', 'edit']) && (
            <Dropdown
              overlay={()=>(
                <Menu onClick={this.menuClick}>
                  {renderAuthorized(['add']) && (<Menu.Item key="add">
                    <div>添加</div>
                  </Menu.Item>)}
                  {renderAuthorized(['edit']) && (<Menu.Item key="edit">
                    <div>编辑</div>
                  </Menu.Item>)}
                </Menu>
              )}
              placement="bottomCenter">
              <Button type="primary">操作菜单类型一</Button>
            </Dropdown>
          )}
        </div>
        <p style={{ marginTop: 20 }}>
          <Button type="primary" onClick={() => router.push('/login')}>返回登录</Button>
        </p>
      </div>
    );
  }
}

export default roleTest;
