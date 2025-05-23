import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

// Create the auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is logged in on app startup
  useEffect(() => {
    const initAuth = async () => {
      if (authService.initializeAuth()) {
        try {
          const user = await authService.getCurrentUser();
          setCurrentUser(user);
          setIsAdmin(user.is_admin);
        } catch (error) {
          console.error('Failed to get current user:', error);
          // If token is invalid, log user out
          authService.logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    const success = await authService.login(email, password);
    if (success) {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
      setIsAdmin(user.is_admin);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsAdmin(false);
  };

  // Register function
  const register = async (userData) => {
    await authService.register(userData);
    return login(userData.email, userData.password);
  };

  // Value to be provided to consuming components
  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;