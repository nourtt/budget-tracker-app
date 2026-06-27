"use client";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open navigation menu"
              sx={{ mr: 1 }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={() => setOpen(false)}>
              <Box sx={{ width: 250 }}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/dashboard">
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/settings">
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
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
            {session ? (
              <>
                <Typography sx={{ mr: 2 }}>{session.user?.name}</Typography>
                <Button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  color="inherit"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} href="/login" color="inherit">
                  Log In
                </Button>
                <Button component={Link} href="/signup" color="inherit">
                  Sign Up
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
