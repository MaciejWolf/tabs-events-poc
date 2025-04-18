import { Box, Tab, Tabs, Typography } from "@mui/material"
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { UpcomingEvents } from "./UpcomingEvents";
import { store } from "../stores/Store";

export const EventsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    store.getTrackmanEvents()
  }, [store]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Upcoming" />
          <Tab label="On Demand" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {selectedTab === 0 && <UpcomingEvents />}
        {selectedTab === 1 && <OnDemandEvents />}
      </Box>

    </Box>
  )
}

const OnDemandEvents = observer(() => {
  return <Typography variant="h6">On Demand Events placeholder</Typography>
});
