<template>
  <v-row align="center" class="flex-column mt-15">
    <v-icon size="80px" color="red">error</v-icon>
    <v-divider></v-divider>
    <h1 class="my-10">К сожалению, такой страницы не существует</h1>
    <router-link :to="{name: 'Home'}" class="text-decoration-none">
      Перейти на главную страницу
    </router-link>
  </v-row>
</template>

<script>
export default {
  name: "Whoops"
}
</script>

<style scoped>

</style>
