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
import { signOut, useSession } from "next-auth/react";
export default function Header() {
  const { data: session } = useSession();
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
