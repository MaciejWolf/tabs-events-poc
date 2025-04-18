import { Box, CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../stores/Store";
import { EventsList } from "./EventsList";
import { FiltersPanel } from "./FIltersPanel/FiltersPanel";
import { Filter } from "../types/Filter";

const typeFilters: Filter[] = [
  { key: 'in-person', label: "In person", isSatisfiedBy: (e) => e.locationType === "inPerson" },
  { key: 'online', label: "Online", isSatisfiedBy: (e) => e.locationType === "online" },
]

const priceFilters: Filter[] = [
  { key: 'free', label: "Free", isSatisfiedBy: (e) => e.isPremium === false },
  { key: 'paid', label: "Paid", isSatisfiedBy: (e) => e.isPremium === true }
]

export const UpcomingEvents = observer(() => {
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
  )
});

