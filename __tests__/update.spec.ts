import { expect } from 'chai'
import { App } from 'koishi'
import mock from '@koishijs/plugin-mock'

import { fetchCnMacros, fetchIntlMacros, fetchKoMacros } from '../src/update'

describe('update', () => {
  const app = new App()

  app.plugin(mock)

  const client = app.mock.client('123')
  const ctx = client.mock.ctx

  before(async () => {
    app.mock.initUser('123', 4)
  })

  it('fetch international macros', async () => {
    const data = await fetchIntlMacros(ctx)
    expect(data.length).greaterThan(0)
  }).timeout(50000)

  it('fetch chinese macros', async () => {
    const data = await fetchCnMacros(ctx)
    expect(data.length).greaterThan(0)
  }).timeout(10000)

  it('fetch korean macros', async () => {
    const data = await fetchKoMacros(ctx)
    expect(data.length).greaterThan(0)
  }).timeout(10000)
})
