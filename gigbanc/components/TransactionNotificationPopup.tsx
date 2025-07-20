import React, { useEffect } from 'react';
import { TransactionNotification } from '../types';
import { NETWORKS } from '../constants';
import Icon from './Icon';

interface Props {
  notification: TransactionNotification;
  onClose: () => void;
}

const TransactionNotificationPopup: React.FC<Props> = ({ notification, onClose }) => {
  const networkInfo = NETWORKS[notification.network];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4400); // Duration should be slightly less than the animation's 4.5s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="w-full bg-white shadow-lg rounded-xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden animate-slide-in-out">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 object-contain" src={networkInfo.logo} alt={`${networkInfo.name} logo`} />
          </div>
          <div className="w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 truncate">
              New Purchase on {notification.network}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {notification.planName} for {notification.phone}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex p-1.5 rounded-full bg-green-100 text-green-700">
              <Icon name="check-circle" className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionNotificationPopup;