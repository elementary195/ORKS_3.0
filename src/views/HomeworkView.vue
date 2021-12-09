<template>
 <v-container>

   <v-sheet color="grey lighten-4" elevation="3" class="mb-10 pa-4" rounded>
       <v-row>
         <v-col cols="auto" class="hidden-sm-and-down">
           <v-tooltip bottom>
             <template v-slot:activator="{ on, attrs }">
               <v-btn color="blue" elevation="2" outlined x-large v-bind="attrs" v-on="on">
                 <v-icon x-large>mark_email_unread</v-icon>
               </v-btn>
             </template>
             <span>Пометить непрочитанным</span> <!-- Отправка уведомления -->
           </v-tooltip>
         </v-col>
         <v-col cols="auto" class="d-flex flex-column">
           <span class="text-lg-h4 text--primary text-h6">{{selectedHomework.title}}</span>
           <span class="text--secondary">{{selectedHomework.discipline}} | {{selectedHomework.type}}
             <span v-if="selectedHomework.option">(Вариант: {{selectedHomework.option.toString()}})</span>
           </span>
         </v-col>
         <v-spacer/>
         <v-col cols="auto">
           <v-chip label outlined x-large class="px-10 hidden-sm-and-down">
             <v-icon left>{{ defineStatus(selectedHomework.status).icon }}</v-icon>
             {{selectedHomework.status}}
           </v-chip>
           <v-chip label outlined class="px-10 hidden-md-and-up">
             <v-icon left>{{ defineStatus(selectedHomework.status).icon }}</v-icon>
             {{selectedHomework.status}}
           </v-chip>
         </v-col>
       </v-row>
     </v-sheet>

   <v-row justify="center" class="pa-4">
     <v-flex xs11 md9>
       <v-list three-line>
        <user-message
          v-for="(item, index) in selectedHomework.messages"
          :item="item"
          :key="index"
         title=""/>
       </v-list>

       <v-form class="mt-10">
         <v-textarea outlined v-model="desc" clearable auto-grow name="input-7-1" label="Сообщение"
                     :error-messages="descErrors" @input="$v.title.$touch()" @blur="$v.title.$touch()" value=""
                     hint="Максимум 1000 символов" counter="1000"></v-textarea>
         <v-file-input v-model="files" outlined small-chips counter multiple show-size truncate-length="15"
                       label="Файлы" prepend-icon="" clear-icon="clear">
           <v-icon slot="append" color="red">
             attach_file
           </v-icon>
         </v-file-input>
         <v-btn class="mr-4" type="submit" @click="submit" :disabled="this.$v.$invalid" color="success">
           Отправить
           <v-icon right>send</v-icon>
         </v-btn>
         <v-btn @click="clear">Очистить</v-btn>
       </v-form>
     </v-flex>
   </v-row>
 </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import userMessage from "../components/Message"
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: "ViewHomework",
  mixins: [validationMixin],

  validations: {
    desc: { required, maxLength: maxLength(1000) }
  },
  data() {
    return {
      desc: null,
      files: null,
    }
  },
  components: {
    userMessage
  },
  computed: {
    ...mapGetters(['getHomeworkList', 'getHomeworkTypes', 'getStatusList', 'getProcess', 'getProcessName']),
    selectedHomework() {
      return this.getHomeworkList.find(item => item.id === this.$route.params.id);
    },
    descErrors () {
      const errors = []
      if (!this.$v.desc.$dirty) return errors
      !this.$v.desc.maxLength && errors.push('Ваше сообщение слишком большое')
      !this.$v.desc.required && errors.push('Необходимо что-то написать')
      return errors
    },
  },
  methods: {
    defineStatus(name) {
      let definedStatus = this.getStatusList.filter(item => item.name === name.toString());
      return definedStatus[0];
    },
    submit () {
      this.$v.$touch();

      this.clear();

    },
    clear () {
      this.$v.$reset()
      this.desc = null
    },
  },
  filters: {
    formatDate(str) {
      return new Date(Number(str)).toLocaleString('ru');
    },
  },
  created() {
    console.log(this.selectedHomework)
  }
}
</script>

<style scoped>

</style>
