export interface Internship {
  id: string;
  company: string;
  role: string;
  description: string;
  applicationUrl: string;
  deadline?: string;
  category: 'Tech' | 'Finance' | 'Design' | 'Marketing' | 'Healthcare'| 'Engineering';
  location?: string;
  duration?: string;
  tags: string[];
} 