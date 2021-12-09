import Vue from "vue"
import firebase from "firebase";

const state = {
  news: [],
};
const mutations = {
  SET_NEWS(state, payload) {
    state.news = payload;
  },
};
const actions = {
  LOAD_NEWS({commit}) {
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    commit('SET_PROCESS', 'Загрузка...');

    Vue.$db.collection('news').get()
      .then(snapshot => {
        let news = [];
        snapshot.forEach(item => {
          const data = item.data();
          let single = {
            id: item.id,
            title: data.title,
            createdAt: data.createdAt,
          }
          news.push(single);
        })
        commit('SET_NEWS', news);
        commit('SET_PROCESS', false) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      })
      .catch(error => {
        commit('SET_PROCESS', false)
        console.log(error.message)
      })
  },
  UPLOAD_NEWS({commit}, payload) { //payload - объект новости
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    if (payload) {
      commit('SET_PROCESS', 'Загрузка в базу...');

      Vue.$db.collection('news').add({
        createdAt: Date.now(),
        title: payload.title,
        text: payload.text,
        likes: 0,
        dislikes: 0,
        votes: []
      })
        .then(snapshot => {
          if (payload.files) {
            commit('SET_PROCESS', 'Добавление файлов в хранилище...')

            payload.files.forEach(file => {
              Vue.$storage.child(`news/${snapshot.id}/${file.name}`).put(file);
            })
          }
          //НЕТ ЗАВЕРШЕНИЯ ПРОЦЕССА
        })
        .catch(error => {
          commit('SET_PROCESS', false)
          console.log(error);
        })
    }
  },

  //ДОБАВИТЬ ПРОЦЕССЫ?
  RATE_NEWS: function ({commit}, {id, rate}) {
    let currentValues = {
      likes: null,
      dislikes: null,
      voted: false,
    }
    Vue.$db.collection('news').doc(id).get()
      .then(snapshot => {
        const data = snapshot.data();
        currentValues.likes = data.likes;
        currentValues.dislikes = data.dislikes;
        currentValues.voted = data.votes.indexOf(firebase.auth().currentUser.uid) >= 0;
        if (currentValues.voted) throw new Error('Ваш голос уже был учтён!')
        return currentValues
      })
      .then(currentValues => {
        Vue.$db.collection('news').doc(id).update(
          (rate === 'like') ? {
            likes: currentValues.likes + 1,
            votes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
          } : {
            dislikes: currentValues.dislikes + 1,
            votes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
          })
          .then(() => window.location.reload())
      })
      .catch(error => alert(error.message));
  }
}
const getters = {
  getNews(state) {
    return state.news.sort(function (a, b) {
      const date1 = a.createdAt;
      const date2 = b.createdAt;

      let comparison = 0;
      if (date1 > date2) {
        comparison = -1;
      } else if (date1 < date2) {
        comparison = 1;
      }
      return comparison;
    });
  },
}
export default {state, mutations, getters, actions}
