<template>
  <q-page class="flex flex-center" padding>
    <q-card inline color="white" class="shadow-24" text-color="dark">
      <q-card-media>
        <img alt="Poltekkes logo" src="~assets/auditorium.jpg">
      </q-card-media>
      <q-card-title>
        Pastikan Anda mengisi NIM dengan benar!
      </q-card-title>
      <q-card-main>
        <q-field
          helper="Isi NIM Anda di sini"
          error-label="Mohon isi NIM Anda dengan benar"
          >
          <q-input
            type="text"
            v-model="nim"
            float-label="NIM"
            clearable
            autofocus
            />
        </q-field>
      </q-card-main>
      <q-card-actions align="center">
        <q-btn color="primary" flat label="Cari" @click="doLogin" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import auth from '../auth'
import route from '../router'
import { required } from 'vuelidate/lib/validators'
        
export default {
   name: 'GetMyNIM',
  data () {
    return {
      nim: '',
    }
  },
  methods: {
    doLogin() {
      var cred = this.nim;
      auth.setNIM(cred, '/');
    }
  },
  mounted () {
    if (auth.checkAuth()) {
      route.replace({ name: 'home' });
    }
  },
  validations: {
    nim: { required }
  }
}
</script>

<style>
</style>
