<template>
  <v-row
    justify="center"
  >
    <v-col
      sm="12"
      md="10"
      lg="6"
    >
      <v-card
        class="ma-3 px-3"
        outlined
      >
        <v-card-title>
          ログイン
        </v-card-title>

        <v-divider />

        <v-card-text>
          <p class="ma-12">
            登録済みのユーザーIDを入力してログインします。
          </p>
          <div class="mx-12">
            <v-text-field
              v-model="userId"
              label="ユーザーID"
              placeholder=""
              outlined
            />
          </div>

          <error-message-card
            v-if="errorMessageCard"
            class="mb-3"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            :disabled="isLoading"
            @click="login"
          >
            ログイン
          </v-btn>
          <v-spacer />
        </v-card-actions>
        <v-overlay
          :absolute="true"
          :value="isLoading"
        >
          <v-progress-circular
            :size="80"
            color="primary"
            indeterminate
          />
        </v-overlay>
      </v-card>
    </v-col>
  </v-row>
</template>


<script lang="ts">
import Vue from 'vue'
import ErrorMessageCard from '~/components/ErrorMessageCard.vue'
import { Mutations, Getters } from '~/store'

export default Vue.extend({
  layout: 'centering',
  components: { ErrorMessageCard },
  data: function () {
    return {
      isLoading: false,
      userId: ''
    }
  },
  computed: {
    errorMessageCard() {
      return this.$store.getters[Getters.ERROR_MESSAGE_CARD]
    },
  },
  methods: {
    async login() {
      this.isLoading = true
      await this.$membersAPIClient.login(this.userId).then(result => {
        this.$store.commit(Mutations.UPDATE_MYPAGE_DATA, result)
        this.$router.push({ path: '/mypage' })
      }).catch(err => {
        const { status, message } = err
        this.$store.commit(Mutations.SHOW_ERROR_MESSAGE_CARD, { message: `${message} (${status})` })
      }).finally(() => this.isLoading = false)
    }
  }
})
</script>


<style scoped lang="scss">
</style>
