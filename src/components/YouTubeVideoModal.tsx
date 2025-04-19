import { Box, Modal } from "@mui/material";
import { YouTubeVideoPlayer } from "./YouTubeVideoPlayer";

type Props = {
  isModalOn: boolean;
  onClose: (isModalOn: boolean) => void;
  modalData: { 
    videoId: string; 
    videoLabel: string };
};

export const YouTubeVideoModal = ({ isModalOn, onClose, modalData }: Props) => {
  return (
    <Modal 
      open={isModalOn}
      onClose={() => onClose(false)} 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.85)", // optional dark backdrop
      }}>
      <Box>
        <YouTubeVideoPlayer youTubeId={modalData.videoId} title={modalData.videoLabel} />
      </Box>
    </Modal>
  );
};