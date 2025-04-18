import { Box } from "@mui/material"
import { ReactNode } from "react"

type Props = {
  onClick: () => void
  children: ReactNode
}

export const Overlay = ({ onClick: onClose, children }: Props) => {
  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* Prevent overlay click from closing when clicking inside */}
      <Box onClick={e => e.stopPropagation()} sx={{ zIndex: 200 }}>
        {children}
      </Box>
    </Box>
  )
}