import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ServerCrash, RotateCw, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function ServerErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center antialiased">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-6 shadow-xs">
        <ServerCrash className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
        Error 500
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        Server Error
      </h1>
      <p className="mt-3 text-sm text-slate-500 max-w-md leading-relaxed">
        The campus cloud servers encountered an unexpected condition. Our operations team has been notified.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Button variant="outline" leftIcon={RotateCw} onClick={() => window.location.reload()}>
          Reload Page
        </Button>
        <Link to="/">
          <Button variant="primary" leftIcon={Home}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
