"use client";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { update } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await fetch("/api/settings", {
      method: "PUT",
      body: JSON.stringify({ username, password }),
    });
    console.log(res.status);

    console.log(await res.json());
    if (!res.ok) {
      const data = await res.json();
      console.error(data.error || "An unexpected error occurred");
      return;
    }
    await update();
    window.location.href = "/dashboard";
  };
  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          onSubmit={onSubmit}
        >
          <Typography variant="h5" gutterBottom>
            Settings
          </Typography>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update data
          </Button>
        </Box>
      </Container>
    </div>
  );
}
