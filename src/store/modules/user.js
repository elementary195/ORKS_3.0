import firebase from "firebase";
import Vue from "vue"

const state = {
  user: {
    isAuthenticated: false,
    userId: null,
    displayName: null,
    email: null,
    emailVerified: false,
    photoURL: null,
    dateOfBirth: null,
    fullName: null,
    status: null,
    personalCode: null,
    studying: {},
  }
};
const mutations = {
  //Основные данные о пользователе в хранилище
  SET_USER(state, {fromFirebase, fromFirestore}) {
    state.user.isAuthenticated = true;
    state.user.userId = fromFirebase.uid;
    state.user.displayName = fromFirebase.displayName;
    state.user.email = fromFirebase.email;
    state.user.emailVerified = fromFirebase.emailVerified;
    state.user.photoURL = fromFirebase.photoURL;

    if (fromFirestore) {
      state.user.dateOfBirth = new Date(fromFirestore.dateOfBirth.seconds * 1000).toLocaleDateString('ru');
      state.user.fullName = `${fromFirestore.surname} ${fromFirestore.name} ${fromFirestore.patronymic}`.trim();
      state.user.status = fromFirestore.status;
      state.user.studying = fromFirestore.studying;
      state.user.personalCode = fromFirestore.personalCode;
    }
  },
  UNSET_USER(state) {
    Object.keys(state.user).forEach(item => {
      if (typeof state.user[item] === "boolean") state.user[item] = false;
      else if (typeof state.user[item] === "object") state.user[item] = {};
      else state.user[item] = null;
    })
  },
};
const actions = {
  SIGN_UP({commit}, payload) {
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    commit('SET_PROCESS', true);

    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential) => {
        commit('SET_PROCESS', 'Создание записи в базе данных...')
        const userId = firebase.auth().currentUser.uid;
        Vue.$db.collection('usersBase').doc(userId).set({
          surname: '',
          name: '',
          patronymic: '',
          dateOfBirth: new Date(),
          status: '',
          personalCode: '',
          // studying: {
          //   course: '',
          //   specialty: {
          //     code: '',
          //     title: ''
          //   },
          //   educationalProfile: '',
          //   faculty: ''
          // }
          });
        commit('SET_PROCESS', false); //ПРОЦЕСС FIX
      })
      .catch((error) => {
        commit('SET_PROCESS', false);
        commit('SET_ERROR', error.message);
        console.log(error.message);
      });
  },
  SIGN_IN({commit}, payload) {
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    commit('SET_PROCESS', true);

    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential) => {
        commit('SET_PROCESS', false);
      })
      .catch((error) => {
        commit('SET_PROCESS', false);
        commit('SET_ERROR', error.message);
        console.log(error.message);
      });
  },
  SIGN_OUT({commit}) {
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    commit('SET_PROCESS', true);

    firebase.auth().signOut().then(() => {
      commit('SET_PROCESS', false);
    }).catch((error) => {
      commit('SET_PROCESS', false);
      commit('SET_ERROR', error.message);
      console.log(error.message);
    });
  },
  UPDATE_USER({commit}, {email, photoURL}) {
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    commit('SET_PROCESS', true);

    const user = firebase.auth().currentUser;
    if (user) {
      if (photoURL) {
        user.updateProfile({
          photoURL: photoURL,
        }).then(r => {
          commit('SET_PROCESS', false);
          window.location.reload();
        }).catch((error) => {
          commit('SET_PROCESS', false);
          commit('SET_ERROR', error.message);
        });
      }
      if (email) {
        user.updateEmail(email).then(r => {
          commit('SET_PROCESS', false);
          window.location.reload();
        }).catch((error) => {
          commit('SET_PROCESS', false);
          commit('SET_ERROR', error.message);
        });
      }
    }
  },
  SEND_CONFIRMATION_MAIL({commit}) {
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    commit('SET_PROCESS', true);

    firebase.auth().languageCode = 'ru';
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        // Email verification sent!
        commit('SET_PROCESS', false);
        console.log('Email verification sent!')
      })
      .catch((error) => {
      commit('SET_PROCESS', false);
      commit('SET_ERROR', error.message)
    });
  },
  DEFINE_USER({commit}, payload) {

  }
}
const getters = {
  isUserAuthenticated(state) {
    return state.user.isAuthenticated;
  },
  getUser(state) {
    return state.user;
  }
};

export default {state, mutations, actions, getters}
