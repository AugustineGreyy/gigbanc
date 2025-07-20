import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

const StatItem: React.FC<{
  icon: string;
  endValue: number;
  label: string;
  start: boolean;
  prefix?: string;
  suffix?: string;
  color: string;
}> = ({ icon, endValue, label, start, prefix = '', suffix = '', color }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // 2 seconds

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(Math.floor((progress / duration) * endValue), endValue);
      setCount(current);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue); // Ensure it ends on the exact value
      }
    };

    requestAnimationFrame(animate);
  }, [start, endValue, duration]);
  
  const formattedCount = count.toLocaleString();

  return (
    <div className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon name={icon} className="h-8 w-8 text-white" />
      </div>
      <div className="ml-5">
        <p className="text-3xl font-extrabold text-gray-900">
          {prefix}{formattedCount}{suffix}
        </p>
        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
    const [startCounting, setStartCounting] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCounting(true);
                    if (element) {
                        observer.unobserve(element);
                    }
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

  const stats = [
    {
      icon: 'clipboard-check',
      endValue: 5800,
      label: 'Transactions Completed',
      prefix: '',
      suffix: '+',
      color: 'bg-indigo-500',
    },
    {
      icon: 'face-smile',
      endValue: 1200,
      label: 'Happy Customers',
      prefix: '',
      suffix: '+',
      color: 'bg-red-500',
    },
    {
      icon: 'server-stack',
      endValue: 22,
      label: 'Terabytes Delivered',
      prefix: '',
      suffix: 'TB+',
      color: 'bg-green-500',
    },
    {
        icon: 'currency-dollar',
        endValue: 4500000,
        label: 'Volume Transacted',
        prefix: '₦',
        suffix: '+',
        color: 'bg-yellow-500',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 opacity-0 animate-fade-in" style={{animationFillMode: 'forwards'}}>
            <h2 className="text-3xl font-bold text-gray-800">Our Numbers Speak for Themselves</h2>
            <p className="mt-2 text-gray-500 max-w-2xl mx-auto">We're proud of the scale we've achieved, connecting thousands across Nigeria.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="opacity-0 animate-slide-in-up" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}>
                <StatItem
                  {...stat}
                  start={startCounting}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;