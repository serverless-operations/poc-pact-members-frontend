<template>
  <section>
    <v-card
      class="error-message-card"
      width="100%"
      outlined
    >
      <v-card-title>
        <v-avatar
          slot="icon"
          class="mr-2"
          size="28"
        >
          <v-icon color="red">
            mdi-alert-circle
          </v-icon>
        </v-avatar>
        <span class="body-2 font-weight-light d-inline-block message-line text-truncate">{{ item.message }}</span>
        <v-spacer />
        <v-btn
          color="grey"
          icon
          text
          @click="close()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </section>
</template>


<script lang="ts">
import Vue from 'vue'
import { Mutations, Getters } from '../store';

export default Vue.extend({
  computed: {
    item() {
      return this.$store.getters[Getters.ERROR_MESSAGE_CARD]
    }
  },
  methods: {
    close(): void {
      this.$store.commit(Mutations.CLOSE_ERROR_MESSAGE_CARD);
    }
  }
})
</script>


<style scoped lang="scss">
</style>
