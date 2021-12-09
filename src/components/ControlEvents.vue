<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-start">Неделя</th>
        <th class="text-start">Наименование</th>
        <th class="text-center">Баллы</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="event in discipline.controlEvents" class="user-select-none" :style="{backgroundColor: (event.additional) ? '#dff0d8' : ''}">
        <td class="text-start">{{ event.week | checkWeek }}</td>
        <td class="text-start">{{ event.title }}</td>
        <td class="text-center">
          <div class="points-cell text-center white--text d-flex align-center justify-center text-no-wrap" :style="{backgroundColor: gradeColor(event.points, event.pointsMax)}">
            <span class="justify-center">{{ event.points }}&nbsp;/&nbsp;{{ event.pointsMax }}</span>
          </div>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>

export default {
  name: "ControlEvents",
  props: {
    discipline: {
      type: Object,
      required: true,
    }
  },
  methods: {
    gradeColor(points, pointsMax) {
      if (points / pointsMax >= 0.86) return '#29cf00';
      else if (points / pointsMax >= 0.70) return '#99cc33';
      else if (points / pointsMax >= 0.50) return '#f1c40f';
      else if (points / pointsMax >= 0.35) return '#ff7636';
      else return '#ff0800';
    },
  },
  filters: {
    checkWeek(str) {
      return (Number(str) >= 18) ? 'Итог' : str
    }
  }
}
</script>

<style scoped>

</style>
