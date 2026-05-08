"use client";

import {
  Box,
  Button,
  Container,
  Dialog,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { categoryList } from "../lib/constants/category";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("INCOME");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        type,
        category,
        date: date?.toISOString(),
        note,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "An unexpected error occurred");
      return;
    }
    setOpen(false);
    setAmount("");
    setType("INCOME");
    setCategory("Other");
    setDate(dayjs());
    setNote("");
  };
  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Current Balance:
          </Typography>
          <Typography variant="h4" gutterBottom>
            $0.00
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add Transaction
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{ p: 4, minWidth: 300 }}
            >
              <Typography variant="h6" gutterBottom>
                Add New Transaction
              </Typography>
              <TextField
                fullWidth
                required
                label="Amount"
                value={amount}
                type="number"
                margin="normal"
                onChange={(e) => setAmount(e.target.value)}
              />
              <TextField
                fullWidth
                required
                select
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                margin="normal"
              >
                <MenuItem value="INCOME">Income</MenuItem>
                <MenuItem value="EXPENSE">Expense</MenuItem>
              </TextField>
              <TextField
                fullWidth
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                margin="normal"
              >
                {categoryList.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
              <TextField
                fullWidth
                label="Note"
                margin="normal"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </Box>
          </Dialog>
        </Box>
      </Container>
    </div>
  );
}
