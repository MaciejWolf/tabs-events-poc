import { Box, Typography, Chip } from "@mui/material"

type Props = {
  header: string,
  filters: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
  }[]
}

export const FiltersRow = ({ header, filters }: Props) => {
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {header}
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
        {filters.map((filter, index) => filter.isSelected ? (
          <SelectedFilter key={index} label={filter.label} onClick={filter.onClick} />
        ) : (
          <NotSelectedFilter key={index} label={filter.label} onClick={filter.onClick} />
        ))}
      </Box>
    </Box>
  )
}

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