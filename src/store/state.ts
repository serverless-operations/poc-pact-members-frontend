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
  },
  myPageData: {
    userId: null,
    nickname: null,
    gender: null,
    ageGroup: null,
    tosAgreed: false,
    rank: null
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
  myPageData: MyPageData;
}

export type ErrorMessageCard = {
  message: string;
}

export interface RegistrationForm {
  userId: string | null;
  nickname: string | null;
  gender: string | null;
  ageGroup: string | null;
  tosAgreed: boolean;
}

export interface MyPageData extends RegistrationForm {
  userId: string | null;
  nickname: string | null;
  gender: string | null;
  ageGroup: string | null;
  rank: string| null;
  tosAgreed: boolean;
}
