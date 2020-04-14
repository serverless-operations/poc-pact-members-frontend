import { State, ErrorMessageCard, RegistrationForm } from '~/store/state'

export const Mutations = {
  SHOW_ERROR_MESSAGE_CARD: 'SHOW_ERROR_MESSAGE_CARD',
  CLOSE_ERROR_MESSAGE_CARD: 'CLOSE_ERROR_MESSAGE_CARD',

  SHOW_REGISTRATION_RESULT_DIALOG: 'SHOW_REGISTRATION_RESULT_DIALOG',
  CLOSE_REGISTRATION_RESULT_DIALOG: 'CLOSE_REGISTRATION_RESULT_DIALOG',

  UPDATE_REGISTRATION_FORM: 'UPDATE_REGISTRATION_FORM',
  CLEAR_REGISTRATION_FORM: 'CLEAR_REGISTRATION_FORM',

  UPDATE_REGISTRATION_RESULT_DIALOG_DATA: 'UPDATE_REGISTRATION_RESULT_DIALOG_DATA',
}

export default {
  [Mutations.SHOW_ERROR_MESSAGE_CARD] (state: State, payload: ErrorMessageCard) {
    state.errorMessageCard = payload
  },
  [Mutations.CLOSE_ERROR_MESSAGE_CARD] (state: State) {
    state.errorMessageCard = null
  },
  [Mutations.SHOW_REGISTRATION_RESULT_DIALOG] (state: State) {
    state.registrationResultDialog.enabled = true
  },
  [Mutations.CLOSE_REGISTRATION_RESULT_DIALOG] (state: State) {
    state.registrationResultDialog.enabled = false
  },
  [Mutations.UPDATE_REGISTRATION_FORM] (state: State, payload: Partial<RegistrationForm>) {
    const { form } = state.registration
    state.registration.form = Object.assign(form, payload)
  },
  [Mutations.CLEAR_REGISTRATION_FORM] (state: State) {
    state.registration.form = {
      userId: null,
      nickname: null,
      gender: null,
      ageGroup: null,
      tosAgreed: false
    }
  },
  [Mutations.UPDATE_REGISTRATION_RESULT_DIALOG_DATA] (state: State, payload: RegistrationForm) {
    state.registrationResultDialog.data = payload
  },
}
