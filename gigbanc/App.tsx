
import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PurchasePage from './pages/PurchasePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';
import WhatsAppButton from './components/WhatsAppButton';
import { DataPlan, TransactionNotification } from './types';
import PurchaseModal from './components/PurchaseModal';
import TransactionNotificationPopup from './components/TransactionNotificationPopup';
import ScrollToTop from './components/ScrollToTop';
import SuccessModal from './components/SuccessModal';

export const AppContext = React.createContext<{
  openPurchaseModal: (plan: DataPlan, initialPhone?: string) => void;
  addNotification: (notification: Omit<TransactionNotification, 'id'>) => void;
} | null>(null);

interface SuccessDetails {
  plan: DataPlan;
  phone: string;
}

const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);
  const [initialPhone, setInitialPhone] = useState<string | undefined>();
  const [successDetails, setSuccessDetails] = useState<SuccessDetails | null>(null);
  
  const [notifications, setNotifications] = useState<TransactionNotification[]>([]);

  const addNotification = useCallback((notification: Omit<TransactionNotification, 'id'>) => {
    const newNotification = { ...notification, id: `notif-${Date.now()}-${Math.random()}` };
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const openPurchaseModal = useCallback((plan: DataPlan, phone?: string) => {
    setSelectedPlan(plan);
    setInitialPhone(phone);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPlan(null);
    setInitialPhone(undefined);
  }, []);
  
  const handleSuccess = useCallback((details: SuccessDetails) => {
    closeModal();
    setSuccessDetails(details);
  }, [closeModal]);

  const closeSuccessModal = useCallback(() => {
    setSuccessDetails(null);
  }, []);

  return (
    <AppContext.Provider value={{ openPurchaseModal, addNotification }}>
      <HashRouter>
        <ScrollToTop />
        {/* Global Animated Blobs */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/purchase" element={<PurchasePage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/support" element={<SupportPage />} />
            </Routes>
          </main>
          <Footer />

          <PurchaseModal
            plan={selectedPlan}
            initialPhone={initialPhone}
            onClose={closeModal}
            onSuccess={handleSuccess}
          />

          <SuccessModal
            details={successDetails}
            onClose={closeSuccessModal}
          />
          
          {/* Transaction Notification Popups */}
          <div aria-live="polite" aria-atomic="true" className="fixed bottom-0 left-0 p-4 sm:p-6 space-y-4 z-50 overflow-hidden w-full max-w-md">
            {notifications.map(notification => (
              <TransactionNotificationPopup
                key={notification.id}
                notification={notification}
                onClose={() => removeNotification(notification.id)}
              />
            ))}
          </div>

          <WhatsAppButton />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
