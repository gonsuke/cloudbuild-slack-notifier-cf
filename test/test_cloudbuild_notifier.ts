import chai = require('chai')
import chaiHttp = require('chai-http')
import express from 'express'

import { cloudBuildNotifier } from '../src/index'
import { request } from 'http';

const app = express();
app.get('/', cloudBuildNotifier)

chai.use(chaiHttp)
const expect = chai.expect

describe('CloudBuild notifier function', () => {
  it('Returns 200', function (done) {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.text).to.be.equal('Hello')
        expect(res).to.have.status(200)
        done()
      })
  })
})
