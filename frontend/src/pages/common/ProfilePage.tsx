import React from 'react';
import {
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Calendar,
  Shield,
  Edit3,
  Award,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function ProfilePage() {
  const { user, role } = useAuth();
  const { addToast } = useToast();

  const handleEdit = () => {
    addToast({
      title: 'Edit Profile',
      description: 'Profile editing modal will be connected to user management services in Stage 2.',
      type: 'info',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="User Profile"
        subtitle="Manage your academic credentials, personal details, contact preferences, and institutional affiliations."
        breadcrumbs={[
          { label: 'Home', href: `/${role}/dashboard` },
          { label: 'Profile', isCurrent: true },
        ]}
        actions={
          <Button size="sm" variant="outline" leftIcon={Edit3} onClick={handleEdit}>
            Edit Profile
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Basic Information Card */}
        <Card className="p-6 flex flex-col items-center text-center gap-4 border-[#E7E7F0]">
          <Avatar name={user.name} size="xl" status="online" className="ring-4 ring-[#EEF0FF]" />

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight">{user.name}</h2>
            <p className="text-xs text-slate-500">{user.title || user.role.toUpperCase()}</p>
            <div className="mt-2 flex justify-center">
              <Badge variant="primary" size="md" className="capitalize">
                {user.role} Scholar Account
              </Badge>
            </div>
          </div>

          <div className="w-full border-t border-[#F1F1F8] pt-4 flex flex-col gap-3 text-left text-xs">
            <div className="flex items-center gap-2.5 text-slate-600">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{user.phone}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600">
              <Building className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{user.institution}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Member since {user.joinedDate}</span>
            </div>
          </div>
        </Card>

        {/* Right 2 Columns: Institutional & Bio Information */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-6 flex flex-col gap-5 border-[#E7E7F0]">
            <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
              <CardTitle>Academic & Institutional Details</CardTitle>
            </CardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] flex flex-col gap-1">
                <span className="text-slate-400 uppercase font-semibold text-[10px]">Institution</span>
                <span className="font-semibold text-slate-800 text-sm">{user.institution}</span>
              </div>

              {user.department && (
                <div className="p-3.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] flex flex-col gap-1">
                  <span className="text-slate-400 uppercase font-semibold text-[10px]">Department / Faculty</span>
                  <span className="font-semibold text-slate-800 text-sm">{user.department}</span>
                </div>
              )}

              {(user.studentId || user.facultyId) && (
                <div className="p-3.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] flex flex-col gap-1">
                  <span className="text-slate-400 uppercase font-semibold text-[10px]">Institutional ID</span>
                  <span className="font-mono font-bold text-[#4F46E5] text-sm">
                    {user.studentId || user.facultyId}
                  </span>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] flex flex-col gap-1">
                <span className="text-slate-400 uppercase font-semibold text-[10px]">Account Security</span>
                <div className="flex items-center gap-1.5 text-[#065F46] font-semibold mt-0.5">
                  <Shield className="w-4 h-4" />
                  <span>Verified Single Sign-On</span>
                </div>
              </div>
            </div>

            {user.bio && (
              <div className="flex flex-col gap-2 pt-2 border-t border-[#F1F1F8]">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Biography & Academic Focus</h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-[#F6F6FB]/60 p-4 rounded-xl border border-[#E7E7F0]">
                  {user.bio}
                </p>
              </div>
            )}
          </Card>

          {/* Academic Honors / Badges Preview */}
          <Card className="p-6 border-[#E7E7F0]">
            <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
              <CardTitle>Credentials & Certifications</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#D0D7FF] bg-[#EEF0FF]/30">
                <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] text-[#4F46E5] border border-[#D0D7FF] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-900">Dean's Honor Roll 2026</span>
                  <span className="text-[11px] text-slate-500">Academic Excellence in AI</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#A7F3D0] bg-[#DDF4EA]/30">
                <div className="w-9 h-9 rounded-xl bg-[#DDF4EA] text-[#065F46] border border-[#A7F3D0] flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-900">Certified Research Scholar</span>
                  <span className="text-[11px] text-slate-500">Published Peer-Reviewer</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
