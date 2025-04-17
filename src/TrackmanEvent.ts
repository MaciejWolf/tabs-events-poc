type BaseEvent = {
  id: string;
  name: string;
  startDate: string;
  isPremium: boolean;
};

export type OnlineEventWithRecording = BaseEvent & {
  locationType: 'online';
  recordingReady: true;
  recordingUrl: string;
};

export type OnlineEventWithoutRecording = BaseEvent & {
  locationType: 'online';
  recordingReady: false;
};

export type InPersonEvent = BaseEvent & {
  locationType: 'inPerson';
  location: string;
};

export type TrackmanEvent = (
  | OnlineEventWithRecording
  | OnlineEventWithoutRecording
  | InPersonEvent
);

export function isOnlineEvent(event: TrackmanEvent): event is (OnlineEventWithRecording | OnlineEventWithoutRecording) {
  return event.locationType === 'online';
}

export function isOnlineEventWithRecording(event: TrackmanEvent): event is OnlineEventWithRecording {
  return event.locationType === 'online' && event.recordingReady === true;
}

export function isOnlineEventWithoutRecording(event: TrackmanEvent): event is OnlineEventWithoutRecording {
  return event.locationType === 'online' && event.recordingReady === false;
}

export function isInPersonEvent(event: TrackmanEvent): event is InPersonEvent {
  return event.locationType === 'inPerson';
}