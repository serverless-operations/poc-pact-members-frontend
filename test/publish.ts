/* eslint-disable @typescript-eslint/no-var-requires */
const pact = require('@pact-foundation/pact-node')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const opts = {
  pactFilesOrDirs: [ path.resolve(process.cwd(), '.pacts/pactFiles') ],
  pactBroker: 'https://poc-lop.pact.dius.com.au',
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  tags: [ 'latest' ],
  consumerVersion: '0.0.0'
}

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to https://poc-lop.pact.dius.com.au/ and login')
    console.log('to see your published contracts.')
  })
  .catch((e: Error) => {
    console.log('Pact contract publishing failed: ', e)
  })
