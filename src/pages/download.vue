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
          会員情報一覧ダウンロード
        </v-card-title>

        <v-divider />

        <v-card-text>
          <div v-if="!isLoading">
            <p class="ma-12">
              「ダウンロード」ボタンをクリックすると、登録されているユーザー情報の一覧を JSON 形式のファイルでダウンロードします。
            </p>
          </div>
          <div
            v-if="isLoading"
            class="text-center pa-12"
          >
            <v-progress-circular
              :size="80"
              color="primary"
              indeterminate
            />
            <p class="mt-12">
              ダウンロードを準備しています...<br>しばらくするとダウンロードが開始されます。
            </p>
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
            @click="download"
          >
            ダウンロード
          </v-btn>
          <v-spacer />
          <!-- <v-btn
            text
            @click="cancel"
          >
            キャンセル
          </v-btn> -->
        </v-card-actions>
      </v-card>
      <a
        id="init-download"
        :href="downloadUrl"
        :download="downloadFilename"
        style="display: hidden;"
      />
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
      pollingCount: 0,
      downloadUrl: '',
      downloadFilename: ''
    }
  },
  computed: {
    errorMessageCard() {
      return this.$store.getters[Getters.ERROR_MESSAGE_CARD]
    },
  },
  methods: {
    async download() {
      this.isLoading = true

      const result = await this.$membersAPIClient.asyncDownloadMembers().catch(err => {
        const { status, message } = err
        this.$store.commit(Mutations.SHOW_ERROR_MESSAGE_CARD, { message: `${message} (${status})` })
        this.isLoading = false
      })

      if (!result) {
        return
      }

      const { asyncRequestId } = result
      await this.pollingStatus(asyncRequestId)

      document.getElementById('init-download')?.click()
      this.isLoading = false
    },
    async pollingStatus(asyncRequestId: string) {

      for(;;) {
        await this.delay()
        const result = await this.$membersAPIClient.pollingAsyncRequestStatus(asyncRequestId).catch(err => {
          const { status, message } = err
          this.$store.commit(Mutations.SHOW_ERROR_MESSAGE_CARD, { message: `${message} (${status})` })
          this.isLoading = false
        })
        if (this.pollingCount > 10) {
          this.$store.commit(Mutations.SHOW_ERROR_MESSAGE_CARD, { message: `Polling count is more than ${this.pollingCount}` })
          break
        }
        if (!result || this.errorMessageCard) {
          break
        }
        if (result.status === 'completed' && result.data.downloadUrl) {
          this.downloadUrl = result.data.downloadUrl
          this.downloadFilename = (result.data.downloadUrl.match('.+/(.+?)([?#;].*)?$') || [])[1]
          break
        }
        this.pollingCount++
      }
    },

    async delay() {
      return new Promise(res => setTimeout(() => res(), 5000))
    },

    cancel() {
      //
    }
  }
})
</script>


<style scoped lang="scss">
</style>
