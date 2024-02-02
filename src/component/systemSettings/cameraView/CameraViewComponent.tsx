import CustomImageComponent from "@/component/image/page";
import { STRINGS, routerStrings } from "@/strings";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { back_icon } from "@/assets/images";
import ASSelect from "@/molecules/ASSelect";
import { routerUtils } from "@/utils/routerUtils";
import { useRouter } from "next/navigation";
export default function CameraViewComponent() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <Grid className="camera-view-wrapper">
      <Grid className="camera-view-header">
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <Button className="back-btn" onClick={goBack}>
              <CustomImageComponent
                src={back_icon.src}
                width={44}
                height={44}
                alt={STRINGS.ALT_PROFILE}
                style={null}
              />
            </Button>
          </Grid>
          <Grid item xs={11} sx={{ textAlign: "center" }}>
            <ASSelect name="" label="" placeholder="" type="text">
              <option value={"Camera1"}>Camera 1</option>
              <option value={"Camera2"}>Camera 2</option>
              <option value={"Camera3"}>Camera 3</option>
            </ASSelect>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="camera-view-content">
        <video className="w-100" src=""></video>
      </Grid>
    </Grid>
  );
}
