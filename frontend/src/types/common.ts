export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'neutral';
export type ComponentSize = 'sm' | 'md' | 'lg';
export type StatusType = 'info' | 'success' | 'warning' | 'danger';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface Option<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
