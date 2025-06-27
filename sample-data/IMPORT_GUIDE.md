# 📊 CSV Import Guide

## Quick Setup Instructions

### 1. Create New Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "CRM Data" or similar

### 2. Import Each CSV File as a New Sheet

For each CSV file in this folder, follow these steps:

1. **Right-click** on the sheet tabs at bottom
2. Select **"Insert sheet"**
3. Name the sheet exactly as shown below:
   - `clients.csv` → **"Clients"**
   - `projects.csv` → **"Projects"**
   - `agents.csv` → **"Agents"**
   - `tasks.csv` → **"Tasks"**
   - `invoices.csv` → **"Invoices"**
   - `reports.csv` → **"Reports"**
   - `activities.csv` → **"Activities"**
   - `events.csv` → **"Events"**
   - `users.csv` → **"Users"**

4. **Import the CSV data:**
   - Select all content from the CSV file (Ctrl/Cmd+A)
   - Copy it (Ctrl/Cmd+C)
   - Paste into the Google Sheet (Ctrl/Cmd+V)
   - Google Sheets will auto-detect the format

### 3. Quick Import Method (Alternative)
1. Open Google Sheets
2. Go to **File → Import**
3. Upload each CSV file
4. Choose **"Insert new sheet(s)"**
5. Rename each sheet to match the required names above

### 4. Test Login Credentials
Use these credentials to test your authentication:
- **Admin**: admin@whitefox.com / admin123
- **Manager**: carol@whitefox.com / manager123
- **Agent**: alice@whitefox.com / agent123

### 5. Update Your Environment Variables
Copy your Google Spreadsheet ID from the URL and update your `.env.local`:
```
SPREADSHEET_ID=your_spreadsheet_id_from_url
```

## 📋 What's Included

- **5 Clients** - Mix of active, inactive, and prospect
- **6 Projects** - Various types and statuses
- **6 Agents** - Different specialties and workloads
- **8 Tasks** - Realistic task distribution
- **5 Invoices** - Different statuses (paid, pending, draft, overdue)
- **5 Reports** - Various report types and frequencies
- **10 Activities** - Recent user activities
- **8 Events** - Calendar events and meetings
- **7 Users** - Authentication accounts

## 🎯 Ready to Test!

Once imported, your CRM will have realistic data to test:
- Client management
- Project tracking
- Task assignment
- Invoice generation
- Report scheduling
- Activity logging
- Calendar events
- User authentication

**Total setup time: ~5 minutes** ⚡ 