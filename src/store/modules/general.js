const state = {
  process: false,
  processName: null,
  error: null,
  successMsg: null,
};
const mutations = {
  SET_PROCESS(state, payload) {
    if (typeof payload === "boolean") {
      state.process = payload;
    }
    else if (typeof payload === "string") {
      if (state.process === false) state.process = true;
      state.processName = payload;
      console.log(state.processName);
    }
    else console.log('Тип параметра "payload" может быть либо boolean, либо string');
  },
  SET_SUCCESS_MSG(state, payload) {
    state.successMsg = payload;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  CLEAR_SUCCESS_MSG(state) {
    state.successMsg = null;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  }
}
const getters = {
  getProcess(state) {
    return state.process;
  },
  getProcessName(state) {
    return state.processName;
  },
  getError(state) {
    return state.error;
  },
  getSuccessMsg(state) {
    return state.successMsg;
  }
}
export default {state, mutations, getters}
