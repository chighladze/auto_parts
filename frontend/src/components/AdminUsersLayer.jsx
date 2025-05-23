import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import authService from '../services/authService';

const AdminUsersLayer = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Form states
  const [newUser, setNewUser] = useState({
    email: "",
    full_name: "",
    password: "",
    is_admin: false,
    is_active: true
  });
  
  const [editUser, setEditUser] = useState({
    email: "",
    full_name: "",
    password: "",
    is_admin: false,
    is_active: true
  });

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const userData = await authService.getAllUsers();
      setUsers(userData);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("მომხმარებლების ჩატვირთვა ვერ მოხერხდა");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    if (formType === 'new') {
      setNewUser({ ...newUser, [name]: inputValue });
    } else if (formType === 'edit') {
      setEditUser({ ...editUser, [name]: inputValue });
    }
  };
  
  // Open modal to add new user
  const openAddModal = () => {
    setNewUser({
      email: "",
      full_name: "",
      password: "",
      is_admin: false,
      is_active: true
    });
    setShowAddModal(true);
  };
  
  // Open modal to edit user
  const openEditModal = (user) => {
    setCurrentUser(user);
    setEditUser({
      email: user.email,
      full_name: user.full_name,
      password: "",
      is_admin: user.is_admin,
      is_active: user.is_active
    });
    setShowEditModal(true);
  };
  
  // Open modal to confirm user deletion
  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };
  
  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await authService.createUser(newUser);
      setShowAddModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err);
      setError("მომხმარებლის დამატება ვერ მოხერხდა");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Only include password if it was provided
      const userData = { ...editUser };
      if (!userData.password) {
        delete userData.password;
      }
      await authService.updateUser(currentUser.id, userData);
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      setError("მომხმარებლის განახლება ვერ მოხერხდა");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete user
  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      await authService.deleteUser(currentUser.id);
      setShowDeleteModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("მომხმარებლის წაშლა ვერ მოხერხდა");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container-fluid pt-5 px-32">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">მომხმარებლების მართვა</h2>
        <button 
          className="btn btn-primary d-flex align-items-center" 
          onClick={openAddModal}
        >
          <Icon icon="material-symbols:add" className="me-2" />
          ახალი მომხმარებელი
        </button>
      </div>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {isLoading && !showAddModal && !showEditModal && !showDeleteModal ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover m-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>სახელი და გვარი</th>
                    <th>ელ.ფოსტა</th>
                    <th>ადმინი</th>
                    <th>აქტიური</th>
                    <th>რეგისტრაციის თარიღი</th>
                    <th>მოქმედებები</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.is_admin ? (
                            <span className="badge bg-success">დიახ</span>
                          ) : (
                            <span className="badge bg-secondary">არა</span>
                          )}
                        </td>
                        <td>
                          {user.is_active ? (
                            <span className="badge bg-success">დიახ</span>
                          ) : (
                            <span className="badge bg-danger">არა</span>
                          )}
                        </td>
                        <td>
                          {new Date(user.created_at).toLocaleDateString('ka-GE')}
                        </td>
                        <td>
                          <div className="d-flex">
                            <button 
                              className="btn btn-sm btn-outline-primary me-2" 
                              onClick={() => openEditModal(user)}
                            >
                              <Icon icon="mdi:pencil" />
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              onClick={() => openDeleteModal(user)}
                            >
                              <Icon icon="mdi:delete" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        მომხმარებლები არ მოიძებნა
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ახალი მომხმარებელი</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddModal(false)}
                />
              </div>
              <form onSubmit={handleAddUser}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">ელ.ფოსტა</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={newUser.email}
                      onChange={(e) => handleInputChange(e, 'new')}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">სახელი და გვარი</label>
                    <input
                      type="text"
                      className="form-control"
                      id="full_name"
                      name="full_name"
                      value={newUser.full_name}
                      onChange={(e) => handleInputChange(e, 'new')}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">პაროლი</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={newUser.password}
                      onChange={(e) => handleInputChange(e, 'new')}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_admin"
                      name="is_admin"
                      checked={newUser.is_admin}
                      onChange={(e) => handleInputChange(e, 'new')}
                    />
                    <label className="form-check-label" htmlFor="is_admin">
                      ადმინისტრატორი
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowAddModal(false)}
                    disabled={isLoading}
                  >
                    გაუქმება
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                    ) : null}
                    დამატება
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">მომხმარებლის რედაქტირება</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                />
              </div>
              <form onSubmit={handleUpdateUser}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="edit_email" className="form-label">ელ.ფოსტა</label>
                    <input
                      type="email"
                      className="form-control"
                      id="edit_email"
                      name="email"
                      value={editUser.email}
                      onChange={(e) => handleInputChange(e, 'edit')}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit_full_name" className="form-label">სახელი და გვარი</label>
                    <input
                      type="text"
                      className="form-control"
                      id="edit_full_name"
                      name="full_name"
                      value={editUser.full_name}
                      onChange={(e) => handleInputChange(e, 'edit')}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit_password" className="form-label">პაროლი (ცარიელი დატოვეთ არ შესაცვლელად)</label>
                    <input
                      type="password"
                      className="form-control"
                      id="edit_password"
                      name="password"
                      value={editUser.password}
                      onChange={(e) => handleInputChange(e, 'edit')}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="edit_is_admin"
                      name="is_admin"
                      checked={editUser.is_admin}
                      onChange={(e) => handleInputChange(e, 'edit')}
                    />
                    <label className="form-check-label" htmlFor="edit_is_admin">
                      ადმინისტრატორი
                    </label>
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="edit_is_active"
                      name="is_active"
                      checked={editUser.is_active}
                      onChange={(e) => handleInputChange(e, 'edit')}
                    />
                    <label className="form-check-label" htmlFor="edit_is_active">
                      აქტიური
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowEditModal(false)}
                    disabled={isLoading}
                  >
                    გაუქმება
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                    ) : null}
                    განახლება
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete User Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">მომხმარებლის წაშლა</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>
                  დარწმუნებული ხართ, რომ გსურთ მომხმარებლის წაშლა:
                  <br />
                  <strong>{currentUser?.full_name}</strong> ({currentUser?.email})?
                </p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isLoading}
                >
                  გაუქმება
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleDeleteUser}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  ) : null}
                  წაშლა
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal backdrop */}
      {(showAddModal || showEditModal || showDeleteModal) && (
        <div 
          className="modal-backdrop fade show"
          onClick={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminUsersLayer;