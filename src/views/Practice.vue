<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Компания</th>
          <th class="text-left hidden-sm-and-down">Представитель компании</th>
          <th class="text-left">Контактные данные компании</th>
          <th class="text-left hidden-sm-and-down">Научный руководитель МИЭТ</th>
          <th class="text-left hidden-sm-and-down">Руководитель от предприятия</th>
          <th class="text-center hidden-sm-and-down">Местоположение</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in placesOfPractice" :key="item.title">
          <td>{{ item.title }}</td>
          <td class="hidden-sm-and-down">{{ item.representative }}</td>
          <td>{{ item.contacts }}</td>
          <td class="hidden-sm-and-down">{{ item.directorMiet || '-/-' }}</td>
          <td class="hidden-sm-and-down">{{ item.directorCompany || '-/-' }}</td>
          <td class="text-center hidden-sm-and-down">
            <v-icon color="red" style="cursor: pointer">location_on</v-icon>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: "Practice",
  data() {
    return {
      placesOfPractice: [
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
        {
          title: 'Наименование',
          representative: '\tГенеральный директор',
          contacts: 'ИНН 9999999999 КПП 999999999 ОГРН 1111111111111 111111, г. Москва, Тел.: 8-999-999-99-99',
          directorMiet: '',
          directorCompany: '',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
