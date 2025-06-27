# Google Sheets Setup Guide

This document outlines the required Google Sheets structure for your CRM to work with real data.

## Required Spreadsheet Tabs

### 1. Clients Tab
**Tab Name:** `Clients`
**Columns (A-G):**
- A: ID (e.g., CL001, CL002, ...)
- B: Name (Company Name)
- C: Contact (Contact Person)
- D: Email
- E: Phone
- F: Status (Active, Inactive, Prospect)
- G: Value (e.g., $15,000)

### 2. Projects Tab
**Tab Name:** `Projects`
**Columns (A-I):**
- A: ID (e.g., PRJ001, PRJ002, ...)
- B: Name (Project Name)
- C: Client ID (Reference to Clients.ID)
- D: Type (Website Build, Maintenance, SEO, Marketing, A la carte, Other)
- E: Status (In Progress, Completed, Ongoing, Canceled, Not Started)
- F: Start Date (YYYY-MM-DD)
- G: Deadline (YYYY-MM-DD)
- H: Description
- I: Budget (e.g., $5,000)

### 3. Agents Tab
**Tab Name:** `Agents`
**Columns (A-G):**
- A: ID (e.g., AGT001, AGT002, ...)
- B: Name
- C: Email
- D: Phone
- E: Specialties (comma-separated, e.g., "SEO,Content Marketing")
- F: Capacity (hours per week, e.g., 40)
- G: Current Workload (hours used, e.g., 25)

### 4. Tasks Tab
**Tab Name:** `Tasks`
**Columns (A-K):**
- A: ID (e.g., TSK001, TSK002, ...)
- B: Title
- C: Description
- D: Project ID (Reference to Projects.ID)
- E: Assigned Agent ID (Reference to Agents.ID)
- F: Status (To Do, In Progress, Review, Completed, Blocked)
- G: Priority (Low, Medium, High, Critical)
- H: Due Date (YYYY-MM-DD)
- I: Estimated Hours
- J: Actual Hours
- K: Created Date (YYYY-MM-DD)

### 5. Invoices Tab
**Tab Name:** `Invoices`
**Columns (A-L):**
- A: ID (e.g., INV001, INV002, ...)
- B: Client ID (Reference to Clients.ID)
- C: Project ID (Reference to Projects.ID)
- D: Number (e.g., INV-2023-001)
- E: Date (YYYY-MM-DD)
- F: Due Date (YYYY-MM-DD)
- G: Status (draft, pending, paid, overdue)
- H: Subtotal (numeric, e.g., 1000)
- I: Tax (numeric, e.g., 100)
- J: Total (numeric, e.g., 1100)
- K: Notes
- L: Items (JSON string, e.g., '[{"id":"item1","description":"SEO Audit","quantity":1,"rate":500,"amount":500}]')

### 6. Reports Tab
**Tab Name:** `Reports`
**Columns (A-N):**
- A: ID (e.g., RPT001, RPT002, ...)
- B: Name
- C: Type (seo, marketing, client, project, financial)
- D: Description
- E: Created At (ISO Date String)
- F: Created By
- G: Frequency (monthly, weekly, quarterly)
- H: Last Generated (ISO Date String)
- I: Next Generation (ISO Date String)
- J: Status (draft, scheduled, generated, delivered)
- K: Recipients (comma-separated emails)
- L: Client ID (Reference to Clients.ID)
- M: Project ID (Reference to Projects.ID)
- N: Template ID

### 7. Activities Tab
**Tab Name:** `Activities`
**Columns (A-G):**
- A: ID (e.g., ACT001, ACT002, ...)
- B: Type (client, project, task, comment, general)
- C: Action (created, updated, completed, deleted)
- D: Subject (what was acted upon)
- E: User Name
- F: User Initials
- G: Timestamp (ISO Date String)

### 8. Events Tab
**Tab Name:** `Events`
**Columns (A-I):**
- A: ID (e.g., EVT001, EVT002, ...)
- B: Title
- C: Start (ISO Date String)
- D: End (ISO Date String)
- E: Type (meeting, task, reminder)
- F: Client
- G: Project
- H: Description
- I: All Day (true/false)

### 9. Users Tab
**Tab Name:** `Users`
**Columns (A-G):**
- A: ID (e.g., USR001, USR002, ...)
- B: Name
- C: Email
- D: Password Hash (use bcrypt for production)
- E: Role (admin, manager, agent)
- F: Avatar (URL or filename)
- G: Status (active, inactive)

## Sample Data

### Sample Users (for testing login)
```
USR001 | Admin User | admin@whitefox.com | admin123 | admin | /avatar1.png | active
USR002 | Manager User | manager@whitefox.com | manager123 | manager | /avatar2.png | active
USR003 | Agent User | agent@whitefox.com | agent123 | agent | /avatar3.png | active
```

### Sample Clients
```
CL001 | Acme Corporation | John Smith | john@acmecorp.com | (555) 123-4567 | Active | $15,000
CL002 | TechNova Solutions | Sarah Johnson | sarah@technova.com | (555) 234-5678 | Active | $12,500
```

### Sample Projects
```
PRJ001 | Website Redesign | CL001 | Website Build | In Progress | 2023-06-15 | 2023-09-30 | Complete redesign of corporate website | $10,000
PRJ002 | SEO Campaign | CL002 | SEO | In Progress | 2023-07-01 | 2023-10-15 | Comprehensive SEO optimization | $5,000
```

## Environment Variables

Make sure these are set in your `.env.local`:
```
SPREADSHEET_ID=your_actual_spreadsheet_id_here
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key_with_proper_line_breaks
JWT_SECRET=your_super_secure_random_string_here
```

## Setup Steps

1. Create a new Google Spreadsheet
2. Create all the tabs listed above
3. Add the column headers as specified
4. Add some sample data to test
5. Set up Google Sheets API access (service account)
6. Configure environment variables
7. Test the connection via `/debug` page

## Notes

- All dates should be in ISO format or YYYY-MM-DD
- JSON fields (like invoice items) should be valid JSON strings
- For production, always use hashed passwords (bcrypt)
- IDs can be auto-generated by the API if left empty
- Make sure your service account has edit permissions on the spreadsheet 