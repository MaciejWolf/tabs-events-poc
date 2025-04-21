import { FiltersPanelStore } from "./FiltersPanelStore";
import { Store } from "./Store";
import { YouTubeVideoStore } from "./YouTubeVideoStore";

const filtersPanelStore = new FiltersPanelStore();
const youTubeVideoStore = new YouTubeVideoStore();
const store = new Store();

export const useStores = () => ({
  filtersPanelStore,
  youTubeVideoStore,
  store
});