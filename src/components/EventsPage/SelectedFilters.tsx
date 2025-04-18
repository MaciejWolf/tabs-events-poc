import { Box, Chip } from "@mui/material"
import { observer } from "mobx-react-lite"
import { store } from "../../stores/Store"

export const SelectedFilters = observer(() => {
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