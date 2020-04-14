import { MembersAPIClient } from '~/plugins/MembersAPIClient';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $membersAPIClient: MembersAPIClient;
  }
}
