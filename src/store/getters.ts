import { State } from '~/store/state'
import fixture from '~/fixture'

export const Getters = {
  LOADING_TEXT: 'LOADING_TEXT',
  REGISTRATION_RESULT_DIALOG_DATA: 'REGISTRATION_RESULT_DIALOG_DATA',
  REGISTRATION_FORM: 'REGISTRATION_FORM',
  REGISTRATION_RESULT_DIALOG_ENABLED: 'REGISTRATION_RESULT_DIALOG_ENABLED',
  MY_PAGE_DATA: 'MY_PAGE_DATA',
  ERROR_MESSAGE_CARD: 'ERROR_MESSAGE_CARD'
}

export default {
  [Getters.LOADING_TEXT] (state: State) {
    return state.loadingText || 'データを読み込んでいます...'
  },
  [Getters.REGISTRATION_FORM] (state: State) {
    return state.registration.form
  },
  [Getters.REGISTRATION_RESULT_DIALOG_ENABLED] (state: State) {
    return state.registrationResultDialog.enabled
  },
  [Getters.REGISTRATION_RESULT_DIALOG_DATA] (state: State) {
    const { data } =  state.registrationResultDialog
    const { gender, ageGroup } = data
    const defaultOption = { text: 'N/A' }
    const genderOption = fixture.REGISTRATION_GENDER_OPTIONS.find(opt => opt.value === gender) || defaultOption
    const ageGroupOption = fixture.REGISTRATION_AGE_GROUP_OPTIONS.find(opt => opt.value === ageGroup) || defaultOption
    return {
      ...data,
      gender: genderOption.text,
      ageGroup: ageGroupOption.text
    }
  },
  [Getters.MY_PAGE_DATA] (state: State) {
    return state.myPageData
  },
  [Getters.ERROR_MESSAGE_CARD] (state: State) {
    return state.errorMessageCard
  }
}
