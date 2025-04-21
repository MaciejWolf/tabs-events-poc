import { ListItem, Box, ListItemText, Chip } from "@mui/material";
import { UpcomingEvent } from "../../../../types/TrackmanEvent";

export const UpcomingEventRow = ({ event }: { event: UpcomingEvent }) =>
  <ListItem key={event.id} divider>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ListItemText
        primary={event.name}
        secondary={`${new Date(event.startDate).toLocaleString()} • ${getLocationLabel(event)}`}
      />
      {event.isPremium && <Chip label="Premium" color="warning" size="small" sx={{ marginLeft: 2 }} />}
    </Box>
  </ListItem>

const getLocationLabel = (event: UpcomingEvent): string => {
  if (event.locationType === "online") {
    return "Online"
  }
  return `In person — ${event.location}`
}