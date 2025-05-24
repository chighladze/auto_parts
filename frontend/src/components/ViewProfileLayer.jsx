import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import authService from "../services/authService";

const ViewProfileLayer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [imagePreview, setImagePreview] = useState("/assets/images/user.png");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        if (userData.avatar) {
          setImagePreview(userData.avatar);
        }
      } catch (err) {
        setError(t("errors.failed_to_load_profile"));
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [t]);

  // eslint-disable-next-line no-unused-vars
  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    } else {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-75">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t("common.loading")}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="alert alert-danger shadow-sm rounded-3 mx-auto my-4"
        style={{ maxWidth: "600px" }}
        role="alert"
      >
        <Icon icon="mdi:alert-circle" className="me-2" width="24" />
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Левая колонка с информацией профиля */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="avatar-wrapper position-relative d-inline-block mb-3">
                  <img
                    src={imagePreview}
                    alt={user?.full_name}
                    className="rounded-circle border shadow-sm"
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                    }}
                  />
                  {user?.is_admin && (
                    <div className="position-absolute bottom-0 end-0">
                      <Icon
                        icon="mdi:shield-check"
                        className="text-primary bg-white rounded-circle p-1"
                        width="28"
                        height="28"
                      />
                    </div>
                  )}
                </div>
                <h3 className="fw-bold mb-1">{user?.full_name}</h3>
                <span
                  className={`badge ${
                    user?.is_admin ? "bg-primary" : "bg-secondary"
                  } rounded-pill px-3 py-2`}
                >
                  <Icon
                    icon={user?.is_admin ? "mdi:shield-account" : "mdi:account"}
                    className="me-1"
                    width="18"
                  />
                  {user?.is_admin ? t("roles.administrator") : t("roles.user")}
                </span>
              </div>

              <div className="profile-info bg-light rounded-4 p-4">
                <h6 className="text-primary mb-3">
                  {t("profile.personal_info")}
                </h6>
                <div className="info-list">
                  <InfoItem
                    icon="mdi:email"
                    label={t("fields.email")}
                    value={user?.email}
                  />
                  <InfoItem
                    icon="mdi:phone"
                    label={t("fields.phone")}
                    value={user?.phone || "-"}
                  />
                  <InfoItem
                    icon="mdi:calendar"
                    label={t("fields.joined")}
                    value={new Date(user?.created_at).toLocaleDateString()}
                  />
                  <InfoItem
                    icon="mdi:translate"
                    label={t("fields.language")}
                    value={user?.language || "English"}
                  />
                  <InfoItem
                    icon="mdi:office-building"
                    label={t("fields.department")}
                    value={user?.department || "-"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка с табами */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <ul className="nav nav-tabs border-0 mb-4" role="tablist">
                <TabButton
                  active={activeTab === "profile"}
                  onClick={() => setActiveTab("profile")}
                  icon="mdi:account-edit"
                  text={t("tabs.edit_profile")}
                />
                <TabButton
                  active={activeTab === "password"}
                  onClick={() => setActiveTab("password")}
                  icon="mdi:lock"
                  text={t("tabs.change_password")}
                />
                <TabButton
                  active={activeTab === "notifications"}
                  onClick={() => setActiveTab("notifications")}
                  icon="mdi:bell"
                  text={t("tabs.notifications")}
                />
              </ul>

              <div className="tab-content">
                {activeTab === "profile" && (
                  <div className="profile-edit-form">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">
                          {t("fields.full_name")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={user?.full_name}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          {t("fields.email")}
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          defaultValue={user?.email}
                        />
                      </div>
                      {/* Добавьте остальные поля формы здесь */}
                    </div>
                  </div>
                )}

                {activeTab === "password" && (
                  <div className="password-change-form">
                    <div className="mb-3">
                      <label className="form-label">
                        {t("fields.new_password")}
                      </label>
                      <div className="input-group">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className="form-control"
                          placeholder={t("placeholders.enter_new_password")}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => togglePasswordVisibility("password")}
                        >
                          <Icon
                            icon={passwordVisible ? "mdi:eye-off" : "mdi:eye"}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        {t("fields.confirm_password")}
                      </label>
                      <div className="input-group">
                        <input
                          type={confirmPasswordVisible ? "text" : "password"}
                          className="form-control"
                          placeholder={t("placeholders.confirm_password")}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                        >
                          <Icon
                            icon={
                              confirmPasswordVisible ? "mdi:eye-off" : "mdi:eye"
                            }
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="notification-settings">
                    <NotificationToggle
                      id="emailNotif"
                      label={t("notifications.email")}
                      defaultChecked={true}
                    />
                    <NotificationToggle
                      id="pushNotif"
                      label={t("notifications.push")}
                      defaultChecked={true}
                    />
                    <NotificationToggle
                      id="newsLetters"
                      label={t("notifications.newsletter")}
                      defaultChecked={false}
                    />
                  </div>
                )}

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button className="btn btn-outline-secondary">
                    {t("buttons.cancel")}
                  </button>
                  <button className="btn btn-primary">
                    {t("buttons.save")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Вспомогательные компоненты
const InfoItem = ({ icon, label, value }) => (
  <div className="info-item d-flex align-items-center mb-3">
    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-3 p-2 me-3">
      <Icon icon={icon} className="text-primary" width="20" />
    </div>
    <div>
      <small className="text-muted d-block">{label}</small>
      <span className="fw-medium">{value}</span>
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon, text }) => (
  <li className="nav-item">
    <button
      className={`nav-link d-flex align-items-center gap-2 ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      <Icon icon={icon} width="20" />
      {text}
    </button>
  </li>
);

const NotificationToggle = ({ id, label, defaultChecked }) => (
  <div className="form-check form-switch mb-3">
    <input
      className="form-check-input"
      type="checkbox"
      id={id}
      defaultChecked={defaultChecked}
    />
    <label className="form-check-label" htmlFor={id}>
      {label}
    </label>
  </div>
);

export default ViewProfileLayer;
