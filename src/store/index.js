import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      email: "",
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo.email = payload.email
    },
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    }
 },
  plugins: [createPersistedState()],
});
