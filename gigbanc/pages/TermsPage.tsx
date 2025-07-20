import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <div className="prose prose-indigo max-w-none text-gray-700 space-y-4">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>
          Welcome to gigbanc.shop ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
        </p>

        <h2 className="text-2xl font-bold pt-4">1. Our Service</h2>
        <p>
          gigbanc.shop provides a platform for users to purchase mobile data plans for major Nigerian telecommunication networks (including MTN, Airtel, and Glo). Our service is designed to be fast, simple, and does not require user registration or account creation.
        </p>

        <h2 className="text-2xl font-bold pt-4">2. User Obligations</h2>
        <p>
          You agree to provide accurate, current, and complete information for all purchases. This is especially critical for the recipient's phone number.
        </p>
        <p>
          <strong>You are solely responsible for ensuring the phone number you enter is correct.</strong> Transactions are processed automatically and are irreversible. We are not liable for any loss or damages arising from you providing an incorrect phone number.
        </p>

        <h2 className="text-2xl font-bold pt-4">3. Payments and Refunds</h2>
        <p>
          All payments are processed securely through our third-party payment gateway, Paystack. We do not store your credit/debit card information on our servers.
        </p>
        <p>
          <strong>All sales are final.</strong> Because data plans are delivered instantly and automatically, we do not offer refunds or cancellations once a purchase is completed.
        </p>
        <p>
          The only exception is in the case of a verifiable technical failure originating from our system where a payment was successfully processed, but the data plan was not delivered to the correct phone number you provided. If you believe this has occurred, please contact our support team immediately with your transaction details. We do not issue refunds for delays caused by network providers or for any purchases made to an incorrect phone number.
        </p>
        
        <h2 className="text-2xl font-bold pt-4">4. Prohibited Activities</h2>
        <p>
          You are prohibited from using the service for any unlawful purpose, including but not limited to fraudulent transactions. You agree not to disrupt or interfere with the security or accessibility of the service.
        </p>
        
        <h2 className="text-2xl font-bold pt-4">5. Service Availability</h2>
        <p>
          We strive to ensure our service is available 24/7. However, we do not guarantee that the service will operate without interruption or errors. Service availability may be affected by factors outside our control, such as network provider outages, payment gateway maintenance, or other force majeure events. We are not liable for any inconvenience or loss resulting from service interruptions.
        </p>

        <h2 className="text-2xl font-bold pt-4">6. Limitation of Liability</h2>
        <p>
          In no event shall gigbanc.shop be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory.
        </p>

        <h2 className="text-2xl font-bold pt-4">7. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-bold pt-4">8. Contact Us</h2>
        <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:support@gigbanc.shop" className="text-indigo-600 hover:underline">support@gigbanc.shop</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;