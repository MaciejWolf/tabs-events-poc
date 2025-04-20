import { TrackmanEvent } from "../types/TrackmanEvent";

export const getTrackmanEvents = async (): Promise<TrackmanEvent[]> => {
  const mockEvents: TrackmanEvent[] = [
    {
      id: '1',
      name: 'Online Golf Training',
      startDate: '2023-11-01T10:00:00Z',
      isPremium: true,
      locationType: 'online',
      recordingReady: true,
      recordingUrl: 'KOaeDHeJ80I',
    },
    {
      id: '2',
      name: 'In-Person Golf Workshop',
      startDate: '2025-11-05T14:00:00Z',
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
      recordingReady: true,
      recordingUrl: 'KOaeDHeJ80I',
    },
    {
      id: '4',
      name: 'Golf Tournament',
      startDate: '2025-11-15T08:00:00Z',
      isPremium: false,
      locationType: 'inPerson',
      location: 'Pebble Beach, California',
    },
    {
      id: '5',
      name: 'Online Golf Strategy Session',
      startDate: '2025-11-20T12:00:00Z',
      isPremium: true,
      locationType: 'online',
      recordingReady: false
    },
    {
      id: '6',
      name: 'Golf Fitness Webinar',
      startDate: '2023-11-25T15:00:00Z',
      isPremium: false,
      locationType: 'online',
      recordingReady: true,
      recordingUrl: 'KOaeDHeJ80I',
    }
  ];

  await sleep(1000); // Simulate network delay

  return mockEvents;
}

const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};