<template>
  <div>
    <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5 d-flex justify-space-between align-center">
            ОРИОКС
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
<!--                  <v-badge color="red" dot left>-->
                    <v-avatar color="purple" size="40" v-bind="attrs" v-on="on">
                      <v-img :src="getUser.photoURL"></v-img>
                    </v-avatar>
<!--                  </v-badge>-->
              </template>
              <v-list nav>
                <v-list-item v-for="(item, index) in profileMenuItems"
                             :key="index" :to="item.route" :disabled="item.disabled">
                  <v-list-item-icon>
                    <v-icon left v-text="item.icon"/>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>

                <v-divider/>

                <v-dialog v-model="dialog" persistent max-width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-icon>
                        <v-icon>exit_to_app</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Выход</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5">
                      Вы действительно хотите выйти?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false">
                        Отмена
                      </v-btn>
                      <v-btn color="green darken-1" text @click="dialog = false; SignOut()">
                        Подтвердить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list>
            </v-menu>
          </v-list-item-title>
          <v-list-item-subtitle>Меню</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list nav>
        <template v-for="(item, index) in menuItems">
            <v-list-group no-action v-if="item.subItems.length !== 0" :disabled="item.disabled">
              <template v-slot:activator>

                <v-list-item-icon>
                  <v-icon v-html="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>

              </template>
              <v-list-item v-for="(item2, index2) in item.subItems" :key="index2" :to="item2.route">

                <v-list-item-title>{{item2.title}}</v-list-item-title>

                <v-list-item-icon>
                  <v-icon v-if="item2.icon" v-text="item2.icon"></v-icon>
                </v-list-item-icon>

              </v-list-item>
            </v-list-group>
            <v-list-item v-else :to="item.route" :disabled="item.disabled">

              <v-list-item-icon>
                <v-icon v-html="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>

            </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="mb-10" color="blue" v-if="isUserAuthenticated">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up">
        <v-icon>list</v-icon>
      </v-app-bar-nav-icon>

      <router-link :to="{name: 'Home'}" tag="span" style="cursor: pointer">
        <v-toolbar-title v-text="'ОРИОКС'"></v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-chip class="hidden-md-and-up" color="white" text-color="white" small outlined>
        <v-icon left>calendar_today</v-icon>
        1 числитель
      </v-chip>

      <v-toolbar-items class="hidden-sm-and-down">
<!--        Кнопки меню-->
        <template v-for="(item, index) in menuItems">
<!--          Если есть подпункты меню-->
          <template v-if="item.subItems.length !== 0">
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn small text v-bind="attrs" v-on="on" :disabled="item.disabled">
                  <v-icon left v-html="item.icon"/>
                  {{item.title}}
                  <v-icon right x-small>expand_more</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item2, index2) in item.subItems" :key="index2" :to="item2.route">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item2.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
<!--          Если нет подпунктов-->
          <template v-else>
            <v-btn small text :to="item.route" :disabled="item.disabled">
              <v-icon left v-html="item.icon"/>
              {{item.title}}
            </v-btn>
          </template>
        </template>
<!--        Личный кабинет-->
        <v-menu bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab icon small v-bind="attrs" v-on="on">
              <v-badge left color="red" dot>
                <v-icon>person</v-icon>
              </v-badge>
            </v-btn>

          </template>
          <v-list nav>
            <v-list-item v-for="(item, index) in profileMenuItems"
                         :key="index" :to="item.route" :disabled="item.disabled">
              <v-list-item-icon>
                <v-icon left v-text="item.icon"/>
              </v-list-item-icon>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-badge v-if="item.counter > 0" class="mt-0" color="red" inline :content="item.counter"></v-badge>
            </v-list-item>

            <v-divider/>

            <v-dialog v-model="dialog" persistent max-width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-bind="attrs" v-on="on">
                  <v-list-item-icon>
                    <v-icon>exit_to_app</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Выход</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Вы действительно хотите выйти?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Отмена
                  </v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false; SignOut()">
                    Подтвердить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list>
        </v-menu>

      </v-toolbar-items>
    </v-toolbar>

  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AppHeader",
  data() {
    return {
      drawer: false,
      dialog: false,
    }
  },
  methods: {
    SignOut() {
      this.$store.dispatch('SIGN_OUT');
      this.$router.push('/signin');
    }
  },
  computed: {
    ...mapGetters(['isUserAuthenticated', 'getUser']),
    profileMenuItems() {
      return [
        {
          icon: 'manage_accounts',
          title: 'Профиль',
          route: '/profile',
          disabled: false
        },
        {
          icon: 'folder',
          title: 'Личные файлы',
          route: '/files',
          disabled: true
        },
        {
          icon: 'notifications',
          title: 'Уведомления',
          route: '/announcements',
          disabled: true,
          counter: 6,
        }
      ]
    },
    menuItems() {
      return [
        {
          icon: 'business',
          title: 'Практика',
          route: '/practice',
          subItems: [],
          disabled: false,
        },
        {
          icon: 'school',
          title: 'Обучение',
          route: '/student',
          subItems: [],
          disabled: false,
        },
        {
          icon: 'home',
          title: 'Домашние задания',
          route: '/homework',
          subItems: [],
          disabled: false,
        },
        {
          icon: 'assignment_ind',
          addIcon: 'expand_more',
          title: 'Портфолио',
          route: '/portfolio',
          disabled: true,
          subItems: [
            {
              icon: null,
              title: 'Учебное',
              route: '/portfolio/educational'
            },
            {
              icon: null,
              title: 'Внеучебное',
              route: '/portfolio/extracurricular',
            },
          ],
        },
        {
          icon: 'assignment',
          title: 'Проектная работа',
          route: '/project_work',
          subItems: [],
          disabled: true,
        },
        {
          icon: 'outbound',
          addIcon: 'expand_more',
          title: 'Заявки',
          route: '/requests',
          subItems: [
            {
              icon: null,
              title: 'Обходной лист',
              route: `/requests/questionnaire`
            },
            {
              icon: null,
              title: 'Заявления (мат. помощь, соц. стипендия, копии док-ов)',
              route: `/requests/docs`
            },
            {
              icon: null,
              title: 'Справки',
              route: `/requests/reference`
            },
            {
              icon: null,
              title: 'Последипломный отпуск',
              route: `/requests/holiday`
            },
          ],
          disabled: true,
        },
        {
          icon: 'book',
          title: 'Электронные библиотеки',
          route: '/libraries',
          subItems: [],
          disabled: false,
        },
        {
          icon: 'info',
          title: 'Помощь',
          route: '/support',
          subItems: [],
          disabled: true,
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
