import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import logo from "../../assets/images/app_logo_md.png";
import { useState } from "react";
import React from "react";
import useResponsive from "@/hooks/useResponsive";
import MobileSideMenu from "./MobileSideMenu";
import profileImg from "../../assets/images/profile.svg";
import { routerUtils } from "@/utils/routerUtils";
import { routerStrings } from "@/strings";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
export default function Header() {

  const router = useRouter();
  const isDesktop = useResponsive("up", "md");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const settings = ["Logout"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [openSideMenu, setOpenSideMenu] = useState(true);
  const userDetails = useSelector((state:any) => state?.attendanceSystem?.login?.data?.data);
  const imagePath =
    typeof window !== "undefined" ? localStorage.getItem("profileImg") : "";
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem('accessToken');
    router.push("/auth/Login")
  };

  return (
    // <Grid>
    //   <img src={logo.src} alt="" />
    // </Grid>
    <AppBar position="static" className="header-wrapper">
      <Toolbar disableGutters>
        <img src={logo.src} alt="" width={200} className="header-logo" style={{objectFit: "cover"}} />
        {isDesktop && (
          <Box sx={{ flexGrow: 1, textAlign: "end" }}>
            <Tooltip title="">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, cursor: "pointer", width: "20px", height: "24px" }}
              >
                <Avatar alt="Remy Sharp" src={imagePath ? imagePath : profileImg} sx={{objectFit: "cover"}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              className="header-drop-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography textAlign="center" onClick={handleLogout}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
        {!isDesktop && (
          <Box sx={{ flexGrow: 1, textAlign: "end" }}>
            <MobileSideMenu
              openSideMenu={openSideMenu}
              setOpenSideMenu={setOpenSideMenu}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
