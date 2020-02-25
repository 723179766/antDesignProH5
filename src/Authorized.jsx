import React from 'react';
import { connect } from 'dva';

let pageAuth = {};

const renderAuthorized = (paramsAuth, userPageAuth) => {
  const url = window.location.pathname.split('/');
  const targetPage = url[url.length - 1];
  if (typeof paramsAuth !== 'object' || !(paramsAuth instanceof Array)) {
    return false;
  }
  const validateAuth = userPageAuth || pageAuth[targetPage];
  let res = false;
  try{
    paramsAuth.forEach(val => {
      if (validateAuth.includes(val)) {
        res = true;
        throw new Error('end')
      }
    })
  } catch (e) {
  }
  return res
};

class Authorized extends React.Component {
  renderChild = () => {
    const url = window.location.pathname.split('/');
    const targetPage = url[url.length - 1];
    const { children, paramsAuth, userPageAuth, init } = this.props;
    if (init) return children;
    const res = renderAuthorized(paramsAuth, userPageAuth[targetPage]) || false;
    if (res) return children;
    return null
  };

  render() {
    return (
      <>
        {this.renderChild()}
      </>
    );
  }
}

Authorized.getAuths = () => {
  const url = window.location.pathname.split('/');
  const targetPage = url[url.length - 1];
  return pageAuth[targetPage] === undefined ? [] : pageAuth[targetPage]
};

Authorized.renderAuthorized = renderAuthorized;

export default connect(({ user }) => {
  pageAuth = user.userPageAuth;
  return {
    userPageAuth: user.userPageAuth
  }
})(Authorized);
