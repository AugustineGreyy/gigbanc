

import React, { useState, useCallback, useEffect } from 'react';
import { DataPlan } from '../types';
import { NETWORKS, PAYSTACK_PUBLIC_KEY } from '../constants';
import Icon from './Icon';

interface PurchaseModalProps {
  plan: DataPlan | null;
  initialPhone?: string;
  onClose: () => void;
  onSuccess: (details: { plan: DataPlan; phone: string }) => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ plan, initialPhone, onClose, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [confirmPhone, setConfirmPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');
  const [discountMessageType, setDiscountMessageType] = useState<'success' | 'error' | ''>('');


  useEffect(() => {
    if (plan) {
      setPhone(initialPhone || '');
      setConfirmPhone(initialPhone || '');
      setEmail('');
      setError('');
      setIsPaying(false);
      setDiscountCode('');
      setDiscountAmount(0);
      setDiscountMessage('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [plan, initialPhone]);

  const finalPrice = plan ? plan.price - discountAmount : 0;

  const handleApplyDiscount = () => {
    if (!plan) return;

    if (discountCode.toUpperCase() === 'GIG10') {
      const discount = plan.price * 0.10;
      setDiscountAmount(discount);
      setDiscountMessage(`Success! ₦${discount.toLocaleString()} discount applied.`);
      setDiscountMessageType('success');
    } else {
      setDiscountAmount(0);
      setDiscountMessage('Invalid discount code.');
      setDiscountMessageType('error');
    }
  };

  const handlePayment = useCallback(() => {
    if (!plan) return;

    const phoneRegex = /^(07|08|09)\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 11-digit number starting with 07, 08, or 09.');
      return;
    }

    if (phone !== confirmPhone) {
      setError('Phone numbers do not match.');
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }
    setError('');
    setIsPaying(true);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: finalPrice * 100, // Paystack amount is in kobo
      ref: '' + Math.floor((Math.random() * 1000000000) + 1),
      onClose: () => {
        setIsPaying(false);
      },
      callback: (response: any) => {
        if (response.status === 'success') {
          onSuccess({ plan, phone });
        } else {
          setError('Payment failed. Please try again.');
        }
        setIsPaying(false);
      },
    });

    handler.openIframe();

  }, [plan, phone, confirmPhone, email, onSuccess, finalPrice]);

  if (!plan) return null;

  const networkInfo = NETWORKS[plan.network];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md m-4 transform transition-all opacity-0 animate-fade-in-down" style={{animationFillMode: 'forwards'}} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <Icon name="close" className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4">
            <img src={networkInfo.logo} alt={networkInfo.name} className="h-10 object-contain" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-gray-500">{plan.network} - {plan.duration}</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08012345678" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="confirmPhone" className="block text-sm font-medium text-gray-700">Confirm Number</label>
              <input type="tel" id="confirmPhone" value={confirmPhone} onChange={(e) => setConfirmPhone(e.target.value)} placeholder="08012345678" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount Code (Optional)</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="text" id="discount" placeholder="Enter discount code" value={discountCode} onChange={e => setDiscountCode(e.target.value)} className="flex-1 min-w-0 block w-full px-4 py-2 bg-white border border-gray-300 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  <button onClick={handleApplyDiscount} type="button" className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    Apply
                  </button>
                </div>
                {discountMessage && <p className={`mt-2 text-sm ${discountMessageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>{discountMessage}</p>}
             </div>
          </div>
          
          <div className="mt-6 py-4 px-6 bg-indigo-50 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-gray-600">
                  <span>Price</span>
                  <span>₦{plan.price.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                      <span>Discount</span>
                      <span>- ₦{discountAmount.toLocaleString()}</span>
                  </div>
              )}
              <div className="border-t border-indigo-200 my-2"></div>
              <div className="flex justify-between items-center text-lg font-bold text-indigo-900">
                  <span>Total</span>
                  <span>₦{finalPrice.toLocaleString()}</span>
              </div>
          </div>

          {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}

          <div className="mt-6">
            <button
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
            >
              {isPaying ? 'Processing...' : `Pay ₦${finalPrice.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
