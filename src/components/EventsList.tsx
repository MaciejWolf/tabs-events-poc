import { Box, Chip, List, ListItem, ListItemText } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../stores/Store";
import { TrackmanEvent } from "../types/TrackmanEvent";

const getLocationLabel = (event: TrackmanEvent): string => {
  if (event.locationType === "online") {
    return "Online"
  }
  return `In person — ${event.location}`
}

export const EventsList = observer(() => {
  return(
    <>
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

