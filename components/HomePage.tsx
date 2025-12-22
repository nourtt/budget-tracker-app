"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Header from "./Header";
export default function HomePage() {
  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Track your money.
            <br />
            Control your future.
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            A simple budget tracker to help you understand where your money goes
            and make better decisions — without complexity.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" component={Link} href="/signup">
              Get Started
            </Button>
            <Button variant="outlined" component={Link} href="/login">
              Log In
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 6 }}>
          <Typography variant="h5" gutterBottom>
            Why use this app?
          </Typography>

          <Typography>
            • Track income and expenses in one place
            <br />
            • Understand your spending habits
            <br />• Stay in control without spreadsheets
          </Typography>
        </Box>

        <Box sx={{ py: 6 }}>
          <Typography variant="h5" gutterBottom>
            What you can do
          </Typography>

          <Typography>
            ✔ Add income and expenses
            <br />
            ✔ Categorize transactions
            <br />
            ✔ See monthly summaries
            <br />✔ Track your balance
          </Typography>
        </Box>

        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Start tracking your budget today
          </Typography>

          <Button variant="contained" component={Link} href="/signup">
            Create an account
          </Button>
        </Box>
      </Container>
    </div>
  );
}
