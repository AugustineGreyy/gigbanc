
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DATA_PLANS, MOCK_TRANSACTIONS, NETWORKS } from '../constants';
import TransactionRow from '../components/TransactionRow';
import { AppContext } from '../App';
import { Network, DataPlan, Transaction } from '../types';
import Icon from '../components/Icon';
import DataCard from '../components/DataCard';
import StatsSection from '../components/StatsSection';
import ContactSupportCard from '../components/ContactSupportCard';

const QuickPurchaseForm: React.FC = () => {
    const appContext = useContext(AppContext);
    const [selectedNetwork, setSelectedNetwork] = useState<Network>(Network.MTN);
    const [availablePlans, setAvailablePlans] = useState<DataPlan[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const plans = DATA_PLANS.filter(p => p.network === selectedNetwork);
        setAvailablePlans(plans);
        if (plans.length > 0) {
            setSelectedPlanId(plans[0].id);
        } else {
            setSelectedPlanId('');
        }
    }, [selectedNetwork]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const phoneRegex = /^(07|08|09)\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setError('Please enter a valid 11-digit number starting with 07, 08, or 09.');
            return;
        }
        setError('');
        const plan = DATA_PLANS.find(p => p.id === selectedPlanId);
        if (plan && appContext) {
            appContext.openPurchaseModal(plan, phoneNumber);
        }
    };
    
    const selectedNetworkInfo = NETWORKS[selectedNetwork];

    return (
        <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">Quick Top-up</h3>
                <p className="text-sm text-gray-500 mt-1">Get data in seconds</p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-700">1. Select Network</label>
                    <div className="mt-2 grid grid-cols-3 gap-3">
                        {(Object.keys(NETWORKS) as Network[]).map(networkKey => {
                            const networkInfo = NETWORKS[networkKey];
                            const isSelected = selectedNetwork === networkKey;
                            return (
                                <button
                                    type="button"
                                    key={networkKey}
                                    onClick={() => setSelectedNetwork(networkKey)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 focus:outline-none ${
                                        isSelected
                                        ? `${networkInfo.borderColor} bg-white shadow-lg scale-105`
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                                >
                                    <img src={networkInfo.logo} alt={networkInfo.name} className="h-10 object-contain" />
                                    <span className={`mt-2 font-bold text-xs md:text-sm ${isSelected ? networkInfo.textColor : 'text-gray-700'}`}>{networkInfo.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <label htmlFor="plan" className="block text-sm font-medium text-gray-700">2. Choose Plan</label>
                    <select 
                        id="plan" 
                        value={selectedPlanId} 
                        onChange={e => setSelectedPlanId(e.target.value)} 
                        className={`mt-1 block w-full px-4 py-3 text-base bg-white border border-gray-300 focus:outline-none focus:ring-2 sm:text-sm rounded-lg transition-all duration-200 focus:${selectedNetworkInfo.borderColor.replace('border-', 'ring-')} focus:${selectedNetworkInfo.borderColor}`}
                    >
                        {availablePlans.map(plan => (
                             <option key={plan.id} value={plan.id}>
                                {plan.size}GB for ₦{plan.price} ({plan.duration})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">3. Enter Phone Number</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        value={phoneNumber} 
                        onChange={e => setPhoneNumber(e.target.value)} 
                        placeholder="08012345678" 
                        required 
                        className={`mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm transition-all duration-200 focus:${selectedNetworkInfo.borderColor.replace('border-', 'ring-')} focus:${selectedNetworkInfo.borderColor}`} 
                    />
                </div>

                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                <button 
                    type="submit" 
                    className="w-full flex items-center justify-center px-6 py-4 text-base font-bold text-white bg-indigo-700 hover:bg-indigo-800 border border-transparent rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-300 disabled:bg-indigo-500 disabled:cursor-not-allowed"
                    disabled={!selectedPlanId || !phoneNumber}
                >
                    Buy Data Now
                </button>
            </form>
        </div>
    );
};


const WhyChooseUs: React.FC = () => {
    const features = [
        { icon: 'bolt', title: 'Instant Delivery', description: 'Your data is delivered in seconds. No waiting time.' },
        { icon: 'shield-check', title: 'No Registration', description: 'No account needed. Purchase data quickly and hassle-free.' },
        { icon: 'tag', title: 'Best Prices', description: 'We offer the most competitive prices for all networks.' },
        { icon: 'clock', title: '24/7 Support', description: 'Our support team is always available to help you.' },
    ];
    return (
         <section className="py-16 bg-white/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose Us?</h2>
                <p className="mt-2 text-center text-gray-500 max-w-2xl mx-auto">We provide a reliable and efficient platform to keep you connected, always.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={feature.title} className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 opacity-0 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                            <div className="bg-indigo-100 text-indigo-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto">
                                <Icon name={feature.icon} className="h-8 w-8" />
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-gray-900">{feature.title}</h3>
                            <p className="mt-2 text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CallToAction: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative bg-indigo-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-0 animate-fade-in" style={{animationDelay: '300ms', animationFillMode: 'forwards'}}>
                <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 opacity-40 mix-blend-screen"></div>
            </div>
            <div className="relative max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 opacity-0 animate-slide-in-up" style={{animationDelay: '100ms', animationFillMode: 'forwards'}}>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Don't wait until you're disconnected.</span>
                    <span className="block mt-1 text-indigo-200">Top up your data today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-100">
                    Get instant access to affordable data plans for all major Nigerian networks.
                </p>
                <Link
                    to="/purchase"
                    className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 sm:w-auto transform transition-transform hover:scale-105 shadow-lg"
                >
                    Browse All Plans
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
};


const HomePage: React.FC = () => {
  const appContext = useContext(AppContext);

  const handleSelectPlan = (plan: DataPlan) => {
    appContext?.openPurchaseModal(plan);
  };
  
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  const generateRandomTransaction = (): Transaction => {
    const randomPlan = DATA_PLANS[Math.floor(Math.random() * DATA_PLANS.length)];
    const randomPhone = `0${['803', '706', '810', '901', '805', '705'][Math.floor(Math.random()*6)]}***${Math.floor(1000 + Math.random() * 9000)}`;
    return {
        id: `txn_${Date.now()}_${Math.random()}`,
        network: randomPlan.network,
        planName: randomPlan.name,
        amount: randomPlan.price,
        phone: randomPhone,
        timestamp: new Date(),
        isNew: true,
    };
  };

  useEffect(() => {
    let timeoutId: number;

    const scheduleNextTransaction = () => {
        // Random delay between 7 and 15 seconds
        const randomDelay = Math.floor(Math.random() * (15000 - 7000 + 1)) + 7000; 

        timeoutId = window.setTimeout(() => {
            const newTx = generateRandomTransaction();
            if (appContext) {
                appContext.addNotification(newTx);
            }
            setTransactions(prev => [newTx, ...prev.map(p => ({...p, isNew: false})).slice(0, 4)]);
            
            scheduleNextTransaction(); // Schedule the next one
        }, randomDelay);
    };

    scheduleNextTransaction();

    return () => clearTimeout(timeoutId);
  }, [appContext]);
  
  const popularPlans = [
    DATA_PLANS.find(p => p.id === 'mtn-10gb-30d'),
    DATA_PLANS.find(p => p.id === 'mtn-20gb-30d'),
    DATA_PLANS.find(p => p.id === 'airtel-10gb-30d'),
    DATA_PLANS.find(p => p.id === 'glo-10gb-30d'),
  ].filter((p): p is DataPlan => !!p);
  
  const handleScrollToTopUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('quick-top-up')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="-mt-8 md:-mt-12">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight opacity-0 animate-slide-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    Fast & Affordable Data
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-indigo-600 leading-tight opacity-0 animate-slide-in-up" style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}>
                    Plans For Everyone.
                </h1>
                <p className="mt-4 max-w-xl text-lg md:text-xl text-gray-600 leading-relaxed opacity-0 animate-slide-in-up mx-auto md:mx-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                    Stay connected with the cheapest data plans for all major networks. Instant delivery guaranteed, no registration required to start.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 opacity-0 animate-slide-in-up" style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
                    <Link to="/purchase" className="inline-block w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 text-center">
                        Browse All Plans
                    </Link>
                    <a href="#quick-top-up" onClick={handleScrollToTopUp} className="inline-block w-full sm:w-auto px-8 py-3 text-lg font-semibold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all duration-300 transform hover:scale-105 text-center">
                        Quick Top Up
                    </a>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-x-6 gap-y-4 opacity-0 animate-slide-in-up" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Icon name="check-circle" className="h-5 w-5 text-green-500" />
                        <span>No Registration Needed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                         <Icon name="bolt" className="h-5 w-5 text-yellow-500" />
                        <span>Instant Delivery</span>
                    </div>
                     <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                         <Icon name="shield-check" className="h-5 w-5 text-indigo-500" />
                        <span>100% Secure Payments</span>
                    </div>
                </div>
            </div>
            <div className="relative z-10 flex items-center justify-center opacity-0 animate-slide-in-up min-h-[450px] md:min-h-0" style={{animationDelay: '200ms', animationFillMode: 'forwards'}}>
                <div className="grid grid-cols-2 gap-3">
                    
                    {/* Card 1: Top-Left */}
                    <div className="w-40 sm:w-44 h-44 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 flex flex-col items-start animate-float transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:!border-indigo-300" style={{animationDelay: '0.4s'}}>
                        <img src={NETWORKS[Network.MTN].logo} className="h-10 object-contain" alt="MTN" />
                        <div className="mt-auto pt-4">
                            <p className="text-md font-bold text-gray-800">10GB Plan</p>
                            <p className="text-sm text-gray-500">₦1,100 - 30 Days</p>
                        </div>
                    </div>
                    
                    {/* Card 2: Top-Right */}
                    <div className="w-40 sm:w-44 h-44 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 flex flex-col items-start animate-float transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:!border-indigo-300" style={{animationDelay: '0.7s'}}>
                        <img src={NETWORKS[Network.AIRTEL].logo} className="h-10 object-contain" alt="Airtel" />
                        <div className="mt-auto pt-4">
                           <p className="text-md font-bold text-gray-800">20GB Plan</p>
                           <p className="text-sm text-gray-500">₦3,000 - 30 Days</p>
                        </div>
                    </div>

                    {/* Card 3: Bottom-Left */}
                    <div className="w-40 sm:w-44 h-44 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 flex flex-col items-start animate-float transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:!border-indigo-300" style={{animationDelay: '1.0s'}}>
                        <img src={NETWORKS[Network.GLO].logo} className="h-10 object-contain" alt="Glo" />
                        <div className="mt-auto pt-4">
                           <p className="text-md font-bold text-gray-800">50GB Plan</p>
                           <p className="text-sm text-gray-500">₦3,500 - 30 Days</p>
                        </div>
                    </div>

                    {/* Card 4: Bottom-Right */}
                    <div className="w-40 sm:w-44 h-44 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 flex flex-col items-start animate-float transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:!border-indigo-300" style={{animationDelay: '1.3s'}}>
                        <img src={NETWORKS[Network.MTN].logo} className="h-10 object-contain" alt="MTN" />
                        <div className="mt-auto pt-4">
                           <p className="text-md font-bold text-gray-800">50GB Plan</p>
                           <p className="text-sm text-gray-500">₦5,000 - 3 Months</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <WhyChooseUs />

      <StatsSection />

      {/* Popular Plans Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">Our Popular Data Plans</h2>
        <p className="mt-2 text-center text-gray-500">Get started with one of our most popular plans.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularPlans.map((plan, index) => (
                <DataCard key={plan.id} plan={plan} onSelect={handleSelectPlan} animationDelay={`${index * 100}ms`} />
            ))}
        </div>
      </section>

      {/* Quick Top Up Section */}
      <section id="quick-top-up" className="py-16 bg-indigo-50/50 scroll-mt-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Ready for a Quick Top-up?</h2>
            <p className="mt-2 text-gray-500 max-w-2xl mx-auto">No need to browse. Just select your network, choose a plan, enter your number, and get your data instantly.</p>
            <div className="mt-8">
                <QuickPurchaseForm />
            </div>
        </div>
      </section>

      {/* Recent Transactions Section */}
      <section className="py-16 bg-white/30">
       <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">Live Transactions</h2>
        <p className="mt-2 text-center text-gray-500">See the latest top-ups from our happy customers.</p>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Details</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((tx) => (
                      <TransactionRow key={tx.id} transaction={tx} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <CallToAction />

      <section className="py-16">
        <div className="container mx-auto px-4">
            <ContactSupportCard />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
