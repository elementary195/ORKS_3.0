<template>
  <v-container>
    <v-card :loading="getProcess">

      <v-toolbar light color="grey lighten-2">
        <v-toolbar-title v-text="getUser.fullName || 'Не задано'"/>
        <v-spacer/>
        <v-chip color="grey lighten-1">{{ getUser.personalCode || 'Не задано' }}</v-chip>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="4" md="3" class="d-flex flex-column align-center">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-avatar color="deep-purple lighten-1" height="25vmin" width="25vmin">
                  <img :src="getUser.photoURL" alt="">
                      <!-- Модальное окно по нажатию на иконку загрузки фото -->
                      <v-dialog v-model="dialog" persistent max-width="490">
                        <template v-slot:activator="{ on, attrs }">
                          <v-fade-transition>
                            <v-overlay v-if="hover" absolute color="#036358">
                              <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon>file_upload</v-icon>
                              </v-btn>
                            </v-overlay>
                          </v-fade-transition>
                        </template>
                        <v-card>
                          <v-card-title class="text-h5">Обновление фотографии профиля</v-card-title>
                          <v-card-subtitle class="pt-2">Для обновления используйте URL-адрес понравившегося вам изображения.</v-card-subtitle>
                          <v-card-text>
                            <v-text-field v-model="photoURL" label="URL-адрес" append-icon="account_circle" :rules="rules"></v-text-field>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" text @click="dialog = false">
                              Отмена
                            </v-btn>
                            <v-btn color="green darken-1" text @click="dialog = false; updateProfile()" :disabled="!photoURL">
                              Подтвердить
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <!-- Бывшая идея: обновлять аватарку файлами с компьютера -->
<!--                      <v-file-input v-model="photoURL" hide-input dark truncate-length="22" class="ma-0 pa-0" prepend-icon="file_upload"></v-file-input>-->
                </v-avatar>
              </template>
            </v-hover>
            <v-alert dense text type="success" icon="check_circle" width="70%" class="mt-4 hidden-sm-and-down">
              {{ getUser.status  || 'Не задано' }}
            </v-alert>
          </v-col>
          <v-col cols="8" md="9">

            <v-text-field label="Полное имя" :disabled="getProcess" readonly :value="getUser.fullName || 'Не задано'"/>

            <v-text-field label="Дата рождения" :disabled="getProcess" readonly :value="getUser.dateOfBirth || 'Не задано'"/>

            <v-text-field label="E-mail" :disabled="getProcess" :readonly="!edit" :value="getUser.email" type="email" @click:append="sendConfirmationMail">
              <template v-slot:append>
                <template v-if="getUser.emailVerified">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="green" v-bind="attrs" v-on="on" style="cursor: pointer">done</v-icon>
                    </template>
                    <span>Подтверждено</span>
                  </v-tooltip>
                </template>
                <template v-else>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="blue" v-bind="attrs" @click="sendConfirmationMail" v-on="on" style="cursor: pointer">forward_to_inbox</v-icon>
                    </template>
                    <span>Подтвердить электронный адрес</span>
                  </v-tooltip>
                </template>
              </template>
            </v-text-field>

            <v-text-field label="Персональный ID" :disabled="getProcess" class="user-select-none" readonly :value="getUser.userId"/>
          </v-col>
        </v-row>
      </v-card-text>

      <v-footer>

      </v-footer>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters(['getProcess', 'getUser', 'getError', 'getSuccessMsg']),
  },
  data () {
    return {
      edit: false,
      dialog: false,
      snackbar: false,
      photoURL: '',
      rules: [
        value => !!value || '',
      ]
    }
  },
  methods: {
    sendConfirmationMail() {
      this.$store.dispatch('SEND_CONFIRMATION_MAIL');
    },
    updateProfile() {
      this.$store.dispatch('UPDATE_USER', {photoURL: this.photoURL});
      this.photoURL = '';
    }
  },
}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
