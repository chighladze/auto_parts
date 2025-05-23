import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminUsersLayer from "../components/AdminUsersLayer";
import authService from "../services/authService";

const AdminUsersPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // Check if user is authenticated and is admin
        const adminStatus = await authService.isAdmin();
        setIsAdmin(adminStatus);
        
        if (!adminStatus) {
          // Redirect non-admin users
          navigate("/access-denied");
        }
      } catch (error) {
        // If error (like unauthorized), redirect to login
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Only render admin panel if user is admin
  return isAdmin ? <AdminUsersLayer /> : null;
};

export default AdminUsersPage;