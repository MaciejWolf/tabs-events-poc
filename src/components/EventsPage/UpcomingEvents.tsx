import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../../stores/Store";
import { EventsList } from "./EventsList";
import { Filter } from "../../types/Filter";
import { useEffect } from "react";
import { SelectedFilters } from "./SelectedFilters";
import { filtersPanelStore } from "../../stores/FiltersPanelStore";
import { isInPersonEvent, isOnlineEvent } from "../../types/TrackmanEvent";

const typeFilters: Filter[] = [
  { key: 'in-person', category: 'type', label: "In person", apply: isInPersonEvent },
  { key: 'online', category: 'type', label: "Online", apply: isOnlineEvent },
]

const priceFilters: Filter[] = [
  { key: 'free', category: 'price', label: "Free", apply: (event) => event.isPremium === false },
  { key: 'paid', category: 'price', label: "Paid", apply: (event) => event.isPremium === true }
]

export const UpcomingEvents = observer(() => {
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
