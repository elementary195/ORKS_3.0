<template>
  <v-container>
    <v-row class="justify-md-space-around">
      <!-- Колонка с дисциплинами и баллами за них -->
      <v-col cols="12" md="5" lg="5">
          <v-simple-table>
            <template v-slot:default>
              <thead>

              <tr>
                <th><v-icon x-small>circle</v-icon></th>
                <th class="text-left text-h6">
                  <strong>Дисциплины</strong>
                </th>
                <th class="text-center">
                  <v-chip x-small label>Балл</v-chip>
                </th>
              </tr>

              </thead>
              <tbody>

              <tr v-for="item in getDisciplines" :key="item.title" class="user-select-none" @click.prevent="selectedDiscipline = item; tab = 0" style="cursor: pointer">
                <td><v-icon color="red" x-small>circle</v-icon></td>
                <td class="d-flex align-center">{{ item.title }}</td>
                <td class="text-center">
                  <div class="points-cell text-center white--text d-flex align-center justify-center" :style="{backgroundColor: gradeColor(item.points, (item.controlForm === 'Зачёт') ? 50 : 100)}">
                    <span class="justify-center">{{ item.points }}</span>
                  </div>
                </td>
              </tr>

              </tbody>
            </template>
          </v-simple-table>
      </v-col>
      <!-- Колонка с КМП и описанием дисциплины (доп. секции) -->
      <v-col cols="12" md="5" lg="5">
        <v-tabs-items v-model="tab">
          <!-- КМП -->
          <v-tab-item>
            <control-events :discipline="selectedDiscipline"/>
          </v-tab-item>
          <!-- Описание дисциплины -->
          <v-tab-item>
            <discipline-description :discipline="selectedDiscipline"/>
          </v-tab-item>
          <!-- Переключение между семестрами -->
          <v-tab-item>
            <div style="border: 2px darkgrey solid">
              <v-card elevation="5" color="grey lighten-5" :loading="getProcess">
                <v-card-title>{{getSemesters.active}}</v-card-title>
                <v-card-text>
                  <ul style="list-style-type: none" class="pa-0">
                    <li><strong>Направление:&nbsp;</strong><span v-if="getUser.studying.specialty">{{ getUser.studying.specialty.code }} | {{ getUser.studying.specialty.title }}</span></li>
                    <li><strong>Профиль:&nbsp;</strong><span v-if="getUser.studying.educationalProfile"></span>{{ getUser.studying.educationalProfile }}</li>
                    <li>
                      <strong>Семестр:</strong>
                      <v-select v-model="getSemesters.active" :items="getSemesters.list" append-outer-icon="local_library" menu-props="auto" hide-details label="Select" single-line></v-select>
                    </li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn>Перейти</v-btn>
                  <v-spacer/>
                </v-card-actions>
              </v-card>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <!-- TABS для переключения вида между КМП и описанием -->
      <v-col md="auto" v-if="selectedDiscipline" class="d-none d-md-block">
        <v-tabs vertical v-model="tab" light hide-slider centered class="d-flex flex-column align-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-tab :disabled="!selectedDiscipline" v-bind="attrs" v-on="on"><v-icon>date_range</v-icon></v-tab>
            </template>
            <span>Контрольные мероприятия</span>
          </v-tooltip>

          <v-divider/>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-tab :disabled="!selectedDiscipline" v-bind="attrs" v-on="on"><v-icon>description</v-icon></v-tab>
            </template>
            <span>Описание дисциплины</span>
          </v-tooltip>

          <v-divider/>

          <v-tab @click="selectedDiscipline = null; tab = 2;"><v-icon>arrow_back</v-icon></v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import ControlEvents from "../components/ControlEvents"
import DisciplineDescription from "../components/DisciplineDescription"

export default {
  name: "Student",
  components: {
    ControlEvents,
    DisciplineDescription
  },
  data() {
    return {
      selectedDiscipline: null,
      tab: 2, // 2 - "Назад"
    }
  },
  methods: {

    //ДУБЛИРОВАНИЕ в ControlEvents
    gradeColor(points, pointsMax) {
      if (points / pointsMax >= 0.86) return '#29cf00';
      else if (points / pointsMax >= 0.70) return '#99cc33';
      else if (points / pointsMax >= 0.50) return '#f1c40f';
      else if (points / pointsMax >= 0.35) return '#ff7636';
      else return '#ff0800';
    },
  },
  computed: {
    ...mapGetters(['getProcess', 'getSemesters', 'getDisciplines', "getUser"]),
  },
}
</script>

<style scoped>

</style>
