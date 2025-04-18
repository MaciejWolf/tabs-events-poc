import { Box, CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../stores/Store";
import { EventsList } from "./EventsList";
import { FiltersPanel } from "./FiltersPanel";

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

