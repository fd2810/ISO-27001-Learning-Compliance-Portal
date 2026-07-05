// ISO Shield Types

export type ComplianceStatus = 'compliant' | 'non-conformity' | 'partial' | 'na' | 'pending';

export type ControlType = 'preventive' | 'detective' | 'corrective';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

export type ControlCategory = 'organizational' | 'people' | 'physical' | 'technological';

// Navigation
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string;
  children?: NavItem[];
}

// Control attributes
export interface ControlAttributes {
  controlType: ControlType;
  securityProperties: string[];
  cybersecurityConcept: string;
  operationalCapability: string;
  securityDomain: string;
}

// Audit checklist item
export interface AuditChecklistItem {
  id: string;
  question: string;
  status: ComplianceStatus;
  evidence: string;
  lastReviewed: string;
  reviewer: string;
}

// Annex A Control
export interface AnnexAControl {
  id: string;
  number: string;
  title: string;
  category: ControlCategory;
  clause: string;
  objective: string;
  description: string;
  attributes: ControlAttributes;
  implementationGuidance: string[];
  auditChecklist: AuditChecklistItem[];
  focusAreas: string[];
  bestPractices: string[];
  businessExample: string;
  commonMistakes: string[];
  keyTakeaways: string[];
  relatedControls: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

// ISO 27001 Clause
export interface ISOClause {
  id: string;
  number: string;
  title: string;
  category: 'context' | 'leadership' | 'planning' | 'support' | 'operation' | 'performance' | 'improvement';
  content: string;
  requirements: string[];
  guidance: string;
  relatedAnnexAControls: string[];
}

// Risk Assessment
export interface Risk {
  id: string;
  title: string;
  description: string;
  category: string;
  likelihood: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  riskLevel: RiskLevel;
  treatmentStatus: 'pending' | 'in-progress' | 'mitigated' | 'accepted' | 'transferred';
  treatmentPlan?: string;
  owner: string;
  reviewDate: string;
  relatedControls: string[];
}

// Learning Content
export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  progress: number;
  icon: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'interactive' | 'quiz';
  completed: boolean;
}

// Statistics
export interface PlatformStats {
  totalControls: number;
  completedControls: number;
  compliancePercentage: number;
  riskScore: number;
  activeRisks: number;
  mitigatedRisks: number;
  learningProgress: number;
  modulesCompleted: number;
}

// Recent Activity
export interface Activity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'success' | 'warning' | 'info' | 'danger';
}

// Feature card for homepage
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

// Case Study
export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  controlsImplemented: string[];
  duration: string;
}

// Backward compatibility aliases
export type ControlSection = AnnexAControl;
export type ComplianceStandard = {
  id: string;
  name: string;
  shortName: string;
  version: string;
  totalControls: number;
  reviewedControls: number;
  compliancePercentage: number;
  icon: string;
  description: string;
  sections: ControlSection[];
};
export type MetricCard = {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: string;
};
