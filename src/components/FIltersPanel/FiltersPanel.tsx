import { Box, Button, Divider, IconButton, Chip, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import CloseIcon from "@mui/icons-material/Close"
import { FiltersRow } from "./FiltersRow"

export const FiltersPanel = observer(() => {
  return (
    <Box
      width={300}
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderLeft={1}
      borderColor="divider"
      px={3}
      py={2}
    >
      <Box>
        <Header />

        <Divider sx={{ mb: 3 }} />

        <FiltersRow header="TYPE" filters={[
          { key: 'in-person', label: "In person", isSelected: true, onClick: () => { } },
          { key: 'online', label: "Online", isSelected: false, onClick: () => { } },
        ]} />

        <Divider sx={{ mb: 3 }} />

        <FiltersRow header="PRICE" filters={[
          { key: 'free', label: "Free", isSelected: true, onClick: () => { } },
          { key: 'paid', label: "Paid", isSelected: false, onClick: () => { } },
        ]} />

        <SelectedFiltersRow />
      </Box>

      <ClearAllButton onClick={() => {}}/>

      <Footer 
        filteredEventsCount={5} 
        onApply={() => {}} 
        onClearAll={() => {}} />
    </Box>
  )
})

const Header = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
      <Typography variant="h6">Filter</Typography>
      <IconButton size="small" aria-label="close">
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

const SelectedFiltersRow = () => {
  return (
    <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
      <Chip
        label="Free"
        onDelete={() => { }}
        color="warning"
        size="small"
      />
      <Chip
        label="In-person"
        onDelete={() => { }}
        color="warning"
        size="small"
      />
    </Box>
  )
}

const ClearAllButton = ({ onClick }: { onClick: () => void }) => (
  <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
    <Chip
      label="Clear all"
      clickable
      variant="outlined"
      size="small"
      onClick={onClick} />
  </Box>
)

const Footer = ({
  filteredEventsCount,
  onClearAll,
  onApply
}: {
  filteredEventsCount: number,
  onClearAll: () => void,
  onApply: () => void
}) => {
  return (
    <Box mt={4} display="flex" justifyContent="space-between">
      <Button variant="outlined" size="small" onClick={onClearAll}>
        Clear all
      </Button>
      <Button
        variant="contained"
        size="small"
        color="warning"
        onClick={onApply}
      >
        Apply [{filteredEventsCount} results]
      </Button>
    </Box>)
}