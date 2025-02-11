import React from 'react';
import { useGetReportQuery } from '../features/creditApi';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Report() {
  const { data: reportData, isLoading, isError } = useGetReportQuery();

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="body1">Error fetching report.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Credit Report
      </Typography>
      <Typography variant="h6">Basic Details</Typography>
      <Typography>Name: {reportData.name}</Typography>
      <Typography>Mobile: {reportData.mobilePhone}</Typography>
      <Typography>PAN: {reportData.pan}</Typography>
      <Typography>Credit Score: {reportData.creditScore}</Typography>

      <Typography variant="h6" style={{ marginTop: '20px' }}>Report Summary</Typography>
      <Typography>Total Accounts: {reportData.totalAccounts}</Typography>
      <Typography>Active Accounts: {reportData.activeAccounts}</Typography>
      <Typography>Closed Accounts: {reportData.closedAccounts}</Typography>
      <Typography>Current Balance: {reportData.currentBalance}</Typography>
      <Typography>Secured Amount: {reportData.securedAmount}</Typography>
      <Typography>Unsecured Amount: {reportData.unsecuredAmount}</Typography>
      <Typography>Last 7 Days Enquiries: {reportData.last7DaysEnquiries}</Typography>

      <Typography variant="h6" style={{ marginTop: '20px' }}>Credit Accounts</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bank</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Amount Overdue</TableCell>
              <TableCell>Current Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.creditCards.map((card, index) => (
              <TableRow key={index}>
                <TableCell>{card.bank}</TableCell>
                <TableCell>{card.accountNumber}</TableCell>
                <TableCell>{card.amountOverdue}</TableCell>
                <TableCell>{card.currentBalance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Report;