# API Debug Guide - Fix New Fields Issue

## 🚨 Problem Summary
**Issue**: API route changes not taking effect despite file modifications
**Impact**: New fields (email, phone, etc.) not appearing in `/api/google-sheets` response
**Status**: CRITICAL - Blocking new field implementation

## 🔍 Investigation Steps

### Step 1: Verify File Changes
```bash
# Check if our changes are actually in the file
grep -n "testField\|NEW FIELDS\|project:" app/api/google-sheets/route.ts

# Check file modification time
ls -la app/api/google-sheets/route.ts

# Check file content around line 75-85
sed -n '75,85p' app/api/google-sheets/route.ts
```

### Step 2: Check TypeScript Compilation
```bash
# Look for TypeScript errors
npm run build 2>&1 | grep -i error

# Check Next.js compilation logs
# (Look for errors in terminal where npm run dev is running)
```

### Step 3: Verify Server Process
```bash
# Check if multiple Next.js processes are running
ps aux | grep "next-server"

# Kill all Next.js processes
pkill -f "next-server"

# Clear all caches
rm -rf .next
rm -rf node_modules/.cache

# Restart fresh
npm run dev
```

### Step 4: Test API Directly
```bash
# Test current API response
curl -s "http://localhost:3000/api/google-sheets?type=projects" | jq '.projects[0]'

# Check for our test field
curl -s "http://localhost:3000/api/google-sheets?type=projects" | jq '.projects[0].testField'

# Check available fields
curl -s "http://localhost:3000/api/google-sheets?type=projects" | jq '.projects[0] | keys'
```

## 🛠️ Debugging Solutions

### Solution 1: Create New Test Endpoint
Create a completely new API route to test if changes work:

```typescript
// Create: app/api/test-projects/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    test: "NEW_ENDPOINT_WORKING",
    projects: [{
      id: "TEST123",
      project: "Test Project",
      client: "Test Client", 
      email: "test@example.com",
      phone: "555-123-4567",
      testField: "CHANGES_WORKING"
    }]
  })
}
```

Test: `curl "http://localhost:3000/api/test-projects"`

### Solution 2: Check Environment Variables
```bash
# Verify Google Sheets access
curl "http://localhost:3000/api/check-env"

# Test connection
curl "http://localhost:3000/api/test-connection"
```

### Solution 3: Force Recompilation
```bash
# Touch the API file to force recompilation
touch app/api/google-sheets/route.ts

# Or make a small change (add a comment)
echo "// Force recompile $(date)" >> app/api/google-sheets/route.ts
```

### Solution 4: Check for Cached Responses
```bash
# Test with cache-busting parameter
curl "http://localhost:3000/api/google-sheets?type=projects&t=$(date +%s)"

# Check browser Network tab for cached responses
# Hard refresh browser (Cmd+Shift+R)
```

## 🔧 Potential Root Causes

### 1. Build Cache Issue
**Symptoms**: File changes present but not reflected in API
**Solution**: Clear `.next` directory and restart

### 2. Multiple Server Instances
**Symptoms**: Changes work sometimes but not consistently  
**Solution**: Kill all processes and restart single instance

### 3. TypeScript Compilation Error
**Symptoms**: Build succeeds but runtime uses old code
**Solution**: Check build logs for silent errors

### 4. Environment Variable Issue
**Symptoms**: API returns different data structure
**Solution**: Verify Google Sheets connection

### 5. Next.js Route Caching
**Symptoms**: API responses cached even with changes
**Solution**: Use cache-busting parameters

## 📋 Systematic Debug Process

### Phase 1: Confirm Changes (5 minutes)
1. ✅ Verify file contains new fields
2. ✅ Check file modification timestamp
3. ✅ Restart server completely
4. ✅ Test API endpoint

### Phase 2: Isolate Issue (10 minutes)
1. 🔄 Create new test endpoint
2. 🔄 Test with minimal response
3. 🔄 Compare working vs non-working routes
4. 🔄 Check TypeScript compilation

### Phase 3: Force Resolution (15 minutes)
1. ⏳ Clear all caches
2. ⏳ Kill all processes
3. ⏳ Rebuild from scratch
4. ⏳ Test with fresh browser session

## 🎯 Expected Outcomes

### Success Indicators
- `testField: "CHANGES_WORKING"` appears in API response
- New fields (project, client, email, phone) present
- Projects table shows new columns with data

### Failure Indicators  
- API still returns old field structure
- `testField` not present in response
- TypeScript compilation errors
- Multiple server processes running

## 🚀 Quick Fix Commands

```bash
# Complete reset (run in sequence)
pkill -f "next-server"
rm -rf .next
touch app/api/google-sheets/route.ts
npm run dev &
sleep 5
curl "http://localhost:3000/api/google-sheets?type=projects" | jq '.projects[0]'
```

## 📞 Next Steps After Fix

1. **Verify New Fields**: Confirm all new fields appear in API
2. **Test UI Components**: Check projects table displays new columns
3. **Update Documentation**: Record solution for future reference
4. **Clean Up**: Remove debug fields and test endpoints

---

**Priority**: 🔥 CRITICAL
**Estimated Time**: 30 minutes
**Dependencies**: Working Next.js server, Google Sheets API access 