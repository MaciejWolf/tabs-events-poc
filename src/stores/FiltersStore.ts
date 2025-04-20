import { makeAutoObservable } from "mobx";
import { Filter } from "../types/Filter";

export class FiltersStore {
  constructor() {
    makeAutoObservable(this);
  }

  appliedFilters: Filter[] = [];

  categorisedFilters: { category: string; filters: Filter[] }[] = [];

  setFilters = (categorisedFilters: { category: string; filters: Filter[] }[]) => {
    this.categorisedFilters = categorisedFilters;
    this.appliedFilters = [];
  }

  clearFilters = () => {
    this.appliedFilters = [];
  }
  addFilter = (filter: Filter) => {
    this.appliedFilters.push(filter);
    this.appliedFilters = [...this.appliedFilters];
  }

  removeFilter = (key: string) => {
    this.appliedFilters = this.appliedFilters.filter(filter => filter.key !== key);
  }

  isFilterSelected = (key: string) => this.appliedFilters.some(filter => filter.key === key)
}
