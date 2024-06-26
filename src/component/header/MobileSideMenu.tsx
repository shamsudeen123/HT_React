import {
  Avatar,
  Box,
  Button,
  Drawer,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  IconButton,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import profileImg from "../../assets/images/profile.svg";
import listIcon from "../../assets/images/list-icon.svg";
import menuIcon from "../../assets/images/menu.svg";
import closeIcon from "../../assets/images/close.svg";
import { usePathname, useRouter } from "next/navigation";
import { routerStrings } from "@/strings";
import { routerUtils } from "@/utils/routerUtils";
type Anchor = "top" | "left" | "bottom" | "right";
export default function MobileSideMenu(props: any) {
  const router = useRouter();
  const [indexValue, setIndexValue] = useState(0);
  const [state, setState] = useState({
    left: false,
  });
  const pathName = usePathname();
  const role: any =
  typeof window !== "undefined" ? localStorage.getItem("role") : "";
  const dealerName =
  typeof window !== "undefined" ? localStorage.getItem("dealerName") : "";
  const imagePath =
    typeof window !== "undefined" ? localStorage.getItem("profileImg") : "";
    const menuList = parseInt(role) === 0 ? [
      "Ticket Management",
      "User Management",
    ] : [
      "Ticket Management",
    ];

  useEffect(() => {

    switch (pathName) {
      case "/dashboard":
        setIndexValue(0);
        return router.push("/dashboard");
      case "/userManagement":
        setIndexValue(1);
        return router.push("/userManagement");
      case "/unknownUsers":
        setIndexValue(2);
        return router.push("/unknownUsers");
      case "/reports":
        setIndexValue(3);
        return router.push("/reports");
      case "/systemSettings":
        setIndexValue(4);
        return router.push("/systemSettings");
      default:
        break;
    }
  }, []);
  const handleListNavigation = (navItem: any, index: any) => {
    switch (navItem) {
      case "Attendance":
        setIndexValue(index);
        return router.push("/dashboard");
      case "User Management":
        setIndexValue(index);
        return router.push("/userManagement");
      case "Unknown Users":
        setIndexValue(index);
        return router.push("/unknownUsers");
      case "Reports":
        setIndexValue(index);
        return router.push("/reports");
      case "System Settings":
        setIndexValue(index);
        return router.push("/systemSettings");
      default:
        break;
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    routerUtils(routerStrings.login, router);
  };
  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    props.setOpenSideMenu(true);
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      className="mobile-menu-content"
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 280,
      }}
      role="presentation"
    >
      <Grid
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "end",
          marginBottom: 2,
        }}
      >
        <IconButton
          aria-label=""
          onClick={toggleDrawer("left", false)}
          sx={{
            width: "25px",
            height: "25px",
          }}
        >
          <img src={closeIcon.src} alt="" />
        </IconButton>
      </Grid>

      <Grid className="profile-details">
      <Avatar alt="Remy Sharp" src={imagePath  ? imagePath : profileImg} style={{objectFit: "contain"}} />
        <Grid>
          <Typography variant="h6"> {dealerName}</Typography>
          <Typography variant="body1"> {parseInt(role) === 0 ? "Admin" : parseInt(role) === 1 ? "Dealer" : "Sales Person"}</Typography>
        </Grid>
      </Grid>
      <Grid className="menu-list-wrapper" sx={{ marginTop: 1.5 }}>
        <List>
          {menuList.map((value: any, index: any) => (
            <ListItem
              className={index === indexValue ? "active" : ""}
              key={index}
              // onLoad={() => handleListItem(value)}
            >
              <ListItemIcon>
                <img src={listIcon.src} alt="" />
              </ListItemIcon>
              <Link
                variant="body1"
                sx={{ cursor: "pointer" }}
                onClick={() => handleListNavigation(value, index)}
                rel="noopener noreferrer"
              >
                {value}
              </Link>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid onClick={handleLogout}>
        <Button className="mobile-menu-btn" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
    </Box>
  );
  return (
    <Grid>
      <IconButton aria-label="" onClick={toggleDrawer("left", true)}>
        <img src={menuIcon.src} alt="" />
      </IconButton>

      <Drawer
        className="mobile-menu-wrapper"
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </Grid>
  );
}
