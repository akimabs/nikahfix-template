import { useState, Suspense, lazy } from 'react';
import './App.css';

// Lazy load components
const UserWatch = lazy(() => import('./components/section/user-watch'));
const Thumbnail = lazy(() => import('./components/section/thumbnail'));

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="w-full sm:max-w-lg sm:mx-auto">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        }>
          {isLogin ? (
            <Thumbnail />
          ) : (
            <UserWatch
              onClick={() => {
                setIsLogin(true);
              }}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
