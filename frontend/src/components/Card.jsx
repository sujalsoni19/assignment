export default function Card({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200">
      <h3 className="text-lg font-medium text-slate-800 mb-2">
        {title}
      </h3>
      <p className="text-slate-500 text-sm">
        {description}
      </p>
    </div>
  );
}
