import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center antialiased">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-6 shadow-xs">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
        Error 403
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        Access Restricted
      </h1>
      <p className="mt-3 text-sm text-slate-500 max-w-md leading-relaxed">
        You do not have the required role credentials or administrative authorization to access this university resource.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Button variant="outline" leftIcon={ArrowLeft} onClick={() => navigate(-1)}>
          Go Back
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
