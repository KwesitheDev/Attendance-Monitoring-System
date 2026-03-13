import React from "react";

const StatsCard = ({
  title,
  icon: Icon,
  value,
  subtitle,
  color = "indigo",
}) => {
  const colorVariants = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        {Icon && (
          <div className={`p-1.5 rounded-lg border ${colorVariants[color]}`}>
            <Icon size={16} className="-pt-8" />
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
};

export default StatsCard;
