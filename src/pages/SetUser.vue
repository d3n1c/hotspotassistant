<template>
  <q-page class="flex flex-center" padding>
    <q-card inline color="white" class="shadow-24" text-color="dark">
      <q-card-media>
        <img alt="Poltekkes logo" src="~assets/wifiservice.jpg">
      </q-card-media>
      <q-card-title class="relative-position">
        <q-btn fab color="warning" icon="fas fa-wifi" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" />
        <p><small class="text-faded">Hai {{ myInfos.name }} !</small></p>
        Silahkan buat user sesuka kamu
      </q-card-title>
      <q-card-main>
        <q-field
          helper="Isi Username Anda di sini"
          error-label="Mohon isi username yang unik"
          >
          <q-input
            type="text"
            v-model="username"
            float-label="Username"
            clearable
            autofocus
            />
        </q-field>
        <q-field
          helper="Isi Passowrd Anda di sini"
          error-label="Mohon isi password dengan benar"
          >
          <q-input
            type="password"
            v-model="password"
            float-label="Password"
            clearable
            />
        </q-field>
      </q-card-main>
      <q-card-actions align="center">
        <q-btn color="primary" label="Buat" @click="doCreate" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import auth from '../auth'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'SetUser',
  data() {
    return {
      myInfos: {},
      username: '',
      password: ''
    }
  },
  created() {
    this.myInfos = auth.getMyNIM();
  },
  methods: {
    doCreate() {
      if (this.username === '' || this.password === '') {
        auth.authNotify(
          'Username dan password harus diisi',
          'negative'
        );
        this.$forceUpdate;
        return;
      }

      let userdata = this.$q.localStorage.get.item('spotassist_users');
      if (!userdata) {
        userdata = {};
      }
      userdata['spot-' + this.myInfos['nim']] = {
        name: this.myInfos['name'],
        user: this.username
      };
      this.$q.localStorage.set('spotassist_users', userdata);

      this.myInfos['user'] = this.username;
      this.$q.sessionStorage.set('mynim', this.myInfos);
      auth.authNotify(
        'Selamat ' + this.myInfos['name'] + ', Anda berhasil ?',
      );
      setTimeout(() => this.$router.push({ name: 'home' }), 700);
      return true;
    }
  },
  mounted() {
    if (this.myInfos['user']) {
      this.$router.push({ name: 'home' });
    }
  },
  validations: {
    username: { required },
    password: { required }
  }
}
</script>

<style>
</style>
