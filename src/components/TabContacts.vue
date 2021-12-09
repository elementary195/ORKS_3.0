<template>
  <div>
    <v-divider/>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Кафедра/Институт
          </th>
          <th class="text-left">
            Аудитория
          </th>
          <th class="text-left">
            Телефон
          </th>
          <th class="text-left">
            Внутренний телефон
          </th>
          <th class="text-left">
            E-mail
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in contacts" :key="`contact#${index}`" class="fill-height">
          <td class="py-1"><a target="_blank" :href="item.department.link">{{item.department.title}}</a></td>
          <td class="py-1">{{item.audience}}</td>
          <td class="py-1">{{item.phone}}</td>
          <td class="py-1">{{item.innerPhone}}</td>
          <td class="py-1">{{item.email}}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-divider/>
  </div>
</template>

<script>
export default {
  name: "TabContacts",
  computed: {
    contacts() {
      return [
        {
          department: {
            title: 'ВК',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'ВМ-1',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'ВМ-2',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'ВТ',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'ИГД',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'Институт БМС',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'Институт ЛПО',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'ИМО',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'Институт МПСУ',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'Институт НМСТ',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'Институт ПМТ',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'Институт СПИНТех',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'ИЭМС',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
        {
          department: {
            title: 'ИБ',
            link: '#',
          },
          audience: '9999',
          phone: '(999) 999-99-99',
          innerPhone: '99-99',
          email: 'test@mail.ru',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
