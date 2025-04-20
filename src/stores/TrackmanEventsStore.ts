import { makeAutoObservable } from "mobx";
import { getTrackmanEvents } from "../services/getTrackmanEvents";
import { Filter } from "../types/Filter";
import { TrackmanEvent, isOnlineEventWithRecording } from "../types/TrackmanEvent";
import { byDate } from "../utils/dataSorters";
import { groupBy } from "../utils/groupBy";
import { FiltersStore } from "./FiltersStore";

export class TrackmanEventsStore {
  constructor(private readonly filtersStore: FiltersStore) {
    makeAutoObservable(this);
  }

  isLoaded: boolean = false;
  isLoading: boolean = true;

  upcomingEvents: TrackmanEvent[] = [];
  onDemandEvents: TrackmanEvent[] = [];

  filteredUpcomingEvents: TrackmanEvent[] = [];
  filteredOnDemandEvents: TrackmanEvent[] = [];

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

  private refreshFilteredEvents = () => {
    const categoryFilters = this.selectedFiltersGroupedByCategory();

    this.filteredUpcomingEvents = this.upcomingEvents.filter(this.isSatisfiedByAllOf(categoryFilters));
    this.filteredOnDemandEvents = this.onDemandEvents.filter(this.isSatisfiedByAllOf(categoryFilters));
  }

  private selectedFiltersGroupedByCategory = () => {
    const filtersGroups = groupBy(this.filtersStore.appliedFilters, filter => filter.category);
    return Object.entries(filtersGroups).map(([, filters]) => this.toCategoryFilter(filters));
  }

  private toCategoryFilter = (filters: Filter[]) => {
    const acceptEverythingFilter = () => true;

    return filters.length === 0 
    ? acceptEverythingFilter 
    : this.isSatisfiedByAnyOf(filters.map(filter => filter.apply));
  }

  private isSatisfiedByAnyOf = (filters: ((event: TrackmanEvent) => boolean)[]) => (event: TrackmanEvent) => filters.some(filter => filter(event))

  private isSatisfiedByAllOf = (filters: ((event: TrackmanEvent) => boolean)[]) => (event: TrackmanEvent) => filters.every(filter => filter(event))
}
