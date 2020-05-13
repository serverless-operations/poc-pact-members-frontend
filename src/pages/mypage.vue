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
          マイページ
        </v-card-title>

        <v-divider />

        <v-card-text>
          <p class="ma-12">
            登録済みのユーザー情報を表示します
          </p>
          <div class="mx-12">
            <v-row>
              <v-col cols="3">
                <v-subheader>ユーザーID</v-subheader>
              </v-col>
              <v-col
                cols="9"
                class="my-auto"
              >
                {{ user.userId }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-subheader>ニックネーム</v-subheader>
              </v-col>
              <v-col
                cols="9"
                class="my-auto"
              >
                {{ user.nickname }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-subheader>性別</v-subheader>
              </v-col>
              <v-col
                cols="9"
                class="my-auto"
              >
                {{ user.gender }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-subheader>年代</v-subheader>
              </v-col>
              <v-col
                cols="9"
                class="my-auto"
              >
                {{ user.ageGroup }}
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="3"
              >
                <v-subheader>ランク</v-subheader>
              </v-col>
              <v-col
                cols="9"
                class="my-auto"
              >
                {{ user.rank }}
              </v-col>
            </v-row>
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
            @click="toTopPage"
          >
            トップに戻る
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
import { Getters } from '~/store'

export default Vue.extend({
  layout: 'centering',
  components: { ErrorMessageCard },
  data: function () {
    return {
      isLoading: false,
    }
  },
  computed: {
    errorMessageCard() {
      return this.$store.getters[Getters.ERROR_MESSAGE_CARD]
    },
    user() {
      return this.$store.getters[Getters.MY_PAGE_DATA]
    }
  },
  methods: {
    toTopPage() {
      this.$router.push({ path: '/' })
    }
  }

})
</script>


<style scoped lang="scss">
</style>
