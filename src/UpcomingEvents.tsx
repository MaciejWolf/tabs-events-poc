import { CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "./Store";

export const UpcomingEvents = observer(() => {
  console.log(store.isLoading);
  if (store.isLoading) {
    return <CircularProgress />
  }

  return <Typography variant="h6">Upcoming Events placeholder</Typography>
});