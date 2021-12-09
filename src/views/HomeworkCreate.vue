<template>
  <v-container>
    <v-overlay :value="getProcess">
      <div class="d-flex flex-column align-center">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
        <span class="mt-5" v-text="getProcessNameFunc"></span>
      </div>
    </v-overlay>
    <v-row justify="center" class="pa-4">
      <v-flex xs11 md9>
        <v-form>
          <v-autocomplete class="mb-3" v-model="discipline" label="Дисциплина"
                          :items="getDisciplineListOnly" append-icon="expand_more" :error-messages="disciplineErrors"
                          required @input="$v.discipline.$touch()" @blur="$v.discipline.$touch()"></v-autocomplete>

          <v-text-field class="mb-3" v-model="title" :error-messages="titleErrors" counter="50"
                        label="Название задания" append-icon="textsms" clearable clear-icon="clear"
                        required @input="$v.title.$touch()" @blur="$v.title.$touch()"></v-text-field>

          <v-combobox class="mb-3" v-model="type" append-icon="expand_more" :error-messages="typeErrors"
                      :items="suggestedTypes" persistent-hint label="Тип работы" hint="Если подходящего варианта нет, напишите вручную"
                      required @input="$v.type.$touch()" @blur="$v.type.$touch()"></v-combobox>

          <v-text-field class="mb-3" v-model="option" label="Вариант" :error-messages="optionErrors" counter="3"
                        append-icon="pin" required @input="$v.option.$touch()" @blur="$v.option.$touch()"></v-text-field>

          <v-textarea class="mb-3" outlined v-model="text" clearable clear-icon="clear" auto-grow counter :error-messages="textErrors"
                      label="Описание" value="" hint="" required @input="$v.text.$touch()" @blur="$v.text.$touch()"></v-textarea>

          <v-file-input v-model="files" outlined small-chips counter multiple show-size truncate-length="15"
                        label="Файлы" prepend-icon="" clearable clear-icon="clear">
            <v-icon slot="append" color="red">attach_file</v-icon>
          </v-file-input>

          <v-btn class="mr-4" type="submit" @click.prevent="submit" color="success" :disabled="this.$v.$invalid">Добавить</v-btn>
          <v-btn @click="clear">Очистить</v-btn>
        </v-form>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import { validationMixin } from 'vuelidate'
import { required, maxLength, numeric } from 'vuelidate/lib/validators'

export default {
  name: "CreateHomework",
  mixins: [validationMixin],

  validations: {
    discipline: { required },
    title: { required, maxLength: maxLength(50) },
    type: { required },
    option: { maxLength: maxLength(3), numeric },
    text: { required, maxLength: maxLength(300) }
  },
  data() {
    return {
      discipline: null,
      title: null,
      type: null,
      option: null,
      text: null,
      files: [],
      suggestedTypes: [
        'Домашняя работа',
        'Лабораторная работа',
        'Расчёт',
        'Вопрос',
      ]
    }
  },
  methods: {
    submit () {
      this.$v.$touch();
      const obj = {
        discipline: this.discipline,
        title: this.title,
        type: this.type,
        option: this.option,
        text: this.text,
        files: this.files,
      }
      this.$store.dispatch('UPLOAD_HOMEWORK', obj)
      this.clear();

    },
    clear () {
      this.$v.$reset()
      // Object.keys(this.form).forEach(obj => obj = null)
      this.discipline = null
      this.title = null
      this.type = null
      this.option = null
      this.text = null
      this.files = []
    },
  },
  computed: {
    ...mapGetters(['getDisciplineListOnly', 'getSemesters', 'getUser', 'getProcess', 'getProcessName']),
    disciplineErrors () {
      const errors = []
      if (!this.$v.discipline.$dirty) return errors
      !this.$v.discipline.required && errors.push('Выберите дисциплину')
      return errors
    },
    typeErrors () {
      const errors = []
      if (!this.$v.type.$dirty) return errors
      !this.$v.type.required && errors.push('Укажите тип отправляемой работы')
      return errors
    },
    optionErrors () {
      const errors = []
      if (!this.$v.option.$dirty) return errors
      !this.$v.option.maxLength && errors.push('Номер варианта не может состоять более чем из 3-х символов')
      !this.$v.option.numeric && errors.push('Допускается только ввод чисел')
      return errors
    },
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.maxLength && errors.push('Максимум 50 символов')
      !this.$v.title.required && errors.push('Введите заголовок')
      return errors
    },
    textErrors () {
      const errors = []
      if (!this.$v.text.$dirty) return errors
      !this.$v.title.maxLength && errors.push('Максимум 300 символов')
      !this.$v.text.required && errors.push('Введите текст')
      return errors
    },
  }
}
</script>

<style scoped>

</style>
