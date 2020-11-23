import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      email: "",
      fullname: "",
      iconImg: "",
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo.email = payload.email;
      state.userInfo.fullname = payload.displayName;
      state.userInfo.iconImg = payload.photoURL;
    },
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    }
 },
});
