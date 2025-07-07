# 🚀 Next Steps: Complete CRM Setup

## 📋 Current Status
✅ CSV files created and ready for import  
✅ CRM application code complete  
✅ API routes implemented  
⏳ **Next: Configure Google Sheets API and import data**

## 🔧 Step 1: Google Sheets API Setup

### 1.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Sheets API**

### 1.2 Create Service Account
1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name it: `white-fox-crm-sheets`
4. Grant **Editor** role
5. Create and download the JSON key file

### 1.3 Share Your Google Sheet
1. Open your Google Sheet
2. Click **Share** button
3. Add your service account email (from JSON file)
4. Grant **Editor** access

## 🔐 Step 2: Environment Configuration

Create a `.env.local` file in your project root:

```bash
# Google Sheets API Configuration
SPREADSHEET_ID=your_google_sheet_id_here
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com

# JWT Secret for Authentication
JWT_SECRET=your-super-secret-jwt-key-here
```

### How to get these values:

#### SPREADSHEET_ID
- Open your Google Sheet
- Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

#### GOOGLE_SHEETS_PRIVATE_KEY
- From your downloaded JSON key file
- Copy the `private_key` value
- Keep the quotes and `\n` characters

#### GOOGLE_SHEETS_CLIENT_EMAIL
- From your downloaded JSON key file
- Copy the `client_email` value

#### JWT_SECRET
- Generate a random string: `openssl rand -base64 32`
- Or use any secure random string

## 📊 Step 3: Import Sample Data

### 3.1 Download and Extract
1. Download `white-fox-crm-data.zip` from the `export/` folder
2. Extract all CSV files

### 3.2 Import into Google Sheets
1. Open your Google Sheet
2. Create 9 tabs with these exact names:
   - `Clients`
   - `Projects`
   - `Agents`
   - `Tasks`
   - `Invoices`
   - `Reports`
   - `Activities`
   - `Events`
   - `Users`

3. For each tab:
   - Select cell A1
   - File → Import
   - Upload corresponding CSV file
   - Import settings: Replace data, Comma separator

## 🧪 Step 4: Test the System

### 4.1 Start Development Server
```bash
npm run dev
# or
pnpm dev
```

### 4.2 Test API Connection
1. Visit: `http://localhost:3000/debug`
2. Click "Test Connection" button
3. Should see success message with data

### 4.3 Test Authentication
Use these test credentials:
- **Admin:** admin@whitefox.com / admin123
- **Manager:** manager@whitefox.com / manager123
- **Agent:** agent@whitefox.com / agent123

## 🔍 Step 5: Verify All Features

### 5.1 Core Features
- [ ] **Dashboard** - View overview and metrics
- [ ] **Clients** - View, add, edit clients
- [ ] **Projects** - Manage project lifecycle
- [ ] **Tasks** - Assign and track tasks
- [ ] **Agents** - Team management
- [ ] **Invoices** - Billing system
- [ ] **Reports** - Automated reporting
- [ ] **Calendar** - Event scheduling
- [ ] **Files** - Document management

### 5.2 Advanced Features
- [ ] **Activity Log** - Track all changes
- [ ] **User Management** - Role-based access
- [ ] **Real-time Updates** - Live data sync
- [ ] **Search & Filter** - Find data quickly
- [ ] **Export/Import** - Data portability

## 🚨 Troubleshooting

### Common Issues:

#### API Connection Fails
- Check service account permissions
- Verify spreadsheet ID is correct
- Ensure Google Sheets API is enabled

#### Import Errors
- Check CSV file encoding (UTF-8)
- Verify tab names match exactly
- Ensure no extra spaces in headers

#### Authentication Issues
- Check JWT_SECRET is set
- Verify user data imported correctly
- Check password hashes in users tab

#### Data Not Loading
- Check browser console for errors
- Verify API routes are working
- Test individual data types in debug page

## 📞 Support Resources

### Documentation
- `IMPORT_GUIDE.md` - Detailed import instructions
- `GOOGLE_SHEETS_SETUP.md` - API setup guide
- `USE_YOUR_EXISTING_SHEET.md` - Using existing data

### Debug Tools
- `/debug` - Test API connections
- `/api/check-env` - Verify environment variables
- `/api/test-connection` - Test Google Sheets connection

## 🎯 Success Criteria

Your CRM is fully operational when:
- ✅ All CSV data imported successfully
- ✅ API connection working
- ✅ Authentication system functional
- ✅ All pages loading with real data
- ✅ CRUD operations working
- ✅ Relationships between objects maintained

---

**Ready to proceed?** Start with Step 1 (Google Sheets API setup) and work through each step systematically! 