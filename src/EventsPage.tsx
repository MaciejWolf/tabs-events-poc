import { Box, Tab, Tabs } from "@mui/material"

export const EventsPage = () => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs>
        <Tab label="Upcoming" />
        <Tab label="On Demand" />
      </Tabs>
    </Box>
  )
}
