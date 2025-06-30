# White Fox Studios CRM - Codebase Documentation

## Project Overview
A Next.js 15 CRM application with Google Sheets integration for managing clients, projects, tasks, and reports.

## Technology Stack
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI + Custom Components
- **Data Source**: Google Sheets API
- **Authentication**: Custom JWT implementation
- **Charts**: Recharts
- **PDF Generation**: jsPDF

## Project Structure

### 📁 Core Directories

#### `/app` - Next.js App Router Pages
```
app/
├── api/                    # API Routes (Server-side)
├── client-portal/          # Client portal pages
├── clients/               # Client management pages
├── debug/                 # Debug utilities
├── files/                 # File management
├── invoices/              # Invoice management
├── login/                 # Authentication
├── marketing/             # Marketing dashboard
├── projects/              # Project management ⭐
├── reports/               # Report generation
├── schedule/              # Calendar/scheduling
├── seo/                   # SEO tools
├── settings/              # Application settings
├── tasks/                 # Task management
├── layout.tsx             # Root layout
└── page.tsx               # Dashboard homepage
```

#### `/components` - React Components
```
components/
├── ui/                    # Base UI components (49 files)
├── progress/              # Progress tracking components
├── project-stats.tsx     # Projects table component ⭐
├── dashboard-stats.tsx    # Dashboard statistics
├── recent-sales.tsx       # Recent sales widget
├── overview.tsx           # Charts and overview
└── [50+ other components]
```

#### `/context` - React Context Providers
```
context/
├── auth-context.tsx       # Authentication state
├── data-context.tsx       # Main data provider ⭐
└── progress-context.tsx   # Progress tracking
```

#### `/lib` - Utility Libraries
```
lib/
├── google-sheets-client.ts # Google Sheets utilities
├── utils.ts               # Common utilities
├── environment.ts         # Environment validation
└── [other utilities]
```

#### `/types` - TypeScript Type Definitions
```
types/
├── file.ts               # File types
├── invoice.ts            # Invoice types
└── report.ts             # Report types
```

## 🔄 Data Flow Architecture

### 1. Data Source: Google Sheets
- **Spreadsheet ID**: `1fe_MbyweSJpvvJVNWkFKog2YZLpE5S0J1LWU9SBveiQ`
- **Sheets**: Projects, Clients, Agents, Tasks
- **Authentication**: Service Account (JWT)

### 2. API Layer: `/app/api/google-sheets/route.ts`
```typescript
// Main API endpoint that fetches data from Google Sheets
GET /api/google-sheets?type=projects|clients|agents|tasks|all

// Current Response Structure:
{
  projects: [
    {
      id: string,           // Generated
      name: string,         // Column A (Business name)
      clientId: string,     // Column B (Client name)
      type: string,         // Column C (Project type)
      status: string,       // Column D (Status)
      startDate: string,    // Static "0"
      deadline: string,     // Column G (Deadline)
      description: string,  // Column E (Budget amount)
      budget: string        // Column H (Email)
    }
  ]
}
```

### 3. Data Context: `/context/data-context.tsx`
```typescript
// Main data provider that:
// 1. Fetches data from API on app load
// 2. Provides data to all components
// 3. Manages loading and error states

export type Project = {
  // Current fields in use
  id: string
  name: string
  clientId: string
  type: string
  status: string
  startDate: string
  deadline: string
  description?: string
  budget?: string
  
  // NEW FIELDS ADDED (not yet working)
  project: string
  client: string
  progress: string
  value: string
  email: string
  billingEmail: string
  phone: string
  website: string
}
```

### 4. UI Components
```typescript
// ProjectStats component renders the main projects table
// Location: /components/project-stats.tsx
// Used by: /app/projects/page.tsx

// Data flow:
useData() → projects[] → ProjectStats → Table rows
```

## 🚨 Current Issues & Problems

### Issue 1: API Changes Not Taking Effect
**Problem**: Despite modifying `/app/api/google-sheets/route.ts`, new fields don't appear in API responses.

**Investigation**:
- ✅ File contains correct new field structure
- ✅ Server restarts and cache clearing attempted
- ❌ API still returns old field structure
- ❌ `testField` and debug fields not appearing

**Possible Causes**:
1. **Build Cache**: Next.js aggressive caching
2. **TypeScript Compilation**: Build errors preventing updates
3. **Environment Issues**: Different API file being used
4. **Server Process**: Multiple server instances running

### Issue 2: Data Misalignment
**Problem**: Project data shows in wrong columns (emails in budget, names in wrong fields)

**Root Cause**: Google Sheets column mapping doesn't match expected structure

## 🔧 Troubleshooting Steps

### Step 1: Verify API File Changes
```bash
# Check if changes are in the file
grep -n "testField\|NEW FIELDS" app/api/google-sheets/route.ts

# Check file modification time
ls -la app/api/google-sheets/route.ts
```

### Step 2: Force Complete Rebuild
```bash
# Kill all processes
pkill -f "next"

# Clear all caches
rm -rf .next
rm -rf node_modules/.cache

# Restart
npm run dev
```

### Step 3: Test API Directly
```bash
# Test API response
curl "http://localhost:3000/api/google-sheets?type=projects" | jq '.projects[0]'
```

## 📋 Recommended Actions

### Phase 1: Fix API Issues
1. **Create New API Endpoint**: Test with completely new route
2. **Check TypeScript Compilation**: Look for build errors
3. **Verify Environment Variables**: Ensure Google Sheets access
4. **Debug Network Requests**: Check browser dev tools

### Phase 2: Data Structure Alignment
1. **Map Google Sheets Columns**: Document actual column structure
2. **Update Field Mapping**: Align API with Google Sheets reality
3. **Test Data Flow**: Verify end-to-end data display

### Phase 3: Code Organization
1. **Component Refactoring**: Break down large components
2. **Type Safety**: Improve TypeScript definitions
3. **Error Handling**: Add proper error boundaries
4. **Documentation**: Update inline documentation

## 🗂️ File Responsibilities

### Critical Files for Projects Feature

| File | Purpose | Status |
|------|---------|--------|
| `app/api/google-sheets/route.ts` | Main data API | ⚠️ Changes not working |
| `context/data-context.tsx` | Data provider | ✅ Working |
| `components/project-stats.tsx` | Projects table | ✅ Updated for new fields |
| `app/projects/page.tsx` | Projects page | ✅ Working |
| `types/` | Type definitions | ⚠️ Needs alignment |

### Component Dependencies

```
app/projects/page.tsx
└── components/project-stats.tsx
    └── context/data-context.tsx (useData hook)
        └── app/api/google-sheets/route.ts
            └── Google Sheets API
```

## 🌐 Environment Setup

### Required Environment Variables
```bash
# .env.local
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SPREADSHEET_ID=1fe_MbyweSJpvvJVNWkFKog2YZLpE5S0J1LWU9SBveiQ
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📊 Current Data Statistics
- **Total Files**: 163 TypeScript/JavaScript files
- **Components**: 96 (47 custom + 49 UI)
- **API Routes**: 10 endpoints
- **Pages**: 15 main routes
- **Google Sheets Data**: 114 projects loaded

## 🎯 Next Steps

1. **Immediate**: Fix API field addition issue
2. **Short-term**: Align data structure with Google Sheets
3. **Medium-term**: Improve code organization and documentation
4. **Long-term**: Add proper error handling and testing

---

*Last Updated: June 27, 2025*
*Status: API Changes Investigation Required* 