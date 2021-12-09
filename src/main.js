// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from "./store"
import firebase from "firebase"
import "firebase/firestore"
import firebaseConfig from "./config/firebase"
import vuetify from "./plugins/vuetify"
require('./assets/styles.css')

Vue.config.productionTip = false

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storageRef = firebaseApp.storage().ref();

Vue.$db = db;
Vue.$storage = storageRef;

new Vue({
  el: '#app',
  router, store, vuetify,
  components: { App },
  template: '<App/>',
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        localStorage.setItem('uid', user.uid);
        let _user = {};
        db.collection('usersBase').doc(user.uid).get()
          .then(snapshot => {
          if (snapshot) _user = snapshot.data();
          this.$store.commit('SET_USER', { fromFirebase: user, fromFirestore: _user})
          })
          .catch(error => {
            alert(`${error.message} | Данные из firestore не были добавлены`)
            this.$store.commit('SET_USER', { fromFirebase: user })
          })
      } else {
        // User is signed out
        this.$store.commit('UNSET_USER');
      }
    });
    this.$store.commit('ACTIVE_SEMESTER');
  }
})
