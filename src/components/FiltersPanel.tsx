import { Box, Button, Divider, IconButton, Chip, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import CloseIcon from "@mui/icons-material/Close"

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
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6">Filter</Typography>
          <IconButton size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* TYPE */}
        <Typography variant="subtitle2" gutterBottom>
          TYPE
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
          <Chip
            label="In-person"
            clickable
            variant="filled"
            color="warning"
            size="small"
          />
          <Chip
            label="Online"
            clickable
            variant="outlined"
            size="small"
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* PRICE */}
        <Typography variant="subtitle2" gutterBottom>
          PRICE
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip
            label="Free"
            clickable
            variant="filled"
            color="warning"
            size="small"
          />
          <Chip
            label="Paid"
            clickable
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Selected Filters */}
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
      </Box>

      <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
        <Chip
          label="Clear all"
          clickable
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Footer */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="outlined" size="small">
          Clear all
        </Button>
        <Button
          variant="contained"
          size="small"
          color="warning"
        >
          Apply [5 results]
        </Button>
      </Box>
    </Box>
  )
})