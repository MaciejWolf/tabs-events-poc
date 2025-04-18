import { makeAutoObservable } from "mobx";
import { byDate } from "../utils/dataSorters";
import { Filter } from "../types/Filter";
import { getTrackmanEvents } from "../services/getTrackmanEvents";
import { isOnlineEventWithRecording, TrackmanEvent } from "../types/TrackmanEvent";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = true;

  upcomingEvents: TrackmanEvent[] = [];
  onDemandEvents: TrackmanEvent[] = [];

  filteredUpcomingEvents: TrackmanEvent[] = [];
  filteredOnDemandEvents: TrackmanEvent[] = [];

  appliedFilters: Filter[] = [];

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

  categorisedFilters: { category: string; filters: Filter[] }[] = [];

  setFilters = (categorisedFilters: { category: string; filters: Filter[] }[]) => {
    this.categorisedFilters = categorisedFilters;
    this.appliedFilters = [];
  }

  clearFilters = () => {
    this.appliedFilters = [];
    this.refreshFilteredEvents();
  }
  addFilter = (filter: Filter) => {
    this.appliedFilters.push(filter);
    this.appliedFilters = [...this.appliedFilters];
    this.refreshFilteredEvents();
  }

  removeFilter = (key: string) => {
    this.appliedFilters = this.appliedFilters.filter(filter => filter.key !== key);
    this.refreshFilteredEvents();
  }

  isFilterSelected = (key: string) => this.appliedFilters.some(filter => filter.key === key)

  private refreshFilteredEvents = () => {
    const acceptEverything = () => true;

    const filters = this.appliedFilters.length > 0 ? this.appliedFilters.map(f => f.isSatisfiedBy) : [acceptEverything];

    this.filteredUpcomingEvents = this.upcomingEvents.filter(this.isSatisfiedByAnyOf(filters));
    this.filteredOnDemandEvents = this.onDemandEvents.filter(this.isSatisfiedByAnyOf(filters));
  }

  private isSatisfiedByAnyOf = (filters: ((event: TrackmanEvent) => boolean)[]) => (event: TrackmanEvent) => {
    return filters.some(filter => filter(event));
  }
}

export const store = new Store();