import { Box, Button, Divider, IconButton, Chip, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import CloseIcon from "@mui/icons-material/Close"
import { FiltersRow } from "./FiltersRow"
import { store } from "../../stores/Store"
import { filtersPanelStore } from "../../stores/FiltersPanelStore"

type Props = {
  filteredEventsCount: number
}

export const FiltersPanel = observer(({ filteredEventsCount}: Props) => {
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
      <Header />
      {store.categorisedFilters.map((category) => (
        <>
          <Divider sx={{ mb: 3 }} />
          <FiltersRow header={category.category} filters={category.filters} />
        </>
      ))}
      <SelectedFiltersRow />
      <ClearAllButton onClick={() => store.clearFilters()} />
      <Footer
        filteredEventsCount={filteredEventsCount}
        onApply={() => { }}
        onClearAll={() => store.clearFilters()} />
    </Box>
  )
})

const Header = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
      <Typography variant="h6">Filter</Typography>
      <IconButton size="small" aria-label="close" onClick={filtersPanelStore.close}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

const SelectedFiltersRow = observer(() => {
  if (store.appliedFilters.length === 0)
    return <></>

  return (
    <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
      {store.appliedFilters.map((filter) => (
        <Chip
          label={filter.label}
          onDelete={() => store.removeFilter(filter.key)}
          color="warning"
          size="small" />
      ))}
    </Box>
  )
})

const ClearAllButton = observer(({ onClick }: { onClick: () => void }) => {
  if (store.appliedFilters.length === 0)
    return <></>

  return (
    <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
      <Chip
        label="Clear all"
        clickable
        variant="outlined"
        size="small"
        onClick={onClick} />
    </Box>
  )
})

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