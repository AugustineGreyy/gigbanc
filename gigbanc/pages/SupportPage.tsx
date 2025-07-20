import React, { useState } from 'react';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
      <button
        className="flex justify-between items-center w-full p-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-md font-medium text-gray-800">{question}</span>
        <svg
          className={`w-5 h-5 text-indigo-500 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="px-5 pb-5 text-gray-600">
            {children}
        </div>
      </div>
    </div>
  );
};

const SupportPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Support & FAQ</h1>
        <p className="mt-2 text-lg text-gray-600">
          Have questions? We're here to help. Find answers to common questions below.
        </p>
      </div>

      <div className="mt-12 bg-gray-50/50 p-8 md:p-12 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FaqItem question="How long does it take to receive my data?">
            <p>
              Transactions are typically instant. In most cases, you will receive your data plan within a few seconds of a successful payment. However, occasional network delays from the provider (MTN, Airtel, Glo) might cause a slight delay.
            </p>
          </FaqItem>
          <FaqItem question="How can I check my data balance?">
            <p>You can check your data balance by dialing the specific USSD code for your network provider:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>MTN:</strong> Dial *323# or *461*4#</li>
                <li><strong>Airtel:</strong> Dial *323#</li>
                <li><strong>Glo:</strong> Dial *323# or *127*0#</li>
            </ul>
          </FaqItem>
          <FaqItem question="What payment methods do you accept?">
            <p>
              We accept a variety of payment methods through our secure payment partner, Paystack. This includes:
            </p>
             <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Debit/Credit Cards (Visa, Mastercard, Verve)</li>
                <li>Bank Transfer</li>
                <li>USSD Payment</li>
            </ul>
          </FaqItem>
           <FaqItem question="Can I buy a data plan for a friend or family member?">
            <p>
              Absolutely! You can purchase data for any number. During the purchase process, simply enter the recipient's phone number instead of your own. Please make sure to double-check the number for accuracy before completing the payment.
            </p>
          </FaqItem>
          <FaqItem question="Do your data plans work on all devices?">
            <p>
              Yes, our data plans work on all internet-enabled devices, including smartphones (iPhone, Android), modems, routers, and MiFi devices. As long as your device is compatible with the SIM card of the network you choose, the data plan will work.
            </p>
          </FaqItem>
          <FaqItem question="What happens if I enter the wrong phone number?">
            <p>
              Unfortunately, we cannot reverse a transaction sent to an incorrect number. The system is automated, and the data is sent instantly. Please double-check and confirm your phone number carefully in the purchase modal before making a payment.
            </p>
          </FaqItem>
          <FaqItem question="Is my payment information secure?">
            <p>
              Absolutely. We use Paystack, a leading and highly secure payment gateway in Nigeria, to process all transactions. We do not store your card details on our servers. All payment information is handled directly by Paystack's secure infrastructure.
            </p>
          </FaqItem>
          <FaqItem question="I paid, but I haven't received my data. What should I do?">
            <p>
              First, please wait up to 15 minutes as there might be a network delay. If you still haven't received your data, please contact our support team with your transaction reference number, the phone number you topped up, and your email address. We will investigate immediately.
            </p>
          </FaqItem>
          <FaqItem question="My payment failed, but I was debited. What should I do?">
            <p>
              In rare cases, a payment might fail after you've been debited. These are usually automatically reversed by your bank within 24 hours. If the amount is not reversed after this period, please contact your bank first. If the issue persists, contact our support with the transaction details, and we will assist in tracking it with our payment provider.
            </p>
          </FaqItem>
        </div>
      </div>
      
      <div className="mt-12 text-center bg-indigo-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800">Still need help?</h2>
        <p className="mt-2 text-gray-600">
          Our support team is available to assist you.
        </p>
        <div className="mt-4">
          <a
            href="mailto:support@gigbanc.shop"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;