import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("api/v1/auth/signUp", registrationData);
      console.log(response);

      toast.success("Registration successful!");
      navigate("/loginPage");
      isLoading(false);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div className="container registration-form mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={registrationData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={registrationData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={registrationData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-decoration-none">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
