import { expect } from 'chai'
import { App } from 'koishi'
import mock from '@koishijs/plugin-mock'
import memory from '@koishijs/plugin-database-memory'

import { Updater } from '../src/update'
import * as macrodict from '../src'

describe('macrodict', () => {
  const app = new App()

  app.plugin(mock)
  app.plugin(memory)
  app.plugin(macrodict)

  const client = app.mock.client('123')
  const updater = new Updater(app, {})

  before(async () => {
    app.start()
  })

  after(() => app.stop())

  describe('update', () => {
    it('fetch international macros', async () => {
      const data = await updater.fetchIntl()
      expect(data.length).greaterThan(0)
    })
      .timeout(0)
      .retries(3)

    it('fetch chinese macros', async () => {
      const data = await updater.fetchCn()
      expect(data.length).greaterThan(0)
    })
      .timeout(0)
      .retries(3)

    it('fetch korean macros', async () => {
      const data = await updater.fetchKo()
      expect(data.length).greaterThan(0)
    })
      .timeout(0)
      .retries(3)

    it('update database', async () => {
      const count = await updater.update()
      expect(count).greaterThan(0)
    })
      .timeout(0)
      .retries(3)
  })

  describe('search', () => {
    it('should get all names', async () => {
      const data = await app.macrodict.getNames('en')
      expect(Object.keys(data).length).greaterThan(0)
    })
    it('should get macro by id', async () => {
      // id 102 is "/say" command
      const say = await app.macrodict.get(102, 'en')
      expect(say.id)
        .to.be.a('number', 'id should be a number')
        .and.equal(102, 'id should be 102')
    })
    it('should search macro by name', async () => {
      const say = await app.macrodict.search('say', 'en')
      expect(say).to.not.be.a('undefined', 'should not be undefined')
      expect(say?.id)
        .to.be.a('number', 'id should be a number')
        .and.equal(102, 'id should be 102')
    })
  })

  describe('render', () => {
    it('should render macro in text', async () => {
      client.shouldReply(
        'macrodict say -l en',
        /Send a message to all PCs within a small radius\./,
      )
    })
  })
})
