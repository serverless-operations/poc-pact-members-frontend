import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import { Context } from '@nuxt/types/app';
import { RegistrationForm, ErrorResponse } from 'members-api'

export interface APIErrorResult {
  status: number;
  message: string;
}

export class MembersAPIClient {

  private readonly client: AxiosInstance

  constructor(ctx: Context) {
    this.client = axios.create({
      baseURL: ctx.env.MEMBERS_API_BASE_URL
    })
  }

  public async register(form: RegistrationForm): Promise<RegistrationForm> {
    return await this.request({ method: 'POST', url: '/registration', data: form })
  }

  public async request<T>(config: AxiosRequestConfig = {}): Promise<T> {

    const response = await this.execute(config)

    switch (response.status) {
      case 200:
        return response.data
      case 400:
        return Promise.reject({
          status: response.status,
          message: (response.data as ErrorResponse).message
        });
      case 401:
      case 403:
      case 500:
        return Promise.reject({
          status: response.status,
          message: (response.data as ErrorResponse).message
        })
      default:
        return Promise.reject({
          message: '予期しないエラーが発生しました'
        });
    }
  }

  private async execute<T>(config: AxiosRequestConfig) {
    return await this.client.request<T>(config).catch((e: AxiosError) => {
      if (!e.response) {
        return Promise.reject({
          message: '予期しないエラーが発生しました'
        });
      }
      return Promise.resolve(e.response);
    });
  }
}

export default (ctx: Context, inject: (key: string, value: object) => void) => {
  inject('membersAPIClient', new MembersAPIClient(ctx));
};
