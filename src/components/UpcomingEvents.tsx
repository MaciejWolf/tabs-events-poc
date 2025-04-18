import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../stores/Store";
import { EventsList } from "./EventsList";
import { FiltersPanel } from "./FIltersPanel/FiltersPanel";
import { Filter } from "../types/Filter";
import { useEffect } from "react";

const typeFilters: Filter[] = [
  { key: 'in-person', category: 'type', label: "In person", isSatisfiedBy: (event) => event.locationType === "inPerson" },
  { key: 'online', category: 'type', label: "Online", isSatisfiedBy: (event) => event.locationType === "online" },
]

const priceFilters: Filter[] = [
  { key: 'free', category: 'price', label: "Free", isSatisfiedBy: (event) => event.isPremium === false },
  { key: 'paid', category: 'price', label: "Paid", isSatisfiedBy: (event) => event.isPremium === true }
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
        <SelectedFiltersRow />
        <EventsList events={store.filteredUpcomingEvents}/>
      </Box>
      <FiltersPanel />
    </Box>
  )
});

const SelectedFiltersRow = observer(() => {
  if (store.appliedFilters.length === 0)
    return <></>

  return (
    <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
      {store.appliedFilters.map((filter) => (
        <Chip
          label={filter.label}
          onDelete={() => store.removeFilter(filter.key)}
          color="warning"
          size="small" />
      ))}
    </Box>
  )
})