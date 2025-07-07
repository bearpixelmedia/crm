# Component Mapping & Architecture

## 🏗️ Component Hierarchy

### Dashboard Page (`/`)
```
app/page.tsx
├── MainNav
├── Search
├── UserNav
├── CalendarDateRangePicker
├── Tabs (Overview, Clients, Projects, Marketing)
│   ├── TabsContent: Overview
│   │   ├── DashboardStats (4 stat cards)
│   │   ├── Overview (Charts)
│   │   └── RecentSales
│   ├── TabsContent: Clients
│   │   └── ClientStats
│   ├── TabsContent: Projects
│   │   └── ProjectStats ⭐
│   └── TabsContent: Marketing
│       └── MarketingStats
```

### Projects Page (`/projects`)
```
app/projects/page.tsx
├── MainNav
├── Search
├── UserNav
└── ProjectStats ⭐ (Main component)
    ├── Search Input
    ├── Status Filter
    └── Table
        ├── TableHeader (Project, Client, Type, Status, Progress, Deadline, Budget, Email, Phone)
        └── TableBody
            └── TableRow (for each project)
                ├── Project Name + Budget
                ├── Client Name
                ├── Type
                ├── Status Badge
                ├── Progress Bar
                ├── Deadline
                ├── Budget
                ├── Email (with billing email)
                ├── Phone
                └── Actions Dropdown
```

## 📊 Data Flow Components

### Core Data Components

#### 1. `context/data-context.tsx` - Data Provider
```typescript
// Central data management
- Fetches from /api/google-sheets
- Provides: projects[], clients[], agents[], tasks[]
- Manages: isLoading, error states
- Used by: All data-consuming components
```

#### 2. `components/project-stats.tsx` - Projects Table
```typescript
// Main projects display component
- Uses: useData() hook
- Features: Search, filter, pagination
- Displays: Full project information
- Status: ✅ Updated for new fields (but API not working)
```

#### 3. `components/dashboard-stats.tsx` - Dashboard Cards
```typescript
// Dashboard statistics cards
- Uses: useData() hook
- Calculates: Total projects, revenue, clients, completion rate
- Status: ✅ Working with real data
```

#### 4. `components/recent-sales.tsx` - Recent Sales Widget
```typescript
// Recent project revenue display
- Uses: useData() hook
- Shows: Latest 5 projects with revenue
- Status: ✅ Working with real data
```

#### 5. `components/overview.tsx` - Charts
```typescript
// Revenue charts and graphs
- Uses: useData() hook
- Charts: Monthly revenue, project trends
- Status: ✅ Working with real data
```

## 🔌 API Integration Components

### API Routes Structure
```
app/api/
├── google-sheets/
│   ├── route.ts           # Main data endpoint ⭐
│   └── write/
│       └── route.ts       # Write data back to sheets
├── activities/route.ts    # Activity logging
├── auth/login/route.ts    # Authentication
├── check-env/route.ts     # Environment validation
├── events/route.ts        # Calendar events
├── invoices/
│   ├── route.ts           # Invoice CRUD
│   └── [id]/route.ts      # Individual invoice
├── progress/route.ts      # Progress tracking
├── reports/
│   ├── route.ts           # Report generation
│   └── [id]/route.ts      # Individual report
└── test-connection/route.ts # Connection testing
```

## 🎨 UI Component Library

### Base Components (`components/ui/`)
```
Radix UI Components (49 files):
├── accordion.tsx          # Collapsible sections
├── alert-dialog.tsx       # Modal dialogs
├── avatar.tsx             # User avatars
├── badge.tsx              # Status badges
├── button.tsx             # Buttons (primary, secondary, etc.)
├── calendar.tsx           # Date picker
├── card.tsx               # Content containers
├── chart.tsx              # Chart components
├── checkbox.tsx           # Form checkboxes
├── dialog.tsx             # Modal windows
├── dropdown-menu.tsx      # Context menus
├── form.tsx               # Form components
├── input.tsx              # Text inputs
├── label.tsx              # Form labels
├── popover.tsx            # Popup content
├── progress.tsx           # Progress bars
├── select.tsx             # Dropdown selects
├── table.tsx              # Data tables ⭐
├── tabs.tsx               # Tab navigation
├── textarea.tsx           # Multi-line text
├── toast.tsx              # Notifications
└── [29 more components]
```

### Custom Business Components
```
components/
├── client-analytics.tsx      # Client performance metrics
├── client-detail.tsx         # Individual client view
├── client-form.tsx          # Client creation/editing
├── client-stats.tsx         # Client dashboard widget
├── dashboard-stats.tsx      # Main dashboard cards ⭐
├── date-range-picker.tsx    # Date selection
├── file-browser.tsx         # File management
├── invoice-editor.tsx       # Invoice creation
├── invoice-list.tsx         # Invoice table
├── main-nav.tsx            # Main navigation
├── overview.tsx            # Dashboard charts ⭐
├── project-form.tsx        # Project creation/editing
├── project-stats.tsx      # Projects table ⭐
├── recent-activity.tsx     # Activity feed
├── recent-sales.tsx       # Sales widget ⭐
├── report-builder.tsx     # Report generation
├── search.tsx             # Global search
├── user-nav.tsx           # User menu
└── [30+ more components]
```

## 🔄 Component State Management

### Context Providers
```
app/layout.tsx
├── AuthProvider           # Authentication state
├── DataProvider          # Main data state ⭐
└── ProgressProvider      # Progress tracking
    └── All child components have access to:
        ├── useData() → projects, clients, agents, tasks
        ├── useAuth() → user, login, logout
        └── useProgress() → progress tracking
```

### Data Flow Pattern
```
1. App loads → DataProvider initializes
2. DataProvider calls /api/google-sheets
3. API fetches from Google Sheets
4. Data stored in context state
5. Components use useData() hook
6. Components render with real data
```

## 🚨 Problem Areas

### 1. Project Stats Component (`components/project-stats.tsx`)
**Status**: ✅ Updated but API not providing new fields

**Current Implementation**:
```typescript
// Uses new field structure
const projectName = project.project || project.name || "Unnamed Project"
const clientName = getClientName(project)
const formattedBudget = project.value || project.budget || "Not set"

// Table columns: Project, Client, Type, Status, Progress, Deadline, Budget, Email, Phone
```

**Issue**: API still returns old field structure, so new fields show as undefined

### 2. API Route (`app/api/google-sheets/route.ts`)
**Status**: ⚠️ Changes not taking effect

**Expected Response**:
```json
{
  "id": "PRJ123",
  "project": "Business Name",
  "client": "Client Name", 
  "type": "Website Build",
  "status": "In Progress",
  "progress": "50%",
  "deadline": "12/31/2024",
  "value": "$5000",
  "email": "contact@business.com",
  "billingEmail": "billing@business.com",
  "phone": "555-123-4567",
  "website": "https://business.com",
  "testField": "CHANGES_WORKING"
}
```

**Actual Response**:
```json
{
  "id": "PRJ123",
  "name": "Business Name",
  "clientId": "Client Name",
  "type": "Website Build", 
  "status": "In Progress",
  "startDate": "0",
  "deadline": "12/31/2024",
  "description": "$5000",
  "budget": "contact@business.com"
}
```

## 🔧 Component Dependencies

### High-Priority Components (Projects Feature)
```
1. app/api/google-sheets/route.ts     # CRITICAL - Data source
2. context/data-context.tsx           # CRITICAL - Data provider  
3. components/project-stats.tsx       # HIGH - Main display
4. app/projects/page.tsx              # MEDIUM - Page wrapper
5. components/ui/table.tsx            # LOW - UI component
```

### Component Coupling
```
Tightly Coupled:
- ProjectStats ↔ useData hook
- DashboardStats ↔ useData hook  
- RecentSales ↔ useData hook

Loosely Coupled:
- UI components (reusable)
- Navigation components
- Layout components
```

## 📋 Action Items

### Immediate (API Fix)
1. ✅ Document current structure
2. 🔄 Debug API route compilation
3. ⏳ Test with new endpoint
4. ⏳ Verify TypeScript compilation

### Short-term (Data Alignment)  
1. ⏳ Map Google Sheets actual structure
2. ⏳ Update column mappings
3. ⏳ Test end-to-end data flow
4. ⏳ Update component field usage

### Long-term (Organization)
1. ⏳ Break down large components
2. ⏳ Improve error handling
3. ⏳ Add loading states
4. ⏳ Implement proper TypeScript types

---

*Component Count: 96 total (47 custom + 49 UI)*
*Last Updated: June 27, 2025* 