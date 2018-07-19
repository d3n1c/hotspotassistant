<template>
  <q-page class="flex flex-center" padding>
    <q-card inline color="white" class="shadow-24" text-color="dark">
      <q-card-media>
        <img alt="Poltekkes logo" src="~assets/wifiarea.jpg">
      </q-card-media>
      <q-card-title class="relative-position">
        <q-btn fab color="positive" icon="fas fa-wifi" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" />
        <p class="text-faded">Hai {{ myInfos.name }} !</p>
        Kamu telah mendapatkan layanan hotspot kami
      </q-card-title>
      <q-card-main align="center">
        Username kamu adalah
        <big class="text-weight-bolder">" {{ myInfos['user'] }} "</big>
      </q-card-main>
      <q-card-actions align="center">
        Selamat berselancar !
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
import auth from '../auth'

export default {
  name: 'PageIndex',
  data () {
    return {
      myInfos: {}
    }
  },
  created () {
    this.myInfos = auth.getMyNIM();
  },
  mounted() {
    if (!this.myInfos['user']) {
      this.$router.push({ name: 'setuser' });
    }
  }
}
</script>
