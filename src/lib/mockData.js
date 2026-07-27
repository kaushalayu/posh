export const dashboardStats = {
  openCases: 24,
  closedThisQuarter: 18,
  overdueActions: 7,
  avgResolutionDays: 34,
};

export const ageingData = [
  { month: 'Jan', acknowledged: 5, committee: 3, proceedings: 2, evidence: 1, report: 1 },
  { month: 'Feb', acknowledged: 4, committee: 4, proceedings: 3, evidence: 2, report: 0 },
  { month: 'Mar', acknowledged: 6, committee: 2, proceedings: 4, evidence: 1, report: 2 },
  { month: 'Apr', acknowledged: 3, committee: 5, proceedings: 2, evidence: 3, report: 1 },
  { month: 'May', acknowledged: 7, committee: 3, proceedings: 1, evidence: 2, report: 1 },
  { month: 'Jun', acknowledged: 4, committee: 4, proceedings: 3, evidence: 1, report: 2 },
];

export const trainingCoverage = { covered: 78, total: 100 };

export const alerts = [
  { id: 1, message: 'Case POSH-2024-017 SLA breach in 2 days', type: 'warning', timestamp: '2 hours ago', dismissed: false },
  { id: 2, message: '3 documents pending review', type: 'warning', timestamp: '4 hours ago', dismissed: false },
  { id: 3, message: 'Hearing scheduled for POSH-2024-012 tomorrow', type: 'info', timestamp: '6 hours ago', dismissed: false },
  { id: 4, message: 'New complaint POSH-2024-024 filed', type: 'info', timestamp: '1 day ago', dismissed: false },
  { id: 5, message: 'Case POSH-2024-009 closed successfully', type: 'success', timestamp: '2 days ago', dismissed: true },
  { id: 6, message: 'IC Member assignment overdue for POSH-2024-020', type: 'warning', timestamp: '3 days ago', dismissed: false },
];

export const cases = [
  { id: 'POSH-2024-024', title: 'Workplace Conduct Complaint', complainant: 'Employee A', status: 'open', stage: 'Complaint', createdAt: '2024-06-15', assignedTo: 'Priya Sharma', priority: 'high', department: 'Engineering' },
  { id: 'POSH-2024-023', title: 'Harassment Allegation - Finance Dept', complainant: 'Employee B', status: 'in-progress', stage: 'Committee', createdAt: '2024-06-10', assignedTo: 'Rajesh Kumar', priority: 'high', department: 'Finance' },
  { id: 'POSH-2024-022', title: 'Discrimination Report', complainant: 'Employee C', status: 'in-progress', stage: 'Proceedings', createdAt: '2024-05-28', assignedTo: 'Anita Desai', priority: 'medium', department: 'HR' },
  { id: 'POSH-2024-021', title: 'Bullying Incident - Marketing', complainant: 'Employee D', status: 'in-progress', stage: 'Evidence', createdAt: '2024-05-20', assignedTo: 'Vikram Mehta', priority: 'medium', department: 'Marketing' },
  { id: 'POSH-2024-020', title: 'Sexual Harassment Complaint', complainant: 'Employee E', status: 'open', stage: 'Acknowledgement', createdAt: '2024-06-12', assignedTo: 'Unassigned', priority: 'high', department: 'Operations' },
  { id: 'POSH-2024-019', title: 'Hostile Work Environment', complainant: 'Employee F', status: 'in-progress', stage: 'Report', createdAt: '2024-05-15', assignedTo: 'Priya Sharma', priority: 'low', department: 'Legal' },
  { id: 'POSH-2024-018', title: 'Inappropriate Behavior - IT', complainant: 'Employee G', status: 'closed', stage: 'Closed', createdAt: '2024-04-30', assignedTo: 'Rajesh Kumar', priority: 'medium', department: 'IT' },
  { id: 'POSH-2024-017', title: 'Retaliation Complaint', complainant: 'Employee H', status: 'overdue', stage: 'Committee', createdAt: '2024-05-05', assignedTo: 'Anita Desai', priority: 'high', department: 'Sales' },
];

export const stages = [
  { name: 'Complaint', status: 'completed' },
  { name: 'Acknowledgement', status: 'completed' },
  { name: 'Committee', status: 'current' },
  { name: 'Proceedings', status: 'future' },
  { name: 'Evidence', status: 'future' },
  { name: 'Report', status: 'future' },
  { name: 'Management', status: 'future' },
  { name: 'Closure', status: 'future' },
  { name: 'Archive', status: 'future' },
];

export const auditLog = [
  { id: 1, actor: 'Priya Sharma', action: 'Created', entity: 'Complaint', entityId: 'POSH-2024-024', timestamp: '2024-06-15 09:30:00', ipAddress: '192.168.1.10' },
  { id: 2, actor: 'Rajesh Kumar', action: 'Updated', entity: 'Case', entityId: 'POSH-2024-023', timestamp: '2024-06-14 14:20:00', ipAddress: '192.168.1.15' },
  { id: 3, actor: 'System', action: 'Created', entity: 'Case', entityId: 'POSH-2024-023', timestamp: '2024-06-10 11:00:00', ipAddress: '192.168.1.1' },
  { id: 4, actor: 'Anita Desai', action: 'Updated', entity: 'Case', entityId: 'POSH-2024-022', timestamp: '2024-06-13 16:45:00', ipAddress: '192.168.1.22' },
  { id: 5, actor: 'Vikram Mehta', action: 'Uploaded', entity: 'Document', entityId: 'DOC-045', timestamp: '2024-06-12 10:15:00', ipAddress: '192.168.1.30' },
  { id: 6, actor: 'Priya Sharma', action: 'Updated', entity: 'Stage', entityId: 'POSH-2024-019', timestamp: '2024-06-11 09:00:00', ipAddress: '192.168.1.10' },
  { id: 7, actor: 'Rajesh Kumar', action: 'Created', entity: 'Hearing', entityId: 'HRG-012', timestamp: '2024-06-10 15:30:00', ipAddress: '192.168.1.15' },
  { id: 8, actor: 'Admin', action: 'Deleted', entity: 'Document', entityId: 'DOC-032', timestamp: '2024-06-09 12:00:00', ipAddress: '192.168.1.5' },
  { id: 9, actor: 'Anita Desai', action: 'Updated', entity: 'Evidence', entityId: 'EVD-008', timestamp: '2024-06-08 14:10:00', ipAddress: '192.168.1.22' },
  { id: 10, actor: 'System', action: 'Escalated', entity: 'Case', entityId: 'POSH-2024-017', timestamp: '2024-06-07 08:00:00', ipAddress: '192.168.1.1' },
  { id: 11, actor: 'Vikram Mehta', action: 'Created', entity: 'Action', entityId: 'ACT-023', timestamp: '2024-06-06 11:45:00', ipAddress: '192.168.1.30' },
  { id: 12, actor: 'Priya Sharma', action: 'Closed', entity: 'Case', entityId: 'POSH-2024-018', timestamp: '2024-06-05 17:00:00', ipAddress: '192.168.1.10' },
];

export const roles = [
  { id: 1, name: 'Employee', permissions: ['View Own Cases', 'File Complaint', 'Upload Documents'], userCount: 245 },
  { id: 2, name: 'HR SPOC', permissions: ['View Assigned Cases', 'Intake Queue', 'Communications', 'Assign Committee'], userCount: 8 },
  { id: 3, name: 'POSH Admin', permissions: ['Full Case Access', 'Workflow Control', 'Dashboards', 'User Management'], userCount: 3 },
  { id: 4, name: 'IC Member', permissions: ['View Assigned Cases', 'Hearing Schedule', 'Evidence Access', 'Report Drafting'], userCount: 12 },
  { id: 5, name: 'External Member', permissions: ['View Assigned Cases', 'Read & Annotate'], userCount: 4 },
  { id: 6, name: 'Legal', permissions: ['Case Workspace', 'Report Review', 'Compliance Exports'], userCount: 5 },
  { id: 7, name: 'Management', permissions: ['Anonymised Dashboard Only'], userCount: 15 },
  { id: 8, name: 'Super Admin', permissions: ['System Config', 'Role Management', 'Audit Logs', 'Retention Policy'], userCount: 2 },
];

export const workflowStages = [
  { name: 'Complaint', allowedTransitions: ['Acknowledgement'], requiredRole: 'Employee', slaDays: 1, notificationTemplate: 'complaint_received' },
  { name: 'Acknowledgement', allowedTransitions: ['Committee'], requiredRole: 'HR SPOC', slaDays: 3, notificationTemplate: 'acknowledgement_sent' },
  { name: 'Committee', allowedTransitions: ['Proceedings'], requiredRole: 'POSH Admin', slaDays: 7, notificationTemplate: 'committee_assigned' },
  { name: 'Proceedings', allowedTransitions: ['Evidence'], requiredRole: 'IC Member', slaDays: 30, notificationTemplate: 'proceedings_initiated' },
  { name: 'Evidence', allowedTransitions: ['Report'], requiredRole: 'IC Member', slaDays: 15, notificationTemplate: 'evidence_review' },
  { name: 'Report', allowedTransitions: ['Management'], requiredRole: 'IC Member', slaDays: 7, notificationTemplate: 'report_drafted' },
  { name: 'Management', allowedTransitions: ['Closure'], requiredRole: 'Management', slaDays: 14, notificationTemplate: 'management_action' },
  { name: 'Closure', allowedTransitions: ['Archive'], requiredRole: 'POSH Admin', slaDays: 3, notificationTemplate: 'case_closed' },
  { name: 'Archive', allowedTransitions: [], requiredRole: 'Super Admin', slaDays: 30, notificationTemplate: 'case_archived' },
];

export const actionItems = [
  { id: 1, caseId: 'POSH-2024-024', title: 'File initial complaint report', owner: 'Priya Sharma', dueDate: '2024-06-20', priority: 'high', status: 'in-progress' },
  { id: 2, caseId: 'POSH-2024-023', title: 'Schedule committee meeting', owner: 'Rajesh Kumar', dueDate: '2024-06-18', priority: 'high', status: 'to-do' },
  { id: 3, caseId: 'POSH-2024-022', title: 'Collect witness statements', owner: 'Anita Desai', dueDate: '2024-06-22', priority: 'medium', status: 'in-progress' },
  { id: 4, caseId: 'POSH-2024-021', title: 'Review evidence documents', owner: 'Vikram Mehta', dueDate: '2024-06-15', priority: 'medium', status: 'overdue' },
  { id: 5, caseId: 'POSH-2024-020', title: 'Send acknowledgement letter', owner: 'HR SPOC', dueDate: '2024-06-16', priority: 'high', status: 'to-do' },
  { id: 6, caseId: 'POSH-2024-019', title: 'Draft investigation report', owner: 'Priya Sharma', dueDate: '2024-06-25', priority: 'low', status: 'in-progress' },
  { id: 7, caseId: 'POSH-2024-017', title: 'Assign IC members', owner: 'Anita Desai', dueDate: '2024-06-10', priority: 'high', status: 'overdue' },
  { id: 8, caseId: 'POSH-2024-024', title: 'Notify respondent', owner: 'Rajesh Kumar', dueDate: '2024-06-21', priority: 'medium', status: 'to-do' },
  { id: 9, caseId: 'POSH-2024-023', title: 'Prepare hearing minutes template', owner: 'System', dueDate: '2024-06-19', priority: 'low', status: 'done' },
];

export const documents = [
  { id: 1, caseId: 'POSH-2024-024', filename: 'Complaint_Form.pdf', version: 1, uploadedBy: 'Priya Sharma', uploadedAt: '2024-06-15', size: '245 KB' },
  { id: 2, caseId: 'POSH-2024-023', filename: 'Committee_Assignment.pdf', version: 1, uploadedBy: 'Rajesh Kumar', uploadedAt: '2024-06-10', size: '128 KB' },
  { id: 3, caseId: 'POSH-2024-022', filename: 'Witness_Statement_A.pdf', version: 2, uploadedBy: 'Anita Desai', uploadedAt: '2024-06-13', size: '512 KB' },
  { id: 4, caseId: 'POSH-2024-021', filename: 'Evidence_Photos.zip', version: 1, uploadedBy: 'Vikram Mehta', uploadedAt: '2024-06-12', size: '3.2 MB' },
  { id: 5, caseId: 'POSH-2024-019', filename: 'Draft_Report_v3.docx', version: 3, uploadedBy: 'Priya Sharma', uploadedAt: '2024-06-11', size: '890 KB' },
];

export const evidenceItems = [
  { id: 1, caseId: 'POSH-2024-024', evidenceNo: 'EVD-001', description: 'Email correspondence', source: 'Complainant', dateAdded: '2024-06-15', custodian: 'Priya Sharma', status: 'in-custody' },
  { id: 2, caseId: 'POSH-2024-023', evidenceNo: 'EVD-002', description: 'CCTV footage extract', source: 'Security', dateAdded: '2024-06-11', custodian: 'Rajesh Kumar', status: 'in-custody' },
  { id: 3, caseId: 'POSH-2024-022', evidenceNo: 'EVD-003', description: 'Witness audio recording', source: 'IC Member', dateAdded: '2024-06-10', custodian: 'Anita Desai', status: 'in-custody' },
  { id: 4, caseId: 'POSH-2024-021', evidenceNo: 'EVD-004', description: 'Chat screenshots', source: 'Complainant', dateAdded: '2024-06-08', custodian: 'Vikram Mehta', status: 'released' },
  { id: 5, caseId: 'POSH-2024-019', evidenceNo: 'EVD-005', description: 'HR investigation notes', source: 'HR Dept', dateAdded: '2024-06-05', custodian: 'Priya Sharma', status: 'archived' },
];

export const retentionRules = [
  { id: 1, entityType: 'Complaints', retainYears: 7, actionOnExpiry: 'Archive & Secure Delete', lastUpdated: '2024-01-15' },
  { id: 2, entityType: 'Documents', retainYears: 7, actionOnExpiry: 'Archive', lastUpdated: '2024-01-15' },
  { id: 3, entityType: 'Evidence', retainYears: 10, actionOnExpiry: 'Secure Delete', lastUpdated: '2024-01-15' },
  { id: 4, entityType: 'Communications', retainYears: 5, actionOnExpiry: 'Archive & Secure Delete', lastUpdated: '2024-01-15' },
  { id: 5, entityType: 'Audit Logs', retainYears: 10, actionOnExpiry: 'WORM Archive', lastUpdated: '2024-01-15' },
];

export const recentReports = [
  { id: 1, name: 'Monthly Compliance Report - June 2024', type: 'Compliance', format: 'PDF', generatedBy: 'Priya Sharma', generatedAt: '2024-06-30', size: '1.2 MB' },
  { id: 2, name: 'Case Summary - Q2 2024', type: 'Case Summary', format: 'Excel', generatedBy: 'Rajesh Kumar', generatedAt: '2024-06-28', size: '456 KB' },
  { id: 3, name: 'Training Coverage Report', type: 'Training', format: 'PDF', generatedBy: 'System', generatedAt: '2024-06-25', size: '320 KB' },
];
