import { fail } from 'assert'
import { Configuration } from '@nuxt/types'
import dotenv from 'dotenv'

dotenv.config()

const config: Configuration = {
  mode: 'spa',
  srcDir: 'src/',
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/vuetify'
  ],
  head: {
    meta: [
      { charset: 'utf-8' }
    ]
  },
  dotenv: {
    path: './'
  },
  plugins: [
    '~/plugins/MembersAPIClient.ts'
  ],
  env: {
    MEMBERS_API_BASE_URL: process.env.MEMBERS_API_BASE_URL || fail('Missing required environment variable MEMBERS_API_BASE_URL'),
  }
}

export default config
