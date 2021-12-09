<template>
  <div>
    <div class="d-flex justify-center" v-if="getProcess">
      <v-progress-circular class="mt-10" :size="100" :width="3"  indeterminate>{{ getProcessName }}</v-progress-circular>
    </div>
    <div v-else>
      <v-divider/>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left hidden-sm-and-down"></th>
            <th class="text-left">Дата</th>
            <th class="text-left">Заголовок</th>
            <th class="text-left">Ссылка</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in getNews" :key="`news#${index}`" class="fill-height">
            <td class="py-1 hidden-sm-and-down"><v-icon left color="red" small>label</v-icon></td>
            <td class="py-1">{{ item.createdAt | formatDate }}</td>
            <td class="py-1">{{ item.title }}</td>
            <td class="py-1">
              <router-link :to="{path: '/view-news', query: {id: item.id}}" class="text-decoration-none">
                <v-icon>insert_link</v-icon>
              </router-link>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-divider/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "TabNews",
  created() {
    this.$store.dispatch('LOAD_NEWS');
  },
  computed: {
    ...mapGetters(['getNews', 'getProcess', 'getProcessName']),
  },
  filters: {
    formatDate(str) {
      return new Date(Number(str)).toLocaleString('ru');
    },
  },
}
</script>

<style scoped>

</style>
