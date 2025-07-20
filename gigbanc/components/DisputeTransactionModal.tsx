

import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface DisputeTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DisputeTransactionModal: React.FC<DisputeTransactionModalProps> = ({ isOpen, onClose }) => {
  const [transactionId, setTransactionId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form on open
      setTransactionId('');
      setPhone('');
      setEmail('');
      setDate('');
      setReason('');
      setDetails('');
      setError('');
      setIsSubmitting(false);
      setIsSubmitted(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!transactionId || !phone || !email || !date || !reason) {
      setError('Please fill out all required fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    const phoneRegex = /^(07|08|09)\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 11-digit phone number.');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg m-4 transform transition-all opacity-0 animate-fade-in-down" style={{animationFillMode: 'forwards'}} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <Icon name="close" className="h-6 w-6" />
        </button>

        <div className="p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                  <Icon name="check-circle" className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Dispute Submitted</h2>
              <p className="mt-2 text-gray-600">Thank you. We have received your dispute and will review it shortly. You will receive an email confirmation and updates from our support team.</p>
              <button
                onClick={onClose}
                className="mt-6 w-full flex items-center justify-center px-6 py-3 text-lg font-bold text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-4 mb-6">
                <Icon name="exclamation-triangle" className="h-10 w-10 text-red-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dispute a Transaction</h2>
                  <p className="text-gray-500">Please provide the details of the transaction you wish to dispute.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">Transaction Reference*</label>
                      <input type="text" id="transactionId" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="e.g., 123456789" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                  </div>
                  <div>
                      <label htmlFor="dispute-phone" className="block text-sm font-medium text-gray-700">Phone Number*</label>
                      <input type="tel" id="dispute-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08012345678" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                  </div>
                  <div>
                      <label htmlFor="dispute-email" className="block text-sm font-medium text-gray-700">Email Address*</label>
                      <input type="email" id="dispute-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                  </div>
                  <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date of Transaction*</label>
                      <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                  </div>
                  <div className="md:col-span-2">
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Dispute*</label>
                      <select id="reason" value={reason} onChange={e => setReason(e.target.value)} className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm">
                          <option value="" disabled>Select a reason...</option>
                          <option value="not_received">Data/Airtime not received</option>
                          <option value="duplicate_charge">Duplicate transaction</option>
                          <option value="incorrect_amount">Incorrect amount charged</option>
                          <option value="payment_failed_debited">Payment failed but I was debited</option>
                          <option value="other">Other (please specify below)</option>
                      </select>
                  </div>
                  <div className="md:col-span-2">
                      <label htmlFor="details" className="block text-sm font-medium text-gray-700">Additional Details</label>
                      <textarea id="details" value={details} onChange={e => setDetails(e.target.value)} rows={3} placeholder="Provide any other relevant information..." className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                  </div>
              </div>

              {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-bold text-white bg-red-600 border border-transparent rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
                >
                  {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                  ) : (
                      <>
                        <Icon name="paper-airplane" className="h-5 w-5" />
                        Submit Dispute
                      </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeTransactionModal;
