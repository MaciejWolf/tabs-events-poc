import { Box, Typography, Chip } from "@mui/material"
import { Filter } from "../../types/Filter";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/useStores";

type Props = {
  header: string,
  filters: Filter[]
}

export const FiltersRow = observer(({ header, filters }: Props) => {
  const { store } = useStores();

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {header}
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
        {filters.map((filter) => store.isFilterSelected(filter.key)
          ? (<SelectedFilter key={filter.key} label={filter.label} onClick={() => store.removeFilter(filter.key)} />)
          : (<NotSelectedFilter key={filter.key} label={filter.label} onClick={() => (store.addFilter(filter))} />)
        )}
      </Box>
    </Box>
  )
})

const SelectedFilter = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <Chip
    label={label}
    clickable
    variant="filled"
    onClick={onClick}
    color="warning"
    size="small" />
)

const NotSelectedFilter = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <Chip
    label={label}
    onClick={onClick}
    variant="outlined"
    size="small" />
)