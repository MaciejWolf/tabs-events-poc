import { Box, CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Filter } from "../types/Filter";
import { useEffect } from "react";
import { store } from "../stores/Store";
import { EventsList } from "./EventsList";
import { FiltersPanel } from "./FIltersPanel/FiltersPanel";

const priceFilters: Filter[] = [
  { key: 'free', category: 'price', label: "Free", isSatisfiedBy: (event) => event.isPremium === false },
  { key: 'paid', category: 'price', label: "Paid", isSatisfiedBy: (event) => event.isPremium === true }
]

export const OnDemandEvents = observer(() => {

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
        <Typography variant="h6" gutterBottom>Upcoming Events: {store.upcomingEvents.length}</Typography>
        <EventsList />
      </Box>
      <FiltersPanel />
    </Box>
  );
});