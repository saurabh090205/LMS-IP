import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/auth';
import { mockUsers } from '../lib/mockData';

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  switchRole: (newRole: UserRole) => void;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('shreenil_active_role');
    return (saved as UserRole) || 'student';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const user = mockUsers[role] || mockUsers.student;

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('shreenil_active_role', newRole);
  };

  const loginAs = (newRole: UserRole) => {
    switchRole(newRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    localStorage.setItem('shreenil_active_role', role);
  }, [role]);

  return (
    <AuthContext.Provider value={{ user, role, switchRole, isAuthenticated, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
