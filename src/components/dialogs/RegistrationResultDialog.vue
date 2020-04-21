<template>
  <v-dialog
    v-model="show"
    persistent
    min-width="320"
    max-width="800"
  >
    <v-card>
      <v-card-title>
        会員登録
      </v-card-title>

      <v-card-text>
        <p class="subtitle-2 my-4">
          以下の情報で会員登録が完了しました。
        </p>


        <v-row>
          <v-col cols="3">
            <v-subheader>ユーザーID</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-text-field
              :value="data.userId"
              outlined
              readonly
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-subheader>ニックネーム</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-text-field
              :value="data.nickname"
              outlined
              readonly
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-subheader>性別</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-select
              v-model="data.gender"
              :items="[ data.gender ]"
              solo
              readonly
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-subheader>年代</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-select
              v-model="data.ageGroup"
              :items="[ data.ageGroup ]"
              solo
              readonly
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-checkbox
              v-model="data.tosAgreed"
              class="mx-3"
              label="利用規約に同意します"
              disabled
            />
          </v-col>
        </v-row>
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
