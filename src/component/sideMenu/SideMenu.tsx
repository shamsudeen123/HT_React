import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Link,
} from "@mui/material";
import profileImg from "../../assets/images/profile.svg";
import listIcon from "../../assets/images/list-icon.svg";
import { usePathname, useRouter } from "next/navigation";
import Dashboard from "@/app/dashboard/Dashboard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function SideMenu() {
  const pathName = usePathname();
  const router = useRouter();
  const [indexValue, setIndexValue] = useState(0);
  const userDetails = useSelector((state:any) => state?.attendanceSystem?.login?.data?.data);
  const imagePath =
    typeof window !== "undefined" ? localStorage.getItem("profileImg") : "";
    const role: any =
    typeof window !== "undefined" ? localStorage.getItem("role") : "";
    const dealerName =
    typeof window !== "undefined" ? localStorage.getItem("dealerName") : "";
  const menuList = parseInt(role) === 0 ? [
    "Ticket Management",
    "User Management",
  ] : [
    "Ticket Management",
  ];
  const handleListItem = (item: any) => {
    // Handle item click here
  };
  useEffect(() => {
    switch (pathName) {
      case "/Ticket Management":
        setIndexValue(0);
        return router.push("/dashboard");
      case "/userManagement":
        setIndexValue(1);
        return router.push("/userManagement");
      default:
        break;
    }
  }, []);
  //sidebar list navigation
  const handleListNavigation = (navItem: any, index: any) => {
    switch (navItem) {
      case "Ticket Management":
        setIndexValue(index);
        return router.push("/dashboard");
      case "User Management":
        setIndexValue(index);
        return router.push("/userManagement");
      default:
        break;
    }
  };

  
  return (
    <Grid className="side-menu-wrapper">
      <Grid className="profile-details">
        <Avatar alt="Remy Sharp" src={imagePath  ? imagePath : profileImg} style={{objectFit: "contain"}} />
        <Grid>
          <Typography variant="h6">{dealerName}</Typography>
          <Typography variant="body1">{parseInt(role) === 0 ? "Admin" : parseInt(role) === 1 ? "Dealer" : "Sales Person"}</Typography>
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
    </Grid>
  );
}
