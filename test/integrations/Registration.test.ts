import * as TestUtils from '@vue/test-utils'

import { Context } from '@nuxt/types/app';
import fixture from '~/fixture'
import { MembersAPIClient } from '~/plugins/MembersAPIClient'

describe('Registration test', () => {

  beforeAll(() => {
    TestUtils.config.silent = true
  })

  test('Testing registration API call', async () => {
    const membersAPIClient = new MembersAPIClient({
      env: {
        MEMBERS_API_BASE_URL: process.env.MEMBERS_API_BASE_URL
      }
    } as unknown as Context)

    const sample = {
      userId: `integ-testing-user-id-${Math.random().toString(32).substring(2)}`,
      nickname: 'integ-testing-user-nickname',
      gender: fixture.REGISTRATION_GENDER_OPTIONS.find(e => e.text === '男性')?.value!,
      ageGroup:  fixture.REGISTRATION_AGE_GROUP_OPTIONS.find(e => e.text === '30代')?.value!,
      tosAgreed: true
    }
    const result = await membersAPIClient.register(sample)

    expect(result).toEqual(sample)
  })

  afterAll(() => {
    // TODO: Remove record for testing
    TestUtils.config.silent = false
  })
})
