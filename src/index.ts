const slack = require('@slack/webhook').IncomingWebhook;

import { Request, Response } from 'express';

export function cloudBuildNotifier(_: Request, res: Response) {
  try {
    res.status(200)
    res.send('Hello')
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}