import { Box, Button, Divider, IconButton, Chip, Typography, Paper } from "@mui/material"
import { observer } from "mobx-react-lite"
import CloseIcon from "@mui/icons-material/Close"
import { FiltersRow } from "./FiltersRow"
import { useStores } from "../../stores/useStores"

type Props = {
  filteredEventsCount: number
}

export const FiltersPanel = observer(({ filteredEventsCount }: Props) => {
  const { store } = useStores()

  return (
    <Paper
      sx={{
        width: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderLeft: 1,
        borderColor: "divider",
        px: 3,
        py: 2,
      }}
    >
      <Header />
      {store.categorisedFilters.map((category) => (
        <Box key={category.category}>
          <Divider sx={{ mb: 3 }} />
          <FiltersRow header={category.category} filters={category.filters} />
        </Box>
      ))}
      <SelectedFiltersRow />
      <ClearAllButton />
      <Footer filteredEventsCount={filteredEventsCount} />
    </Paper>
  )
})

const Header = () => {
  const { filtersPanelStore } = useStores();

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
  const { store } = useStores()

  if (store.appliedFilters.length === 0)
    return <></>

  return (
    <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
      {store.appliedFilters.map((filter) => (
        <Chip
          key={filter.key}
          label={filter.label}
          onDelete={() => store.removeFilter(filter.key)}
          color="warning"
          size="small" />
      ))}
    </Box>
  )
})

const ClearAllButton = () => {
  const { store } = useStores()

  if (store.appliedFilters.length === 0)
    return <></>

  return (
    <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
      <Chip
        label="Clear all"
        clickable
        variant="outlined"
        size="small"
        onClick={store.clearFilters} />
    </Box>
  )
}

const Footer = ({ filteredEventsCount }: { filteredEventsCount: number }) => {
  const { store, filtersPanelStore } = useStores();

  return (
    <Box mt={4} display="flex" justifyContent="space-between">
      <Button variant="outlined" size="small" onClick={store.clearFilters}>
        Clear all
      </Button>
      <Button
        variant="contained"
        size="small"
        color="warning"
        onClick={filtersPanelStore.close}
      >
        Apply [{filteredEventsCount} results]
      </Button>
    </Box>)
}