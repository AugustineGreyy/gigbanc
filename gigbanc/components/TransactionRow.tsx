import React from 'react';
import { Transaction } from '../types';
import { NETWORKS } from '../constants';
import Icon from './Icon';

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const networkInfo = NETWORKS[transaction.network];

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <tr className={`border-b border-gray-200 transition-colors duration-300 hover:bg-gray-100/50 ${transaction.isNew ? 'animate-new-row' : ''}`}>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full object-contain" src={networkInfo.logo} alt={`${networkInfo.name} logo`} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{transaction.planName}</div>
            <div className="text-sm text-gray-500">{transaction.network}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="text-sm text-gray-900">{transaction.phone}</div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          ₦{transaction.amount.toLocaleString()}
        </span>
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-right text-sm text-gray-500">
        {timeAgo(transaction.timestamp)}
      </td>
    </tr>
  );
};

export default TransactionRow;