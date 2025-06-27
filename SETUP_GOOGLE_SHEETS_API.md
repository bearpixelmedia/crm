# 🔑 Setup Google Sheets API (NO MORE MOCK DATA!)

## 🚨 Current Issue
Your `.env.local` still has placeholder credentials:
```
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key_with_proper_line_breaks
```

**This is why you're still seeing mock data!** The API can't connect to your Google Sheet.

## ⚡ Quick Fix (5 minutes)

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google Sheets API**

### Step 2: Create Service Account
1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name it "CRM Sheets Access"
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

### Step 3: Generate Credentials
1. Click on your new service account
2. Go to **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Choose **JSON** format
5. Download the file

### Step 4: Update .env.local
Open the downloaded JSON file and copy:
```bash
# Replace these in your .env.local:
GOOGLE_CLIENT_EMAIL=the_email_from_json_file
GOOGLE_PRIVATE_KEY="the_private_key_from_json_file"
```

### Step 5: Share Your Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1fe_MbyweSJpvvJVNWkFKog2YZLpE5S0J1LWU9SBveiQ/edit
2. Click **Share**
3. Add the service account email (from step 4)
4. Give it **Editor** permissions

## 🎯 Test Connection

After updating `.env.local`:
```bash
# Restart your server
npm run dev

# Test the API
curl "http://localhost:3000/api/google-sheets?type=all"
```

## ✅ Result
- **No more mock data EVER**
- **Real data from your Google Sheet**
- **All APIs working with your actual data**

## 🔥 Alternative: Use Existing Credentials
If you already have Google Sheets API set up elsewhere, just copy those credentials to your `.env.local`!

**Once this is done, your CRM will be 100% real data powered!** 🚀 