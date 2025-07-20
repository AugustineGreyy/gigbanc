import { Network, DataPlan, Transaction } from './types';

export const NETWORKS = {
  [Network.MTN]: {
    name: Network.MTN,
    logo: 'https://i.postimg.cc/hJLxpNtg/MTN-Logo-PNG-Transparent-Image.png',
    primaryColor: 'bg-yellow-400',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-400',
  },
  [Network.AIRTEL]: {
    name: Network.AIRTEL,
    logo: 'https://i.postimg.cc/9wWvD3rf/airtel-logo.png',
    primaryColor: 'bg-red-600',
    textColor: 'text-red-600',
    borderColor: 'border-red-600',
  },
  [Network.GLO]: {
    name: Network.GLO,
    logo: 'https://i.postimg.cc/HVJMxRYh/glo-logo.png',
    primaryColor: 'bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
  },
};

export const DATA_PLANS: DataPlan[] = [
  // 30-Day Plans
  { id: 'mtn-5gb-30d', network: Network.MTN, size: 5, price: 550, duration: '30 Days', name: '5GB Data Plan' },
  { id: 'mtn-10gb-30d', network: Network.MTN, size: 10, price: 1100, duration: '30 Days', name: '10GB Data Plan' },
  { id: 'mtn-20gb-30d', network: Network.MTN, size: 20, price: 2000, duration: '30 Days', name: '20GB Data Plan' },
  { id: 'mtn-50gb-30d', network: Network.MTN, size: 50, price: 4000, duration: '30 Days', name: '50GB Data Plan' },
  { id: 'airtel-5gb-30d', network: Network.AIRTEL, size: 5, price: 750, duration: '30 Days', name: '5GB Data Plan' },
  { id: 'airtel-10gb-30d', network: Network.AIRTEL, size: 10, price: 1500, duration: '30 Days', name: '10GB Data Plan' },
  { id: 'airtel-20gb-30d', network: Network.AIRTEL, size: 20, price: 3000, duration: '30 Days', name: '20GB Data Plan' },
  { id: 'airtel-50gb-30d', network: Network.AIRTEL, size: 50, price: 5000, duration: '30 Days', name: '50GB Data Plan' },
  { id: 'glo-5gb-30d', network: Network.GLO, size: 5, price: 450, duration: '30 Days', name: '5GB Data Plan' },
  { id: 'glo-10gb-30d', network: Network.GLO, size: 10, price: 900, duration: '30 Days', name: '10GB Data Plan' },
  { id: 'glo-20gb-30d', network: Network.GLO, size: 20, price: 2000, duration: '30 Days', name: '20GB Data Plan' },
  { id: 'glo-50gb-30d', network: Network.GLO, size: 50, price: 3500, duration: '30 Days', name: '50GB Data Plan' },
  // 3-Month Plans
  { id: 'mtn-50gb-3m', network: Network.MTN, size: 50, price: 5000, duration: '3 Months', name: '50GB Quarterly Plan' },
  { id: 'mtn-75gb-3m', network: Network.MTN, size: 75, price: 7000, duration: '3 Months', name: '75GB Quarterly Plan' },
  { id: 'mtn-100gb-3m', network: Network.MTN, size: 100, price: 10000, duration: '3 Months', name: '100GB Quarterly Plan' },
  { id: 'airtel-50gb-3m', network: Network.AIRTEL, size: 50, price: 7000, duration: '3 Months', name: '50GB Quarterly Plan' },
  { id: 'airtel-75gb-3m', network: Network.AIRTEL, size: 75, price: 10000, duration: '3 Months', name: '75GB Quarterly Plan' },
  { id: 'airtel-100gb-3m', network: Network.AIRTEL, size: 100, price: 12000, duration: '3 Months', name: '100GB Quarterly Plan' },
  { id: 'glo-50gb-3m', network: Network.GLO, size: 50, price: 5000, duration: '3 Months', name: '50GB Quarterly Plan' },
  { id: 'glo-75gb-3m', network: Network.GLO, size: 75, price: 7000, duration: '3 Months', name: '75GB Quarterly Plan' },
  { id: 'glo-100gb-3m', network: Network.GLO, size: 100, price: 10000, duration: '3 Months', name: '100GB Quarterly Plan' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'txn1', network: Network.MTN, planName: '10GB Data Plan', amount: 1100, phone: '0803***1234', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
  { id: 'txn2', network: Network.AIRTEL, planName: '5GB Data Plan', amount: 750, phone: '0708***5678', timestamp: new Date(Date.now() - 5 * 60 * 1000) },
  { id: 'txn3', network: Network.GLO, planName: '20GB Data Plan', amount: 2000, phone: '0805***9012', timestamp: new Date(Date.now() - 8 * 60 * 1000) },
  { id: 'txn4', network: Network.MTN, planName: '50GB Quarterly Plan', amount: 5000, phone: '0810***3456', timestamp: new Date(Date.now() - 12 * 60 * 1000) },
  { id: 'txn5', network: Network.GLO, planName: '10GB Data Plan', amount: 900, phone: '0811***7890', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
];

export const PAYSTACK_PUBLIC_KEY = 'pk_test_4b4167f6b8874024c31e332ecfc76c5505484e4f';