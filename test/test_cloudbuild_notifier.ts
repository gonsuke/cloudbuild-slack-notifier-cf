/* eslint-env mocha */

import chai from 'chai';
import sinon from 'sinon';

import { sendSlackWebhook } from '../src/index';
import { IncomingWebhook, IncomingWebhookSendArguments } from '@slack/webhook';

describe('CloudBuild notifier function', () => {
  const build: BuildStatus = {
    status: 'SUCCESS',
    logUrl: 'https://console.cloud.google.com/gcr/builds/dummy_build_id',
    startTime: Date.now().toString(),
    sourceProvenance: { resolvedRepoSource: { projectId: 'dummy project', repoName: 'awesome repo', commitSha: '0123xyz' } },
    source: { repoSource: { projectId: 'dummy project', repoName: 'awesome repo' } }
  };

  const expected_send_param: IncomingWebhookSendArguments = {
    text: '',
    attachments: [
      {
        color: 'good',
        author_name: 'commit: 0123xyz',
        author_link: '/0123xyz',
        title: 'Cloud Build Log - dummy project',
        title_link: 'https://console.cloud.google.com/gcr/builds/dummy_build_id',
        text: ':thumbsup:',
        fields: [
          {
            title: 'Build status',
            value: 'SUCCESS',
            short: false
          }
        ],
        footer: 'Build started at',
        ts: (Date.parse(build.startTime) / 1000).toString()
      }
    ]
  };

  it('Sends success', function(done) {
    const webhook = new IncomingWebhook('dummy');
    const mock = sinon.mock(webhook);
    mock
      .expects('send')
      .withArgs(expected_send_param)
      .once();
    sendSlackWebhook(webhook, build);
    mock.verify();
    done();
  });
});
