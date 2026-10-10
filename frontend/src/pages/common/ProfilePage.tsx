import React, { useState } from 'react';
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
  CheckCircle2,
  Lock,
  Save,
  X,
  FileCheck,
  AlertCircle,
  Sparkles,
  MapPin,
  HeartHandshake,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { studentPortalService, StudentProfileData } from '../../services/studentPortalService';

export default function ProfilePage() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [profile, setProfile] = useState<StudentProfileData>(() => studentPortalService.getProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<StudentProfileData>(profile);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleInputChange = (field: keyof StudentProfileData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.address) {
      addToast({
        title: 'Validation Failed',
        description: 'Phone and Address fields cannot be left empty.',
        type: 'warning',
      });
      return;
    }

    const updated = studentPortalService.updateProfile(formData);
    setProfile(updated);
    setIsEditing(false);
    setHasUnsavedChanges(false);
    addToast({
      title: 'Profile Updated',
      description: 'Your contact and personal details have been safely saved.',
      type: 'success',
    });
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5EBE7]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            My Student Profile
          </h1>
          <p className="text-xs sm:text-sm text-[#6B756F] mt-1">
            Official academic enrollment record & digital twin identity for Vishwakarma Institute of Technology.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Unsaved Changes
            </span>
          )}

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-all flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Details</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3.5 py-2 rounded-xl border border-[#E5EBE7] bg-white hover:bg-slate-50 text-[#6B756F] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols): Identity Card & Profile Completion */}
        <div className="lg:col-span-4 space-y-6">
          {/* Identity Card */}
          <div className="bg-white rounded-3xl border border-[#E5EBE7] p-6 shadow-card text-center relative overflow-hidden">
            <div className="relative inline-block mb-4">
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-[#EFF9F3] shadow-md mx-auto"
              />
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#36B875] border-2 border-white flex items-center justify-center text-white text-xs">
                ✓
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#18221D]">{profile.fullName}</h2>
            <p className="text-xs text-[#36B875] font-semibold mt-0.5">{profile.degreeProgram}</p>
            <p className="text-xs text-[#6B756F] mt-1">{profile.institution}</p>

            <div className="mt-5 pt-5 border-t border-[#E5EBE7] grid grid-cols-2 gap-3 text-left">
              <div className="bg-[#F6F8F7] p-2.5 rounded-xl">
                <span className="text-[10px] text-[#6B756F] font-bold block uppercase">Student ID</span>
                <span className="text-xs font-bold text-[#18221D]">{profile.admissionNumber}</span>
              </div>
              <div className="bg-[#F6F8F7] p-2.5 rounded-xl">
                <span className="text-[10px] text-[#6B756F] font-bold block uppercase">Roll Number</span>
                <span className="text-xs font-bold text-[#18221D]">{profile.rollNumber}</span>
              </div>
              <div className="bg-[#F6F8F7] p-2.5 rounded-xl">
                <span className="text-[10px] text-[#6B756F] font-bold block uppercase">Current CGPA</span>
                <span className="text-xs font-bold text-[#18794E]">{profile.cgpa} / 10.0</span>
              </div>
              <div className="bg-[#F6F8F7] p-2.5 rounded-xl">
                <span className="text-[10px] text-[#6B756F] font-bold block uppercase">Earned Credits</span>
                <span className="text-xs font-bold text-[#18221D]">{profile.creditsEarned} / {profile.totalCredits}</span>
              </div>
            </div>
          </div>

          {/* Profile Completion Indicator */}
          <div className="bg-white rounded-3xl border border-[#E5EBE7] p-6 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#18221D]">Profile Completion</h3>
              <span className="text-xs font-bold text-[#18794E]">95% Complete</span>
            </div>
            <div className="w-full bg-[#EFF9F3] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#36B875] h-full rounded-full transition-all duration-500 w-[95%]" />
            </div>
            <div className="mt-4 space-y-2 text-xs text-[#6B756F]">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-[#36B875]" />
                <span>Government ID (Aadhaar) Verified</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-[#36B875]" />
                <span>Secondary & Higher Secondary Records Linked</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-[#36B875]" />
                <span>Parent / Guardian Verification Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Tabulated Profile Information */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Section 1: Academic & Institutional Information (School-Controlled Read Only) */}
            <div className="bg-white rounded-3xl border border-[#E5EBE7] p-6 shadow-card">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5EBE7]">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#36B875]" />
                  <h3 className="text-sm font-bold text-[#18221D]">Institutional Enrollment Details</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Lock className="w-3 h-3" /> School-Controlled (Read Only)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Institution</label>
                  <input
                    type="text"
                    disabled
                    value={profile.institution}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D] font-medium cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Department</label>
                  <input
                    type="text"
                    disabled
                    value={profile.department}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D] font-medium cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Academic Year</label>
                  <input
                    type="text"
                    disabled
                    value={profile.academicYear}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D] font-medium cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Semester & Division</label>
                  <input
                    type="text"
                    disabled
                    value={profile.classDivision}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D] font-medium cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Personal & Contact Information (Student Editable) */}
            <div className="bg-white rounded-3xl border border-[#E5EBE7] p-6 shadow-card">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5EBE7]">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#36B875]" />
                  <h3 className="text-sm font-bold text-[#18221D]">Personal & Contact Information</h3>
                </div>
                {isEditing ? (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-[#EFF9F3] px-2 py-0.5 rounded-md">
                    Editing Permitted
                  </span>
                ) : (
                  <span className="text-[11px] text-[#6B756F]">Click Edit Details to update</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    disabled
                    value={profile.fullName}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D] font-medium cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Institutional Email</label>
                  <input
                    type="email"
                    disabled
                    value={profile.email}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D] font-medium cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Mobile Phone Number</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full p-2.5 rounded-xl text-sm transition-all ${
                      isEditing
                        ? 'bg-white border-[#36B875] ring-2 ring-[#36B875]/20 text-[#18221D]'
                        : 'bg-slate-50 border-slate-200 text-[#18221D]'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Date of Birth</label>
                  <input
                    type="text"
                    disabled
                    value={profile.dateOfBirth}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D] font-medium cursor-not-allowed"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[#6B756F] font-semibold block mb-1">Bio / Research Focus</label>
                  <textarea
                    rows={2}
                    disabled={!isEditing}
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className={`w-full p-2.5 rounded-xl text-xs transition-all ${
                      isEditing
                        ? 'bg-white border-[#36B875] ring-2 ring-[#36B875]/20 text-[#18221D]'
                        : 'bg-slate-50 border-slate-200 text-[#18221D]'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Residential Address & Guardian Contacts */}
            <div className="bg-white rounded-3xl border border-[#E5EBE7] p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E5EBE7]">
                <MapPin className="w-5 h-5 text-[#36B875]" />
                <h3 className="text-sm font-bold text-[#18221D]">Residential Address & Guardian Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="text-[#6B756F] font-semibold block mb-1">Permanent Residential Address</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full p-2.5 rounded-xl text-xs ${
                      isEditing
                        ? 'bg-white border-[#36B875] ring-2 ring-[#36B875]/20 text-[#18221D]'
                        : 'bg-slate-50 border-slate-200 text-[#18221D]'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">City / District</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D]"
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Pin Code</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D]"
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    disabled
                    value={profile.parentName}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#18221D] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[#6B756F] font-semibold block mb-1">Emergency Contact Phone</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className={`w-full p-2.5 rounded-xl text-xs ${
                      isEditing
                        ? 'bg-white border-[#36B875] ring-2 ring-[#36B875]/20 text-[#18221D]'
                        : 'bg-slate-50 border-slate-200 text-[#18221D]'
                    }`}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
