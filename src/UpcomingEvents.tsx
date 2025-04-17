import { Box, Chip, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "./Store";
import { TrackmanEvent } from "./TrackmanEvent";

const getLocationLabel = (event: TrackmanEvent): string => {
  if (event.locationType === "online") {
    return "Online"
  }
  return `In person — ${event.location}`
}

export const UpcomingEvents = observer(() => {
  console.log(store.isLoading);
  if (store.isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>Upcoming Events: {store.upcomingEvents.length}</Typography>
      <List>
        {store.filteredUpcomingEvents.map(event => (
          <ListItem key={event.id} divider>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText
                primary={event.name}
                secondary={`${new Date(event.startDate).toLocaleString()} • ${getLocationLabel(event)}`}
              />
              {event.isPremium && <Chip label="Premium" color="warning" size="small" sx={{ marginLeft: 2 }}/>}
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  )
});