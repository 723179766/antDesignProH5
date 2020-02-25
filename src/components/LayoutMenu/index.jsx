// 注意menu赋值顺序，不可破坏对象应用
import React from 'react';
import { Menu } from 'antd';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import config from '@/config';

const { SubMenu } = Menu;

class LayoutMenu extends React.Component {
  state = {
    allMenu: [],
    menu: [],
    rootMenuKeys: [],
    selectedKeys: [],
    openKeys: [],
  };

  componentWillMount() {
    const [{ route, userRouterAuth }, menu] = [this.props, []];
    const [routes, ownAuth] = [route.routes, JSON.parse(JSON.stringify(userRouterAuth))];
    this.createMenuData(routes, menu);  // 删除umi router 多余数据，生成全部菜单树
    this.setState({
      allMenu: JSON.parse(JSON.stringify(menu))
    });
    if (config.validationAuth) {
      this.filterMenuData(menu, ownAuth); // 删除没有权限的菜单树
    }
    this.setState({
      menu
    }); // 渲染菜单
    this.getRootMenuKeys(menu); // 根菜单且有子集的菜单key，菜单互斥展开需要
  }

  componentWillReceiveProps(nextProps) {
     // 监听路由变化映射菜单
    const { location } = nextProps;
    this.getMenuActive(location.pathname);
  }

  componentDidMount() {
    // 监听路由变化映射菜单
    const { location } = this.props;
    this.checkUrl(location.pathname);
    this.getMenuActive(location.pathname);
  }

  checkUrl = (curUrl) => {
    const { allMenu, menu } = this.state;
    const [fullPath, ownPath] = [[], []];
    function returnMenu (menu, store) {
      menu.forEach(val => {
        if (val.children.length === 0) {
          store.push(val.path)
        } else {
          returnMenu(val.children, store)
        }
      })
    }
    returnMenu(allMenu, fullPath);
    returnMenu(menu, ownPath);
    if (!fullPath.includes(curUrl)){
      router.push('/404');
      return;
    }
    if (!ownPath.includes(curUrl)){
      router.push('/403');
    }
  };

  getMenuActive = (pathname) => {
    const { menu } = this.state;
    const openKeys = this.treeFindPath(menu, data=> data.path === pathname);
    this.setState({
      selectedKeys: [pathname],
      openKeys
    });
  };

  treeFindPath = (tree, func, path = []) => {
    if (!tree) return [];
    for (const data of tree) {
      path.push(data.path);
      if (func(data)) return path;
      if (data.children) {
        const findChildren = this.treeFindPath(data.children, func, path);
        if (findChildren.length) return findChildren;
      }
      path.pop();
    }
    return [];
  };

  createMenuData = (routes, menu) => {
    routes.forEach(val => {
      if (val.path && val.name && val.label) {
        menu.push({
          label: val.label,
          name: val.name,
          path: val.path,
          children: []
        });
        if (val.routes && val.routes.length > 0) {
          this.createMenuData(val.routes, menu[menu.length - 1].children)
        }
      }
    });
  };

  filterMenuData = (menu, ownAuth) => {
    for (let i = 0; i < menu.length; i += 1) {
      let delMenu = false;
      if (!ownAuth.includes(menu[i].name)) {
        delMenu = true;
        menu.splice(i, 1);
        i -= 1;
      }
      if (delMenu === false) {
        if (menu[i].children.length > 0) {
          this.filterMenuData(menu[i].children, ownAuth)
        }
      }
    }
  };

  menuNode = (val) => {
    if (val.children.length > 0) {
      return (
        <SubMenu key={val.path} title={<span>{formatMessage({id: val.label})}</span>}>
          {val.children.map(cval => this.menuNode(cval))}
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={val.path}>
        <span>{formatMessage({id: val.label})}</span>
      </Menu.Item>
    )
  };

  menuClick = (params) => {
    const { keyPath } = params;
    router.push(keyPath[0]);
  };

  getRootMenuKeys = (menu) => {
    const rootMenuKeys = [];
    menu.forEach(val => {
      if (val.children.length > 0) {
        rootMenuKeys.push(val.path)
      }
    });
    this.setState({rootMenuKeys})
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootMenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const { menu, selectedKeys, openKeys } = this.state;

    return (
      <div className={styles.layoutMenu}>
        <div className={styles.logo}>LOGO</div>
        <Menu
          mode="inline"
          onClick={this.menuClick}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={this.onOpenChange}
        >
          {menu.map(val => this.menuNode(val))}
        </Menu>
      </div>
    );
  }
}

export default LayoutMenu;
