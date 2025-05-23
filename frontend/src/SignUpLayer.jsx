import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { authService } from "./services/authService";

const SignUpLayer = () => {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { email, full_name, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError(t('errors.passwords_dont_match'));
      setIsLoading(false);
      return;
    }

    try {
      await authService.register({
        email,
        full_name,
        password
      });
      navigate('/signin');
    } catch (err) {
      setError(err.message || t('errors.registration_failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (fieldId) => {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
      passwordField.type = "text";
      document.querySelector(`[data-toggle="#${fieldId}"]`).classList.remove("ri-eye-line");
      document.querySelector(`[data-toggle="#${fieldId}"]`).classList.add("ri-eye-off-line");
    } else {
      passwordField.type = "password";
      document.querySelector(`[data-toggle="#${fieldId}"]`).classList.remove("ri-eye-off-line");
      document.querySelector(`[data-toggle="#${fieldId}"]`).classList.add("ri-eye-line");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-xl-5">
            <div className="card">
              <div className="card-body p-32">
                <div className="text-center mb-24">
                  <h4 className="text-primary mb-8">{t('auth.register')}</h4>
                  <p className="fs-16">{t('auth.create_account')}</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-20">
                    <label className="form-label">{t('auth.full_name')}</label>
                    <input
                      type="text"
                      className="form-control"
                      name="full_name"
                      value={full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-20">
                    <label className="form-label">{t('auth.email')}</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-20">
                    <label className="form-label">{t('auth.password')}</label>
                    <div className="position-relative">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn position-absolute top-50 end-0 translate-middle-y"
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        <Icon icon="ri:eye-line" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-20">
                    <label className="form-label">{t('auth.confirm_password')}</label>
                    <div className="position-relative">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn position-absolute top-50 end-0 translate-middle-y"
                        onClick={() => togglePasswordVisibility("confirmPassword")}
                      >
                        <Icon icon="ri:eye-line" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-20"
                    disabled={isLoading}
                  >
                    {isLoading ? t('common.loading') : t('auth.register')}
                  </button>

                  <p className="text-center mb-0">
                    {t('auth.already_have_account')}{" "}
                    <Link to="/signin" className="text-primary">
                      {t('auth.sign_in')}
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLayer;