declare module 'members-api' {
  export interface RegistrationForm {
    userId: string | null;
    nickname: string | null;
    gender: string | null;
    ageGroup: string | null;
    tosAgreed: boolean;
  }
  export interface Member {
    userId: string;
    nickname: string;
    gender: string;
    ageGroup: string;
    rank: string;
    tosAgreed: boolean;
  }
  export interface AsyncDownloadRequest {
    asyncRequestId: string;
  }
  export interface AsyncRequestStatus {
    requestId: string;
    status: string;
    data: {
      downloadUrl? : string;
    };
  }
  export interface ErrorResponse {
    error: string;
    message: string;
  }
}
