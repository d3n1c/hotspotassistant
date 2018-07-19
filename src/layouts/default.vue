<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="secondary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="goHome()"
          aria-label="Home"
        >
          <q-icon name="fas fa-home" />
        </q-btn>
        
        <q-toolbar-title>
          Mikrotik User Creator
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
        <q-tabs
          v-if="$router.currentRoute['name'] !== 'getnim'"
          color="secondary"
          glossy
          >
          <q-route-tab
            slot="title"
            icon="fas fa-user-plus"
            to="/set-user"
            replace
            v-if="!hasCreated"
          >
            <q-tooltip>Buat username baru</q-tooltip>
          </q-route-tab>
          <q-route-tab
            slot="title"
            icon="fas fa-door-open"
            to="/logout"
            replace
          >
            <q-tooltip>Keluar atau ganti NIM lain</q-tooltip>
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated bounceInDown"
        leave-active-class="animated bounceOutRight"
        :duration="{ enter: 1500, leave: 500 }"
      >
      <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import Router from '../router'
import auth from '../auth'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      myInfos: {},
      hasCreated: false
    };
  },
  methods: {
    goHome: function() {
      Router.replace({ name: 'home' });
    }
  },
  created() {
    this.myInfos = auth.getMyNIM();
  },
  mounted () {
    if (this.myInfos['user']) {
      this.hasCreated = true;
    }
  }
}
</script>

<style>
  body {
    background-image: url("~assets/backgrounds/11.jpg");
  }
</style>
