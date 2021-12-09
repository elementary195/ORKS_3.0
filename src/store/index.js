import Vue from "vue"
import Vuex from "vuex"
import userModule from "./modules/user"
import generalModule from "./modules/general"
import homeworkModule from "./modules/homework"
import standardModule from "./modules/standard";
import disciplinesModule from "./modules/disciplines";
import newsModule from "./modules/news";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const userState = createPersistedState({
  paths: ['userModule.user.isAuthenticated']
})

export const store = new Vuex.Store({
  modules: {
    userModule, generalModule, homeworkModule, standardModule, disciplinesModule, newsModule
  },
  plugins: [userState]
})
