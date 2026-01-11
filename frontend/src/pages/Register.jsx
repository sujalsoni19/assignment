import { useForm } from "react-hook-form";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);

      await api.post("/api/users/register", formData);
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div
      onClick={() => navigate("/")}
      className="fixed inset-0 px-2 flex items-center justify-center bg-black/80"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-8 rounded-lg border"
      >
        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-lg font-medium text-center">Create account</h2>
          <p>
            Already have an account{" "}
            <Link to="/login" className="underline text-slate-800">
              login
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
            />
            <p className="text-sm text-red-500 min-h-4">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="w-full border px-3 py-2 rounded"
            />
            <p className="text-sm text-red-500 min-h-4">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters required" },
              })}
              type="password"
              placeholder="Password"
              className="w-full border px-3 py-2 rounded"
            />
            <p className="text-sm text-red-500 min-h-4">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <label htmlFor="avatar">Upload your avatar:</label>
            <input
              type="file"
              id="avatar"
              accept="image/png, image/jpeg"
              {...register("avatar", {
                required: "Avatar is required",
                validate: {
                  fileType: (files) =>
                    ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                    "Only JPG or PNG images allowed",
                },
              })}
              className="
                        w-full text-sm
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                      file:bg-slate-100 file:text-slate-700
                      hover:file:bg-slate-200
                        cursor-pointer "
            />
            <p className="text-sm text-red-500 min-h-4">
              {errors.avatar?.message}
            </p>
          </div>

          <button className="w-full bg-slate-800 text-white py-2 rounded">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
