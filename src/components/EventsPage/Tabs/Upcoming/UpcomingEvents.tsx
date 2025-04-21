import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStores } from "../../../../stores/useStores";
import { Filter } from "../../../../types/Filter";
import { isInPersonEvent, isOnlineEvent } from "../../../../types/TrackmanEvent";
import { EventsList } from "../../EventsList";
import { SelectedFilters } from "../../SelectedFilters";

const typeFilters: Filter[] = [
  { key: 'in-person', category: 'type', label: "In person", apply: isInPersonEvent },
  { key: 'online', category: 'type', label: "Online", apply: isOnlineEvent },
]

const priceFilters: Filter[] = [
  { key: 'free', category: 'price', label: "Free", apply: (event) => event.isPremium === false },
  { key: 'paid', category: 'price', label: "Paid", apply: (event) => event.isPremium === true }
]

export const UpcomingEvents = observer(() => {
  const { store, filtersPanelStore } = useStores();

  useEffect(() => {
    store.setFilters([
      { category: "Type", filters: typeFilters },
      { category: "Price", filters: priceFilters },
    ]);
  }, []);

  if (store.isLoading) {
    return <CircularProgress />
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h6" gutterBottom>Upcoming Events: {store.filteredUpcomingEvents.length}/{store.upcomingEvents.length}</Typography>
        <SelectedFilters />
        <EventsList events={store.filteredUpcomingEvents} />
      </Box>
      {!filtersPanelStore.isOpen && (<Button onClick={filtersPanelStore.open}>Filters</Button>)}
    </Box>
  )
});
