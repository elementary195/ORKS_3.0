<template>
  <v-container>
    <v-card elevation="2" rounded color="grey lighten-5" :loading="getProcess">
      <v-system-bar>
        <v-icon>public</v-icon>
        <v-spacer/>
        <span>опубликовано: {{selectedNews.createdAt | formatDate}}</span>
      </v-system-bar>
      <v-card-title class="text-h6 text-lg-h5 justify-center">"{{selectedNews.title}}"</v-card-title>
      <v-divider v-if="selectedNews.text"/>
      <v-card-text class="text--primary" v-if="selectedNews.text" v-html="selectedNews.text"/>
      <div>
        <v-divider/>
        <v-card-text v-if="files.length > 0" class="text--secondary">
          Прикреплённые файлы:<br>
          <a :href="file.link" target="_blank" v-for="(file, index) in files" :key="index" class="mr-2">{{ file.name }}</a>
        </v-card-text>
      </div>
      <v-footer>
        <v-spacer/>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" text color="blue lighten-2" v-bind="attrs" v-on="on" @click="rateNews('like')">
              <v-icon left>thumb_up</v-icon><span>{{ selectedNews.likes }}</span>
            </v-btn>
          </template>
          <span>Нравится</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" text color="red lighten-2" v-bind="attrs" v-on="on" @click="rateNews('dislike')">
              <v-icon left>thumb_down</v-icon><span>{{ selectedNews.dislikes }}</span>
            </v-btn>
          </template>
          <span>Не нравится</span>
        </v-tooltip>
      </v-footer>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import Vue from "vue"

export default {
  name: "NewsView",
  data() {
    return {
      files: [],
      selectedNews: {}
    }
  },
  methods: {
    rateNews(rate) {
      this.$store.dispatch('RATE_NEWS', {id: this.selectedNews.id, rate: rate})
    }
  },
  computed: {
    ...mapGetters(['getProcess']),
  },
  filters: {
    formatDate(str) {
      return new Date(Number(str)).toLocaleString('ru');
    },
  },
  created() {
    //Загрузка основной информации
    Vue.$db.collection('news').doc(this.$route.query.id).get().then(snapshot => {
      this.selectedNews = snapshot.data();
      this.selectedNews.id = snapshot.id;
    })
    .catch(error => alert(error))

    //Загрузка файлов
    Vue.$storage.child(`news/${this.$route.query.id}`).listAll()
      .then(snapshot => {
        if (snapshot) {
          let arr = [];
          snapshot.items.forEach(item => {
            item.getDownloadURL()
              .then(url => {
                arr.push({
                  name: item.name,
                  link: url
                });
              })
              .catch(error => alert(error))
          })
          this.files = arr;
        }
      })
      .catch(error => alert(error.message))
  }
}
</script>

<style scoped>

</style>
