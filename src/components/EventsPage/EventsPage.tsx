import { Box, Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react";
import { UpcomingEvents } from "./UpcomingEvents";
import { store } from "../../stores/Store";
import { OnDemandEvents } from "./OnDemandEvents";
import { filtersPanelStore } from "../../stores/FiltersPanelStore";
import { observer } from "mobx-react-lite";

export const EventsPage = observer(() => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  useEffect(() => {
    store.getTrackmanEvents()
  });

  const onTabChange = () => {
    store.clearFilters();
    filtersPanelStore.close();
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Upcoming" onClick={onTabChange} />
          <Tab label="On Demand" onClick={onTabChange} />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {selectedTab === 0 && <UpcomingEvents />}
        {selectedTab === 1 && <OnDemandEvents />}
      </Box>
    </Box>
  )
});

const FiltersBackground = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }} />
  )
}