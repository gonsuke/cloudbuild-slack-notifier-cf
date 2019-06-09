declare interface PubsubMessage {
  data: string;
  attributes: { [key: string]: string; }
}

declare interface Context {
  eventId: string
  timestamp: Date
  eventType: string
  resource: { [key: string]: string; }
}
