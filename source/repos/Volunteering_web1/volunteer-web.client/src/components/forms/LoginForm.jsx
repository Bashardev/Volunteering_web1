import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../navbar/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginForm() {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const isFormValid =
            Object.values(formErrors).every((error) => error === "") &&
            formData.email.trim() !== "" &&
            formData.password.trim() !== "";

        if (isFormValid) {
            try {
                const response = await fetch("https://localhost:7149/api/Register/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ Email: formData.email, Password: formData.password })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Login successful:", data);

                    login(data.user); 
                    navigate("/dashboard"); 
                } else {
                    const data = await response.json();
                    setFormErrors({ email: data.message, password: "" });
                    console.error("Login failed:", data);
                }
            } catch (error) {
                console.error("Error during login:", error);
            }
        } else {
            console.log("Form contains validation errors or empty fields.");
        }

        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setFormErrors((prevState) => ({
                ...prevState,
                email: "Please enter a valid email address.",
            }));
        } else if (name === "password" && value.length < 8) {
            setFormErrors((prevState) => ({
                ...prevState,
                password: "Password must be at least 8 characters long.",
            }));
        } else {
            setFormErrors((prevState) => ({
                ...prevState,
                [name]: "",
            }));
        }
    };

    const isFormDisabled =
        Object.values(formErrors).some((error) => error !== "") ||
        formData.email.trim() === "" ||
        formData.password.trim() === "";

    return (
        <div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="card w-50 my-5 shadow-sm">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <small className="text-danger">{formErrors.email}</small>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <small className="text-danger">{formErrors.password}</small>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-100 ${isLoading ? "disabled" : ""}`}
                            disabled={isFormDisabled || isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p>
                            Don't have an account?{" "}
                            <NavLink to="/register" className="text-decoration-none">
                                Register
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
