import { FiltersPanelStore } from "./FiltersPanelStore";
import { FiltersStore } from "./FiltersStore";
import { TrackmanEventsStore } from "./TrackmanEventsStore";

const filtersStore = new FiltersStore();
const trackmanEventsStore = new TrackmanEventsStore(filtersStore);
const filtersPanelStore = new FiltersPanelStore();

export const useStores = () => ({
  filtersStore,
  trackmanEventsStore,
  filtersPanelStore
});