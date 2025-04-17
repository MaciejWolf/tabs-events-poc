type BaseEvent = {
  id: string;
  name: string;
  startDate: string;
  isPremium: boolean;
};

type OnlineEventWithRecording = {
  locationType: 'online';
  recordingReady: true;
  recordingUrl: string;
};

type OnlineEventWithoutRecording = {
  locationType: 'online';
  recordingReady: false;
};

type InPersonEvent = {
  locationType: 'inPerson';
  location: string;
};

export type TrackmanEvent = BaseEvent & (
  | OnlineEventWithRecording
  | OnlineEventWithoutRecording
  | InPersonEvent
);

export const getTrackmanEvents = async () => {
  const mockEvents: TrackmanEvent[] = [
    {
      id: '1',
      name: 'Online Golf Training',
      startDate: '2023-11-01T10:00:00Z',
      isPremium: true,
      locationType: 'online',
      recordingReady: true,
      recordingUrl: 'https://example.com/recording1',
    },
    {
      id: '2',
      name: 'In-Person Golf Workshop',
      startDate: '2023-11-05T14:00:00Z',
      isPremium: false,
      locationType: 'inPerson',
      location: 'Golf Club, New York',
    },
    {
      id: '3',
      name: 'Virtual Swing Analysis',
      startDate: '2023-11-10T09:00:00Z',
      isPremium: false,
      locationType: 'online',
      recordingReady: false
    },
    {
      id: '4',
      name: 'Golf Tournament',
      startDate: '2023-11-15T08:00:00Z',
      isPremium: false,
      locationType: 'inPerson',
      location: 'Pebble Beach, California',
    },
  ];

  return mockEvents;
}