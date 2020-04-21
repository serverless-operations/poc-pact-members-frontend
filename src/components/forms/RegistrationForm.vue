<template>
  <v-card
    class="ma-3 px-3"
    outlined
  >
    <v-card-title>
      会員登録
    </v-card-title>

    <v-divider />

    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-subheader>ユーザーID</v-subheader>
        </v-col>
        <v-col cols="9">
          <v-text-field
            v-model="userId"
            placeholder=""
            outlined
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-subheader>ニックネーム</v-subheader>
        </v-col>
        <v-col cols="9">
          <v-text-field
            v-model="nickname"
            placeholder=""
            outlined
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-subheader>性別</v-subheader>
        </v-col>
        <v-col cols="9">
          <v-select
            v-model="gender"
            :items="genders"
            label="性別を選択してください"
            solo
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-subheader>年代</v-subheader>
        </v-col>
        <v-col cols="9">
          <v-select
            v-model="ageGroup"
            :items="ageGroups"
            label="年代を選択してください"
            solo
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-checkbox
            v-model="tosAgreed"
            class="mx-3"
            label="利用規約に同意します"
          />
        </v-col>
      </v-row>

      <error-message-card
        v-if="errorMessageCard"
        class="mb-3"
      />
    </v-card-text>

    <v-divider />
    <v-card-actions>
      <v-btn
        color="primary"
        text
        @click="submit"
      >
        Submit
      </v-btn>
      <v-spacer />
      <v-btn
        text
        @click="cancel"
      >
        Cancel
      </v-btn>
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
</template>


<script lang="ts">
import Vue from 'vue'
import fixture from '~/fixture'
import ErrorMessageCard from '~/components/ErrorMessageCard.vue'
import { Mutations, Getters } from '~/store'

export default Vue.extend({
  components: { ErrorMessageCard },
  data: function () {
    return {
      isLoading: false,
      genders: fixture.REGISTRATION_GENDER_OPTIONS,
      ageGroups: fixture.REGISTRATION_AGE_GROUP_OPTIONS,
    }
  },
  computed: {
    errorMessageCard() {
      return this.$store.getters[Getters.ERROR_MESSAGE_CARD]
    },
    userId: {
      get() {
        return this.$store.getters[Getters.REGISTRATION_FORM].userId
      },
      set(userId: string) {
        this.$store.commit(Mutations.UPDATE_REGISTRATION_FORM, { userId })
      }
    },
    nickname: {
      get() {
        return this.$store.getters[Getters.REGISTRATION_FORM].nickname
      },
      set(nickname: string) {
        this.$store.commit(Mutations.UPDATE_REGISTRATION_FORM, { nickname })
      }
    },
    gender: {
      get() {
        return this.$store.getters[Getters.REGISTRATION_FORM].gender
      },
      set(gender: string) {
        this.$store.commit(Mutations.UPDATE_REGISTRATION_FORM, { gender })
      }
    },
    ageGroup: {
      get() {
        return this.$store.getters[Getters.REGISTRATION_FORM].ageGroup
      },
      set(ageGroup: string) {
        this.$store.commit(Mutations.UPDATE_REGISTRATION_FORM, { ageGroup })
      }
    },
    tosAgreed: {
      get() {
        return this.$store.getters[Getters.REGISTRATION_FORM].tosAgreed
      },
      set(tosAgreed: boolean) {
        this.$store.commit(Mutations.UPDATE_REGISTRATION_FORM, { tosAgreed })
      }
    }
  },
  methods: {
    async submit() {
      this.isLoading = true
      const form = this.$store.getters[Getters.REGISTRATION_FORM]
      await this.$membersAPIClient.register(form).then(result => {
        this.$store.commit(Mutations.UPDATE_REGISTRATION_RESULT_DIALOG_DATA, result)
        this.$store.commit(Mutations.SHOW_REGISTRATION_RESULT_DIALOG)
        this.$store.commit(Mutations.CLEAR_REGISTRATION_FORM)
      }).catch(err => {
        const { status, message } = err
        this.$store.commit(Mutations.SHOW_ERROR_MESSAGE_CARD, { message: `${message} (${status})` })
      }).finally(() => this.isLoading = false)
    },
    cancel() {
      this.$store.commit(Mutations.CLEAR_REGISTRATION_FORM)
    }
  }
})
</script>


<style scoped lang="scss">
</style>
