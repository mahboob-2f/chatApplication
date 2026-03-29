import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Routess from './Routess';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-sm text-slate-300">
            Loading...
          </div>
        }
      >
        <Routess />
      </Suspense>
      <Toaster />
    </div>
  );
};

export default App;
