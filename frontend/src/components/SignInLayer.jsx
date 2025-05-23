import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignInLayer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = (e) => {
    const passwordField = document.getElementById("your-password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      e.target.classList.remove("ri-eye-line");
      e.target.classList.add("ri-eye-off-line");
    } else {
      passwordField.type = "password";
      e.target.classList.remove("ri-eye-off-line");
      e.target.classList.add("ri-eye-line");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <h4 className="mb-12">შესვლა</h4>
            <p className="mb-32 text-secondary-light text-lg">
              შეიყვანეთ თქვენი მონაცემები
            </p>
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="icon-field mb-20">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="ელ.ფოსტა"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="position-relative mb-12">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type="password"
                  id="your-password"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="პაროლი"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <span
                className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="d-flex align-items-center justify-content-end mb-32">
              <Link to="/forgot-password" className="text-primary fw-medium">
                დაგავიწყდათ პაროლი?
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : null}
              შესვლა
            </button>
            <div className="mt-3 text-center">
              <span>არ გაქვთ ანგარიში? </span>
              <Link to="/signup" className="text-primary fw-medium">
                რეგისტრაცია
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
