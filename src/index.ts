import { IncomingWebhook } from '@slack/webhook';

export async function sendSlackWebhook(webhook: IncomingWebhook, build: BuildStatus) {
  try {
    const repoBase = process.env.SOURCE_REPO_BASE_URL || '';

    let status_color = 'warning';
    let text_message = '';
    if (['QUEUED', 'WORKING'].indexOf(build.status) >= 0) {
      return;
    } else if (build.status == 'SUCCESS') {
      status_color = 'good';
      text_message = ':thumbsup:';
    } else if (['FAILURE', 'INTERNAL_ERROR', 'TIMEOUT'].indexOf(build.status) >= 0) {
      status_color = 'danger';
      text_message = ':thumbsdown:';
    }

    await webhook.send({
      text: '',
      attachments: [
        {
          fallback: '',
          color: status_color,
          pretext: '',
          author_name: 'commit: ' + build.sourceProvenance.resolvedRepoSource.commitSha,
          author_link: repoBase + '/' + build.sourceProvenance.resolvedRepoSource.commitSha,
          title: 'Cloud Build Log - ' + build.source.repoSource.projectId,
          title_link: build.logUrl,
          text: text_message,
          fields: [
            {
              title: 'Build status',
              value: build.status,
              short: false
            }
          ],
          footer: 'Build started at',
          ts: (Date.parse(build.startTime) / 1000).toString()
        }
      ]
    });
  } catch (err) {
    console.error(err);
  }
}

export function cloudBuildNotifier(event: PubsubMessage, _ctx: Context) {
  try {
    const build = JSON.parse(Buffer.from(event.data, 'base64').toString());

    const webhook_url = process.env.SLACK_WEBHOOK_URL || '';
    const webhook = new IncomingWebhook(webhook_url, {
      icon_emoji: ':cloudbuild:',
      username: 'Cloud Build Status'
    });

    sendSlackWebhook(webhook, build);
  } catch (err) {
    console.error(err);
  }
}
