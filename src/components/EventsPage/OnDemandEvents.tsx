import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Filter } from "../../types/Filter";
import { useEffect } from "react";
import { EventsList } from "./EventsList";
import { SelectedFilters } from "./SelectedFilters";
import { YouTubeVideoModal } from "../YouTubeVideoModal";
import { useStores } from "../../stores/useStores";

const priceFilters: Filter[] = [
  { key: 'free', category: 'price', label: "Free", apply: (event) => event.isPremium === false },
  { key: 'paid', category: 'price', label: "Paid", apply: (event) => event.isPremium === true }
]

export const OnDemandEvents = observer(() => {
  const { store, filtersPanelStore, youTubeVideoStore } = useStores();

  useEffect(() => {
    store.setFilters([
      { category: "Price", filters: priceFilters },
    ]);
  }, []);

  if (store.isLoading) {
    return <CircularProgress />
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h6" gutterBottom>On Demand Events: {store.filteredOnDemandEvents.length}/{store.onDemandEvents.length}</Typography>
        <SelectedFilters />
        <EventsList events={store.filteredOnDemandEvents} />
      </Box>
      {!filtersPanelStore.isOpen && (<Button onClick={filtersPanelStore.open}>Filters</Button>)}

      {youTubeVideoStore.isOpen() && (<YouTubeVideoModal
        isModalOn={youTubeVideoStore.isOpen()}
        onClose={youTubeVideoStore.close}
        modalData={youTubeVideoStore.video!} />)}
    </Box>
  );
});

