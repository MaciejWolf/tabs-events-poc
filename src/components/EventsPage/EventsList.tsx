import { Box, Chip, List, ListItem, ListItemText } from "@mui/material";
import { isUpcomingEvent, OnDemandEvent, TrackmanEvent, UpcomingEvent } from "../../types/TrackmanEvent";

const getLocationLabel = (event: TrackmanEvent): string => {
  if (event.locationType === "online") {
    return "Online"
  }
  return `In person — ${event.location}`
}

export const EventsList = ({ events }: { events: TrackmanEvent[] }) => {
  return (
    <Box>
      <List>
        {events.map(event => isUpcomingEvent(event)
          ? <UpcomingEventRow event={event} />
          : <OnDemandEventRow event={event} />
        )}
      </List>
    </Box>
  )
};

const UpcomingEventRow = ({ event }: { event: UpcomingEvent }) =>
  <ListItem key={event.id} divider>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ListItemText
        primary={event.name}
        secondary={`${new Date(event.startDate).toLocaleString()} • ${getLocationLabel(event)}`}
      />
      {event.isPremium && <Chip label="Premium" color="warning" size="small" sx={{ marginLeft: 2 }} />}
    </Box>
  </ListItem>

const OnDemandEventRow = ({ event }: { event: OnDemandEvent }) =>
  <ListItem key={event.id} divider>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ListItemText
        primary={event.name}
        secondary={`${new Date(event.startDate).toLocaleString()} • ${getLocationLabel(event)}`}
      />
      {event.isPremium && <Chip label="Premium" color="warning" size="small" sx={{ marginLeft: 2 }} />}
    </Box>
  </ListItem>