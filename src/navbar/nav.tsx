import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router";
import ChatIcon from '@mui/icons-material/Chat';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Login } from "../components/Login";
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Navbar() {
  const { route } = useAuthenticator(context => [context.route]);
  const {user, signOut} = useAuthenticator((context) => [context.user]);  
  
  return route === 'authenticated' ? <NewNavbar />: <></>;  
}

function NewNavbar() {

  const {user, signOut} = useAuthenticator((context) => [context.user]);  

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        navigate("/user/profile")
      }}>User Profile</MenuItem>
      {/* <MenuItem onClick={
        signOut
       }>Logout</MenuItem> */}
      <MenuItem>
      <button onClick={signOut}>Sign out</button>
      {/* <p>Notifications</p> */}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 10 new notifications"
          color="inherit"
        >
          <Badge badgeContent={10} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/user/feed"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PixPlore
          </Typography>

          <Box sx={{ flexGrow: 1, textAlign: "center", display: "flex", marginLeft:"32%"}}>
          <Button><Typography
              variant="h6"
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
                fontWeight: "bold",
                color:"white"
              }}
              onClick={() => {
                navigate('/user/feed')
              }}
            >
              
              FEED
            </Typography></Button> 
            <span style={{ padding: "20px" }} />
            <Button> <Typography
              variant="h6"

              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
                fontWeight: "bold",
                color:"white"
              }}
              onClick={() => {
                navigate('/feed/posts')
              }}
            >
              EXPLORE
            </Typography></Button>
            </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Box>
            {/* {user.username} */}
          </Box>
          <Box>
            {/* <button onClick={signOut}>Sign out</button> */}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
