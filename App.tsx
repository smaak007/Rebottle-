
import React, { useState, useCallback } from 'react';
import { Screen } from './types';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.Login);
  const [points, setPoints] = useState<number>(0);

  const handleLogin = useCallback(() => {
    setScreen(Screen.Main);
  }, []);

  const handleLogout = useCallback(() => {
    setPoints(0);
    setScreen(Screen.Login);
  }, []);

  const addPoints = useCallback((amount: number) => {
    setPoints(prevPoints => prevPoints + amount);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500">
          {screen === Screen.Login ? (
            <LoginScreen onLogin={handleLogin} />
          ) : (
            <MainScreen points={points} onLogout={handleLogout} onAddPoints={addPoints} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
