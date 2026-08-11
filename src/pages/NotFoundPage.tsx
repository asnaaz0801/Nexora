import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 bg-background text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-nexora-500/10 border border-nexora-500/30 flex items-center justify-center text-nexora-400 mx-auto animate-pulse">
          <Rocket className="w-10 h-10" />
        </div>
        <h1 className="text-6xl font-black font-heading text-white">404</h1>
        <h2 className="text-2xl font-bold text-slate-200">Orbit Coordinates Lost</h2>
        <p className="text-sm text-slate-400">
          The page or node you are searching for does not exist in the Nexora E-Cell ecosystem.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
