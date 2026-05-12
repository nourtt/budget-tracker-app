"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "./Header";

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <List sx={{ px: 1, pt: 2 }}>
        <ListItemButton
          component={Link}
          href="/dashboard"
          selected={pathname === "/dashboard"}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          href="/dashboard/settings"
          selected={pathname === "/dashboard/settings"}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <SettingsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        onMenuClick={
          isMdUp ? undefined : () => setMobileOpen((open) => !open)
        }
      />
      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            minWidth: 0,
            bgcolor: "background.default",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
