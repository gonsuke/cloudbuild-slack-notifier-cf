/* eslint-env mocha */
import { IncomingWebhook } from '@slack/webhook';

import chai from 'chai';
import sinon from 'sinon';

//const cf = require('../src/index')
import { sendSlackWebhook } from '../src/index';

const expect = chai.expect;

describe('CloudBuild notifier function', () => {
  let build: BuildStatus = {
    status: 'FAILURE',
    logUrl: 'https://console.cloud.google.com/gcr/builds/dummy_build_id',
    startTime: Date.now().toString(),
    sourceProvenance: { resolvedRepoSource: { projectId: 'dummy project', repoName: 'awesome repo' } },
    source: { repoSource: { projectId: 'dummy project', repoName: 'awesome repo' } }
  };
  it('Returns 200', function(done) {
    const webhook = new IncomingWebhook('dummy');
    const mock = sinon.mock(webhook);
    //mock.expects("send").withArgs(build).once();
    mock.expects('send').once();
    sendSlackWebhook(webhook, build);
    mock.verify();
    done();
  });
});
