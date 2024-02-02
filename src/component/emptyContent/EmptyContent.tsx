// @mui
import { styled } from "@mui/material/styles";
import { Typography, Box, BoxProps, Grid } from "@mui/material";
import Image from "../Image";
//

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  title: string;
  img?: string;
  description?: string;
}

export default function EmptyContent({
  title,
  description,
  img,
  ...other
}: Props) {
  return (
    <RootStyle {...other} className="empty-wrapper" style ={{height:title === "No Images" ? 10 : '', width:title === "No Images" ? 10 : ''}}>
      <Grid className="empty-content">
        <Image
          disabledEffect
          visibleByDefault
          alt="empty content"
          src={img || "/assets/illustrations/illustration_empty_content.svg"}
          sx={{ height: 80, width: 80, mb: 1 }}
          height={""}
        />

        <Typography
          variant="h5"
          gutterBottom
          className="fs-16 fw-400 secondary-font-color"
        >
          {title}
        </Typography>

        {description && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        )}
      </Grid>
    </RootStyle>
  );
}
