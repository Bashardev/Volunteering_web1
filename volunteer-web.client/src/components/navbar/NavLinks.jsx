import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import AuthContext
import "./NavLinks.css";

export default function NavLinks() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Calls logout from AuthContext
        navigate("/login");
    };

    const navlinks = [
        { destination: "/about", name: "About" },
        { destination: "/volunteer-posts", name: "Posts" },
        isLoggedIn
            ? { destination: "/dashboard", name: "Dashboard" }
            : { destination: "/login", name: "Login" },
        { destination: "/volunteering-register", name: "Want Volunteers?", styling: "bg-success rounded-pill p-3" },
    ];

    return (
        <div>
            {navlinks.map((link) => (
                <NavLink key={link.name} className={`mx-3 custom-link ${link.styling || ""}`} to={link.destination}>
                    {link.name}
                </NavLink>
            ))}
            {isLoggedIn && (
                <button onClick={handleLogout} className="btn btn-link mx-3 custom-link text-decoration-none">
                    Logout
                </button>
            )}
        </div>
    );
}
