import React from 'react';
import { DataPlan } from '../types';
import { NETWORKS } from '../constants';

interface DataCardProps {
  plan: DataPlan;
  onSelect: (plan: DataPlan) => void;
  animationDelay?: string;
}

const DataCard: React.FC<DataCardProps> = ({ plan, onSelect, animationDelay }) => {
  const networkInfo = NETWORKS[plan.network];

  return (
    <div
      className="relative group h-full bg-white border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 opacity-0 animate-slide-in-up"
      style={{ animationDelay, animationFillMode: 'forwards' }}
    >
      <div className={`h-2 ${networkInfo.primaryColor}`}></div>
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{plan.duration}</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{plan.name}</h3>
          </div>
          <img src={networkInfo.logo} alt={`${plan.network} logo`} className="h-8 object-contain" />
        </div>
        <div className="mt-6 flex justify-between items-baseline">
          <p className="text-4xl font-extrabold text-gray-900">
            ₦{plan.price.toLocaleString()}
          </p>
          <p className="text-lg font-semibold text-gray-600">{plan.size}GB</p>
        </div>
        <div className="mt-auto pt-4">
            <button
              onClick={() => onSelect(plan)}
              className="w-full text-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 group-hover:scale-105"
            >
              Buy Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default DataCard;