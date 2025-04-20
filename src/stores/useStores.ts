import { FiltersStore } from "./FiltersStore";
import { TrackmanEventsStore } from "./TrackmanEventsStore";

const filtersStore = new FiltersStore();
const trackmanEventsStore = new TrackmanEventsStore(filtersStore);

export const useStores = () => ({
  filtersStore,
  trackmanEventsStore,
});