import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AuthContext";
export default function NavBar() {
  const { logoutUser } = useGlobalContext();
    const user = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        
          <Typography variant="h6" onClick={()=>navigate('/')} component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          {user ? (
            <Button color="inherit" onClick={logoutUser}>
              {" "}
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
