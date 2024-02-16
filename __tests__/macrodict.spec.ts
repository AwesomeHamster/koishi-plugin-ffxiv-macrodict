import memory from '@koishijs/plugin-database-memory'
import mock from '@koishijs/plugin-mock'
import { expect } from 'chai'
import { App } from 'koishi'

import * as macrodict from '../src'

describe('macrodict', () => {
  const app = new App()

  app.plugin(mock)
  app.plugin(memory)
  app.plugin(macrodict)

  const client = app.mock.client('123')

  before(() => app.start())

  after(() => app.stop())

  describe('search', () => {
    it('should get all names', async () => {
      const data = await app.macrodict.getNames('en')
      expect(Object.keys(data).length).greaterThan(0)
    })
    it('should get macro by id', async () => {
      // id 102 is "/say" command
      const say = await app.macrodict.get(102, 'en')
      expect(say).to.be.not.a('undefined')
      expect(say?.id).to.be.a('number', 'id should be a number').and.equal(102, 'id should be 102')
    })
    it('should search macro by name', async () => {
      const say = await app.macrodict.search('say', 'en', 3)
      expect(say).to.not.be.a('undefined', 'should not be undefined')
      expect(say?.id).to.be.a('number', 'id should be a number').and.equal(102, 'id should be 102')
    })
  })

  describe('render', () => {
    it('should render macro in text', async () => {
      client.shouldReply('macrodict say -l en', /Send a message to all PCs within a small radius\./)
    })
  })
})
