const Credit = require('../models/Credit');
const fs = require('fs');
const xml2js = require('xml2js');

// Upload and parse XML file
exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  const parser = new xml2js.Parser();

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file.');

    parser.parseString(data, (err, result) => {
      if (err) return res.status(500).send('Error parsing XML.');

      
      // Extract data from the XML structure
      const creditData = result.INProfileResponse;
      
      if (!creditData) {
          return res.status(400).send('Invalid XML structure: INProfileResponse missing.');
        }
        
        // Extract basic details
        const currentApplication = creditData.Current_Application?.[0]?.Current_Application_Details?.[0];
        const currentApplicant = currentApplication?.Current_Applicant_Details?.[0];
        
        // Extract CAIS summary
        const caisSummary = creditData.CAIS_Account?.[0]?.CAIS_Summary?.[0];
        const creditAccount = caisSummary?.Credit_Account?.[0];
        const totalOutstandingBalance = caisSummary?.Total_Outstanding_Balance?.[0];
        
        // Extract credit accounts
        const caisAccounts = creditData.CAIS_Account?.[0]?.CAIS_Account_DETAILS || [];
        
        // Extract score
        const bureauScore = creditData.SCORE?.[0]?.BureauScore?.[0];
        
      // Prepare the data for MongoDB
      const credit = new Credit({
        name: currentApplicant?.First_Name?.[0] + ' ' + currentApplicant?.Last_Name?.[0],
        mobilePhone: currentApplicant?.MobilePhoneNumber?.[0] || 'N/A',
        pan: currentApplicant?.IncomeTaxPan?.[0] || caisAccounts?.[0].CAIS_Holder_Details?.[0]?.Income_TAX_PAN?.[0] || 'N/A',
        creditScore: bureauScore ? parseInt(bureauScore) : 0,
        totalAccounts: creditAccount?.CreditAccountTotal?.[0] ? parseInt(creditAccount.CreditAccountTotal[0]) : 0,
        activeAccounts: creditAccount?.CreditAccountActive?.[0] ? parseInt(creditAccount.CreditAccountActive[0]) : 0,
        closedAccounts: creditAccount?.CreditAccountClosed?.[0] ? parseInt(creditAccount.CreditAccountClosed[0]) : 0,
        currentBalance: totalOutstandingBalance?.Outstanding_Balance_All?.[0] ? parseFloat(totalOutstandingBalance.Outstanding_Balance_All[0]) : 0,
        securedAmount: totalOutstandingBalance?.Outstanding_Balance_Secured?.[0] ? parseFloat(totalOutstandingBalance.Outstanding_Balance_Secured[0]) : 0,
        unsecuredAmount: totalOutstandingBalance?.Outstanding_Balance_UnSecured?.[0] ? parseFloat(totalOutstandingBalance.Outstanding_Balance_UnSecured[0]) : 0,
        last7DaysEnquiries: creditData.TotalCAPS_Summary?.[0]?.TotalCAPSLast7Days?.[0] ? parseInt(creditData.TotalCAPS_Summary[0].TotalCAPSLast7Days[0]) : 0,
        creditCards: caisAccounts.map(account => ({
          bank: account.Subscriber_Name?.[0] || 'N/A',
          address: account.CAIS_Holder_Address_Details?.[0]?.First_Line_Of_Address_non_normalized?.[0] || 'N/A',
          accountNumber: account.Account_Number?.[0] || 'N/A',
          amountOverdue: account.Amount_Past_Due?.[0] ? parseFloat(account.Amount_Past_Due[0]) : 0,
          currentBalance: account.Current_Balance?.[0] ? parseFloat(account.Current_Balance[0]) : 0
        }))
      });

      // Save the data to MongoDB
      credit.save()
        .then(() => res.send('Data saved to MongoDB.'))
        .catch(err => res.status(500).send('Error saving data to MongoDB.'));
    });
  });
};

// Fetch all reports
exports.getReport = async (req, res) => {
  try {
    const data = await Credit.find();
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching data.');
  }
};