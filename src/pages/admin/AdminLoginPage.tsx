import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import nexoraLogo from '../../assets/nexora-logo.png';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('asnaaz0801@gmail.com');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both your email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await login(email.trim().toLowerCase(), password);
      setIsLoading(false);

      if (res.success) {
        navigate('/admin');
      } else {
        setErrorMsg(res.error || 'Invalid credentials. Access restricted to asnaaz0801@gmail.com.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Authentication error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 bg-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-60" />

      <div className="w-full max-w-md relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-surface-elevated/90 border border-slate-700/80 shadow-2xl backdrop-blur-2xl">
          
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-black border border-nexora-500/30 p-2 mx-auto mb-4 shadow-glow-sm">
              <img src={nexoraLogo} alt="Nexora Logo" className="w-full h-full object-contain" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Authorized Access Only</span>
            </div>
            <h1 className="text-2xl font-black font-heading text-white">Nexora Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">
              Restricted exclusively to <strong className="text-cyan-400 font-mono">asnaaz0801@gmail.com</strong>
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="asnaaz0801@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full cursor-pointer"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isLoading ? 'Verifying...' : 'Login to Admin Dashboard'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              ← Return to Nexora Website
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
