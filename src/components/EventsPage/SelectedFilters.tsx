import { Box, Chip } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useStores } from "../../stores/useStores"

export const SelectedFilters = observer(() => {
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