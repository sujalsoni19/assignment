import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../context/Authcontext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post("/api/users/login", data);
      const res = await api.get("/api/users/me");
      setUser(res.data.data);
      navigate("/dashboard");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      onClick={() => navigate("/")}
      className="fixed inset-0 flex items-center px-2 justify-center bg-black/80"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-8 rounded-lg border"
      >
        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-lg font-medium text-center">Login</h2>
          <p>
            Don't have an account{" "}
            <Link to="/register" className="underline text-slate-800">
              register
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              type="email"
              className="w-full border px-3 py-2 rounded"
            />
            <p className="text-sm text-red-500 min-h-4">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="w-full border px-3 py-2 rounded"
            />
            <p className="text-sm text-red-500 min-h-4">
              {errors.password?.message}
            </p>
          </div>

          <button className="w-full bg-slate-800 text-white py-2 rounded">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
