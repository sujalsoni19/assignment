import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post("/api/users/change-password", {
        oldpassword: data.oldpassword,
        newpassword: data.newpassword,
      });

      alert("Password changed successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid current password");
    }
  };

  return (
    <div
      onClick={() => navigate("/dashboard")}
      className="fixed inset-0 flex items-center px-2 justify-center bg-black/80"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-8 rounded-lg border"
      >
        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-lg font-medium text-center">Change password</h2>
          <p>
            <Link to="/dashboard" className="underline text-slate-800">
              Back to dashboard
            </Link>
          </p>
        </div>

        <div className="space-y-4">

          <div>
            <input
              {...register("oldpassword", {
                required: "Current password is required",
              })}
              type="password"
              placeholder="Current password"
              className="w-full border px-3 py-2 rounded"
            />
            <p className="text-sm text-red-500 min-h-4">
              {errors.oldpassword?.message}
            </p>
          </div>

          <div>
            <input
              {...register("newpassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              type="password"
              placeholder="New password"
              className="w-full border px-3 py-2 rounded"
            />
            <p className="text-sm text-red-500 min-h-4">
              {errors.newpassword?.message}
            </p>
          </div>

          <button className="w-full bg-slate-800 text-white py-2 rounded">
            Update password
          </button>

        </div>
      </form>
    </div>
  );
}
