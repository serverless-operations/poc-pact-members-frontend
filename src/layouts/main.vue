<template>
  <v-app>
    <MainHeader />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>


<script lang="ts">
import Vue from 'vue'
import MainHeader from '~/components/MainHeader.vue'

export default Vue.extend({
  components: { MainHeader },

})
</script>


<style scoped lang="scss">
</style>
