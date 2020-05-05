import path from 'path'

import { Pact } from '@pact-foundation/pact'
import { pactWith, JestPactOptions } from 'jest-pact'
import { Context } from '@nuxt/types/app'

import fixture from '~/fixture'
import { MembersAPIClient } from '~/plugins/MembersAPIClient'

pactWith({
    consumer: 'poc-pact-members-web-registration',
    provider: 'poc-pact-members-api',
    logLevel: 'info',
    log: path.resolve(process.cwd(), '.pacts/logs', 'pact.log'),
    dir: path.resolve(process.cwd(), '.pacts/pactFiles'),
    cors: true
} as JestPactOptions, (provider: Pact) => {

  let membersAPIClient: MembersAPIClient;

  beforeEach(() => {
    membersAPIClient = new MembersAPIClient({ env: { MEMBERS_API_BASE_URL: provider.mockService.baseUrl }} as unknown as Context)
  })

  describe('Registration test', () => {

    const EXPECTED_BODY = {
      userId: 'pact-testing-user-id',
      nickname: 'pact-testing-user-nickname',
      gender: fixture.REGISTRATION_GENDER_OPTIONS.find(e => e.text === '男性')?.value!,
      ageGroup:  fixture.REGISTRATION_AGE_GROUP_OPTIONS.find(e => e.text === '30代')?.value!,
      tosAgreed: true
    }

    beforeEach(async () => {
      provider.addInteraction({
        // The 'state' field specifies a 'Provider State'
        state: 'Registered (saved) member record',
        uponReceiving: 'Registration request',
        withRequest: {
          method: 'POST',
          path: '/registration',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: EXPECTED_BODY,
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: EXPECTED_BODY,
        },
      })
    })

    test('Testing registration API call', async () => {
      const result = await membersAPIClient.register(EXPECTED_BODY)
      expect(result).toEqual(EXPECTED_BODY)
    })
  })
})
