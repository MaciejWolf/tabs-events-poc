import { makeAutoObservable } from "mobx";
import { byDate } from "../utils/dataSorters";
import { Filter } from "../types/Filter";
import { getTrackmanEvents } from "../services/getTrackmanEvents";
import { isOnDemandEvent, isUpcomingEvent, TrackmanEvent, UpcomingEvent } from "../types/TrackmanEvent";
import { groupBy } from "../utils/groupBy";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isLoaded: boolean = false;
  isLoading: boolean = true;

  upcomingEvents: UpcomingEvent[] = [];
  onDemandEvents: TrackmanEvent[] = [];

  filteredUpcomingEvents: UpcomingEvent[] = [];
  filteredOnDemandEvents: TrackmanEvent[] = [];

  appliedFilters: Filter[] = [];

  getTrackmanEvents = async () => {
    if (this.isLoaded) {
      return;
    }

    this.isLoading = true;
    const response = await getTrackmanEvents();

    this.upcomingEvents = response
      .filter(isUpcomingEvent)
      .sort(byDate(event => event.startDate, 'DESCENDING'));

    this.onDemandEvents = response
      .filter(isOnDemandEvent)
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
    const categoryFilters = this.getCategoryFilters();

    this.filteredUpcomingEvents = this.upcomingEvents.filter(this.isSatisfiedByAllOf(categoryFilters));
    this.filteredOnDemandEvents = this.onDemandEvents.filter(this.isSatisfiedByAllOf(categoryFilters));
  }

  private getCategoryFilters = () => {
    const filtersGroups = groupBy(this.appliedFilters, filter => filter.category);
    return Object.entries(filtersGroups).map(([, filters]) => this.aggregateFiltersInCategory(filters));
  }

  private aggregateFiltersInCategory = (filters: Filter[]) => {
    const acceptEverythingFilter = () => true;

    return filters.length === 0 
    ? acceptEverythingFilter 
    : this.isSatisfiedByAnyOf(filters.map(filter => filter.apply));
  }

  private isSatisfiedByAnyOf = (filters: ((event: TrackmanEvent) => boolean)[]) => (event: TrackmanEvent) => filters.some(filter => filter(event))

  private isSatisfiedByAllOf = (filters: ((event: TrackmanEvent) => boolean)[]) => (event: TrackmanEvent) => filters.every(filter => filter(event))
}

export const store = new Store();