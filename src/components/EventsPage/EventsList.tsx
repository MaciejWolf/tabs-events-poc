import { Box, List } from "@mui/material";
import { ReactNode } from "react";

export const EventsList = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <List>
        {children}
      </List>
    </Box>
  )
};
