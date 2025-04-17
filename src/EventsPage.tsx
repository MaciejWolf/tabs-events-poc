import { Box, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react";

export const EventsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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

const UpcomingEvents = () => {
  return <Typography variant="h6">Upcoming Events placeholder</Typography>
}

const OnDemandEvents = () => {
  return <Typography variant="h6">On Demand Events placeholder</Typography>
}
