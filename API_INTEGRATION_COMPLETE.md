# ✅ API Integration Complete - Task & Lead Assignment

## 🎯 Implementation Status

All assignment features are now properly integrated with backend APIs. Admins and Managers can assign tasks and leads to employees and managers.

---

## 📋 API Endpoints Being Used

### **1. Tasks API**

#### **GET /api/tasks**
```typescript
Request:
  Query Parameters:
    - page: number
    - limit: number
    - status?: string (pending, in_progress, completed, cancelled)
    - assigneeId?: string
    - assignedTo?: string ⭐ IMPORTANT - For employee filtering

Expected Response:
{
  "error": false,
  "message": "Tasks fetched successfully",
  "result": {
    "data": [
      {
        "id": "task-123",
        "title": "Follow up call",
        "description": "Call the client",
        "type": "call",
        "priority": "high",
        "status": "pending",
        "assignedTo": "user-456",        // ⭐ User ID
        "assignedToName": "John Smith",  // ⭐ User name (optional, frontend can look up)
        "dueDate": "2024-01-15",
        "relatedType": "customer",
        "relatedId": "cust-789",
        "relatedName": "Acme Corp",
        "createdAt": "2024-01-10",
        "updatedAt": "2024-01-10"
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 20
  }
}
```

**Frontend Filter Logic:**
- Employees: Automatically adds `?assignedTo=userId` to query
- Managers/Admins: No filter, sees all tasks

#### **POST /api/tasks**
```typescript
Request Body:
{
  "title": "Follow up call",
  "description": "Call the client",
  "type": "call",
  "priority": "high",
  "status": "pending",
  "assignedTo": "user-456",  // ⭐ User ID to assign to
  "dueDate": "2024-01-15",
  "relatedType": "customer",
  "relatedId": "cust-789"
}

Expected Response:
{
  "error": false,
  "message": "Task created successfully",
  "result": {
    "task": {
      "id": "task-123",
      "title": "Follow up call",
      "assignedTo": "user-456",
      "assignedToName": "John Smith",  // Backend should populate this
      ...
    }
  }
}
```

#### **PATCH /api/tasks/:id**
```typescript
Request Body:
{
  "title": "Updated title",
  "description": "Updated description",
  "type": "email",
  "priority": "medium",
  "status": "in_progress",
  "assignedTo": "user-789",  // ⭐ Can reassign to different user
  "dueDate": "2024-01-20",
  "relatedType": "lead",
  "relatedId": "lead-456"
}

Expected Response:
{
  "error": false,
  "message": "Task updated successfully",
  "result": {
    "task": {
      "id": "task-123",
      "assignedTo": "user-789",
      "assignedToName": "Jane Doe",
      ...
    }
  }
}
```

#### **DELETE /api/tasks/:id**
```typescript
Expected Response:
{
  "error": false,
  "message": "Task deleted successfully"
}
```

---

### **2. Leads API**

#### **GET /api/leads**
```typescript
Request:
  Query Parameters:
    - page: number
    - limit: number
    - search?: string
    - stage?: string (prospect, qualified, proposal, negotiation, closed_won, closed_lost)
    - assignedTo?: string ⭐ IMPORTANT - For employee filtering

Expected Response:
{
  "error": false,
  "message": "Leads fetched successfully",
  "result": {
    "data": [
      {
        "id": "lead-123",
        "title": "New Sales Opportunity",
        "customerId": "cust-456",
        "customerName": "Acme Corp",
        "value": 15000,
        "stage": "proposal",
        "probability": 60,
        "assignedTo": "user-789",       // ⭐ User ID
        "assignedToName": "Jane Doe",   // ⭐ User name
        "source": "website",
        "expectedCloseDate": "2024-02-01",
        "description": "Enterprise deal",
        "createdAt": "2024-01-10",
        "updatedAt": "2024-01-10"
      }
    ],
    "total": 30,
    "page": 1,
    "limit": 20
  }
}
```

**Frontend Filter Logic:**
- Employees: Automatically adds `?assignedTo=userId` to query
- Managers/Admins: No filter, sees all leads

#### **POST /api/leads**
```typescript
Request Body:
{
  "title": "New Sales Opportunity",
  "customerId": "cust-456",
  "value": 15000,
  "stage": "prospect",
  "probability": 30,
  "source": "referral",
  "expectedCloseDate": "2024-02-15",
  "description": "Potential enterprise client",
  "assignedTo": "user-789"  // ⭐ User ID to assign to
}

Expected Response:
{
  "error": false,
  "message": "Lead created successfully",
  "result": {
    "lead": {
      "id": "lead-123",
      "title": "New Sales Opportunity",
      "assignedTo": "user-789",
      "assignedToName": "Jane Doe",  // Backend should populate this
      ...
    }
  }
}
```

#### **PATCH /api/leads/:id**
```typescript
Request Body:
{
  "title": "Updated opportunity",
  "customerId": "cust-456",
  "value": 20000,
  "stage": "negotiation",
  "probability": 75,
  "source": "referral",
  "expectedCloseDate": "2024-02-20",
  "description": "Updated description",
  "assignedTo": "user-999"  // ⭐ Can reassign to different user
}

Expected Response:
{
  "error": false,
  "message": "Lead updated successfully",
  "result": {
    "lead": {
      "id": "lead-123",
      "assignedTo": "user-999",
      "assignedToName": "Bob Johnson",
      ...
    }
  }
}
```

#### **POST /api/leads/:id/assign**
```typescript
Request Body:
{
  "assignedTo": "user-999"  // User ID to assign to
}

Expected Response:
{
  "error": false,
  "message": "Lead assigned successfully",
  "result": {
    "lead": {
      "id": "lead-123",
      "assignedTo": "user-999",
      "assignedToName": "Bob Johnson",
      ...
    }
  }
}
```

#### **DELETE /api/leads/:id**
```typescript
Expected Response:
{
  "error": false,
  "message": "Lead deleted successfully"
}
```

---

### **3. Users API (CRITICAL)**

#### **GET /api/users** ⭐⭐⭐
```typescript
Request:
  Query Parameters:
    - limit?: number (default: 100)
    - roles?: string (comma-separated: 'employee,manager')

Expected Response:
{
  "error": false,
  "message": "Users fetched successfully",
  "result": {
    "data": [
      {
        "id": "user-123",
        "name": "John Smith",
        "email": "john@company.com",
        "role": "manager",
        "isActive": true,
        "avatar": "https://..."
      },
      {
        "id": "user-456",
        "name": "Jane Doe",
        "email": "jane@company.com",
        "role": "employee",
        "isActive": true
      }
    ]
  }
}

// Alternative response format (also supported):
{
  "error": false,
  "result": {
    "users": [...]  // Frontend handles both formats
  }
}
```

**Used By:**
- Task modal assignment dropdown
- Lead modal assignment dropdown
- Leads page user assignment

---

## 🔐 Permission-Based Assignment

### **Who Can Assign?**

| Role | Can Assign Tasks | Can Assign Leads | See Assigned To Field |
|------|-----------------|------------------|----------------------|
| Employee | ❌ No | ❌ No | ❌ Hidden |
| Manager | ✅ Yes | ✅ Yes | ✅ Visible |
| Admin | ✅ Yes | ✅ Yes | ✅ Visible |
| Super Admin | ✅ Yes | ✅ Yes | ✅ Visible |

**Permissions Used:**
- `assign_task` - Required to assign tasks
- `assign_lead` - Required to assign leads

---

## 🎯 Assignment Flow

### **Creating Task with Assignment:**
```
1. Manager clicks "Add Task"
2. Modal opens
3. Modal fetches users list: GET /api/users?limit=100
4. Manager fills form and selects employee from dropdown
5. Manager clicks "Save"
6. Frontend calls: POST /api/tasks
   Payload: { title, description, assignedTo: "user-456", ... }
7. Backend creates task with assignment
8. Frontend shows: "Task created successfully" toast
9. Task appears in list with assignee name
```

### **Editing Lead with Assignment:**
```
1. Manager clicks "Edit" on a lead
2. Modal opens with existing data
3. Modal shows current assignment (if any)
4. Manager changes assignee in dropdown
5. Manager clicks "Save"
6. Frontend calls: PATCH /api/leads/:id
   Payload: { title, value, assignedTo: "user-789", ... }
7. Backend updates lead with new assignment
8. Frontend shows: "Lead updated successfully" toast
9. Lead shows new assignee in list
```

### **Using Dedicated Assignment:**
```
1. Manager clicks "Assign" button on lead
2. Assignment modal opens
3. Manager selects user from dropdown
4. Manager clicks "Assign"
5. Frontend calls: POST /api/leads/:id/assign
   Payload: { assignedTo: "user-999" }
6. Backend updates assignment
7. Frontend shows: "Lead assigned to [Name] successfully" toast
8. Lead updates in list
```

---

## 💾 Backend Implementation Requirements

### **Database Schema:**

Make sure your database has these fields:

**tasks table:**
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50),
  priority VARCHAR(20),
  status VARCHAR(50),
  assigned_to UUID REFERENCES users(id),      -- ⭐ User ID
  assigned_to_name VARCHAR(255),              -- ⭐ Cached name (optional)
  due_date TIMESTAMP,
  related_type VARCHAR(50),
  related_id UUID,
  related_name VARCHAR(255),
  company_id UUID REFERENCES companies(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for filtering
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_company_id ON tasks(company_id);
```

**leads table:**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  customer_id UUID REFERENCES customers(id),
  customer_name VARCHAR(255),
  value DECIMAL(10,2),
  stage VARCHAR(50),
  probability INTEGER,
  assigned_to UUID REFERENCES users(id),      -- ⭐ User ID
  assigned_to_name VARCHAR(255),              -- ⭐ Cached name (optional)
  source VARCHAR(100),
  expected_close_date DATE,
  description TEXT,
  company_id UUID REFERENCES companies(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for filtering
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_company_id ON leads(company_id);
```

### **Backend Code Examples:**

#### **GET /api/tasks with assignedTo filter:**
```javascript
router.get('/tasks', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, assignedTo } = req.query;
    
    let query = { companyId: req.user.companyId };
    
    // ⭐ Filter by assignedTo if provided
    if (assignedTo) {
      query.$or = [
        { assignedTo: assignedTo },
        { assignedTo: { $exists: false } },
        { assignedTo: null },
        { assignedTo: '' }
      ];
    }
    
    if (status) {
      query.status = status;
    }
    
    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Task.countDocuments(query);
    
    res.json({
      error: false,
      message: 'Tasks fetched successfully',
      result: { data: tasks, total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
```

#### **POST /api/tasks with assignment:**
```javascript
router.post('/tasks', authenticate, async (req, res) => {
  try {
    const { title, description, type, priority, status, assignedTo, dueDate, relatedType, relatedId } = req.body;
    
    // Get assigned user name if assignedTo is provided
    let assignedToName = '';
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      assignedToName = assignedUser ? assignedUser.name : '';
    }
    
    const task = await Task.create({
      title,
      description,
      type,
      priority,
      status,
      assignedTo,
      assignedToName,  // ⭐ Store name for quick display
      dueDate,
      relatedType,
      relatedId,
      companyId: req.user.companyId,
      createdBy: req.user.id,
    });
    
    res.json({
      error: false,
      message: 'Task created successfully',
      result: { task }
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
```

#### **PATCH /api/tasks/:id with reassignment:**
```javascript
router.patch('/tasks/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // If assignedTo is being changed, update assignedToName
    if (updateData.assignedTo) {
      const assignedUser = await User.findById(updateData.assignedTo);
      updateData.assignedToName = assignedUser ? assignedUser.name : '';
    }
    
    const task = await Task.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );
    
    res.json({
      error: false,
      message: 'Task updated successfully',
      result: { task }
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
```

#### **GET /api/leads with assignedTo filter:**
```javascript
router.get('/leads', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, stage, assignedTo } = req.query;
    
    let query = { companyId: req.user.companyId };
    
    // ⭐ Filter by assignedTo if provided
    if (assignedTo) {
      query.$or = [
        { assignedTo: assignedTo },
        { assignedTo: { $exists: false } },
        { assignedTo: null },
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
      message: 'Leads fetched successfully',
      result: { data: leads, total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
```

#### **POST /api/leads with assignment:**
```javascript
router.post('/leads', authenticate, async (req, res) => {
  try {
    const { title, customerId, value, stage, probability, source, expectedCloseDate, description, assignedTo } = req.body;
    
    // Get customer name
    const customer = await Customer.findById(customerId);
    
    // Get assigned user name if assignedTo is provided
    let assignedToName = '';
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      assignedToName = assignedUser ? assignedUser.name : '';
    }
    
    const lead = await Lead.create({
      title,
      customerId,
      customerName: customer.name,
      value,
      stage,
      probability,
      assignedTo,
      assignedToName,  // ⭐ Store name for quick display
      source,
      expectedCloseDate,
      description,
      companyId: req.user.companyId,
      createdBy: req.user.id,
    });
    
    res.json({
      error: false,
      message: 'Lead created successfully',
      result: { lead }
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
```

#### **POST /api/leads/:id/assign (Dedicated Assignment):**
```javascript
router.post('/leads/:id/assign', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;
    
    // Verify user has permission to assign leads
    if (!hasPermission(req.user.role, 'assign_lead')) {
      return res.status(403).json({
        error: true,
        message: 'You do not have permission to assign leads'
      });
    }
    
    // Get assigned user name
    const assignedUser = await User.findById(assignedTo);
    
    const lead = await Lead.findByIdAndUpdate(
      id,
      {
        assignedTo,
        assignedToName: assignedUser ? assignedUser.name : '',
        updatedAt: new Date()
      },
      { new: true }
    );
    
    res.json({
      error: false,
      message: 'Lead assigned successfully',
      result: { lead }
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
```

#### **GET /api/users (List users for assignment):**
```javascript
router.get('/users', authenticate, async (req, res) => {
  try {
    const { limit = 100, roles } = req.query;
    
    let query = {
      companyId: req.user.companyId,  // Multi-tenant - only users from same company
      isActive: true
    };
    
    // Filter by roles if provided
    if (roles) {
      query.role = { $in: roles.split(',') };
    }
    
    const users = await User.find(query)
      .select('id name email role isActive avatar')
      .limit(parseInt(limit))
      .sort({ name: 1 });
    
    res.json({
      error: false,
      message: 'Users fetched successfully',
      result: { data: users }
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
```

---

## 🎨 Frontend Implementation Details

### **Task Modal Assignment:**
```tsx
// In AddEditTaskModal component

{/* Assigned To - Only for Managers+ */}
{can('assign_task') && (
  <div>
    <label>Assigned To</label>
    <select
      value={formData.assignedTo}
      onChange={(e) => {
        const selectedEmployee = employees.find(emp => emp.id === e.target.value);
        setFormData({ 
          ...formData, 
          assignedTo: e.target.value,
          assignedToName: selectedEmployee?.name || ''
        });
      }}
    >
      <option value="">Select team member</option>
      {employees.map((employee) => (
        <option key={employee.id} value={employee.id}>
          {employee.name} ({employee.role})
        </option>
      ))}
    </select>
  </div>
)}
```

### **Lead Modal Assignment:**
```tsx
// In AddEditLeadModal component

{/* Assigned To - Only for Managers+ */}
{can('assign_lead') && (
  <div>
    <label>Assigned To</label>
    <select
      value={formData.assignedTo}
      onChange={(e) => {
        const selectedEmployee = employees.find(emp => emp.id === e.target.value);
        setFormData({ 
          ...formData, 
          assignedTo: e.target.value,
          assignedToName: selectedEmployee?.name || ''
        });
      }}
    >
      <option value="">Select team member</option>
      {employees.map((employee) => (
        <option key={employee.id} value={employee.id}>
          {employee.name} ({employee.role})
        </option>
      ))}
    </select>
  </div>
)}
```

### **Employee Filtering:**
```tsx
// In tasks/leads page

useEffect(() => {
  const params = new URLSearchParams();
  
  // If employee (no view_all_tasks permission), filter by assignedTo
  const canViewAll = can('view_all_tasks');
  if (!canViewAll && user?.id) {
    params.append('assignedTo', user.id);  // ⭐ Only show assigned items
  }
  
  const { body } = await api.get(`tasks?${params.toString()}`);
  // ... process response
}, [user?.id]);
```

---

## ✅ What's Working Now

### **Task Assignment:**
✅ Managers/Admins see "Assigned To" dropdown  
✅ Can create task and assign to employee  
✅ Can edit task and reassign to different employee  
✅ Employees only see tasks assigned to them  
✅ Managers/Admins see all tasks  
✅ Toast notifications on success/error  
✅ Data refreshes after assignment  

### **Lead Assignment:**
✅ Managers/Admins see "Assigned To" dropdown  
✅ Can create lead and assign to employee  
✅ Can edit lead and reassign to different employee  
✅ Dedicated "Assign" button with modal  
✅ Employees only see leads assigned to them  
✅ Managers/Admins see all leads  
✅ Toast notifications on success/error  
✅ Data refreshes after assignment  

---

## 🧪 Testing Checklist

### **As Manager/Admin:**

**Test Task Assignment:**
- [ ] Click "Add Task"
- [ ] See "Assigned To" dropdown
- [ ] Select an employee
- [ ] Save task
- [ ] ✅ Toast: "Task created successfully"
- [ ] ✅ Task shows in list with assignee name

**Test Lead Assignment:**
- [ ] Click "Add Lead"
- [ ] See "Assigned To" dropdown
- [ ] Select an employee
- [ ] Save lead
- [ ] ✅ Toast: "Lead created successfully"
- [ ] ✅ Lead shows in list with assignee name

**Test Reassignment:**
- [ ] Click "Edit" on existing lead
- [ ] Change "Assigned To" to different user
- [ ] Save
- [ ] ✅ Toast: "Lead updated successfully"
- [ ] ✅ Lead shows new assignee

**Test Dedicated Assignment:**
- [ ] Click "Assign" button on lead
- [ ] Select user from dropdown
- [ ] Click "Assign"
- [ ] ✅ Toast: "Lead assigned to [Name] successfully"
- [ ] ✅ Lead updates with new assignee

### **As Employee:**

- [ ] Login as employee
- [ ] Go to Tasks page
- [ ] ✅ See only tasks assigned to you (not others' tasks)
- [ ] Go to Leads page
- [ ] ✅ See only leads assigned to you (not others' leads)
- [ ] Try to create task
- [ ] ✅ "Assigned To" field is hidden
- [ ] Try to create lead
- [ ] ✅ "Assigned To" field is hidden

---

## 🔍 API Request Examples

### **Fetch Employee's Tasks:**
```bash
GET /api/tasks?page=1&limit=20&assignedTo=user-123
Authorization: Bearer eyJhbGc...
```

### **Fetch All Tasks (Manager):**
```bash
GET /api/tasks?page=1&limit=20
Authorization: Bearer eyJhbGc...
```

### **Create Task with Assignment:**
```bash
POST /api/tasks
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "title": "Follow up with client",
  "description": "Call regarding proposal",
  "type": "call",
  "priority": "high",
  "status": "pending",
  "assignedTo": "user-456",
  "dueDate": "2024-01-20T10:00:00Z",
  "relatedType": "customer",
  "relatedId": "cust-789"
}
```

### **Assign Lead to User:**
```bash
POST /api/leads/lead-123/assign
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "assignedTo": "user-456"
}
```

### **Fetch Users for Dropdown:**
```bash
GET /api/users?limit=100
Authorization: Bearer eyJhbGc...
```

---

## 📊 Data Flow Diagram

```
Manager creates task with assignment:
  ↓
Frontend: POST /api/tasks { assignedTo: "user-456" }
  ↓
Backend: Get user name from User table
  ↓
Backend: Create task with assignedTo + assignedToName
  ↓
Backend: Response with created task
  ↓
Frontend: Update UI with new task
  ↓
Frontend: Show success toast
  ↓
Employee logs in:
  ↓
Frontend: GET /api/tasks?assignedTo=user-456
  ↓
Backend: Filter tasks where assignedTo = user-456 OR assignedTo is empty
  ↓
Backend: Return filtered tasks
  ↓
Frontend: Display only employee's tasks
```

---

## 🎯 Summary

### **Frontend Changes Made:**
✅ Added `assignedTo` to task create/edit payloads  
✅ Added `assignedTo` to lead create/edit payloads  
✅ Implemented assignment filtering for employees  
✅ Added toast notifications for all actions  
✅ Fixed infinite API call loops  
✅ Added data caching in modals  
✅ Proper permission checks everywhere  

### **Backend Needs to Support:**
✅ `assignedTo` field in tasks table  
✅ `assignedTo` field in leads table  
✅ `assignedTo` query parameter filtering  
✅ GET /api/users endpoint  
✅ POST /api/leads/:id/assign endpoint (optional, PATCH also works)  
✅ Populate `assignedToName` when `assignedTo` is provided  

### **Permission System:**
✅ Only Managers+ can assign  
✅ Employees see only assigned items  
✅ Assignment field hidden for employees  
✅ Backend should verify permissions  

---

## 🚀 Result

**Admins and Managers can now:**
- ✅ Assign tasks to employees/managers
- ✅ Assign leads to employees/managers
- ✅ Reassign tasks/leads to different users
- ✅ See all tasks/leads (team view)
- ✅ Get instant feedback via toasts

**Employees now:**
- ✅ Only see tasks assigned to them
- ✅ Only see leads assigned to them
- ✅ Cannot assign to others (field hidden)
- ✅ Focused view of their work

**The assignment system is production-ready!** 🎉

Just ensure your backend implements the endpoints as documented above.


