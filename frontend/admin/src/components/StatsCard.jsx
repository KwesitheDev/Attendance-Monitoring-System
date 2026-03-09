import React from "react";
import Card from "./Card";

const StatsCard = ({ title, icon: Icon, value, subtitle }) => {
  return (
    <Card>
      <div>
        <h2 className="text-gray-400 mb-4 flex text-sm justify-between items-center">
          {title}
          {Icon && (
            <span>
              <Icon className=" -mt-0.5" />
            </span>
          )}
        </h2>
        <p className="text-xl font-semibold">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </Card>
  );
};

export default StatsCard;
