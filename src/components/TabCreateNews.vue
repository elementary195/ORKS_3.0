<template>
  <v-container>
    <v-row justify="center" class="pa-4">
    <v-flex xs11 md9>
      <form>
        <v-text-field class="mb-3" clearable clear-icon="clear" outlined v-model="title" :error-messages="titleErrors" counter="200" label="Заголовок" required @input="$v.title.$touch()" @blur="$v.title.$touch()"></v-text-field>
        <v-textarea class="mb-3" hint="Допускается использование элементов html-разметки" auto-grow clearable clear-icon="clear"  counter outlined v-model="text" :error-messages="textErrors" label="Описание" required @input="$v.text.$touch()" @blur="$v.text.$touch()"></v-textarea>
        <v-expansion-panels class="mb-10" inset focusable accordion :disabled="text.length === 0">
          <v-expansion-panel>
            <v-expansion-panel-header>
              Предпросмотр описания
              <template v-slot:actions>
                <v-icon color="primary">expand_more</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <p v-html="text"></p>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-file-input v-model="files" outlined small-chips counter multiple show-size truncate-length="15" label="Файлы" prepend-icon="" clear-icon="clear">
          <v-icon slot="append" color="red">
            attach_file
          </v-icon>
        </v-file-input>
        <v-checkbox class="mb-3" outlined off-icon="check_box_outline_blank" on-icon="check_box" v-model="checkbox" :error-messages="checkboxErrors" label="Подтверждаю" required @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>

        <v-btn class="mr-4" @click="submit" color="success" :disabled="this.$v.$invalid">Отправить</v-btn>
        <v-btn @click="clear">Очистить</v-btn>
      </form>
    </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: "TabCreateNews",
  mixins: [validationMixin],

  validations: {
    title: { required, maxLength: maxLength(200) },
    checkbox: {
      checked (val) {
        return val
      },
    },
    text: { required }
  },

  data: () => ({
    title: '',
    checkbox: false,
    text: '',
    files: [],
  }),

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('Подтвердите данные')
      return errors
    },
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.maxLength && errors.push('Заголовок должен быть <= 200 символов')
      !this.$v.title.required && errors.push('Введите заголовок')
      return errors
    },
    textErrors () {
      const errors = []
      if (!this.$v.text.$dirty) return errors
      !this.$v.text.required && errors.push('Введите текст')
      return errors
    },
  },

  methods: {
    submit () {
      this.$v.$touch();
      this.$store.dispatch('UPLOAD_NEWS', {title: this.title, text: this.text, files: this.files})
      this.clear()
    },
    clear () {
      this.$v.$reset()
      this.title = ''
      this.text = ''
      this.files = []
      this.checkbox = false
    },
  },
}
</script>

<style scoped>

</style>
