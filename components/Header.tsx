"use client";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
export default function Header() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              sx={{
                flexGrow: 1,
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
              href="/"
            >
              Budget Tracker
            </Typography>
            <Button color="inherit">Login</Button>
            <Button LinkComponent={Link} href="/signup" color="inherit">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
