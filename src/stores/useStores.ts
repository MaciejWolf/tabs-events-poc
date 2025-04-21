import { FiltersPanelStore } from "./FiltersPanelStore";
import { FiltersStore } from "./FiltersStore";
import { Store } from "./Store";
import { TrackmanEventsStore } from "./TrackmanEventsStore";
import { YouTubeVideoStore } from "./YouTubeVideoStore";

const filtersStore = new FiltersStore();
const trackmanEventsStore = new TrackmanEventsStore(filtersStore);
const filtersPanelStore = new FiltersPanelStore();
const youTubeVideoStore = new YouTubeVideoStore();
const store = new Store();

export const useStores = () => ({
  filtersStore,
  trackmanEventsStore,
  filtersPanelStore,
  youTubeVideoStore,
  store
});