import { byDate } from "./dataSorters";
import { getTrackmanEvents } from "./getTrackmanEvents";
import { isOnlineEventWithRecording, TrackmanEvent } from "./TrackmanEvent";

export class Store {
  isLoading: boolean = true;

  upcomingEvents: TrackmanEvent[] = [];
  onDemandEvents: TrackmanEvent[] = [];

  filteredUpcomingEvents: TrackmanEvent[] = [];
  filteredOnDemandEvents: TrackmanEvent[] = [];

  getTrackmanEvents = async () => {
    this.isLoading = true;
    const response = await getTrackmanEvents();

    this.upcomingEvents = response
    .filter(event => new Date(event.startDate) > new Date())
    .sort(byDate(event => event.startDate, 'DESCENDING'));

    this.onDemandEvents = response
    .filter(isOnlineEventWithRecording)
    .sort(byDate(event => event.startDate, 'ASCENDING'));

    this.filteredUpcomingEvents = this.upcomingEvents;
    this.filteredOnDemandEvents = this.onDemandEvents;

    this.isLoading = false;
  }

  clearFilters = () => {}
  addFilter = () => {}
  removeFilter = () => {}
}