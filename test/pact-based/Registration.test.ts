import * as TestUtils from '@vue/test-utils'
import path from 'path'

import { Pact } from '@pact-foundation/pact'
import { Context } from '@nuxt/types/app';

import fixture from '~/fixture'
import { MembersAPIClient } from '~/plugins/MembersAPIClient'

const PACT_HOST = 'localhost'
const PACT_PORT = 3001
const MEMBERS_API_BASE_URL = `http://${PACT_HOST}:${PACT_PORT}`

describe('Registration test', () => {

  // (1) Create the Pact object to represent your provider
  const provider = new Pact({
    consumer: 'poc-pact-members-web',
    provider: 'poc-pact-members-api',
    port: 3001,
    logLevel: 'info',
    log: path.resolve(process.cwd(), '.pacts/logs', 'pact.log'),
    dir: path.resolve(process.cwd(), '.pacts/pactFiles'),
    cors: true
  })

  const EXPECTED_BODY = {
    userId: 'pact-testing-user-id',
    nickname: 'pact-testing-user-nickname',
    gender: fixture.REGISTRATION_GENDER_OPTIONS.find(e => e.text === '男性')?.value!,
    ageGroup:  fixture.REGISTRATION_AGE_GROUP_OPTIONS.find(e => e.text === '30代')?.value!,
    tosAgreed: true
  }

  const membersAPIClient = new MembersAPIClient({ env: { MEMBERS_API_BASE_URL }} as unknown as Context)

  beforeAll(async () => {
    console.log('@@', 'in beforeAll')
    TestUtils.config.silent = true

    await provider
    // (2) Start the mock server
    .setup()
    // (3) add interactions to the Mock Server, as many as required
    .then(() =>
      provider.addInteraction({
        // The 'state' field specifies a 'Provider State'
        state: 'Registered (saved) member record',
        uponReceiving: 'Registratikon request',
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
    )
  })

  // (4) write your test(s)
  test('Testing registration API call', async () => {
    const result = await membersAPIClient.register(EXPECTED_BODY)
    expect(result).toEqual(EXPECTED_BODY)
  })

  // (5) validate the interactions you've registered and expected occurred
  // this will throw an error if it fails telling you what went wrong
  // This should be performed once per interaction test
  afterEach(() => {
    provider.verify()
  })

  // (6) write the pact file for this consumer-provider pair,
  // and shutdown the associated mock server.
  // You should do this only _once_ per Provider you are testing,
  // and after _all_ tests have run for that suite
  afterAll(() => {
    provider.finalize()
  })
})
