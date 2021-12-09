<template>
  <!-- В будущем переделать -->
  <v-card elevation="2" color="grey lighten-5" rounded>
    <v-card-title class="text-break">{{discipline.title}}</v-card-title>
    <v-card-text class="discipline-description-inner text--primary">
      <div>
        <span class="font-weight-bold">Форма контроля:</span> {{discipline.controlForm | toLower}}
        <v-tooltip bottom max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-icon small v-bind="attrs" v-on="on">info</v-icon>
          </template>
          <span v-html="findTooltip(discipline.controlForm)"/>
        </v-tooltip>
        <v-divider class="my-2"/>
      </div>
      <div>
        <span class="font-weight-bold">Кафедра / Институт:</span> {{discipline.department | toLower}}
        <v-divider class="my-2"/>
        <span class="font-weight-bold">Преподаватель:</span>
        <template v-for="(teacher, index) in discipline.teacher">
          <br>{{teacher}}
        </template>
        <v-divider class="my-2"/>
      </div>
     <div>
       <span class="font-weight-bold">Консультации:</span> {{discipline.consultations}}
       <v-divider class="my-2"/>
     </div>
     <div>
       <span class="font-weight-bold">Ресурсы дисциплины:</span> <a :href="discipline.resourcesLink" target="_blank">Ссылка</a>
       <v-divider class="my-2"/>
     </div>
      <div>
        <span class="font-weight-bold">Новости:</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "DisciplineDescription",
  props: {
    discipline: {
      type: Object,
      required: true,
    },
  },
  methods: {
    findTooltip(controlForm) {
      return this.getDisciplineControlForms.find(i => i.name === controlForm).tooltip;
    }
  },
  filters: {
    toLower(str) {
      return str.toLowerCase();
    }
  },
  computed: {
    ...mapGetters(['getDisciplineControlForms'])
  }
}
</script>

<style scoped>
.desc {
  border: 1px solid lightgrey;
}
.discipline-description-inner {
  font-size: 14px;
}
</style>
