import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const ContactSupportCard: React.FC = () => {
  return (
    <div className="bg-teal-50/70 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center">
      <div className="flex-shrink-0 bg-teal-100 p-4 rounded-full">
        <Icon name="life-buoy" className="h-10 w-10 text-teal-600" />
      </div>
      <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-800">Still have questions?</h2>
      <p className="mt-4 text-gray-600 max-w-xl mx-auto">
        Our support team is just a click away. Find answers in our extensive FAQ or get in touch with us directly for personalized assistance.
      </p>
      <div className="mt-8">
        <Link
          to="/support"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-bold rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          Visit Support Center
        </Link>
      </div>
    </div>
  );
};

export default ContactSupportCard;
