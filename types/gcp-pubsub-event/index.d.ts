declare interface PubsubMessage {
  data: string;
  attributes: { [key: string]: string };
}

declare interface Context {
  eventId: string;
  timestamp: Date;
  eventType: string;
  resource: { [key: string]: string };
}

declare interface BuildStatus {
  status: string;
  logUrl: string;
  startTime: string;
  sourceProvenance: SourceProvenance;
  source: Source;
}

declare interface SourceProvenance {
  resolvedRepoSource: { [key: string]: string };
}

declare interface Source {
  repoSource: { [key: string]: string };
}
