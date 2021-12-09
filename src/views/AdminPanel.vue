<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-tabs color="blue" v-model="tab" align-with-title class="mt-5 mb-10" fixed-tabs centered :show-arrows="true" next-icon="navigate_next" prev-icon="navigate_before">
          <v-tab v-for="item in tabsMenu" :key="item.title">
            <v-icon left>{{item.icon}}</v-icon>
            {{ item.title }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in tabsMenu" :key="item.title">
            <component :is="item.componentName"></component>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TabCreateNews from "../components/TabCreateNews";
import TabSendNotification from "../components/TabSendNotification";
import TabAddToFirestore from "../components/TabAddToFirestore";


export default {
  name: "AdminPanel",
  data() {
    return {
      tab: null,
      currentTab: 'News',
      tabsMenu: [
        {
          title: 'Создать новость',
          icon: 'public',
          componentName: 'TabCreateNews'
        },
        {
          title: 'Послать уведомление',
          icon: 'add_alert',
          componentName: 'TabSendNotification'
        },
        {
          title: '',
          icon: 'add',
          componentName: 'TabAddToFirestore'
        }
      ]
    }
  },
  components: {
    TabCreateNews,
    TabSendNotification,
    TabAddToFirestore,
  }
}
</script>

<style scoped>

</style>
