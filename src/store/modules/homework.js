import Vue from "vue"
import firebase from "firebase"

const state = {
  homeworkList: [],
  homeworkTypes: [
    'Домашняя работа',
    'Лабораторная работа',
    'Расчёт',
    'Вопрос',
  ]
};
const mutations = {
  SET_HOMEWORKLIST(state, payload) {
    state.homeworkList = payload
  }
};
const actions = {
  UPLOAD_HOMEWORK({commit}, payload) {
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    if (payload) {
      commit('SET_PROCESS', 'Создание экземпляра в БД...');

      const uid = firebase.auth().currentUser.uid.toString();
      let initialObj = {
        createdAt: Date.now(),
        text: payload.text,
        sentBy: uid,
      }
      Vue.$db.collection('homeworks').doc(uid).collection('db').add({
          createdAt: Date.now(), //Дата создания ДЗ
          discipline: payload.discipline, //Дисциплина
          title: payload.title, //Заголовок ДЗ
          type: payload.type, //Тип ДЗ
          option: payload.option, //Вариант (необяз.)
          status: 'Ожидает', //Статус
          newMessages: 0, //Кол-во новых непрочитанных сообщений
          semester: localStorage.getItem('semester'), //Семестр
          messages: [
            initialObj
          ]
        })
        .then(snapshot => {
          const hid = snapshot.id; //Идентификатор созданной работы

          console.log(hid)
          commit('SET_PROCESS', 'Проверка наличия прикреплённых файлов...')

          if (payload.files.length > 0) {
            commit('SET_PROCESS', 'Загрузка файлов в хранилище...')

            let arr = []; let checkSuccessUpload = new Array(payload.files.length).fill(false);

            let upload = new Promise((resolve, reject) => {
              payload.files.forEach((file, index, array) => {
                console.log(`Готовится к загрузке файл с индексом(${index}): ${file.name}`)
                Vue.$storage.child(`homeworks/${hid}/${file.name}`).put(file)
                  .then(snapshot2 => { //Файл в хранилище добавлен, считываем осн. инфу о нем (имя, ссылка)
                    console.log(`Файл(${index + 1}) был успешно загружен.`)
                    snapshot2.ref.getDownloadURL()
                      .then(url => {
                        arr.push({name: snapshot2.ref.name, link: url});
                        checkSuccessUpload[index] = true;
                        if (checkSuccessUpload.includes(false) === false) { //Если все файлы загружены
                          resolve();
                        }
                      })
                      .catch(error => console.log('Ошибка получения URL', error.message))
                  })

              })
            });
            upload.then(() => {
              commit('SET_PROCESS', 'Привязка файлов к сообщению...')

              initialObj["files"] = arr;
              Vue.$db.collection('homeworks').doc(hid).update({
                messages: [
                  initialObj
                ]
              })
              .catch(error => console.log(error.message))
            });
          }
          else {
            console.log('Список файлов пуст!')
          }

        })
        .then(() => {
          commit('SET_PROCESS', false);
        })
        .catch(error => {
          commit('SET_PROCESS', false)
          console.log(error.message)
        })
    }
  },
  LOAD_HOMEWORKS({commit}) {
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    commit('SET_PROCESS', 'Загрузка данных...')
    //Пока в условии ("createdAt", ">", 0). Позже что-нибудь другое придумать
    Vue.$db.collection('homeworks').doc(localStorage.getItem('uid')).collection('db').where("createdAt", ">", 0).get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          obj.id = doc.id;
          arr.push(obj);
        });
        commit('SET_HOMEWORKLIST', arr);
        commit('SET_PROCESS', false); //!!!!!!!!!!!!!!!!!!!!!!!!
      })
      .catch((error) => {
        commit('SET_PROCESS', false);
        console.log("Error getting documents: ", error.message);
      });
  },
  ADD_ANSWER({commit}, payload) {
    commit('CLEAR_ERROR'); commit('CLEAR_SUCCESS_MSG');

    commit('SET_PROCESS', true)

    //ОБНОВИТЬ
  }
}
const getters = {
  getHomeworkList(state) {
    return state.homeworkList.sort(function (a, b) {
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
  getHomeworkTypes(state) {
    return state.homeworkTypes;
  }
}
export default {state, mutations, getters, actions}
