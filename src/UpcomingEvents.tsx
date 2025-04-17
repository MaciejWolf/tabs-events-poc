import { CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "./Store";

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
            <ListItemText
              primary={event.name}
              secondary={new Date(event.startDate).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </>
  )
});