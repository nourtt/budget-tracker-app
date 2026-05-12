"use client";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  expenseCategoryList,
  incomeCategoryList,
} from "../lib/constants/category";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

type TransactionRow = {
  id: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  note: string | null;
  createdAt: string;
  category: { name: string } | null;
};

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("INCOME");
  const [category, setCategory] = useState<string>(incomeCategoryList[0]);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<TransactionRow[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");

  const loadHistory = useCallback(async () => {
    setHistoryError("");
    const res = await fetch("/api/transactions");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setHistoryError(data.error || "Could not load history");
      setHistory([]);
      return;
    }
    const data = (await res.json()) as TransactionRow[];
    setHistory(data);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setHistoryLoading(true);
      await loadHistory();
      if (!cancelled) setHistoryLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [loadHistory]);

  const balanceLabel = useMemo(() => {
    const total = history.reduce((acc, row) => {
      return acc + (row.type === "INCOME" ? row.amount : -row.amount);
    }, 0);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total);
  }, [history]);

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
    setCategory(incomeCategoryList[0]);
    setDate(dayjs());
    setNote("");
    await loadHistory();
  };
  return (
    <div>
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
          {historyLoading ? (
            <Box
              sx={{
                minHeight: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <CircularProgress size={32} />
            </Box>
          ) : historyError ? (
            <Typography variant="h6" color="text.secondary" gutterBottom>
              —
            </Typography>
          ) : (
            <Typography variant="h4" gutterBottom>
              {balanceLabel}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add Transaction
          </Button>

          <Box sx={{ width: "100%", maxWidth: 560, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              History
            </Typography>
            {historyLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <CircularProgress size={28} />
              </Box>
            ) : historyError ? (
              <Typography color="error" variant="body2">
                {historyError}
              </Typography>
            ) : history.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No transactions yet.
              </Typography>
            ) : (
              <List dense disablePadding sx={{ bgcolor: "background.paper" }}>
                {history.map((row, index) => (
                  <Box key={row.id}>
                    {index > 0 ? <Divider component="li" /> : null}
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 2,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography component="span" variant="body1">
                              {row.category?.name ?? "Uncategorized"}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body1"
                              fontWeight={600}
                              color={
                                row.type === "INCOME"
                                  ? "success.main"
                                  : "error.main"
                              }
                            >
                              {row.type === "INCOME" ? "+" : "-"}$
                              {row.amount.toFixed(2)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              {dayjs(row.createdAt).format("MMM D, YYYY")} ·{" "}
                              {row.type === "INCOME" ? "Income" : "Expense"}
                            </Typography>
                            {row.note ? (
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                              >
                                {row.note}
                              </Typography>
                            ) : null}
                          </>
                        }
                      />
                    </ListItem>
                  </Box>
                ))}
              </List>
            )}
          </Box>

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
                onChange={(e) => {
                  const nextType = e.target.value as "INCOME" | "EXPENSE";
                  setType(nextType);
                  const allowed =
                    nextType === "INCOME"
                      ? incomeCategoryList
                      : expenseCategoryList;
                  setCategory((prev) =>
                    (allowed as readonly string[]).includes(prev)
                      ? prev
                      : allowed[0],
                  );
                }}
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
                {(type === "INCOME"
                  ? incomeCategoryList
                  : expenseCategoryList
                ).map((cat) => (
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
              {error ? (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              ) : null}
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2, mr: 2 }}
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Add Transaction
              </Button>
            </Box>
          </Dialog>
        </Box>
      </Container>
    </div>
  );
}
