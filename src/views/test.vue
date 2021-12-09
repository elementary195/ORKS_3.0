<template>
  <v-container>
    <v-btn>Добавить</v-btn>
    {{new Date(Date.now()).toLocaleString("ru")}}
  </v-container>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      date: [2021, 6, 28, 17, 0, 18],
    }
  },
  methods: {
    // readDate(dateArray) {
    //   dateArray
    // }
  }
}
</script>

<style scoped>

</style>
