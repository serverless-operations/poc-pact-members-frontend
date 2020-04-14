export default (): State => ({
  errorMessageCard: null,
  loadingText: null,
  registration: {
    isLoading: false,
    form: {
      userId: null,
      nickname: null,
      gender: null,
      ageGroup: null,
      tosAgreed: false
    }
  },
  registrationResultDialog: {
    enabled: false,
    data: {
      userId: null,
      nickname: null,
      gender: null,
      ageGroup: null,
      tosAgreed: false
    }
  }
})

export type State = {
  errorMessageCard: ErrorMessageCard | null;
  loadingText: string | null;
  registration: {
    isLoading: boolean;
    form: RegistrationForm;
  };
  registrationResultDialog: {
    enabled: boolean;
    data: RegistrationForm;
  };
}

export type ErrorMessageCard = {
  message: string;
}

export type RegistrationForm = {
  userId: string | null;
  nickname: string | null;
  gender: string | null;
  ageGroup: string | null;
  tosAgreed: boolean;
}
