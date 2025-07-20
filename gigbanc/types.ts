
export enum Network {
  MTN = 'MTN',
  AIRTEL = 'Airtel',
  GLO = 'Glo',
}

export interface DataPlan {
  id: string;
  network: Network;
  size: number; // in GB
  price: number; // in NGN
  duration: string; // e.g., '30-Day', '3-Month'
  name: string;
}

export interface Transaction {
  id: string;
  network: Network;
  planName: string;
  amount: number;
  phone: string;
  timestamp: Date;
  isNew?: boolean;
}

export interface TransactionNotification {
  id: string;
  network: Network;
  planName: string;
  phone: string;
}


export interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  ref: string;
  onClose: () => void;
  callback: (response: any) => void;
}

declare global {
    interface Window {
        PaystackPop: {
            setup(config: PaystackConfig): {
                openIframe: () => void;
            };
        };
    }
}