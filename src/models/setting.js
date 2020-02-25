import defaultSettings from '../../config/defaultSettings';

const updateColorWeak = colorWeak => {
  const root = document.getElementById('root');

  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel = {
  namespace: 'setting',
  state: {
    ...defaultSettings,
    screenSize: ''
  },
  effects: {
    *setScreenSize({ payload, callback }, { call, put }) {
      yield put({
        type: 'saveScreenSize',
        payload: payload,
      });
      if (callback) callback();
    },
  },
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }

      updateColorWeak(!!colorWeak);
      return { ...state, ...payload };
    },
    saveScreenSize(state, { payload }) {
      return {
        ...state,
        screenSize: payload,
      };
    }
  },
};

export default SettingModel;
