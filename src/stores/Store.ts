import { makeAutoObservable } from "mobx";
import { byDate as compareByDate } from "../utils/dataSorters";
import { Filter } from "../types/Filter";
import { getTrackmanEvents } from "../services/getTrackmanEvents";
import { isOnDemandEvent, isUpcomingEvent, OnDemandEvent, TrackmanEvent, UpcomingEvent } from "../types/TrackmanEvent";
import { groupBy } from "../utils/groupBy";

export class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isLoaded: boolean = false;
  isLoading: boolean = true;

  upcomingEvents: UpcomingEvent[] = [];
  onDemandEvents: OnDemandEvent[] = [];

  filteredUpcomingEvents: UpcomingEvent[] = [];
  filteredOnDemandEvents: OnDemandEvent[] = [];

  appliedFilters: Filter[] = [];

  getTrackmanEvents = async () => {
    if (this.isLoaded) {
      return;
    }

    this.isLoading = true;
    const response = await getTrackmanEvents();

    this.upcomingEvents = response
      .filter(isUpcomingEvent)
      .sort(compareByDate(event => event.startDate, 'DESCENDING'));

    this.onDemandEvents = response
      .filter(isOnDemandEvent)
      .sort(compareByDate(event => event.startDate, 'ASCENDING'));

    this.refreshFilteredEvents();

    this.isLoading = false;
    this.isLoaded = true;
  }

  categorisedFilters: { categoryName: string; filters: Filter[] }[] = [];

  setFilters = (categorisedFilters: { categoryName: string; filters: Filter[] }[]) => {
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

    this.filteredUpcomingEvents = this.upcomingEvents.filter(this.isAcceptedByAllFilters(categoryFilters));
    this.filteredOnDemandEvents = this.onDemandEvents.filter(this.isAcceptedByAllFilters(categoryFilters));
  }

  private getCategoryFilters = () => {
    const filtersGroups = groupBy(this.appliedFilters, filter => filter.category);
    return Object.entries(filtersGroups).map(([, filters]) => this.aggregateFiltersInCategory(filters));
  }

  private aggregateFiltersInCategory = (filters: Filter[]) => {
    const acceptEverything = () => true;

    return filters.length === 0 
    ? acceptEverything
    : this.isAcceptedByAnyFilter(filters);
  }

  private isAcceptedByAnyFilter = (filters: Filter[]) => (event: TrackmanEvent) => filters.some(filter => filter.apply(event))

  private isAcceptedByAllFilters = (filters: Array<((event: TrackmanEvent) => boolean)>) => (event: TrackmanEvent) => filters.every(filter => filter(event))
}
