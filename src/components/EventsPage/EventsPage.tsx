import { Box, Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react";
import { UpcomingEvents } from "./UpcomingEvents";
import { store } from "../../stores/Store";
import { OnDemandEvents } from "./OnDemandEvents";
import { observer } from "mobx-react-lite";
import { FiltersPanel } from "../FIltersPanel/FiltersPanel";
import { Overlay } from "../Overlay";
import { useStores } from "../../stores/useStores";

export const EventsPage = observer(() => {
  const { filtersPanelStore } = useStores();

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

  const getFilteredEventsCount = () => selectedTab === 0 ? store.filteredUpcomingEvents.length : store.filteredOnDemandEvents.length;

  return (
    <Box>
      <OverlayedFiltersPanel
        isOpen={filtersPanelStore.isOpen}
        filteredEventsCount={getFilteredEventsCount()} />
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
    </Box>
  )
});

const OverlayedFiltersPanel = ({ isOpen, filteredEventsCount }: { isOpen: boolean, filteredEventsCount: number }) => {
  const { filtersPanelStore } = useStores();

  return isOpen ? (
    <Overlay onClick={filtersPanelStore.close}>
      <FiltersPanel filteredEventsCount={filteredEventsCount} />
    </Overlay>
  ) : <></>;
};