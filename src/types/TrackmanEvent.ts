type BaseEvent = {
  id: string;
  name: string;
  startDate: string;
  isPremium: boolean;
};

export type OnDemandEvent = BaseEvent & {
  locationType: 'online';
  recordingReady: true;
  recordingUrl: string;
};

export type OnlineEvent = BaseEvent & {
  locationType: 'online';
  recordingReady: false;
};

export type InPersonEvent = BaseEvent & {
  locationType: 'inPerson';
  location: string;
};

export type TrackmanEvent = (
  | OnDemandEvent
  | OnlineEvent
  | InPersonEvent
);

export function isOnlineEvent(event: TrackmanEvent): event is OnlineEvent {
  return event.locationType === 'online' && event.recordingReady === false;
}

export function isOnDemandEvent(event: TrackmanEvent): event is OnDemandEvent {
  return event.locationType === 'online' && event.recordingReady === true;
}

export function isInPersonEvent(event: TrackmanEvent): event is InPersonEvent {
  return event.locationType === 'inPerson';
}