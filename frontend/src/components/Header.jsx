import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext.jsx";
import api from "../api/axios";

export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/api/users/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <header className="w-full p-2 sm:p-4 backdrop-blur-lg border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link to="/" className="text-xl sm:text-5xl font-bold">
          TaskTarget
        </Link>

        <nav className="flex gap-4 text-md sm:gap-12 sm:text-2xl">
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
