import React from 'react';
import Icon from './Icon';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/2349115890848"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      <Icon name="whatsapp" className="w-8 h-8" />
    </a>
  );
};

export default WhatsAppButton;
