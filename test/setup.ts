import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
Vue.use(Vuex);
Vue.use(Vuetify);

import dotenv from 'dotenv'
dotenv.config()

import * as TestUtils from '@vue/test-utils'
TestUtils.config.silent = true
