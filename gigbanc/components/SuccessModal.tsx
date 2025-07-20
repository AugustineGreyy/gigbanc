
import React, { useEffect } from 'react';
import { DataPlan } from '../types';
import { NETWORKS } from '../constants';
import Icon from './Icon';

interface SuccessModalProps {
  details: {
    plan: DataPlan;
    phone: string;
  } | null;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ details, onClose }) => {
    
  useEffect(() => {
    if (details) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [details]);

  if (!details) return null;

  const { plan, phone } = details;
  const networkInfo = NETWORKS[plan.network];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="success-modal-title">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-all opacity-0 animate-slide-in-up text-center p-8" style={{animationDuration: '0.4s', animationFillMode: 'forwards'}} onClick={e => e.stopPropagation()}>
        
        <div className="flex justify-center mb-5">
            <div className="relative">
                <Icon name="check-circle" className="h-24 w-24 text-green-500" />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                    <img src={networkInfo.logo} alt={networkInfo.name} className="h-8 w-8 object-contain" />
                </div>
            </div>
        </div>

        <h2 id="success-modal-title" className="text-2xl md:text-3xl font-bold text-gray-900">Payment Successful!</h2>
        
        <p className="mt-4 text-gray-600 text-lg">
            Your <strong>{plan.name}</strong> has been sent to
        </p>
        <p className="text-2xl font-bold text-indigo-600 mt-1">{phone}</p>
        
        <p className="mt-4 text-sm text-gray-500">
            The transaction was successful and you will receive an SMS confirmation shortly. Thank you for choosing gigbanc.shop!
        </p>
        
        <div className="mt-8">
             <button
                onClick={onClose}
                className="w-full px-6 py-4 text-lg font-bold text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
              >
                Done
              </button>
        </div>
         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
          <Icon name="close" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
