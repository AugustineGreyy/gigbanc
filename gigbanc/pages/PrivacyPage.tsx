import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-indigo max-w-none text-gray-700 space-y-4">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>
          Your privacy is important to us. This Privacy Policy explains how gigbanc.shop ("we," "our," or "us") collects, uses, and shares information about you when you use our website and services.
        </p>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
          <h3 className="text-lg font-bold text-indigo-900">A Note on Simplicity: No User Accounts</h3>
          <p className="mt-2 text-indigo-800">
            We are committed to your privacy and a hassle-free experience. That's why <strong>we do not require you to create an account</strong> to use our service. This approach significantly minimizes the personal data we need to collect and store, as we only handle information on a per-transaction basis.
          </p>
        </div>

        <h2 className="text-2xl font-bold pt-4">1. Information We Collect</h2>
        <p>We only collect the information absolutely necessary to provide our service. This includes:</p>
        <ul className="list-disc list-inside">
          <li><strong>Phone Number:</strong> The number you provide to receive the data or airtime top-up.</li>
          <li><strong>Email Address:</strong> Your email is used by our payment processor (Paystack) to send you a receipt for your transaction. We may also use it to communicate with you about a specific transaction if an issue arises.</li>
          <li><strong>Transaction Information:</strong> We keep a record of the plan you purchased, the transaction amount, and the transaction reference from our payment processor.</li>
        </ul>
        <p>We do not collect or store your full debit/credit card details. This information is handled securely and exclusively by our payment partner, Paystack.</p>

        <h2 className="text-2xl font-bold pt-4">2. How We Use Your Information</h2>
        <p>We use your information for the sole purpose of operating our service:</p>
        <ul className="list-disc list-inside">
          <li><strong>To Fulfill Your Purchase:</strong> To send the data plan to the phone number you provided.</li>
          <li><strong>To Process Payments:</strong> To securely process your transaction via Paystack.</li>
          <li><strong>To Provide Customer Support:</strong> To identify your transaction and assist you if you contact us with an issue or file a dispute.</li>
          <li><strong>To Send Transactional Communications:</strong> To provide you with a receipt of your purchase.</li>
        </ul>
        
        <h2 className="text-2xl font-bold pt-4">3. How We Share Your Information</h2>
        <p>We do not sell your personal information. We only share it with essential third-party partners to make our service work:</p>
        <ul className="list-disc list-inside">
          <li><strong>With Network Providers:</strong> We must share the phone number and selected plan details with the relevant telecommunications provider (e.g., MTN, Airtel, Glo) to deliver the data plan you purchased.</li>
          <li><strong>With Our Payment Processor:</strong> We share necessary transaction details with Paystack to authorize and process your payment securely.</li>
          <li><strong>For Legal and Safety Reasons:</strong> We may share information if we believe disclosure is required by law, to protect the rights and safety of our users and the public, or to prevent fraudulent or illegal activity.</li>
        </ul>
        
        <h2 className="text-2xl font-bold pt-4">4. Data Retention and Security</h2>
        <p>
          We retain transaction records for a limited time to provide customer support and for financial accounting. We are committed to protecting your data and use appropriate technical and organizational measures to safeguard it from unauthorized access, loss, or misuse.
        </p>

        <h2 className="text-2xl font-bold pt-4">5. Your Rights</h2>
        <p>
          You have the right to request access to the personal information we hold about you or to request that we delete your transactional data. To make such a request, please contact our support team.
        </p>
        
        <h2 className="text-2xl font-bold pt-4">6. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
        </p>

        <h2 className="text-2xl font-bold pt-4">7. Contact Us</h2>
        <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@gigbanc.shop" className="text-indigo-600 hover:underline">support@gigbanc.shop</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;