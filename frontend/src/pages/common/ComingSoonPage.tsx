import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Sparkles, ArrowLeft, Trophy, Heart, Lightbulb, Briefcase, Boxes } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ComingSoonPageProps {
  title: string;
  category?: string;
  description?: string;
  iconType?: 'sports' | 'spiritual' | 'innovation' | 'career' | 'xr-labs';
}

export default function ComingSoonPage({
  title,
  category = 'University Life & Holistic Growth',
  description = 'This ecosystem module is currently in development as part of Shreenil Multi-Horizon Roadmap.',
  iconType = 'innovation',
}: ComingSoonPageProps) {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (iconType) {
      case 'sports': return <Trophy className="w-8 h-8 text-amber-500" />;
      case 'spiritual': return <Heart className="w-8 h-8 text-rose-500" />;
      case 'career': return <Briefcase className="w-8 h-8 text-blue-500" />;
      case 'xr-labs': return <Boxes className="w-8 h-8 text-purple-500" />;
      default: return <Lightbulb className="w-8 h-8 text-indigo-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <Card className="border-[#E7E7F0] bg-white p-8 rounded-3xl shadow-sm">
        <CardContent className="space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#F6F6FB] border border-[#E7E7F0] flex items-center justify-center mx-auto">
            {getIcon()}
          </div>

          <div className="space-y-2">
            <Badge variant="primary" className="text-xs">
              {category}
            </Badge>
            <h1 className="text-2xl font-bold text-[#1E1B4B] tracking-tight">{title}</h1>
            <p className="text-xs text-[#5B5875] max-w-md mx-auto leading-relaxed">{description}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F6F6FB] border border-[#E7E7F0] text-xs text-[#5B5875] max-w-md mx-auto space-y-2">
            <div className="flex items-center justify-center gap-1.5 font-semibold text-[#1E1B4B]">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Horizon 2 Feature</span>
            </div>
            <p>
              In accordance with Shreenil Student MVP specification, this module will be enabled in subsequent ecosystem phases.
            </p>
          </div>

          <Button
            onClick={() => navigate('/student/dashboard')}
            variant="outline"
            className="text-xs border-[#E7E7F0] rounded-xl gap-2 text-indigo-600 hover:bg-indigo-50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Student Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
