import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import EmptyContent from "../emptyContent/EmptyContent";
import emptyUseIcon from "../../assets/images/no_user.png";
import Image from "../Image";
import editIcon from "../../assets/images/edit_icon.svg";
import userImg from "../../assets/images/user_img.png";
import { useEffect, useRef, useState } from "react";
import { routerUtils } from "@/utils/routerUtils";
import { routerStrings } from "@/strings";
import { useRouter } from "next/navigation";
export default function UnknownUsersComponent() {
  const router = useRouter();
  const unknownUserList: any[] = [
    {
      id: "1",
      image: userImg.src,
    },
    {
      id: "2",
      image: userImg.src,
    },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    const container = containerRef.current;
    if (container) {
      const isContentOverflowing =
        container.scrollWidth > container.clientWidth;
      setIsOverflowing(isContentOverflowing);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      checkOverflow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleUserEdit = () => {
    routerUtils(
      `${routerStrings.addNewUser}?tittle=Edit User&btnText=Update`,
      router
    );
  };
  return (
    <Grid>
      <Grid sx={{ margin: "20px 0px " }}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item xs={12} lg={3}>
            <Typography
              variant="h2"
              className="fs-26 fw-600 primary-font-color"
            >
              Unknown Users
            </Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Grid
              container
              spacing={1}
              sx={{ alignItems: "center", justifyContent: "end" }}
            >
              <Grid item xs={12} sm={3} xl={2}>
                <TextField
                  id="date"
                  className="disable-label-overlap"
                  label="Start Date"
                  type="date"
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={3} xl={2}>
                <TextField
                  id="date"
                  className="disable-label-overlap"
                  label="End Date"
                  type="date"
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={3} xl={2}>
                <Grid className="form-check-box" sx={{ paddingLeft: "8px" }}>
                  <FormControlLabel
                    control={<Checkbox name={"Show All"} />}
                    label={"Show All"}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} lg={3} xl={2}>
                <Grid sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="text"
                    className="btn primary-bg text-white fs-16 fw-600"
                    sx={{ marginRight: 1 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {unknownUserList?.length > 0 ? (
        <Grid className="unknown-user-list-wrapper">
          <Grid className="unknown-user-list" ref={containerRef}>
            <List>
              {unknownUserList?.map((userList: any, index: any) => (
                <ListItem key={index}>
                  <Grid className="unknown-items-wrapper">
                    <Image
                      src={userList.image}
                      height={80}
                      sx={{ borderRadius: "50px" }}
                    />
                    <Grid className="edit-btn-wrapper">
                      <Button onClick={handleUserEdit}>
                        <img src={editIcon.src} alt="" />
                      </Button>
                    </Grid>

                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ marginTop: 1 }}
                      className="fs-16 fw-400 secondary-font-color"
                    >
                      Edit User
                    </Typography>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      ) : (
        <EmptyContent title="No User" img={emptyUseIcon.src} />
      )}
    </Grid>
  );
}
