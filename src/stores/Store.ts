import { makeAutoObservable } from "mobx";
import { byDate } from "../utils/dataSorters";
import { Filter } from "../types/Filter";
import { getTrackmanEvents } from "../services/getTrackmanEvents";
import { isOnlineEventWithRecording, TrackmanEvent } from "../types/TrackmanEvent";
import { groupBy } from "../utils/groupBy";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isLoaded: boolean = false;
  isLoading: boolean = true;

  upcomingEvents: TrackmanEvent[] = [];
  onDemandEvents: TrackmanEvent[] = [];

  filteredUpcomingEvents: TrackmanEvent[] = [];
  filteredOnDemandEvents: TrackmanEvent[] = [];

  appliedFilters: Filter[] = [];

  getTrackmanEvents = async () => {
    if (this.isLoaded) {
      return;
    }

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
    this.isLoaded = true;
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

    const groups = groupBy(this.appliedFilters, filter => filter.category);

    const filtersWithinCategory = Object.entries(groups).map(([, filters]) =>
      filters.length === 0 ? acceptEverything : this.isSatisfiedByAnyOf(filters.map(f => f.isSatisfiedBy)));

    this.filteredUpcomingEvents = this.upcomingEvents.filter(this.isSatisfiedByAllOf(filtersWithinCategory));
    this.filteredOnDemandEvents = this.onDemandEvents.filter(this.isSatisfiedByAllOf(filtersWithinCategory));
  }

  private isSatisfiedByAnyOf = (filters: ((event: TrackmanEvent) => boolean)[]) => (event: TrackmanEvent) => filters.some(filter => filter(event))

  private isSatisfiedByAllOf = (filters: ((event: TrackmanEvent) => boolean)[]) => (event: TrackmanEvent) => filters.every(filter => filter(event))
}

export const store = new Store();