import React, { useState, useMemo } from 'react';

interface MainScreenProps {
  points: number;
  onLogout: () => void;
  onAddPoints: (amount: number) => void;
}

type AccordionSection = 'code' | 'wallet' | 'withdraw';

// --- NEW MODERN ICONS ---

const TagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3.5 2A1.5 1.5 0 002 3.5v3.882a1.5 1.5 0 00.44 1.06l7.118 7.118a1.5 1.5 0 002.122 0l3.882-3.882a1.5 1.5 0 000-2.121L8.44 2.44A1.5 1.5 0 007.382 2H3.5zM6 6a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

const WalletIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm12 1a1 1 0 100 2 1 1 0 000-2z" />
    <path d="M2 7.5a.5.5 0 01.5-.5H6a.5.5 0 01.5.5v1.25a.75.75 0 01-1.5 0V8h-2.5a.5.5 0 01-.5-.5V7.5z" />
  </svg>
);

const WithdrawIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3-6l3 3m0 0l-3 3m3-3H9" />
  </svg>
);

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


const MainScreen: React.FC<MainScreenProps> = ({ points, onLogout, onAddPoints }) => {
  const [openSection, setOpenSection] = useState<AccordionSection | null>('code');
  const [code, setCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const monetaryValue = useMemo(() => (points * 0.15).toFixed(2), [points]);

  const toggleSection = (section: AccordionSection) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === '') return;
    onAddPoints(2);
    setCode('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const accordionItems: { id: AccordionSection; title: string; icon: React.ReactNode }[] = [
    { id: 'code', title: 'ENTER CODE', icon: <TagIcon className="h-6 w-6" /> },
    { id: 'wallet', title: 'WALLET', icon: <WalletIcon className="h-6 w-6" /> },
    { id: 'withdraw', title: 'WITHDRAW', icon: <WithdrawIcon className="h-6 w-6" /> },
  ];

  return (
    <div className="w-full">
      <header className="text-center mb-8 relative">
        <h1 className="text-xl font-bold text-green-600 tracking-widest">REBOTTLE</h1>
        <p className="text-6xl font-bold text-gray-800 mt-1">{points}</p>
        <p className="text-gray-500">Total Points</p>
        <button 
          onClick={onLogout} 
          className="absolute top-0 right-0 text-gray-500 hover:text-red-500 transition-colors p-2"
          aria-label="Logout"
        >
          <LogoutIcon className="h-6 w-6" />
        </button>
      </header>

      <main className="space-y-4">
        {accordionItems.map(({ id, title, icon }) => {
          const isOpen = openSection === id;
          return (
            <div key={id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggleSection(id)}
                className="w-full flex justify-between items-center p-4"
                aria-expanded={isOpen}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">{icon}</span>
                  <span className="font-bold text-gray-800 text-lg">{title}</span>
                </div>
                <ChevronIcon open={isOpen} />
              </button>
              <div 
                className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-5 pb-5 bg-white">
                  {id === 'code' && (
                     <form onSubmit={handleRedeem} className="space-y-3 pt-2">
                      <input
                        type="text"
                        placeholder="Enter your code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                      />
                      <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                        Redeem
                      </button>
                      {showSuccess && (
                          <div className="flex items-center justify-center space-x-2 text-green-600 transition-opacity duration-300">
                              <CheckCircleIcon className="h-5 w-5"/>
                              <p className="text-sm font-semibold">
                                  2 points successfully added!
                              </p>
                          </div>
                      )}
                    </form>
                  )}
                  {id === 'wallet' && (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">Total Account Value</p>
                      <p className="text-5xl font-bold text-gray-800 mt-1">₹{monetaryValue}</p>
                    </div>
                  )}
                  {id === 'withdraw' && (
                    <div className="pt-2">
                        <button
                            disabled={points === 0}
                            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Withdraw ₹{monetaryValue}
                        </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default MainScreen;
