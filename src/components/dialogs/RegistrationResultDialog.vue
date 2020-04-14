<template>
  <v-dialog
    v-model="show"
    persistent
    min-width="320"
    max-width="800"
  >
    <v-card>
      <v-card-title class="title">
        会員登録
      </v-card-title>
      <v-card-text>
        <p class="subtitle-2">
          以下の情報で会員登録が完了しました。
        </p>

        <v-text-field
          :value="data.userId"
          label="ユーザーID"
          filled
          readonly
        />

        <v-text-field
          :value="data.nickname"
          label="ニックネーム"
          filled
          readonly
        />

        <div class="my-3">
          <header>性別</header>
          <v-select
            v-model="data.gender"
            :items="[ data.gender ]"
            label="性別を選択してください"
            readonly
            solo
            disabled
          />
        </div>

        <div class="my-3">
          <header>年代</header>
          <v-select
            v-model="data.ageGroup"
            :items="[ data.ageGroup ]"
            label="年代を選択してください"
            readonly
            solo
            disabled
          />
        </div>
      </v-card-text>
      <v-card-actions class="pr-3">
        <div class="flex-grow-1" />
        <v-btn
          color="primary"
          text
          large
          @click="ok"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
import Vue from 'vue'
import { Mutations, Getters } from '~/store'

export default Vue.extend({
  computed: {
    show() {
      return this.$store.getters[Getters.REGISTRATION_RESULT_DIALOG_ENABLED]
    },
    data() {
      return this.$store.getters[Getters.REGISTRATION_RESULT_DIALOG_DATA]
    }
  },
  methods: {
    ok() {
      this.$store.commit(Mutations.CLOSE_REGISTRATION_RESULT_DIALOG)
    },
  }
})
</script>
