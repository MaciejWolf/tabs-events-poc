import { makeAutoObservable } from "mobx";
import { byDate } from "./dataSorters";
import { Filter } from "./Filter";
import { getTrackmanEvents } from "./getTrackmanEvents";
import { isOnlineEventWithRecording, TrackmanEvent } from "./TrackmanEvent";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = true;

  upcomingEvents: TrackmanEvent[] = [];
  onDemandEvents: TrackmanEvent[] = [];

  filteredUpcomingEvents: TrackmanEvent[] = [];
  filteredOnDemandEvents: TrackmanEvent[] = [];

  filters: Filter[] = [];

  getTrackmanEvents = async () => {
    this.isLoading = true;
    const response = await getTrackmanEvents();

    this.upcomingEvents = response
    .filter(event => new Date(event.startDate) > new Date())
    .sort(byDate(event => event.startDate, 'DESCENDING'));

    this.onDemandEvents = response
    .filter(isOnlineEventWithRecording)
    .sort(byDate(event => event.startDate, 'ASCENDING'));

    this.refreshFilteredEvents();

    this.isLoading = false;
  }

  clearFilters = () => {
    this.filters = [];
    this.refreshFilteredEvents();
  }
  addFilter = (filter: Filter) => {
    this.filters.push(filter);
    this.refreshFilteredEvents();
  }

  removeFilter = (key: string) => {
    this.filters = this.filters.filter(filter => filter.key !== key);
    this.refreshFilteredEvents();
  }

  private refreshFilteredEvents = () => {
    const filters = this.filters.length > 0 ? this.filters.map(f => f.isSatisfiedBy) : [() => true];

    this.filteredUpcomingEvents = this.upcomingEvents.filter(this.isSatisfiedByAnyOf(filters));
    this.filteredOnDemandEvents = this.onDemandEvents.filter(this.isSatisfiedByAnyOf(filters));
  }

  private isSatisfiedByAnyOf = (filters: ((event: TrackmanEvent) => boolean)[]) => (event: TrackmanEvent) => {
    return filters.some(filter => filter(event));
  }
}

export const store = new Store();