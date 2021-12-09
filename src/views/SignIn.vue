<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="9" sm="7" md="5" lg="3">
        <v-card class="elevation-12">
          <v-toolbar color="blue" dark flat>
            <v-toolbar-title>ОРИОКС</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-progress-circular indeterminate color="white" v-if="getProcess"></v-progress-circular>
          </v-toolbar>
          <v-card-text>
            <v-alert dense border="bottom" type="warning" icon="warning" v-if="getError">
              {{getError}}
            </v-alert>

            <v-form v-model="valid">

              <v-text-field label="Логин" name="login" prepend-icon="mdi-account" type="email"
                            v-model="email" :disabled="getProcess" required :error-messages="emailErrors"
                            @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
              <v-text-field id="password" label="Пароль" name="password" prepend-icon="mdi-lock"
                            type="password" :disabled="getProcess" v-model="password" required :error-messages="passwordErrors"
                            @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>

            </v-form>
          </v-card-text>
          <v-card-actions class="mb-5 justify-center">

            <v-btn color="blue" depressed @click.prevent="signIn" class="white--text pa-5"
                   :light="!valid || getProcess" :disabled="getProcess || this.$v.$invalid">Авторизоваться</v-btn>

          </v-card-actions>
          <v-footer>
            <v-container>
              <v-row align="center" justify="center" class="pa-5 text--secondary flex-column">
                <span>Мобильное приложение:</span>
                <v-row class="mt-5 col justify-space-around">
                  <a href="#" target="_blank">
                    <v-img max-height="60px" max-width="60px" src="static/svg/google-play.svg"></v-img>
                  </a>
                  <a href="#" target="_blank">
                    <v-img max-height="60px" max-width="60px" src="static/svg/apple-app-store.svg"></v-img>
                  </a>
                </v-row>
              </v-row>
            </v-container>
          </v-footer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import {mapGetters} from "vuex";
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: "SignIn",
  mixins: [validationMixin],
  validations: {
    email: {required, email: email},
    password: {required, minLength: minLength(6)},
  },
  data() {
    return {
      email: null,
      password: null,
      valid: false,
    }
  },
  methods: {
    signIn() {
      this.$v.$touch();
      this.$store.dispatch('SIGN_IN', {email: this.email, password: this.password});
      this.clear();
    },
    clear () {
      this.$v.$reset();
      this.email = null;
      this.password = null;
    },
  },
  computed: {
    ...mapGetters(['getError', 'isUserAuthenticated', 'getProcess']),
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Введите E-mail')
      !this.$v.email.email && errors.push('Проверьте правильность введенного E-mail')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Введите пароль')
      !this.$v.password.minLength && errors.push('Минимум 6 символов')
      return errors
    },
  },
  watch: {
    isUserAuthenticated(val) {
      if (val === true) this.$router.push('/');
    },
  }
}
</script>

<style scoped>
.v-btn {
  border-radius: 20px;
}
</style>
