import React, { useState } from 'react';
import {
  User,
  Bell,
  Sliders,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  Smartphone,
  Moon,
  Sun,
  Globe,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Tabs, TabList, TabTrigger, TabContent } from '../../components/ui/Tabs';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

export default function SettingsPage() {
  const { user, role } = useAuth();
  const { addToast } = useToast();

  const [displayName, setDisplayName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [timezone, setTimezone] = useState('America/New_York');
  const [language, setLanguage] = useState('en-US');

  // Notification toggles
  const [emailAnnouncements, setEmailAnnouncements] = useState(true);
  const [assignmentDeadlines, setAssignmentDeadlines] = useState(true);
  const [gradePosting, setGradePosting] = useState(true);
  const [smsUrgent, setSmsUrgent] = useState(false);

  // Display toggles
  const [compactDensity, setCompactDensity] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const handleSave = (section: string) => {
    addToast({
      title: 'Preferences Saved',
      description: `${section} settings updated successfully.`,
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings & Preferences"
        subtitle="Manage your platform settings, notification preferences, display options, and security credentials."
        breadcrumbs={[
          { label: 'Home', href: `/${role}/dashboard` },
          { label: 'Settings', isCurrent: true },
        ]}
      />

      <Tabs defaultValue="profile">
        <TabList>
          <TabTrigger value="profile">
            <User className="w-4 h-4 mr-1.5" />
            Profile Preferences
          </TabTrigger>
          <TabTrigger value="notifications">
            <Bell className="w-4 h-4 mr-1.5" />
            Notifications
          </TabTrigger>
          <TabTrigger value="display">
            <Sliders className="w-4 h-4 mr-1.5" />
            Display & Accessibility
          </TabTrigger>
          <TabTrigger value="security">
            <Shield className="w-4 h-4 mr-1.5" />
            Security & Authentication
          </TabTrigger>
        </TabList>

        {/* PROFILE PREFERENCES TAB */}
        <TabContent value="profile">
          <Card className="p-6 flex flex-col gap-6">
            <CardHeader className="p-0 pb-4 border-b border-slate-100">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your public profile display name and contact preferences.
              </CardDescription>
            </CardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Select
                label="Timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                options={[
                  { label: 'Eastern Time (US & Canada)', value: 'America/New_York' },
                  { label: 'Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
                  { label: 'Greenwich Mean Time (London)', value: 'Europe/London' },
                  { label: 'India Standard Time (IST)', value: 'Asia/Kolkata' },
                  { label: 'Japan Standard Time (Tokyo)', value: 'Asia/Tokyo' },
                ]}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button leftIcon={Save} onClick={() => handleSave('Profile')}>
                Save Profile Changes
              </Button>
            </div>
          </Card>
        </TabContent>

        {/* NOTIFICATION PREFERENCES TAB */}
        <TabContent value="notifications">
          <Card className="p-6 flex flex-col gap-6">
            <CardHeader className="p-0 pb-4 border-b border-slate-100">
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Choose how and when you receive course updates and university communications.
              </CardDescription>
            </CardHeader>

            <div className="flex flex-col gap-4">
              <Checkbox
                checked={emailAnnouncements}
                onChange={(e) => setEmailAnnouncements(e.target.checked)}
                label="Course & Campus Announcements"
                description="Receive email summaries when professors or administrators broadcast campus-wide notices."
              />
              <Checkbox
                checked={assignmentDeadlines}
                onChange={(e) => setAssignmentDeadlines(e.target.checked)}
                label="Assignment & Grading Reminders"
                description="Receive automated reminders 24 hours prior to assignment deadlines."
              />
              <Checkbox
                checked={gradePosting}
                onChange={(e) => setGradePosting(e.target.checked)}
                label="Instant Grade Notifications"
                description="Receive an immediate alert as soon as an instructor submits exam grades."
              />
              <Checkbox
                checked={smsUrgent}
                onChange={(e) => setSmsUrgent(e.target.checked)}
                label="Emergency SMS Broadcasts"
                description="Receive urgent institutional weather or security alerts via SMS."
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button leftIcon={Save} onClick={() => handleSave('Notification')}>
                Save Notification Preferences
              </Button>
            </div>
          </Card>
        </TabContent>

        {/* DISPLAY & ACCESSIBILITY TAB */}
        <TabContent value="display">
          <Card className="p-6 flex flex-col gap-6">
            <CardHeader className="p-0 pb-4 border-b border-slate-100">
              <CardTitle>Interface & Accessibility Options</CardTitle>
              <CardDescription>
                Customize reading comfort, layout density, and high-contrast styling.
              </CardDescription>
            </CardHeader>

            <div className="flex flex-col gap-4">
              <Alert type="info" title="Academic Light Theme">
                Shreenil's UI is calibrated for optimal daylight reading contrast and academic focus.
              </Alert>

              <Checkbox
                checked={compactDensity}
                onChange={(e) => setCompactDensity(e.target.checked)}
                label="Compact Table & Card Density"
                description="Reduces padding in tables and lists to display more records on single screens."
              />
              <Checkbox
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                label="High-Contrast Mode"
                description="Increases border contrast and deepens text shades for improved outdoor visibility."
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button leftIcon={Save} onClick={() => handleSave('Display')}>
                Apply Display Options
              </Button>
            </div>
          </Card>
        </TabContent>

        {/* SECURITY PLACEHOLDER TAB */}
        <TabContent value="security">
          <Card className="p-6 flex flex-col gap-6">
            <CardHeader className="p-0 pb-4 border-b border-slate-100">
              <CardTitle>Security & Access Control</CardTitle>
              <CardDescription>
                Single sign-on, multifactor authentication, and session management.
              </CardDescription>
            </CardHeader>

            <Alert type="warning" title="Stage 1 Frontend Prototype Mode">
              Authentication security features and password changes are in preview mode. Backend authentication endpoints will be connected in Stage 2.
            </Alert>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Lock className="w-4 h-4 text-indigo-600" />
                  <span>Password Reset</span>
                </div>
                <p className="text-xs text-slate-500">
                  Managed through university Single Sign-On (SSO) identity portal.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 w-fit"
                  onClick={() => addToast({ title: 'SSO Portal', description: 'SSO redirection available in Stage 2.', type: 'info' })}
                >
                  Manage SSO Password
                </Button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Two-Factor Authentication (2FA)</span>
                </div>
                <p className="text-xs text-slate-500">
                  Enforced via Authenticator App / Hardware Security Key (FIDO2).
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 w-fit"
                  onClick={() => addToast({ title: '2FA Setup', description: '2FA provisioning available in Stage 2.', type: 'info' })}
                >
                  Configure 2FA
                </Button>
              </div>
            </div>
          </Card>
        </TabContent>
      </Tabs>
    </div>
  );
}
