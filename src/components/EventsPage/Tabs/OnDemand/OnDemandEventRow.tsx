import { ListItem, Box, Button, ListItemText, Chip } from "@mui/material";
import { useStores } from "../../../../stores/useStores";
import { OnDemandEvent } from "../../../../types/TrackmanEvent";

export const OnDemandEventRow = ({ event }: { event: OnDemandEvent }) => {
  const { youTubeVideoStore } = useStores();

  return <ListItem key={event.id} divider>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="text"
        color="primary"
        size="small"
        sx={{ marginRight: 2 }}
        onClick={() => youTubeVideoStore.video = { videoLabel: event.name, videoId: event.recordingUrl }}>
        Watch Now
      </Button>
      <ListItemText
        primary={event.name}
        secondary={`${new Date(event.startDate).toLocaleString()}`} />
      {event.isPremium && <Chip label="Premium" color="warning" size="small" sx={{ marginLeft: 2 }} />}
    </Box>
  </ListItem>;
}