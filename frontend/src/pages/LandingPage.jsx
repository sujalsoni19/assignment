import features from "../data/features.json";
import Card from "../components/Card.jsx";
import { useAuth } from "../context/Authcontext.jsx";
import { Link } from "react-router-dom";

export default function LandingPage() {
//   const { user } = useAuth();

  return (
    <div className=" bg-slate-50 flex flex-col py-4 items-center px-6">
      <div className="flex flex-col items-center justify-center my-12 sm:my-24 text-center">
        <h1 className="text-2xl md:text-5xl font-semibold text-slate-800">
          Your tasks, beautifully organized
        </h1>
        <p className="mt-4 text-slate-500">
          A simple, calm place to organize what matters.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

      <div className="mt-7 sm:mt-14 mb-6">
        <Link to="/register">
            <button className="p-4 text-center rounded-4xl cursor-pointer text-white bg-sky-500">
              Get Started
            </button>
          </Link>
        {/* {!user && (
          <Link to="/register">
            <button className="p-4 text-center rounded-4xl cursor-pointer text-white bg-sky-500">
              Get Started
            </button>
          </Link>
        )} */}
      </div>
    </div>
  );
}
