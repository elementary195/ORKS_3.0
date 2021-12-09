<template>
  <div>
    <v-subheader v-if="item.header" v-text="item.header"></v-subheader>

    <v-divider v-else-if="item.divider" :inset="item.inset"></v-divider>

    <v-list-item v-else>
      <v-list-item-avatar color="blue">
        <!-- Заменить src на -> avatar -->
        <v-img :src="getUser.photoURL"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          {{getUser.fullName}}
          <!-- В дальнейшем получать статус онлайна преподавателя -->
<!--          <v-icon right v-if="item.online">circle</v-icon>-->
        </v-list-item-title>
        <v-list-item-subtitle>{{item.createdAt | formatDate}}</v-list-item-subtitle>
        <p class="mt-5">{{item.text}}</p>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "message",
  props: {
    "item": {
      type: Object,
      required: true,
    },
    'title': {
      type: String,
      required: true,
    },
  },
  filters: {
    formatDate(str) {
      return new Date(Number(str)).toLocaleString('ru');
    },
  },
  methods: {

  },
  computed: {
    ...mapGetters(['getUser']),
  }
}
</script>

<style scoped>

</style>
