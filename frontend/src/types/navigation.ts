import { ReactNode } from 'react';
import { UserRole } from './auth';

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: string; // Lucide icon identifier
  badge?: string | number;
  badgeVariant?: 'primary' | 'warning' | 'neutral' | 'danger';
  children?: NavItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export type RoleNavigationMap = Record<UserRole, NavSection[]>;
