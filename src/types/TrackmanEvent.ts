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

export type UpcomingEvent =
  | OnlineEvent
  | InPersonEvent

export type TrackmanEvent =
  | UpcomingEvent
  | OnDemandEvent

export function isUpcomingEvent(event: TrackmanEvent): event is UpcomingEvent {
  return (new Date(event.startDate) > new Date());
}

export function isOnlineEvent(event: TrackmanEvent): event is OnlineEvent {
  return isUpcomingEvent(event) && event.locationType === 'online' && event.recordingReady === false;
}

export function isInPersonEvent(event: TrackmanEvent): event is InPersonEvent {
  return isUpcomingEvent(event) && event.locationType === 'inPerson';
}

export function isOnDemandEvent(event: TrackmanEvent): event is OnDemandEvent {
  return event.locationType === 'online' && event.recordingReady === true;
}
