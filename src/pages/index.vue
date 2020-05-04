<template>
  <div>
    <v-row>
      <v-col sm="6">
        <v-card
          outlined
          min-width="300"
        >
          <v-card-text class="text-center">
            メンバー登録
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="toRegistrationPage"
            >
              サンプルページへ移動
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col sm="6">
        <v-card
          outlined
          min-width="300"
        >
          <v-card-text class="text-center">
            メンバーの一覧ダウンロード
          </v-card-text>
          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="toDownloadPage"
            >
              サンプルページへ移動
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'centering',
  methods: {
    toRegistrationPage() {
      this.$router.push({ path: '/registration' })
    },
    toDownloadPage() {
      this.$router.push({ path: '/download' })
    }
  }
})
</script>


<style scoped lang="scss">
</style>
