import * as TestUtils from '@vue/test-utils'
import sinon from 'sinon';

import indexPage from '~/pages/index.vue'

describe('Testing index page', () => {
  test('Mount index page', () => {
    const push = sinon.stub().returns(Promise.resolve());
    const wrapper = TestUtils.shallowMount(indexPage, {
      mocks: {
        $router: { push },
      }
    })
    expect(wrapper.exists()).toEqual(true)
  })
})
