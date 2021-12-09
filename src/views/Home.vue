<template>
  <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-tabs color="blue" v-model="tab" align-with-title class="my-5" fixed-tabs centered :show-arrows="true" next-icon="navigate_next" prev-icon="navigate_before">
            <v-tab v-for="item in tabsMenu" :key="item.title">
              {{ item.title }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in tabsMenu" :key="item.title">
              <v-card flat>
                <v-card-text class="mt-5">
                  <component :is="item.componentName"></component>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import TabNews from "../components/TabNews";
import TabOroks from "../components/TabOroks";
import TabContacts from "../components/TabContacts";
import TabFAQ from "../components/TabFAQ";

export default {
  name: "Home",
  components: {
    'News' : TabNews,
    'Oroks' : TabOroks,
    'Contacts' : TabContacts,
    'FAQ' : TabFAQ
  },
  data() {
    return {
      tab: null,
      currentTab: 'News'
    }
  },
  computed: {
    tabsMenu() {
      return [
        {title: 'Новости', componentName: 'News'},
        {title: 'ОРОКС', componentName: 'Oroks'},
        {title: 'Контакты', componentName: 'Contacts'},
        {title: 'F.A.Q. по институту', componentName: 'FAQ'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
