<template>
  <v-row
    justify="center"
  >
    <v-col
      sm="12"
      md="10"
      lg="6"
    >
      <registration-form />
    </v-col>
    <registration-result-dialog />
  </v-row>
</template>


<script lang="ts">
import Vue from 'vue'
import RegistrationForm from '~/components/forms/RegistrationForm.vue'
import RegistrationResultDialog from '~/components/dialogs/RegistrationResultDialog.vue'

export default Vue.extend({
  layout: 'centering',
  components: { RegistrationForm, RegistrationResultDialog },
})
</script>


<style scoped lang="scss">
</style>
