import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from '../services/authService';

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

  const { email, full_name, password, confirmPassword } = formData;

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("პაროლები არ ემთხვევა");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("გთხოვთ, შეიყვანოთ სწორი ელ.ფოსტის მისამართი");
      return;
    }

    try {
      setIsLoading(true);
      const { confirmPassword, ...userData } = formData;
      
      console.log("Sending registration data:", userData);
      
      await authService.register(userData);
      await authService.login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.message && error.message.includes("API error")) {
        console.error("API error details:", error);
      }
      
      if (error.response?.data?.detail === "Email already registered") {
        setError("ეს ელ.ფოსტა უკვე დარეგისტრირებულია");
      } else {
        setError(
          error.response?.data?.detail || "რეგისტრაციის პროცესში მოხდა შეცდომა"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='assets/images/auth/auth-img.png' alt='' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <h4 className='mb-12'>რეგისტრაცია</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              შეავსე ფორმა ახალი ანგარიშის შესაქმნელად
            </p>
          </div>
          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                name="email"
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='ელ.ფოსტა'
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='solar:user-outline' />
              </span>
              <input
                type='text'
                name="full_name"
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='სახელი და გვარი'
                value={full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='position-relative mb-16'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type='password'
                  name="password"
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  id='password'
                  placeholder='პაროლი'
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <span
                className='toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light'
                data-toggle="#password"
                onClick={() => togglePasswordVisibility('password')}
              />
            </div>
            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type='password'
                  name="confirmPassword"
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  id='confirmPassword'
                  placeholder='გაიმეორე პაროლი'
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <span
                className='toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light'
                data-toggle="#confirmPassword"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : null}
              რეგისტრაცია
            </button>
            <div className="mt-3 text-center">
              <span>უკვე გაქვს ანგარიში? </span>
              <Link to="/login" className='text-primary-600 fw-medium'>
                შესვლა
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpLayer;
