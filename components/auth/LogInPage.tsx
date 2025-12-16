"use client";
import { useState } from "react";
import Header from "../Header";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";
export default function LogInPage() {
  const [query, setQuery] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query || !password) {
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      query,
      password,
    });
    if (res?.error) {
      console.error("Login failed:", res.error);
    }
    window.location.href = "/";
  };
  return (
    <div>
      <Header />
      <Box component="form" sx={{ mt: 8 }} onSubmit={onSubmit}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h5" align="center">
            Log In
          </Typography>
          <TextField
            fullWidth
            required
            label="Email or Username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
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
            Log In
          </Button>
          <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
            <GoogleIcon style={{ marginRight: 8 }} />
            Log In with Google
          </Button>
        </Container>
      </Box>
    </div>
  );
}
