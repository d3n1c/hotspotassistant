<template>
  <q-page padding>
    <!-- content -->
    Mohon tunggu sebentar ...
  </q-page>
</template>

<script>
import auth from '../auth'

export default {
   name: 'LogOut',
   mounted() {
     auth.logout();
   }
}
</script>

<style>
</style>
