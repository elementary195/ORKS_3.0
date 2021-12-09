<template>
  <div>
    <v-alert icon="info" text type="info" elevation="5" :min-width="100" class="mb-15">
      Техническая поддержка рубежного контроля: <a href="https://mail.ru/">test@inbox.ru</a>
    </v-alert>

    <v-row class="justify-space-around">
      <template v-for="(link, index) in oroksMenu">
        <v-lazy :options="{threshold: 0.5}"  transition="fade-transition">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card elevation="2" :height="height" :width="width" class="mb-5">
                <v-img
                  :src="link.background"
                  alt=""
                  :height="height"
                  :width="width">
                  <v-fade-transition>
                    <v-overlay absolute color="black" :opacity="(hover) ? 0.3 : 0.6">
                      <v-card-subtitle class="font-weight-bold text-center">
                        <a :href="link.link" class="white--text">{{link.title}}</a>
                      </v-card-subtitle>
                    </v-overlay>

                    <!--                  Начальный вариант на белом фоне:-->
                    <!--                  <v-overlay absolute :color="(hover) ? 'black' : 'white'" :opacity="(hover) ? 0.5 : 0.7">-->
                    <!--                    <v-card-subtitle class="font-weight-bold text-center">-->
                    <!--                      <a :href="link.link" :style="(hover) ? 'color: white' : 'color: black'">{{link.title}}</a>-->
                    <!--                    </v-card-subtitle>-->
                    <!--                  </v-overlay>-->
                  </v-fade-transition>
                </v-img>
              </v-card>
            </template>
          </v-hover>

        </v-lazy>
      </template>
    </v-row>

<!--Обычный список-->
<!--    <v-list dense>-->
<!--      <v-list-item-group color="primary">-->
<!--        <v-list-item v-for="(link, index) in oroksMenu" :key="index">-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>-->
<!--              <a target="_blank" :href="link.link">{{link.title}}</a>-->
<!--            </v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list-item-group>-->
<!--    </v-list>-->
<!--&lt;!&ndash;    <a v-for="link in oroksMenu" :href="link.link">{{link.title}}</a>&ndash;&gt;-->
  </div>
</template>

<script>
export default {
  name: "TabOroks",
  data() {
    return {
      isActive: false,
      oroksSelected: null,
    }
  },
  computed: {
    height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 80
        case 'sm': return 80
        case 'md': return 100
        case 'lg': return 120
        case 'xl': return 140
      }
    },
    width () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 140
        case 'sm': return 160
        case 'md': return 180
        case 'lg': return 200
        case 'xl': return 220
      }
    },

    oroksMenu() {
      return [
        {
          title: 'Рубежный контроль',
          link: '',
          background: 'https://cdn.pixabay.com/photo/2015/12/26/08/20/brick-wall-1108405_960_720.jpg',
        },
        {
          title: 'Военная',
          link: '',
          background: 'https://cdn.pixabay.com/photo/2012/04/13/21/29/camouflage-33708_960_720.png'
        },
        {
          title: 'Высшей математики № 1',
          link: '',
          background: ''
        },
        {
          title: 'Высшей математики № 2',
          link: '',
          background: 'https://cdn.pixabay.com/photo/2016/07/11/12/16/mathematics-1509559_960_720.jpg'
        },
        {
          title: 'Вычислительной техники',
          link: '',
          background: 'https://cdn.pixabay.com/photo/2013/11/20/09/35/background-213649_960_720.jpg'
        },
        {
          title: 'Инженерной графики и дизайна',
          link: '',
          background: 'https://cdn.pixabay.com/photo/2016/11/11/20/05/wave-1817646_960_720.png'
        },
        {
          title: 'Институт Биомедицинских систем',
          link: '',
          background: 'https://cdn.pixabay.com/photo/2013/07/18/10/55/microbiology-163470_960_720.jpg'
        },
        {
          title: 'Институт лингвистического и педагогического образования',
          link: '',
          background: 'https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418_960_720.jpg'
        },
        {
          title: 'Институт международного образования',
          link: '',
          background: 'https://cdn.pixabay.com/photo/2016/04/01/22/51/cooperation-1301790_960_720.png'
        },
        {
          title: 'Институт микроприборов и систем управления',
          link: '',
          background: 'https://evoliplus.ru/wp-content/uploads/2020/11/offer-4.png.webp'
        },
        {
          title: 'Институт нано- и микросистемной техники',
          link: '',
          background: 'https://greatcaretcs.com/wp-content/uploads/2019/08/network.png'
        },
        {
          title: 'Институт перспективных материалов и технологий',
          link: '',
          background: 'https://forpost-sz.ru/sites/default/files/doc/2020/01/27/1.jpg'
        },
        {
          title: 'Институт системной и программной инженерии и информационных технологий',
          link: '',
          background: 'http://ictis.sfedu.ru/wp-content/uploads/2016/07/systems-engineering-1.jpg'
        },
        {
          title: 'Институт Физики и Прикладной Математики',
          link: '',
          background: 'https://www.tspu.edu.ru/images2/moskalev/inir/otd_issl_razr.jpg'
        },
        {
          title: 'Интегральной электроники и микросистем',
          link: '',
          background: 'https://news.utmn.ru/upload/iblock/bbf/uchenyeraskrylistrukturuisvoystvanovogopoluprovodnika.jpg'
        },
        {
          title: 'Информационной безопасности',
          link: '',
          background: 'https://fb.ru/misc/i/gallery/43355/2352771.jpg'
        },
        {
          title: 'Истории России, государства и права',
          link: '',
          background: 'https://cdn1.ozone.ru/multimedia/1023618004.jpg'
        },
        {
          title: 'Квантовой физики и наноэлектроники',
          link: '',
          background: 'https://debatechamber.com/wp-content/uploads/2017/03/bigstock-Advance-Of-Wave-Particle-109732595.jpg'
        },
        {
          title: 'Корпоративных информационных технологий и систем',
          link: '',
          background: 'https://vuzopedia.ru/storage/app/uploads/public/607/c8d/a52/607c8da523d8b308436540.jpg'
        },
        {
          title: 'Маркетинга и управления проектами',
          link: '',
          background: 'https://web-3.ru/data/articles/40159/3.jpg'
        },
        {
          title: 'Материалов функциональной электроники',
          link: '',
          background: 'https://www.eurolab.net/images/jenerik/kategori/tuketici-urunleri-testleri.jpg'
        },
        {
          title: 'Микроэлектроники',
          link: '',
          background: 'https://finobzor.ru/uploads/posts/2019-11/1572704325_selectronic-manufacture-bespoke-design.jpg'
        },
        {
          title: 'Микроэлектронных радиотехнических устройств и систем',
          link: '',
          background: 'https://static.tildacdn.com/tild3461-6637-4264-b931-393565356638/3_.jpg'
        },
        {
          title: 'Общей и физической химии',
          link: '',
          background: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612691796_97-p-zelenii-fon-khimiya-153.jpg'
        },
        {
          title: 'Права',
          link: '',
          background: 'https://chspu.ru/wp-content/uploads/2021/02/Pravovoe-obraz.-scaled.jpg'
        },
        {
          title: 'Проектирования и конструирования интегральных микросхем',
          link: '',
          background: 'https://skubr.ru/assets/images/custom-photos/3626.jpg'
        },
        {
          title: 'Промышленной экологии',
          link: '',
          background: 'https://vuzopedia.ru/storage/app/uploads/public/5e8/245/1bc/5e82451bc78ec018100229.jpg'
        },
        {
          title: 'Русского языка как иностранного',
          link: '',
          background: 'https://birja.com/uploads/ads/small/202103/ads_603f7341ce4d3.jpeg'
        },
        {
          title: 'Систем автоматического управления и контроля в микроэлектронике',
          link: '',
          background: 'https://vuzopedia.ru/storage/app/uploads/public/5a7/322/351/5a7322351df7c037814364.jpg'
        },
        {
          title: 'Системной среды качества',
          link: '',
          background: ''
        },
        {
          title: 'Телекоммуникационных систем',
          link: '',
          background: 'https://etu.ru/assets/cache/images/ru/meghdunarodnaya/1280x800-seminar.cce.jpg'
        },
        {
          title: 'Технической механики',
          link: '',
          background: 'https://c1503.c.3072.ru/pluginfile.php/3226/course/overviewfiles/%D1%82%D0%B5%D1%85%20%D0%BC%D0%B5%D1%85.jpg'
        },
        {
          title: 'Физического воспитания',
          link: '',
          background: 'https://novostipmr.com/sites/default/files/field/image/202007/these-are-8-grossest-spots-gym.jpg'
        },
        {
          title: 'Философии, социологии и политологии',
          link: '',
          background: 'https://pravlife.org/sites/default/files/field/image/2019.11.22/vvv.jpg'
        },
        {
          title: 'Экономика, менеджмент и финансы',
          link: '',
          background: 'https://www.profiz.ru/upl/pictures/SE/03_2020/podderjka%201.jpeg'
        },
        {
          title: 'Экономической теории и финансов',
          link: '',
          background: 'https://barnaul.centrfenix.ru/files/pages/53(1).jpg'
        },
        {
          title: 'Электротехники и электроники',
          link: '',
          background: 'https://avatars.mds.yandex.net/get-altay/2804357/2a00000170c85687cc12347004c5935ccd02/XXL'
        },
        {
          title: 'ЮНЕСКО',
          link: '',
          background: 'https://www.zarubejom.ru/wp-content/uploads/2018/07/unesco-united-states-withdrew-flags.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
