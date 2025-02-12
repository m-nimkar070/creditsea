import React from "react";
import { useGetReportQuery } from "../features/creditApi";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid2,
  Card,
  CardContent,
} from "@mui/material";

// Component for Basic Details
const BasicDetails = ({ name, mobilePhone, pan, creditScore }) => (
  <Card
    sx={{ p: 2, borderLeft: "5px solid #1976d2", backgroundColor: "#f1f8ff" }}
  >
    <CardContent>
      <Typography variant="h5">Basic Details</Typography>
      <Grid2 container spacing={4} alignItems="flex-start" item xs={12} md={6} mt={2}>
        <Typography sx={{ fontWeight: "bold" }}>Name: {name}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>Mobile: {mobilePhone}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>PAN: {pan}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>Credit Score: {creditScore}</Typography>
      </Grid2>
    </CardContent>
  </Card>
);

// Component for Report Summary
const ReportSummary = ({
  totalAccounts,
  activeAccounts,
  closedAccounts,
  currentBalance,
  securedAmount,
  unsecuredAmount,
  last7DaysEnquiries,
}) => (
  <Card
    sx={{ p: 2, borderLeft: "5px solid #2e7d32", backgroundColor: "#e8f5e9" }}
  >
    <CardContent>
      <Typography variant="h5">Report Summary</Typography>
      <Grid2 container spacing={2} alignItems="flex-start" item xs={12} md={6} mt={2}>
        <Typography sx={{ fontWeight: "bold" }}>Total Accounts: {totalAccounts}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>Active Accounts: {activeAccounts}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>Closed Accounts: {closedAccounts}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>Current Balance: {currentBalance}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>Secured Amount: {securedAmount}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>Unsecured Amount: {unsecuredAmount}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>Last 7 Days Enquiries: {last7DaysEnquiries}</Typography>
      </Grid2>
    </CardContent>
  </Card>
);

// Component for Credit Accounts Table
const CreditAccountsTable = ({ creditCards }) => (
  <Box mt={3}>
    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
      Credit Accounts
    </Typography>
    <TableContainer
      component={Paper}
      sx={{ mt: 1, maxHeight: 300, overflowY: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Bank</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Account Number</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Amount Overdue</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Current Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {creditCards.map((card, index) => (
            <TableRow key={index} sx={{
                transition: "background-color 0.3s",
                '&:hover': { backgroundColor: "#e0f7fa" },
              }}>
              <TableCell>{card.bank}</TableCell>
              <TableCell>{card.accountNumber}</TableCell>
              <TableCell>{card.amountOverdue}</TableCell>
              <TableCell>{card.currentBalance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

// Main Report Component
const Report = () => {
  const { data: reportDatas, isLoading, isError } = useGetReportQuery();

  if (isLoading) return <Typography variant="body1">Loading...</Typography>;
  if (isError)
    return <Typography variant="body1">Error fetching report.</Typography>;

  return (
    <Box p={3}>
      {reportDatas?.map((reportData, index) => (
        <Box
          key={index}
          mb={4}
          p={2}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
            boxShadow: 2,
          }}
        >
          <Grid2 container spacing={2} alignItems="flex-start">
            <Grid2 item xs={12} md={6}>
              <BasicDetails {...reportData} />
            </Grid2>
            <Grid2 item xs={12} md={6}>
              <ReportSummary {...reportData} />
            </Grid2>
          </Grid2>
          <CreditAccountsTable creditCards={reportData.creditCards} />
        </Box>
      ))}
    </Box>
  );
};

export default Report;
