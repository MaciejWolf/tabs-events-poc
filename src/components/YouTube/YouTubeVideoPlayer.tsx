import { Box } from "@mui/material";

type Props = {
  youTubeId: string
  title: string
  height?: number
  width?: number
}

export const YouTubeVideoPlayer = ({
  youTubeId,
  title,
  height = 440,
  width = 792,
}: Props) => {
  const url = `//www.youtube.com/embed/${youTubeId}?autoplay=0&amp;rel=0&amp;fs=1&enablejsapi=1&playerapiid=player&amp;wmode=opaque&amp;hl=en_US&amp;cc_lang_pref=en_US`;

  return (
    <Box 
      component="iframe"
      src={url}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      sx={{
        display: "block",
        maxWidth: "100%",
        border: 0,
        borderRadius: 2, // optional rounded corners
        height: height,
        width: width
      }}
    />
  )
}