import slack from "@slack/webhook";

import chai from 'chai';
import sinon from 'sinon';

const cf = require('../src/index')

const expect = chai.expect

describe('CloudBuild notifier function', () => {
  let build: BuildStatus = {
    status: "FAILURE",
    logUrl: "https://console.cloud.google.com/gcr/builds/dummy_build_id",
    startTime: Date.now().toString(),
    sourceProvenance: { resolvedRepoSource: { projectId: "dummy project", repoName: "awesome repo" } },
    source: { repoSource: { projectId: "dummy project", repoName: "awesome repo" } }
  }
  it('Returns 200', function (done) {
    const webhook = new slack.IncomingWebhook("dummy");
    const mock = sinon.mock(webhook);
    mock.expects("send").once();
    cf.sendSlackWebhook(mock, build);
    mock.verify();
    done()
  })
})
