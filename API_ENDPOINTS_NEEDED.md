# 🔌 API Endpoints Required for CRM Frontend

This document lists all API endpoints that the frontend is calling and their expected request/response formats.

---

## 🔐 Authentication APIs (Already Implemented)

### 1. **POST /api/auth/login**
✅ Already implemented in backend

```typescript
Request: {
  email: string;
  password: string;
}

Response: {
  error: boolean;
  message: string;
  result: {
    user: { id, email, name, role, companyId, lastLoginAt },
    tokens: { accessToken, refreshToken }
  }
}
```

### 2. **GET /api/auth/me**
✅ Already implemented in backend

```typescript
Request: Bearer token in header

Response: {
  error: boolean;
  result: {
    user: { id, email, name, role, companyId },
    company?: { id, name, industry, size, ... }
  }
}
```

### 3. **POST /api/auth/logout**
✅ Already implemented in backend

### 4. **POST /api/auth/signup**
✅ Already implemented in backend

---

## 👥 Customers APIs

### 1. **GET /api/customers** ⚠️ Needs Enhancement
**Current Status:** Partially working, needs filtering support

```typescript
Request Query Params:
  - page: number (default: 1)
  - limit: number (default: 10)
  - search?: string (search by name, email, company)
  - status?: string (active, inactive, suspended)

Response: {
  error: boolean;
  message: string;
  result: {
    data: [
      {
        id: string;
        name: string;
        email: string;
        phone: string;
        company: string;
        status: 'active' | 'inactive' | 'suspended';
        source: string;
        tags: string[];
        totalValue: number;
        createdAt: string;
        lastContactAt: string;
        notes: string;
        avatar?: string;
      }
    ],
    total: number;
    page: number;
    limit: number;
  }
}
```

### 2. **POST /api/customers** ⚠️ Needs Implementation
**Status:** Frontend ready, backend needed

```typescript
Request Body: {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  source: string;
  tags: string[];
  ownerId: string; // User who creates the customer
}

Response: {
  error: boolean;
  message: string;
  result: {
    customer: { id, name, email, phone, ... }
  }
}
```

### 3. **PUT/PATCH /api/customers/:id** ❌ Not Implemented
**Status:** Not called yet, but needed for edit functionality

```typescript
Request Body: {
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  tags?: string[];
  notes?: string;
}

Response: {
  error: boolean;
  message: string;
  result: { customer: {...} }
}
```

### 4. **DELETE /api/customers/:id** ❌ Not Implemented
**Status:** Not called yet, but needed for delete functionality

```typescript
Response: {
  error: boolean;
  message: string;
}
```

---

## 💼 Leads APIs

### 1. **GET /api/leads** ⚠️ Needs Enhancement
**Current Status:** Partially working, needs filtering support

```typescript
Request Query Params:
  - page: number
  - limit: number
  - search?: string
  - stage?: string (prospect, qualified, proposal, negotiation, closed_won, closed_lost)
  - assignedTo?: string (filter by user ID) ⭐ NEW - For employee filtering

Response: {
  error: boolean;
  message: string;
  result: {
    data: [
      {
        id: string;
        title: string;
        customerId: string;
        customerName: string;
        value: number;
        stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
        probability: number;
        assignedTo: string;        // ⭐ User ID
        assignedToName: string;    // ⭐ User name
        source: string;
        createdAt: string;
        updatedAt: string;
        expectedCloseDate: string;
        description: string;
      }
    ],
    total: number;
    page: number;
    limit: number;
  }
}
```

### 2. **POST /api/leads** ⚠️ Needs Enhancement
**Current Status:** Partially working, needs assignedTo support

```typescript
Request Body: {
  title: string;
  customerId: string;
  value: number;
  stage: string;
  probability: number;
  source: string;
  expectedCloseDate: string;
  description: string;
  assignedTo?: string;        // ⭐ NEW - User ID to assign to
}

Response: {
  error: boolean;
  message: string;
  result: {
    lead: { id, title, customerId, ... }
  }
}
```

### 3. **PATCH /api/leads/:id** ⚠️ Needs Enhancement
**Current Status:** Called but needs assignedTo support

```typescript
Request Body: {
  title?: string;
  customerId?: string;
  value?: number;
  stage?: string;
  probability?: number;
  assignedTo?: string;        // ⭐ NEW
  expectedCloseDate?: string;
  description?: string;
}

Response: {
  error: boolean;
  message: string;
  result: {
    lead: { id, title, ... }
  }
}
```

### 4. **POST /api/leads/:id/assign** ⚠️ Needs Implementation
**Status:** Frontend calls this, backend needed

```typescript
Request Body: {
  assignedTo: string; // User ID
}

Response: {
  error: boolean;
  message: string;
  result: {
    lead: { id, assignedTo, assignedToName, ... }
  }
}
```

### 5. **DELETE /api/leads/:id** ⚠️ Called but needs verification
**Status:** Frontend calls this

```typescript
Response: {
  error: boolean;
  message: string;
}
```

---

## ✅ Tasks APIs

### 1. **GET /api/tasks** ⚠️ Needs Enhancement
**Current Status:** Partially working, needs filtering support

```typescript
Request Query Params:
  - page: number
  - limit: number
  - status?: string (pending, in_progress, completed, cancelled)
  - assigneeId?: string
  - assignedTo?: string (filter by user ID) ⭐ NEW - For employee filtering

Response: {
  error: boolean;
  message: string;
  result: {
    data: [
      {
        id: string;
        title: string;
        description: string;
        type: 'call' | 'email' | 'meeting' | 'follow_up' | 'other';
        priority: 'high' | 'medium' | 'low';
        status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
        assignedTo: string;        // ⭐ User ID
        assignedToName: string;    // ⭐ User name
        dueDate: string;
        relatedType?: 'customer' | 'lead';
        relatedId?: string;
        relatedName?: string;
        createdAt: string;
        updatedAt: string;
      }
    ],
    total: number;
    page: number;
    limit: number;
  }
}
```

### 2. **POST /api/tasks** ⚠️ Needs Enhancement
**Current Status:** Partially working, needs assignedTo support

```typescript
Request Body: {
  title: string;
  description: string;
  type: 'call' | 'email' | 'meeting' | 'follow_up' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string;        // ⭐ NEW - User ID to assign to
  dueDate: string;
  relatedType?: 'customer' | 'lead';
  relatedId?: string;
}

Response: {
  error: boolean;
  message: string;
  result: {
    task: { id, title, description, ... }
  }
}
```

### 3. **PATCH /api/tasks/:id** ⚠️ Needs Enhancement
**Current Status:** Called but needs assignedTo support

```typescript
Request Body: {
  title?: string;
  description?: string;
  type?: string;
  priority?: string;
  status?: string;
  assignedTo?: string;        // ⭐ NEW
  dueDate?: string;
  relatedType?: string;
  relatedId?: string;
}

Response: {
  error: boolean;
  message: string;
  result: {
    task: { id, title, ... }
  }
}
```

### 4. **DELETE /api/tasks/:id** ⚠️ Called but needs verification
**Status:** Frontend calls this

```typescript
Response: {
  error: boolean;
  message: string;
}
```

---

## 👤 Users/Employees APIs

### 1. **GET /api/users** ⚠️ CRITICAL - Needs Implementation
**Status:** Frontend calls this for assignment dropdowns

```typescript
Request Query Params:
  - limit?: number (default: 100)
  - roles?: string (comma-separated: 'employee,manager,admin')
  - companyId?: string (filter by company - for multi-tenant)
  - status?: string (active, inactive)

Response: {
  error: boolean;
  message: string;
  result: {
    data: [
      {
        id: string;
        name: string;
        email: string;
        role: 'super_admin' | 'admin' | 'manager' | 'employee';
        companyId: string;
        isActive: boolean;
        avatar?: string;
      }
    ],
    users: [...] // Alternative format
  }
}
```

**Usage:** 
- Task assignment dropdown
- Lead assignment dropdown
- Employee list page

---

## 🏢 Companies APIs (Super Admin)

### 1. **GET /api/companies** ⚠️ Needs Implementation
**Status:** Frontend calls this in super admin area

```typescript
Request Query Params:
  - limit?: number (default: 100)
  - search?: string (search by name or industry)
  - status?: 'active' | 'inactive'

Response: {
  error: boolean;
  message: string;
  result: {
    data: [
      {
        id: string;
        name: string;
        industry: string;
        size: string;
        subscription: 'enterprise' | 'professional' | 'basic' | 'free';
        isActive: boolean;
        userCount: number;
        revenue: number;
        monthlyRevenue: number;
        createdAt: string;
        updatedAt: string;
        website?: string;
        email?: string;
        phone?: string;
        location?: string;
        lastActivity?: string;
        
        // Optional: Usage statistics
        tasksCount?: number;
        leadsCount?: number;
        customersCount?: number;
        growth?: number; // Growth percentage
      }
    ],
    total: number;
  }
}
```

---

## 📊 Summary of API Status

### ✅ Fully Implemented (No Changes Needed):
1. POST /api/auth/login
2. POST /api/auth/signup
3. POST /api/auth/logout
4. GET /api/auth/me
5. POST /api/auth/refresh

### ⚠️ Partially Implemented (Needs Enhancement):
1. **GET /api/customers** - Add search, status filtering
2. **GET /api/leads** - Add assignedTo filtering ⭐
3. **GET /api/tasks** - Add assignedTo filtering ⭐
4. **POST /api/leads** - Add assignedTo field ⭐
5. **POST /api/tasks** - Add assignedTo field ⭐
6. **PATCH /api/leads/:id** - Add assignedTo field ⭐
7. **PATCH /api/tasks/:id** - Add assignedTo field ⭐

### ❌ Not Implemented (Critical):
1. **GET /api/users** - List all users/employees ⭐⭐⭐ CRITICAL
2. **GET /api/companies** - List all companies (super admin) ⭐⭐
3. **POST /api/leads/:id/assign** - Assign lead to user
4. **PUT/PATCH /api/customers/:id** - Update customer
5. **DELETE /api/customers/:id** - Delete customer

---

## 🎯 Priority Order

### **HIGH PRIORITY (App Breaking):**

#### 1. **GET /api/users** 🔴 CRITICAL
**Why:** Assignment dropdowns won't work without this
**Used In:**
- Task assignment dropdown
- Lead assignment dropdown
- Employee page

**Implementation:**
```javascript
// Backend (Node.js/Express example)
router.get('/api/users', authenticate, async (req, res) => {
  const { limit = 100, roles, companyId } = req.query;
  
  let query = { companyId: req.user.companyId }; // Multi-tenant
  
  if (roles) {
    query.role = { $in: roles.split(',') };
  }
  
  const users = await User.find(query)
    .select('id name email role isActive avatar')
    .limit(parseInt(limit));
  
  res.json({
    error: false,
    message: 'Users fetched successfully',
    result: { data: users }
  });
});
```

#### 2. **GET /api/leads?assignedTo=userId** 🔴 CRITICAL
**Why:** Employees should only see their assigned leads
**Enhancement Needed:** Add filtering by assignedTo

```javascript
// Backend enhancement
router.get('/api/leads', authenticate, async (req, res) => {
  const { assignedTo, page, limit, search, stage } = req.query;
  
  let query = { companyId: req.user.companyId };
  
  // ⭐ Add assignedTo filter
  if (assignedTo) {
    query.assignedTo = assignedTo;
  }
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { customerName: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (stage) {
    query.stage = stage;
  }
  
  const leads = await Lead.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  
  res.json({ error: false, result: { data: leads } });
});
```

#### 3. **GET /api/tasks?assignedTo=userId** 🔴 CRITICAL
**Why:** Employees should only see their assigned tasks
**Enhancement Needed:** Add filtering by assignedTo

```javascript
// Backend enhancement
router.get('/api/tasks', authenticate, async (req, res) => {
  const { assignedTo, status, page, limit } = req.query;
  
  let query = { companyId: req.user.companyId };
  
  // ⭐ Add assignedTo filter
  if (assignedTo) {
    query.assignedTo = assignedTo;
  }
  
  if (status) {
    query.status = status;
  }
  
  const tasks = await Task.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  
  res.json({ error: false, result: { data: tasks } });
});
```

---

### **MEDIUM PRIORITY (Features Won't Work):**

#### 4. **POST /api/leads/:id/assign** 🟡
**Why:** Lead assignment feature won't work
**Used In:** Leads page assign modal

```javascript
router.post('/api/leads/:id/assign', authenticate, async (req, res) => {
  const { id } = req.params;
  const { assignedTo } = req.body;
  
  // Verify user has permission to assign
  if (!hasPermission(req.user.role, 'assign_lead')) {
    return res.status(403).json({ error: true, message: 'Insufficient permissions' });
  }
  
  // Get user name for assignedToName
  const assignedUser = await User.findById(assignedTo);
  
  const lead = await Lead.findByIdAndUpdate(
    id,
    { 
      assignedTo,
      assignedToName: assignedUser.name 
    },
    { new: true }
  );
  
  res.json({ error: false, result: { lead } });
});
```

#### 5. **GET /api/companies** 🟡
**Why:** Super admin dashboard won't show companies
**Used In:** Super admin pages

```javascript
router.get('/api/companies', authenticateSuperAdmin, async (req, res) => {
  const { limit = 100, search, status } = req.query;
  
  let query = {};
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { industry: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (status) {
    query.isActive = status === 'active';
  }
  
  const companies = await Company.find(query)
    .select('id name industry size subscription isActive userCount revenue createdAt website email')
    .limit(limit)
    .populate('userCount'); // Aggregate user count
  
  res.json({ error: false, result: { data: companies } });
});
```

#### 6. **PUT/PATCH /api/customers/:id** 🟡
**Why:** Edit customer feature won't work

#### 7. **DELETE /api/customers/:id** 🟡
**Why:** Delete customer feature won't work

#### 8. **DELETE /api/leads/:id** 🟡
**Why:** Delete lead feature won't work (currently called)

#### 9. **DELETE /api/tasks/:id** 🟡
**Why:** Delete task feature won't work (currently called)

---

### **LOW PRIORITY (Nice to Have):**

10. **GET /api/super-admin/analytics** - System-wide analytics
11. **GET /api/super-admin/stats** - Dashboard statistics
12. **GET /api/employees** - Dedicated employees endpoint
13. **POST /api/customers/export** - Export customer data
14. **POST /api/leads/export** - Export lead data

---

## 🔧 Database Schema Updates Needed

### **Tasks Table:**
```sql
ALTER TABLE tasks 
ADD COLUMN assigned_to UUID REFERENCES users(id),
ADD COLUMN assigned_to_name VARCHAR(255);

-- Create index for filtering
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
```

### **Leads Table:**
```sql
ALTER TABLE leads
ADD COLUMN assigned_to UUID REFERENCES users(id),
ADD COLUMN assigned_to_name VARCHAR(255);

-- Create index for filtering
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
```

---

## 📋 Implementation Checklist

### **Must Have (App Won't Work Without These):**
- [ ] **GET /api/users** - List users for assignment dropdowns
- [ ] **GET /api/leads?assignedTo=userId** - Filter leads by assignment
- [ ] **GET /api/tasks?assignedTo=userId** - Filter tasks by assignment
- [ ] **POST /api/leads** - Support assignedTo field
- [ ] **POST /api/tasks** - Support assignedTo field
- [ ] **PATCH /api/leads/:id** - Support assignedTo field
- [ ] **PATCH /api/tasks/:id** - Support assignedTo field

### **Should Have (Features Incomplete):**
- [ ] **POST /api/leads/:id/assign** - Dedicated assignment endpoint
- [ ] **PUT /api/customers/:id** - Edit customer
- [ ] **DELETE /api/customers/:id** - Delete customer
- [ ] **DELETE /api/leads/:id** - Delete lead (verify implementation)
- [ ] **DELETE /api/tasks/:id** - Delete task (verify implementation)

### **Nice to Have (Super Admin):**
- [ ] **GET /api/companies** - List all companies
- [ ] **GET /api/super-admin/analytics** - Analytics data
- [ ] **POST /api/companies** - Create company (super admin)
- [ ] **PATCH /api/companies/:id** - Edit company (super admin)

---

## 🚀 Quick Start Backend Template

### **1. Users Endpoint (Most Critical):**

```javascript
const express = require('express');
const router = express.Router();

// GET /api/users - List users
router.get('/users', authenticate, async (req, res) => {
  try {
    const { limit = 100, roles } = req.query;
    
    let query = { 
      companyId: req.user.companyId,
      isActive: true 
    };
    
    if (roles) {
      query.role = { $in: roles.split(',') };
    }
    
    const users = await User.find(query)
      .select('id name email role isActive avatar')
      .limit(parseInt(limit));
    
    res.json({
      error: false,
      message: 'Users fetched successfully',
      result: { data: users }
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

module.exports = router;
```

### **2. Add Filtering to Leads:**

```javascript
// PATCH existing GET /api/leads endpoint
router.get('/leads', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, assignedTo, stage, search } = req.query;
    
    let query = { companyId: req.user.companyId };
    
    // ⭐ Add assignedTo filter
    if (assignedTo) {
      query.$or = [
        { assignedTo: assignedTo },
        { assignedTo: { $exists: false } },
        { assignedTo: '' }
      ];
    }
    
    if (stage) {
      query.stage = stage;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const leads = await Lead.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Lead.countDocuments(query);
    
    res.json({
      error: false,
      result: { 
        data: leads,
        total,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
```

### **3. Add Filtering to Tasks:**

```javascript
// Same pattern as leads above
// Just replace Lead model with Task model
```

---

## 🔒 Security Considerations

### **Authentication:**
All endpoints MUST verify JWT token:
```javascript
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: true, message: 'Unauthorized' });
  }
};
```

### **Authorization:**
Check permissions for each endpoint:
```javascript
// Example: Only managers+ can assign
router.post('/leads/:id/assign', authenticate, async (req, res) => {
  if (!hasPermission(req.user.role, 'assign_lead')) {
    return res.status(403).json({ 
      error: true, 
      message: 'Insufficient permissions' 
    });
  }
  // ... proceed with assignment
});
```

### **Multi-Tenancy:**
Always filter by companyId:
```javascript
// Ensure users only see their company's data
let query = { companyId: req.user.companyId };

// Exception: Super admin can see all companies
if (req.user.role !== 'super_admin') {
  query.companyId = req.user.companyId;
}
```

---

## 📝 Response Format Consistency

All APIs should follow this format:

**Success:**
```json
{
  "error": false,
  "message": "Operation successful",
  "result": {
    "data": [...],
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

**Error:**
```json
{
  "error": true,
  "message": "Error description",
  "reason": "specific_error_code" // Optional: For client-side handling
}
```

---

## ✅ Quick Implementation Order

1. **GET /api/users** (Most critical - assignment dropdowns)
2. **Add assignedTo filtering to GET /api/leads**
3. **Add assignedTo filtering to GET /api/tasks**
4. **Support assignedTo in POST/PATCH /api/leads**
5. **Support assignedTo in POST/PATCH /api/tasks**
6. **GET /api/companies** (For super admin)
7. **Remaining CRUD operations** (DELETE, UPDATE endpoints)

---

## 🧪 Testing Endpoints

Use these curl commands to test:

```bash
# Test GET users
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:53321/api/users?limit=10

# Test GET leads with assignedTo
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:53321/api/leads?assignedTo=user-123"

# Test POST lead with assignment
curl -X POST -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Lead","assignedTo":"user-123","value":5000}' \
  http://localhost:53321/api/leads
```

---

## 📞 Questions to Answer:

1. **Users endpoint** - Do you have a `/users` or `/employees` endpoint?
2. **Assignment fields** - Do your lead/task schemas have `assignedTo` and `assignedToName` fields?
3. **Companies endpoint** - Is there a super admin endpoint for listing all companies?
4. **Filtering support** - Do your existing endpoints support query parameter filtering?

Let me know which endpoints exist and I can help with specific implementation or frontend adjustments!





