declare module 'members-api' {
  export interface RegistrationForm {
    userId: string | null;
    nickname: string | null;
    gender: string | null;
    ageGroup: string | null;
    tosAgreed: boolean;
  }
  export interface ErrorResponse {
    error: string;
    message: string;
  }
}
