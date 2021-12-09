<template>
  <v-container>
    <v-row align="center" class="flex-column flex-md-row">
      <v-col cols="12" md="8">
        <v-sheet elevation="2" color="grey lighten-5">
          <v-form v-model="valid" class="pa-7" :disabled="getProcess">
          <v-row>
            <v-col>
              <v-autocomplete outlined label="Статус" multiple clearable clear-icon="clear" append-icon="" :items="getStatusList" v-model="searchForm.status">
                <template v-slot:item="data">
                  <v-list-item-icon>
                    <v-icon left v-text="data.item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <template v-slot:selection="data">
                  <v-chip small @click.prevent="data.select">
                    {{data.item.name}}
                  </v-chip>
                </template>
              </v-autocomplete>

              <v-autocomplete v-model="searchForm.semester" :items="getSemesters.list" outlined dense chips small-chips label="Семестр"></v-autocomplete>
            </v-col>
            <v-col>
              <v-combobox v-model="searchForm.discipline" label="Дисциплина" small-chips clearable hide-selected outlined clear-icon="clear" append-icon="" :items="getDisciplineListOnly"></v-combobox>
              <v-text-field v-model="searchForm.title" dense label="Название" placeholder="Название" outlined></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        </v-sheet>
      </v-col>
      <v-col cols="7" md="3" offset-md="1" class="d-flex flex-column">
        <v-btn  elevation="2" x-large color="cyan darken-1" disabled light><v-icon left>search</v-icon>Найти</v-btn>
        <v-divider class="my-5"/>
        <v-btn  elevation="2" :to="{path: '/homework/create'}" x-large color="green" dark><v-icon left>add_box</v-icon>Добавить</v-btn>
      </v-col>
    </v-row>
    <div class="d-flex justify-center flex-column align-center" v-if="getProcess">
      <v-progress-circular class="mt-16" :size="50" color="blue" indeterminate></v-progress-circular>
      <span class="mt-5">{{ getProcessName }}</span>
    </div>
    <div v-else>
      <v-simple-table class="mt-15">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Статус
            </th>
            <th class="text-left">
              Название
            </th>
            <th class="text-left">
              Дисциплина
            </th>
            <!--          <th class="text-left">-->
            <!--            Контрольное мероприятие-->
            <!--          </th>-->
            <th class="text-left">
              Время создания
              <v-icon right x-small>south</v-icon>
            </th>
            <th class="text-center">
              Новых
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in filteredList" :key="index" class="fill-height">
            <td class="py-1">
              <v-chip :color="defineStatus(item.status).color" label dark small>
                <v-icon left>{{ defineStatus(item.status).icon }}</v-icon>
                {{item.status}}
              </v-chip>
            </td>
            <td class="py-1">
              <router-link :to="{name: 'HomeworkView', params: {id: item.id}}" class="text-decoration-none">
                {{ item.title }}
              </router-link>
            </td>
            <td class="py-1">{{ item.discipline }}</td>
            <!--          <td class="py-1">{{ item.controlEvent }}</td>-->
            <td class="py-1">{{ item.createdAt | formatDate }}</td>
            <td class="text-center"><v-icon left :color="(item.newItems > 0) ? 'red' : ''">notifications_active</v-icon>{{ item.newItems }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Homework",
  data() {
    return {
      valid: false,
      searchForm: {
        title: '',
        status: '',
        discipline: '',
        semester: ''
      }
    }
  },
  methods: {
    defineStatus(name) {
      let definedStatus = this.getStatusList.filter(item => item.name === name.toString());
      return definedStatus[0];
    },
  },
  filters: {
    formatDate(str) {
      return new Date(Number(str)).toLocaleString('ru');
    },
  },
  computed: {
    ...mapGetters(['getProcess', 'getProcessName', 'getHomeworkList', 'getStatusList', 'getSemesters', 'getDisciplineListOnly']),
    filteredList() {
      let homeworkList = this.getHomeworkList;
      if (this.searchForm.title) {
        homeworkList = homeworkList.filter(item =>
          item.title.toLowerCase().indexOf(this.searchForm.title.toLowerCase()) >= 0);
      }
      if (this.searchForm.discipline) {
        homeworkList = homeworkList.filter(item =>
          item.discipline.toLowerCase().indexOf(this.searchForm.discipline.toLowerCase()) >= 0);
      }
      if (this.searchForm.status.length > 0) {
        let statusNames = this.searchForm.status.map(item => item.name);
        homeworkList = homeworkList.filter(item =>
          statusNames.indexOf(item.status) >= 0);
      }
      if (this.searchForm.semester) {
        homeworkList = homeworkList.filter(item =>
          item.semester.indexOf(this.searchForm.semester) >= 0);
      }
      return homeworkList;
    },
  },
  created() {
    this.searchForm.semester = this.getSemesters.active;
    this.$store.dispatch('LOAD_HOMEWORKS');
  }
}
</script>

<style scoped>
table tr .v-icon {
  font-size: 18px;
}
</style>
