"use client";

import { Container, Typography } from "@mui/material";

export default function SettingsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography color="text.secondary">
        Account and app preferences will appear here.
      </Typography>
    </Container>
  );
}
