

import React, { useState, useContext } from 'react';
import { Network, DataPlan } from '../types';
import { DATA_PLANS, NETWORKS } from '../constants';
import DataCard from '../components/DataCard';
import { AppContext } from '../App';
import DisputeTransactionModal from '../components/DisputeTransactionModal';
import Icon from '../components/Icon';
import ContactSupportCard from '../components/ContactSupportCard';

const PurchasePage: React.FC = () => {
  const [activeNetwork, setActiveNetwork] = useState<Network>(Network.MTN);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const appContext = useContext(AppContext);

  const plansByNetwork = DATA_PLANS.filter(plan => plan.network === activeNetwork);
  const plans30Day = plansByNetwork.filter(p => p.duration === '30 Days');
  const plans3Month = plansByNetwork.filter(p => p.duration === '3 Months');

  const handleSelectPlan = (plan: DataPlan) => {
    appContext?.openPurchaseModal(plan);
  };
  
  const TabButton: React.FC<{network: Network}> = ({network}) => {
    const info = NETWORKS[network];
    const isActive = activeNetwork === network;
    return (
        <button
          onClick={() => setActiveNetwork(network)}
          className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 text-sm md:text-base font-bold border-b-4 transition-all duration-300 ${
            isActive ? `${info.borderColor} text-gray-900` : 'border-transparent text-gray-500 hover:bg-gray-100/70'
          }`}
        >
          <img src={info.logo} alt={`${info.name} logo`} className="h-6 object-contain" />
          <span>{info.name}</span>
        </button>
    );
  }

  return (
    <div>
      <div className="text-center opacity-0 animate-fade-in" style={{animationFillMode: 'forwards'}}>
        <h1 className="text-4xl font-extrabold text-gray-900">Choose Your Data Plan</h1>
        <p className="mt-2 text-lg text-gray-600">Get connected in three simple steps.</p>
      </div>
      
      {/* Step-by-step instructions */}
      <div className="mt-8 max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-left">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 opacity-0 animate-slide-in-up transform hover:-translate-y-1 transition-all" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-2xl">1</div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Select Plan</h3>
                </div>
            </div>
            <p className="mt-3 text-gray-600">Browse our competitive plans and pick the one that fits your needs.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 opacity-0 animate-slide-in-up transform hover:-translate-y-1 transition-all" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-2xl">2</div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Enter Number</h3>
                </div>
            </div>
            <p className="mt-3 text-gray-600">Provide the 11-digit phone number you want to top up.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 opacity-0 animate-slide-in-up transform hover:-translate-y-1 transition-all" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-2xl">3</div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Pay Securely</h3>
                </div>
            </div>
            <p className="mt-3 text-gray-600">Complete your purchase using our fast and secure payment system.</p>
        </div>
      </div>

      <div className="mt-12 max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden opacity-0 animate-fade-in" style={{animationDelay: '400ms', animationFillMode: 'forwards'}}>
        <div className="flex">
          <TabButton network={Network.MTN} />
          <TabButton network={Network.AIRTEL} />
          <TabButton network={Network.GLO} />
        </div>
      </div>

      <div key={activeNetwork}>
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 opacity-0 animate-fade-in" style={{animationDelay: '500ms', animationFillMode: 'forwards'}}>30 Day Plans</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans30Day.map((plan, index) => (
              <DataCard key={plan.id} plan={plan} onSelect={handleSelectPlan} animationDelay={`${500 + index * 50}ms`} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 opacity-0 animate-fade-in" style={{animationDelay: '700ms', animationFillMode: 'forwards'}}>Quarterly Plans</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans3Month.map((plan, index) => (
               <DataCard key={plan.id} plan={plan} onSelect={handleSelectPlan} animationDelay={`${700 + index * 50}ms`} />
            ))}
          </div>
        </div>
      </div>

      {/* Dispute Section */}
      <div className="mt-16 py-12 bg-red-50/70 rounded-2xl">
        <div className="text-center max-w-2xl mx-auto px-4">
            <Icon name="exclamation-triangle" className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Problem with a Transaction?</h2>
            <p className="mt-2 text-gray-600">If you've encountered an issue with a previous purchase, such as not receiving your data or a payment problem, you can file a dispute. Our support team will investigate and get back to you promptly.</p>
            <button 
                onClick={() => setIsDisputeModalOpen(true)}
                className="mt-6 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 transition-transform transform hover:scale-105"
            >
                File a Dispute
            </button>
        </div>
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-4">
        <ContactSupportCard />
      </div>
      
      <DisputeTransactionModal 
        isOpen={isDisputeModalOpen} 
        onClose={() => setIsDisputeModalOpen(false)} 
      />
    </div>
  );
};

export default PurchasePage;