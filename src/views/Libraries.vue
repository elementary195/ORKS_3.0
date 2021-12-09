<template>
  <v-container>
    <div class="mb-10 display-2">Электронные библиотеки:</div>
    <div>
      <v-row class="justify-space-around">
        <template v-for="(item, index) in libs">
          <v-lazy :options="{threshold: 0.5}"  transition="fade-transition">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card elevation="2" :height="height" :width="width" class="mb-5">
                  <v-img
                    :src="item.background"
                    alt=""
                    :height="height"
                    :width="width">
                    <v-fade-transition>
                      <v-overlay absolute color="black" :opacity="(hover) ? 0.3 : 0.6">
                        <v-card-subtitle class="font-weight-bold text-center">
                          <a :href="item.link" class="white--text">{{item.title}}</a>
                        </v-card-subtitle>
                      </v-overlay>
                    </v-fade-transition>
                  </v-img>
                </v-card>
              </template>
            </v-hover>

          </v-lazy>
        </template>
      </v-row>
    </div>
  </v-container>

</template>

<script>
export default {
  name: "Libraries",
  computed: {
    libs() {
      return [
        {
          title: 'Электронно-библиотечная система Юрайт',
          link: 'https://urait.ru/',
          background: 'https://iphone-image.apkpure.com/v2/app/8/a/6/8a698f1cee204e832e29e10ea75219e6.jpg'
        },
        {
          title: 'ЭБС "КОНСУЛЬТАНТ СТУДЕНТА"',
          link: 'https://www.studentlibrary.ru/',
          background: 'http://library.uspu.ru/images/i/novosty/ST-st.jpg'
        }
      ]
    },
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
  }
}
</script>

<style scoped>

</style>
