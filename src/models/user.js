const UserModel = {
  namespace: 'user',

  state: {
    userRouterAuth: [],
    userPageAuth: {},
    userInfo: null,
  },
  effects: {
    *setUserAuth({ payload, callback }, { call, put }) {
      yield put({
        type: 'saveUserAuth',
        payload: payload,
      });
      if (callback) callback();
    },
  },
  reducers: {
    saveUserAuth(state, { payload }) {
      return {
        userRouterAuth: payload.routerAuth,
        userPageAuth: payload.pageAuth,
        userInfo: payload.userInfo,
      };
    }
  }
};

export default UserModel;
