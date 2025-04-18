import { Box, Modal } from "@mui/material";
import { YouTubeVideoPlayer } from "./YouTubeVideoPlayer";

type Props = {
  isModalOn: boolean;
  setIsModalOn: (isModalOn: boolean) => void;
  modalData: { [key: string]: string };
};

export const YouTubeVideoModal = ({ isModalOn, setIsModalOn, modalData }: Props) => {
  return (
    <Modal 
      open={isModalOn}
      onClose={() => setIsModalOn(false)} 
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