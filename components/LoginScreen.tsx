
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canContinue = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canContinue) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-bold text-green-600">REBOTTLE</h1>
      <p className="mt-2 text-gray-500">Recycle. Redeem. Reward.</p>
      
      <form onSubmit={handleSubmit} className="w-full mt-10">
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="E-MAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          disabled={!canContinue}
          className="w-full mt-6 px-4 py-3 bg-green-600 text-white font-bold rounded-lg transition-colors duration-300 hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
        >
          CONTINUE
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
