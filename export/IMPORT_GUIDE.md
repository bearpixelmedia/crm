# 📊 CSV Import Guide for White Fox Studios CRM

This guide will help you import the provided CSV files into your Google Sheets to populate your CRM system with sample data.

## 📁 Available CSV Files

1. **clients.csv** - Client information and contact details
2. **projects.csv** - Project details and client relationships
3. **agents.csv** - Team member information and specialties
4. **tasks.csv** - Task assignments and project tracking
5. **invoices.csv** - Billing and invoice management
6. **reports.csv** - Automated reporting system
7. **activities.csv** - Activity tracking and audit trail
8. **events.csv** - Calendar and scheduling system
9. **users.csv** - User authentication and roles

## 🚀 Step-by-Step Import Process

### Step 1: Prepare Your Google Sheet

1. **Create a new Google Sheet** or use your existing one
2. **Create 9 tabs** with these exact names:
   - `Clients`
   - `Projects`
   - `Agents`
   - `Tasks`
   - `Invoices`
   - `Reports`
   - `Activities`
   - `Events`
   - `Users`

### Step 2: Import Each CSV File

For each CSV file, follow these steps:

1. **Open the corresponding tab** in your Google Sheet
2. **Select cell A1** (top-left corner)
3. **Go to File → Import**
4. **Upload the CSV file** from the `export/` folder
5. **Choose these import settings:**
   - **Import location:** Replace data at selected cell
   - **Separator type:** Comma
   - **Convert text to numbers, dates, and formulas:** Yes
6. **Click "Import data"**

### Step 3: Verify Data Structure

After importing, ensure each tab has the correct column headers:

#### Clients Tab (A-G)
- A: ID
- B: Name
- C: Contact
- D: Email
- E: Phone
- F: Status
- G: Value

#### Projects Tab (A-I)
- A: ID
- B: Name
- C: ClientId
- D: Type
- E: Status
- F: StartDate
- G: Deadline
- H: Description
- I: Budget

#### Agents Tab (A-G)
- A: ID
- B: Name
- C: Email
- D: Phone
- E: Specialties
- F: Capacity
- G: CurrentWorkload

#### Tasks Tab (A-K)
- A: ID
- B: Title
- C: Description
- D: ProjectId
- E: AssignedAgentId
- F: Status
- G: Priority
- H: DueDate
- I: EstimatedHours
- J: ActualHours
- K: CreatedDate

#### Invoices Tab (A-L)
- A: ID
- B: Client ID
- C: Project ID
- D: Number
- E: Date
- F: Due Date
- G: Status
- H: Subtotal
- I: Tax
- J: Total
- K: Notes
- L: Items

#### Reports Tab (A-N)
- A: ID
- B: Name
- C: Type
- D: Description
- E: Created At
- F: Created By
- G: Frequency
- H: Last Generated
- I: Next Generation
- J: Status
- K: Recipients
- L: Client ID
- M: Project ID
- N: Template ID

#### Activities Tab (A-G)
- A: ID
- B: Type
- C: Action
- D: Subject
- E: User Name
- F: User Initials
- G: Timestamp

#### Events Tab (A-I)
- A: ID
- B: Title
- C: Start
- D: End
- E: Type
- F: Client
- G: Project
- H: Description
- I: All Day

#### Users Tab (A-G)
- A: ID
- B: Name
- C: Email
- D: Password Hash
- E: Role
- F: Avatar
- G: Status

## 🔗 Data Relationships

The sample data includes proper relationships between objects:

- **Clients** → **Projects** (via ClientId)
- **Projects** → **Tasks** (via ProjectId)
- **Projects** → **Invoices** (via Project ID)
- **Projects** → **Reports** (via Project ID)
- **Agents** → **Tasks** (via AssignedAgentId)
- **Clients** → **Invoices** (via Client ID)
- **Clients** → **Reports** (via Client ID)

## 🧪 Test Login Credentials

After importing, you can test the authentication system with these credentials:

### Admin Access
- **Email:** admin@whitefox.com
- **Password:** admin123

### Manager Access
- **Email:** manager@whitefox.com
- **Password:** manager123

### Agent Access
- **Email:** agent@whitefox.com
- **Password:** agent123

## ⚠️ Important Notes

1. **ID Formatting:** All IDs follow a specific format (CL001, PRJ001, etc.) - maintain this format when adding new records
2. **Date Format:** Use YYYY-MM-DD format for dates
3. **Currency:** Use $ symbol for monetary values
4. **JSON Data:** Invoice items are stored as JSON strings - don't modify the format
5. **Specialties:** Agent specialties are comma-separated values
6. **Recipients:** Report recipients are comma-separated email addresses

## 🔧 Troubleshooting

### Common Issues:

1. **Import Errors:** Ensure CSV files are saved with UTF-8 encoding
2. **Date Issues:** Check that dates are in YYYY-MM-DD format
3. **Relationship Errors:** Verify that referenced IDs exist in other tabs
4. **Special Characters:** Some fields contain quotes and special characters - import as-is

### Data Validation:

After import, verify:
- All tabs have the correct number of columns
- No empty required fields
- ID references are consistent across tabs
- Date formats are correct
- Currency values have $ symbols

## 📞 Support

If you encounter issues during import:
1. Check the column headers match exactly
2. Verify no extra spaces in tab names
3. Ensure CSV files are not corrupted
4. Try importing one tab at a time

---

**Ready to import?** Start with the `clients.csv` file and work through each tab systematically! 