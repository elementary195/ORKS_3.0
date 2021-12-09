const state = {
  semesters: {
    active: '',
    list: [
      '2018-2019 г., 1 семестр',
      '2018-2019 г., 2 семестр',
      '2019-2020 г., 1 семестр',
      '2019-2020 г., 2 семестр',
      '2020-2021 г., 1 семестр',
      '2020-2021 г., 2 семестр',
      '2021-2022 г., 1 семестр',
      '2021-2022 г., 2 семестр',
    ]
  },

  statusList: [
    { name: 'Ожидает', icon: 'hourglass_top', color: 'yellow darken-3' },
    { name: 'В работе', icon: 'engineering', color: 'blue' },
    { name: 'Требуется уточнение', icon: 'running_with_errors', color: 'yellow darken-4' },
    { name: 'Отложено', icon: 'history', color: 'yellow darken-3' },
    { name: 'Отклонено', icon: 'thumb_down_alt', color: 'red accent-4' },
    { name: 'Завершено', icon: 'done_all', color: 'green darken-1' },
    { name: 'Отправлено на почту', icon: 'email', color: 'grey darken-2' },
  ],

  // status: [
  //   { header: 'Наборы:' },
  //   { name: 'Все', icon: 'all_inclusive' },
  //   { name: 'Не закрытые', icon: 'lock_open' },
  //   { divider: true },
  //   { header: 'Статусы:' },
  //   { name: 'Ожидает', icon: 'hourglass_top' },
  //   { name: 'В работе', icon: 'engineering' },
  //   { name: 'Требуется уточнение', icon: 'running_with_errors' },
  //   { name: 'Отложено', icon: 'history' },
  //   { name: 'Отклонено', icon: 'thumb_down_alt' },
  //   { name: 'Завершено', icon: 'done_all' },
  //   { name: 'Отправлено на почту', icon: 'email' },
  // ],

};
const mutations = {
  //Определение текущего семестра в зависимости от месяца
  ACTIVE_SEMESTER(state, toSet = true) {
    let today = new Date(Date.now());
    let year = today.getFullYear();
    let month = today.getMonth();
    let semList = state.semesters.list;
    semList = ([8,9,10,11].indexOf(month) >= 0) ? semList.filter(item => item.slice(0, 9).startsWith(year.toString()))[0]
      : semList.filter(item => item.slice(0, 9).startsWith((year-1).toString()))[1];
    if (toSet) {
      state.semesters.active = semList;
      localStorage.setItem('semester', semList)
    }
    else return semList;
  },
};
const actions = {

}
const getters = {
  getSemesters(state) {
    return state.semesters;
  },
  getStatusList(state) {
    return state.statusList;
  },
}
export default {state, mutations, getters, actions}
