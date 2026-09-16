import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, ArrowRight, Layers, Compass, Globe2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

export default function PrototypeViewPage({ title }: { title?: string }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useAuth();

  // Extract a clean readable title from path if not provided
  const pathParts = location.pathname.split('/').filter(Boolean);
  const derivedTitle =
    title ||
    pathParts[pathParts.length - 1]
      ?.replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()) ||
    'Academic Innovation';

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={derivedTitle}
        subtitle="Next-generation university ecosystem initiative currently in faculty preview."
        breadcrumbs={[
          { label: 'Dashboard', href: `/${role}/dashboard` },
          { label: derivedTitle, isCurrent: true },
        ]}
        actions={
          <Button variant="outline" size="sm" leftIcon={ArrowLeft} onClick={() => navigate(-1)}>
            Back
          </Button>
        }
      />

      <div className="flex items-center justify-center py-8">
        <Card className="max-w-2xl w-full p-8 sm:p-10 flex flex-col items-center text-center gap-6 border-[#E7E7F0] bg-gradient-to-b from-white via-[#F6F6FB]/50 to-white shadow-[0_4px_16px_0_rgba(31,41,55,0.03)]">
          {/* Pastel Academic Icon Platter */}
          <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-[#EEF0FF] border border-[#D0D7FF] text-[#4F46E5] shadow-[0_2px_8px_0_rgba(79,70,229,0.08)]">
            <Compass className="w-10 h-10 stroke-[1.75]" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F46E5] opacity-40"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#4F46E5]"></span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 max-w-lg">
            <Badge variant="lavender" size="md" dot>
              Ecosystem Initiative • In Active Research
            </Badge>

            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight mt-1">
              {derivedTitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Explore immersive learning environments, distributed lab sandboxes, and personalized growth pathways as Shreenil expands this faculty domain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left pt-2">
            <div className="p-3.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Phase</span>
              <span className="text-xs font-semibold text-slate-800">Faculty Pilot 2026</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Integration</span>
              <span className="text-xs font-semibold text-slate-800">AI Core & Twin</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Access</span>
              <span className="text-xs font-semibold text-[#065F46]">Early Roster</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/${role}/dashboard`)}
            >
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
